import { CommandParameter, CommandSpec } from "@core/model";
import { TokenList, tokens } from "@core/tokenizer";

export type CommandInput = { kind: 'command' }
export type ParameterInput = { kind: 'parameter', command: CommandSpec, usedParameters: readonly CommandParameter[] }

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

export function getInputMode(queryTokens: TokenList, commands: readonly CommandSpec[]): InputMode {

  const fullCommand = tryGetUsedCommand(queryTokens, commands);

  if (fullCommand !== undefined && fullCommand.parameters.length > 0) {

    const fullParameters = getUsedParameters(queryTokens, fullCommand);
    return parameterInput(fullCommand, fullParameters);
  }
  return commandInput();
}

export function tryGetUsedCommand(queryTokens: TokenList, commands: readonly CommandSpec[]): CommandSpec | undefined {

  const usedCommand = commands.find(c => {
    const commandTokens = tokens(c.command);
    const relatedQueryTokens = queryTokens.slice(0, commandTokens.length);
    return commandTokens.every((token: string, i) => token === relatedQueryTokens[i]);
  });

  return usedCommand;
}

export function getUsedParameters(queryTokens: TokenList, command: CommandSpec): readonly CommandParameter[] {

  const query = queryTokens.join(' ');
  const usedParameters = command.parameters.filter(p => {
    const connective = tokens(p.connective).join(' ');

    return query.includes(connective);
  });

  return usedParameters;
}

export function reduceQuery(query: TokenList, parameterInput: ParameterInput): TokenList {

  const command = parameterInput.command;
  const usedParameters = parameterInput.usedParameters;

  const queryWithoutCommand = query.slice(tokens(command.command).length).join(' ');

  let queryWithoutParameters = usedParameters.reduce((acc, parameter) => acc.replaceAll(parameter.connective, ''), queryWithoutCommand);

  return tokens(queryWithoutParameters);
}
