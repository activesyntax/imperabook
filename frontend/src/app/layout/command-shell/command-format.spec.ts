import { formatAround, formatQuery } from './command-format';

describe('formatQuery', () => {
  it('leaves a single line alone', () => {
    expect(formatQuery('add book Dune')).toBe('add book Dune');
  });

  it('indents every parameter line by four, whatever it had', () => {
    expect(formatQuery('add book Dune\nby author A\n        in language en\n  with isbn 1'))
      .toBe('add book Dune\n    by author A\n    in language en\n    with isbn 1');
  });

  it('drops blank lines and blanks before the command', () => {
    expect(formatQuery('\n \n   add book Dune')).toBe('add book Dune');
  });

  it('turns Windows line breaks into plain ones', () => {
    expect(formatQuery('add book Dune\r\nby author A')).toBe('add book Dune\n    by author A');
  });

  it('leaves a value as typed, spaces inside it included', () => {
    expect(formatQuery('add book Gone  with   the Wind\nby author  M.  Mitchell'))
      .toBe('add book Gone  with   the Wind\n    by author  M.  Mitchell');
  });

  it('is stable: formatting twice changes nothing more', () => {
    const once = formatQuery('add book Dune\n by author A\n\n');
    expect(formatQuery(once)).toBe(once);
  });
});

describe('formatAround', () => {
  it('keeps the caret right after the new indentation', () => {
    expect(formatAround('add book Dune\n', 14)).toEqual({ text: 'add book Dune\n    ', caret: 18 });
  });

  it('keeps the caret on the same character when earlier lines change', () => {
    const text = 'add book Dune\nby author Fr|ank'.replace('|', '');
    const caret = 'add book Dune\nby author Fr'.length;

    const result = formatAround(text, caret);

    expect(result.text.slice(result.caret)).toBe('ank');
  });
});
