import { CommandSpec } from "@core/model";
import { TokenList, tokens, isTokenMatch } from "@core/tokenizer";
import { getInputMode, ParameterInput, reduceQuery } from "./query-analyzer";

export function getSuggestions(query: string, commands: readonly CommandSpec[]): readonly string[] {

  const queryTokens = tokens(query);

  const inputMode = getInputMode(queryTokens, commands);

  switch (inputMode.kind) {
    case 'command':
      return getCommandSuggestions(queryTokens, commands);
    case 'parameter':
      return getParameterSuggestions(queryTokens, inputMode);
  }
}

function getCommandSuggestions(queryTokens: TokenList, commands: readonly CommandSpec[]): string[] {

  if (queryTokens.length === 0) {
    return commands.filter(c => c.group === 'dynamic').map(c => c.command);
  }

  return commands
    .filter(c => {

      const commandTokens = tokens(c.command);
      const relatedQueryTokens = queryTokens.slice(0, commandTokens.length);

      return isTokenMatch(commandTokens, relatedQueryTokens)
    })
    .map(c => c.command);
}

function getParameterSuggestions(queryTokens: TokenList, parameterInput: ParameterInput): string[] {

  const command = parameterInput.command;
  const usedParameters = parameterInput.usedParameters;

  const notUsedParameters = command.parameters.filter(p => !usedParameters.includes(p));

  const reducedQueryTokens = reduceQuery(queryTokens, parameterInput);

  if (reducedQueryTokens.length === 0) {
    return notUsedParameters.map(p => p.connective);
  }

  return notUsedParameters.filter(p => {
    const connectiveTokens = tokens(p.connective);
    const relatedQueryTokens = reducedQueryTokens;

    return isTokenMatch(connectiveTokens, relatedQueryTokens);
  }).map(p => p.connective);
}
