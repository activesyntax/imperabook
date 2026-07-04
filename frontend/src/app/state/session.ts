import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Session {
  readonly userName = signal('John Doe');
  readonly libraryName = signal('Personal Library');
  readonly avatarUrl = signal<string | null>(null);
}
