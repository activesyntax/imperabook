import { computed, Injectable, signal } from '@angular/core';
import type { ViewNode } from './views/view-node'; // <-- adjust to your actual path

@Injectable({ providedIn: 'root' })
export class WorkspaceStore {
  private readonly _current = signal<ViewNode | null>(null);

  readonly view = computed(() => this._current() ?? null);

  setResult(result: ViewNode): void {
    this._current.set(result);
  }
}
