import { Component, input } from '@angular/core';
import * as ViewNode from '@workspace/views/view-node';

@Component({
  selector: 'app-guidance-view',
  templateUrl: './guidance-view.html',
  styleUrl: './guidance-view.scss',
})
export class GuidanceView {
  view = input.required<ViewNode.GuidanceView>();
}
