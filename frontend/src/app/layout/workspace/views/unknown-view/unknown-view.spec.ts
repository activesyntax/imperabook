import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownView } from './unknown-view';

describe('UnknownView', () => {
  let component: UnknownView;
  let fixture: ComponentFixture<UnknownView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnknownView],
    }).compileComponents();

    fixture = TestBed.createComponent(UnknownView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
