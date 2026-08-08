import { Component, input } from '@angular/core';
import * as ViewNode from '../view-node';

@Component({
  selector: 'app-heading-view',
  templateUrl: './heading-view.html',
  styleUrl: './heading-view.scss',
})
export class HeadingView {
  view = input.required<ViewNode.HeadingView>();
}
