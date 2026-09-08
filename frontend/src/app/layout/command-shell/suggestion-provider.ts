import { inject, Service } from "@angular/core";
import { CommandRegistry } from "@app/commands/command-registry";
import { TokenList, tokenListMatch, TokenMatch, tokens } from "./tokenizer";
import { CommandSpec } from "@core/model";
import Queue from 'yocto-queue';

export type SuggestionNode = {
  tokens: TokenList;
  children: SuggestionNode[];
}

export function suggestionNode(tokens: TokenList, children: SuggestionNode[]): SuggestionNode {
  return { tokens, children };
}

export type SuggestionTokenNode = {
  token: string;
  children: SuggestionTokenNode[];
  parent: SuggestionTokenNode | undefined;
  // visited: boolean;
}

export function suggestionTokenNode(token: string, parent: SuggestionTokenNode | undefined): SuggestionTokenNode {
  return { token, children: [], parent };
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

    // const suggestionRootNode = createSuggestionTree(this.registry.commands());
    const suggestionTokenTree = createSuggestionTokenTree(this.registry.commands());

    console.log('Suggestion tree:', suggestionTokenTree);

    // const queue = new Queue<SuggestionNode>();
    // queue.enqueue(suggestionRootNode);

    let node = suggestionTokenTree;
    const path: SuggestionNode[] = [];

    return toString([]);

    // function levelMatch(queryTokens: TokenList, levelTokens: TokenList, path: SuggestionNode[]): TokenMatch {
    //
    //   console.log('QUERY TOKENS: ', queryTokens);
    //   console.log('LEVEL TOKENS: ', levelTokens);
    //   console.log('PATH: ', path);
    //
    //   const pathTokens = path.flatMap(n => n.tokens);
    //   console.log('PATH TOKENS: ', pathTokens);
    //
    //   const relevantTokens = queryTokens.slice(pathTokens.length);
    //   console.log('RELEVANT TOKENS: ', relevantTokens);
    //
    //   const partialMatch = queryTokens.every(q => levelTokens.some(c => c.startsWith(q)));
    //
    //   if (partialMatch) {
    //     return 'partial';
    //   }
    //
    //   return 'none'
    // }
    //

    // while (queue.size > 0) {
    //   const node = queue.dequeue();
    //
    //   if (!node)
    //     continue;
    //
    //   if (node.tokens.forEach(t => t.includes(queryTokens[0]))) {
    //     matches.push(node);
    //   }
    //
    //   const children = node.children;
    //   children.forEach(child => queue.enqueue(child));
    // }

    // let commandMatches = suggestionRootNode.children
    //   .filter(c => tokenListMatch(queryTokens, c.tokens) !== 'none')
    //
    // console.log('COMMAND MATCHES: ', commandMatches);
    //
    // if (!oneMatch(commandMatches)) {
    //   return toString(commandMatches);
    // }
    //
    // const commandMatch = commandMatches[0];
    // console.log('COMMAND MATCH: ', commandMatch);
    // console.log('TOKEN LIST MATCH: ', tokenListMatch(queryTokens, commandMatch.tokens));
    //
    // switch (tokenListMatch(queryTokens, commandMatch.tokens)) {
    //   case 'equals':
    //     return toString(commandMatch.children);
    //
    //   case 'prefix':
    //   case 'partial':
    //     return toString(commandMatches);
    //
    //   case 'exact':
    //
    //     const filteredParametersMatch = commandMatch.children.map(c => tokenListMatch(queryTokens, c.tokens));
    //
    //     console.log('combined tokens', [...commandMatch.tokens, ...commandMatch.children[0].tokens])
    //     console.log('FILTERED PARAMETERS MATCH: ', filteredParametersMatch);
    //
    //     const filteredParameters = commandMatch.children.filter(parameter => tokenListMatch(queryTokens, [...commandMatch.tokens, ...parameter.tokens]) === 'partial')
    //     return commandMatch.children.length > 0
    //       ? toString(filteredParameters) : [];
    // };
    //
  }
}

function toString(suggestionNodes: SuggestionNode[]): string[] {
  return suggestionNodes.map(s => s.tokens.join(' '));
}

function oneMatch(commandMatches: SuggestionNode[]) {
  return commandMatches.length == 1;
}

function createSuggestionTree(commands: readonly CommandSpec[]) {

  const commandSuggestions: SuggestionNode[] = commands
    .map(c => {
      const commandTokens = tokens(c.command);
      const parameterNodes = c.parameters.map(p => suggestionNode(tokens(p.connective), []));
      return suggestionNode(commandTokens, parameterNodes);
    });

  const suggestionRootNode: SuggestionNode = { tokens: [], children: commandSuggestions };
  return suggestionRootNode;
}


function createSuggestionTokenTree(commands: readonly CommandSpec[]): SuggestionTokenNode {
  const rootNode = suggestionTokenNode('', undefined);

  commands.forEach(c => {
    tokens(c.command).reduce((currentNode, token) => {
      let existingTokenNode = currentNode.children.find(t => t.token === token);

      if (!existingTokenNode) {
        existingTokenNode = suggestionTokenNode(token, currentNode);
        currentNode.children.push(existingTokenNode);
      }

      return existingTokenNode;
    }, rootNode);
  });

  return rootNode;
}
