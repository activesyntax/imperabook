import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
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

  readonly name = input.required<string>();
  readonly library = input.required<string>();
  readonly avatarUrl = input<string | null>(null);


  protected readonly userLoggedIn = signal(true);
  protected readonly commandToFilter = computed(() => !this.userLoggedIn() ? 'logout' : 'login');

  protected readonly pinned = signal(PINNED_COMMANDS);
  protected readonly account = computed(() => ACCOUNT_COMMANDS.filter((c) => c.command !== this.commandToFilter()));

  protected readonly application = signal(APPLICATION_COMMANDS);

}

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
