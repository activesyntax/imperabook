import { CommandResult, GuidanceView, MessageView } from '@workspace/views/view-node';


const message: MessageView = {
  type: 'message',
  kind: 'warning',
  text: 'Interpretation of your command will appear here.',
};

const welcomeGuidance: GuidanceView = {
  type: 'guidance',
  title: 'Getting started',
  intro: `ImperaBook is a keyboard-driven catalog for your personal library. ` +
    `Type a command to add, find, and organize your books — anything that isn't a command runs as a search.`,
  hints: [
    { keys: ['Enter'], label: 'run the typed command' },
    { keys: ['Tab', 'Enter'], label: 'pick a suggestion, then accept' },
    { keys: ['Ctrl + K'], label: 'focus the command bar' },
  ],
};

/** Stand-in for a backend `dashboard` response while the API doesn't exist yet. */
export const SAMPLE_DASHBOARD: CommandResult = {
  views: [
    {
      type: 'image',
      src: 'assets/img/imperabook-logo-dark.svg', // swap for your asset
      alt: 'ImperaBook',
      caption: 'Your library, at your fingertips.',
      variant: 'logo'
    },
    {
      type: 'cardCollection',
      items: [
        { type: 'card', heading: 'All Books', value: '248', caption: 'books in your library' },
        { type: 'card', heading: 'Authors', value: '63', caption: 'across your collection' },
        { type: 'card', heading: 'Languages', value: '7', caption: 'languages represented' },
      ],
    },
    message,
    welcomeGuidance,

  ],
};

