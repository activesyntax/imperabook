import { inject, Injectable } from '@angular/core';

import { resultOfUnsupported } from '@app/commands/command-error';
import { CommandRunner } from '@app/commands/command-runner';
import { WorkspaceStore } from '@app/state/workspace-store';
import { checkCommand } from '@command-shell/command-visitor';

/**
 * Runs a command given as text — one the server put on a view, like a dashboard
 * finding's "list books having no isbn" — exactly as if it had been typed in the
 * command bar, and shows the result in the workspace.
 */
@Injectable({ providedIn: 'root' })
export class CommandLauncher {
  private readonly runner = inject(CommandRunner);
  private readonly store = inject(WorkspaceStore);

  async run(text: string): Promise<void> {
    const { command, valid } = checkCommand(text);

    // Text the grammar does not know yet is said so, not sent.
    if (!valid || command === null) {
      this.store.setResult(resultOfUnsupported(text));
      return;
    }

    this.store.setResult(await this.runner.run(command));
  }
}
