import { authorValueAt, getDSLCompletions } from './autocomplete';
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

  it('never completes a word inside a value as a keyword', () => {
    const text = 'add book Gone wi';
    const items = getDSLCompletions(text, text.length);

    // What is offered belongs on the next line; "wi" stays part of the title.
    expect(items.length).toBeGreaterThan(0);
    expect(items.every(i => i.insertText.startsWith('\n') && i.replaceStart === text.length)).toBe(true);
  });

  it('offers the next line from the end of a value, line break included', () => {
    expect(accept('add book Dune|', 'by author')).toBe('add book Dune\nby author |');
  });

  it('drops blanks left at the end of the value line', () => {
    expect(accept('add book Dune  |', 'with isbn')).toBe('add book Dune\nwith isbn |');
  });

  it('continues after the last line even when parameters are already there', () => {
    expect(accept('add book Dune\nby author Herbert|', 'published in'))
      .toBe('add book Dune\nby author Herbert\npublished in |');
  });

  it('offers nothing in the middle of a value', () => {
    expect(getDSLCompletions('add book Dune', 'add book Du'.length)).toEqual([]);
  });

  it('offers no next line when nothing more can follow, or the text is not a command', () => {
    expect(getDSLCompletions('add author Homer', 'add author Homer'.length)).toEqual([]);
    expect(getDSLCompletions('xyz', 3)).toEqual([]);
  });

  it('keeps the text after the caret', () => {
    expect(accept('add book x\nsu|\nby author y', 'subtitled'))
      .toBe('add book x\nsubtitled |\nby author y');
  });
});

describe('authorValueAt', () => {
  function at(query: string) {
    const caret = query.indexOf('|');
    return authorValueAt(query.replace('|', ''), caret);
  }

  it('finds the name on a "by author" line', () => {
    expect(at('add book Dune\nby author her|')).toEqual({ start: 24, end: 27, text: 'her' });
  });

  it('is nothing after "add author", which names a new author', () => {
    expect(at('add author Ursula K|')).toBeUndefined();
  });

  it('spans the whole name wherever the caret is in it', () => {
    expect(at('add book Dune\nby author Fr|ank')).toEqual({ start: 24, end: 29, text: 'Frank' });
  });

  it('is empty right after the phrase, before a name is typed', () => {
    expect(at('add book Dune\nby author |')).toEqual({ start: 24, end: 24, text: '' });
  });

  it('is nothing on other lines, in other values, or inside the phrase', () => {
    expect(at('add book Dune\nwith isbn 12|')).toBeUndefined();
    expect(at('add book by author her|')).toBeUndefined();
    expect(at('add book Dune\nby auth|or')).toBeUndefined();
    expect(at('add book Dune|\nby author Herbert')).toBeUndefined();
  });
});
