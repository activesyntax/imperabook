import { TestBed } from '@angular/core/testing';

import type { ViewNode } from '@workspace/views/view-node';
import { WorkspaceStore } from './workspace-store';

const message = (text: string): ViewNode => ({ type: 'message', kind: 'info', text });

describe('WorkspaceStore', () => {
  let store: WorkspaceStore;

  beforeEach(() => {
    store = TestBed.inject(WorkspaceStore);
  });

  it('remembers what an item was opened from', () => {
    store.setResult({ views: [message('list')] });

    store.showOpened({ views: [message('detail')] }, { views: store.views(), selectedRef: 'b' });

    expect(store.views()).toEqual([message('detail')]);
    expect(store.canGoBack()).toBe(true);
    expect(store.back()).toEqual({ views: [message('list')], selectedRef: 'b' });
    expect(store.views()).toEqual([message('list')]);
    expect(store.canGoBack()).toBe(false);
  });

  it('starts a fresh history with every command result', () => {
    store.showOpened({ views: [message('detail')] }, { views: [message('list')], selectedRef: 'b' });

    store.setResult({ views: [message('dashboard')] });

    expect(store.canGoBack()).toBe(false);
    expect(store.back()).toBeUndefined();
    expect(store.views()).toEqual([message('dashboard')]);
  });

  it('marks views gone back to as returned, and anything new as not', () => {
    store.setResult({ views: [message('list')] });
    expect(store.returned()).toBe(false);

    store.showOpened({ views: [message('detail')] }, { views: store.views(), selectedRef: 'b' });
    expect(store.returned()).toBe(false);

    store.back();
    expect(store.returned()).toBe(true);

    store.setResult({ views: [message('dashboard')] });
    expect(store.returned()).toBe(false);
  });
});
