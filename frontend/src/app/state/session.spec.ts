import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Session } from './session';

describe('Session', () => {
  let session: Session;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    session = TestBed.inject(Session);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('starts signed out, showing nobody', () => {
    expect(session.signedIn()).toBe(false);
    expect(session.user()).toBeNull();
  });

  it('takes the signed-in user and library from the server', async () => {
    const done = session.refresh();
    http.expectOne('/api/auth/session').flush({ signedIn: true, userName: 'Ada Lovelace', libraryName: 'Analytical Shelf' });
    await done;

    expect(session.signedIn()).toBe(true);
    expect(session.user()).toEqual({ name: 'Ada Lovelace', library: 'Analytical Shelf' });
  });

  it('shows nobody once the server says nobody is signed in', async () => {
    const first = session.refresh();
    http.expectOne('/api/auth/session').flush({ signedIn: true, userName: 'Ada', libraryName: null });
    await first;

    const second = session.refresh();
    http.expectOne('/api/auth/session').flush({ signedIn: false, userName: null, libraryName: null });
    await second;

    expect(session.user()).toBeNull();
  });

  it('keeps what it shows when the server cannot be reached', async () => {
    const first = session.refresh();
    http.expectOne('/api/auth/session').flush({ signedIn: true, userName: 'Ada', libraryName: null });
    await first;

    const second = session.refresh();
    http.expectOne('/api/auth/session').error(new ProgressEvent('error'));
    await second;

    expect(session.user()?.name).toBe('Ada');
  });
});
