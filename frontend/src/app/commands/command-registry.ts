import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { CommandSpec } from "@core/model";

// Swap for the real endpoint (e.g. '/commands') once the backend serves it.
const COMMANDS_URL = '/assets/commands.json';

@Injectable({ providedIn: 'root' })
export class CommandRegistry {
  private readonly resource = httpResource<CommandSpec[]>(() => COMMANDS_URL, {
    defaultValue: [],
  });

  readonly commands = this.resource.value;

  //   readonly loading = this.resource.isLoading;   // Signal<boolean>
  //   readonly error   = this.resource.error;       // Signal<unknown>
  //   reload(): void { this.resource.reload(); }
}
