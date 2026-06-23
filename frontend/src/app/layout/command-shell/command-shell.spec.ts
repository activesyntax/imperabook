import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandShell } from './command-shell';

describe('CommandShell', () => {
  let component: CommandShell;
  let fixture: ComponentFixture<CommandShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandShell],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
