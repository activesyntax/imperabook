import { inject, Injectable } from '@angular/core';
import { Command, CommandQuery, CommandSpec } from '@core/model';
import { CommandRegistry } from '@app/commands/command-registry';

export type CommandFilter = (command: CommandSpec) => boolean;

@Injectable({ providedIn: 'root' })
export class CommandProvider {
  private readonly registry = inject(CommandRegistry);

  readonly all = this.registry.commands;

  suggestionsFor(query: CommandQuery, commandFilter?: CommandFilter): CommandSpec[] {
    const filter = commandFilter ?? (() => true);

    const suggestedCommands = rank(this.all().filter(filter), query.trim());
    return suggestedCommands.length > 0 ? suggestedCommands : pickFeatured(this.all());
  }
}

const FEATURED: readonly Command[] = ['add book', 'list books', 'list authors'];

// TODO: command suggestion graph should be used instead of this approach
function pickFeatured(commands: readonly CommandSpec[]): CommandSpec[] {
  return FEATURED
    .map(id => commands.find(c => c.command === id))
    .filter((c): c is CommandSpec => c !== undefined);
}

function rank(commands: readonly CommandSpec[], query: CommandQuery): CommandSpec[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const qTokens = q.split(/\s+/);

  return commands
    .map(spec => ({ spec, score: score(spec, qTokens) }))
    .filter(x => x.score >= 0)
    .sort((a, b) => a.score - b.score || a.spec.command.localeCompare(b.spec.command))
    .map(x => x.spec);
}

function score(spec: CommandSpec, qTokens: readonly string[]): number {
  const cTokens = spec.command.toLowerCase().split(' ');
  const all = qTokens.every(q => cTokens.some(c => c.startsWith(q)));
  if (!all) return -1;
  if (spec.command.toLowerCase() === qTokens.join(' ')) return 0; // exact full command
  if (cTokens[0].startsWith(qTokens[0])) return 1;                // leading verb
  return 2;                                                       // contained token
}
