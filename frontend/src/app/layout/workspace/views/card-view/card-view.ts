import { Component, input } from '@angular/core';
import * as ViewNode from '@workspace/views/view-node';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.html',
  styleUrl: './card-view.scss',
})
export class CardView {
  view = input.required<ViewNode.CardView>();
}
