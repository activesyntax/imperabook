import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { CommandRunner } from '@app/commands/command-runner';
import { CommandProvider } from '@app/commands/command-provider';
import { CommandRegistry } from '@app/commands/command-registry';
import { WorkspaceStore } from '@app/state/workspace-store';
import { resultOfError } from '@app/commands/command-error';
import { UiInput } from './ui-input';
import * as Shell from './shell-model';

interface FieldAttrs {
  readonly type: 'text' | 'password';
  readonly name: string;
  readonly autocomplete: string;
}

const COMMAND_FIELD: FieldAttrs = {
  type: 'text',
  name: 'ib-command',
  autocomplete: 'off',
};

@Component({
  selector: 'app-command-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command-shell.html',
  styleUrl: './command-shell.scss',
})
export class CommandShell {
  private readonly commands = inject(CommandProvider);
  private readonly registry = inject(CommandRegistry);
  private readonly runner = inject(CommandRunner);
  private readonly store = inject(WorkspaceStore);

  private readonly deps: Shell.ShellDeps = {
    suggestionsFor: (query) => this.commands.suggestionsFor(query, undefined),

    // Session nélkül a jegyzék pontosan azt tartalmazza, amit futtatni lehet. Egyetlen
    // elem: nincs mit választani, tehát a gép nem vár egy üres sávval, hanem elindítja.
    // Több vagy nulla elem: van választás, vagy még nincs jegyzék — a gép szabad marad.
    forcedCommand: () => {
      if (this.registry.authenticated()) return undefined;

      const available = this.registry.commands();
      return available.length === 1 ? available[0] : undefined;
    },
  };

  private readonly state = signal<Shell.ShellState>(Shell.browsing());

  protected readonly kind = computed(() => this.state().kind);
  protected readonly text = computed(() => Shell.textOf(this.state()));
  protected readonly query = computed(() => Shell.queryOf(this.text()));

  protected readonly suggestions = computed(() => Shell.suggestionsOf(this.state(), this.deps));
  protected readonly selectedIndex = computed(() => Shell.selectedIndexOf(this.state(), this.deps));
  protected readonly activeCommand = computed(() => Shell.activeOf(this.state(), this.deps));

  protected readonly parameter = computed(() => Shell.pendingParameter(this.state()));
  protected readonly progress = computed(() => Shell.progressOf(this.state()));
  protected readonly blocked = computed(() => Shell.blockedOf(this.state()));
  protected readonly busy = computed(() => this.state().kind === 'running');

  protected readonly hint = computed(() => {
    const param = this.parameter();
    return param === undefined ? undefined : (param.hint ?? param.prompt);
  });

  protected readonly placeholder = computed(() => {
    const param = this.parameter();
    if (param !== undefined) {
      return param.example === undefined ? '' : `e.g. ${param.example}`;
    }

    return this.kind() === 'browsing' ? 'type a command or search your library' : '';
  });

  protected readonly credentialMode = computed(() => Shell.credentialModeOf(this.state()));

  protected readonly commandField = COMMAND_FIELD;

  protected readonly credentialField = computed<FieldAttrs>(() => {
    switch (this.parameter()?.credential) {
      case 'password':
        return { type: 'password', name: 'ib-credential-password', autocomplete: 'current-password' };
      case 'username':
        return { type: 'text', name: 'ib-credential-username', autocomplete: 'username' };
      default:
        // Credential-parancs nem credential lépése: dedikált elemen marad, de
        // nem hazudik szerepet a jelszókezelőnek.
        return { type: 'text', name: 'ib-credential-field', autocomplete: 'off' };
    }
  });

  private readonly bar = viewChild<ElementRef<HTMLInputElement>>('bar');

  constructor() {
    // A fókusz-invariánst innentől a shell tartja fenn, nem az elem élettartama:
    // a viewChild jelzés akkor és csak akkor változik, ha MÁSIK elem került a
    // helyére, tehát a csere után az új elem azonnal fókuszt kap (ADR 25).
    effect(() => this.focus(this.bar()?.nativeElement));

    // A gép `browsing()`-gal jön létre, mert a komponens a jegyzék előtt épül fel — a
    // `forcedCommand` ekkor még semmit nem tudna mondani. Amint a jegyzék megvan, a
    // tétlen állapot újraértékelődik. Ez az egyetlen pont, ahol a komponens kezdeményez,
    // és csak azért, mert a betöltés aszinkron; a döntés magában a gépben van.
    void this.registry.ready().then(() => this.apply(Shell.initial(this.deps)));
  }

  // ── DOM → UiInput ─────────────────────────────────────────────────────────
  // Az egyetlen hely, ahol DOM-esemény van. Innentől mindkét gép tiszta.

  protected onInput(event: Event): void {
    this.send({ kind: 'text', value: (event.target as HTMLInputElement).value });
  }

  protected onKeydown(event: KeyboardEvent): void {
    // Csak a vezérlőbillentyűk jönnek innen. A szöveg változását az input
    // esemény hozza — a keydown még a karakter beírása ELŐTT fut le.
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        return this.send({ kind: 'commit' });

      case 'Escape':
        event.preventDefault();
        return this.send({ kind: 'cancel' });

      case 'Tab':
        event.preventDefault();
        return this.send({ kind: 'move', dir: event.shiftKey ? 'prev' : 'next' });

      case 'Backspace':
        // Üres mezőn nincs mit törölni: ez lépjen vissza egy paraméterrel.
        if ((event.target as HTMLInputElement).value.length > 0) return;
        event.preventDefault();
        return this.send({ kind: 'back' });

      default:
        return; // karakterek, Meta, Shift, nyilak: az input ág dolga
    }
  }

  protected submit(): void {
    this.send({ kind: 'submit' });
  }

  // ── állapotgép ────────────────────────────────────────────────────────────

  private send(input: UiInput): void {
    this.apply(Shell.transition(this.state(), input, this.deps));
  }

  private apply({ state, effects }: Shell.Step): void {
    this.state.set(state);

    for (const effect of effects) void this.perform(effect);
  }

  private async perform(effect: Shell.Effect): Promise<void> {
    // A nyitó kör nem zárja a futást: az állapot bekérés alatt marad, a nézet
    // mellette érkezik meg. Ezért nincs 'completed'.
    if (effect.kind === 'open') {
      try {
        this.store.setResult(await this.runner.open(effect.cmd));
      } catch (error) {
        this.store.setResult(resultOfError(error));
      }
      return;
    }

    try {
      this.store.setResult(await this.runner.run(effect.cmd, effect.answers));
    } catch (error) {
      // A hiba is nézet: a felhasználónak látnia kell, hogy a parancs elhasalt.
      this.store.setResult(resultOfError(error));
    } finally {
      this.send({ kind: 'completed' });
    }
  }

  // ── fókusz ────────────────────────────────────────────────────────────────

  @HostListener('document:keydown', ['$event'])
  protected onGlobalKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key?.toLowerCase() === 'k') {
      event.preventDefault();
      this.focusBar();
      return;
    }

    if (event.key === '/' && !this.isTypingTarget(event.target)) {
      event.preventDefault();
      this.focusBar();
    }
  }

  private isTypingTarget(target: EventTarget | null): boolean {
    const el = target as HTMLElement | null;
    if (el === null) return false;
    return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable;
  }

  private focusBar(): void {
    this.focus(this.bar()?.nativeElement);
  }

  private focus(input: HTMLInputElement | undefined): void {
    input?.focus();
    input?.select();
  }
}
