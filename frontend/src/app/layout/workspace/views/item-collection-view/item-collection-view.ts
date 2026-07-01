import { Component, input } from '@angular/core';
import { ItemView } from '../item-view/item-view';
import * as ViewNode from '../view-node';

@Component({
  selector: 'app-item-collection-view',
  imports: [ItemView],
  templateUrl: './item-collection-view.html',
  styleUrl: './item-collection-view.scss',
})
export class ItemCollectionView {
  view = input.required<ViewNode.ItemCollectionView>();
}
