import { Component, forwardRef, input } from '@angular/core';
import * as ViewNode from '../view-node';
import { ImageView } from '../image-view/image-view';
import { CardView } from '../card-view/card-view';
import { CardCollection } from '../card-collection/card-collection';
import { MessageView } from '../message-view/message-view';
import { UnknownView } from '../unknown-view/unknown-view';

@Component({
  selector: 'app-view',
  imports: [
    ImageView,
    CardView,
    CardCollection,
    MessageView,
    UnknownView,
    forwardRef(() => View),
  ],
  template: `
    @switch (node().type) {
      @case ('image') {
        <app-image-view [view]="asImage(node())" />
      }
      @case ('card') {
        <app-card-view [view]="asCard(node())" />
      }
      @case ('cardCollection') {
        <app-card-collection>
          @for (item of asCollection(node()).items; track $index) {
            <app-view [node]="item" />
          }
        </app-card-collection>
      }
      @case ('message') {
        <app-message-view [view]="asMessage(node())" />
      }
      @default {
        <app-unknown-view [nodeType]="node().type" />
      }
    }
  `,
})
export class View {
  node = input.required<ViewNode.ViewNode>();

  asImage = (n: ViewNode.ViewNode) => n as ViewNode.ImageView;
  asCard = (n: ViewNode.ViewNode) => n as ViewNode.CardView;
  asCollection = (n: ViewNode.ViewNode) => n as ViewNode.CardCollectionView;
  asMessage = (n: ViewNode.ViewNode) => n as ViewNode.MessageView;
}
