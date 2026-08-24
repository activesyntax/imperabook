import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { vi } from 'vitest';

import {
  flushBootstrap,
  flushCommandRegistry,
  flushRegistryUnauthorized,
  httpTesting,
  provideHttpTesting,
} from '@testing/http';
import { CommandRunner } from '@app/commands/command-runner';
import { WorkspaceStore } from '@app/state/workspace-store';
import { CommandSpec } from '@core/model';
import { CommandResult, ViewNode } from '@workspace/views/view-node';
import { ShellStartup } from './shell-startup';

const DASHBOARD = { command: 'dashboard', parameters: [] } as unknown as CommandSpec;
const LOGIN = { command: 'login', parameters: [] } as unknown as CommandSpec;

const LOGIN_SCREEN: ViewNode = { type: 'message', kind: 'info', text: 'login screen' };
const DASHBOARD_RESULT: CommandResult = {
  views: [{ type: 'message', kind: 'info', text: 'dashboard' }],
};

describe('ShellStartup', () => {
  let startup: ShellStartup;
  let store: WorkspaceStore;
  let http: HttpTestingController;
  let open: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    open = vi.fn();

    TestBed.configureTestingModule({
      providers: [provideHttpTesting(), { provide: CommandRunner, useValue: { open } }],
    });

    http = httpTesting();
    store = TestBed.inject(WorkspaceStore);
    startup = TestBed.inject(ShellStartup);
  });

  afterEach(() => http.verify());

  it('runs the dashboard and stores the view it returns', async () => {
    open.mockResolvedValue(DASHBOARD_RESULT);

    const running = startup.run();
    flushCommandRegistry([DASHBOARD]);
    await running;

    expect(open).toHaveBeenCalledTimes(1);
    expect(open.mock.calls[0][0]).toMatchObject({ command: 'dashboard' });
    expect(store.views()).toEqual(DASHBOARD_RESULT.views);
  });

  it('shows the bootstrap entry view and runs no command when there is no session', async () => {
    const running = startup.run();
    flushRegistryUnauthorized();
    await Promise.resolve();
    flushBootstrap(LOGIN, [LOGIN_SCREEN]);
    await running;

    expect(open).not.toHaveBeenCalled();
    expect(store.views()).toEqual([LOGIN_SCREEN]);
  });

  it('reports a missing dashboard instead of staying on the loading view', async () => {
    const running = startup.run();
    flushCommandRegistry([LOGIN]);
    await running;

    expect(open).not.toHaveBeenCalled();
    expect(store.views()).toEqual([
      { type: 'message', kind: 'error', text: '"dashboard" is not in the command registry.' },
    ]);
  });

  it('reports a registry load failure as a view and logs it', async () => {
    const logged = vi.spyOn(console, 'error').mockImplementation(() => { });

    const running = startup.run();
    http.expectOne('/api/commands').flush(null, { status: 500, statusText: 'Server Error' });
    await running;

    expect(store.views()).toEqual([
      { type: 'message', kind: 'error', text: 'Could not load the command registry.' },
    ]);
    expect(logged).toHaveBeenCalled();
  });
});
