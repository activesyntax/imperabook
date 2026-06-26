import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

export interface CommandSpec {
  readonly command: string;
  readonly description: string;
  readonly group: 'book' | 'author' | 'query' | 'view' | 'nav' | 'shell';
}

// Swap for the real endpoint (e.g. '/commands') once the backend serves it.
const COMMANDS_URL = '/assets/commands.json';

@Injectable({ providedIn: 'root' })
export class CommandRegistry {
  private readonly http = inject(HttpClient);

  readonly commands = toSignal(this.http.get<CommandSpec[]>(COMMANDS_URL), {
    initialValue: [] as CommandSpec[],
  });
}
