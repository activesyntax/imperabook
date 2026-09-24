import {
  afterRenderEffect,
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
import { applyCompletion, SuggestionService } from './suggestion-service';
import { CompletionItem } from './autocomplete';
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

  readonly all: readonly CompletionItem[];
  readonly range: IndexRange;
}

function suggestionList(suggestions: readonly CompletionItem[]): SuggestionList {
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
  // Caret position in the query. Defaults to the end whenever the query is replaced programmatically.
  private readonly cursorPosition = linkedSignal(() => this.query().length);

  protected readonly suggestions = computed<SuggestionList>(
    () => suggestionList(this.suggestionService.suggestionsFor(this.query(), this.cursorPosition())));

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

    // Writing [value] leaves the caret at the end; move it where the query says.
    // Skipped when already there, so a user's selection range is not collapsed.
    afterRenderEffect(() => {
      const position = this.cursorPosition();
      const input = this.bar()?.nativeElement;
      if (input !== undefined && input.selectionStart !== position) {
        input.setSelectionRange(position, position);
      }
    });
  }

  protected onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.query.set(input.value);
    this.cursorPosition.set(input.selectionStart ?? input.value.length);
  }

  // Caret moves without typing (arrow keys, mouse clicks) don't fire `input`.
  protected onSelectionChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cursorPosition.set(input.selectionStart ?? input.value.length);
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

  acceptSuggestion() {
    const index = this.selectedIndex();
    if (index === undefined) return;

    const { text, caret } = applyCompletion(this.query(), this.suggestions().all[index]);
    this.query.set(text);
    // After query.set, since the cursor position is linked to the query.
    this.cursorPosition.set(caret);
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
