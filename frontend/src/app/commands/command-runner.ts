import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

import { CommandParameter, CommandSpec } from '@core/model';
import type { CommandResult } from '@workspace/views/view-node';
import { CommandRegistry } from '@app/commands/command-registry';

export type CommandInput = Readonly<Record<string, string | undefined>>;

/** ADR 18: a vezérlőcsatorna egyetlen végpontja. */
const CONTROL_CHANNEL = '/api/command';

@Injectable({ providedIn: 'root' })
export class CommandRunner {
  private readonly http = inject(HttpClient);
  private readonly registry = inject(CommandRegistry);

  /**
   * Nyitó kör. A vezérlőcsatornán megy — kivéve, ha a nézetét már megkaptuk: a `login`
   * ajtaja a bootstrap válaszában érkezett, és session nélkül a vezérlőcsatorna zárva van.
   */
  async open(cmd: CommandSpec): Promise<CommandResult | null> {
    const prefetched = this.registry.openedView(cmd.command);
    if (prefetched !== null) {
      return prefetched;
    }

    // Session nélkül nincs mit kérni: a vezérlőcsatorna zárva, és a képernyőn már ott van,
    // amit a szerver mondott. A bekérés nézet nélkül folytatódik.
    if (!this.registry.authenticated()) {
      return null;
    }

    return this.send(this.http.post<CommandResult>(CONTROL_CHANNEL, { command: cmd.command }));
  }

  /**
   * Commit kör. Itt — és csak itt — számít az `endpoint`: a titkot vivő parancs nem mehet
   * át a composed-text parseren, mert az naplózódik és nincs escape-szabálya.
   */
  async run(cmd: CommandSpec, answers: CommandInput): Promise<CommandResult> {
    const endpoint = cmd.endpoint;

    const result = await this.send(
      endpoint !== undefined
        ? this.http.post<CommandResult>(endpoint, directBody(cmd.parameters, answers))
        : this.http.post<CommandResult>(CONTROL_CHANNEL, controlBody(cmd, answers)),
    );

    if (cmd.refreshesSession === true) {
      await this.registry.refresh();
    }

    return result;
  }

  /**
   * A 401 nem csak a bejelentkezésnél fordulhat elő: egy lejárt session bármelyik parancs
   * közben ide vezet. A válasz maga hozza a nézetet (ADR 26), a jegyzéket viszont vissza
   * kell állítani — különben a shell olyan parancsokat kínál, amiket a szerver már elutasít.
   */
  private async send(request: Observable<CommandResult>): Promise<CommandResult> {
    try {
      return await firstValueFrom(request);
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 401 && this.registry.authenticated()) {
        await this.registry.refresh();
      }
      throw error;
    }
  }
}
// ── vezérlőcsatorna (ADR 17/18) ─────────────────────────────────────────────

function controlBody(cmd: CommandSpec, answers: CommandInput): unknown {
  const text = composeText(cmd.parameters, answers);
  return text.length > 0 ? { command: cmd.command, text } : { command: cmd.command };
}

/**
 * ADR 17: minden válasz a connective-je után, mindig idézőjelben — feltétel
 * nélkül, hogy a frontend soha ne hozzon tartalomfüggő döntést az escapelésről.
 *
 * A katalógusban ma nincs `connective` mező, ezért a paraméternév áll a helyén.
 * Amint a `CommandParameter` megkapja, itt egy sor cserélődik.
 */
function composeText(parameters: readonly CommandParameter[], answers: CommandInput): string {
  return parameters
    .map((p) => [p, answers[p.name]] as const)
    .filter((entry): entry is readonly [CommandParameter, string] => entry[1] !== undefined)
    .map(([p, value]) => `${p.name} "${escapeQuotes(value)}"`)
    .join(' ');
}

const escapeQuotes = (value: string): string =>
  value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

// ── saját végpont ───────────────────────────────────────────────────────────

/**
 * A válaszok mezőnként, JSON objektumként. A meg nem válaszolt opcionális mezők
 * kimaradnak, így a szerveren `null` lesz belőlük, nem üres string.
 */
function directBody(
  parameters: readonly CommandParameter[],
  answers: CommandInput,
): Record<string, string> {
  return Object.fromEntries(
    parameters
      .map((p) => [p.name, answers[p.name]] as const)
      .filter((entry): entry is readonly [string, string] => entry[1] !== undefined),
  );
}
