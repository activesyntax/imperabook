import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNav } from './side-nav';

describe('SideNav', () => {
  let fixture: ComponentFixture<SideNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNav],
    }).compileComponents();

    fixture = TestBed.createComponent(SideNav);
  });

  function show(signedIn: boolean, name = '', library = ''): HTMLElement {
    fixture.componentRef.setInput('signedIn', signedIn);
    fixture.componentRef.setInput('name', name);
    fixture.componentRef.setInput('library', library);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  function commands(nav: HTMLElement): string[] {
    return [...nav.querySelectorAll('.pin__name')].map(el => el.textContent!.trim());
  }

  it('shows the signed-in user and their library', () => {
    const nav = show(true, 'Ada Lovelace', 'Analytical Shelf');

    const badge = nav.querySelector('app-user-badge');
    expect(badge?.textContent).toContain('Ada Lovelace');
    expect(badge?.textContent).toContain('Analytical Shelf');
  });

  it('offers every command but login while signed in', () => {
    const offered = commands(show(true, 'Ada Lovelace', 'Analytical Shelf'));

    expect(offered).toEqual(['account', 'logout', 'settings', 'about', 'help', 'dashboard', 'library']);
  });

  it('shows no badge and only login, about and help while signed out', () => {
    const nav = show(false);

    expect(nav.querySelector('app-user-badge')).toBeNull();
    expect(commands(nav)).toEqual(['login', 'about', 'help']);
    expect(nav.textContent).not.toContain('Pinned commands');
  });
});
