import {
  CharStream,
  CommonTokenStream,
  DefaultErrorStrategy,
  Token
} from 'antlr4ng';
import { CandidatesCollection, CodeCompletionCore } from 'antlr4-c3';
import { ImperaBookDSLLexer } from '@dsl/generated/ImperaBookDSLLexer';
import { ImperaBookDSLParser } from '@dsl/generated/ImperaBookDSLParser';
import { checkCommand } from './command-visitor';

export interface CompletionItem {
  label: string;
  insertText: string;
  /** Replace input[replaceStart, replaceEnd) with insertText. */
  replaceStart: number;
  replaceEnd: number;
  /** Caret offset within insertText once the completion is accepted. */
  caret: number;
}

interface Phrase {
  label: string;
  /** Text to insert; "$0" marks where the caret lands (default: at the end). */
  insertText: string;
}

const CARET_MARKER = '$0';

/**
 * Phrase text for each "phrase rule" of the grammar. c3 reports these rules
 * instead of the individual keywords inside them, so the text is supplied here.
 */
const RULE_PHRASES: Record<number, Phrase> = {
  [ImperaBookDSLParser.RULE_addBookCmd]: { label: 'add book', insertText: 'add book ' },
  [ImperaBookDSLParser.RULE_updateBookCmd]: { label: 'update book', insertText: 'update book ' },
  [ImperaBookDSLParser.RULE_removeBookCmd]: { label: 'remove book', insertText: 'remove book ' },
  [ImperaBookDSLParser.RULE_listBooksCmd]: { label: 'list books', insertText: 'list books ' },
  [ImperaBookDSLParser.RULE_addAuthorCmd]: { label: 'add author', insertText: 'add author ' },
  [ImperaBookDSLParser.RULE_updateAuthorCmd]: { label: 'update author', insertText: 'update author ' },
  [ImperaBookDSLParser.RULE_removeAuthorCmd]: { label: 'remove author', insertText: 'remove author ' },
  [ImperaBookDSLParser.RULE_listAuthorsCmd]: { label: 'list authors', insertText: 'list authors ' },
  [ImperaBookDSLParser.RULE_dashboardCmd]: { label: 'dashboard', insertText: 'dashboard ' },
  [ImperaBookDSLParser.RULE_libraryCmd]: { label: 'library', insertText: 'library ' },
  [ImperaBookDSLParser.RULE_settingsCmd]: { label: 'settings', insertText: 'settings ' },
  [ImperaBookDSLParser.RULE_aboutCmd]: { label: 'about', insertText: 'about ' },
  [ImperaBookDSLParser.RULE_helpCmd]: { label: 'help', insertText: 'help ' },
  [ImperaBookDSLParser.RULE_accountCmd]: { label: 'account', insertText: 'account ' },
  [ImperaBookDSLParser.RULE_loginCmd]: { label: 'login', insertText: 'login ' },
  [ImperaBookDSLParser.RULE_logoutCmd]: { label: 'logout', insertText: 'logout ' },
  [ImperaBookDSLParser.RULE_findCmd]: { label: 'find', insertText: 'find ' },
  // Values are typed as-is to the end of the line, so these two only name what
  // goes there; accepting them inserts nothing.
  [ImperaBookDSLParser.RULE_bookTitle]: { label: 'title', insertText: '' },
  [ImperaBookDSLParser.RULE_keywords]: { label: 'keywords', insertText: '' },
  [ImperaBookDSLParser.RULE_authorName]: { label: 'first and last name', insertText: '' },
  [ImperaBookDSLParser.RULE_authorParam]: { label: 'by author', insertText: 'by author ' },
  [ImperaBookDSLParser.RULE_subtitleParam]: { label: 'subtitled', insertText: 'subtitled ' },
  [ImperaBookDSLParser.RULE_languageParam]: { label: 'in language', insertText: 'in language ' },
  [ImperaBookDSLParser.RULE_publicationYearParam]: { label: 'published in', insertText: 'published in ' },
  [ImperaBookDSLParser.RULE_isbnParam]: { label: 'with isbn', insertText: 'with isbn ' },
  [ImperaBookDSLParser.RULE_summaryParam]: { label: 'with summary', insertText: 'with summary ' },
};

/**
 * Preferred rules must not be nested inside each other: when the caret sits in
 * several of them, c3 reports only the outermost one and stops descending.
 * addBookCmd contains bookTitle/authorParam, so the two levels are collected
 * in separate passes.
 */
const COMMAND_RULES = [
  ImperaBookDSLParser.RULE_addBookCmd,
  ImperaBookDSLParser.RULE_updateBookCmd,
  ImperaBookDSLParser.RULE_removeBookCmd,
  ImperaBookDSLParser.RULE_listBooksCmd,
  ImperaBookDSLParser.RULE_addAuthorCmd,
  ImperaBookDSLParser.RULE_updateAuthorCmd,
  ImperaBookDSLParser.RULE_removeAuthorCmd,
  ImperaBookDSLParser.RULE_listAuthorsCmd,
  ImperaBookDSLParser.RULE_dashboardCmd,
  ImperaBookDSLParser.RULE_libraryCmd,
  ImperaBookDSLParser.RULE_settingsCmd,
  ImperaBookDSLParser.RULE_aboutCmd,
  ImperaBookDSLParser.RULE_helpCmd,
  ImperaBookDSLParser.RULE_accountCmd,
  ImperaBookDSLParser.RULE_loginCmd,
  ImperaBookDSLParser.RULE_logoutCmd,
  ImperaBookDSLParser.RULE_findCmd,
];

/**
 * bookDetailParam is left out on purpose: it only groups the optional detail
 * params, and preferring it would hide the individual phrases inside it.
 */
const PARAM_RULES = [
  ImperaBookDSLParser.RULE_keywords,
  ImperaBookDSLParser.RULE_bookTitle,
  ImperaBookDSLParser.RULE_authorName,
  ImperaBookDSLParser.RULE_authorParam,
  ImperaBookDSLParser.RULE_subtitleParam,
  ImperaBookDSLParser.RULE_languageParam,
  ImperaBookDSLParser.RULE_publicationYearParam,
  ImperaBookDSLParser.RULE_isbnParam,
  ImperaBookDSLParser.RULE_summaryParam,
];

// Free text and line breaks are typed, not suggested.
const IGNORED_TOKENS = [
  ImperaBookDSLParser.VALUE,
  ImperaBookDSLParser.NL,
  ImperaBookDSLParser.EOF,
  ImperaBookDSLParser.WS,
];

/**
 * Suggestions at the caret. At the end of a line that holds a value, nothing
 * but a line break can follow there, so the suggestions are the next line's
 * instead — each inserting the line break too: "add book Dune" + Tab gives
 * "add book Dune" / "by author ".
 */
export function getDSLCompletions(input: string, caretOffset: number): CompletionItem[] {
  const here = withoutUsedParams(completionsAt(input, caretOffset), input, caretOffset);
  if (here.length > 0 || !atLineEnd(input, caretOffset)) return here;

  return nextLineCompletions(input, caretOffset);
}

/**
 * Whether the text is a valid command that could take another parameter line.
 * Valid first: after a line break the grammar would also accept the start of
 * any command, so "xyz" would otherwise look like it could continue — and a
 * command still missing a value ("add book", "by author") should get that
 * value, not a new line.
 */
export function canContinueOnNewLine(text: string): boolean {
  if (!isValid(text)) return false;

  const next = `${text}\n`;
  return withoutUsedParams(completionsAt(next, next.length), next, next.length).length > 0;
}

/**
 * The grammar lets a detail line repeat, but a book has one author line, one
 * ISBN and so on — a second would be ignored. So a parameter already on
 * another line of the command is not offered again. The caret's own line does
 * not count: that is where a parameter is being typed or completed.
 */
function withoutUsedParams(items: CompletionItem[], input: string, caretOffset: number): CompletionItem[] {
  const used = usedParams(input, lineOf(input, caretOffset));
  return used.size === 0 ? items : items.filter(item => !used.has(item.label));
}

/** Each parameter phrase's label, by the tokens that open its line. */
const PARAM_OPENERS: ReadonlyArray<readonly [label: string, first: number, second?: number]> = [
  ['by author', ImperaBookDSLLexer.BY, ImperaBookDSLLexer.AUTHOR],
  ['subtitled', ImperaBookDSLLexer.SUBTITLED],
  ['in language', ImperaBookDSLLexer.IN, ImperaBookDSLLexer.LANGUAGE],
  ['published in', ImperaBookDSLLexer.PUBLISHED, ImperaBookDSLLexer.IN],
  ['with isbn', ImperaBookDSLLexer.WITH, ImperaBookDSLLexer.ISBN],
  ['with summary', ImperaBookDSLLexer.WITH, ImperaBookDSLLexer.SUMMARY],
];

/** Labels of the parameters opening lines other than exceptLine (1-based). */
function usedParams(input: string, exceptLine: number): Set<string> {
  const lexer = new ImperaBookDSLLexer(CharStream.fromString(input));
  lexer.removeErrorListeners();

  const firstTwoByLine = new Map<number, number[]>();
  for (const token of lexer.getAllTokens()) {
    if (token.type === ImperaBookDSLLexer.NL || token.line === exceptLine) continue;
    const types = firstTwoByLine.get(token.line) ?? [];
    if (types.length < 2) firstTwoByLine.set(token.line, [...types, token.type]);
  }

  const used = new Set<string>();
  for (const [first, second] of firstTwoByLine.values()) {
    const opener = PARAM_OPENERS.find(([, a, b]) => a === first && (b === undefined || b === second));
    if (opener !== undefined) used.add(opener[0]);
  }
  return used;
}

function lineOf(input: string, offset: number): number {
  let line = 1;
  for (let i = 0; i < offset; i++) if (input[i] === '\n') line++;
  return line;
}

function nextLineCompletions(input: string, caretOffset: number): CompletionItem[] {
  if (input.slice(0, caretOffset).trim() === '' || !isValid(input)) return [];

  // Blanks left at the end of the value line go with the line break.
  let lineEnd = caretOffset;
  while (lineEnd > 0 && /[ \t]/.test(input[lineEnd - 1])) lineEnd--;

  // Asked from the new line itself, so the line the caret ends counts as used.
  const shifted = `${input.slice(0, caretOffset)}\n${input.slice(caretOffset)}`;
  const next = withoutUsedParams(completionsAt(shifted, caretOffset + 1), shifted, caretOffset + 1);
  return next.map(item => ({
    ...item,
    insertText: `\n${item.insertText}`,
    replaceStart: lineEnd,
    replaceEnd: item.replaceEnd - 1,
    caret: item.caret + 1,
  }));
}

function atLineEnd(input: string, caretOffset: number): boolean {
  return caretOffset === input.length || input[caretOffset] === '\n' || input[caretOffset] === '\r';
}

function isValid(text: string): boolean {
  return checkCommand(text).valid;
}

function completionsAt(input: string, caretOffset: number): CompletionItem[] {
  // 1. Setup Lexer and Token Stream
  const charStream = CharStream.fromString(input);
  const lexer = new ImperaBookDSLLexer(charStream);
  lexer.removeErrorListeners(); // Suppress errors for incomplete input

  const tokenStream = new CommonTokenStream(lexer);
  tokenStream.fill();

  // 2. Setup Parser
  const parser = new ImperaBookDSLParser(tokenStream);
  parser.removeErrorListeners();
  parser.errorHandler = new DefaultErrorStrategy(); // Allows building partial tree on errors

  // Run parser to populate ATN state up to cursor
  parser.entry();

  // 3. Find token index at the caret position
  const caretTokenIndex = findTokenIndexAtCaret(tokenStream, caretOffset);

  // Start of a half-typed word the lexer could not turn into a token ("wit").
  // Equals caretOffset when there is no such word.
  const partialStart = findPartialWordStart(input, tokenStream, caretOffset);

  const suggestions: CompletionItem[] = [];
  collectSuggestions(input, caretOffset, parser, tokenStream, caretTokenIndex, partialStart, suggestions);

  // A keyword the caret touches may itself be the prefix of a longer phrase
  // ("list book" → "list books"), so it is also completed as a half-typed word.
  const touchedIndex = findKeywordTokenEndingAtCaret(tokenStream, caretOffset);
  if (touchedIndex !== undefined) {
    const touchedStart = tokenStream.get(touchedIndex).start;
    collectSuggestions(input, caretOffset, parser, tokenStream, touchedIndex, touchedStart, suggestions);
  }

  return suggestions;
}

/**
 * Collects the phrase suggestions valid at caretTokenIndex into suggestions,
 * skipping labels already present.
 */
function collectSuggestions(
  input: string,
  caretOffset: number,
  parser: ImperaBookDSLParser,
  tokenStream: CommonTokenStream,
  caretTokenIndex: number,
  partialStart: number,
  suggestions: CompletionItem[]
): void {
  // 4. Two independent passes over the ATN graph
  const passes = [
    collectFor(parser, caretTokenIndex, COMMAND_RULES),
    collectFor(parser, caretTokenIndex, PARAM_RULES),
  ];

  // 5. Turn candidate rules into phrase suggestions
  const tokens = tokenStream.getTokens();

  for (const candidates of passes) {
    for (const [ruleIndex, rule] of candidates.rules) {
      const phrase = RULE_PHRASES[ruleIndex];
      if (!phrase || suggestions.some(s => s.label === phrase.label)) {
        continue;
      }

      // Where the phrase begins in the text: either at the token the rule
      // starts with, or at the half-typed word in front of the caret.
      const startToken = tokens[rule.startTokenIndex];
      const tokenStart = startToken && startToken.type !== Token.EOF
        ? startToken.start
        : caretOffset;
      const replaceStart = Math.min(tokenStart, partialStart);

      // What the user has already typed of this phrase.
      const typed = normalize(input.slice(replaceStart, caretOffset));

      // Drop the phrase if it is already complete, or if what is typed is not
      // a prefix of it.
      if (typed === phrase.label || !phrase.label.startsWith(typed)) {
        continue;
      }

      // Keep words apart when inserting directly after a finished token.
      const needsSpace = replaceStart === caretOffset
        && caretOffset > 0
        && !/\s/.test(input[caretOffset - 1]);

      const text = needsSpace ? ` ${phrase.insertText}` : phrase.insertText;
      const marker = text.indexOf(CARET_MARKER);
      const insertText = marker === -1 ? text : text.replace(CARET_MARKER, '');

      suggestions.push({
        label: phrase.label,
        insertText,
        replaceStart,
        replaceEnd: findReplaceEnd(input, caretOffset, replaceStart < caretOffset, insertText),
        caret: marker === -1 ? insertText.length : marker,
      });
    }
  }
}

/**
 * End of the text a completion replaces. When the caret sits inside the word
 * being completed ("boo|ks"), the rest of that word goes too; a following space
 * is absorbed when the inserted text brings its own.
 */
function findReplaceEnd(
  input: string,
  caretOffset: number,
  completesTypedWord: boolean,
  insertText: string
): number {
  let end = caretOffset;
  if (completesTypedWord) {
    while (end < input.length && !/\s/.test(input[end])) end++;
  }
  // Only a following blank is merged with the completion's own trailing space;
  // a line break is structure and must survive.
  if (insertText.endsWith(' ') && end < input.length && /[ \t]/.test(input[end])) end++;
  return end;
}

/**
 * Index of the keyword token that ends exactly at the caret, if any.
 * Strings and numbers are values, not phrase prefixes, so they don't count.
 */
function findKeywordTokenEndingAtCaret(
  tokenStream: CommonTokenStream,
  caretOffset: number
): number | undefined {
  const token = tokenStream.getTokens().find(t => t.type !== Token.EOF && t.stop === caretOffset - 1);

  if (token === undefined || IGNORED_TOKENS.includes(token.type)) {
    return undefined;
  }
  return token.tokenIndex;
}

/**
 * Runs one completion pass with the given set of preferred rules.
 */
function collectFor(
  parser: ImperaBookDSLParser,
  caretTokenIndex: number,
  preferredRules: number[]
): CandidatesCollection {
  const core = new CodeCompletionCore(parser);
  core.ignoredTokens = new Set(IGNORED_TOKENS);
  core.preferredRules = new Set(preferredRules);

  return core.collectCandidates(caretTokenIndex);
}

/**
 * Collapses whitespace and lowercases, so "add   Book" compares equal to the
 * phrase label "add book".
 */
function normalize(text: string): string {
  return text.trim().replace(/\s+/g, ' ').toLowerCase();
}

/**
 * Finds the offset of a non-whitespace run directly before the caret that is
 * not covered by any token — a word the lexer rejected, such as "wit".
 * Returns caretOffset when there is none.
 */
function findPartialWordStart(
  input: string,
  tokenStream: CommonTokenStream,
  caretOffset: number
): number {
  let consumedUpTo = 0;

  for (const token of tokenStream.getTokens()) {
    if (token.type === Token.EOF) {
      break;
    }
    if (token.stop < caretOffset) {
      consumedUpTo = token.stop + 1;
    }
  }

  const trailing = input.slice(consumedUpTo, caretOffset);
  const match = /\S+$/.exec(trailing);

  return match ? consumedUpTo + match.index : caretOffset;
}

/**
 * Finds token index corresponding to character offset in input.
 */
function findTokenIndexAtCaret(tokenStream: CommonTokenStream, caretOffset: number): number {
  const tokens = tokenStream.getTokens();

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    // If the token starts after the caret or spans past it, return this token index
    if (token.start >= caretOffset || token.type === Token.EOF) {
      return i;
    }
  }

  return tokens.length - 1;
}

/** The value on one line: its text and where it sits in the input. */
export interface ValueSpan {
  readonly start: number;
  readonly end: number;
  readonly text: string;
}

/**
 * The author name the caret is in, if any: the value of a "by author" line,
 * empty while nothing is typed after the phrase. Read from the lexer's tokens,
 * so a value that merely contains "by author" never counts.
 *
 * Only "by author" picks an existing author. "add author" names a new one, so
 * catalog names there would suggest the opposite of what the command does —
 * the server refuses a duplicate instead.
 */
export function authorValueAt(input: string, caretOffset: number): ValueSpan | undefined {
  const lineStart = input.lastIndexOf('\n', caretOffset - 1) + 1;
  const newline = input.indexOf('\n', caretOffset);
  const lineEnd = newline < 0 ? input.length : newline;

  const lexer = new ImperaBookDSLLexer(CharStream.fromString(input));
  lexer.removeErrorListeners();
  const tokens = lexer
    .getAllTokens()
    .filter(t => t.start >= lineStart && t.stop < lineEnd && t.type !== ImperaBookDSLLexer.NL);

  const [first, second, value] = tokens;
  const isAuthorPhrase =
    first?.type === ImperaBookDSLLexer.BY && second?.type === ImperaBookDSLLexer.AUTHOR;
  if (!isAuthorPhrase || caretOffset <= second.stop + 1) return undefined;

  if (value?.type !== ImperaBookDSLLexer.VALUE) {
    return { start: caretOffset, end: caretOffset, text: '' };
  }
  return { start: value.start, end: value.stop + 1, text: value.text ?? '' };
}
