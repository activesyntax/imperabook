import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.html',
  styleUrl: './user-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserBadge {
  readonly name = input.required<string>();
  readonly library = input.required<string>();
  readonly avatarUrl = input<string | null>(null);

  readonly initials = computed(() =>
    this.name()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]!.toUpperCase())
      .join(''),
  );
}
