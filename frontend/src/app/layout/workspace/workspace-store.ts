import { computed, Injectable, signal } from '@angular/core';
import type { CommandResult, ViewNode } from '@workspace/views/view-node';

@Injectable({ providedIn: 'root' })
export class WorkspaceStore {
  private readonly _views = signal<readonly ViewNode[]>([]);

  readonly views = computed(() => this._views());

  setResult(result: CommandResult): void {
    this._views.set(result.views);
  }
}
