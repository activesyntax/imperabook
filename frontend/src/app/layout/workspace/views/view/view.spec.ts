import { ComponentFixture, TestBed } from '@angular/core/testing';
import { View } from './view';
import { MessageView } from '../view-node';

describe('View', () => {
  let component: View;
  let fixture: ComponentFixture<View>;

  const node: MessageView = {
    type: 'message',
    kind: 'info',
    text: 'Type `list books` to view all books, or `add book` to catalog a new one.',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [View],
    }).compileComponents();

    fixture = TestBed.createComponent(View);
    fixture.componentRef.setInput('node', node);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
