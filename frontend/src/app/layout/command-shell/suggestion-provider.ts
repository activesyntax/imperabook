import { inject, Service } from "@angular/core";
import { CommandRegistry } from "@app/commands/command-registry";
import { TokenList, tokenListMatch, tokens } from "./tokenizer";
import { CommandSpec } from "@core/model";

export type SuggestionNode = {
  tokens: TokenList;
  children: SuggestionNode[];
}

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

    const suggestionRootNode = createSuggestionTree(this.registry.commands());

    console.log('Suggestion root node:', suggestionRootNode);

    let matches = suggestionRootNode.children
      .filter(c => tokenListMatch(queryTokens, c.tokens) !== 'none')
      .map(s => s.tokens.join(' '));

    console.log('MATCHES: ', matches);

    return matches;
  }
}

function createSuggestionTree(commands: readonly CommandSpec[]) {

  const commandSuggestions: SuggestionNode[] = commands
    .map(c => {
      const commandTokens = tokens(c.command);
      const parameterNodes = c.parameters.map(p => suggestionNode(tokens(p.connective), []));
      return suggestionNode(commandTokens, parameterNodes);
    });

  const suggestionRootNode = { tokens: [], children: commandSuggestions };
  return suggestionRootNode;
}
