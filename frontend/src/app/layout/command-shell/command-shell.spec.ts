import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandRunner } from '@app/commands/command-runner';
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

  beforeEach(async () => {
    runner = { run: vi.fn(() => Promise.resolve(DASHBOARD_RESULT)) };

    await TestBed.configureTestingModule({
      imports: [CommandShell],
      providers: [{ provide: CommandRunner, useValue: runner }],
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

  it('does not run unrecognized input', async () => {
    await submit(type('xyz'));

    expect(runner.run).not.toHaveBeenCalled();
    expect(TestBed.inject(WorkspaceStore).views()[0]).toMatchObject({ type: 'message', kind: 'error' });
  });

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

  it('shows the next suggestions at once after accepting the only one', () => {
    const input = type('add bo');

    press(input, 'Tab');

    expect(input.value).toBe('add book ');
    expect(activeChip()).toBe('"title"');
  });

  it('cycles through the suggestions with repeated Tab, wrapping around', () => {
    const input = type('log');

    press(input, 'Tab');
    expect(input.value).toBe('login ');
    expect(activeChip()).toBe('login');

    press(input, 'Tab');
    expect(input.value).toBe('logout ');
    expect(activeChip()).toBe('logout');

    press(input, 'Tab');
    expect(input.value).toBe('login ');
  });

  it('cycles backwards with Shift + Tab', () => {
    const input = type('log');

    press(input, 'Tab', { shiftKey: true });
    expect(input.value).toBe('logout ');

    press(input, 'Tab', { shiftKey: true });
    expect(input.value).toBe('login ');
  });

  it('ends the cycle when the user types', () => {
    const input = type('log');
    press(input, 'Tab');

    type('login x');

    expect(activeChip()).toBeUndefined();
  });

  it('ends the cycle with Space without doubling the space', () => {
    const input = type('add');
    press(input, 'Tab');
    press(input, 'Tab');
    expect(input.value).toBe('add book ');

    const event = press(input, ' ');

    expect(event.defaultPrevented).toBe(true);
    expect(input.value).toBe('add book ');
    expect(activeChip()).toBe('"title"');
  });

  it('types Space normally inside the quotes of a cycled param', () => {
    const input = type('add book "x" with i');
    press(input, 'Tab');

    const event = press(input, ' ');

    expect(event.defaultPrevented).toBe(false);
  });

  it('keeps the cycled list on screen until the cycle ends', () => {
    const input = type('log');

    press(input, 'Tab');

    const chips = [...fixture.nativeElement.querySelectorAll('.chip')].map((c: Element) => c.textContent!.trim());
    expect(chips).toEqual(['login', 'logout']);
  });

  it('leaves the arrows to the workspace', () => {
    const input = type('log');

    const event = press(input, 'ArrowDown');

    expect(event.defaultPrevented).toBe(false);
    expect(activeChip()).toBe('login');
  });
});
