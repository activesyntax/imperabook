import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandRunner } from '@app/commands/command-runner';
import { ItemOpener } from '@app/commands/item-opener';
import { WorkspaceStore } from '@app/state/workspace-store';
import type { CommandResult } from '@workspace/views/view-node';
import { CommandShell } from './command-shell';

const DASHBOARD_RESULT: CommandResult = {
  views: [{ type: 'message', text: 'dashboard', kind: 'info' }],
};

describe('CommandShell', () => {
  let component: CommandShell;
  let fixture: ComponentFixture<CommandShell>;
  let runner: { run: ReturnType<typeof vi.fn> };
  let opener: {
    openSelected: ReturnType<typeof vi.fn>;
    back: ReturnType<typeof vi.fn>;
    moveInGrid: ReturnType<typeof vi.fn>;
    selectedElementId: ReturnType<typeof signal<string | undefined>>;
  };

  beforeEach(async () => {
    runner = { run: vi.fn(() => Promise.resolve(DASHBOARD_RESULT)) };
    opener = {
      openSelected: vi.fn(() => true),
      back: vi.fn(() => true),
      moveInGrid: vi.fn(),
      selectedElementId: signal<string | undefined>(undefined),
    };

    await TestBed.configureTestingModule({
      imports: [CommandShell],
      providers: [
        { provide: CommandRunner, useValue: runner },
        { provide: ItemOpener, useValue: opener },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  function type(text: string): HTMLInputElement {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = text;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return input;
  }

  function press(input: HTMLInputElement, key: string, init: KeyboardEventInit = {}): KeyboardEvent {
    const event = new KeyboardEvent('keydown', { key, cancelable: true, ...init });
    input.dispatchEvent(event);
    fixture.detectChanges();
    return event;
  }

  function submit(input: HTMLInputElement): Promise<void> {
    press(input, 'Enter');
    return fixture.whenStable();
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
    const input = type('add book "x" by author "smith"');

    await submit(input);
    fixture.detectChanges();

    expect(input.value).toBe('add book "x" by author "smith"');
  });

  it('sends every typed book detail, not just title and author', async () => {
    await submit(type('add book "Dune" in language "en" by author "herbert" published in 1965 with isbn "x"'));

    expect(runner.run).toHaveBeenCalledWith({
      command: 'add book',
      params: { title: 'Dune', language: 'en', author: 'herbert', published: '1965', isbn: 'x' },
    });
  });

  it('sends a typed empty title and author, for the server to reject', async () => {
    await submit(type('add book "" by author ""'));

    expect(runner.run).toHaveBeenCalledWith({ command: 'add book', params: { title: '', author: '' } });
  });

  it('leaves a book author out when it was not typed', async () => {
    await submit(type('add book "Beowulf"'));

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

  it('does not run unrecognized input', async () => {
    await submit(type('xyz'));

    expect(runner.run).not.toHaveBeenCalled();
    expect(TestBed.inject(WorkspaceStore).views()[0]).toMatchObject({ type: 'message', kind: 'error' });
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

  it('puts the caret inside the quotes after accepting a string param', () => {
    const input = type('add book "x" with i');

    press(input, 'Tab');

    expect(input.value).toBe('add book "x" with isbn ""');
    expect(input.selectionStart).toBe('add book "x" with isbn "'.length);
  });

  it('shows the parameters at once after accepting a command', () => {
    const input = type('ad');

    press(input, 'Tab');
    expect(input.value).toBe('add book ');
    expect(activeChip()).toBe('"title"');

    press(input, 'Tab');
    expect(input.value).toBe('add book ""');
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
    expect(activeChip()).toBe('"first and last name"');
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

  it('types Space normally inside the quotes of an accepted param', () => {
    const input = type('add book "x" with i');
    press(input, 'Tab');

    const event = press(input, ' ');

    expect(event.defaultPrevented).toBe(false);
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
