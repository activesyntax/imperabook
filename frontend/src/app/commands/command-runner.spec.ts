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
});
