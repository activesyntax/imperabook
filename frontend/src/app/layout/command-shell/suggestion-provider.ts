import { inject, Service } from "@angular/core";
import { CommandRegistry } from "@app/commands/command-registry";
import { CommandSpec } from "@core/model";
import * as Tokenizer from "./tokenizer";

@Service()
export class SuggestionProvider {

  private readonly registry = inject(CommandRegistry);

  public suggestionsFor(query: string): readonly string[] {
    if (query.length === 0) {
      return this.registry.commands()
        .filter(c => c.group === 'dynamic')
        .map((c) => c.command);
    }

    const queryTokens = Tokenizer.tokens(query);
    console.log('Query tokens:', queryTokens);

    const firstCommand = this.registry.commands()[0];

    console.log('REGISTRY COMMANDS:', this.registry.commands());

    for (const command of this.registry.commands()) {
      const commandTokens = Tokenizer.commandTokens(command);
      console.log('Command tokens:', commandTokens);
    }


    return [];

  }

  private exactCommand(query: string, commands: readonly CommandSpec[]): CommandSpec | undefined {
    return commands.find((c) => query.startsWith(c.command));
  }


  private isRelatedCommand(query: string, command: CommandSpec): boolean {

    const queryParts = Tokenizer.tokens(query);
    const commandParts = Tokenizer.tokens(command.command);

    return queryParts.every(q => commandParts.some(c => c.startsWith(q)));
  }

}
