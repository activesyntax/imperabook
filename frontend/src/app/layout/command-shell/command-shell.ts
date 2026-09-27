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

/**
 * Repeated Tabs swap the completion just inserted for the next one, as in
 * zsh's menu-complete. Every step is applied to the query from before the
 * first Tab, using the suggestions offered at that moment.
 */
type CompletionCycle = {
  readonly original: string;
  readonly list: SuggestionList;
  readonly index: number;
  readonly applied: AppliedCompletion;
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

  private readonly cycle = signal<CompletionCycle | undefined>(undefined);

  // The completion the last Tab inserted, cycling or not.
  private readonly lastApplied = signal<AppliedCompletion | undefined>(undefined);

  // True while the query and caret are exactly as the last Tab left them.
  private readonly justCompleted = computed(() => {
    const applied = this.lastApplied();
    return applied !== undefined
      && applied.text === this.query()
      && applied.caret === this.cursorPosition();
  });

  // The cycle lasts only while the query and caret are exactly as its last Tab
  // left them; typing or moving the caret ends it.
  private readonly activeCycle = computed(() => {
    const cycle = this.cycle();
    return cycle !== undefined
      && cycle.applied.text === this.query()
      && cycle.applied.caret === this.cursorPosition()
      ? cycle
      : undefined;
  });

  // While cycling, the list the cycle walks through stays on screen.
  protected readonly shownSuggestions = computed(() => this.activeCycle()?.list ?? this.suggestions());

  protected readonly selectedIndex = computed<Index>(() => {
    const cycle = this.activeCycle();
    if (cycle !== undefined) return cycle.index;
    return this.suggestions().all.length > 0 ? 0 : undefined;
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
        this.cycleSuggestion(event.shiftKey ? prevCyclicIndex : nextCyclicIndex);
        break;
      case ' ':
        // A completion already ends in a space; Space after it just confirms it.
        if (!this.justCompleted() || this.query()[this.cursorPosition() - 1] !== ' ') return;
        event.preventDefault();
        this.cycle.set(undefined);
        this.lastApplied.set(undefined);
        break;
      case 'Enter':
        event.preventDefault();
        void this.submit();
        break;
      case 'Escape':
        event.preventDefault();
        this.query.set('');
        break;
    }
  }

  private cycleSuggestion(move: IndexMove): void {
    const cycle = this.activeCycle();
    const original = cycle?.original ?? this.query();
    const list = cycle?.list ?? this.suggestions();

    const index = move(list.range, cycle?.index);
    if (index === undefined || list.all.length === 0) return;

    const applied = applyCompletion(original, list.all[index]);
    // The next suggestions show at once when there is nothing to cycle to, or
    // when the completion has parameters to fill in ("add book" → "title"):
    // those matter more than switching to a sibling, which more typing reaches.
    const hasFollowUps = this.suggestionService.suggestionsFor(applied.text, applied.caret).length > 0;
    this.cycle.set(list.all.length > 1 && !hasFollowUps ? { original, list, index, applied } : undefined);
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
