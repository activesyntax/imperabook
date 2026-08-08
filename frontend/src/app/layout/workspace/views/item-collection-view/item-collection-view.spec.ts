import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as ViewNode from '@workspace/views/view-node';
import { ItemCollectionView } from './item-collection-view';

describe('ItemCollectionView', () => {
  let component: ItemCollectionView;
  let fixture: ComponentFixture<ItemCollectionView>;
  const itemCollectionView: ViewNode.ItemCollectionView = {
    type: 'itemCollection',
    title: 'Books',
    emptyMessage: 'No books found.',
    items: [
      {
        ref: 'book-1',
        properties: [
          { role: 'primary', name: 'title', value: 'The Great Gatsby' },
          { role: 'secondary', name: 'author', value: 'F. Scott Fitzgerald' },
        ],
      },
      {
        ref: 'book-2',
        properties: [{ role: 'primary', name: 'title', value: 'Orphan Book' }],
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCollectionView],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCollectionView);
    fixture.componentRef.setInput('view', itemCollectionView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
