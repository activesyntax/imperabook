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

export type ViewNode = ImageView | CardView | CardCollectionView | MessageView;

export type CommandResult = {
  views: ViewNode[];
};
