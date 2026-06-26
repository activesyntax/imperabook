import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';

export interface CommandSpec {
  readonly command: string;
  readonly description: string;
  readonly group: 'book' | 'author' | 'query' | 'view' | 'nav' | 'shell';
}

// Swap for the real endpoint (e.g. '/commands') once the backend serves it.
const COMMANDS_URL = '/assets/commands.json';

@Injectable({ providedIn: 'root' })
export class CommandRegistry {
  private readonly resource = httpResource<CommandSpec[]>(() => COMMANDS_URL, {
    defaultValue: [],
  });

  readonly commands = this.resource.value;

  // Available for free if the UI ever wants a "registry failed to load" affordance:
  //   readonly loading = this.resource.isLoading;   // Signal<boolean>
  //   readonly error   = this.resource.error;       // Signal<unknown>
  //   reload(): void { this.resource.reload(); }
}
