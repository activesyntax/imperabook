import { inject, Injectable } from '@angular/core';
import type { ViewNode } from '../layout/workspace/views/view-node';
import { httpResource } from '@angular/common/http';
import { CommandSpec } from './command-registry';

@Injectable({ providedIn: 'root' })
export class CommandRunner {

  async run(command: string): Promise<void> {
  }

  //   readonly loading = this.resource.isLoading;   // Signal<boolean>
  //   readonly error   = this.resource.error;       // Signal<unknown>
  //   reload(): void { this.resource.reload(); }
}
