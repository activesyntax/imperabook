import { CharStream, CommonTokenStream, ParseTree } from 'antlr4ng';
// Adjust import paths to match your generated output folder
import { ImperaBookDSLLexer } from '@dsl/generated/ImperaBookDSLLexer';
import { ImperaBookDSLParser } from '@dsl/generated/ImperaBookDSLParser';

export function parseDSLCommand(input: string): ParseTree {
  // 1. Create the character stream from string input
  const charStream = CharStream.fromString(input);

  // 2. Instantiate the Lexer. Its default listener prints every unmatched
  // character to the console; half-typed input is parsed as the user types, and
  // an unrecognized command is reported in the workspace, not the console.
  const lexer = new ImperaBookDSLLexer(charStream);
  lexer.removeErrorListeners();

  // 3. Create the Token stream
  const tokenStream = new CommonTokenStream(lexer);

  // 4. Instantiate the Parser (quiet for the same reason)
  const parser = new ImperaBookDSLParser(tokenStream);
  parser.removeErrorListeners();

  // 5. Invoke the root rule (replace 'entry' with your grammar's starting rule name)
  return parser.entry();
}

// Example Execution
// parseDSLCommand('add book 1984\nby author George Orwell');
