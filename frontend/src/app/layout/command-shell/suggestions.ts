import { CommandSpec } from "@core/model";
import { TokenList, tokens } from "./tokenizer";


type CommandInput = { kind: 'command' }
type ParameterInput = { kind: 'parameter' }

type InputMode = CommandInput | ParameterInput;

function commandInput(): CommandInput {
  return {
    kind: 'command'
  };
}

function parameterInput(): ParameterInput {
  return {
    kind: 'parameter',
  };
}

export function getSuggestions(query: string, commands: readonly CommandSpec[]): readonly string[] {

  const queryTokens = tokens(query);

  const inputMode = getInputMode(queryTokens, commands);

  switch (inputMode.kind) {
    case 'command':
      return getCommandSuggestions(queryTokens, commands);
    case 'parameter':
      return [];

  }
}


function getInputMode(queryTokens: TokenList, commands: readonly CommandSpec[]): InputMode {

  const isCommandEntering = queryTokens.length <= Math.max(...commands.map(c => tokens(c.command).length));

  return isCommandEntering ? commandInput() : parameterInput();
}

function getCommandSuggestions(queryTokens: TokenList, commands: readonly CommandSpec[]): string[] {

  if (queryTokens.length === 0) {
    return commands.filter(c => c.group === 'dynamic').map(c => c.command);
  }

  return commands
    .filter(c => {

      const commandTokens = tokens(c.command);
      const relatedQueryTokens = queryTokens.slice(0, commandTokens.length);

      console.log('Node tokens:', commandTokens);
      console.log('Related query tokens:', relatedQueryTokens);

      return isTokenMatch(commandTokens, queryTokens)
    })
    .map(c => c.command);
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
