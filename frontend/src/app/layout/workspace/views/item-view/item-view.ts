import { afterRenderEffect, Component, computed, ElementRef, inject, input } from '@angular/core';
import { itemElementId, ItemOpener } from '@app/commands/item-opener';
import * as ViewNode from '../view-node';

@Component({
  selector: 'app-item-view',
  imports: [],
  templateUrl: './item-view.html',
  styleUrl: './item-view.scss',
})
export class ItemView {
  private readonly opener = inject(ItemOpener);

  view = input.required<ViewNode.ItemView>();

  openable = computed(() => this.view().open !== undefined);
  elementId = computed(() => itemElementId(this.view().ref));
  selected = computed(() => this.openable() && this.opener.selectedRef() === this.view().ref);

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef);

    // The highlight moved here (Alt+↑↓, or coming back to a list): bring it into view.
    afterRenderEffect(() => {
      if (!this.selected() || this.opener.revealRef() !== this.view().ref) return;

      host.nativeElement.scrollIntoView?.({ block: 'nearest' });
      this.opener.revealRef.set(undefined);
    });
  }

  protected open(): void {
    void this.opener.open(this.view());
  }

  primary = computed(() => this.view().properties.find((p) => p.role === 'primary'));
  secondary = computed(() => this.view().properties.filter((p) => p.role === 'secondary'));
  meta = computed(() => this.view().properties.filter((p) => p.role === 'meta'));

  coverAlt = computed(() => this.primary()?.value ?? '');
}
