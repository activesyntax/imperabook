import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';

import { CommandRunner } from '@app/commands/command-runner';
import { resultOfUnrecognized } from '@app/commands/command-error';
import { WorkspaceStore } from '@app/state/workspace-store';
import { SuggestionService } from './suggestion-service';
import { Index, IndexMove, indexRange, IndexRange, nextCyclicIndex, prevCyclicIndex } from '@core/index';
import { parseDSLCommand } from './command-parser';
import { CommandVisitor } from './command-visitor';

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

type SuggestionList = {

  readonly all: readonly string[];
  readonly range: IndexRange;
}

function suggestionList(suggestions: readonly string[]): SuggestionList {
  return { all: suggestions, range: indexRange(suggestions.length) };
}

@Component({
  selector: 'app-command-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command-shell.html',
  styleUrl: './command-shell.scss',
})
export class CommandShell {
  private readonly runner = inject(CommandRunner);
  private readonly store = inject(WorkspaceStore);
  // private readonly shell = inject(ShellStateMachine);
  private readonly suggestionService = inject(SuggestionService);


  protected readonly externalQueryInput = signal('');
  protected readonly query = linkedSignal(() => this.externalQueryInput());

  protected readonly suggestions = computed<SuggestionList>(
    () => suggestionList(this.suggestionService.suggestionsFor(this.query(), this.getCursorPosition())));

  protected readonly selectedIndex = linkedSignal<SuggestionList, Index>({
    source: this.suggestions,
    computation: (newSuggestions) => {
      return newSuggestions.all.length > 0 ? 0 : undefined;
    }
  });


  protected readonly busy = computed(() => false);

  protected readonly commandField = COMMAND_FIELD;


  private readonly bar = viewChild<ElementRef<HTMLInputElement>>('bar');
  constructor() {
    effect(() => this.focus(this.bar()?.nativeElement));
  }

  protected onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected onKeydown(event: KeyboardEvent): void {

    switch (event.key) {
      case 'Tab':
        event.preventDefault();
        this.acceptSuggestion();
        break;
      case ' ':
        // Ctrl + Space highlights the next suggestion, Ctrl + Shift + Space the previous one.
        if (!event.ctrlKey || this.suggestions().all.length === 0) return;
        event.preventDefault();
        this.selectSuggestion(event.shiftKey ? prevCyclicIndex : nextCyclicIndex);
        break;
      case 'Enter':
        event.preventDefault();
        void this.submit();
        break;
    }
  }

  private selectSuggestion(move: IndexMove) {
    this.selectedIndex.set(move(this.suggestions().range, this.selectedIndex()));
  }

  getCursorPosition(): number {
    const position = this.bar()?.nativeElement?.selectionStart;

    if (position !== null && position !== undefined) return position;
    throw new Error('Cannot get cursor position from query input.');
  }

  acceptSuggestion() {


    if (this.suggestions().all.length > 0 && this.selectedIndex() !== undefined) {
      const suggestion = this.suggestions().all[this.selectedIndex()!];

      const newQuery = this.suggestionService.replaceWordAtPosition(this.query(), this.getCursorPosition(), suggestion);
      if (newQuery == 'not-found') {
        this.query.set(this.query() + suggestion + ' ');
      }
      else {
        console.log('NEW QUERY', newQuery);
        console.log('ACCEPTING SUGGESTION: ', suggestion);
        this.query.set(newQuery + ' ');
      }
    }
  }

  protected async submit(): Promise<void> {
    const text = this.query();
    const parsedCommand = new CommandVisitor().visit(parseDSLCommand(text));

    const commandResult = parsedCommand === null
      ? resultOfUnrecognized(text)
      : await this.runner.run(parsedCommand);
    this.store.setResult(commandResult);
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
