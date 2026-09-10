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
      return commands.map(c => c.command);
    case 'parameter':
      return [];

  }
}


function getInputMode(queryTokens: TokenList, commands: readonly CommandSpec[]): InputMode {

  const isCommandEntering = queryTokens.length <= Math.max(...commands.map(c => tokens(c.command).length));

  return isCommandEntering ? commandInput() : parameterInput();
}
