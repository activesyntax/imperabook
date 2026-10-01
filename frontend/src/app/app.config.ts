import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAppInitializer, inject } from '@angular/core';

import { routes } from './app.routes';
import { CommandRunner } from '@app/commands/command-runner';
import { WorkspaceStore } from '@app/state/workspace-store';
import { Session } from '@app/state/session';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAppInitializer(() => {
      // Open on the dashboard. Not awaited: the shell renders while it loads.
      const runner = inject(CommandRunner);
      const store = inject(WorkspaceStore);
      void runner.run({ command: 'dashboard', params: {} }).then((result) => store.setResult(result));
      // Who is signed in, for the side nav; independent of the dashboard request.
      void inject(Session).refresh();
    }),
  ]
};
