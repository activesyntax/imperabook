import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { CommandRunner } from '@app/commands/command-runner';
import { CommandProvider } from '@app/commands/command-provider';
import { WorkspaceStore } from '@app/state/workspace-store';
import { resultOfError } from '@app/commands/command-error';
import { UiInput } from './ui-input';
import * as Shell from './shell-model';

@Component({
  selector: 'app-command-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command-shell.html',
  styleUrl: './command-shell.scss',
})
export class CommandShell {
  private readonly commands = inject(CommandProvider);
  private readonly runner = inject(CommandRunner);
  private readonly store = inject(WorkspaceStore);

  private readonly deps: Shell.ShellDeps = {
    suggestionsFor: (query) => this.commands.suggestionsFor(query, undefined),
  };

  /** Az egyetlen írható állapot. Minden más ebből származik. */
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

  private readonly bar = viewChild<ElementRef<HTMLInputElement>>('bar');

  constructor() {
    afterNextRender(() => this.focusBar());
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
    const { state, effects } = Shell.transition(this.state(), input, this.deps);
    this.state.set(state);

    for (const effect of effects) void this.perform(effect);
  }

  private async perform(effect: Shell.Effect): Promise<void> {
    try {
      this.store.setResult(await this.runner.run(effect.cmd, effect.answers));
    } catch (error) {
      // A hiba is nézet: a felhasználónak látnia kell, hogy a parancs elhasalt.
      this.store.setResult(resultOfError(error));
    } finally {
      this.send({ kind: 'completed' });
      this.refreshCatalogAfter(effect.cmd);
    }
  }

  /**
   * Az identitás megváltozhatott, és a katalógus identitásfüggő (bejelentkezés
   * előtt csak a login érhető el). A csoport dönt, nem a parancs neve — de ez
   * még mindig frontend-oldali következtetés: amint a CommandResult maga tudja
   * jelezni, hogy a katalógus elavult, ez a metódus törlendő.
   */
  private refreshCatalogAfter(cmd: { readonly group?: string }): void {
    if (cmd.group === 'account') this.commands.reload();
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
    const input = this.bar()?.nativeElement;
    input?.focus();
    input?.select();
  }
}
