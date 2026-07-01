import { Component, computed, input } from '@angular/core';
import * as ViewNode from '../view-node';

@Component({
  selector: 'app-item-view',
  imports: [],
  templateUrl: './item-view.html',
  styleUrl: './item-view.scss',
})
export class ItemView {
  item = input.required<ViewNode.ItemView>();

  primary = computed(() => this.item().properties.find((p) => p.role === 'primary'));
  secondary = computed(() => this.item().properties.filter((p) => p.role === 'secondary'));
  meta = computed(() => this.item().properties.filter((p) => p.role === 'meta'));
}
