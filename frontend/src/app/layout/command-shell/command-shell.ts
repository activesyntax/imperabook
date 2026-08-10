import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
  WritableSignal,
  HostListener,
} from '@angular/core';

import { Command, CommandSpec } from "@core/model";
import { CommandRunner, CommandInput } from '@app/commands/command-runner';
import { CommandProvider } from '@app/commands/command-provider';
import { WorkspaceStore } from '@app/state/workspace-store';
import { Index, IndexMove as IndexChange, indexRange, nextCyclicIndex, prevCyclicIndex } from '@core/index';
import { handleKeyboardEvent, KeyboardActions } from '@core/keyboard';




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

  protected readonly queryDraft = signal('');
  protected readonly query = computed(() => this.queryDraft().trim());

  protected readonly inputMode = signal(false);

  protected readonly selectedIndex: WritableSignal<Index> = signal(undefined);
  protected readonly selectedFixedIndex: WritableSignal<Index> = signal(undefined);

  protected readonly selectedCommand = computed(() => {

    const index = this.selectedIndex();
    if (index === undefined)
      return undefined;

    return this.suggestions()[index];
  });

  protected readonly suggestions = computed(() => this.commands.suggestionsFor(this.query(), undefined));
  protected readonly fixed = computed(() =>
    this.commands.all()
      .filter(c => c.group === 'fixed')
      .toSorted((a, b) => (a.order ?? 0) - (b.order ?? 0)));

  // protected readonly commandList = computed(() => [...this.suggestions(), ...this.fixed(),]);

  private readonly bar = viewChild<ElementRef<HTMLInputElement>>('bar');

  constructor() {
    afterNextRender(() => this.focusBar());
  }

  @HostListener('document:keydown', ['$event'])
  protected onGlobalKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
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
  protected onInput(event: Event): void {
    this.queryDraft.set((event.target as HTMLInputElement).value);

    const query = this.query()

    if (query.length <= 0) {
      this.selectedIndex.set(undefined);
      return;
    }

    const matchIndex = this.suggestions().findIndex(c => c.command.includes(query));
    // const matchFixedIndex = this.fixed().findIndex(c => c.command.includes(query));

    this.selectedIndex.set(matchIndex);
    // this.selectedFixedIndex.set(matchFixedIndex);
  }

  private readonly keyboardActions: KeyboardActions = {
    Tab: (e) => this.handleTab(e),
    Enter: (e) => this.handleEnter(e),
    Escape: (e) => this.handleEscape(e),
  };

  protected onKeydown(event: KeyboardEvent): void {
    handleKeyboardEvent(event, this.keyboardActions);
  }

  private handleTab(event: KeyboardEvent): void {

    if (this.suggestions().length === 1 && this.selectedCommand() !== undefined) {
      const cmd = this.selectedCommand();
      if (this.isCommandAccepted(cmd)) return;
    }

    if (event.shiftKey) {
      this.setSelectedIndexTo(prevCyclicIndex)
    }
    else {
      this.setSelectedIndexTo(nextCyclicIndex)
    }
  }

  private isCommandAccepted(cmd: CommandSpec | undefined): boolean {

    if (cmd !== undefined && cmd.command !== this.query().toLowerCase()) {
      this.queryDraft.set(cmd.command);
      this.selectedIndex.set(0);
      return true;
    }
    return false;
  }

  private handleEnter(event: KeyboardEvent): void {

    const cmd = this.selectedCommand();
    if (this.isCommandAccepted(cmd)) return;
    this.run(cmd);
  }

  private handleEscape(event: KeyboardEvent): void {

    this.reset();
  }

  protected submit(): void {

    this.run(this.selectedCommand());

  }

  private setSelectedIndexTo(indexChange: IndexChange): void {
    const range = indexRange(this.suggestions().length);
    const index = indexChange(range, this.selectedIndex());
    this.selectedIndex.set(index);
  }

  private run(cmd: CommandSpec | undefined): void {
    this.reset();

    if (cmd !== undefined) {

      console.log("COMMAND:" + cmd);

      void this.dispatch(cmd);

      // TODO: ONLY ON SUCCESS GOT TO INPUT MODE
      if (cmd.parameters.length > 0) {

        this.inputMode.set(true);
      }

      return;
    }

  }

  private async dispatch(cmd: CommandSpec, answers: CommandInput = {}): Promise<void> {
    const result = await this.runner.run(cmd, answers);
    this.store.setResult(result);
  }

  private reset(): void {
    this.queryDraft.set('');
    this.selectedIndex.set(undefined);
  }
}
