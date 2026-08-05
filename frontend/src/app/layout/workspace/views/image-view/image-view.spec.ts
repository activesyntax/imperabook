import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageView } from './image-view';
import * as ViewNode from '@workspace/views/view-node';

describe('ImageView', () => {
  let component: ImageView;
  let fixture: ComponentFixture<ImageView>;



  const imageView: ViewNode.ImageView = {
    type: 'image',
    src: 'assets/img/imperabook-logo-dark.svg', // swap for your asset
    alt: 'ImperaBook',
    role: 'branding',
    caption: 'Your library, at your fingertips.',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageView],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageView);
    fixture.componentRef.setInput('view', imageView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
