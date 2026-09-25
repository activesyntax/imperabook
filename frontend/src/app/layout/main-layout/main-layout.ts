import { Component, inject } from '@angular/core';
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
}
