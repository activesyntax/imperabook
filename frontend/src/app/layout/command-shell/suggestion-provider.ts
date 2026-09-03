import { Service } from "@angular/core";
import { CommandSpec } from "@core/model";

@Service()
export class SuggestionProvider {

  public suggestionsFor(query: string): readonly string[] {
    return ['help', 'dashboard', 'setings'];
  }
}
