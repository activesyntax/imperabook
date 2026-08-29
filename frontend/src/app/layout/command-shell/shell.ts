import { Browsing, Collecting, Filling, Running, browsing, running } from "./shell-state";
import * as Param from "./param-model";
import { CommandParameter, CommandSpec } from "@core/model";
import { CommandInput } from "@app/commands/command-runner";


// Model
export type State = Browsing | Collecting | Filling | Running;

export type Effect =
  | { readonly kind: 'open'; readonly cmd: CommandSpec }
  | { readonly kind: 'run'; readonly cmd: CommandSpec; readonly answers: CommandInput };


export interface ShellDeps {
  readonly suggestionsFor: (query: string) => readonly CommandSpec[];

  readonly forcedCommand: () => CommandSpec | undefined;
}

export interface Step {
  readonly state: State;
  readonly effects: readonly Effect[];
}

// =============================================================

export const step = (state: State, effects: readonly Effect[] = []): Step => ({ state, effects });

export function initial(deps: ShellDeps): Step {
  return idle(deps);
}

export function idle(deps: ShellDeps): Step {
  const forced = deps.forcedCommand();
  return forced === undefined ? step(browsing()) : start(browsing(), forced);
}

export function start(s: Browsing, cmd: CommandSpec | undefined): Step {
  if (cmd === undefined) return step(s);

  const params = Param.begin(cmd.parameters);
  return params === undefined
    ? step(running(cmd), [{ kind: 'run', cmd, answers: {} }])
    : step({ kind: 'collecting', cmd, params }, [{ kind: 'open', cmd }]);
}

export function text(state: State): string {
  switch (state.kind) {
    case 'browsing': return state.text;
    case 'collecting': return Param.draftOf(state.params);
    case 'filling': return `$PARAMETERS: {state.params.parameters.length}`;
    case 'running': return '';
  }
}

export const query = (text: string): string => text.trim();

export function pendingParameter(state: State): CommandParameter | undefined {
  return state.kind === 'collecting' ? Param.current(state.params) : undefined;
}

export function progressOf(state: State): { readonly index: number; readonly total: number } | undefined {
  return state.kind === 'collecting' ? Param.progressOf(state.params) : undefined;
}

export function blockedOf(state: State): boolean {
  return state.kind === 'collecting' && Param.isBlockedNow(state.params);
}

export function credentialModeOf(state: State): boolean {
  return state.kind === 'collecting' && state.cmd.parameters.some((p) => p.credential !== undefined);
}

