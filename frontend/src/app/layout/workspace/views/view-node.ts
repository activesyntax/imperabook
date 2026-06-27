export type MessageKind = 'info' | 'success' | 'warning' | 'error';

export type ImageVariant = 'logo' | 'cover' | 'thumbnail' | 'hero';

export type ImageView = {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
  variant?: ImageVariant;
};

export type CardView = {
  type: 'card';
  heading: string;
  value: string;
  caption?: string;
};

export type CardCollectionView = {
  type: 'cardCollection';
  items: ViewNode[];
};

export type MessageView = {
  type: 'message';
  text: string;
  kind: MessageKind;
};

export interface GuidanceHint {
  readonly keys: readonly string[];   // 'Enter', 'Tab', 'Ctrl K', '/'
  readonly label: string;
}

export interface GuidanceView {
  readonly type: 'guidance';
  readonly title: string;
  readonly intro?: string;
  readonly hints: readonly GuidanceHint[];
}

export type ViewNode = ImageView | CardView | CardCollectionView | MessageView | GuidanceView;

export type CommandResult = {
  views: ViewNode[];
};
