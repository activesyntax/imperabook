import { inject, Service } from "@angular/core";
import { CommandRegistry } from "@app/commands/command-registry";
import { getSuggestions } from "./suggestions";


@Service()
export class SuggestionProvider {

  private readonly registry = inject(CommandRegistry);

  public suggestionsFor(query: string): readonly string[] {

    const matches = getSuggestions(query, this.registry.commands());

    return matches;
  }
}

