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
// import { resultOfError } from '@app/commands/command-error';
// import * as Shell from './shell';
// import * as ShellState from './shell-state';
// import * as Transition from './shell-transition';
// import { ShellStateMachine } from './shell-state-machine';
import { SuggestionProvider } from './suggestion-provider';

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
  // private readonly shell = inject(ShellStateMachine);
  private readonly suggestionProvider = inject(SuggestionProvider);


  // private readonly deps: Shell.ShellDeps = {
  //   suggestionsFor: (query) => this.commands.suggestionsFor(query, undefined),
  //
  //   forcedCommand: () => {
  //     if (this.registry.authenticated()) return undefined;
  //
  //     const available = this.registry.commands();
  //     return available.length === 1 ? available[0] : undefined;
  //   },
  // };
  //

  protected readonly kind = computed(() => 'KIND');
  protected readonly text = computed(() => "");


  protected readonly query = signal('');

  protected readonly suggestions = computed(() => this.suggestionProvider.suggestionsFor(this.query()));
  protected readonly selectedIndex = computed(() => 0);

  // protected readonly suggestions = computed(() => Transition.suggestionsOf(this.shell.state(), this.deps));
  // protected readonly selectedIndex = computed(() => Transition.selectedIndexOf(this.shell.state(), this.deps));
  // protected readonly activeCommand = computed(() => Transition.activeOf(this.shell.state(), this.deps));

  protected readonly busy = computed(() => false);

  protected readonly commandField = COMMAND_FIELD;


  private readonly bar = viewChild<ElementRef<HTMLInputElement>>('bar');
  constructor() {
    effect(() => this.focus(this.bar()?.nativeElement));

    effect(() => {
      if (!this.registry.loaded()) return;

      // untracked(() => this.apply(Shell.initial(this.deps)));
    });
  }

  protected onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected onKeydown(event: KeyboardEvent): void {


    // return this.shell.send(event);
  }

  protected submit(): void {
    // this.send({ kind: 'submit' });
  }


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
