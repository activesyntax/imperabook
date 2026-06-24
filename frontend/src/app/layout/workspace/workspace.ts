// src/app/layout/workspace/workspace.ts
import { Component, signal } from '@angular/core';
import { View } from './views/view/view';
import { CommandResult } from './views/view-node';
import { SAMPLE_DASHBOARD } from './views/sample-views';

@Component({
  selector: 'app-workspace',
  imports: [View],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {
  // Hardcoded for now; later this signal is fed by the command pipeline.
  result = signal<CommandResult>(SAMPLE_DASHBOARD);
}
