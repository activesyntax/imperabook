import { Component } from '@angular/core';
import { Workspace } from "@app/layout/workspace/workspace";
import { CommandShell } from "@command-shell/command-shell";

@Component({
  selector: 'app-main-layout',
  imports: [Workspace, CommandShell],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout { }
