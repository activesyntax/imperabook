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

  it('goes back to the list it opened from, with that item selected again', async () => {
    show(item('b', '/api/books/b'), item('c', '/api/books/c'));
    const list = store.views();

    await opener.open(item('c', '/api/books/c'));
    expect(opener.back()).toBe(true);

    expect(store.views()).toEqual(list);
    expect(opener.selectedRef()).toBe('c');
    expect(opener.revealRef()).toBe('c');
  });

  it('goes back one level at a time', async () => {
    show(item('author', '/api/authors/a'));
    const authors = store.views();

    await opener.open(item('author', '/api/authors/a'));
    const authorDetail = store.views();
    await opener.open(item('book', '/api/books/b'));

    opener.back();
    expect(store.views()).toEqual(authorDetail);
    opener.back();
    expect(store.views()).toEqual(authors);
    expect(opener.back()).toBe(false);
  });

  it('has nothing to go back to after a typed command', async () => {
    show(item('b', '/api/books/b'));
    await opener.open(item('b', '/api/books/b'));

    store.setResult({ views: [] });

    expect(opener.back()).toBe(false);
    expect(store.views()).toEqual([]);
  });

  it('moves the selection through openable items, stopping at the ends', () => {
    show(item('a', '/api/books/a'), item('x'), item('b', '/api/books/b'), item('c', '/api/books/c'));

    opener.move(1);
    expect(opener.selectedRef()).toBe('b');
    opener.move(1);
    opener.move(1);
    expect(opener.selectedRef()).toBe('c');

    opener.move(-1);
    opener.move(-1);
    opener.move(-1);
    expect(opener.selectedRef()).toBe('a');
  });

  it('asks for the newly selected item to be scrolled into view', () => {
    show(item('a', '/api/books/a'), item('b', '/api/books/b'));

    opener.move(1);

    expect(opener.revealRef()).toBe('b');
    expect(opener.selectedElementId()).toBe('item-b');
  });

  it('does nothing when there is nothing to select', () => {
    show(item('x'));

    opener.move(1);

    expect(opener.selectedRef()).toBeUndefined();
  });

  it('follows a link in text, and going back returns to the page it was on', async () => {
    const bookDetail: CommandResult = { views: [{ type: 'message', kind: 'info', text: 'book' }] };
    store.setResult(bookDetail);

    await opener.follow('/api/authors/a');
    expect(runner.open).toHaveBeenCalledWith('/api/authors/a');
    expect(store.views()).toEqual(DETAIL.views);

    opener.back();
    expect(store.views()).toEqual(bookDetail.views);
  });
});
