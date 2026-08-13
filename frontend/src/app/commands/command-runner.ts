import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { CommandParameter, CommandSpec } from '@core/model';
import type { CommandResult } from '@workspace/views/view-node';

/**
 * A begyűjtött válaszok: paraméternév → érték. Az `undefined` a meg nem
 * válaszolt opcionális mező; a kulcs jelen van, az érték hiányzik.
 */
export type CommandInput = Readonly<Record<string, string | undefined>>;

/** ADR 18: a vezérlőcsatorna egyetlen végpontja. */
const CONTROL_CHANNEL = '/api/command';

@Injectable({ providedIn: 'root' })
export class CommandRunner {
  private readonly http = inject(HttpClient);

  /**
   * Nyitó kör. MINDIG a vezérlőcsatornán megy — akkor is, ha a parancsnak saját
   * végpontja van. A nyitás nem visz titkot, csak a parancs nevét, és a válasza
   * egy nézet: a `login` ajtaja, egy `add book` üres űrlapja.
   */
  open(cmd: CommandSpec): Promise<CommandResult> {
    return firstValueFrom(
      this.http.post<CommandResult>(CONTROL_CHANNEL, { command: cmd.command }),
    );
  }

  /**
   * Commit kör. Itt — és csak itt — számít az `endpoint`: a titkot vivő parancs
   * nem mehet át a composed-text parseren, mert az naplózódik és nincs
   * escape-szabálya. A transport az egyetlen elágazási pont.
   */
  run(cmd: CommandSpec, answers: CommandInput): Promise<CommandResult> {
    const endpoint = cmd.endpoint;

    return firstValueFrom(
      endpoint !== undefined
        ? this.http.post<CommandResult>(endpoint, directBody(cmd.parameters, answers))
        : this.http.post<CommandResult>(CONTROL_CHANNEL, controlBody(cmd, answers)),
    );
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
