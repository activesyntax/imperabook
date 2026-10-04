import { ImperaBookDSLParserVisitor } from '@dsl/generated/ImperaBookDSLParserVisitor';
import { parseWithErrors } from './command-parser';
import {
  AddAuthorCmdContext,
  AddBookCmdContext,
  FindCmdContext,
  ListBooksCmdContext,
  PublishedFilterContext,
  YearContext,
  PageComparisonContext,
  PageCountContext,
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
  | 'logout'
  | 'find';

export interface ParsedCommand {
  readonly command: CommandName;
  readonly params: Readonly<Record<string, string>>;
}

const noParams = (command: CommandName) => (): ParsedCommand => ({ command, params: {} });

function yearText(year: YearContext | null | undefined): string {
  return year?.NUMBER()?.getText() ?? '';
}

function yearFilter(f: PublishedFilterContext): Record<string, string> {
  const c = f.yearComparison();
  if (c?.yearIn()) return { publishedOp: 'in', published: yearText(c.yearIn()?.year()) };
  if (c?.yearBefore()) return { publishedOp: 'before', published: yearText(c.yearBefore()?.year()) };
  if (c?.yearAfter()) return { publishedOp: 'after', published: yearText(c.yearAfter()?.year()) };

  const between = c?.yearBetween();
  return {
    publishedOp: 'between',
    published: yearText(between?.year()),
    publishedTo: yearText(between?.yearAnd()?.year()),
  };
}

function pageFilter(c: PageComparisonContext): Record<string, string> {
  const n = (count: PageCountContext | null | undefined) => count?.NUMBER()?.getText() ?? '';

  if (c.pagesMoreThan()) return { pagesOp: 'over', pages: n(c.pagesMoreThan()?.pageCount()) };
  if (c.pagesLessThan()) return { pagesOp: 'under', pages: n(c.pagesLessThan()?.pageCount()) };
  if (c.pagesEqual()) return { pagesOp: 'equal', pages: n(c.pagesEqual()?.pageCount()) };
  if (c.pagesAtLeast()) return { pagesOp: 'atLeast', pages: n(c.pagesAtLeast()?.pageCount()) };
  if (c.pagesAtMost()) return { pagesOp: 'atMost', pages: n(c.pagesAtMost()?.pageCount()) };
  if (c.pagesNot()) return { pagesOp: 'otherThan', pages: n(c.pagesNot()?.pageCount()) };

  const between = c.pagesBetween();
  return { pagesOp: 'between', pages: n(between?.pageCount()), pagesTo: n(between?.andBound()?.pageCount()) };
}

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
      const [name, text] =
        p.authorParam() ? ['author', this.valueText(p.authorParam()?.value())]
        : p.subtitleParam() ? ['subtitle', this.valueText(p.subtitleParam()?.value())]
        : p.languageParam() ? ['language', this.valueText(p.languageParam()?.value())]
        : p.publicationYearParam() ? ['published', yearText(p.publicationYearParam()?.year())]
        : p.isbnParam() ? ['isbn', this.valueText(p.isbnParam()?.value())]
        : ['summary', this.valueText(p.summaryParam()?.value())];

      if (!(name in params)) params[name] = text;
    }

    return { command: 'add book', params };
  };

  override visitAddAuthorCmd = (ctx: AddAuthorCmdContext): ParsedCommand => ({
    command: 'add author',
    params: { name: this.text(ctx.authorName()?.VALUE()?.getText()) },
  });

  // The keywords as one string, blanks between them collapsed; splitting them up
  // is the search's business.
  override visitFindCmd = (ctx: FindCmdContext): ParsedCommand => ({
    command: 'find',
    params: { keywords: this.text(ctx.keywords()?.VALUE()?.getText()).split(/\s+/).join(' ') },
  });

  // Commands without parameters
  override visitUpdateBookCmd = noParams('update book');
  override visitRemoveBookCmd = noParams('remove book');
  // The optional page filter becomes the query the server reads, unchanged by the
  // wording ("is more than" is still "over"): pagesOp names
  // the comparison, pages its number, pagesTo the upper bound of a "between".
  // "written by" becomes author, matched by the server against the books' authors;
  // "published …" becomes publishedOp, published and (for a range) publishedTo.
  // As with add book, the first of a repeated filter wins.
  override visitListBooksCmd = (ctx: ListBooksCmdContext): ParsedCommand => {
    let params: Record<string, string> = {};

    for (const filter of ctx.listFilter()) {
      const comparison = filter.pagesFilter()?.pageComparison();
      if (comparison && !('pagesOp' in params)) params = { ...params, ...pageFilter(comparison) };

      const writer = filter.authorFilter()?.writerName();
      if (writer && !('author' in params)) params = { ...params, author: this.text(writer.VALUE()?.getText()) };

      const published = filter.publishedFilter();
      if (published && !('publishedOp' in params)) params = { ...params, ...yearFilter(published) };
    }

    return { command: 'list books', params };
  };
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
