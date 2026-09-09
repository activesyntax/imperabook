import { CommandParameter, CommandSpec } from "@core/model";
import { TokenList, tokens } from "./tokenizer";

export type SuggestionNode = {
  tokens: TokenList;
  children: SuggestionNode[];
}

export function suggestionNode(tokens: TokenList, children: SuggestionNode[]): SuggestionNode {
  return { tokens, children };
}

export function createSuggestionTree(commands: readonly CommandSpec[]): SuggestionNode {

  const rootNode = suggestionNode([], []);
  const commandNodes = commands.map(cmd => suggestionNode(tokens(cmd.command), parameterNodes(cmd.parameters)));

  rootNode.children = commandNodes;

  return rootNode;
}

function parameterNodes(parameters: readonly CommandParameter[]): SuggestionNode[] {

  return parameters.map(p => suggestionNode(tokens(p.connective), []));

}
