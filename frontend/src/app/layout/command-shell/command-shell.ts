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
} from '@angular/core';

import { CommandSpec } from "@core/model";
import { CommandRunner } from '../../commands/command-runner';
import { CommandProvider } from '@app/commands/command-provider';
import { Index, indexRange, nextCyclicIndex, prevCyclicIndex } from '@core/index';


@Component({
  selector: 'app-command-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command-shell.html',
  styleUrl: './command-shell.scss',
})
export class CommandShell {
  private readonly commands = inject(CommandProvider);
  private readonly runner = inject(CommandRunner);

  protected readonly query = signal('');
  protected readonly selectedIndex: WritableSignal<Index> = signal(undefined);

  protected readonly suggestions = computed(() => {
    return this.commands.suggestionsFor(this.query());
  });

  protected readonly selected = computed<CommandSpec | undefined>(() => {
    const list = this.suggestions();
    const index = this.selectedIndex();

    return index ? list[index] : undefined;
  });

  // The two reference cards: full nav set, and the general shell verbs.
  protected readonly navHint = computed(() => this.commands.all().filter(c => c.group === 'nav'));
  protected readonly genHint = computed(() =>
    this.commands.all().filter(c => c.group === 'shell' && c.command !== 'quit'),
  );

  private readonly bar = viewChild<ElementRef<HTMLInputElement>>('bar');

  constructor() {
    afterNextRender(() => this.bar()?.nativeElement.focus());
  }

  protected onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.selectedIndex.set(0);
  }

  protected onKeydown(event: KeyboardEvent): void {
    console.log(event);
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.movePrev();
        break;
      case 'Tab':
        event.preventDefault();
        if (event.shiftKey) {
          this.movePrev();
        }
        else {
          this.moveNext();
        }
        break;
      case 'Enter':
        event.preventDefault();

        const selected = this.selected();
        if (selected) {
          this.runCommand(selected);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.reset();
        break;
    }
  }


  protected submit(): void {
    // this.runCommand(this.selected());
  }

  private moveNext(): void {
    const range = indexRange(this.suggestions().length);
    const index = nextCyclicIndex(range, this.selectedIndex());
    this.selectedIndex.set(index);
  }

  private movePrev(): void {
    const range = indexRange(this.suggestions().length);
    const index = prevCyclicIndex(range, this.selectedIndex());
    this.selectedIndex.set(index);
  }

  private runCommand(cmd: CommandSpec | null): void {
    if (cmd) {
      void this.runner.run(cmd.command);
    }
    this.reset();
  }

  private reset(): void {
    this.query.set('');
    this.selectedIndex.set(undefined);
  }
}


