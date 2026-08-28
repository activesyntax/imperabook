import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  signal,
  untracked,
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
        return { type: 'text', name: 'ib-credential-field', autocomplete: 'off' };
    }
  });

  private readonly bar = viewChild<ElementRef<HTMLInputElement>>('bar');

  constructor() {
    effect(() => this.focus(this.bar()?.nativeElement));

    effect(() => {
      if (!this.registry.loaded()) return;

      untracked(() => this.apply(Shell.initial(this.deps)));
    });
  }

  // ── DOM → UiInput ─────────────────────────────────────────────────────────

  protected onInput(event: Event): void {
    this.send({ kind: 'text', value: (event.target as HTMLInputElement).value });
  }

  protected onKeydown(event: KeyboardEvent): void {
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

      default:
        return;
    }
  }

  protected submit(): void {
    this.send({ kind: 'submit' });
  }

  // ── STATE MACHINE  ────────────────────────────────────────────────────────────

  private send(input: UiInput): void {

    // console.log('STATE BEFORE:', this.state(), input);
    this.apply(Shell.transition(this.state(), input, this.deps));
    console.log('STATE AFTER:', this.state(), input);

  }

  private apply({ state, effects }: Shell.Step): void {
    this.state.set(state);

    for (const effect of effects) void this.perform(effect);
  }

  private async perform(effect: Shell.Effect): Promise<void> {
    if (effect.kind === 'open') {
      try {
        const view = await this.runner.open(effect.cmd);

        if (view !== null) {
          this.store.setResult(view);
        }
      } catch (error) {
        this.store.setResult(resultOfError(error));
      }
      return;
    }

    try {
      this.store.setResult(await this.runner.run(effect.cmd, effect.answers));
    } catch (error) {
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
