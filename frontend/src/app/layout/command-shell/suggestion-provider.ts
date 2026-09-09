import { inject, Service } from "@angular/core";
import { CommandRegistry } from "@app/commands/command-registry";
import { tokens } from "./tokenizer";
import { createSuggestionTokenTree, SuggestionTokenNode } from "./suggestion-graph";


@Service()
export class SuggestionProvider {

  private readonly registry = inject(CommandRegistry);

  // todo: build suggestion tree once
  public suggestionsFor(query: string): readonly string[] {

    if (query.length === 0) {
      return this.registry.commands()
        .filter(c => c.group === 'dynamic')
        .map((c) => c.command);
    }

    const queryTokens = tokens(query);
    console.log('Query tokens:', queryTokens);

    const suggestionTokenTree = createSuggestionTokenTree(this.registry.commands());

    console.log('Suggestion tree:', suggestionTokenTree);

    return toString([]);

  }
}

function toString(suggestionNodes: SuggestionTokenNode[]): string[] {
  return [];
  // return suggestionNodes.map(s => s.token.join(' '));
}
