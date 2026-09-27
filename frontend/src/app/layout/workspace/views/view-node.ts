export interface HeadingView {
  type: 'heading';
  text: string;
  page: PageInfo | null;
}

export type MessageKind = 'info' | 'success' | 'warning' | 'error';

export type ImageRole = 'branding' | 'illustration';

export type ImageView = {
  type: 'image';
  src: string;
  alt: string;
  role: ImageRole;
  caption?: string;
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

export type ItemPropertyRole = 'primary' | 'secondary' | 'meta';

export interface ItemProperty {
  readonly name: string;
  readonly value: string;
  readonly role: ItemPropertyRole;
}

export interface ItemView {
  readonly ref: string;
  readonly properties: readonly ItemProperty[];
  readonly imageSrc?: string;
}


export interface PageInfo {
  readonly current: number;
  readonly count: number;
  readonly totalItems: number;
  readonly itemsPlural: string;
}

export interface ItemCollectionView {
  readonly type: 'itemCollection';

  readonly title: string;

  readonly emptyMessage: string;

  readonly items: readonly ItemView[];

  readonly page?: PageInfo;
}

/** Asks for credentials in place of the command bar. */
export interface LoginFormView {
  readonly type: 'loginForm';
}

export type ViewNode = ImageView | CardView | CardCollectionView | MessageView | GuidanceView | ItemCollectionView | TextView | HeadingView | LoginFormView;

export type CommandResult = {
  views: ViewNode[];
  /** The command was not carried out and needs a tweak: give the typed text back. */
  keepQuery?: boolean;
};

// TEXT VIEW

export type HeadingLevel = 'one' | 'two' | 'three';

export interface TextRun { type: 'text'; text: string; }
export interface StrongRun { type: 'strong'; content: Inline[]; }
export interface EmphasisRun { type: 'emphasis'; content: Inline[]; }
export interface LinkRun { type: 'link'; href: string; content: Inline[]; }
export type Inline = TextRun | StrongRun | EmphasisRun | LinkRun;

export interface Heading { type: 'heading'; level: HeadingLevel; content: Inline[]; }
export interface Paragraph { type: 'paragraph'; content: Inline[]; }
export interface CommandBlock {
  type: 'command';
  command: string;
  description: string | null;
}

export interface Finding {
  type: 'finding';
  value: string;
  text: string;
  command: string;
  commandText: string | null;
}
export interface Hint {
  type: 'hint';
  keys: string[];
  text: string;
}

export type TextBlock = Heading | Paragraph | CommandBlock | Finding | Hint;

export interface TextView { type: 'textView'; blocks: TextBlock[]; }
