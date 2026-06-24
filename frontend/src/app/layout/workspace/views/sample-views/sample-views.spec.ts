import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleViews } from './sample-views';

describe('SampleViews', () => {
  let component: SampleViews;
  let fixture: ComponentFixture<SampleViews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleViews],
    }).compileComponents();

    fixture = TestBed.createComponent(SampleViews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
