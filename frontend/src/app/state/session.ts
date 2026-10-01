import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

/** Who is signed in, as the chrome around the workspace shows it. */
export interface SessionUser {
  readonly name: string;
  readonly library: string | null;
}

interface SessionInfo {
  readonly signedIn: boolean;
  readonly userName: string | null;
  readonly libraryName: string | null;
}

/**
 * The signed-in user, from the server. Loaded at startup and refreshed when
 * signing in or out; any 401 means the session is gone (it can expire), which
 * needs no request to learn.
 */
@Injectable({ providedIn: 'root' })
export class Session {
  private readonly http = inject(HttpClient);
  private readonly _user = signal<SessionUser | null>(null);

  readonly user = this._user.asReadonly();
  readonly signedIn = computed(() => this._user() !== null);
  readonly avatarUrl = signal<string | null>(null);

  async refresh(): Promise<void> {
    try {
      const info = await firstValueFrom(this.http.get<SessionInfo>('/api/auth/session'));
      this._user.set(
        info.signedIn && info.userName !== null
          ? { name: info.userName, library: info.libraryName }
          : null,
      );
    } catch {
      // Server unreachable: nothing new is known, so what is shown stays.
    }
  }

  signedOut(): void {
    this._user.set(null);
  }
}
