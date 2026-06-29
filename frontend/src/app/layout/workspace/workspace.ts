// src/app/layout/workspace/workspace.ts
import { Component, computed } from '@angular/core';
import { httpResource, HttpErrorResponse } from '@angular/common/http';
import { View } from './views/view/view';
import { CommandResult } from './views/view-node';

@Component({
  selector: 'app-workspace',
  imports: [View],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {
  // Fires on creation — this IS "ask for the dashboard at startup".
  // The resource value is the CommandResult itself; no client-side composition (DECISIONS 15).
  // Later, CommandRunner re-triggers this same path via `dashboard.reload()`.
  private readonly dashboard = httpResource<CommandResult>(() => '/api/dashboard');

  readonly result = computed<CommandResult>(() => {
    if (this.dashboard.isLoading()) return loading();

    const err = this.dashboard.error();
    if (err) return problem(err);

    return this.dashboard.value() ?? loading();
  });
}

// NOTE: 'info' / 'error' must be members of your MessageView `kind` union in view-node.ts.
// The sample only used 'warning' — adjust these two if your union differs.
function loading(): CommandResult {
  return { views: [{ type: 'message', kind: 'info', text: 'Loading your library…' }] };
}

function problem(err: unknown): CommandResult {
  // RFC 9457 ProblemDetails arrives in the error body (DECISIONS 12).
  const detail =
    err instanceof HttpErrorResponse && err.error?.detail
      ? err.error.detail
      : 'Could not load the dashboard.';
  return { views: [{ type: 'message', kind: 'error', text: detail }] };
}
