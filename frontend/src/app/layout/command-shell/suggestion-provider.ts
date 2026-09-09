import { inject, Service } from "@angular/core";
import { CommandRegistry } from "@app/commands/command-registry";
import { TokenList, tokenListMatch, tokens } from "./tokenizer";
import { CommandParameter, CommandSpec } from "@core/model";
import { createSuggestionTree, SuggestionNode } from "./suggestion-tree";


@Service()
export class SuggestionProvider {

  private readonly registry = inject(CommandRegistry);

  // todo: build suggestion tree once
  public suggestionsFor(query: string): readonly string[] {

    const queryTokens = tokens(query);
    console.log('Query tokens:', queryTokens);


    const suggestionTree = createSuggestionTree(this.registry.commands());

    console.log('Suggestion tree:', suggestionTree);

    const defaultCommands = this.registry.commands().filter(c => c.group === 'dynamic').map(c => c.command);

    const matches = getSuggestions(queryTokens, suggestionTree, defaultCommands);
    return matches;

    //
    // const matchingCommands = this.registry.commands()
    //   .filter(c => {
    //     const commandTokens = tokens(c.command);
    //
    //     return commandTokens.every((commandToken, i) => {
    //       const queryTokenIndex = i > queryTokens.length - 1 ? queryTokens.length - 1 : i;
    //       // const queryTokenIndex = Math.max(0, Math.min(i, queryTokens.length - 1));
    //       return commandToken.includes(queryTokens[queryTokenIndex])
    //     });
    //
    //   });
    //
    // let matches: string[] = this.getMatches(matchingCommands, queryTokens);

  }
}


function getSuggestions(queryTokens: TokenList, suggestionTree: SuggestionNode, defaultSuggestions: string[]): string[] {
  return defaultSuggestions;
}


// private getMatches(matchingCommands: CommandSpec[], queryTokens: TokenList): string[] {
//
//   const defaultCommands = this.registry.commands()
//     .filter(c => c.group === 'dynamic')
//
//   switch (matchingCommands.length) {
//     case 0:
//       return defaultCommands.map(c => c.command);
//     case 1: {
//
//       const commandTokens = tokens(matchingCommands[0].command);
//       const commandQueryTokens = queryTokens.slice(0, commandTokens.length);
//
//       if (tokenListMatch(commandQueryTokens, commandTokens) === 'equals') {
//         const parameterQueryTokens = queryTokens.slice(commandTokens.length);
//
//         return this.getParameterMatches(matchingCommands[0].parameters, parameterQueryTokens);
//       }
//       else {
//         return matchingCommands.map(c => c.command);
//       }
//     };
//
//     default: return matchingCommands.map(c => c.command);
//   }
// }
//
//   private getParameterMatches(parameters: readonly CommandParameter[], parameterQueryTokens: TokenList): string[] {
//   console.log('Parameter query tokens: ', parameterQueryTokens);
//
//   const parameterTokens = parameters.map(p => p.connective);
//
//   if (parameterQueryTokens.length === 0) {
//     return parameterTokens;
//   }
//
//   return parameterTokens.filter(p => {
//     return parameterQueryTokens.some(q => p.includes(q));
//   });
// }

