import { TestBed } from '@angular/core/testing';

import { CommandRunner } from '@app/commands/command-runner';
import { WorkspaceStore } from '@app/state/workspace-store';
import type { CommandResult, ItemView } from '@workspace/views/view-node';
import { ItemOpener } from './item-opener';

const item = (ref: string, open?: string): ItemView => ({ ref, properties: [], ...(open && { open }) });

const DETAIL: CommandResult = { views: [{ type: 'heading', text: 'Dune' } as never] };

describe('ItemOpener', () => {
  let opener: ItemOpener;
  let store: WorkspaceStore;
  let runner: { open: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    runner = { open: vi.fn(() => Promise.resolve(DETAIL)) };
    TestBed.configureTestingModule({ providers: [{ provide: CommandRunner, useValue: runner }] });
    opener = TestBed.inject(ItemOpener);
    store = TestBed.inject(WorkspaceStore);
  });

  function show(...items: ItemView[]): void {
    store.setResult({ views: [{ type: 'itemCollection', title: '', items, emptyMessage: '' }] });
  }

  it('selects the first item that has somewhere to open', () => {
    show(item('a'), item('b', '/api/books/b'), item('c', '/api/books/c'));

    expect(opener.selectedRef()).toBe('b');
  });

  it('selects nothing when no item opens', () => {
    show(item('a'));

    expect(opener.selectedRef()).toBeUndefined();
    expect(opener.openSelected()).toBe(false);
  });

  it('follows the item link and shows what it returns', async () => {
    show(item('b', '/api/books/b'));

    await opener.open(item('b', '/api/books/b'));

    expect(runner.open).toHaveBeenCalledWith('/api/books/b');
    expect(store.views()).toEqual(DETAIL.views);
  });

  it('opens the selected item', () => {
    show(item('b', '/api/books/b'), item('c', '/api/books/c'));
    opener.selectedRef.set('c');

    expect(opener.openSelected()).toBe(true);
    expect(runner.open).toHaveBeenCalledWith('/api/books/c');
  });

  it('starts the selection over when a new result arrives', () => {
    show(item('b', '/api/books/b'), item('c', '/api/books/c'));
    opener.selectedRef.set('c');

    show(item('x', '/api/authors/x'));

    expect(opener.selectedRef()).toBe('x');
  });
});
