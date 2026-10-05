import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, fromEvent, takeUntil } from 'rxjs';

/** A language some book in the catalog is in: its code and English name. */
export interface CatalogLanguage {
  readonly code: string;
  readonly name: string;
}

/** The languages the catalog holds, for the command bar's suggestion chips. */
@Injectable({ providedIn: 'root' })
export class LanguageLookup {
  private readonly http = inject(HttpClient);

  /** Any failure is no suggestions: they are a convenience, never an error worth showing. */
  async languages(abort: AbortSignal): Promise<readonly CatalogLanguage[]> {
    try {
      return await firstValueFrom(
        this.http
          .get<CatalogLanguage[]>('/api/books/languages')
          .pipe(takeUntil(fromEvent(abort, 'abort'))),
      );
    } catch {
      return [];
    }
  }
}
