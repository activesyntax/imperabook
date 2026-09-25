import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import type { CommandResult } from '@workspace/views/view-node';
import { CommandName, ParsedCommand } from '@app/layout/command-shell/command-visitor';
import { resultOfError, resultOfUnsupported } from '@app/commands/command-error';

type HttpMethod = 'GET' | 'POST';

interface CommandEndpoint {
  readonly method: HttpMethod;
  readonly url: string;
}

export interface Credentials {
  readonly username: string;
  readonly password: string;
}

const get = (url: string): CommandEndpoint => ({ method: 'GET', url });
const post = (url: string): CommandEndpoint => ({ method: 'POST', url });

/**
 * Which backend endpoint serves each command. A command missing here has no
 * endpoint yet ('add book' is deliberately left for later).
 */
const ENDPOINTS: Partial<Record<CommandName, CommandEndpoint>> = {
  'dashboard': get('/api/dashboard'),
  'library': get('/api/library'),
  'list books': get('/api/books'),
  'list authors': get('/api/authors'),
  'settings': get('/api/settings'),
  'about': get('/api/about'),
  'help': get('/api/help'),
  'login': get('/api/auth/login'),
  'logout': post('/api/auth/logout'),
};

@Injectable({ providedIn: 'root' })
export class CommandRunner {
  private readonly http = inject(HttpClient);

  async run(cmd: ParsedCommand): Promise<CommandResult> {
    const endpoint = ENDPOINTS[cmd.command];
    if (endpoint === undefined) {
      return resultOfUnsupported(cmd.command);
    }

    return this.send(endpoint.method, endpoint.url);
  }

  /** Not a parsed command: credentials never pass through the command bar. */
  login(credentials: Credentials): Promise<CommandResult> {
    return this.send('POST', '/api/auth/login', credentials);
  }

  private async send(method: HttpMethod, url: string, body?: unknown): Promise<CommandResult> {
    try {
      return await firstValueFrom(this.http.request<CommandResult>(method, url, { body }));
    } catch (error) {
      return resultOfError(error);
    }
  }
}
