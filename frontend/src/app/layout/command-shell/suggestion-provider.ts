import { inject, Service } from "@angular/core";
import { CommandRegistry } from "@app/commands/command-registry";
import { TokenList, tokenListMatch, tokens } from "./tokenizer";
import { CommandSpec } from "@core/model";
import Queue from 'yocto-queue';

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

    let commandMatches = suggestionRootNode.children
      .filter(c => tokenListMatch(queryTokens, c.tokens) !== 'none')

    console.log('COMMAND MATCHES: ', commandMatches);

    if (!oneMatch(commandMatches)) {
      return toString(commandMatches);
    }

    const commandMatch = commandMatches[0];
    console.log('COMMAND MATCH: ', commandMatch);
    console.log('TOKEN LIST MATCH: ', tokenListMatch(queryTokens, commandMatch.tokens));

    switch (tokenListMatch(queryTokens, commandMatch.tokens)) {
      case 'equals':
        return toString(commandMatches[0].children);

      case 'prefix':
      case 'partial':
        return toString(commandMatches);
    };

    return [];
  }
}

function toString(suggestionNodes: SuggestionNode[]): string[] {
  return suggestionNodes.map(s => s.tokens.join(' '));
}

function oneMatch(commandMatches: SuggestionNode[]) {
  return commandMatches.length == 1;
}

function equalsCommandMatch(queryTokens: TokenList, commandMatch: SuggestionNode): boolean {
  return tokenListMatch(queryTokens, commandMatch.tokens) === 'equals';
}

function hasParameters(commandMatches: SuggestionNode[]) {

  return commandMatches[0].children.length > 0
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
