import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, fromEvent, takeUntil } from 'rxjs';

export interface AuthorMatch {
  readonly id: string;
  readonly name: string;
}

/** Waited out before asking: each keystroke would otherwise be a request. */
export const AUTHOR_LOOKUP_DELAY_MS = 150;

/** Finds catalog authors by part of their name, for the command bar's suggestion chips. */
@Injectable({ providedIn: 'root' })
export class AuthorLookup {
  private readonly http = inject(HttpClient);

  /**
   * Authors whose name contains the term, after a short pause. Aborting — the
   * user typed on — cancels the pause or the request. Any failure is no
   * suggestions: they are a convenience, never an error worth showing.
   */
  async search(term: string, abort: AbortSignal): Promise<readonly AuthorMatch[]> {
    await pause(AUTHOR_LOOKUP_DELAY_MS, abort);

    try {
      return await firstValueFrom(
        this.http
          .get<AuthorMatch[]>('/api/authors/search', { params: { q: term } })
          .pipe(takeUntil(fromEvent(abort, 'abort'))),
      );
    } catch {
      return [];
    }
  }
}

function pause(ms: number, abort: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (abort.aborted) return reject(abort.reason);
    const timer = setTimeout(resolve, ms);
    abort.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(abort.reason);
    }, { once: true });
  });
}
