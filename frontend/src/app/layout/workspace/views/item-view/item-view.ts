import { Component, computed, input } from '@angular/core';
import * as ViewNode from '../view-node';

@Component({
  selector: 'app-item-view',
  imports: [],
  templateUrl: './item-view.html',
  styleUrl: './item-view.scss',
})
export class ItemView {
  view = input.required<ViewNode.ItemView>();

  primary = computed(() => this.view().properties.find((p) => p.role === 'primary'));
  secondary = computed(() => this.view().properties.filter((p) => p.role === 'secondary'));
  meta = computed(() => this.view().properties.filter((p) => p.role === 'meta'));

  coverAlt = computed(() => this.primary()?.value ?? '');
}
