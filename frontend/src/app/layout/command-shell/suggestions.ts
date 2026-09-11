import { CommandParameter, CommandSpec } from "@core/model";
import { TokenList, tokens, isTokenMatch } from "./tokenizer";

type CommandInput = { kind: 'command' }
type ParameterInput = { kind: 'parameter', command: CommandSpec, usedParameters: readonly CommandParameter[] }

type InputMode = CommandInput | ParameterInput;

function commandInput(): CommandInput {
  return {
    kind: 'command'
  };
}

function parameterInput(command: CommandSpec, fullParameters: readonly CommandParameter[] = []): ParameterInput {
  return {
    kind: 'parameter',
    command,
    usedParameters: fullParameters
  };
}

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

function getInputMode(queryTokens: TokenList, commands: readonly CommandSpec[]): InputMode {

  const fullCommand = tryGetFullCommand(queryTokens, commands);

  if (fullCommand !== undefined && fullCommand.parameters.length > 0) {

    const fullParameters = getFullParameters(queryTokens, fullCommand);
    console.log('Full parameters:', fullParameters);
    return parameterInput(fullCommand, fullParameters);
  }
  return commandInput();
}

function getFullParameters(queryTokens: TokenList, command: CommandSpec): readonly CommandParameter[] {

  const query = queryTokens.join(' ');
  const fullParameters = command.parameters.filter(p => {
    const connective = tokens(p.connective).join(' ');

    return query.includes(connective);
  });

  return fullParameters;
}

function tryGetFullCommand(queryTokens: TokenList, commands: readonly CommandSpec[]): CommandSpec | undefined {

  const fullCommand = commands.find(c => {
    const commandTokens = tokens(c.command);
    const relatedQueryTokens = queryTokens.slice(0, commandTokens.length);
    return commandTokens.every((token: string, i) => token === relatedQueryTokens[i]);
  });

  return fullCommand;
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

function reduceQuery(query: TokenList, parameterInput: ParameterInput): TokenList {

  const command = parameterInput.command;
  const usedParameters = parameterInput.usedParameters;

  const queryWithoutCommand = query.slice(tokens(command.command).length).join(' ');

  let queryWithoutParameters = usedParameters.reduce((acc, parameter) => acc.replaceAll(parameter.connective, ''), queryWithoutCommand);

  return tokens(queryWithoutParameters);
}

