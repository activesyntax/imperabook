import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import type { CommandResult } from '@workspace/views/view-node';
import { Session } from '@app/state/session';
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

/** Lets the promise chain after a flushed response reach its next request. */
const settle = () => new Promise(resolve => setTimeout(resolve));

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

  it('refreshes who is signed in after signing in', async () => {
    const result = runner.login({ username: 'john', password: 'x' });

    http.expectOne('/api/auth/login').flush({ views: [] });
    await settle();
    http.expectOne('/api/auth/session').flush({ signedIn: true, userName: 'John Smith', libraryName: 'Home' });
    await result;

    expect(TestBed.inject(Session).user()?.name).toBe('John Smith');
  });

  it('refreshes who is signed in after signing out', async () => {
    const result = runner.run({ command: 'logout', params: {} });

    http.expectOne('/api/auth/logout').flush({ views: [] });
    await settle();
    http.expectOne('/api/auth/session').flush({ signedIn: false, userName: null, libraryName: null });
    await result;

    expect(TestBed.inject(Session).signedIn()).toBe(false);
  });

  it('takes any 401 to mean the session is gone, without asking', async () => {
    const result = runner.run({ command: 'list books', params: {} });

    http.expectOne('/api/books').flush({ code: 'not_authenticated' }, { status: 401, statusText: 'Unauthorized' });
    await result;

    expect(TestBed.inject(Session).signedIn()).toBe(false);
  });

  it('finds by sending the keywords as the search query', async () => {
    const found: CommandResult = { views: [] };

    const result = runner.run({ command: 'find', params: { keywords: 'dune herbert' } });

    const req = http.expectOne(r => r.url === '/api/search');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('q')).toBe('dune herbert');
    req.flush(found);
    expect(await result).toEqual(found);
  });

  it('sends a page filter as the book list query', async () => {
    const result = runner.run({ command: 'list books', params: { pagesOp: 'between', pages: '100', pagesTo: '200' } });

    const req = http.expectOne(r => r.url === '/api/books');
    expect(req.request.params.get('pagesOp')).toBe('between');
    expect(req.request.params.get('pages')).toBe('100');
    expect(req.request.params.get('pagesTo')).toBe('200');
    req.flush({ views: [] });
    await result;
  });

  it('sends the author filter as the author list query', async () => {
    const result = runner.run({ command: 'list authors', params: { missing: 'books' } });

    const req = http.expectOne(r => r.url === '/api/authors');
    expect(req.request.params.get('missing')).toBe('books');
    req.flush({ views: [] });
    await result;
  });

  it('posts an author with their life range', async () => {
    const result = runner.run({
      command: 'add author',
      params: { name: 'Plato', birthYear: '-428', vitality: 'deceased', deathYear: '-348' },
    });

    const req = http.expectOne('/api/authors');
    expect(req.request.body).toEqual({ lastName: 'Plato', birthYear: '-428', deathYear: '-348', vitality: 'deceased' });
    req.flush({ views: [] }, { status: 201, statusText: 'Created' });
    await result;
  });
});
