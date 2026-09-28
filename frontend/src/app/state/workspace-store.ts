import { computed, Injectable, signal } from '@angular/core';
import type { CommandResult, ViewNode } from '@workspace/views/view-node';

/** What was on screen before an item was opened, and which item that was. */
export interface WorkspaceEntry {
  readonly views: readonly ViewNode[];
  readonly selectedRef: string | undefined;
}

@Injectable({ providedIn: 'root' })
export class WorkspaceStore {
  private readonly _views = signal<readonly ViewNode[]>([]);
  private readonly _history = signal<readonly WorkspaceEntry[]>([]);
  private readonly _returned = signal(false);

  readonly views = computed(() => this._views());

  /**
   * The views on screen were returned to, not newly shown. New content starts
   * at the top; a screen gone back to keeps its place around the item left from.
   */
  readonly returned = this._returned.asReadonly();

  /** Something to go back to: an item was opened from what came before. */
  readonly canGoBack = computed(() => this._history().length > 0);

  /** A login form on screen takes the command bar's place. */
  readonly loginRequested = computed(() => this._views().some((view) => view.type === 'loginForm'));

  /** A command's answer is a fresh start: there is nothing to go back to from it. */
  setResult(result: CommandResult): void {
    this._views.set(result.views);
    this._history.set([]);
    this._returned.set(false);
  }

  /** Shows an opened item, remembering where it was opened from. */
  showOpened(result: CommandResult, from: WorkspaceEntry): void {
    this._history.update(history => [...history, from]);
    this._views.set(result.views);
    this._returned.set(false);
  }

  /** Returns to where the current item was opened from; undefined when there is nowhere to go. */
  back(): WorkspaceEntry | undefined {
    const history = this._history();
    const entry = history.at(-1);
    if (entry === undefined) return undefined;

    this._history.set(history.slice(0, -1));
    this._views.set(entry.views);
    this._returned.set(true);
    return entry;
  }
}
