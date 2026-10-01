import { Component, inject } from '@angular/core';
import { CommandRunner } from '@app/commands/command-runner';
import type { CommandName } from '@command-shell/command-visitor';
import { Workspace } from '@app/layout/workspace/workspace';
import { CommandShell } from '@command-shell/command-shell';
import { SideNav } from '@app/layout/side-nav/side-nav';
import { Session } from '@app/state/session';
import { WorkspaceStore } from '@app/state/workspace-store';

@Component({
  selector: 'app-main-layout',
  imports: [Workspace, CommandShell, SideNav],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  protected readonly session = inject(Session);
  protected readonly store = inject(WorkspaceStore);
  private readonly runner = inject(CommandRunner);

  /** A command picked in the side nav: run like one typed in the bar, shown in the workspace. */
  protected async run(command: CommandName): Promise<void> {
    this.store.setResult(await this.runner.run({ command, params: {} }));
  }
}
