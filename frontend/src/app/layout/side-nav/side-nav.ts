import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { CommandSpec } from '@core/model';
import { CommandProvider } from '@app/commands/command-provider';
import { UserBadge } from '@app/layout/user-badge/user-badge';

@Component({
  selector: 'app-side-nav',
  imports: [UserBadge, NgTemplateOutlet],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNav {
  private readonly commands = inject(CommandProvider);

  readonly name = input.required<string>();
  readonly library = input.required<string>();
  readonly avatarUrl = input<string | null>(null);



  protected readonly userLoggedIn = signal(true);
  protected readonly commandToFilter = computed(() => !this.userLoggedIn() ? 'logout' : 'login');

  protected readonly pinned = computed(() => this.group('fixed'));
  protected readonly account = computed(() => this.group('account').filter((c) => c.command !== this.commandToFilter()));

  protected readonly application = computed(() => this.group('application'));

  private group(group: string): readonly CommandSpec[] {
    return this.commands
      .all()
      .filter((c) => c.group === group)
      .toSorted((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
}
