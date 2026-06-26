// The shared signal state both the shell and the workspace read. It removes the
// shell -> main-layout -> workspace relay: the shell writes intent through the runner,
// the runner writes results here, the workspace renders straight off these signals.
//
// It holds the rendered view, the selectable row refs (in display order), the current
// selection, a pending flag, and a small history for `back`. It is deliberately
// ViewNode-agnostic except for `viewActive`, which is the one place it inspects a kind.

import { computed, Injectable, signal } from '@angular/core';
import type { ViewNode } from './views/view-node'; // <-- adjust to your actual path

interface Rendered {
  readonly view: ViewNode;
  /** Selectable row refs in display order — supplied by whoever built the view. */
  readonly refs: readonly string[];
}

@Injectable({ providedIn: 'root' })
export class WorkspaceStore {
  private readonly _current = signal<Rendered | null>(null);
  private readonly _selIndex = signal(0);
  private readonly _pending = signal(false);
  private readonly history: Rendered[] = [];

  readonly view = computed(() => this._current()?.view ?? null);
  readonly pending = this._pending.asReadonly();
  readonly selectedRef = computed(() => this._current()?.refs[this._selIndex()] ?? null);

  // // Gates the shell's navigation suggestions + Ctrl+J/K shortcuts.
  // // RECONCILE: these two kind strings must match your ViewNode union.
  // readonly viewActive = computed(() => {
  //   const v = this.view();
  //   return v?.type === 'card' || v?.type === 'DetailView';
  // });
  //
  setPending(pending: boolean): void {
    this._pending.set(pending);
  }

  /** Replace the workspace contents, remembering the previous view for `back`. */
  setResult(result: Rendered): void {
    const current = this._current();
    if (current) this.history.push(current);
    this._current.set(result);
    this._selIndex.set(0);
  }

  selectNext(): void { this.moveTo(this._selIndex() + 1); }
  selectPrev(): void { this.moveTo(this._selIndex() - 1); }
  selectFirst(): void { this.moveTo(0); }
  selectLast(): void { this.moveTo(this.refCount() - 1); }

  back(): void {
    const previous = this.history.pop();
    if (!previous) return;
    this._current.set(previous);
    this._selIndex.set(0);
  }

  private refCount(): number {
    return this._current()?.refs.length ?? 0;
  }

  private moveTo(index: number): void {
    const max = this.refCount() - 1;
    if (max < 0) return;
    this._selIndex.set(Math.min(max, Math.max(0, index)));
  }
}
