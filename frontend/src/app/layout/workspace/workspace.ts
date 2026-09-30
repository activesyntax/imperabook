import {
  afterRenderEffect,
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
import { scrollByStep, scrollToTop, scrollToBottom } from '@core/scroll';

@Component({
  selector: 'app-workspace',
  imports: [View],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {
  private readonly store = inject(WorkspaceStore);

  readonly result = computed<CommandResult>(() => ({ views: [...this.store.views()] }));

  // A reply made only of messages ("Added author …", errors, warnings) has no
  // content to anchor to the top, so it sits in the middle of the workspace.
  protected readonly onlyMessages = computed(() => {
    const views = this.result().views;
    return views.length > 0 && views.every(view => view.type === 'message');
  });

  private readonly scrollContainer = viewChild<ElementRef<HTMLElement>>('scrollContainer');
  private readonly scrollElement = computed(() => this.scrollContainer()?.nativeElement);

  constructor() {
    // New content starts at the top, instantly — the old scroll offset belongs to
    // what was there before. Going back is left alone: the item returned to
    // scrolls itself into view.
    afterRenderEffect(() => {
      this.store.views();
      const el = this.scrollElement();
      if (el !== undefined && !this.store.returned()) el.scrollTop = 0;
    });
  }

  private readonly scrollActions: KeyboardActions = {
    // A modest step: a whole page per press jumped past too much to follow.
    // Bare Up/Down are the command bar's (moving between its lines), not ours.
    PageDown: (e) => scrollByStep(this.scrollElement(), 1),
    PageUp: (e) => scrollByStep(this.scrollElement(), -1),
    Home: (e) => scrollToTop(this.scrollElement()),
    End: (e) => scrollToBottom(this.scrollElement()),
  };

  @HostListener('document:keydown', ['$event'])
  protected onScrollKeydown(event: KeyboardEvent): void {
    // Only bare keys scroll: Alt moves the selection and Ctrl pages, so a
    // modified arrow must not also move the view.
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    handleKeyboardEvent(event, this.scrollActions);
  }
}
