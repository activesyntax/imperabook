import { inject, Service } from "@angular/core";
import { CommandRegistry } from "@app/commands/command-registry";
import { getSuggestions } from "./suggestion-provider";

@Service()
export class SuggestionService {

  private readonly registry = inject(CommandRegistry);

  public suggestionsFor(query: string): readonly string[] {

    const matches = getSuggestions(query, this.registry.commands());

    return matches;
  }
}
