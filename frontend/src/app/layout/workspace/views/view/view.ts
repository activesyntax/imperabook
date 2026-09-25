import { Component, forwardRef, input } from '@angular/core';
import * as ViewNode from '../view-node';
import { HeadingView } from '../heading-view/heading-view';
import { ImageView } from '../image-view/image-view';
import { CardView } from '../card-view/card-view';
import { CardCollection } from '../card-collection/card-collection';
import { MessageView } from '../message-view/message-view';
import { GuidanceView } from '../guidance-view/guidance-view';
import { ItemCollectionView } from '../item-collection-view/item-collection-view';
import { TextView } from '../text-view/text-view';
import { UnknownView } from '../unknown-view/unknown-view';
import { LoginForm } from '../login-form/login-form';

@Component({
  selector: 'app-view',
  imports: [
    HeadingView,
    ImageView,
    CardView,
    CardCollection,
    MessageView,
    GuidanceView,
    ItemCollectionView,
    TextView,
    UnknownView,
    LoginForm,
    forwardRef(() => View),
  ],
  templateUrl: './view.html',
  styleUrl: './view.scss',
})
export class View {
  node = input.required<ViewNode.ViewNode>();
  asHeading = (n: ViewNode.ViewNode) => n as ViewNode.HeadingView;
  asImage = (n: ViewNode.ViewNode) => n as ViewNode.ImageView;
  asCard = (n: ViewNode.ViewNode) => n as ViewNode.CardView;
  asCollection = (n: ViewNode.ViewNode) => n as ViewNode.CardCollectionView;
  asMessage = (n: ViewNode.ViewNode) => n as ViewNode.MessageView;
  asGuidance = (n: ViewNode.ViewNode) => n as ViewNode.GuidanceView;
  asItemCollection = (n: ViewNode.ViewNode) => n as ViewNode.ItemCollectionView;
  asTextView = (n: ViewNode.ViewNode) => n as ViewNode.TextView;
  asLoginForm = (n: ViewNode.ViewNode) => n as ViewNode.LoginFormView;
}
