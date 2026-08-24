import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import type { CommandSpec } from '@core/model';
import type { SessionView } from '@app/commands/command-registry';
import type { ViewNode } from '@workspace/views/view-node';

export const provideHttpTesting = () => [
  provideHttpClient(),
  provideHttpClientTesting(),
];

// Call after configureTestingModule — injecting earlier instantiates the TestBed.
export function httpTesting(): HttpTestingController {
  return TestBed.inject(HttpTestingController);
}

const TEST_SESSION: SessionView = {
  displayName: 'Test User',
  libraryName: 'Personal Library',
};

// Answer the command-registry fetch. The body is the CommandCatalogResponse envelope,
// not a bare array — a bare array leaves CommandRegistry.commands() undefined.
export function flushCommandRegistry(
  commands: readonly CommandSpec[] = [],
  session: SessionView = TEST_SESSION,
): void {
  httpTesting().expectOne('/api/commands').flush({ session, commands });
}

// The signed-out path: the registry 401s, then the bootstrap route answers. The two are
// separated by a microtask, so the caller must await between them.
export function flushRegistryUnauthorized(): void {
  httpTesting()
    .expectOne('/api/commands')
    .flush(null, { status: 401, statusText: 'Unauthorized' });
}

export function flushBootstrap(command: CommandSpec, views: readonly ViewNode[]): void {
  httpTesting().expectOne('/api/auth/bootstrap').flush({ command, views });
}
