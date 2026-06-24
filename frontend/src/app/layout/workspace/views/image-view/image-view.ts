// src/app/layout/workspace/views/image-view/image-view.ts
import { Component, computed, input } from '@angular/core';
import * as ViewNode from '../view-node';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.html',
  styleUrl: './image-view.scss',
})
export class ImageView {
  view = input.required<ViewNode.ImageView>();

  // Default to 'logo' when the backend omits variant.
  variantClass = computed(() => `image-view--${this.view().variant ?? 'logo'}`);
}
