import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemOpener } from '@app/commands/item-opener';

import { InlineContent } from './inline-content';

const content = [{ type: 'text', text: 'Hello Text' }];

describe('InlineContent', () => {
  let component: InlineContent;
  let fixture: ComponentFixture<InlineContent>;
  let opener: { follow: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    opener = { follow: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [InlineContent],
      providers: [{ provide: ItemOpener, useValue: opener }],
    }).compileComponents();

    fixture = TestBed.createComponent(InlineContent);
    fixture.componentRef.setInput('content', content);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function link(href: string): HTMLAnchorElement {
    fixture.componentRef.setInput('content', [{ type: 'link', href, content: [{ type: 'text', text: 'x' }] }]);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('a');
  }

  it('opens an API link in the workspace instead of following it', () => {
    const a = link('/api/authors/42');
    const click = new MouseEvent('click', { cancelable: true });

    a.dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
    expect(opener.follow).toHaveBeenCalledWith('/api/authors/42');
    expect(a.getAttribute('href')).toBe('/api/authors/42');
    expect(a.getAttribute('target')).toBeNull();
  });

  it('leaves other links as web pages in a new tab', () => {
    const a = link('https://www.activesyntax.net');

    expect(a.getAttribute('target')).toBe('_blank');
    expect(a.getAttribute('rel')).toBe('noopener noreferrer');
  });
});
