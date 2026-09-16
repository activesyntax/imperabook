import { AbstractParseTreeVisitor } from 'antlr4ng';
import { ImperaBookDSLVisitor } from '@dsl/generated/ImperaBookDSLVisitor';
import {
  AddBookCmdContext,
  CommandContext,
  EntryContext,
} from '@dsl/generated/ImperaBookDSLParser';

export interface ParsedCommand {
  command: string;
  params: Record<string, string>;
}

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
    const params: Record<string, string> = {};

    for (const paramCtx of ctx.bookParam()) {
      const authorCtx = paramCtx.authorParam();
      const titleCtx = paramCtx.titleParam();

      if (authorCtx) {
        params['author'] = this.cleanString(authorCtx.STRING().getText());
      } else if (titleCtx) {
        params['title'] = this.cleanString(titleCtx.STRING().getText());
      }
    }

    return {
      command: 'add book',
      params,
    };
  };

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
