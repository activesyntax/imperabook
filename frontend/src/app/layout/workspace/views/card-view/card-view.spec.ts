import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardView } from './card-view';

describe('CardView', () => {
  let component: CardView;
  let fixture: ComponentFixture<CardView>;

  const cardView = { type: 'card', heading: 'All Books', value: '248', caption: 'books in your sanctuary' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardView],
    }).compileComponents();

    fixture = TestBed.createComponent(CardView);
    fixture.componentRef.setInput('view', cardView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
