import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandRunner } from '@app/commands/command-runner';
import { Session } from '@app/state/session';
import { WorkspaceStore } from '@app/state/workspace-store';
import type { CommandResult } from '@workspace/views/view-node';
import { MainLayout } from './main-layout';

const ABOUT: CommandResult = { views: [{ type: 'message', kind: 'info', text: 'about' }] };

describe('MainLayout', () => {
  let component: MainLayout;
  let fixture: ComponentFixture<MainLayout>;
  let runner: { run: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    runner = { run: vi.fn(() => Promise.resolve(ABOUT)) };

    await TestBed.configureTestingModule({
      imports: [MainLayout],
      providers: [{ provide: CommandRunner, useValue: runner }],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('runs a command picked in the side nav and shows its result', async () => {
    const about = [...fixture.nativeElement.querySelectorAll('app-side-nav .pin')]
      .find((b: Element) => b.textContent?.includes('about')) as HTMLButtonElement;

    about.click();
    await fixture.whenStable();

    expect(runner.run).toHaveBeenCalledWith({ command: 'about', params: {} });
    expect(TestBed.inject(WorkspaceStore).views()).toEqual(ABOUT.views);
  });

  it('shows no user in the side nav before anyone signs in', () => {
    expect(TestBed.inject(Session).signedIn()).toBe(false);
    expect(fixture.nativeElement.querySelector('app-user-badge')).toBeNull();
  });
});
