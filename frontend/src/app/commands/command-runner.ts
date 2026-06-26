import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { ViewNode } from '../layout/workspace/views/view-node'; // <-- adjust to your actual path
import { WorkspaceStore } from '../layout/workspace/workspace-store'; // <-- adjust to your actual path

/** What the shell hands the runner: a chosen command, or a raw search fall-through. */
export type ShellSubmit =
  | { readonly kind: 'command'; readonly command: string }
  | { readonly kind: 'search'; readonly term: string };

interface Rendered {
  readonly view: ViewNode;
  readonly refs: readonly string[];
}

// Selection moves act purely on the store. `back` is handled separately (history);
// `open` falls through to the backend because it needs the selected row's detail.
const SELECTION = new Set(['next', 'prev', 'top', 'bottom']);

@Injectable({ providedIn: 'root' })
export class CommandRunner {
  private readonly http = inject(HttpClient);
  private readonly store = inject(WorkspaceStore);

  async run(submit: ShellSubmit): Promise<void> {
    if (submit.kind === 'command') {
      const command = submit.command;
      if (command === 'back') {
        this.store.back();
        return;
      }
      if (SELECTION.has(command)) {
        this.select(command);
        return;
      }
      // `open` and the rest fall through to a backend round-trip.
    }
    await this.dispatch(submit);
  }

  private select(command: string): void {
    switch (command) {
      case 'next': this.store.selectNext(); break;
      case 'prev': this.store.selectPrev(); break;
      case 'top': this.store.selectFirst(); break;
      case 'bottom': this.store.selectLast(); break;
    }
  }

  private async dispatch(submit: ShellSubmit): Promise<void> {
    this.store.setPending(true);
    try {
      this.store.setResult(await this.execute(submit));
    } catch (err) {
      this.store.setResult(toErrorView(err));
    } finally {
      this.store.setPending(false);
    }
  }

  // ── app-specific seam ───────────────────────────────────────────────────────
  // Turn a submission into a rendered view. For `open`, read this.store.selectedRef()
  // to know which row to fetch. This is where the route map and the
  // read-model -> ViewNode mapping go (the frontend owns that rendering decision).
  private async execute(submit: ShellSubmit): Promise<Rendered> {
    // Example shape:
    //   const dto = await firstValueFrom(this.http.get<BookListItem[]>('/api/books'));
    //   return { view: toCollectionView(dto), refs: dto.map(b => b.id) };
    void this.http; // remove once wired
    throw new Error(`execute() not wired for: ${JSON.stringify(submit)}`);
  }
}

// Map a thrown error (incl. an RFC 9457 ProblemDetails body) to a message view.
// RECONCILE: the kind/fields must match your MessageView node.
function toErrorView(err: unknown): Rendered {
  const message = problemDetail(err) ?? 'Something went wrong.';
  const view = { kind: 'MessageView', tone: 'error', text: message } as unknown as ViewNode;
  return { view, refs: [] };
}

function problemDetail(err: unknown): string | null {
  // Angular's HttpErrorResponse puts the parsed ProblemDetails body on `.error`.
  const body = (err as { error?: { detail?: string; title?: string } })?.error;
  return body?.detail ?? body?.title ?? null;
}
