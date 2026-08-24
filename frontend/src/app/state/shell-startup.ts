import { inject, Injectable } from '@angular/core';

import { CommandRegistry } from '@app/commands/command-registry';
import { CommandRunner } from '@app/commands/command-runner';
import { WorkspaceStore } from '@app/state/workspace-store';
import { CommandSpec } from '@core/model';
import { CommandResult } from '@workspace/views/view-node';

const DASHBOARD_COMMAND = 'dashboard';

@Injectable({ providedIn: 'root' })
export class ShellStartup {
  private readonly registry = inject(CommandRegistry);
  private readonly runner = inject(CommandRunner);
  private readonly store = inject(WorkspaceStore);

  async run(): Promise<void> {
    this.store.setResult(loading());

    try {
      try {
        await this.registry.ready();
      } catch (error) {
        console.error('Command registry failed to load.', error);
        this.store.setResult(registryLoadFailed());
        return;
      }

      const startupViews = this.registry.startupViews();
      if (startupViews.length > 0) {
        this.store.setResult({ views: [...startupViews] });
        return;
      }

      const dashboard = this.registry.commands().find((c) => c.command === DASHBOARD_COMMAND);

      if (dashboard === undefined) {
        this.store.setResult(commandNotFound());
        return;
      }

      await this.dispatch(dashboard);
    } catch (error) {
      console.error('Shell startup failed.', error);
      this.store.setResult(startupFailed());
    }
  }

  private async dispatch(command: CommandSpec): Promise<void> {
    this.store.setResult(loading());

    const view = await this.runner.open(command);

    if (view !== null) {
      this.store.setResult(view);
    }
  }
}

function loading(): CommandResult {
  return { views: [{ type: 'message', kind: 'info', text: 'Loading your library…' }] };
}

function registryLoadFailed(): CommandResult {
  return {
    views: [{ type: 'message', kind: 'error', text: 'Could not load the command registry.' }],
  };
}

function commandNotFound(): CommandResult {
  return {
    views: [
      {
        type: 'message',
        kind: 'error',
        text: `"${DASHBOARD_COMMAND}" is not in the command registry.`,
      },
    ],
  };
}

function startupFailed(): CommandResult {
  return {
    views: [
      {
        type: 'message',
        kind: 'error',
        text: 'ImperaBook could not start. Reload the page; if it persists, check the server log.',
      },
    ],
  };
}
