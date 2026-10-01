import { signal } from '@angular/core';
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
  let session: {
    signedIn: ReturnType<typeof signal<boolean>>;
    user: ReturnType<typeof signal<{ name: string; library: string | null } | null>>;
    avatarUrl: ReturnType<typeof signal<string | null>>;
  };

  beforeEach(async () => {
    runner = { run: vi.fn(() => Promise.resolve(ABOUT)) };
    session = { signedIn: signal(false), user: signal(null), avatarUrl: signal(null) };

    await TestBed.configureTestingModule({
      imports: [MainLayout],
      providers: [
        { provide: CommandRunner, useValue: runner },
        { provide: Session, useValue: session },
      ],
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

  function shell(): Element | null {
    return fixture.nativeElement.querySelector('app-command-shell');
  }

  it('shows no user and no command bar before anyone signs in', () => {
    expect(fixture.nativeElement.querySelector('app-user-badge')).toBeNull();
    expect(shell()).toBeNull();
  });

  it('keeps the command bar hidden on a page opened while signed out', async () => {
    const about = [...fixture.nativeElement.querySelectorAll('app-side-nav .pin')]
      .find((b: Element) => b.textContent?.includes('about')) as HTMLButtonElement;

    about.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(shell()).toBeNull();
  });

  it('shows the command bar once signed in, but not while the login form is up', () => {
    session.signedIn.set(true);
    session.user.set({ name: 'Ada Lovelace', library: 'Analytical Shelf' });
    fixture.detectChanges();
    expect(shell()).not.toBeNull();

    TestBed.inject(WorkspaceStore).setResult({ views: [{ type: 'loginForm' }] });
    fixture.detectChanges();
    expect(shell()).toBeNull();
  });
});
