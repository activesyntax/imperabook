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

  it('moves left and right in reading order through openable items, stopping at the ends', () => {
    show(item('a', '/api/books/a'), item('x'), item('b', '/api/books/b'), item('c', '/api/books/c'));

    opener.moveInGrid('right');
    expect(opener.selectedRef()).toBe('b');
    opener.moveInGrid('right');
    opener.moveInGrid('right');
    expect(opener.selectedRef()).toBe('c');

    opener.moveInGrid('left');
    opener.moveInGrid('left');
    opener.moveInGrid('left');
    expect(opener.selectedRef()).toBe('a');
  });

  describe('up and down', () => {
    const CARD = { width: 100, height: 150 };
    let placed: HTMLElement[] = [];

    /** Draws items at grid cells; jsdom has no layout, so each rect is stubbed. */
    function layout(cells: Record<string, [row: number, col: number]>): void {
      for (const [ref, [row, col]] of Object.entries(cells)) {
        const el = document.createElement('div');
        el.id = `item-${ref}`;
        const rect = { top: row * 200, left: col * 120, ...CARD };
        el.getBoundingClientRect = () => ({ ...rect, bottom: rect.top + CARD.height, right: rect.left + CARD.width }) as DOMRect;
        document.body.appendChild(el);
        placed.push(el);
      }
      show(...Object.keys(cells).map(ref => item(ref, `/api/books/${ref}`)));
    }

    afterEach(() => {
      placed.forEach(el => el.remove());
      placed = [];
    });

    // a b c
    // d e f
    // g
    const GRID: Record<string, [number, number]> = {
      a: [0, 0], b: [0, 1], c: [0, 2],
      d: [1, 0], e: [1, 1], f: [1, 2],
      g: [2, 0],
    };

    it('goes to the item below in the same column', () => {
      layout(GRID);
      opener.selectedRef.set('b');

      opener.moveInGrid('down');

      expect(opener.selectedRef()).toBe('e');
    });

    it('goes to the item above in the same column', () => {
      layout(GRID);
      opener.selectedRef.set('f');

      opener.moveInGrid('up');

      expect(opener.selectedRef()).toBe('c');
    });

    it('lands on the nearest item when the row below is short', () => {
      layout(GRID);
      opener.selectedRef.set('f');

      opener.moveInGrid('down');

      expect(opener.selectedRef()).toBe('g');
    });

    it('stays put at the top and bottom edges', () => {
      layout(GRID);
      opener.selectedRef.set('b');
      opener.moveInGrid('up');
      expect(opener.selectedRef()).toBe('b');

      opener.selectedRef.set('g');
      opener.moveInGrid('down');
      expect(opener.selectedRef()).toBe('g');
    });

    it('wraps right from the end of a row onto the next row', () => {
      layout(GRID);
      opener.selectedRef.set('c');

      opener.moveInGrid('right');

      expect(opener.selectedRef()).toBe('d');
    });
  });

  it('asks for the newly selected item to be scrolled into view', () => {
    show(item('a', '/api/books/a'), item('b', '/api/books/b'));

    opener.moveInGrid('right');

    expect(opener.revealRef()).toBe('b');
    expect(opener.selectedElementId()).toBe('item-b');
  });

  it('does nothing when there is nothing to select', () => {
    show(item('x'));

    opener.moveInGrid('right');
    opener.moveInGrid('down');

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
