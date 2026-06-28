import { ComponentFixture, TestBed } from '@angular/core/testing';
import { flushCommandRegistry, provideHttpTesting } from '@testing/http';

import { CommandShell } from './command-shell';

describe('CommandShell', () => {
  let component: CommandShell;
  let fixture: ComponentFixture<CommandShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandShell],
      providers: [provideHttpTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandShell);
    component = fixture.componentInstance;
    fixture.detectChanges();      // dispatches the resource request
    flushCommandRegistry();       // answers it → resource resolves
    await fixture.whenStable();   // now actually resolves
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
