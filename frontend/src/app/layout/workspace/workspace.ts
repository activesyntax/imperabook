import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  viewChild,
} from '@angular/core';
import { WorkspaceStore } from '@app/state/workspace-store';
import { View } from './views/view/view';
import { CommandResult } from './views/view-node';
import { handleKeyboardEvent, KeyboardActions } from '@core/keyboard';
import { scrollByPage, scrollByStep, scrollToTop, scrollToBottom } from '@core/scroll';

@Component({
  selector: 'app-workspace',
  imports: [View],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {
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
}
