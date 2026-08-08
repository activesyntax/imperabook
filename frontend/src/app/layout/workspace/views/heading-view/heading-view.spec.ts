import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as ViewNode from '@workspace/views/view-node';
import { HeadingView } from './heading-view';

const headingView: ViewNode.HeadingView = {
  type: 'heading',
  text: 'Heading',
  page: null
};

describe('HeadingView', () => {
  let component: HeadingView;
  let fixture: ComponentFixture<HeadingView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadingView],
    }).compileComponents();

    fixture = TestBed.createComponent(HeadingView);
    fixture.componentRef.setInput('view', headingView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
