import { parseDSLCommand } from './command-parser';
import { checkCommand, CommandVisitor, ParsedCommand } from './command-visitor';

function parse(text: string): ParsedCommand | null {
  return new CommandVisitor().visit(parseDSLCommand(text));
}

describe('CommandVisitor', () => {
  it('reads a command without parameters', () => {
    expect(parse('list books')).toEqual({ command: 'list books', params: {} });
  });

  it('takes the rest of the first line as the title, no quotes needed', () => {
    expect(parse('add book Sapiens')).toEqual({ command: 'add book', params: { title: 'Sapiens' } });
  });

  it('reads one detail per line, in any order', () => {
    const text = [
      'add book Sapiens',
      'with isbn 9780062316097',
      'by author Y.N. Harari',
      'published in 2011',
      'in language en',
      'subtitled A Brief History of Humankind',
      'with summary How we came to rule the world.',
    ].join('\n');

    expect(parse(text)).toEqual({
      command: 'add book',
      params: {
        title: 'Sapiens',
        isbn: '9780062316097',
        author: 'Y.N. Harari',
        published: '2011',
        language: 'en',
        subtitle: 'A Brief History of Humankind',
        summary: 'How we came to rule the world.',
      },
    });
  });

  it('never reads keywords inside a value', () => {
    const text = 'add book Gone with the Wind\nby author in language by author';

    expect(parse(text)).toEqual({
      command: 'add book',
      params: { title: 'Gone with the Wind', author: 'in language by author' },
    });
  });

  it('keeps quotes and other characters as typed', () => {
    expect(parse('add book "Quoted", really: 50% off!')).toEqual({
      command: 'add book',
      params: { title: '"Quoted", really: 50% off!' },
    });
  });

  it('trims blanks around values and ignores blank lines', () => {
    const text = '\n  add book   Dune   \n\n   by author   Frank Herbert  \n\n';

    expect(parse(text)).toEqual({ command: 'add book', params: { title: 'Dune', author: 'Frank Herbert' } });
  });

  it('accepts Windows line endings', () => {
    expect(parse('add book Dune\r\nby author Frank Herbert')).toEqual({
      command: 'add book',
      params: { title: 'Dune', author: 'Frank Herbert' },
    });
  });

  it('leaves out a detail that was not typed', () => {
    expect(parse('add book Beowulf')).toEqual({ command: 'add book', params: { title: 'Beowulf' } });
  });

  it('keeps the first of a repeated detail', () => {
    expect(parse('add book Dune\nby author Frank Herbert\nby author Someone Else')).toEqual({
      command: 'add book',
      params: { title: 'Dune', author: 'Frank Herbert' },
    });
  });

  it('takes the rest of the line as the author name', () => {
    expect(parse('add author Ursula K. Le Guin')).toEqual({
      command: 'add author',
      params: { name: 'Ursula K. Le Guin' },
    });
  });

  it('takes the rest of the line after find as its keywords', () => {
    expect(parse('find dune  herbert')).toEqual({ command: 'find', params: { keywords: 'dune herbert' } });
  });

  it('never reads keywords after find as other commands or phrases', () => {
    expect(parse('find by author with isbn')).toEqual({
      command: 'find',
      params: { keywords: 'by author with isbn' },
    });
  });

  describe('list books whose page count is', () => {
    const cases: [string, Record<string, string>][] = [
      ['more than 120', { pagesOp: 'over', pages: '120' }],
      ['greater than 120', { pagesOp: 'over', pages: '120' }],
      ['less than 120', { pagesOp: 'under', pages: '120' }],
      ['fewer than 120', { pagesOp: 'under', pages: '120' }],
      ['120', { pagesOp: 'equal', pages: '120' }],
      ['at least 120', { pagesOp: 'atLeast', pages: '120' }],
      ['at most 120', { pagesOp: 'atMost', pages: '120' }],
      ['not 120', { pagesOp: 'otherThan', pages: '120' }],
      ['between 100 and 200', { pagesOp: 'between', pages: '100', pagesTo: '200' }],
    ];

    for (const [comparison, params] of cases) {
      it(`reads "is ${comparison}"`, () => {
        expect(parse(`list books whose page count is ${comparison}`)).toEqual({ command: 'list books', params });
      });
    }

    it('lists every book without a filter', () => {
      expect(parse('list books')).toEqual({ command: 'list books', params: {} });
    });

    it('is not a command until the sentence is complete', () => {
      for (const text of ['list books whose', 'list books whose page count', 'list books whose page count is',
        'list books whose page count is more than', 'list books whose page count is more 300',
        'list books whose page count is between 100', 'list books whose page count is at least many']) {
        expect(checkCommand(text).valid).toBe(false);
      }
    });

    it('no longer takes the old "with pages" form', () => {
      expect(checkCommand('list books with pages over 120').valid).toBe(false);
    });

    it('takes the filter on the same line only', () => {
      expect(checkCommand('list books\n    whose page count is at least 120').valid).toBe(false);
    });
  });

  it('does not recognize input that starts with no command', () => {
    expect(parse('xyz')).toBeNull();
  });
});

describe('checkCommand', () => {
  it('accepts a command exactly as typed', () => {
    expect(checkCommand('list books').valid).toBe(true);
    expect(checkCommand('add book Dune\n    by author Frank Herbert').valid).toBe(true);
  });

  it('rejects a value that is written but missing', () => {
    expect(checkCommand('find').valid).toBe(false);
    expect(checkCommand('find   ').valid).toBe(false);
    expect(checkCommand('add book').valid).toBe(false);
    expect(checkCommand('add book   ').valid).toBe(false);
    expect(checkCommand('add author').valid).toBe(false);
    expect(checkCommand('add book Dune\n    by author').valid).toBe(false);
    expect(checkCommand('add book Dune\n    with isbn   \n    by author Frank Herbert').valid).toBe(false);
  });

  it('does not require the optional details at all', () => {
    expect(checkCommand('add book Dune').valid).toBe(true);
  });

  it('rejects what is not a command, or not yet one', () => {
    expect(checkCommand('xyz').valid).toBe(false);
    expect(checkCommand('add bo').valid).toBe(false);
    expect(checkCommand('').valid).toBe(false);
  });

  it('rejects text the parser only recovered from, though it found a command in it', () => {
    const check = checkCommand('dashboard xyz');

    expect(check.command).toEqual({ command: 'dashboard', params: {} });
    expect(check.valid).toBe(false);
  });
});
