import { inject, Service } from "@angular/core";
import { CommandRegistry } from "@app/commands/command-registry";
import { TokenList, tokenListMatch, tokens } from "./tokenizer";

export type SuggestionNode = {
  tokens: TokenList;
  children: SuggestionNode[];
}

export type SuggestionTree = Omit<SuggestionNode, 'tokens'>

export function suggestionNode(tokens: TokenList, children: SuggestionNode[]): SuggestionNode {
  return { tokens, children };
}

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

    const commandSuggestions: SuggestionNode[] = this.registry.commands().map(c => (
      suggestionNode(tokens(c.command), [])));

    const suggestionTree: SuggestionTree = { children: commandSuggestions };

    let matches = suggestionTree.children
      .filter(c => tokenListMatch(queryTokens, c.tokens) !== 'none')
      .map(s => s.tokens.join(' '));

    console.log('MATCHES: ', matches);

    return matches;
  }
}
