import { Component, input } from '@angular/core';
import * as ViewNode from '../view-node';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.html',
  styleUrl: './message-view.scss',
})
export class MessageView {
  view = input.required<ViewNode.MessageView>();
}
