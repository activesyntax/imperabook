import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as ViewNode from '@workspace/views/view-node';
import { ItemOpener } from '@app/commands/item-opener';
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

  let opener: { open: ReturnType<typeof vi.fn>; selectedRef: ReturnType<typeof signal<string | undefined>> };

  beforeEach(async () => {
    opener = { open: vi.fn(), selectedRef: signal<string | undefined>(undefined) };

    await TestBed.configureTestingModule({
      imports: [ItemView],
      providers: [{ provide: ItemOpener, useValue: opener }],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemView);
    fixture.componentRef.setInput('view', itemView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function article(): HTMLElement {
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('article');
  }

  it('opens the item on click when it has somewhere to open', () => {
    const openable = { ...itemView, open: '/api/books/item1' };
    fixture.componentRef.setInput('view', openable);

    article().click();

    expect(opener.open).toHaveBeenCalledWith(openable);
  });

  it('marks the selected item for assistive tech and styling', () => {
    fixture.componentRef.setInput('view', { ...itemView, open: '/api/books/item1' });
    opener.selectedRef.set('item1');

    expect(article().getAttribute('aria-selected')).toBe('true');
    expect(article().classList).toContain('item-view--selected');
  });

  it('is not selectable when there is nothing to open', () => {
    opener.selectedRef.set('item1');

    expect(article().getAttribute('aria-selected')).toBe('false');
    expect(article().getAttribute('aria-disabled')).toBe('true');
  });
});
