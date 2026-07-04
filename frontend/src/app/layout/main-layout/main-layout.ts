import { Component, inject } from '@angular/core';
import { Workspace } from "@app/layout/workspace/workspace";
import { CommandShell } from "@command-shell/command-shell";
import { UserBadge } from "@app/layout/user-badge/user-badge";
import { Session } from '@app/state/session';

@Component({
  selector: 'app-main-layout',
  imports: [Workspace, CommandShell, UserBadge],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  protected readonly session = inject(Session);
}
