import { BaseErrorListener, CharStream, CommonTokenStream, ParseTree } from 'antlr4ng';
import { ImperaBookDSLLexer } from '@dsl/generated/ImperaBookDSLLexer';
import { EntryContext, ImperaBookDSLParser } from '@dsl/generated/ImperaBookDSLParser';

/** A parse, and how many syntax errors it took to get there. */
export interface ParseResult {
  readonly tree: EntryContext;
  readonly errors: number;
}

/**
 * Parses a command, counting errors instead of printing them. Half-typed input
 * is parsed as the user types, so errors are expected and the console is no
 * place for them; callers that care read the count.
 *
 * The count matters because error recovery is generous: the lexer drops
 * characters it cannot read, so "dashboard xyz" still yields a dashboard
 * command. Only a parse with no errors is what the user actually typed.
 */
export function parseWithErrors(input: string): ParseResult {
  const errors = new CountingErrorListener();

  const lexer = new ImperaBookDSLLexer(CharStream.fromString(input));
  lexer.removeErrorListeners();
  lexer.addErrorListener(errors);

  const parser = new ImperaBookDSLParser(new CommonTokenStream(lexer));
  parser.removeErrorListeners();
  parser.addErrorListener(errors);

  const tree = parser.entry();
  return { tree, errors: errors.count };
}

export function parseDSLCommand(input: string): ParseTree {
  return parseWithErrors(input).tree;
}

class CountingErrorListener extends BaseErrorListener {
  count = 0;

  override syntaxError(): void {
    this.count++;
  }
}

// Example Execution
// parseDSLCommand('add book 1984\nby author George Orwell');
