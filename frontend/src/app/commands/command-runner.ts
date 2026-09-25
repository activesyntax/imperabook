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

    try {
      return await firstValueFrom(this.http.request<CommandResult>(endpoint.method, endpoint.url));
    } catch (error) {
      return resultOfError(error);
    }
  }
}
