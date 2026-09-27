import { getDSLCompletions } from './autocomplete';
import { applyCompletion } from './suggestion-service';

/** Accepts the completion labelled `label` with the caret at `|` in `query`. */
function accept(query: string, label: string): string {
  const caret = query.indexOf('|');
  const text = query.replace('|', '');
  const item = getDSLCompletions(text, caret).find(c => c.label === label);
  if (item === undefined) throw new Error(`no "${label}" completion for "${query}"`);

  const applied = applyCompletion(text, item);
  return applied.text.slice(0, applied.caret) + '|' + applied.text.slice(applied.caret);
}

describe('applyCompletion', () => {
  it('completes the half-typed word before the caret', () => {
    expect(accept('list boo|', 'list books')).toBe('list books |');
  });

  it('completes a command from its first letters', () => {
    expect(accept('das|', 'dashboard')).toBe('dashboard |');
  });

  it('replaces the rest of the word when the caret is mid-word', () => {
    expect(accept('list boo|xx', 'list books')).toBe('list books |');
  });

  it('does not double the space that already follows', () => {
    expect(accept('list boo| ', 'list books')).toBe('list books |');
  });

  it('puts the caret inside the quotes of a string param', () => {
    expect(accept('add book "x" wi|', 'with isbn')).toBe('add book "x" with isbn "|"');
  });

  it('edits at the caret, not at an earlier copy of the same word', () => {
    expect(accept('add book "with" wi|', 'with isbn'))
      .toBe('add book "with" with isbn "|"');
  });

  it('inserts after a finished word without gluing them together', () => {
    expect(accept('add book|', '"title"')).toBe('add book "|"');
  });

  it('keeps the text after the caret', () => {
    expect(accept('add book "x" su| by author "y"', 'subtitled'))
      .toBe('add book "x" subtitled "|" by author "y"');
  });
});
