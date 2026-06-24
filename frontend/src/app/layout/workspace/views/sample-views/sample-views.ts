import { CommandResult } from '../view-node';

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
        { type: 'card', heading: 'All Books', value: '248', caption: 'books in your sanctuary' },
        { type: 'card', heading: 'Authors', value: '63', caption: 'across your collection' },
        { type: 'card', heading: 'Languages', value: '7', caption: 'languages represented' },
      ],
    },
    {
      type: 'message',
      kind: 'info',
      text: 'Type `list books` to view all books, or `add book` to catalog a new one.',
    },
  ],
};
