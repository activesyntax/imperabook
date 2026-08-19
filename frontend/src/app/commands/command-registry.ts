import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { CommandSpec } from '@core/model';
import type { CommandResult, ViewNode } from '@workspace/views/view-node';

const COMMANDS_URL = '/api/commands';
const BOOTSTRAP_URL = '/api/auth/bootstrap';

/**
 * Amit egy session nélküli kliens kap: a `login` leírója és a hozzá tartozó nézet.
 * Mindkettő ugyanabból a szerveroldali definícióból származik, amit a vezérlőcsatorna
 * is használ — a kliens nem ismeri a `login`-t, csak megkapja.
 */
interface BootstrapResponse {
  readonly command: CommandSpec;
  readonly views: readonly ViewNode[];
}

@Injectable({ providedIn: 'root' })
export class CommandRegistry {
  private readonly http = inject(HttpClient);

  private readonly catalog = signal<readonly CommandSpec[]>([]);
  private readonly signedIn = signal(false);
  private readonly entryViews = signal<readonly ViewNode[]>([]);

  private pending: Promise<void> | null = null;

  readonly commands = this.catalog.asReadonly();
  readonly authenticated = this.signedIn.asReadonly();

  /**
   * A nyitókép: session nélkül a bootstrap nézete, egyébként üres. A workspace ezt
   * rendereli indításkor, ahelyett hogy maga döntené el, mit mutat egy anonim kliensnek.
   */
  readonly startupViews = this.entryViews.asReadonly();

  /**
   * A session állapota a szerver válaszából derül ki, nem feltételezésből. A jegyzék
   * lekérése az a kérdés, hogy „van-e sessionöm" — 200 az igen, 401 a nem. Fordítva
   * (előbb bootstrap, aztán ha kell jegyzék) egy visszatérő, érvényes sütivel érkező
   * felhasználó is login-képernyőt kapna, mielőtt bárki megkérdezné a szervert.
   */
  async load(): Promise<void> {
    try {
      const commands = await firstValueFrom(this.http.get<CommandSpec[]>(COMMANDS_URL));

      this.catalog.set(commands);
      this.entryViews.set([]);
      this.signedIn.set(true);
    } catch (error) {
      if (!(error instanceof HttpErrorResponse) || error.status !== 401) {
        throw error;
      }

      const bootstrap = await firstValueFrom(this.http.get<BootstrapResponse>(BOOTSTRAP_URL));

      this.catalog.set([bootstrap.command]);
      this.entryViews.set(bootstrap.views);
      this.signedIn.set(false);
    }
  }

  /** Egyszeri betöltés; több hívó ugyanarra a promise-ra vár. */
  ready(): Promise<void> {
    this.pending ??= this.load();
    return this.pending;
  }

  /** Bejelentkezés vagy kijelentkezés után a jegyzék újra lekérdezendő. */
  refresh(): Promise<void> {
    this.pending = this.load();
    return this.pending;
  }

  openedView(command: string): CommandResult | null {
    const views = this.entryViews();

    if (this.signedIn() || command !== this.catalog()[0]?.command || views.length === 0) {
      return null;
    }

    this.entryViews.set([]);

    return { views: [...views] };
  }
}
