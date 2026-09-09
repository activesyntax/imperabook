import { inject, Service } from "@angular/core";
import { CommandRegistry } from "@app/commands/command-registry";
import { TokenList, tokenListMatch, tokens } from "./tokenizer";
import { CommandParameter, CommandSpec } from "@core/model";


@Service()
export class SuggestionProvider {

  private readonly registry = inject(CommandRegistry);

  // todo: build suggestion tree once
  public suggestionsFor(query: string): readonly string[] {


    // if (query.length === 0) {
    //   return this.registry.commands()
    //     .filter(c => c.group === 'dynamic')
    //     .map((c) => c.command);
    // }
    //
    const queryTokens = tokens(query);
    console.log('Query tokens:', queryTokens);

    // const suggestionTokenGraph = createSuggestionTokenTree(this.registry.commands());

    // console.log('Suggestion graph', suggestionTokenGraph);

    const matchingCommands = this.registry.commands()
      .filter(c => {
        const commandTokens = tokens(c.command);

        // console.log('Command tokens: ', commandTokens);

        return commandTokens.every((commandToken, i) => {
          const queryTokenIndex = i > queryTokens.length - 1 ? queryTokens.length - 1 : i;

          console.log("Command token: ", commandToken);
          console.log('Query token index: ', queryTokenIndex);
          console.log('Command token index: ', i);
          console.log('Query token: ', queryTokens[queryTokenIndex]);
          return commandToken.includes(queryTokens[queryTokenIndex])
        });

      });

    let matches: string[] = this.getMatches(matchingCommands, queryTokens);
    return matches;

  }


  private getMatches(matchingCommands: CommandSpec[], queryTokens: TokenList): string[] {

    const defaultCommands = this.registry.commands()
      .filter(c => c.group === 'dynamic')

    switch (matchingCommands.length) {
      case 0:
        return defaultCommands.map(c => c.command);
      case 1: {

        const commandTokens = tokens(matchingCommands[0].command);
        const commandQueryTokens = queryTokens.slice(0, commandTokens.length);

        console.log('Command tokens: ', commandTokens);
        console.log('commnad tokens length: ', commandTokens.length);
        console.log('Command query tokens: ', commandQueryTokens);

        if (tokenListMatch(commandQueryTokens, commandTokens) === 'equals') {
          const parameterQueryTokens = queryTokens.slice(commandTokens.length);

          return this.getParameterMatches(matchingCommands[0].parameters, parameterQueryTokens);
        }
        else {
          return matchingCommands.map(c => c.command);
        }
      };

      default: return matchingCommands.map(c => c.command);
    }
  }

  private getParameterMatches(parameters: readonly CommandParameter[], parameterQueryTokens: TokenList): string[] {
    console.log('Parameter query tokens: ', parameterQueryTokens);
    return parameters.map(p => p.connective)
  }

}

// function toString(suggestionNodes: SuggestionTokenNode[]): string[] {
//   return [];
// return suggestionNodes.map(s => s.token.join(' '));
// }
