import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorLookup } from '@app/commands/author-lookup';
import { CommandRunner } from '@app/commands/command-runner';
import { ItemOpener } from '@app/commands/item-opener';
import { WorkspaceStore } from '@app/state/workspace-store';
import type { CommandResult, ItemView } from '@workspace/views/view-node';
import { CommandShell } from './command-shell';

const REMOVED_RESULT: CommandResult = {
  views: [{ type: 'message', text: 'Removed "Dune".', kind: 'success' }],
};

const DUNE: ItemView = {
  ref: 'b1',
  open: '/api/books/b1',
  properties: [{ name: 'Title', value: 'Dune', role: 'primary' }],
};

const DASHBOARD_RESULT: CommandResult = {
  views: [{ type: 'message', text: 'dashboard', kind: 'info' }],
};

describe('CommandShell', () => {
  let component: CommandShell;
  let fixture: ComponentFixture<CommandShell>;
  let runner: { run: ReturnType<typeof vi.fn>; remove: ReturnType<typeof vi.fn> };
  let authors: { search: ReturnType<typeof vi.fn> };
  let opener: {
    openSelected: ReturnType<typeof vi.fn>;
    back: ReturnType<typeof vi.fn>;
    moveInGrid: ReturnType<typeof vi.fn>;
    selectedElementId: ReturnType<typeof signal<string | undefined>>;
    selectedItem: ReturnType<typeof signal<ItemView | undefined>>;
  };

  beforeEach(async () => {
    runner = {
      run: vi.fn(() => Promise.resolve(DASHBOARD_RESULT)),
      remove: vi.fn(() => Promise.resolve(REMOVED_RESULT)),
    };
    authors = { search: vi.fn(() => Promise.resolve([])) };
    opener = {
      openSelected: vi.fn(() => true),
      back: vi.fn(() => true),
      moveInGrid: vi.fn(),
      selectedElementId: signal<string | undefined>(undefined),
      selectedItem: signal<ItemView | undefined>(undefined),
    };

    await TestBed.configureTestingModule({
      imports: [CommandShell],
      providers: [
        { provide: CommandRunner, useValue: runner },
        { provide: ItemOpener, useValue: opener },
        { provide: AuthorLookup, useValue: authors },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  function type(text: string): HTMLTextAreaElement {
    const input: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    input.value = text;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return input;
  }

  function press(input: HTMLTextAreaElement, key: string, init: KeyboardEventInit = {}): KeyboardEvent {
    const event = new KeyboardEvent('keydown', { key, cancelable: true, ...init });
    input.dispatchEvent(event);
    fixture.detectChanges();
    return event;
  }

  /** Ctrl+Enter: runs whatever is typed, whether or not another line could follow. */
  function submit(input: HTMLTextAreaElement): Promise<void> {
    press(input, 'Enter', { ctrlKey: true });
    return fixture.whenStable();
  }

  function statusMessage(): string {
    return fixture.nativeElement.querySelector('.desc .say')?.textContent.replace(/\s+/g, ' ').trim() ?? '';
  }

  function ghost(): string | undefined {
    return fixture.nativeElement.querySelector('.ghost__hint')?.textContent ?? undefined;
  }

  function activeChip(): string {
    return fixture.nativeElement.querySelector('.chip.active')?.textContent.trim();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('runs the parsed command and shows its result', async () => {
    await submit(type('dashboard'));

    expect(runner.run).toHaveBeenCalledWith({ command: 'dashboard', params: {} });
    expect(TestBed.inject(WorkspaceStore).views()).toEqual(DASHBOARD_RESULT.views);
  });

  it('clears the query after running a command', async () => {
    const input = type('dashboard');

    await submit(input);
    fixture.detectChanges();

    expect(input.value).toBe('');
  });

  it('gives the query back when the result asks to keep it', async () => {
    runner.run.mockResolvedValueOnce({ ...DASHBOARD_RESULT, keepQuery: true });
    const input = type('add book x\nby author smith');

    await submit(input);
    fixture.detectChanges();

    expect(input.value).toBe('add book x\nby author smith');
  });

  it('sends the typed title without quotes', async () => {
    await submit(type('add book Beowulf'));

    expect(runner.run).toHaveBeenCalledWith({ command: 'add book', params: { title: 'Beowulf' } });
  });

  it('opens the selected item on Enter when the bar is empty', async () => {
    await submit(type('   '));

    expect(opener.openSelected).toHaveBeenCalled();
    expect(runner.run).not.toHaveBeenCalled();
  });

  it('runs the typed command on Enter rather than opening an item', async () => {
    await submit(type('dashboard'));

    expect(opener.openSelected).not.toHaveBeenCalled();
  });

  it('clears typed text on Escape without going back', () => {
    const input = type('list bo');

    press(input, 'Escape');

    expect(input.value).toBe('');
    expect(opener.back).not.toHaveBeenCalled();
  });

  it('goes back on Escape when the bar is empty', () => {
    const input = type('');

    press(input, 'Escape');

    expect(opener.back).toHaveBeenCalled();
  });

  describe('Enter', () => {
    it('runs a command that takes nothing more', async () => {
      const event = press(type('dashboard'), 'Enter');
      await fixture.whenStable();

      expect(event.defaultPrevented).toBe(true);
      expect(runner.run).toHaveBeenCalledWith({ command: 'dashboard', params: {} });
    });

    it('starts an indented new line when the command could take another parameter', () => {
      const input = type('add book Dune');

      press(input, 'Enter');

      expect(input.value).toBe('add book Dune\n    ');
      expect(input.selectionStart).toBe(input.value.length);
      expect(runner.run).not.toHaveBeenCalled();
    });

    it('lays out the whole command when a line is broken in the middle', () => {
      const input = type('add book Dune\nby author Frank Herbert');
      input.setSelectionRange(8, 8);
      input.dispatchEvent(new Event('selectionchange'));

      press(input, 'Enter', { shiftKey: true });

      // The text after the break becomes a line of its own, indented like the rest.
      expect(input.value).toBe('add book\n    Dune\n    by author Frank Herbert');
      expect(input.selectionStart).toBe('add book\n    '.length);
    });

    it('runs on a blank line, the second Enter after the last parameter', async () => {
      const event = press(type('add book Dune\nby author Frank Herbert\n'), 'Enter');
      await fixture.whenStable();

      expect(event.defaultPrevented).toBe(true);
      expect(runner.run).toHaveBeenCalledWith({
        command: 'add book',
        params: { title: 'Dune', author: 'Frank Herbert' },
      });
    });

    it('tries to run text it cannot continue, so an invalid command is reported', async () => {
      press(type('xyz'), 'Enter');
      await fixture.whenStable();
      fixture.detectChanges();

      expect(statusMessage()).toContain('Not a valid command');
    });

    it('runs once every detail is typed, as nothing more can follow', async () => {
      const all = [
        'add book Dune', 'by author A', 'subtitled S', 'in language en',
        'published in 1965', 'with isbn 1', 'with summary X',
      ].join('\n    ');

      press(type(all), 'Enter');
      await fixture.whenStable();

      expect(runner.run).toHaveBeenCalled();
    });

    it('always starts a new line with Shift', () => {
      const input = type('dashboard');

      press(input, 'Enter', { shiftKey: true });

      expect(input.value).toBe('dashboard\n    ');
      expect(runner.run).not.toHaveBeenCalled();
    });

    it('refuses a book with no title instead of sending it', async () => {
      const input = type('add book');

      await submit(input);
      fixture.detectChanges();

      expect(runner.run).not.toHaveBeenCalled();
      expect(input.value).toBe('add book');
      expect(statusMessage()).toContain('Not a valid command');
    });

    it('does not open a parameter line under a command still missing its value', async () => {
      const input = type('add book Dune\n    by author');

      press(input, 'Enter');
      await fixture.whenStable();
      fixture.detectChanges();

      expect(input.value).toBe('add book Dune\n    by author');
      expect(runner.run).not.toHaveBeenCalled();
      expect(statusMessage()).toContain('Not a valid command');
    });

    it('runs find, as nothing can follow its keywords', async () => {
      press(type('find dune herbert'), 'Enter');
      await fixture.whenStable();

      expect(runner.run).toHaveBeenCalledWith({ command: 'find', params: { keywords: 'dune herbert' } });
    });

    it('runs a bare list at once', async () => {
      press(type('list books'), 'Enter');
      await fixture.whenStable();

      expect(runner.run).toHaveBeenCalledWith({ command: 'list books', params: {} });
    });

    it('starts a new line after a filter, as for add book, and runs with Ctrl+Enter', async () => {
      const input = type('list books whose page count is more than 400');

      press(input, 'Enter');
      expect(input.value).toBe('list books whose page count is more than 400\n    ');
      expect(runner.run).not.toHaveBeenCalled();

      await submit(input);
      expect(runner.run).toHaveBeenCalledWith({ command: 'list books', params: { pagesOp: 'over', pages: '400' } });
    });

    it('adds a further filter on a new line with Tab', () => {
      const input = type('list books whose page count is 120');

      press(input, 'Tab');

      expect(input.value).toBe('list books whose page count is 120\n    written by ');
    });

    it('treats a list spanning lines like any multi-line command', async () => {
      const input = type('list books\n    written by herbert');

      // The page filter could still follow, so Enter opens a line for it…
      press(input, 'Enter');
      expect(input.value).toBe('list books\n    written by herbert\n    ');

      // …and on that blank line it runs.
      press(input, 'Enter');
      await fixture.whenStable();
      expect(runner.run).toHaveBeenCalledWith({ command: 'list books', params: { author: 'herbert' } });
    });

    it('runs a list at once when every filter is there', async () => {
      press(type('list books whose page count is 120\n    written by herbert\n    published after 1950'), 'Enter');
      await fixture.whenStable();

      expect(runner.run).toHaveBeenCalledWith({
        command: 'list books',
        params: { pagesOp: 'equal', pages: '120', author: 'herbert', publishedOp: 'after', published: '1950' },
      });
    });

    it('always runs with Ctrl', async () => {
      await submit(type('add book Dune'));

      expect(runner.run).toHaveBeenCalledWith({ command: 'add book', params: { title: 'Dune' } });
    });
  });

  it('sends every detail typed on its own line', async () => {
    await submit(type('add book Dune\nin language en\nby author herbert\npublished in 1965\nwith isbn x'));

    expect(runner.run).toHaveBeenCalledWith({
      command: 'add book',
      params: { title: 'Dune', language: 'en', author: 'herbert', published: '1965', isbn: 'x' },
    });
  });

  it('accepts a parameter with Tab straight from the end of the value line', () => {
    const input = type('add book Dune');
    expect(activeChip()).toBe('by author');

    press(input, 'Tab');

    expect(input.value).toBe('add book Dune\n    by author ');
    expect(input.selectionStart).toBe(input.value.length);
  });

  describe('author suggestions', () => {
    const HERBERT = { id: '1', name: 'Frank Herbert' };
    const HERRIOT = { id: '2', name: 'James Herriot' };

    async function typeAndSettle(text: string): Promise<HTMLTextAreaElement> {
      const input = type(text);
      await fixture.whenStable();
      fixture.detectChanges();
      return input;
    }

    it('offers catalog authors matching the name being typed', async () => {
      authors.search.mockResolvedValue([HERBERT, HERRIOT]);

      await typeAndSettle('add book Dune\nby author her');

      expect(authors.search).toHaveBeenCalledWith('her', expect.anything());
      expect(chips().slice(0, 2)).toEqual(['Frank Herbert', 'James Herriot']);
      expect(activeChip()).toBe('Frank Herbert');
    });

    it('replaces the typed name with the one accepted', async () => {
      authors.search.mockResolvedValue([HERBERT]);
      const input = await typeAndSettle('add book Dune\nby author her');

      press(input, 'Tab');

      expect(input.value).toBe('add book Dune\nby author Frank Herbert');
      expect(input.selectionStart).toBe(input.value.length);
    });

    it('does not offer existing authors while adding a new one', async () => {
      authors.search.mockResolvedValue([HERBERT]);

      await typeAndSettle('add author her');

      expect(authors.search).not.toHaveBeenCalled();
      expect(chips()).not.toContain('Frank Herbert');
    });

    it('does not offer the name already typed exactly', async () => {
      authors.search.mockResolvedValue([HERBERT]);

      await typeAndSettle('add book Dune\nby author Frank Herbert');

      expect(chips()).not.toContain('Frank Herbert');
    });

    it('offers catalog authors after written by, too', async () => {
      authors.search.mockResolvedValue([HERBERT]);

      await typeAndSettle('list books written by her');

      expect(authors.search).toHaveBeenCalledWith('her', expect.anything());
      expect(chips()[0]).toBe('Frank Herbert');
    });

    it('does not look anything up outside an author name', async () => {
      await typeAndSettle('add book Dune\nwith isbn 12');
      await typeAndSettle('add book Dune\nby author ');

      expect(authors.search).not.toHaveBeenCalled();
    });
  });

  describe('remove book', () => {
    async function run(text: string): Promise<HTMLTextAreaElement> {
      const input = type(text);
      press(input, 'Enter');
      await fixture.whenStable();
      fixture.detectChanges();
      return input;
    }

    it('asks before removing the selected book, and sends nothing yet', async () => {
      opener.selectedItem.set(DUNE);

      const input = await run('remove book');

      expect(input.value).toBe('');
      expect(statusMessage()).toBe('Remove "Dune"? Type yes or no.');
      expect(runner.run).not.toHaveBeenCalled();
      expect(runner.remove).not.toHaveBeenCalled();
    });

    it('removes it on yes, through the link the server gave the item', async () => {
      opener.selectedItem.set(DUNE);
      await run('remove book');

      await run('yes');

      expect(runner.remove).toHaveBeenCalledWith('/api/books/b1');
      expect(TestBed.inject(WorkspaceStore).views()).toEqual(REMOVED_RESULT.views);
      expect(statusMessage()).toBe('Type a command like list books');
    });

    it('takes y as yes', async () => {
      opener.selectedItem.set(DUNE);
      await run('remove book');

      await run('Y');

      expect(runner.remove).toHaveBeenCalled();
    });

    it('removes nothing on no, and says so', async () => {
      opener.selectedItem.set(DUNE);
      await run('remove book');

      await run('no');

      expect(runner.remove).not.toHaveBeenCalled();
      expect(statusMessage()).toBe('Nothing was removed.');
    });

    it('cancels with Escape on an empty bar', async () => {
      opener.selectedItem.set(DUNE);
      const input = await run('remove book');

      press(input, 'Escape');

      expect(opener.back).not.toHaveBeenCalled();
      expect(statusMessage()).toBe('Nothing was removed.');
      await run('yes');
      expect(runner.remove).not.toHaveBeenCalled();
    });

    it('keeps asking when the answer is neither yes nor no', async () => {
      opener.selectedItem.set(DUNE);
      await run('remove book');

      const input = await run('maybe');

      expect(runner.remove).not.toHaveBeenCalled();
      expect(input.value).toBe('maybe');
      expect(statusMessage()).toBe('Type yes or no. Remove "Dune"?');
    });

    it('offers yes and no as the only suggestions while asking', async () => {
      opener.selectedItem.set(DUNE);
      await run('remove book');

      type('');
      expect(chips()).toEqual(['yes', 'no']);

      type('y');
      expect(chips()).toEqual(['yes']);
      expect(fixture.nativeElement.querySelector('.desc .validity')?.classList).toContain('valid');
    });

    it('says to select a book when none is selected', async () => {
      await run('remove book');

      expect(statusMessage()).toBe('Select a book in the list first, then run remove book.');
      expect(runner.remove).not.toHaveBeenCalled();
    });

    it('does not remove an author selected in a list', async () => {
      opener.selectedItem.set({ ref: 'a1', open: '/api/authors/a1', properties: [] });

      await run('remove book');

      expect(statusMessage()).toContain('Select a book');
    });
  });

  it('leaves out commands shown elsewhere while the bar is empty', () => {
    type('');

    const offered = chips();
    for (const hidden of ['account', 'login', 'logout', 'settings', 'about', 'help', 'dashboard', 'library']) {
      expect(offered).not.toContain(hidden);
    }
    expect(offered).toContain('add book');
    expect(offered).toContain('list books');
  });

  it('suggests those commands again as soon as something is typed', () => {
    type('he');
    expect(chips()).toContain('help');

    type('l');
    expect(chips()).toEqual(expect.arrayContaining(['list books', 'library', 'login', 'logout']));
  });

  it('keeps the highlighted suggestion in view as the highlight moves', () => {
    const scroll = vi.fn();
    const original = HTMLElement.prototype.scrollIntoView;
    HTMLElement.prototype.scrollIntoView = scroll;
    try {
      const input = type('log');
      scroll.mockClear();

      press(input, '`', { ctrlKey: true });

      expect(scroll).toHaveBeenCalledWith({ block: 'nearest' });
      expect((scroll.mock.contexts.at(-1) as HTMLElement | undefined)?.textContent?.trim()).toBe('logout');
    } finally {
      HTMLElement.prototype.scrollIntoView = original;
    }
  });

  it('moves within the line with bare Home/End instead of scrolling the workspace', () => {
    const reached = vi.fn();
    document.addEventListener('keydown', reached);
    try {
      const input = type('add book Dune\nby author Frank Herbert');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true }));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true }));
      expect(reached).not.toHaveBeenCalled();

      const single = type('dashboard');
      single.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true }));
      expect(reached).toHaveBeenCalled();
    } finally {
      document.removeEventListener('keydown', reached);
    }
  });

  it('leaves bare Up/Down to the caret', () => {
    for (const text of ['dashboard', 'add book Dune\nby author Frank Herbert']) {
      const input = type(text);
      expect(press(input, 'ArrowUp').defaultPrevented).toBe(false);
      expect(press(input, 'ArrowDown').defaultPrevented).toBe(false);
    }
    expect(opener.moveInGrid).not.toHaveBeenCalled();
  });

  describe('paste', () => {
    function paste(input: HTMLTextAreaElement, text: string): Event {
      const event = new Event('paste', { cancelable: true });
      Object.defineProperty(event, 'clipboardData', { value: { getData: () => text } });
      input.dispatchEvent(event);
      fixture.detectChanges();
      return event;
    }

    it('lays out a pasted command with its parameters indented', () => {
      const input = type('');

      paste(input, '\r\n  add book Sapiens\r\nby author Y.N. Harari\r\n\t with isbn 451218521');

      expect(input.value).toBe('add book Sapiens\n    by author Y.N. Harari\n    with isbn 451218521');
      expect(input.selectionStart).toBe(input.value.length);
    });

    it('pastes into what is already typed, at the caret', () => {
      const input = type('add book Dune');

      paste(input, '\nby author Frank Herbert');

      expect(input.value).toBe('add book Dune\n    by author Frank Herbert');
    });

    it('leaves a plain single-line paste as it is', () => {
      const input = type('add book ');

      paste(input, 'Dune');

      expect(input.value).toBe('add book Dune');
    });
  });

  describe('status bar', () => {
    function dot(): HTMLElement | null {
      return fixture.nativeElement.querySelector('.desc .validity');
    }

    function keyHints(): string {
      return fixture.nativeElement.querySelector('.desc .status')?.textContent.replace(/\s+/g, ' ').trim() ?? '';
    }

    it('suggests a first command while the bar is empty, with no validity dot', () => {
      type('');

      expect(statusMessage()).toBe('Type a command like list books');
      expect(dot()).toBeNull();
      expect(keyHints()).toBe('');
    });

    it('shows a green dot for a valid command and a red one otherwise', () => {
      type('list books');
      expect(dot()?.classList).toContain('valid');
      expect(dot()?.getAttribute('aria-label')).toBe('Valid command');

      type('list bo');
      expect(dot()?.classList).not.toContain('valid');
      expect(dot()?.getAttribute('aria-label')).toBe('Not a valid command');
    });

    it('counts text the parser only recovered from as invalid', () => {
      type('dashboard xyz');

      expect(dot()?.classList).not.toContain('valid');
    });

    it('shows Ctrl+Enter beside Enter when Enter only adds a line', () => {
      type('add book Dune');
      expect(keyHints()).toBe('Tab accept · Enter new line · Ctrl+Enter run');

      type('list books whose page count is more than 400');
      expect(keyHints()).toContain('Enter new line · Ctrl+Enter run');
    });

    it('shows only Enter when Enter runs the one-line command', () => {
      type('dashboard');
      expect(keyHints()).toBe('Enter run');

      type('list books');
      expect(keyHints()).not.toContain('Ctrl+Enter');
    });

    it('shows Ctrl+Enter as the way to run once parameters are on their own lines', () => {
      type('add book Dune\n    by author Frank Herbert');

      expect(keyHints()).toContain('Ctrl+Enter run');
      expect(keyHints()).not.toContain('Enter new line');
      expect(keyHints()).not.toMatch(/(^|· )Enter /);
    });

    it('refuses to send an invalid command: says so, keeps the text, leaves the workspace', async () => {
      const input = type('xyz');

      await submit(input);
      fixture.detectChanges();

      expect(runner.run).not.toHaveBeenCalled();
      expect(input.value).toBe('xyz');
      expect(statusMessage()).toContain('Not a valid command');
      expect(TestBed.inject(WorkspaceStore).views()).toEqual([]);
    });

    it('clears the complaint as soon as the text is edited', async () => {
      await submit(type('xyz'));
      fixture.detectChanges();

      type('xy');

      expect(statusMessage()).not.toContain('Not a valid command');
    });

    it('says a command is being entered while the text is not one yet', () => {
      type('libr');

      expect(statusMessage()).toBe('Entering command…');
    });

    it('describes the command once the text is a valid one', () => {
      type('library');
      expect(statusMessage()).toBe('Statistics about your library');

      type('add book Dune\n    by author Frank Herbert');
      expect(statusMessage()).toBe('Add a book to your library');
    });

    it('names a complete command where the suggestions were', () => {
      type('library');

      const row: HTMLElement = fixture.nativeElement.querySelector('.suggestions');
      expect(chips()).toEqual([]);
      expect(row.querySelector('.current')?.textContent?.trim()).toBe('library');
      expect(row.textContent).not.toContain('no');
      expect(row.getAttribute('role')).toBeNull();
    });

    it('says nothing matches when the text is neither a command nor the start of one', () => {
      type('xyz');

      const row: HTMLElement = fixture.nativeElement.querySelector('.suggestions');
      expect(row.querySelector('.current')).toBeNull();
      expect(row.textContent?.trim()).toBe('no matching command');
    });

    it('is a listbox only while there are suggestions', () => {
      type('lib');

      const row: HTMLElement = fixture.nativeElement.querySelector('.suggestions');
      expect(row.getAttribute('role')).toBe('listbox');
      expect(row.getAttribute('aria-label')).toBe('Suggestions');
    });

    it('does not describe text the parser only recovered from', () => {
      type('library xyz');

      expect(statusMessage()).toBe('Entering command…');
    });
  });

  function chips(): string[] {
    return [...fixture.nativeElement.querySelectorAll('.chip')].map((c: Element) => c.textContent!.trim());
  }

  it('accepts the highlighted suggestion with Tab', () => {
    const input = type('list boo');

    press(input, 'Tab');

    expect(input.value).toBe('list books ');
    expect(runner.run).not.toHaveBeenCalled();
  });

  it('names what to type next as ghost text after accepting a command', () => {
    const input = type('ad');

    press(input, 'Tab');
    expect(input.value).toBe('add book ');
    expect(ghost()).toBe('title');
    expect(chips()).not.toContain('title');
  });

  it('moves the suggestion highlight with Ctrl+` without touching the query, wrapping around', () => {
    const input = type('log');
    expect(activeChip()).toBe('login');

    press(input, '`', { ctrlKey: true });
    expect(activeChip()).toBe('logout');
    expect(input.value).toBe('log');

    press(input, '`', { ctrlKey: true });
    expect(activeChip()).toBe('login');
  });

  it('moves the suggestion highlight backwards with Ctrl+~, wrapping around', () => {
    const input = type('log');

    const event = press(input, '~', { ctrlKey: true, shiftKey: true });

    expect(event.defaultPrevented).toBe(true);
    expect(activeChip()).toBe('logout');
  });

  it('types ` and ~ normally without Ctrl', () => {
    const input = type('log');

    expect(press(input, '`').defaultPrevented).toBe(false);
    expect(press(input, '~', { shiftKey: true }).defaultPrevented).toBe(false);
    expect(activeChip()).toBe('login');
  });

  it('accepts the suggestion Ctrl+` moved to', () => {
    const input = type('ad');

    press(input, '`', { ctrlKey: true });
    press(input, 'Tab');

    expect(input.value).toBe('add author ');
    expect(ghost()).toBe('first and last name');
  });

  describe('ghost text', () => {
    it('names the page count still to type', () => {
      type('list books whose page count is at least ');
      expect(ghost()).toBe('page count');

      type('list books whose page count is between 100 and ');
      expect(ghost()).toBe('page count');
    });

    it('names the keywords after find', () => {
      type('find ');

      expect(ghost()).toBe('keywords');
    });

    it('lines the hint up after an invisible copy of the text', () => {
      type('add book ');

      const layer: HTMLElement = fixture.nativeElement.querySelector('.ghost');
      expect(layer.querySelector('.ghost__typed')?.textContent).toBe('add book ');
      expect(layer.getAttribute('aria-hidden')).toBe('true');
    });

    it('goes once the value is being typed', () => {
      type('add book D');

      expect(ghost()).toBeUndefined();
    });

    it('shows only with the caret at the end', () => {
      const input = type('add book ');
      input.setSelectionRange(3, 3);
      input.dispatchEvent(new Event('selectionchange'));
      fixture.detectChanges();

      expect(ghost()).toBeUndefined();
    });

    it('does not count as "no matching command"', () => {
      type('add book ');

      expect(fixture.nativeElement.querySelector('.suggestions')?.textContent).not.toContain('no matching command');
    });
  });

  it('starts the highlight over at the first suggestion when the user types', () => {
    const input = type('log');
    press(input, '`', { ctrlKey: true });

    type('lo');

    expect(activeChip()).toBe('login');
  });

  it('claims Alt+Left/Right even with nothing to select, so the browser does not navigate', () => {
    const input = type('dashboard xyz');

    expect(press(input, 'ArrowLeft', { altKey: true }).defaultPrevented).toBe(true);
    expect(press(input, 'ArrowRight', { altKey: true }).defaultPrevented).toBe(true);
  });

  it('leaves the suggestion highlight alone on Alt+arrows', () => {
    const input = type('log');

    press(input, 'ArrowRight', { altKey: true });

    expect(activeChip()).toBe('login');
  });

  it('leaves plain Left/Right to move the caret', () => {
    const input = type('log');

    expect(press(input, 'ArrowLeft').defaultPrevented).toBe(false);
    expect(activeChip()).toBe('login');
  });

  it('lets Tab move focus when there is nothing to accept, and never traps Shift+Tab', () => {
    const input = type('dashboard xyz');
    expect(chips()).toEqual([]);

    expect(press(input, 'Tab').defaultPrevented).toBe(false);
    expect(press(type('log'), 'Tab', { shiftKey: true }).defaultPrevented).toBe(false);
  });

  it('does not double the space after accepting a completion', () => {
    const input = type('log');
    press(input, 'Tab');
    expect(input.value).toBe('login ');

    const event = press(input, ' ');

    expect(event.defaultPrevented).toBe(true);
    expect(input.value).toBe('login ');
  });

  it('moves the item selection through the grid with Alt+arrows', () => {
    const input = type('');

    for (const key of ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight']) {
      expect(press(input, key, { altKey: true }).defaultPrevented).toBe(true);
    }

    expect(opener.moveInGrid.mock.calls).toEqual([['down'], ['up'], ['left'], ['right']]);
  });

  it('points the bar at the selected item for screen readers', () => {
    const input = type('');
    expect(input.getAttribute('aria-activedescendant')).toBeNull();

    opener.selectedElementId.set('item-b');
    fixture.detectChanges();

    expect(input.getAttribute('aria-activedescendant')).toBe('item-b');
  });

  it('leaves the arrows to the workspace', () => {
    const input = type('log');

    const event = press(input, 'ArrowDown');

    expect(event.defaultPrevented).toBe(false);
    expect(activeChip()).toBe('login');
  });
});
