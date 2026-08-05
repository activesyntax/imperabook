import { Component, forwardRef, input } from '@angular/core';
import * as ViewNode from '@workspace/views/view-node';

/** Renders an inline run list. Self-referencing: emphasis and links wrap
 *  further inlines, so the component recurses into its own template.
 *  `forwardRef` is required — the imports array is evaluated before the
 *  class binding is initialised. */
@Component({
  selector: 'app-inline-content',
  templateUrl: './inline-content.html',
  imports: [forwardRef(() => InlineContent)],
})
export class InlineContent {
  content = input.required<readonly ViewNode.Inline[]>();
}
