import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CommandSpec } from '@core/model';
import { CommandResult } from '@workspace/views/view-node';

const COMMAND_ENDPOINT = '/api/command';

export type CommandAnswers = Readonly<Record<string, string>>;

@Injectable({ providedIn: 'root' })
export class CommandRunner {
  private readonly http = inject(HttpClient);

  async run(command: CommandSpec, answers: CommandAnswers = {}): Promise<CommandResult> {
    const composed = this.composeText(command, answers);

    if ('validationError' in composed) {
      return errorResult(composed.validationError);
    }

    try {
      return await firstValueFrom(
        this.http.post<CommandResult>(COMMAND_ENDPOINT, {
          command: command.command,
          text: composed.text || undefined,
        })
      );
    } catch (err) {
      return errorResult(this.describeError(err, command));
    }
  }

  private composeText(
    command: CommandSpec,
    answers: CommandAnswers
  ): { text: string } | { validationError: string } {
    const parts: string[] = [];

    for (const parameter of command.parameters) {
      const value = answers[parameter.name];

      if (parameter.required && !value) {
        return { validationError: `"${parameter.prompt}" is required.` };
      }

      if (!value) {
        continue;
      }

      parts.push(parameter.connective ? `${parameter.connective} ${quote(value)}` : value);
    }

    return { text: parts.join(' ') };
  }

  private describeError(err: unknown, command: CommandSpec): string {
    if (err instanceof HttpErrorResponse && err.error?.detail) {
      return err.error.detail;
    }

    return `Could not run "${command.command}".`;
  }
}

function quote(value: string): string {
  return `"${value.replace(/"/g, '\\"')}"`;
}

function errorResult(text: string): CommandResult {
  return { views: [{ type: 'message', kind: 'error', text }] };
}
