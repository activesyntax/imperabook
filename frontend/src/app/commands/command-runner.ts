import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CommandSpec } from '@core/model';
import { CommandResult } from '@workspace/views/view-node';

const COMMAND_ENDPOINT = '/api/command';

export type CommandParameter = string;
export type CommandParameterValue = string;
export type CommandInput = Readonly<Record<CommandParameter, CommandParameterValue>>;

@Injectable({ providedIn: 'root' })
export class CommandRunner {
  private readonly http = inject(HttpClient);

  async run(command: CommandSpec, answers: CommandInput = {}): Promise<CommandResult> {

    try {
      return await firstValueFrom(
        this.http.post<CommandResult>(COMMAND_ENDPOINT, {
          command: command.command,
        })
      );
    } catch (err) {
      return errorResult(this.describeError(err, command));
    }
  }

  private describeError(err: unknown, command: CommandSpec): string {
    if (err instanceof HttpErrorResponse && err.error?.detail) {
      return err.error.detail;
    }

    return `Could not run "${command.command}".`;
  }
}


function errorResult(text: string): CommandResult {
  return { views: [{ type: 'message', kind: 'error', text }] };
}
// │ 34 │  private composeText(                               │    │
// │ 35 │    command: CommandSpec,                            │    │
// │ 36 │    answers: CommandAnswers                          │    │
// │ 37 │  ): { text: string } | { validationError: string }↴ │    │
// │    │                                                 … { │    │
// │ 38 │    const parts: string[] = [];                      │    │
// │ 39 │                                                     │    │
// │ 40 │    for (const parameter of command.parameters) {    │    │
// │ 41 │      const value = answers[parameter.name];         │    │
// │ 42 │                                                     │    │
// │ 43 │      if (parameter.required && !value) {            │    │
// │ 44 │        return { validationError: `"${parameter.pro↵ │    │
// │    │mpt}" is required.` };                               │    │
// │ 45 │      }                                              │    │
// │ 46 │                                                     │    │
// │ 47 │      if (!value) {                                  │    │
// │ 48 │        continue;                                    │    │
// │ 49 │      }                                              │    │
// │ 50 │                                                     │    │
// │ 51 │      parts.push(parameter.connective ? `${paramete↵ │    │
// │    │r.connective} ${quote(value)}` : value);             │    │
// │ 52 │    }                                                │    │
// │ 53 │                                                     │    │
// │ 54 │    return { text: parts.join(' ') };                │    │
// │ 55 │  }                                                  │    │
