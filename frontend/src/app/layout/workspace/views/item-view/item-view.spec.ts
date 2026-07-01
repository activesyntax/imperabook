import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as ViewNode from '@workspace/views/view-node';
import { ItemView } from './item-view';

describe('ItemView', () => {
  let component: ItemView;
  let fixture: ComponentFixture<ItemView>;

  const itemView: ViewNode.ItemView = {

    ref: 'item1',
    properties: [
      { role: 'primary', name: 'title', value: 'The Great Gatsby' },
      { role: 'secondary', name: 'author', value: 'F. Scott Fitzgerald' },
      { role: 'meta', name: 'year', value: '1925' },
    ],
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemView],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemView);
    fixture.componentRef.setInput('view', itemView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
