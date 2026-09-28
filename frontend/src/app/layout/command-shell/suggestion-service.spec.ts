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

  it('completes a parameter phrase at the start of a line, ready for its value', () => {
    expect(accept('add book x\nwi|', 'with isbn')).toBe('add book x\nwith isbn |');
  });

  it('edits at the caret, not at an earlier copy of the same word', () => {
    expect(accept('add book with\nwi|', 'with isbn')).toBe('add book with\nwith isbn |');
  });

  it('offers no keywords inside a value', () => {
    const text = 'add book Gone wi';
    expect(getDSLCompletions(text, text.length)).toEqual([]);
  });

  it('keeps the text after the caret', () => {
    expect(accept('add book x\nsu|\nby author y', 'subtitled'))
      .toBe('add book x\nsubtitled |\nby author y');
  });
});
