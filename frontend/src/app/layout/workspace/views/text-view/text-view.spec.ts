import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as ViewNode from '@workspace/views/view-node';
import { TextView } from './text-view';

const headingView: ViewNode.Heading = {
  type: 'heading',
  level: 'one',
  content: [
    { type: 'text', text: 'Welcome to the Text View' },
  ],
}
describe('TextView', () => {
  let component: TextView;
  let fixture: ComponentFixture<TextView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextView],
    }).compileComponents();

    fixture = TestBed.createComponent(TextView);
    fixture.componentRef.setInput('view', headingView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
