import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpTesting } from '@testing/http';
import { SideNav } from './side-nav';

describe('SideNav', () => {
  let component: SideNav;
  let fixture: ComponentFixture<SideNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNav],
      providers: [provideHttpTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SideNav);
    fixture.componentRef.setInput('name', 'John Doe');
    fixture.componentRef.setInput('library', 'My Library');
    fixture.componentRef.setInput('avatarUrl', null);
    component = fixture.componentInstance;
    fixture.detectChanges();      // dispatches the resource request
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
