import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';

import { CommandRunner } from '@app/commands/command-runner';
import { WorkspaceStore } from '@app/state/workspace-store';
import type { ItemView } from '@workspace/views/view-node';

/**
 * Opens list items in full. The server says where each item opens (`open`);
 * this only follows it, so books, authors and anything listed later all open
 * the same way.
 *
 * One item is highlighted at a time — Enter on an empty command bar opens it.
 * A new result starts the highlight over at its first openable item. Escape
 * goes back to where an item was opened from, with that item highlighted.
 */
@Injectable({ providedIn: 'root' })
export class ItemOpener {
  private readonly store = inject(WorkspaceStore);
  private readonly runner = inject(CommandRunner);

  /** Items on screen that have somewhere to open, in display order. */
  readonly openable = computed<readonly ItemView[]>(() =>
    this.store.views().flatMap(view =>
      view.type === 'itemCollection' ? view.items.filter(item => item.open !== undefined) : []));

  readonly selectedRef = linkedSignal<readonly ItemView[], string | undefined>({
    source: this.openable,
    computation: items => items[0]?.ref,
  });

  /** Id of the highlighted item's element, for the command bar's aria-activedescendant. */
  readonly selectedElementId = computed(() => {
    const ref = this.selectedRef();
    return ref === undefined ? undefined : itemElementId(ref);
  });

  /** Set when the highlight moves by keyboard or going back: scroll that item into view once it renders. */
  readonly revealRef = signal<string | undefined>(undefined);

  async open(item: ItemView): Promise<void> {
    if (item.open === undefined) return;

    this.selectedRef.set(item.ref);
    await this.follow(item.open);
  }

  /**
   * Opens any in-app link the server put on a view — an item's `open`, or a
   * link in text such as a book's author. Escape comes back here.
   */
  async follow(href: string): Promise<void> {
    // Captured before the request: the screen the user left, and what was selected on it.
    const from = { views: this.store.views(), selectedRef: this.selectedRef() };
    this.store.showOpened(await this.runner.open(href), from);
  }

  /**
   * Moves the highlight to the next (+1) or previous (-1) openable item. Stops
   * at the ends rather than wrapping: in a long list, the last item jumping to
   * the first is a surprise, not a shortcut.
   */
  move(step: 1 | -1): void {
    const items = this.openable();
    if (items.length === 0) return;

    const current = items.findIndex(i => i.ref === this.selectedRef());
    const next = current < 0 ? 0 : Math.min(Math.max(current + step, 0), items.length - 1);

    this.selectedRef.set(items[next].ref);
    this.revealRef.set(items[next].ref);
  }

  /** Returns to where the current item was opened from; false when there is nowhere to go. */
  back(): boolean {
    const entry = this.store.back();
    if (entry === undefined) return false;

    // After store.back(): the selection is linked to the views and resets when they change.
    this.selectedRef.set(entry.selectedRef);
    this.revealRef.set(entry.selectedRef);
    return true;
  }

  /** Opens the highlighted item; false when there is none to open. */
  openSelected(): boolean {
    const item = this.openable().find(i => i.ref === this.selectedRef());
    if (item === undefined) return false;

    void this.open(item);
    return true;
  }
}

/** The DOM id of an item's element; shared by the item and the bar that points at it. */
export function itemElementId(ref: string): string {
  return `item-${ref}`;
}
