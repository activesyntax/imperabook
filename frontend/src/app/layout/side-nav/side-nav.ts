import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { CommandSpec } from '@core/model';
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

  // Signed out, only what works without a session is offered: signing in, and
  // reading about the app and its commands.
  protected readonly account = computed(() =>
    ACCOUNT_COMMANDS.filter((c) => (this.signedIn() ? c.command !== 'login' : c.command === 'login')));

  protected readonly application = computed(() =>
    this.signedIn() ? APPLICATION_COMMANDS : APPLICATION_COMMANDS.filter((c) => SIGNED_OUT.has(c.command)));

  protected readonly pinned = computed(() => (this.signedIn() ? PINNED_COMMANDS : []));

}

const SIGNED_OUT: ReadonlySet<string> = new Set(['about', 'help']);

// Mirrors the Fixed, Application and Account groups of the backend CommandCatalog, in catalog order.
const PINNED_COMMANDS: readonly CommandSpec[] = [
  { command: 'dashboard', description: 'Your library at a glance, and what needs attention', parameters: [] },
  { command: 'library', description: 'Show library info: images, statistics', parameters: [] },
];

const APPLICATION_COMMANDS: readonly CommandSpec[] = [
  { command: 'settings', description: 'Show and edit user settings', parameters: [] },
  { command: 'about', description: 'Shows information about software', parameters: [] },
  { command: 'help', description: 'Show available commands', parameters: [] },
];

const ACCOUNT_COMMANDS: readonly CommandSpec[] = [
  { command: 'account', description: 'Account settings', parameters: [] },
  { command: 'login', description: 'Enter into your library', parameters: [] },
  { command: 'logout', description: 'Leave your library', parameters: [] },
];
