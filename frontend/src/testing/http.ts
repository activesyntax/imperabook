import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

export const provideHttpTesting = () => [
  provideHttpClient(),
  provideHttpClientTesting(),
];

// Answer the eager command-registry fetch so the app can reach stability.
export function flushCommandRegistry(commands: unknown[] = []): void {
  TestBed.inject(HttpTestingController)
    .expectOne('/api/commands')
    .flush(commands);
}
