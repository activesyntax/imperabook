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
});
