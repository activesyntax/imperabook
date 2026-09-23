import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

import type { CommandResult } from '@workspace/views/view-node';
import { ParsedCommand } from '@app/layout/command-shell/command-visitor';

export type CommandInput = Readonly<Record<string, string | undefined>>;


@Injectable({ providedIn: 'root' })
export class CommandRunner {
  private readonly http = inject(HttpClient);

  async run(cmd: ParsedCommand): Promise<CommandResult> {

    return result;
  }
}


