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
  | 'show book'
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

  // 3. Extract the addBookCmd parameters
  override visitAddBookCmd = (ctx: AddBookCmdContext): ParsedCommand => {
    const authorRaw = ctx.authorParam()?.STRING()?.getText() ?? '';
    const titleRaw = ctx.titleParam()?.STRING()?.getText() ?? '';

    return {
      command: 'add book',
      params: {
        author: this.cleanString(authorRaw),
        title: this.cleanString(titleRaw),
      },
    };
  };

  override visitAddAuthorCmd = (ctx: AddAuthorCmdContext): ParsedCommand => ({
    command: 'add author',
    params: { name: this.cleanString(ctx.STRING()?.getText() ?? '') },
  });

  // Commands without parameters
  override visitUpdateBookCmd = noParams('update book');
  override visitRemoveBookCmd = noParams('remove book');
  override visitShowBookCmd = noParams('show book');
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
