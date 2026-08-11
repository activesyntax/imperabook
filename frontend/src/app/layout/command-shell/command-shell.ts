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
  protected readonly selectedIndex = computed(() => {
    const s = this.state();
    return s.kind === 'browsing' ? s.selected : undefined;
  });
  protected readonly activeCommand = computed(() => Shell.activeOf(this.state(), this.deps));

  protected readonly parameter = computed(() => Shell.pendingParameter(this.state()));
  protected readonly progress = computed(() => Shell.progressOf(this.state()));
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
      const result = await this.runner.run(effect.cmd, effect.answers);
      this.store.setResult(result);
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
    const input = this.bar()?.nativeElement;
    input?.focus();
    input?.select();
  }
}
