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
});
