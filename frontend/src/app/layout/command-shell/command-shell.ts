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
import { ItemOpener } from '@app/commands/item-opener';
import { resultOfUnrecognized } from '@app/commands/command-error';
import { WorkspaceStore } from '@app/state/workspace-store';
import { AppliedCompletion, applyCompletion, SuggestionService } from './suggestion-service';
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
  private readonly opener = inject(ItemOpener);
  // private readonly shell = inject(ShellStateMachine);
  private readonly suggestionService = inject(SuggestionService);


  protected readonly externalQueryInput = signal('');
  protected readonly query = linkedSignal(() => this.externalQueryInput());
  // Caret position in the query. Defaults to the end whenever the query is replaced programmatically.
  private readonly cursorPosition = linkedSignal(() => this.query().length);

  protected readonly suggestions = computed<SuggestionList>(
    () => suggestionList(this.suggestionService.suggestionsFor(this.query(), this.cursorPosition())));

  // Alt+Left/Right move the highlight; Tab accepts it. Any change to the
  // suggestions (typing, moving the caret, accepting) starts again at the first.
  protected readonly selectedIndex = linkedSignal<SuggestionList, Index>({
    source: this.suggestions,
    computation: list => (list.all.length > 0 ? 0 : undefined),
  });

  // The completion the last Tab inserted.
  private readonly lastApplied = signal<AppliedCompletion | undefined>(undefined);

  // True while the query and caret are exactly as the last Tab left them.
  private readonly justCompleted = computed(() => {
    const applied = this.lastApplied();
    return applied !== undefined
      && applied.text === this.query()
      && applied.caret === this.cursorPosition();
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
        // Only claimed when there is something to accept: otherwise Tab and
        // Shift+Tab move focus as usual, so the bar is no keyboard trap.
        if (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return;
        if (this.selectedIndex() === undefined) return;
        event.preventDefault();
        this.acceptSelected();
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        if (!event.altKey) return;
        // Always claimed, even with nothing to move through: Alt+Left/Right is
        // the browser's Back/Forward, which would leave the app.
        event.preventDefault();
        this.moveSelection(event.key === 'ArrowRight' ? nextCyclicIndex : prevCyclicIndex);
        break;
      case ' ':
        // A completion already ends in a space; Space after it just confirms it.
        if (!this.justCompleted() || this.query()[this.cursorPosition() - 1] !== ' ') return;
        event.preventDefault();
        this.lastApplied.set(undefined);
        break;
      case 'Enter':
        event.preventDefault();
        // An empty bar has no command to run; Enter opens the selected item instead.
        if (this.query().trim() === '') {
          this.opener.openSelected();
          return;
        }
        void this.submit();
        break;
      case 'Escape':
        event.preventDefault();
        this.query.set('');
        break;
    }
  }

  private moveSelection(move: IndexMove): void {
    const list = this.suggestions();
    if (list.all.length === 0) return;

    this.selectedIndex.set(move(list.range, this.selectedIndex()));
  }

  private acceptSelected(): void {
    const index = this.selectedIndex();
    if (index === undefined) return;

    const applied = applyCompletion(this.query(), this.suggestions().all[index]);
    this.lastApplied.set(applied);
    this.query.set(applied.text);
    // After query.set, since the cursor position is linked to the query.
    this.cursorPosition.set(applied.caret);
  }

  protected async submit(): Promise<void> {
    const text = this.query();
    this.query.set('');
    const parsedCommand = new CommandVisitor().visit(parseDSLCommand(text));

    const commandResult = parsedCommand === null
      ? resultOfUnrecognized(text)
      : await this.runner.run(parsedCommand);
    this.store.setResult(commandResult);

    // Only if the bar is still empty: the user may have started the next command meanwhile.
    if (commandResult.keepQuery === true && this.query() === '') {
      this.query.set(text);
    }
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
