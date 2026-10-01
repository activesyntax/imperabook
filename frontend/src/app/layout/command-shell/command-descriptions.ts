import type { CommandName } from './command-visitor';

/**
 * One line per command for the status bar, shown once the typed text is that
 * command. Keyed by the full CommandName union, so a command added to the
 * grammar fails to compile here until it is described.
 */
export const COMMAND_DESCRIPTIONS: Record<CommandName, string> = {
  'add book': 'Add a book to your library',
  'update book': 'Change the details of a book',
  'remove book': 'Remove the selected book from your library',
  'list books': 'All the books in your library',
  'add author': 'Add an author to your catalog',
  'update author': 'Change the details of an author',
  'remove author': 'Remove an author from your catalog',
  'list authors': 'All the authors in your catalog',
  'dashboard': 'Your library at a glance, and what needs attention',
  'library': 'Statistics about your library',
  'settings': 'Your settings',
  'about': 'About ImperaBook',
  'help': 'The commands and keys you can use',
  'account': 'Your account',
  'login': 'Sign in',
  'logout': 'Sign out and leave your library',
  'find': 'Find books and authors by keywords',
};
