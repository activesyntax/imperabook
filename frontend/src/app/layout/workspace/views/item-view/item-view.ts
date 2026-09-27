import { Component, computed, inject, input } from '@angular/core';
import { ItemOpener } from '@app/commands/item-opener';
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
  selected = computed(() => this.openable() && this.opener.selectedRef() === this.view().ref);

  protected open(): void {
    void this.opener.open(this.view());
  }

  primary = computed(() => this.view().properties.find((p) => p.role === 'primary'));
  secondary = computed(() => this.view().properties.filter((p) => p.role === 'secondary'));
  meta = computed(() => this.view().properties.filter((p) => p.role === 'meta'));

  coverAlt = computed(() => this.primary()?.value ?? '');
}
