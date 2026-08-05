// src/app/layout/workspace/views/image-view/image-view.ts
import { Component, computed, input } from '@angular/core';
import * as ViewNode from '@workspace/views/view-node';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.html',
  styleUrl: './image-view.scss',
})
export class ImageView {
  view = input.required<ViewNode.ImageView>();

  roleClass = computed(() => `image-view--${this.view().role ?? 'illustration'}`);
}
