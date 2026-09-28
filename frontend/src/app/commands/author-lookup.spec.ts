import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AUTHOR_LOOKUP_DELAY_MS, AuthorLookup } from './author-lookup';

describe('AuthorLookup', () => {
  let lookup: AuthorLookup;
  let http: HttpTestingController;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    lookup = TestBed.inject(AuthorLookup);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    vi.useRealTimers();
  });

  it('asks the server only after a pause in typing', async () => {
    const result = lookup.search('her', new AbortController().signal);

    http.expectNone(() => true);
    await vi.advanceTimersByTimeAsync(AUTHOR_LOOKUP_DELAY_MS);

    http.expectOne(r => r.url === '/api/authors/search' && r.params.get('q') === 'her')
      .flush([{ id: '1', name: 'Frank Herbert' }]);
    expect(await result).toEqual([{ id: '1', name: 'Frank Herbert' }]);
  });

  it('never asks when typing goes on before the pause ends', async () => {
    const abort = new AbortController();
    const result = lookup.search('he', abort.signal);

    abort.abort();
    await vi.advanceTimersByTimeAsync(AUTHOR_LOOKUP_DELAY_MS);

    http.expectNone(() => true);
    await expect(result).rejects.toBeDefined();
  });

  it('offers nothing when the lookup fails', async () => {
    const result = lookup.search('her', new AbortController().signal);
    await vi.advanceTimersByTimeAsync(AUTHOR_LOOKUP_DELAY_MS);

    http.expectOne(() => true).flush(null, { status: 401, statusText: 'Unauthorized' });

    expect(await result).toEqual([]);
  });
});
