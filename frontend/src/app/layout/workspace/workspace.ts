import { Component, effect, inject, signal, untracked } from '@angular/core';
import { CommandRegistry } from '../../commands/command-registry'; // adjust to actual path
import { CommandRunner } from '../../commands/command-runner'; // adjust to actual path
import { CommandSpec } from '@core/model';
import { View } from './views/view/view';
import { CommandResult } from './views/view-node';

const DASHBOARD_COMMAND = 'dashboard';

@Component({
  selector: 'app-workspace',
  imports: [View],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {
  private readonly registry = inject(CommandRegistry);
  private readonly runner = inject(CommandRunner);

  private readonly _result = signal<CommandResult>(loading());
  readonly result = this._result.asReadonly();

  constructor() {
    // Fires once the registry has a non-empty command list — this IS
    // "ask for the dashboard at startup," just routed through the same
    // recipe-execution path every other command uses (DECISIONS 16),
    // instead of a route hardcoded here.
    effect(() => {
      if (this.registry.loading()) {
        return;
      }

      const registryError = this.registry.error();
      if (registryError) {
        untracked(() => this._result.set(registryLoadFailed()));
        return;
      }

      const dashboard = this.registry.commands().find((c) => c.command === DASHBOARD_COMMAND);

      if (!dashboard) {
        untracked(() => this._result.set(commandNotFound()));
        return;
      }

      untracked(() => void this.dispatch(dashboard));
    });
  }

  private async dispatch(command: CommandSpec): Promise<void> {
    this._result.set(loading());
    this._result.set(await this.runner.run(command));
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
