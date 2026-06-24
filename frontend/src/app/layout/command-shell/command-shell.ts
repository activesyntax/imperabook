// command-shell.ts
//
// Layout chrome (lives in layout/). Command mode only for now: type -> rank suggestions
// -> Enter runs the highlighted command (or falls through to search). It raises one event
// upward; the parent (main-layout) executes it and renders the response in the workspace.
// No draft, no prompting yet.

import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

/** Shape served by the backend command registry (a static JSON for now). */
export interface CommandSpec {
  readonly command: string;
  readonly description: string;
  readonly group: 'book' | 'author' | 'query' | 'view' | 'nav' | 'shell';
}

/** What the shell hands to the parent: a chosen command, or a raw search fall-through. */
export type ShellSubmit =
  | { readonly kind: 'command'; readonly command: string }
  | { readonly kind: 'search'; readonly term: string };

// Swap for the real endpoint (e.g. '/commands') once the backend serves it.
const COMMANDS_URL = '/assets/commands.json';

// Power-user row navigation. One place for the direction (COMMANDS.md: j = next, k = prev).
const NAV_KEYS: Readonly<Record<string, string>> = { j: 'next', k: 'prev' };

@Component({
  selector: 'app-command-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command-shell.html',
  styleUrl: './command-shell.scss',
})
export class CommandShell {
  /** Whether a navigable view is on screen — gates navigation suggestions + shortcuts. */
  readonly viewActive = input(false);

  /** One channel out. The parent switches on `kind`, runs it, and renders the response. */
  readonly submitted = output<ShellSubmit>();

  private readonly http = inject(HttpClient);
  private readonly commands = toSignal(this.http.get<CommandSpec[]>(COMMANDS_URL), {
    initialValue: [] as CommandSpec[],
  });

  protected readonly query = signal('');
  protected readonly selectedIndex = signal(0);

  protected readonly suggestions = computed(() =>
    rank(this.commands(), this.query(), this.viewActive()),
  );
  protected readonly selected = computed<CommandSpec | null>(() => {
    const list = this.suggestions();
    return list[Math.min(this.selectedIndex(), Math.max(0, list.length - 1))] ?? null;
  });

  // Always-visible legend: the nav and general verbs, straight from the registry.
  protected readonly navHint = computed(() =>
    this.commands().filter(c => ['next', 'prev', 'open', 'back'].includes(c.command)),
  );
  protected readonly genHint = computed(() =>
    this.commands().filter(c => c.group === 'shell' && c.command !== 'cancel' && c.command !== 'quit'),
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
    // Power-user navigation — only with a view up; emitted as a plain command.
    if (event.ctrlKey && NAV_KEYS[event.key] && this.viewActive()) {
      event.preventDefault();
      this.submitted.emit({ kind: 'command', command: NAV_KEYS[event.key] });
      return;
    }

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
        this.run(this.selected());
        break;
      case 'Escape':
        event.preventDefault();
        this.reset();
        break;
    }
  }

  protected runAt(index: number): void {
    this.run(this.suggestions()[index] ?? null);
  }

  private move(delta: number): void {
    const max = this.suggestions().length - 1;
    if (max < 0) return;
    this.selectedIndex.set(Math.min(max, Math.max(0, this.selectedIndex() + delta)));
  }

  private run(cmd: CommandSpec | null): void {
    if (cmd) {
      this.submitted.emit({ kind: 'command', command: cmd.command });
    } else {
      const term = this.query().trim();
      if (term) this.submitted.emit({ kind: 'search', term }); // fall-through (ADR 13)
    }
    this.reset();
  }

  private reset(): void {
    this.query.set('');
    this.selectedIndex.set(0);
  }
}

/**
 * Rank commands for a typed query (COMMANDS.md model):
 *  1. exact full-command match first
 *  2. leading-verb match outranks contained-token match
 *  3. alphabetical tiebreak (stable — never reorders under the cursor)
 *  4. navigation gated by `viewActive`
 *  5. no match -> empty list (caller runs the raw input as search)
 *
 * Token-match, not whole-string prefix: each typed token must prefix *some* command
 * token, so `book` still hits `add book`.
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
