import {
  CharStream,
  CommonTokenStream,
  DefaultErrorStrategy,
  Token,
} from 'antlr4ng';
import { CodeCompletionCore } from 'antlr4-c3';
import { ImperaBookDSLLexer } from '@dsl/generated/ImperaBookDSLLexer';
import { ImperaBookDSLParser } from '@dsl/generated/ImperaBookDSLParser';

export interface CompletionItem {
  label: string;
  insertText: string;
}

export function getDSLCompletions(input: string, caretOffset: number): CompletionItem[] {
  const charStream = CharStream.fromString(input);
  const lexer = new ImperaBookDSLLexer(charStream);
  lexer.removeErrorListeners();

  const tokenStream = new CommonTokenStream(lexer);
  tokenStream.fill();

  const parser = new ImperaBookDSLParser(tokenStream);
  parser.removeErrorListeners();
  parser.errorHandler = new DefaultErrorStrategy();
  parser.entry();

  const core = new CodeCompletionCore(parser);
  core.ignoredTokens = new Set([
    ImperaBookDSLParser.STRING,
    ImperaBookDSLParser.WS,
  ]);

  const caretTokenIndex = findTokenIndexAtCaret(tokenStream, caretOffset);
  const initialCandidates = core.collectCandidates(caretTokenIndex);

  // Recursively unroll branching token paths starting from current input
  const phrases = expandTokenTree(input, initialCandidates.tokens.keys(), parser, 0, 3);

  return phrases.map((phrase) => ({
    label: phrase,
    insertText: `${phrase} `,
  }));
}

/**
 * Recursively explores candidate branches to form multi-token phrases.
 */
function expandTokenTree(
  baseInput: string,
  tokenTypes: Iterable<number>,
  parser: ImperaBookDSLParser,
  depth: number,
  maxDepth: number
): string[] {
  const results: string[] = [];

  for (const tokenType of tokenTypes) {
    if (tokenType === ImperaBookDSLParser.EOF || tokenType === ImperaBookDSLParser.STRING) {
      continue;
    }

    const literal = parser.vocabulary.getLiteralName(tokenType)?.replace(/'/g, '');
    if (!literal) continue;

    const speculativeInput = `${baseInput.trimEnd()} ${literal} `.trimStart();
    const nextCandidates = getSpeculativeCandidates(speculativeInput);

    const hasEof = nextCandidates.has(ImperaBookDSLParser.EOF);
    const validNextTokens = Array.from(nextCandidates).filter(
      (t) => t !== ImperaBookDSLParser.EOF && t !== ImperaBookDSLParser.STRING && t !== ImperaBookDSLParser.WS
    );

    // Stop branching if the phrase reaches a valid clause boundary (hasEof),
    // hits a parameter argument (no next tokens), or reaches max depth.
    if (hasEof || validNextTokens.length === 0 || depth >= maxDepth) {
      results.push(literal);
    } else {
      const subPhrases = expandTokenTree(speculativeInput, validNextTokens, parser, depth + 1, maxDepth);
      for (const sub of subPhrases) {
        results.push(`${literal} ${sub}`);
      }
    }
  }

  return results;
}

/**
 * Collects next candidate tokens for a speculative input string.
 * EOF is intentionally NOT ignored so we can detect complete clauses.
 */
function getSpeculativeCandidates(input: string): Set<number> {
  const charStream = CharStream.fromString(input);
  const lexer = new ImperaBookDSLLexer(charStream);
  lexer.removeErrorListeners();

  const tokenStream = new CommonTokenStream(lexer);
  tokenStream.fill();

  const parser = new ImperaBookDSLParser(tokenStream);
  parser.removeErrorListeners();
  parser.errorHandler = new DefaultErrorStrategy();
  parser.entry();

  const core = new CodeCompletionCore(parser);
  core.ignoredTokens = new Set([
    ImperaBookDSLParser.STRING,
    ImperaBookDSLParser.WS,
  ]);

  const caretIndex = findTokenIndexAtCaret(tokenStream, input.length);
  const candidates = core.collectCandidates(caretIndex);

  return new Set(candidates.tokens.keys());
}

function findTokenIndexAtCaret(tokenStream: CommonTokenStream, caretOffset: number): number {
  const tokens = tokenStream.getTokens();
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.start >= caretOffset || token.type === Token.EOF) {
      return i;
    }
  }
  return tokens.length - 1;
}
