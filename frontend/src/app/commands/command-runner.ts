import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import type { CommandResult } from '@workspace/views/view-node';
import { CommandName, ParsedCommand } from '@app/layout/command-shell/command-visitor';
import { resultOfError, resultOfUnsupported } from '@app/commands/command-error';

type HttpMethod = 'GET' | 'POST';

type CommandParams = ParsedCommand['params'];

interface CommandEndpoint {
  readonly method: HttpMethod;
  readonly url: string;
  /** Builds the request body from the command's params; absent means no body. */
  readonly body?: (params: CommandParams) => unknown;
}

export interface Credentials {
  readonly username: string;
  readonly password: string;
}

const get = (url: string): CommandEndpoint => ({ method: 'GET', url });
const post = (url: string, body?: (params: CommandParams) => unknown): CommandEndpoint =>
  ({ method: 'POST', url, body });

export interface AuthorNameBody {
  readonly firstName?: string;
  readonly lastName: string;
}

/**
 * "Ursula K. Le Guin" → first "Ursula K. Le", last "Guin": the last word is the
 * last name, everything before it the first name. Compound last names split
 * wrongly; an empty name is sent as-is for the server to reject.
 */
export function splitAuthorName(name: string): AuthorNameBody {
  const words = name.trim().split(/\s+/).filter(w => w.length > 0);
  const lastName = words.pop() ?? '';

  return words.length > 0 ? { firstName: words.join(' '), lastName } : { lastName };
}

/** Which backend endpoint serves each command. A command missing here has no endpoint yet. */
const ENDPOINTS: Partial<Record<CommandName, CommandEndpoint>> = {
  'dashboard': get('/api/dashboard'),
  'library': get('/api/library'),
  'list books': get('/api/books'),
  // The params are already the request's fields; "author" is search text the server resolves.
  'add book': post('/api/books', params => params),
  'list authors': get('/api/authors'),
  'add author': post('/api/authors', ({ name }) => splitAuthorName(name ?? '')),
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

    return this.send(endpoint.method, endpoint.url, endpoint.body?.(cmd.params));
  }

  /**
   * Follows a link the server put on a view (an item's `open`). Only same-origin
   * API paths are followed: the link is data from a response, not a place to
   * send the session cookie anywhere else.
   */
  open(url: string): Promise<CommandResult> {
    if (!url.startsWith('/api/')) {
      return Promise.resolve(resultOfError(new Error(`Refusing to open ${url}`)));
    }

    return this.send('GET', url);
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
