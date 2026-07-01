// import { Component, computed } from '@angular/core';
// import { httpResource, HttpErrorResponse } from '@angular/common/http';
// import { View } from './views/view/view';
// import { CommandResult } from './views/view-node';
//
// @Component({
//   selector: 'app-workspace',
//   imports: [View],
//   templateUrl: './workspace.html',
//   styleUrl: './workspace.scss',
// })
// export class Workspace {
//   // Fires on creation — this IS "ask for the book list at startup".
//   // The resource value is the CommandResult itself; no client-side composition (DECISIONS 15).
//   // Later, CommandRunner re-triggers this same path via `books.reload()`.
//   private readonly books = httpResource<CommandResult>(() => '/api/books');
//
//   readonly result = computed<CommandResult>(() => {
//     if (this.books.isLoading()) return loading();
//
//     const err = this.books.error();
//     if (err) return problem(err);
//
//     return this.books.value() ?? loading();
//   });
// }
//
// // NOTE: 'info' / 'error' must be members of your MessageView `kind` union in view-node.ts.
// function loading(): CommandResult {
//   return { views: [{ type: 'message', kind: 'info', text: 'Loading your library...' }] };
// }
//
// function problem(err: unknown): CommandResult {
//   // RFC 9457 ProblemDetails arrives in the error body (DECISIONS 12).
//   const detail =
//     err instanceof HttpErrorResponse && err.error?.detail
//       ? err.error.detail
//       : 'Could not load your books.';
//
//   return { views: [{ type: 'message', kind: 'error', text: detail }] };
// }
