import { ImperaBookDSLVisitor } from '@dsl/generated/ImperaBookDSLVisitor';
import {
  AddAuthorCmdContext,
  AddBookCmdContext,
  CommandContext,
  EntryContext,
} from '@dsl/generated/ImperaBookDSLParser';

export type CommandName =
  | 'add book'
  | 'update book'
  | 'remove book'
  | 'list books'
  | 'add author'
  | 'update author'
  | 'remove author'
  | 'list authors'
  | 'dashboard'
  | 'library'
  | 'settings'
  | 'about'
  | 'help'
  | 'account'
  | 'login'
  | 'logout';

export interface ParsedCommand {
  readonly command: CommandName;
  readonly params: Readonly<Record<string, string>>;
}

const noParams = (command: CommandName) => (): ParsedCommand => ({ command, params: {} });

// Extend the generated ImperaBookDSLVisitor class directly
export class CommandVisitor extends ImperaBookDSLVisitor<ParsedCommand | null> {

  // 1. Traverse root entry node to command
  override visitEntry = (ctx: EntryContext): ParsedCommand | null => {
    return this.visit(ctx.command());
  };

  // 2. Traverse command wrapper to specific rule
  override visitCommand = (ctx: CommandContext): ParsedCommand | null => {
    return this.visitChildren(ctx);
  };

  // 3. Extract the addBookCmd parameters. Only the title is required; a detail
  // that was not typed is left out rather than sent empty. The first of a
  // repeated detail wins. Param names are the backend's AddBookCommand fields.
  override visitAddBookCmd = (ctx: AddBookCmdContext): ParsedCommand => {
    const params: Record<string, string> = {
      title: this.cleanString(ctx.bookTitle()?.STRING()?.getText() ?? ''),
    };

    for (const p of ctx.bookDetailParam()) {
      const [name, token] =
        p.authorParam() ? ['author', p.authorParam()?.STRING()]
        : p.subtitleParam() ? ['subtitle', p.subtitleParam()?.STRING()]
        : p.languageParam() ? ['language', p.languageParam()?.STRING()]
        : p.publicationYearParam() ? ['published', p.publicationYearParam()?.NUMBER()]
        : p.isbnParam() ? ['isbn', p.isbnParam()?.STRING()]
        : ['summary', p.summaryParam()?.STRING()];

      if (token && !(name in params)) params[name] = this.cleanString(token.getText());
    }

    return { command: 'add book', params };
  };

  override visitAddAuthorCmd = (ctx: AddAuthorCmdContext): ParsedCommand => ({
    command: 'add author',
    params: { name: this.cleanString(ctx.authorName()?.STRING()?.getText() ?? '') },
  });

  // Commands without parameters
  override visitUpdateBookCmd = noParams('update book');
  override visitRemoveBookCmd = noParams('remove book');
  override visitListBooksCmd = noParams('list books');
  override visitUpdateAuthorCmd = noParams('update author');
  override visitRemoveAuthorCmd = noParams('remove author');
  override visitListAuthorsCmd = noParams('list authors');
  override visitDashboardCmd = noParams('dashboard');
  override visitLibraryCmd = noParams('library');
  override visitSettingsCmd = noParams('settings');
  override visitAboutCmd = noParams('about');
  override visitHelpCmd = noParams('help');
  override visitAccountCmd = noParams('account');
  override visitLoginCmd = noParams('login');
  override visitLogoutCmd = noParams('logout');

  // Default value returned when visiting a node without an explicit result
  protected override defaultResult(): ParsedCommand | null {
    return null;
  }

  // Aggregates child results so child values are propagated up the tree
  protected override aggregateResult(
    aggregate: ParsedCommand | null,
    nextResult: ParsedCommand | null
  ): ParsedCommand | null {
    return nextResult ?? aggregate;
  }

  private cleanString(raw: string): string {
    return raw.replace(/^"|"$/g, '');
  }
}
