import { TestBed } from '@angular/core/testing';

import { CommandRunner } from '@app/commands/command-runner';
import { WorkspaceStore } from '@app/state/workspace-store';
import type { CommandResult } from '@workspace/views/view-node';
import { CommandLauncher } from './command-launcher';

const LISTED: CommandResult = { views: [{ type: 'message', kind: 'info', text: 'listed' }] };

describe('CommandLauncher', () => {
  let launcher: CommandLauncher;
  let runner: { run: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    runner = { run: vi.fn(() => Promise.resolve(LISTED)) };
    TestBed.configureTestingModule({ providers: [{ provide: CommandRunner, useValue: runner }] });
    launcher = TestBed.inject(CommandLauncher);
  });

  it('runs a command given as text, as if typed, and shows its result', async () => {
    await launcher.run('list books having no isbn');

    expect(runner.run).toHaveBeenCalledWith({ command: 'list books', params: { missing: 'isbn' } });
    expect(TestBed.inject(WorkspaceStore).views()).toEqual(LISTED.views);
  });

  it('says a command it does not know is not available, and sends nothing', async () => {
    await launcher.run('list authors having no books');

    expect(runner.run).not.toHaveBeenCalled();
    expect(TestBed.inject(WorkspaceStore).views()[0]).toMatchObject({
      type: 'message',
      kind: 'warning',
      text: "'list authors having no books' is not available yet.",
    });
  });
});
