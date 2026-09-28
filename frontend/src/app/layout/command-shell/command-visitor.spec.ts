import { parseDSLCommand } from './command-parser';
import { CommandVisitor, ParsedCommand } from './command-visitor';

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

  it('sends an empty title or detail, for the server to reject', () => {
    expect(parse('add book\nby author')).toEqual({ command: 'add book', params: { title: '', author: '' } });
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

  it('does not recognize input that starts with no command', () => {
    expect(parse('xyz')).toBeNull();
  });
});
