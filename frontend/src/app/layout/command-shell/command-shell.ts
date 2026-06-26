// command-shell.ts
//
// Layout chrome (lives in layout/). The view-model: owns the bar's input state, derives
// ranked suggestions, handles the keyboard. It no longer talks to the parent — it reads
// `viewActive` from the store and hands submissions straight to the runner. No @Input,
// no @Output; main-layout becomes <app-workspace/> + <app-command-shell/> with no bindings.

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
import { CommandRegistry, type CommandSpec } from '../../commands//command-registry';
import { CommandRunner } from '../../commands/command-runner';
import { WorkspaceStore } from '../workspace/workspace-store';             // adjust path

// Shown before the user types anything — the most important entry points, in order.
const FEATURED: readonly string[] = ['add book', 'list books', 'search', 'dashboard'];

// Power-user row navigation. One place for the direction (COMMANDS.md: j = next, k = prev).
const NAV_KEYS: Readonly<Record<string, string>> = { j: 'next', k: 'prev' };

@Component({
  selector: 'app-command-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command-shell.html',
  styleUrl: './command-shell.scss',
})
export class CommandShell {
  private readonly registry = inject(CommandRegistry);
  private readonly runner = inject(CommandRunner);
  private readonly store = inject(WorkspaceStore);

  private readonly commands = this.registry.commands;

  protected readonly query = signal('');
  protected readonly selectedIndex = signal(0);

  /** Exposed for the template; gates the nav reference + Ctrl+J/K, owned by the store. */
  // protected readonly viewActive = this.store.viewActive;

  // Empty input -> the featured shortlist; otherwise the ranked matches.
  protected readonly suggestions = computed(() => {
    const all = this.commands();
    const q = this.query().trim();
    return pickFeatured(all);
  });

  protected readonly selected = computed<CommandSpec | null>(() => {
    const list = this.suggestions();
    return list[Math.min(this.selectedIndex(), Math.max(0, list.length - 1))] ?? null;
  });

  // The two reference cards: full nav set, and the general shell verbs.
  protected readonly navHint = computed(() => this.commands().filter(c => c.group === 'nav'));
  protected readonly genHint = computed(() =>
    this.commands().filter(c => c.group === 'shell' && c.command !== 'quit'),
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
    // Power-user navigation — only with a view up; handed straight to the runner.
    // if (event.ctrlKey && NAV_KEYS[event.key] && this.store.viewActive()) {
    //   event.preventDefault();
    //   void this.runner.run({ kind: 'command', command: NAV_KEYS[event.key] });
    //   return;
    // }

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
        this.dispatch(this.selected());
        break;
      case 'Escape':
        event.preventDefault();
        this.reset();
        break;
    }
  }

  protected runAt(index: number): void {
    this.dispatch(this.suggestions()[index] ?? null);
  }

  /** Send button (mouse) — run whatever is currently highlighted. */
  protected submit(): void {
    this.dispatch(this.selected());
  }

  private move(delta: number): void {
    const max = this.suggestions().length - 1;
    if (max < 0) return;
    this.selectedIndex.set(Math.min(max, Math.max(0, this.selectedIndex() + delta)));
  }

  private dispatch(cmd: CommandSpec | null): void {
    if (cmd) {
      void this.runner.run({ kind: 'command', command: cmd.command });
    } else {
      const term = this.query().trim();
      if (term) void this.runner.run({ kind: 'search', term }); // fall-through (ADR 13)
    }
    this.reset();
  }

  private reset(): void {
    this.query.set('');
    this.selectedIndex.set(0);
  }
}

/** The featured shortlist, in FEATURED order, skipping any the registry doesn't carry. */
function pickFeatured(commands: readonly CommandSpec[]): CommandSpec[] {
  return FEATURED
    .map(id => commands.find(c => c.command === id))
    .filter((c): c is CommandSpec => c !== undefined);
}

/**
 * Rank commands for a typed query (COMMANDS.md model):
 *  1. exact full-command match first
 *  2. leading-verb match outranks contained-token match
 *  3. alphabetical tiebreak (stable — never reorders under the cursor)
 *  4. navigation gated by `viewActive`
 *  5. no match -> empty list (caller runs the raw input as search)
 */
function rank(commands: readonly CommandSpec[], query: string, viewActive: boolean): CommandSpec[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const qTokens = q.split(/\s+/);

  return commands
    .filter(c => c.group !== 'nav' || viewActive)
    .map(spec => ({ spec, score: score(spec, qTokens) }))
    .filter(x => x.score >= 0)
    .sort((a, b) => a.score - b.score || a.spec.command.localeCompare(b.spec.command))
    .map(x => x.spec);
}

function score(spec: CommandSpec, qTokens: readonly string[]): number {
  const cTokens = spec.command.split(' ');
  const all = qTokens.every(q => cTokens.some(c => c.startsWith(q)));
  if (!all) return -1;
  if (spec.command === qTokens.join(' ')) return 0;     // exact full command
  if (cTokens[0].startsWith(qTokens[0])) return 1;      // leading verb
  return 2;                                             // contained token
}
