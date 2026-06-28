import { inject, Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Command } from "@core/model";

@Injectable({ providedIn: 'root' })
export class CommandRunner {

  async run(command: Command): Promise<void> {
  }

  //   readonly loading = this.resource.isLoading;   // Signal<boolean>
  //   readonly error   = this.resource.error;       // Signal<unknown>
  //   reload(): void { this.resource.reload(); }
}
