import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditor } from './book-editor';

describe('BookEditor', () => {
  let component: BookEditor;
  let fixture: ComponentFixture<BookEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(BookEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
