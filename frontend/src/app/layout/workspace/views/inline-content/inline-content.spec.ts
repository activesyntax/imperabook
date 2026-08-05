import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineContent } from './inline-content';

describe('InlineContent', () => {
  let component: InlineContent;
  let fixture: ComponentFixture<InlineContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineContent],
    }).compileComponents();

    fixture = TestBed.createComponent(InlineContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
