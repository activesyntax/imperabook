import { Component, computed, input } from '@angular/core';
import * as ViewNode from '@workspace/views/view-node';

/** Bar label per message kind. Keyed by the full MessageKind union, so adding a
 *  new kind fails to compile here until it is given a label. */
const KIND_LABEL: Record<ViewNode.MessageKind, string> = {
  info: 'Info',
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
};

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.html',
  styleUrl: './message-view.scss',
  host: { '[attr.data-kind]': 'view().kind' },
})
export class MessageView {
  view = input.required<ViewNode.MessageView>();
  label = computed(() => KIND_LABEL[this.view().kind]);
}
