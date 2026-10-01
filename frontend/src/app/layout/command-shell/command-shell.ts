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
  resource,
  signal,
  viewChild,
} from '@angular/core';

import { AuthorLookup } from '@app/commands/author-lookup';
import { CommandRunner } from '@app/commands/command-runner';
import { GridDirection, ItemOpener } from '@app/commands/item-opener';
import type { ItemView } from '@workspace/views/view-node';
import { WorkspaceStore } from '@app/state/workspace-store';
import { AppliedCompletion, applyCompletion, SuggestionService } from './suggestion-service';
import { authorValueAt, canContinueOnNewLine, CompletionItem } from './autocomplete';
import { Index, IndexMove, indexRange, IndexRange, nextCyclicIndex, prevCyclicIndex } from '@core/index';
import { checkCommand } from './command-visitor';
import { COMMAND_DESCRIPTIONS } from './command-descriptions';
import { formatAround } from './command-format';

interface FieldAttrs {
  readonly name: string;
  readonly autocomplete: string;
}

const COMMAND_FIELD: FieldAttrs = {
  name: 'ib-command',
  autocomplete: 'off',
};

type EnterAction = 'open' | 'run' | 'newline';

/** A removal waiting for the user's yes or no. */
interface PendingRemoval {
  readonly url: string;
  readonly title: string;
}

/** A short word in the status bar after an action; any typing clears it. */
interface Notice {
  readonly text: string;
  readonly kind: 'error' | 'info';
}

const YES = ['yes', 'y'];
const NO = ['no', 'n'];
const ANSWERS = ['yes', 'no'];

/** Only list items that open as a book can be removed as one. */
function isBook(item: ItemView): boolean {
  return item.open?.startsWith('/api/books/') ?? false;
}

function titleOf(item: ItemView): string {
  return item.properties.find(p => p.role === 'primary')?.value ?? 'this book';
}

const ENTER_HINT: Record<EnterAction, string> = {
  open: 'open the selection',
  run: 'run',
  newline: 'new line',
};

const ARROW_DIRECTION: Record<string, GridDirection> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
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
  private readonly authors = inject(AuthorLookup);

  /** Screen readers announce the highlighted item while focus stays in the bar. */
  protected readonly activeItemId = computed(() => this.opener.selectedElementId() ?? null);
  // private readonly shell = inject(ShellStateMachine);
  private readonly suggestionService = inject(SuggestionService);


  protected readonly externalQueryInput = signal('');
  protected readonly query = linkedSignal(() => this.externalQueryInput());
  // Caret position in the query. Defaults to the end whenever the query is replaced programmatically.
  private readonly cursorPosition = linkedSignal(() => this.query().length);

  // --- Status bar --------------------------------------------------------------

  protected readonly hasText = computed(() => this.query().trim() !== '');
  protected readonly multiLine = computed(() => this.query().includes('\n'));

  private readonly check = computed(() => checkCommand(this.query()));

  /** Whether the text could be sent as it stands: a command, or while a question is open, an answer. */
  protected readonly valid = computed(() =>
    this.pendingRemoval() !== undefined ? this.isAnswer() : this.check().valid);

  /** The command the text is, once it is a valid one. */
  protected readonly currentCommand = computed(() => {
    const { command, valid } = this.check();
    return valid && command !== null ? command.command : undefined;
  });

  /** What the typed command does; only for a valid one. */
  protected readonly description = computed(() => {
    const { command, valid } = this.check();
    return valid && command !== null ? COMMAND_DESCRIPTIONS[command.command] : undefined;
  });

  /** "remove book" asked; the next Enter answers it. */
  protected readonly pendingRemoval = signal<PendingRemoval | undefined>(undefined);

  protected readonly notice = signal<Notice | undefined>(undefined);

  private readonly answer = computed(() => this.query().trim().toLowerCase());
  protected readonly isAnswer = computed(() => [...YES, ...NO].includes(this.answer()));

  /** Set when an invalid command was sent; any edit clears it. */
  protected readonly rejected = linkedSignal<string, boolean>({
    source: this.query,
    computation: () => false,
  });

  protected readonly enterHint = computed(() => ENTER_HINT[this.plainEnterAction()]);

  // The existing author being picked ("by author her"), if any.
  private readonly authorValue = computed(() => authorValueAt(this.query(), this.cursorPosition()));
  private readonly authorTerm = computed(() => this.authorValue()?.text.trim() || undefined);

  // Catalog authors matching it; idle while no name is being typed.
  private readonly authorMatches = resource({
    params: () => this.authorTerm(),
    loader: ({ params, abortSignal }) => this.authors.search(params, abortSignal),
  });

  // Each match replaces the whole name typed so far. One already typed exactly
  // is not offered again.
  private readonly authorChips = computed<CompletionItem[]>(() => {
    const span = this.authorValue();
    if (span === undefined || this.authorTerm() === undefined || !this.authorMatches.hasValue()) return [];

    return this.authorMatches.value()
      .filter(match => match.name !== span.text.trim())
      .map(match => ({
        label: match.name,
        insertText: match.name,
        replaceStart: span.start,
        replaceEnd: span.end,
        caret: match.name.length,
      }));
  });

  // Catalog names first: while one is being typed, they are what Tab should take.
  protected readonly suggestions = computed<SuggestionList>(() => suggestionList(
    this.pendingRemoval() !== undefined
      ? this.answerChips()
      : [
          ...this.authorChips(),
          ...this.suggestionService.suggestionsFor(this.query(), this.cursorPosition()),
        ]));

  // While a question is open the only things to type are its answers.
  private readonly answerChips = computed<CompletionItem[]>(() => ANSWERS
    .filter(answer => answer.startsWith(this.answer()) && answer !== this.answer())
    .map(answer => ({
      label: answer,
      insertText: answer,
      replaceStart: 0,
      replaceEnd: this.query().length,
      caret: answer.length,
    })));

  // Ctrl+` / Ctrl+~ move the highlight; Tab accepts it. Any change to the
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


  private readonly bar = viewChild<ElementRef<HTMLTextAreaElement>>('bar');
  constructor() {
    effect(() => this.focus(this.bar()?.nativeElement));

    // Grow with the lines typed (up to the CSS max-height, then scroll).
    afterRenderEffect(() => {
      this.query();
      const bar = this.bar()?.nativeElement;
      if (bar === undefined) return;
      bar.style.height = 'auto';
      bar.style.height = `${bar.scrollHeight}px`;
    });

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
    this.notice.set(undefined);
    const input = event.target as HTMLTextAreaElement;
    this.query.set(input.value);
    this.cursorPosition.set(input.selectionStart ?? input.value.length);
  }

  // Caret moves without typing (arrow keys, mouse clicks) don't fire `input`.
  protected onSelectionChange(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
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
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        // Bare arrows move the caret; Alt moves the item selection through the
        // grid. Always claimed, even with nothing to move through: Alt+Left/Right
        // is the browser's Back/Forward.
        if (!event.altKey) return;
        event.preventDefault();
        this.opener.moveInGrid(ARROW_DIRECTION[event.key]);
        break;
      case '`':
      case '~':
        // Ctrl+` / Ctrl+~ (Shift+`) move the suggestion highlight. Matched on the
        // typed character, not the key position, so no layout turns this into
        // another shortcut (where ` is not on that key, e.g. Ctrl+0 zoom reset).
        if (!event.ctrlKey || event.altKey || event.metaKey) return;
        event.preventDefault();
        this.moveSelection(event.key === '`' ? nextCyclicIndex : prevCyclicIndex);
        break;
      case ' ':
        // A completion already ends in a space; Space after it just confirms it.
        if (!this.justCompleted() || this.query()[this.cursorPosition() - 1] !== ' ') return;
        event.preventDefault();
        this.lastApplied.set(undefined);
        break;
      case 'Home':
      case 'End':
        // Bare Home/End scroll the workspace; once the command spans lines they
        // move within the line instead and must not reach it.
        if (!event.ctrlKey && !event.altKey && !event.metaKey && this.query().includes('\n')) {
          event.stopPropagation();
        }
        break;
      case 'Enter': {
        const action = this.enterAction(event);
        event.preventDefault();
        if (action === 'newline') this.insertAtCaret('\n');
        else if (action === 'open') this.opener.openSelected();
        else void this.submit();
        break;
      }
      case 'Escape':
        event.preventDefault();
        // Text first: Escape clears it. An empty bar goes back to where the
        // current item was opened from.
        if (this.query() !== '') {
          this.query.set('');
          return;
        }
        if (this.pendingRemoval() !== undefined) {
          this.cancelRemoval();
          return;
        }
        this.opener.back();
        break;
    }
  }

  /**
   * What Enter does with the text as it stands:
   * - an empty bar has no command, so Enter opens the selected item;
   * - Shift+Enter always starts a new line, Ctrl/Cmd+Enter always runs;
   * - on a blank line — the second Enter after a parameter — it runs;
   * - otherwise it starts a new line when the command could take another
   *   parameter ("add book Dune"), and runs when nothing more can follow
   *   ("dashboard", "add author Homer", or unrecognized text).
   */
  private enterAction(event: KeyboardEvent): EnterAction {
    if (this.pendingRemoval() !== undefined) return 'run';
    if (this.query().trim() === '') return 'open';
    if (event.shiftKey) return 'newline';
    if (event.ctrlKey || event.metaKey) return 'run';
    return this.plainEnterAction();
  }

  /** What a bare Enter does with the text as it stands; also shown in the status bar. */
  private plainEnterAction(): EnterAction {
    const text = this.query();
    if (text.trim() === '') return 'open';
    if (this.onBlankLine()) return 'run';
    return canContinueOnNewLine(text) ? 'newline' : 'run';
  }

  private onBlankLine(): boolean {
    const text = this.query();
    const caret = this.cursorPosition();
    const start = text.lastIndexOf('\n', caret - 1) + 1;
    const end = text.indexOf('\n', caret);
    return text.slice(start, end < 0 ? text.length : end).trim() === '';
  }

  // A pasted command is laid out like a typed one: parameters indented under it.
  protected onPaste(event: ClipboardEvent): void {
    const pasted = event.clipboardData?.getData('text/plain');
    if (!pasted) return;
    event.preventDefault();
    this.insertAtCaret(pasted);
  }

  // --- Remove book: confirm first -------------------------------------------------

  /** Asks about the highlighted book; says what to do when there is none. */
  private askToRemove(): void {
    const item = this.opener.selectedItem();
    this.query.set('');

    if (item === undefined || !isBook(item) || item.open === undefined) {
      this.notice.set({ kind: 'error', text: 'Select a book in the list first, then run remove book.' });
      return;
    }
    this.pendingRemoval.set({ url: item.open, title: titleOf(item) });
  }

  private async answerRemoval(pending: PendingRemoval): Promise<void> {
    const answer = this.answer();

    if (YES.includes(answer)) {
      this.pendingRemoval.set(undefined);
      this.query.set('');
      this.store.setResult(await this.runner.remove(pending.url));
    } else if (NO.includes(answer)) {
      this.cancelRemoval();
    } else {
      // Keep the text and the question: the answer just is not one yet.
      this.notice.set({ kind: 'error', text: 'Type yes or no.' });
    }
  }

  private cancelRemoval(): void {
    this.pendingRemoval.set(undefined);
    this.query.set('');
    this.notice.set({ kind: 'info', text: 'Nothing was removed.' });
  }

  /** Inserts text at the caret, replacing any selection, and lays the result out. */
  private insertAtCaret(inserted: string): void {
    const bar = this.bar()?.nativeElement;
    const text = this.query();
    const start = bar?.selectionStart ?? this.cursorPosition();
    const end = bar?.selectionEnd ?? start;

    this.setFormatted(text.slice(0, start) + inserted + text.slice(end), start + inserted.length);
  }

  private setFormatted(text: string, caret: number): void {
    const formatted = formatAround(text, caret);
    this.query.set(formatted.text);
    // After query.set, since the cursor position is linked to the query.
    this.cursorPosition.set(formatted.caret);
  }

  private moveSelection(move: IndexMove): void {
    const list = this.suggestions();
    if (list.all.length === 0) return;

    this.selectedIndex.set(move(list.range, this.selectedIndex()));
  }

  private acceptSelected(): void {
    const index = this.selectedIndex();
    if (index === undefined) return;

    const item = this.suggestions().all[index];
    const completed = applyCompletion(this.query(), item);
    // A completion that starts the next line is laid out like a typed newline.
    const applied = item.insertText.includes('\n') ? formatAround(completed.text, completed.caret) : completed;
    this.lastApplied.set(applied);
    this.query.set(applied.text);
    // After query.set, since the cursor position is linked to the query.
    this.cursorPosition.set(applied.caret);
  }

  protected async submit(): Promise<void> {
    const text = this.query();

    const pending = this.pendingRemoval();
    if (pending !== undefined) {
      await this.answerRemoval(pending);
      return;
    }

    const { command, valid } = checkCommand(text);

    // Nothing to send: say so in the status bar and leave the text to fix,
    // rather than replacing what the workspace shows.
    if (!valid || command === null) {
      this.rejected.set(true);
      return;
    }

    if (command.command === 'remove book') {
      this.askToRemove();
      return;
    }

    this.query.set('');
    const commandResult = await this.runner.run(command);
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

  private focus(input: HTMLTextAreaElement | undefined): void {
    input?.focus();
    input?.select();
  }
}

