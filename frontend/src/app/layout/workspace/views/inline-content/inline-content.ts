import { Component, forwardRef, inject, input } from '@angular/core';
import { ItemOpener } from '@app/commands/item-opener';
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
  private readonly opener = inject(ItemOpener);

  content = input.required<readonly ViewNode.Inline[]>();

  /** An API link opens in the workspace; anything else is an ordinary web page. */
  protected isInApp(href: string): boolean {
    return href.startsWith('/api/');
  }

  // The href stays on the anchor for semantics and keyboard focus; the browser
  // must not follow it, or the user lands on raw JSON.
  protected follow(event: Event, href: string): void {
    event.preventDefault();
    void this.opener.follow(href);
  }
}
