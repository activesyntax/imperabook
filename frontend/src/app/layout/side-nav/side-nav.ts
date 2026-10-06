import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import type { CommandName } from '@command-shell/command-visitor';
import { UserBadge } from '@app/layout/user-badge/user-badge';

@Component({
  selector: 'app-side-nav',
  imports: [UserBadge, NgTemplateOutlet],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNav {

  readonly signedIn = input.required<boolean>();
  readonly name = input('');
  readonly library = input('');
  readonly avatarUrl = input<string | null>(null);

  /** A command picked from the nav; the layout runs it like one typed in the bar. */
  readonly run = output<CommandName>();

  // Signed out, only what works without a session is offered: signing in, and
  // reading about the app and its commands.
  protected readonly account = computed(() =>
    ACCOUNT_COMMANDS.filter((c) => (this.signedIn() ? c.command !== 'login' : c.command === 'login')));

  protected readonly application = computed(() =>
    this.signedIn() ? APPLICATION_COMMANDS : APPLICATION_COMMANDS.filter((c) => SIGNED_OUT.has(c.command)));

  protected readonly pinned = computed(() => (this.signedIn() ? PINNED_COMMANDS : []));

}

const SIGNED_OUT: ReadonlySet<string> = new Set(['about', 'help']);

// Grouped as the nav shows them: pinned, application, account.
/** A nav entry: a real command (the grammar's name for it), so a click can run it as is. */
interface NavCommand {
  readonly command: CommandName;
  readonly description: string;
}

const PINNED_COMMANDS: readonly NavCommand[] = [
  { command: 'dashboard', description: 'Your library at a glance, and what needs attention' },
  { command: 'library', description: 'Show library info: images, statistics' },
];

const APPLICATION_COMMANDS: readonly NavCommand[] = [
  { command: 'settings', description: 'Show and edit user settings' },
  { command: 'about', description: 'Shows information about software' },
  { command: 'help', description: 'Show available commands' },
];

const ACCOUNT_COMMANDS: readonly NavCommand[] = [
  { command: 'account', description: 'Account settings' },
  { command: 'login', description: 'Enter into your library' },
  { command: 'logout', description: 'Leave your library' },
];
