import { ComponentFixture, TestBed } from '@angular/core/testing';
import { flushCommandRegistry, provideHttpTesting } from '@testing/http';

import { MainLayout } from './main-layout';

describe('MainLayout', () => {
  let component: MainLayout;
  let fixture: ComponentFixture<MainLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayout],
      providers: [provideHttpTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();      // dispatches the resource request
    flushCommandRegistry();       // answers it → resource resolves
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
