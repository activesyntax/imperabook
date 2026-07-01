import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCollectionView } from './item-collection-view';

describe('ItemCollectionView', () => {
  let component: ItemCollectionView;
  let fixture: ComponentFixture<ItemCollectionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCollectionView],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCollectionView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
