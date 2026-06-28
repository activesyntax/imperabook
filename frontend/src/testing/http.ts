// testing/http.ts
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

export const provideHttpTesting = () => [
  provideHttpClient(),
  provideHttpClientTesting(),
];

// TODO: this should be removed when the command-registry is moved to the
// backend
// Answer the eager command-registry fetch so the app can reach stability.
export function flushCommandRegistry(commands: unknown[] = []): void {
  TestBed.inject(HttpTestingController)
    .expectOne('/assets/commands.json')
    .flush(commands);
}
