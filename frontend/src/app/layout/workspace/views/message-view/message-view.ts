// src/app/layout/workspace/views/message-view/message-view.ts
import { Component, input } from '@angular/core';
import * as CV from '../view-node';

@Component({
  selector: 'app-message-view',
  template: `
    <p class="message" [class]="'message--' + view().kind">{{ view().text }}</p>
  `,
  styles: `
    .message {
      margin: 0;
      padding: 14px 18px;
      border-radius: 6px;
      border-left: 3px solid var(--ib-accent, #c8763f);
      background: var(--ib-surface, #161616);
      color: var(--ib-text-muted, #b9aa99);
      font-size: 0.95rem;
    }
    .message--success { border-left-color: #6fae6f; }
    .message--warning { border-left-color: #d6a13d; }
    .message--error   { border-left-color: #c4564b; }
  `,
})
export class MessageView {
  view = input.required<CV.MessageView>();
}
