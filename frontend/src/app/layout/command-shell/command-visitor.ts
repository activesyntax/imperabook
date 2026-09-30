import { ImperaBookDSLParserVisitor } from '@dsl/generated/ImperaBookDSLParserVisitor';
import { parseWithErrors } from './command-parser';
import {
  AddAuthorCmdContext,
  AddBookCmdContext,
  CommandContext,
  EntryContext,
  ValueContext,
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
export class CommandVisitor extends ImperaBookDSLParserVisitor<ParsedCommand | null> {

  // 1. Traverse root entry node to command
  override visitEntry = (ctx: EntryContext): ParsedCommand | null => {
    // Error recovery can leave no command at all ("xyz"): that is unrecognized, not a crash.
    const command = ctx.command();
    return command === null ? null : this.visit(command);
  };

  // 2. Traverse command wrapper to specific rule
  override visitCommand = (ctx: CommandContext): ParsedCommand | null => {
    return this.visitChildren(ctx);
  };

  // 3. Extract the addBookCmd parameters. The title is the rest of the first
  // line; each detail is the rest of its own line. A detail that was not typed
  // is left out; one typed with nothing after it is sent empty, for the server
  // to reject. The first of a repeated detail wins. Param names are the
  // backend's AddBookCommand fields.
  override visitAddBookCmd = (ctx: AddBookCmdContext): ParsedCommand => {
    const params: Record<string, string> = {
      title: this.text(ctx.bookTitle()?.VALUE()?.getText()),
    };

    for (const p of ctx.bookDetailParam()) {
      const [name, value] =
        p.authorParam() ? ['author', p.authorParam()?.value()]
        : p.subtitleParam() ? ['subtitle', p.subtitleParam()?.value()]
        : p.languageParam() ? ['language', p.languageParam()?.value()]
        : p.publicationYearParam() ? ['published', p.publicationYearParam()?.value()]
        : p.isbnParam() ? ['isbn', p.isbnParam()?.value()]
        : ['summary', p.summaryParam()?.value()];

      if (!(name in params)) params[name] = this.valueText(value);
    }

    return { command: 'add book', params };
  };

  override visitAddAuthorCmd = (ctx: AddAuthorCmdContext): ParsedCommand => ({
    command: 'add author',
    params: { name: this.text(ctx.authorName()?.VALUE()?.getText()) },
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

  private valueText(value: ValueContext | null | undefined): string {
    return this.text(value?.VALUE()?.getText());
  }

  // A value runs to the end of its line, so the blanks before a line break are
  // kept by the lexer and dropped here.
  private text(raw: string | undefined): string {
    return (raw ?? '').trim();
  }
}

/**
 * A command as typed, and whether it is one: no syntax errors and a command
 * recognized. Error recovery can still find a command in invalid text
 * ("dashboard xyz"), so `command` alone does not make it valid.
 */
export interface CommandCheck {
  readonly command: ParsedCommand | null;
  readonly valid: boolean;
}

export function checkCommand(text: string): CommandCheck {
  const { tree, errors } = parseWithErrors(text);
  const command = new CommandVisitor().visit(tree);
  return { command, valid: errors === 0 && command !== null };
}
