import { Component, input } from '@angular/core';

@Component({
  selector: 'app-image-view',
  imports: [],
  templateUrl: './image-view.html',
  styleUrl: './image-view.scss',
})
export class ImageView {
  readonly src = input.required<string>();
  readonly alt = input<string>('Workspace visual content');
  readonly width = input<number | string>(300);
  readonly height = input<number | string>(300);
}
