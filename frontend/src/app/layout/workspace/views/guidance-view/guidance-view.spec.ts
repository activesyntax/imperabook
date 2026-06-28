import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as ViewNode from '@workspace/views/view-node';

import { GuidanceView } from './guidance-view';

describe('GuidanceView', () => {
  let component: GuidanceView;
  let fixture: ComponentFixture<GuidanceView>;

  const welcomeGuidance: ViewNode.GuidanceView = {
    type: 'guidance',
    title: 'Getting started',
    intro: `ImperaBook is a keyboard-driven catalog for your personal library. ` +
      `Type a command to add, find, and organize your books — anything that isn't a command runs as a search.`,
    hints: [
      { keys: ['Enter'], label: 'run the typed command' },
      { keys: ['Tab', 'Enter'], label: 'pick a suggestion, then accept' },
      { keys: ['Ctrl + K'], label: 'focus the command bar' },
    ],
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuidanceView],
    }).compileComponents();

    fixture = TestBed.createComponent(GuidanceView);
    fixture.componentRef.setInput('view', welcomeGuidance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
