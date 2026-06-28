import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { flushCommandRegistry, provideHttpTesting } from '@testing/http';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpTesting()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the brand', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();   // renders brand + dispatches the registry request
    flushCommandRegistry();    // answer it so nothing is left outstanding
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('ImperaBook'); // ← your real brand text
  });
});
