import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceStore } from '@app/state/workspace-store';
import { Workspace } from './workspace';

describe('Workspace', () => {
  let fixture: ComponentFixture<Workspace>;
  let store: WorkspaceStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Workspace],
    }).compileComponents();

    store = TestBed.inject(WorkspaceStore);
    fixture = TestBed.createComponent(Workspace);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders whatever the store holds', () => {
    store.setResult({ views: [{ type: 'message', kind: 'info', text: 'hello' }] });
    fixture.detectChanges();

    expect(fixture.componentInstance.result().views).toEqual([
      { type: 'message', kind: 'info', text: 'hello' },
    ]);
  });

  function isCentered(): boolean {
    return fixture.nativeElement.querySelector('.workspace').classList.contains('centered');
  }

  it('centers a result made only of messages', () => {
    store.setResult({
      views: [
        { type: 'message', kind: 'success', text: 'Added author Homer.' },
        { type: 'message', kind: 'warning', text: 'Heads up.' },
      ],
    });
    fixture.detectChanges();

    expect(isCentered()).toBe(true);
  });

  it('keeps a result with other views at the top', () => {
    store.setResult({
      views: [
        { type: 'message', kind: 'warning', text: '"smith" matches 2 authors.' },
        { type: 'textView', blocks: [] },
      ],
    });
    fixture.detectChanges();

    expect(isCentered()).toBe(false);
  });

  it('does not center an empty workspace', () => {
    expect(isCentered()).toBe(false);
  });

  /** jsdom has no layout, so scrollTop is watched rather than measured. */
  function watchScrollTop(start: number): { value: number } {
    const section: HTMLElement = fixture.nativeElement.querySelector('.workspace');
    const state = { value: start };
    Object.defineProperty(section, 'scrollTop', {
      configurable: true,
      get: () => state.value,
      set: (v: number) => (state.value = v),
    });
    return state;
  }

  const list = { views: [{ type: 'message' as const, kind: 'info' as const, text: 'list' }] };
  const detail = { views: [{ type: 'message' as const, kind: 'info' as const, text: 'detail' }] };

  it('starts new content at the top', () => {
    const scroll = watchScrollTop(800);

    store.setResult(list);
    fixture.detectChanges();

    expect(scroll.value).toBe(0);
  });

  it('starts an opened item at the top', () => {
    store.setResult(list);
    fixture.detectChanges();
    const scroll = watchScrollTop(800);

    store.showOpened(detail, { views: list.views, selectedRef: 'b' });
    fixture.detectChanges();

    expect(scroll.value).toBe(0);
  });

  it('leaves the scroll alone when going back', () => {
    store.setResult(list);
    store.showOpened(detail, { views: list.views, selectedRef: 'b' });
    fixture.detectChanges();
    const scroll = watchScrollTop(800);

    store.back();
    fixture.detectChanges();

    expect(scroll.value).toBe(800);
  });

  it('scrolls on bare arrows but leaves Alt-arrows to the selection', () => {
    const section: HTMLElement = fixture.nativeElement.querySelector('.workspace');
    const scrollBy = vi.fn();
    section.scrollBy = scrollBy;

    const alt = new KeyboardEvent('keydown', { key: 'ArrowDown', altKey: true, cancelable: true });
    document.dispatchEvent(alt);
    expect(scrollBy).not.toHaveBeenCalled();
    expect(alt.defaultPrevented).toBe(false);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true }));
    expect(scrollBy).toHaveBeenCalled();
  });

  it('scrolls with PageDown and PageUp exactly as with the arrows', () => {
    const section: HTMLElement = fixture.nativeElement.querySelector('.workspace');
    const scrollBy = vi.fn();
    section.scrollBy = scrollBy;

    const down = new KeyboardEvent('keydown', { key: 'PageDown', cancelable: true });
    document.dispatchEvent(down);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp', cancelable: true }));

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', cancelable: true }));

    const [pageDown, pageUp, arrowDown, arrowUp] = scrollBy.mock.calls;
    expect(pageDown).toEqual(arrowDown);
    expect(pageUp).toEqual(arrowUp);
    expect(down.defaultPrevented).toBe(true);
  });
});
