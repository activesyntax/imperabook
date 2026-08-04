import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { CommandProvider } from '@app/commands/command-provider';
import { UserBadge } from '@app/layout/user-badge/user-badge';

@Component({
  selector: 'app-side-nav',
  imports: [UserBadge],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNav {
  private readonly commands = inject(CommandProvider);

  readonly name = input.required<string>();
  readonly library = input.required<string>();
  readonly avatarUrl = input<string | null>(null);

  protected readonly pinned = computed(() =>
    this.commands
      .all()
      .filter((c) => c.group === 'fixed')
      .toSorted((a, b) => (a.order ?? 0) - (b.order ?? 0)),
  );
}
