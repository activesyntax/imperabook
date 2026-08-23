import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { CommandSpec } from '@core/model';
import type { CommandResult, ViewNode } from '@workspace/views/view-node';

const COMMANDS_URL = '/api/commands';
const BOOTSTRAP_URL = '/api/auth/bootstrap';

interface BootstrapResponse {
  readonly command: CommandSpec;
  readonly views: readonly ViewNode[];
}

export interface SessionView {
  readonly displayName: string;
  readonly libraryName: string;
}

interface CommandCatalogResponse {
  readonly session: SessionView;
  readonly commands: readonly CommandSpec[];
}

@Injectable({ providedIn: 'root' })
export class CommandRegistry {
  private readonly http = inject(HttpClient);

  private readonly catalog = signal<readonly CommandSpec[]>([]);
  private readonly signedIn = signal(false);
  private readonly entryViews = signal<readonly ViewNode[]>([]);
  private readonly currentSession = signal<SessionView | null>(null);

  private pending: Promise<void> | null = null;

  readonly commands = this.catalog.asReadonly();
  readonly authenticated = this.signedIn.asReadonly();

  readonly session = this.currentSession.asReadonly();

  readonly startupViews = this.entryViews.asReadonly();

  async load(): Promise<void> {
    try {
      const catalog = await firstValueFrom(
        this.http.get<CommandCatalogResponse>(COMMANDS_URL),
      );

      this.catalog.set(catalog.commands);
      this.currentSession.set(catalog.session);
      this.entryViews.set([]);
      this.signedIn.set(true);
    } catch (error) {
      if (!(error instanceof HttpErrorResponse) || error.status !== 401) {
        throw error;
      }

      const bootstrap = await firstValueFrom(this.http.get<BootstrapResponse>(BOOTSTRAP_URL));

      this.catalog.set([bootstrap.command]);
      this.currentSession.set(null);
      this.entryViews.set(bootstrap.views);
      this.signedIn.set(false);
    }
  }

  ready(): Promise<void> {
    this.pending ??= this.load();
    return this.pending;
  }

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
