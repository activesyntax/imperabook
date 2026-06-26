import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { CommandSpec } from "@core/model";
import { CommandRunner } from '../../commands/command-runner';
import { CommandProvider } from '@app/commands/command-provider';


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
  protected readonly selectedIndex = signal(0);

  protected readonly suggestions = computed(() => {
    return this.commands.suggestionsFor(this.query());
  });

  protected readonly selected = computed<CommandSpec | null>(() => {
    const list = this.suggestions();
    return list[Math.min(this.selectedIndex(), Math.max(0, list.length - 1))] ?? null;
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
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.move(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.move(-1);
        break;
      case 'Tab':
      case 'Enter':
        event.preventDefault();
        this.runCommand(this.selected());
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

  private move(delta: number): void {
    const max = this.suggestions().length - 1;
    if (max < 0) return;
    this.selectedIndex.set(Math.min(max, Math.max(0, this.selectedIndex() + delta)));
  }

  private runCommand(cmd: CommandSpec | null): void {
    if (cmd) {
      void this.runner.run(cmd.command);
    }
    this.reset();
  }

  private reset(): void {
    this.query.set('');
    this.selectedIndex.set(0);
  }
}


