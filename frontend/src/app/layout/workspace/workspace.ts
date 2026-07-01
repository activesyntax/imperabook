import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  untracked,
  viewChild,
} from '@angular/core';
import { CommandRegistry } from '@app/commands/command-registry';
import { CommandRunner } from '@app/commands/command-runner';
import { CommandSpec } from '@core/model';
import { WorkspaceStore } from '@workspace/workspace-store';
import { View } from './views/view/view';
import { CommandResult } from './views/view-node';

const DASHBOARD_COMMAND = 'dashboard';
const SCROLL_STEP_PX = 120; // roughly one mouse-wheel "line" — adjust if it feels off

@Component({
  selector: 'app-workspace',
  imports: [View],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {
  private readonly registry = inject(CommandRegistry);
  private readonly runner = inject(CommandRunner);
  private readonly store = inject(WorkspaceStore);

  readonly result = computed<CommandResult>(() => ({ views: [...this.store.views()] }));

  private readonly scrollContainer = viewChild<ElementRef<HTMLElement>>('scrollContainer');

  @HostListener('document:keydown', ['$event'])
  protected onScrollKeydown(event: KeyboardEvent): void {
    if (event.key === 'PageDown') {
      event.preventDefault();
      this.scrollByPage(1);
    } else if (event.key === 'PageUp') {
      event.preventDefault();
      this.scrollByPage(-1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.scrollByStep(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.scrollByStep(-1);
    }
  }

  private scrollByPage(direction: 1 | -1): void {
    const el = this.scrollContainer()?.nativeElement;
    if (!el) return;
    el.scrollBy({ top: direction * el.clientHeight * 0.9, behavior: 'smooth' });
  }

  private scrollByStep(direction: 1 | -1): void {
    const el = this.scrollContainer()?.nativeElement;
    if (!el) return;
    el.scrollBy({ top: direction * SCROLL_STEP_PX, behavior: 'smooth' });
  }

  constructor() {
    this.store.setResult(loading());

    // Fires once the registry has a non-empty command list — this IS
    // "ask for the dashboard at startup," just routed through the same
    // recipe-execution path every other command uses (DECISIONS 16),
    // instead of a route hardcoded here.
    effect(() => {
      if (this.registry.loading()) {
        return;
      }

      const registryError = this.registry.error();
      if (registryError) {
        untracked(() => this.store.setResult(registryLoadFailed()));
        return;
      }

      const dashboard = this.registry.commands().find((c) => c.command === DASHBOARD_COMMAND);

      if (!dashboard) {
        untracked(() => this.store.setResult(commandNotFound()));
        return;
      }

      untracked(() => void this.dispatch(dashboard));
    });
  }

  private async dispatch(command: CommandSpec): Promise<void> {
    this.store.setResult(loading());
    this.store.setResult(await this.runner.run(command));
  }
}

function loading(): CommandResult {
  return { views: [{ type: 'message', kind: 'info', text: 'Loading your library…' }] };
}

function registryLoadFailed(): CommandResult {
  return {
    views: [{ type: 'message', kind: 'error', text: 'Could not load the command registry.' }],
  };
}

function commandNotFound(): CommandResult {
  return {
    views: [
      {
        type: 'message',
        kind: 'error',
        text: `"${DASHBOARD_COMMAND}" is not in the command registry.`,
      },
    ],
  };
}
