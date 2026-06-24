import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCollection } from './card-collection';

describe('CardCollection', () => {
  let component: CardCollection;
  let fixture: ComponentFixture<CardCollection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCollection],
    }).compileComponents();

    fixture = TestBed.createComponent(CardCollection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
