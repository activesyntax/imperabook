import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  viewChild,
} from '@angular/core';
import { CommandRegistry } from '@app/commands/command-registry';
import { CommandRunner } from '@app/commands/command-runner';
import { CommandSpec } from '@core/model';
import { WorkspaceStore } from '@app/state/workspace-store';
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
    handleKeyboardEvent(event, this.scrollActions);
  }

  constructor() {
    void this.startup();
  }

  /**
   * Egyszeri indítás, nem `effect()`. A jegyzék bejelentkezés után újratöltődik, és egy
   * reaktív hatás ilyenkor újra lefutna: a login válaszaként megjelenő dashboardot azonnal
   * felülírná egy másodikkal. A nyitókép egyszer dől el, az indulásnál.
   */
  private async startup(): Promise<void> {
    this.store.setResult(loading());

    try {
      await this.registry.ready();
    } catch {
      this.store.setResult(registryLoadFailed());
      return;
    }

    // Session nélkül a nyitókép a szervertől jött a bootstrapban — nincs mit futtatni,
    // és a vezérlőcsatorna amúgy is zárva van. A kliens itt nem dönt arról, mit lát egy
    // be nem jelentkezett felhasználó; megjeleníti, amit kapott.
    const startupViews = this.registry.startupViews();
    if (startupViews.length > 0) {
      this.store.setResult({ views: [...startupViews] });
      return;
    }

    const dashboard = this.registry.commands().find((c) => c.command === DASHBOARD_COMMAND);

    if (dashboard === undefined) {
      this.store.setResult(commandNotFound());
      return;
    }

    await this.dispatch(dashboard);
  }

  private async dispatch(command: CommandSpec): Promise<void> {
    this.store.setResult(loading());

    const view = await this.runner.open(command);

    if (view !== null) {
      this.store.setResult(view);
    }
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
