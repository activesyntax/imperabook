import { TestBed } from '@angular/core/testing';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  // The brand itself arrives with the server's views; the shell only lays out the regions.
  // Nobody is signed in yet, so the command bar is not among them (see MainLayout's spec).
  it('should render the layout regions', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-workspace')).not.toBeNull();
    expect(compiled.querySelector('app-side-nav')).not.toBeNull();
    expect(compiled.querySelector('app-command-shell')).toBeNull();
  });
});
