import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommandLauncher } from '@app/commands/command-launcher';
import * as ViewNode from '@workspace/views/view-node';
import { TextView } from './text-view';

const headingView: ViewNode.Heading = {
  type: 'heading',
  level: 'one',
  content: [
    { type: 'text', text: 'Welcome to the Text View' },
  ],
}
describe('TextView', () => {
  let component: TextView;
  let fixture: ComponentFixture<TextView>;
  let launcher: { run: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    launcher = { run: vi.fn(() => Promise.resolve()) };

    await TestBed.configureTestingModule({
      imports: [TextView],
      providers: [{ provide: CommandLauncher, useValue: launcher }],
    }).compileComponents();

    fixture = TestBed.createComponent(TextView);
    fixture.componentRef.setInput('view', headingView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('a finding', () => {
    function showFinding(): HTMLButtonElement {
      const view: ViewNode.TextView = {
        type: 'textView',
        blocks: [{ type: 'finding', value: '12', text: 'books have no ISBN', command: 'list books having no isbn', commandText: null }],
      };
      fixture.componentRef.setInput('view', view);
      fixture.detectChanges();
      return fixture.nativeElement.querySelector('.finding');
    }

    it('runs its command when clicked', () => {
      showFinding().click();

      expect(launcher.run).toHaveBeenCalledWith('list books having no isbn');
    });

    it('keeps focus in the command bar when pressed', () => {
      const press = new MouseEvent('mousedown', { cancelable: true });

      showFinding().dispatchEvent(press);

      expect(press.defaultPrevented).toBe(true);
    });

    it('says what it does to assistive tech', () => {
      expect(showFinding().getAttribute('aria-label')).toBe('12 books have no ISBN, run list books having no isbn');
    });
  });
});
