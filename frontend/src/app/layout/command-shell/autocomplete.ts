import {
  CharStream,
  CommonTokenStream,
  DefaultErrorStrategy,
  Token
} from 'antlr4ng';
import { CodeCompletionCore } from 'antlr4-c3';
import { ImperaBookDSLLexer } from '@dsl/generated/ImperaBookDSLLexer';
import { ImperaBookDSLParser } from '@dsl/generated/ImperaBookDSLParser';

export interface CompletionItem {
  label: string;
  insertText: string;
}

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

  // 3. Configure ANTLR Code Completion Core (c3)
  const core = new CodeCompletionCore(parser);

  // Ignore tokens that shouldn't appear in auto-complete dropdowns
  core.ignoredTokens = new Set([
    ImperaBookDSLParser.STRING,
    ImperaBookDSLParser.EOF,
    ImperaBookDSLParser.WS,
  ]);

  // Preferred rules allow suggesting multi-token structures
  core.preferredRules = new Set([
  ]);

  // 4. Find token index at the caret position
  const caretTokenIndex = findTokenIndexAtCaret(tokenStream, caretOffset);

  // 5. Collect candidate token IDs from ATN graph
  const candidates = core.collectCandidates(caretTokenIndex);
  const suggestions: CompletionItem[] = [];

  for (const [tokenType] of candidates.tokens) {
    const literalName = parser.vocabulary.getLiteralName(tokenType);
    if (literalName) {
      const cleanKeyword = literalName.replace(/'/g, '');
      suggestions.push({
        label: cleanKeyword,
        insertText: `${cleanKeyword} `,
      });
    }
  }

  return suggestions;
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
