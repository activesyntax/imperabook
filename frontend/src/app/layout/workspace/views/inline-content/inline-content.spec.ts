import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineContent } from './inline-content';

const content = [{ type: 'text', text: 'Hello Text' }];

describe('InlineContent', () => {
  let component: InlineContent;
  let fixture: ComponentFixture<InlineContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineContent],
    }).compileComponents();

    fixture = TestBed.createComponent(InlineContent);
    fixture.componentRef.setInput('content', content);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
