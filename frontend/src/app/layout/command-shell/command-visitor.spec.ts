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

  describe('add author with a life range', () => {
    it('reads born, died and living, one per line', () => {
      expect(parse('add author Frank Herbert\n    born in 1920\n    died in 1986')?.params).toEqual({
        name: 'Frank Herbert', birthYear: '1920', vitality: 'deceased', deathYear: '1986',
      });
      expect(parse('add author Ursula K. Le Guin\n    born in 1929\n    living')?.params).toEqual({
        name: 'Ursula K. Le Guin', birthYear: '1929', vitality: 'living',
      });
    });

    it('reads "died" alone as dead, year unknown', () => {
      expect(parse('add author Homer\n    died')?.params).toEqual({ name: 'Homer', vitality: 'deceased' });
    });

    it('reads years before the common era as negative', () => {
      expect(parse('add author Plato\n    born in 428 BC\n    died in 348 bc')?.params).toEqual({
        name: 'Plato', birthYear: '-428', vitality: 'deceased', deathYear: '-348',
      });
    });

    it('takes BC on book years and filters too', () => {
      expect(parse('add book Iliad\n    published in 750 BC')?.params).toEqual({ title: 'Iliad', published: '-750' });
      expect(parse('list books published before 500 BC')?.params).toEqual({ publishedOp: 'before', published: '-500' });
    });

    it('needs a year after "in", and only digits with an optional BC', () => {
      for (const text of ['add author X\n    born in', 'add author X\n    born in BC', 'add author X\n    born in 12 AD',
        'add author X\n    died in']) {
        expect(checkCommand(text).valid).toBe(false);
      }
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

  });

  describe('list books whose language is', () => {
    it('reads a language, by name or code', () => {
      expect(parse('list books whose language is hungarian')?.params).toEqual({ languageOp: 'is', language: 'hungarian' });
      expect(parse('list books whose language is hu')?.params).toEqual({ languageOp: 'is', language: 'hu' });
    });

    it('reads "is not"', () => {
      expect(parse('list books whose language is not english')?.params).toEqual({ languageOp: 'not', language: 'english' });
    });

    it('takes a language of more than one word, accents and all', () => {
      expect(parse('list books whose language is norwegian bokmål')?.params)
        .toEqual({ languageOp: 'is', language: 'norwegian bokmål' });
    });

    it('combines with the page filter, each whose on its own line', () => {
      expect(parse('list books whose language is hu\n    whose page count is at least 100')?.params).toEqual({
        languageOp: 'is', language: 'hu', pagesOp: 'atLeast', pages: '100',
      });
    });

    it('needs a language', () => {
      for (const text of ['list books whose language', 'list books whose language is',
        'list books whose language is not', 'list books whose language is 42']) {
        expect(checkCommand(text).valid).toBe(false);
      }
    });
  });

  describe('list books having no', () => {
    const cases: [string, string][] = [
      ['author', 'author'],
      ['page count', 'pages'],
      ['publication year', 'published'],
      ['language', 'language'],
      ['isbn', 'isbn'],
      ['cover', 'cover'],
    ];

    for (const [property, name] of cases) {
      it(`reads "having no ${property}"`, () => {
        expect(parse(`list books having no ${property}`)?.params).toEqual({ missing: name });
      });
    }

    it('gathers every having-no line, each once, beside the other filters', () => {
      expect(parse('list books having no page count\n    written by x\n    having no cover\n    having no page count')?.params)
        .toEqual({ missing: 'pages,cover', author: 'x' });
    });

    it('reads the dashboard\'s findings as they are written', () => {
      for (const text of ['list books having no page count', 'list books having no isbn',
        'list books having no cover', 'list books having no publication year']) {
        expect(checkCommand(text).valid).toBe(true);
      }
    });

    it('needs a known property', () => {
      for (const text of ['list books having', 'list books having no', 'list books having no pages',
        'list books having no publisher']) {
        expect(checkCommand(text).valid).toBe(false);
      }
    });
  });

  describe('list authors with filters', () => {
    it('reads the filter on the command line', () => {
      expect(parse('list authors having no books')).toEqual({ command: 'list authors', params: { missing: 'books' } });
      expect(parse('list authors')).toEqual({ command: 'list authors', params: {} });
    });

    it('reads born, with the same comparisons as published', () => {
      expect(parse('list authors born before 1900')?.params).toEqual({ bornOp: 'before', born: '1900' });
      expect(parse('list authors born in 1920')?.params).toEqual({ bornOp: 'in', born: '1920' });
      expect(parse('list authors born after 1950')?.params).toEqual({ bornOp: 'after', born: '1950' });
      expect(parse('list authors born between 1900 and 1950')?.params)
        .toEqual({ bornOp: 'between', born: '1900', bornTo: '1950' });
      expect(parse('list authors born before 500 BC')?.params).toEqual({ bornOp: 'before', born: '-500' });
    });

    it('reads died, with the same comparisons', () => {
      expect(parse('list authors died before 1900')?.params).toEqual({ diedOp: 'before', died: '1900' });
      expect(parse('list authors died after 1950')?.params).toEqual({ diedOp: 'after', died: '1950' });
      expect(parse('list authors born after 1850\n    died between 1890 and 1910')?.params).toEqual({
        bornOp: 'after', born: '1850', diedOp: 'between', died: '1890', diedTo: '1910',
      });
      expect(checkCommand('list authors died').valid).toBe(false);
    });

    it('reads living, and every filter together, one per line', () => {
      expect(parse('list authors living')?.params).toEqual({ vitality: 'living' });
      expect(parse('list authors living\n    born before 1950\n    having no books')?.params).toEqual({
        vitality: 'living', bornOp: 'before', born: '1950', missing: 'books',
      });
    });

    it('takes only "born in" when adding an author', () => {
      expect(checkCommand('add author X\n    born before 1900').valid).toBe(false);
    });

    it('knows only books as what an author can lack', () => {
      for (const text of ['list authors having no', 'list authors having no cover', 'list books having no books']) {
        expect(checkCommand(text).valid).toBe(false);
      }
    });
  });

  describe('list books published', () => {
    const cases: [string, Record<string, string>][] = [
      ['in 1965', { publishedOp: 'in', published: '1965' }],
      ['before 1950', { publishedOp: 'before', published: '1950' }],
      ['after 1950', { publishedOp: 'after', published: '1950' }],
      ['between 1950 and 1960', { publishedOp: 'between', published: '1950', publishedTo: '1960' }],
    ];

    for (const [filter, params] of cases) {
      it(`reads "published ${filter}"`, () => {
        expect(parse(`list books published ${filter}`)).toEqual({ command: 'list books', params });
      });
    }

    it('combines with the other filters, one per line', () => {
      expect(parse('list books published before 1950\n    written by herbert\n    whose page count is 300')?.params).toEqual({
        publishedOp: 'before', published: '1950', author: 'herbert', pagesOp: 'equal', pages: '300',
      });
    });

    it('needs a year, and digits only', () => {
      for (const text of ['list books published', 'list books published before', 'list books published in 19x',
        'list books published between 1950', 'list books published between 1950 and']) {
        expect(checkCommand(text).valid).toBe(false);
      }
    });
  });

  it('takes a year after "published in" when adding a book, too', () => {
    expect(parse('add book Dune\n    published in 1965')?.params).toEqual({ title: 'Dune', published: '1965' });
    expect(checkCommand('add book Dune\n    published in nineteen').valid).toBe(false);
  });

  describe('list books written by', () => {
    it('takes the rest of the line as the author', () => {
      expect(parse('list books written by frank herbert')).toEqual({
        command: 'list books',
        params: { author: 'frank herbert' },
      });
    });

    it('takes one filter per line, in any order, the first on the command line or its own', () => {
      const params = { pagesOp: 'atLeast', pages: '120', author: 'herbert' };

      expect(parse('list books whose page count is at least 120\n    written by herbert')).toEqual({ command: 'list books', params });
      expect(parse('list books\n    written by herbert\n    whose page count is at least 120')).toEqual({ command: 'list books', params });
    });

    it('reads the rest of a written-by line as the name, whatever it says', () => {
      expect(parse('list books written by herbert whose page count is 3')?.params).toEqual({
        author: 'herbert whose page count is 3',
      });
    });

    it('keeps the first of a repeated filter', () => {
      expect(parse('list books written by a\n    written by b')?.params).toEqual({ author: 'a' });
    });

    it('needs a name', () => {
      expect(checkCommand('list books written by').valid).toBe(false);
      expect(checkCommand('list books\n    written by  ').valid).toBe(false);
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
