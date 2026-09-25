import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';

import * as ViewNode from '@workspace/views/view-node';
import { CommandRunner } from '@app/commands/command-runner';
import { WorkspaceStore } from '@app/state/workspace-store';

type Step = 'username' | 'password';

interface StepField {
  readonly type: 'text' | 'password';
  readonly name: string;
  readonly autocomplete: string;
  readonly label: string;
}

const FIELDS: Record<Step, StepField> = {
  username: { type: 'text', name: 'username', autocomplete: 'username', label: 'User name' },
  password: { type: 'password', name: 'password', autocomplete: 'current-password', label: 'Password' },
};

/**
 * Asks for the username, then the password, one field at a time. Every login
 * screen the server sends is a new view node, so a failed attempt restarts
 * from the username.
 */
@Component({
  selector: 'app-login-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  private readonly runner = inject(CommandRunner);
  private readonly store = inject(WorkspaceStore);

  view = input.required<ViewNode.LoginFormView>();

  protected readonly step = linkedSignal<Step>(() => {
    this.view();
    return 'username';
  });
  private readonly username = linkedSignal(() => {
    this.view();
    return '';
  });
  // Cleared on every step, so the typed username never shows in the password field.
  protected readonly value = linkedSignal(() => {
    this.step();
    return '';
  });
  protected readonly busy = signal(false);

  protected readonly fields = FIELDS;

  private readonly field = viewChild<ElementRef<HTMLInputElement>>('field');

  constructor() {
    afterRenderEffect(() => {
      this.step();
      this.field()?.nativeElement.focus();
    });
  }

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }

  protected onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        void this.submit();
        break;
      case 'Escape':
        event.preventDefault();
        void this.cancel();
        break;
    }
  }

  /**
   * Back to the dashboard. The server decides whether that is possible: with no
   * session it answers with a new login screen, which restarts the form.
   */
  private async cancel(): Promise<void> {
    if (this.busy()) return;
    this.busy.set(true);
    const result = await this.runner.run({ command: 'dashboard', params: {} });
    this.busy.set(false);
    this.store.setResult(result);
  }

  protected async submit(): Promise<void> {
    const value = this.value();
    if (value === '' || this.busy()) return;

    if (this.step() === 'username') {
      this.username.set(value);
      this.step.set('password');
      return;
    }

    this.value.set('');
    this.busy.set(true);
    const result = await this.runner.login({ username: this.username(), password: value });
    this.busy.set(false);
    this.store.setResult(result);
  }
}
