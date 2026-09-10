import { CommandParameter, CommandSpec } from "@core/model";
import { TokenList, tokens } from "./tokenizer";


type CommandInput = { kind: 'command' }
type ParameterInput = { kind: 'parameter', command: CommandSpec, fullParameters: readonly CommandParameter[] }

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
    fullParameters
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

  // const isCommandEntering = queryTokens.length <= Math.max(...commands.map(c => tokens(c.command).length));
  //
  // if (isCommandEntering) return commandInput();

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

      // console.log('Node tokens:', commandTokens);
      // console.log('Related query tokens:', relatedQueryTokens);
      //
      return isTokenMatch(commandTokens, relatedQueryTokens)
    })
    .map(c => c.command);
}


function getParameterSuggestions(queryTokens: TokenList, parameterInput: ParameterInput): string[] {

  const command = parameterInput.command;
  const fullParameters = parameterInput.fullParameters;

  const notUsedParameters = command.parameters.filter(p => !fullParameters.includes(p));

  console.log('NOT USED PARAMETERS:', notUsedParameters);

  const queryWithoutCommand = queryTokens.slice(tokens(command.command).length).join(' ');
  console.log('Query without command', queryWithoutCommand);

  let queryWithoutParameters = queryWithoutCommand;

  // TODO: use reduce
  fullParameters.forEach(p => {
    console.log('CONNECTIVE: ', p.connective);
    queryWithoutParameters = queryWithoutCommand.replace(p.connective, '');
  });

  console.log('Query without used parameters', queryWithoutCommand);

  // const relatedQuery = queryTokens.join(' ').replaceAll(, replaceValue)
  return command.parameters.filter(p => {
    const connectiveTokens = tokens(p.connective);

    return true;
  }).map(p => p.connective);
}

function isTokenMatch(sourceTokens: TokenList, queryTokens: TokenList): boolean {

  let consumendTokens = 0;
  const compareWindow = queryTokens.length;

  if (compareWindow === 0) return false;

  const maxCompareIndex = Math.max(0, sourceTokens.length - compareWindow);

  for (let i = 0; i <= maxCompareIndex; i++) {

    const nodeWindow = sourceTokens.slice(i, i + compareWindow);

    const isWindowMatch = nodeWindow.every((token, windowIndex) => token.includes(queryTokens[windowIndex]));

    if (isWindowMatch) {
      consumendTokens = compareWindow;
      return true;
    }
  }
  return false;
}
