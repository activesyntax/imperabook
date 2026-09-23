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

  it('moves the highlight with Ctrl + Space, wrapping around', () => {
    const input = type('log');
    expect(activeChip()).toBe('login');

    press(input, ' ', { ctrlKey: true });
    expect(activeChip()).toBe('logout');

    press(input, ' ', { ctrlKey: true });
    expect(activeChip()).toBe('login');

    press(input, ' ', { ctrlKey: true, shiftKey: true });
    expect(activeChip()).toBe('logout');
  });

  it('leaves the arrows to the workspace', () => {
    const input = type('log');

    const event = press(input, 'ArrowDown');

    expect(event.defaultPrevented).toBe(false);
    expect(activeChip()).toBe('login');
  });
});
