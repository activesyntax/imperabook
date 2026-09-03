import { inject, Service } from "@angular/core";
import { CommandRegistry } from "@app/commands/command-registry";
import { CommandSpec } from "@core/model";

@Service()
export class SuggestionProvider {

  private readonly registry = inject(CommandRegistry);

  public suggestionsFor(query: string): readonly string[] {
    if (query.length === 0) {
      return this.registry.commands()
        .filter(c => c.group === 'dynamic')
        .map((c) => c.command);
    }

    return this.registry.commands()
      .filter((c) => this.isRelatedCommand(query, c))
      .map((c) => c.command);
  }

  private isRelatedCommand(query: string, command: CommandSpec): boolean {

    const queryParts = this.tokens(query);
    const commandParts = this.tokens(command.command);

    return queryParts.every(q => commandParts.some(c => c.startsWith(q)));
  }

  private tokens(text: string): readonly string[] {

    return text.split(/\s+/)
      .map(p => p.trim().toLowerCase())
      .filter(p => p.length > 0);
  }
}
