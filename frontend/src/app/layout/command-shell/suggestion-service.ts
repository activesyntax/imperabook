import { Service } from "@angular/core";
import { CompletionItem, getDSLCompletions } from "./autocomplete";

export interface AppliedCompletion {
  readonly text: string;
  readonly caret: number;
}

@Service()
export class SuggestionService {

  public suggestionsFor(query: string, cursorPosition: number): readonly CompletionItem[] {
    return getDSLCompletions(query, cursorPosition);
  }
}

/** The query and caret position after accepting a completion. */
export function applyCompletion(query: string, item: CompletionItem): AppliedCompletion {
  return {
    text: query.slice(0, item.replaceStart) + item.insertText + query.slice(item.replaceEnd),
    caret: item.replaceStart + item.caret,
  };
}
