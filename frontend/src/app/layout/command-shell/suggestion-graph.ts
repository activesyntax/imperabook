import { CommandSpec, CommandParameter } from "@core/model";
import { TokenList, tokens } from "./tokenizer";

export type SuggestionNodeType = 'regular' | 'root' | 'list';

export type SuggestionTokenNode = {
  token: string;
  children: SuggestionTokenNode[];
  parent: SuggestionTokenNode | undefined;
  type: SuggestionNodeType;
  // visited: boolean;
}

export function suggestionTokenNode(token: string, parent: SuggestionTokenNode | undefined, type: SuggestionNodeType = 'regular'): SuggestionTokenNode {
  return { token, children: [], parent, type };
}

export function createSuggestionTokenTree(commands: readonly CommandSpec[]): SuggestionTokenNode {
  const rootNode = suggestionTokenNode('', undefined, 'root');

  commands.forEach(cmd => {

    const commandTokens = tokens(cmd.command).map((value: string, position: number) => ({ value, position }));

    commandTokens.reduce((currentNode, token) => {
      let commandTokenNode = currentNode.children.find(t => t.token === token.value);

      if (!commandTokenNode) {
        commandTokenNode = suggestionTokenNode(token.value, currentNode);
        currentNode.children.push(commandTokenNode);
      }

      if (token.position == commandTokens.length - 1) {
        addParameterNodes(cmd.parameters, commandTokenNode)
      }

      return commandTokenNode;
    }, rootNode);
  });

  return rootNode;
}

function addParameterNodes(parameters: readonly CommandParameter[], commandTokenNode: SuggestionTokenNode) {

  const listNode = suggestionTokenNode('', commandTokenNode, 'list');
  commandTokenNode.children.push(listNode);

  parameters.forEach(parameter => {

    const connectiveTokens = tokens(parameter.connective).map((value: string, position: number) => ({ value, position }));

    connectiveTokens.reduce((currentNode, token) => {

      let parameterTokenNode = currentNode.children.find(t => t.token === token.value);

      if (!parameterTokenNode) {
        parameterTokenNode = suggestionTokenNode(token.value, currentNode);
        currentNode.children.push(parameterTokenNode);
      }

      if (token.position == connectiveTokens.length - 1) {
        parameterTokenNode.children.push(listNode);
      }

      return parameterTokenNode;
    }, listNode);
  });

}
