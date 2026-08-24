import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { CommandRegistry } from '@app/commands/command-registry';
import { CommandRunner } from '@app/commands/command-runner';
import { CommandSpec } from '@core/model';
import { CommandShell } from './command-shell';

const LOGIN = {
  command: 'login',
  parameters: [
    { name: 'username', prompt: 'Username', required: true, credential: 'username' },
    { name: 'password', prompt: 'Password', required: true, credential: 'password' },
  ],
} as unknown as CommandSpec;
/**
 * A shell reads the registry as signals and never loads it — ShellStartup does that.
 * Faking the signals keeps this spec off HTTP and lets it set the one state the
 * component actually reacts to: a registry that has answered.
 */
function fakeRegistry(commands: readonly CommandSpec[], authenticated: boolean) {
  return {
    loaded: signal(true).asReadonly(),
    commands: signal(commands).asReadonly(),
    authenticated: signal(authenticated).asReadonly(),
    session: signal(null).asReadonly(),
    startupViews: signal([]).asReadonly(),
    openedView: () => null,
    ready: () => Promise.resolve(),
    refresh: () => Promise.resolve(),
  };
}

describe('CommandShell', () => {
  let component: CommandShell;
  let fixture: ComponentFixture<CommandShell>;

  async function build(commands: readonly CommandSpec[], authenticated: boolean): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [CommandShell],
      providers: [
        { provide: CommandRegistry, useValue: fakeRegistry(commands, authenticated) },
        { provide: CommandRunner, useValue: { open: () => Promise.resolve(null), run: () => Promise.resolve({ views: [] }) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  }

  it('should create', async () => {
    await build([], true);

    expect(component).toBeTruthy();
  });

  // it('starts the only available command when there is no session', async () => {
  //   await build([LOGIN], false);
  //
  //   expect(fixture.nativeElement.textContent).toContain('');
  // });
  //
  // it('stays idle when a session exists', async () => {
  //   await build([LOGIN], true);
  //
  //   expect(fixture.nativeElement.textContent).not.toContain('login');
  // });
});
