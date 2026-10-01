import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import type { CommandResult } from '@workspace/views/view-node';
import { CommandRunner, splitAuthorName } from './command-runner';

describe('splitAuthorName', () => {
  it('takes the last word as the last name', () => {
    expect(splitAuthorName('Ursula K. Le Guin')).toEqual({ firstName: 'Ursula K. Le', lastName: 'Guin' });
  });

  it('sends a single word as the last name only', () => {
    expect(splitAuthorName('  Homer ')).toEqual({ lastName: 'Homer' });
  });

  it('leaves an empty name for the server to reject', () => {
    expect(splitAuthorName('   ')).toEqual({ lastName: '' });
  });
});

describe('CommandRunner', () => {
  let runner: CommandRunner;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    runner = TestBed.inject(CommandRunner);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('posts add author with the name split into first and last', async () => {
    const added: CommandResult = { views: [{ type: 'message', text: 'Added author George Orwell.', kind: 'success' }] };

    const result = runner.run({ command: 'add author', params: { name: 'George Orwell' } });

    const req = http.expectOne('/api/authors');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ firstName: 'George', lastName: 'Orwell' });
    req.flush(added, { status: 201, statusText: 'Created' });

    expect(await result).toEqual(added);
  });

  it('shows the validation detail when add author is rejected', async () => {
    const result = runner.run({ command: 'add author', params: { name: '' } });

    http.expectOne('/api/authors').flush(
      { title: 'One or more validation errors occurred.', detail: 'Name is required.' },
      { status: 400, statusText: 'Bad Request' },
    );

    expect(await result).toEqual({ views: [{ type: 'message', text: 'Name is required.', kind: 'error' }] });
  });

  it('posts add book with the typed params, author as search text', async () => {
    const result = runner.run({ command: 'add book', params: { title: '1984', author: 'orwell', published: '1949' } });

    const req = http.expectOne('/api/books');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title: '1984', author: 'orwell', published: '1949' });
    req.flush({ views: [] }, { status: 201, statusText: 'Created' });

    await result;
  });

  it('shows the choices and keeps the query when the author is ambiguous', async () => {
    const views = [
      { type: 'message', text: '"smith" matches 2 authors.', kind: 'warning' },
      { type: 'textView', blocks: [] },
    ];

    const result = runner.run({ command: 'add book', params: { title: 'x', author: 'smith' } });

    http.expectOne('/api/books').flush(
      { title: 'Ambiguous author', code: 'author_ambiguous', keepQuery: true, views },
      { status: 409, statusText: 'Conflict' },
    );

    expect(await result).toEqual({ views, keepQuery: true });
  });

  it('opens an item by following its API link', async () => {
    const detail: CommandResult = { views: [] };

    const result = runner.open('/api/books/42');

    const req = http.expectOne('/api/books/42');
    expect(req.request.method).toBe('GET');
    req.flush(detail);

    expect(await result).toEqual(detail);
  });

  it('refuses to follow a link outside the API', async () => {
    const result = await runner.open('https://example.com/steal');

    http.expectNone(() => true);
    expect(result.views[0]).toMatchObject({ type: 'message', kind: 'error' });
  });

  it('removes by DELETE on the link the server gave, and shows the answer', async () => {
    const removed: CommandResult = { views: [] };

    const result = runner.remove('/api/books/42');

    const req = http.expectOne('/api/books/42');
    expect(req.request.method).toBe('DELETE');
    req.flush(removed);
    expect(await result).toEqual(removed);
  });

  it('refuses to remove through a link outside the API', async () => {
    const result = await runner.remove('https://example.com/x');

    http.expectNone(() => true);
    expect(result.views[0]).toMatchObject({ type: 'message', kind: 'error' });
  });
});
