import { Component, inject, input } from '@angular/core';
import * as ViewNode from '@workspace/views/view-node';
import { InlineContent } from '../inline-content/inline-content';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.html',
  styleUrl: './text-view.scss',
  imports: [InlineContent],
})
export class TextView {
  view = input.required<ViewNode.TextView>();
}
