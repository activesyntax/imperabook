import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as ViewNode from '@workspace/views/view-node';

import { MessageView } from './message-view';

describe('MessageView', () => {
  let component: MessageView;
  let fixture: ComponentFixture<MessageView>;

  const messageView: ViewNode.MessageView = {
    type: 'message',
    kind: 'info',
    text: 'Type `list books` to view all books, or `add book` to catalog a new one.',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageView],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageView);
    fixture.componentRef.setInput('view', messageView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
