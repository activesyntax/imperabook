import { Component, inject, input } from '@angular/core';
import { CommandLauncher } from '@app/commands/command-launcher';
import * as ViewNode from '@workspace/views/view-node';
import { InlineContent } from '../inline-content/inline-content';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.html',
  styleUrl: './text-view.scss',
  imports: [InlineContent],
})
export class TextView {
  private readonly launcher = inject(CommandLauncher);

  view = input.required<ViewNode.TextView>();

  /** A finding names a command; clicking it runs that command. */
  protected run(command: string): void {
    void this.launcher.run(command);
  }
}
