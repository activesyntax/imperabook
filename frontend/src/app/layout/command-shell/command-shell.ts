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

import { CommandSpec } from "@core/model";
import { CommandRunner } from '../../commands/command-runner';
import { CommandProvider } from '@app/commands/command-provider';
import { Index, IndexMove as IndexChange, indexRange, nextCyclicIndex, prevCyclicIndex } from '@core/index';

type CommandKey = 'Tab' | 'Enter' | 'Escape';
type KeyboardActions = Record<CommandKey, (e: KeyboardEvent) => void>;

@Component({
  selector: 'app-command-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command-shell.html',
  styleUrl: './command-shell.scss',
})
export class CommandShell {
  private readonly commands = inject(CommandProvider);
  private readonly runner = inject(CommandRunner);

  protected readonly queryDraft = signal('');
  protected readonly query = computed(() => this.queryDraft().trim());

  protected readonly selectedIndex: WritableSignal<Index> = signal(undefined);
  protected readonly selectedCommand = computed(() => {

    const index = this.selectedIndex();
    if (index === undefined)
      return undefined;

    return this.suggestions()[index];
  });

  protected readonly suggestions = computed(() => this.commands.suggestionsFor(this.query()));

  protected readonly navHint = computed(() => this.commands.all().filter(c => c.group === 'nav'));
  protected readonly genHint = computed(() =>
    this.commands.all().filter(c => c.group === 'shell' && c.command !== 'quit'),
  );

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

    this.selectedIndex.set(matchIndex);
  }

  private readonly keyboardActions: KeyboardActions = {
    Tab: (e) => this.handleTab(e),
    Enter: (e) => this.handleEnter(e),
    Escape: (e) => this.handleEscape(e),
  };

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key in this.keyboardActions) {
      event.preventDefault();
      this.keyboardActions[event.key as CommandKey](event);
    }
  }

  private handleTab(event: KeyboardEvent): void {

    if (event.shiftKey) {
      this.setSelectedIndexTo(prevCyclicIndex)
    }
    else {
      this.setSelectedIndexTo(nextCyclicIndex)
    }
  }

  private handleEnter(event: KeyboardEvent): void {
    const cmd = this.selectedCommand();
    if (cmd !== undefined && cmd.command !== this.query().toLowerCase()) {
      this.queryDraft.set(cmd.command);
      this.selectedIndex.set(0);
    }
    else {
      console.log("EXECUTING: " + this.query());
      this.reset();
    }
  }

  private handleEscape(event: KeyboardEvent): void {

    this.reset();
  }

  protected submit(): void {
    // this.runCommand(this.selected());
  }

  private setSelectedIndexTo(indexChange: IndexChange): void {
    const range = indexRange(this.suggestions().length);
    const index = indexChange(range, this.selectedIndex());
    this.selectedIndex.set(index);
  }

  private runCommand(cmd: CommandSpec | null): void {
    if (cmd) {
      void this.runner.run(cmd.command);
    }
    this.reset();
  }

  private reset(): void {
    this.queryDraft.set('');
    this.selectedIndex.set(undefined);
  }
}


