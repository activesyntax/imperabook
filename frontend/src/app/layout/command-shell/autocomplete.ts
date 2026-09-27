import {
  CharStream,
  CommonTokenStream,
  DefaultErrorStrategy,
  Token
} from 'antlr4ng';
import { CandidatesCollection, CodeCompletionCore } from 'antlr4-c3';
import { ImperaBookDSLLexer } from '@dsl/generated/ImperaBookDSLLexer';
import { ImperaBookDSLParser } from '@dsl/generated/ImperaBookDSLParser';

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
  [ImperaBookDSLParser.RULE_bookTitle]: { label: '"title"', insertText: '"$0"' },
  [ImperaBookDSLParser.RULE_authorName]: { label: '"first and last name"', insertText: '"$0"' },
  [ImperaBookDSLParser.RULE_authorParam]: { label: 'by author', insertText: 'by author "$0"' },
  [ImperaBookDSLParser.RULE_subtitleParam]: { label: 'subtitled', insertText: 'subtitled "$0"' },
  [ImperaBookDSLParser.RULE_languageParam]: { label: 'in language', insertText: 'in language "$0"' },
  [ImperaBookDSLParser.RULE_publicationYearParam]: { label: 'published in', insertText: 'published in ' },
  [ImperaBookDSLParser.RULE_isbnParam]: { label: 'with isbn', insertText: 'with isbn "$0"' },
  [ImperaBookDSLParser.RULE_summaryParam]: { label: 'with summary', insertText: 'with summary "$0"' },
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
];

/**
 * bookDetailParam is left out on purpose: it only groups the optional detail
 * params, and preferring it would hide the individual phrases inside it.
 */
const PARAM_RULES = [
  ImperaBookDSLParser.RULE_bookTitle,
  ImperaBookDSLParser.RULE_authorName,
  ImperaBookDSLParser.RULE_authorParam,
  ImperaBookDSLParser.RULE_subtitleParam,
  ImperaBookDSLParser.RULE_languageParam,
  ImperaBookDSLParser.RULE_publicationYearParam,
  ImperaBookDSLParser.RULE_isbnParam,
  ImperaBookDSLParser.RULE_summaryParam,
];

const IGNORED_TOKENS = [
  ImperaBookDSLParser.STRING,
  ImperaBookDSLParser.NUMBER,
  ImperaBookDSLParser.EOF,
  ImperaBookDSLParser.WS,
];

export function getDSLCompletions(input: string, caretOffset: number): CompletionItem[] {
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
    while (end < input.length && !/[\s"]/.test(input[end])) end++;
  }
  if (insertText.endsWith(' ') && end < input.length && /\s/.test(input[end])) end++;
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
