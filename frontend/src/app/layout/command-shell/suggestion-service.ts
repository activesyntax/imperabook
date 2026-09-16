import { inject, Service } from "@angular/core";
import { CommandRegistry } from "@app/commands/command-registry";
import { getSuggestions } from "./suggestion-provider";
import { tokens } from "@core/tokenizer";
import { getDSLCompletions } from "./autocomplete";

@Service()
export class SuggestionService {

  private readonly registry = inject(CommandRegistry);

  public suggestionsFor(query: string, cursorPosition: number): readonly string[] {

    // const matches = getSuggestions(query, this.registry.commands());
    console.log('position:', cursorPosition);
    const matches = getDSLCompletions(query, cursorPosition);

    console.log('SUGGESTIONS', matches);
    return matches.map(m => m.insertText);
  }

  public replaceWordAtPosition(query: string, cursorPosition: number, replacement: string): string | 'not-found' {

    const replacementPosition = query.indexOf(tokens(replacement)[0]);

    const wordBoundaries = replacementPosition !== -1
      ? { start: replacementPosition, end: replacementPosition + replacement.length }
      : this.wordBoundariesAtPosition(query, cursorPosition);

    if (wordBoundaries === undefined) return 'not-found';

    const before = query.slice(0, wordBoundaries.start)
    const after = query.slice(wordBoundaries.end, query.length);

    return before + replacement + after;
  }

  private wordBoundariesAtPosition(query: string, cursorPosition: number): { start: number, end: number } | undefined {

    if (query.length === 0) return undefined;

    const isAttachedToTheWord =
      !isWhiteSpace(query[Math.max(cursorPosition - 1, 0)])
      || !isWhiteSpace(query[Math.min(cursorPosition + 1, query.length - 1)]);

    console.log('isAttachedToTheWord: ', isAttachedToTheWord);

    if (isAttachedToTheWord) {

      let wordStart = cursorPosition;
      while (wordStart > 0 && isWordChar(query[wordStart - 1])) wordStart--;

      let wordEnd = cursorPosition;
      while (wordEnd < query.length && isWordChar(query[wordEnd])) wordEnd++;

      console.log('START,END: ', wordStart, wordEnd);
      console.log('WORD BOUNDARY: ', query.substring(wordStart, wordEnd));
      return { start: wordStart, end: wordEnd };
    }

    return undefined;
  }
}

function isWhiteSpace(char: string): boolean {
  return char.trim().length === 0;
}

function isWordChar(char: string): boolean {
  return !isWhiteSpace(char);
}
