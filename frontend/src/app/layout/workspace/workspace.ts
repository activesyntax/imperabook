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
import { handleKeyboardEvent, KeyboardActions } from '@core/keyboard';
import { scrollByPage, scrollByStep, scrollToTop, scrollToBottom } from '@core/scroll';

const DASHBOARD_COMMAND = 'dashboard';


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
  private readonly scrollElement = computed(() => this.scrollContainer()?.nativeElement);

  private readonly scrollActions: KeyboardActions = {

    PageDown: (e) => scrollByPage(this.scrollElement(), 1),
    PageUp: (e) => scrollByPage(this.scrollElement(), -1),
    ArrowDown: (e) => scrollByStep(this.scrollElement(), 1),
    ArrowUp: (e) => scrollByStep(this.scrollElement(), -1),
    Home: (e) => scrollToTop(this.scrollElement()),
    End: (e) => scrollToBottom(this.scrollElement()),
  };


  @HostListener('document:keydown', ['$event'])
  protected onScrollKeydown(event: KeyboardEvent): void {
    console.log('Workspace: onScrollKeydown', event.key);
    handleKeyboardEvent(event, this.scrollActions);
  }

  constructor() {
    this.store.setResult(loading());

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
