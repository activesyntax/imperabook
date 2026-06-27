import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidanceView } from './guidance-view';

describe('GuidanceView', () => {
  let component: GuidanceView;
  let fixture: ComponentFixture<GuidanceView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuidanceView],
    }).compileComponents();

    fixture = TestBed.createComponent(GuidanceView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
