import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import type { CommandResult } from '@workspace/views/view-node';
import { CommandName, ParsedCommand } from '@app/layout/command-shell/command-visitor';
import { resultOfError, resultOfUnsupported } from '@app/commands/command-error';
import { Session } from '@app/state/session';

type HttpMethod = 'GET' | 'POST' | 'DELETE';

type CommandParams = ParsedCommand['params'];

interface CommandEndpoint {
  readonly method: HttpMethod;
  readonly url: string;
  /** Builds the request body from the command's params; absent means no body. */
  readonly body?: (params: CommandParams) => unknown;
  /** Builds the query string from the command's params; absent means none. */
  readonly query?: (params: CommandParams) => Record<string, string>;
}

export interface Credentials {
  readonly username: string;
  readonly password: string;
}

const get = (url: string, query?: (params: CommandParams) => Record<string, string>): CommandEndpoint =>
  ({ method: 'GET', url, query });
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
  'find': get('/api/search', ({ keywords }) => ({ q: keywords ?? '' })),
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
  private readonly session = inject(Session);

  async run(cmd: ParsedCommand): Promise<CommandResult> {
    const endpoint = ENDPOINTS[cmd.command];
    if (endpoint === undefined) {
      return resultOfUnsupported(cmd.command);
    }

    const result = await this.send(
      endpoint.method,
      endpoint.url,
      endpoint.body?.(cmd.params),
      endpoint.query?.(cmd.params),
    );

    // Signing out changes who the chrome shows; ask rather than assume it worked.
    if (cmd.command === 'logout') await this.session.refresh();
    return result;
  }

  /**
   * Follows a link the server put on a view (an item's `open`). Only same-origin
   * API paths are followed: the link is data from a response, not a place to
   * send the session cookie anywhere else.
   */
  open(url: string): Promise<CommandResult> {
    return this.follow('GET', url);
  }

  /** Deletes what a link the server put on a view points at — the same guard as open. */
  remove(url: string): Promise<CommandResult> {
    return this.follow('DELETE', url);
  }

  private follow(method: HttpMethod, url: string): Promise<CommandResult> {
    if (!url.startsWith('/api/')) {
      return Promise.resolve(resultOfError(new Error(`Refusing to follow ${url}`)));
    }

    return this.send(method, url);
  }

  /** Not a parsed command: credentials never pass through the command bar. */
  async login(credentials: Credentials): Promise<CommandResult> {
    const result = await this.send('POST', '/api/auth/login', credentials);
    await this.session.refresh();
    return result;
  }

  private async send(
    method: HttpMethod,
    url: string,
    body?: unknown,
    params?: Record<string, string>,
  ): Promise<CommandResult> {
    try {
      return await firstValueFrom(this.http.request<CommandResult>(method, url, { body, params }));
    } catch (error) {
      // A 401 anywhere means there is no session (any more), whatever was shown.
      if (error instanceof HttpErrorResponse && error.status === 401) this.session.signedOut();
      return resultOfError(error);
    }
  }
}
