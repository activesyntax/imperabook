import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingView } from './heading-view';

describe('HeadingView', () => {
  let component: HeadingView;
  let fixture: ComponentFixture<HeadingView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadingView],
    }).compileComponents();

    fixture = TestBed.createComponent(HeadingView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
