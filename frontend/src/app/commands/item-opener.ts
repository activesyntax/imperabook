import { computed, inject, Injectable, linkedSignal } from '@angular/core';

import { CommandRunner } from '@app/commands/command-runner';
import { WorkspaceStore } from '@app/state/workspace-store';
import type { ItemView } from '@workspace/views/view-node';

/**
 * Opens list items in full. The server says where each item opens (`open`);
 * this only follows it, so books, authors and anything listed later all open
 * the same way.
 *
 * One item is highlighted at a time — Enter on an empty command bar opens it.
 * A new result starts the highlight over at its first openable item.
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

  async open(item: ItemView): Promise<void> {
    if (item.open === undefined) return;

    this.selectedRef.set(item.ref);
    this.store.setResult(await this.runner.open(item.open));
  }

  /** Opens the highlighted item; false when there is none to open. */
  openSelected(): boolean {
    const item = this.openable().find(i => i.ref === this.selectedRef());
    if (item === undefined) return false;

    void this.open(item);
    return true;
  }
}
