import { CharStream, CommonTokenStream, ParseTree } from 'antlr4ng';
// Adjust import paths to match your generated output folder
import { ImperaBookDSLLexer } from '@dsl/generated/ImperaBookDSLLexer';
import { EntryContext, ImperaBookDSLParser } from '@dsl/generated/ImperaBookDSLParser';

export function parseDSLCommand(input: string): ParseTree {
  // 1. Create the character stream from string input
  const charStream = CharStream.fromString(input);

  // 2. Instantiate the Lexer
  const lexer = new ImperaBookDSLLexer(charStream);

  // 3. Create the Token stream
  const tokenStream = new CommonTokenStream(lexer);

  // 4. Instantiate the Parser
  const parser = new ImperaBookDSLParser(tokenStream);

  // 5. Invoke the root rule (replace 'entry' with your grammar's starting rule name)
  const parseTree = parser.entry();

  console.log('Parse tree string:', parseTree.toStringTree(parser.ruleNames, parser));
  console.log('Parse tree:', parseTree);
  return parseTree;
}

// Example Execution
// parseDSLCommand('add book 1984\nby author George Orwell');
