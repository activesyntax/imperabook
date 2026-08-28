import { CommandParameter, CommandSpec } from '@core/model';
import { CommandInput } from '@app/commands/command-runner';
import { Index, IndexMove, indexRange, nextCyclicIndex, prevCyclicIndex } from '@core/index';
import { UiInput } from './ui-input';
import * as Param from './param-model';
import { ShellState, Browsing, Running, Filling, Collecting, browsing, running } from './shell-state';

export type Effect =
  | { readonly kind: 'open'; readonly cmd: CommandSpec }
  | { readonly kind: 'run'; readonly cmd: CommandSpec; readonly answers: CommandInput };

export interface Step {
  readonly state: ShellState;
  readonly effects: readonly Effect[];
}

const step = (state: ShellState, effects: readonly Effect[] = []): Step => ({ state, effects });

export interface ShellDeps {
  readonly suggestionsFor: (query: string) => readonly CommandSpec[];

  readonly forcedCommand: () => CommandSpec | undefined;
}

export const queryOf = (text: string): string => text.trim();

export function textOf(state: ShellState): string {
  switch (state.kind) {
    case 'browsing': return state.text;
    case 'collecting': return Param.draftOf(state.params);
    case 'filling': return `$PARAMETERS: {state.params.parameters.length}`;
    case 'running': return '';
  }
}

export function suggestionsOf(state: ShellState, deps: ShellDeps): readonly CommandSpec[] {
  return state.kind === 'browsing' ? deps.suggestionsFor(queryOf(state.text)) : [];
}

export function selectedIndexOf(state: ShellState, deps: ShellDeps): Index {
  if (state.kind !== 'browsing') return undefined;

  const matches = suggestionsOf(state, deps);
  if (matches.length === 0) return undefined;

  return state.selected !== undefined && state.selected < matches.length ? state.selected : undefined;
}

export function selectedOf(state: ShellState, deps: ShellDeps): CommandSpec | undefined {
  const index = selectedIndexOf(state, deps);
  return index === undefined ? undefined : suggestionsOf(state, deps)[index];
}

export function activeOf(state: ShellState, deps: ShellDeps): CommandSpec | undefined {
  return state.kind === 'browsing' ? selectedOf(state, deps) : state.cmd;
}

export function pendingParameter(state: ShellState): CommandParameter | undefined {
  return state.kind === 'collecting' ? Param.current(state.params) : undefined;
}

export function progressOf(state: ShellState): { readonly index: number; readonly total: number } | undefined {
  return state.kind === 'collecting' ? Param.progressOf(state.params) : undefined;
}

export function blockedOf(state: ShellState): boolean {
  return state.kind === 'collecting' && Param.isBlockedNow(state.params);
}

export function credentialModeOf(state: ShellState): boolean {
  return state.kind === 'collecting' && state.cmd.parameters.some((p) => p.credential !== undefined);
}

// ── TRANSITION ─────────────────────────────────────────────────────────────────

export function transition(state: ShellState, input: UiInput, deps: ShellDeps): Step {
  switch (state.kind) {
    case 'browsing': return fromBrowsing(state, input, deps);
    case 'collecting': return fromCollecting(state, input, deps);
    case 'filling': return fromFilling(state, input, deps);
    case 'running': return fromRunning(state, input, deps);
  }
}

export function initial(deps: ShellDeps): Step {
  return idle(deps);
}

function idle(deps: ShellDeps): Step {
  const forced = deps.forcedCommand();
  return forced === undefined ? step(browsing()) : start(browsing(), forced);
}

function fromBrowsing(s: Browsing, i: UiInput, deps: ShellDeps): Step {
  switch (i.kind) {
    case 'text': return step(retyped(s, i.value, deps));
    case 'move': return step(moved(s, i.dir, deps));
    case 'commit': return committed(s, deps);
    case 'submit': return start(s, selectedOf(s, deps));
    case 'cancel': return idle(deps);   // parancsmódban az Escape csak ürít
    case 'back': return step(s);
    case 'completed': return idle(deps);
  }
}

function fromCollecting(s: Collecting, i: UiInput, deps: ShellDeps): Step {
  const outcome = Param.transition(s.params, i);

  switch (outcome.kind) {
    case 'prompting': return step({ ...s, params: outcome.state });
    case 'done': return step(running(s.cmd), [{ kind: 'run', cmd: s.cmd, answers: outcome.answers }]);
    case 'aborted': return idle(deps);
  }
}

function fromFilling(s: Filling, i: UiInput, deps: ShellDeps): Step {
  return idle(deps)
}

function fromRunning(s: Running, i: UiInput, deps: ShellDeps): Step {
  return i.kind === 'completed' ? idle(deps) : step(s);
}

function retyped(s: Browsing, value: string, deps: ShellDeps): Browsing {
  const query = queryOf(value);
  if (query.length <= 0) return browsing(value, undefined);

  return browsing(value, deps.suggestionsFor(query).length > 0 ? 0 : undefined);
}

function moved(s: Browsing, dir: 'next' | 'prev', deps: ShellDeps): Browsing {
  const matches = deps.suggestionsFor(queryOf(s.text));

  if (matches.length === 1) {
    const completed = completion(s, selectedOf(s, deps));
    if (completed !== undefined) return completed;
  }

  const change: IndexMove = dir === 'prev' ? prevCyclicIndex : nextCyclicIndex;
  return browsing(s.text, change(indexRange(matches.length), selectedIndexOf(s, deps)));
}

function committed(s: Browsing, deps: ShellDeps): Step {
  const cmd = selectedOf(s, deps);
  const completed = completion(s, cmd);
  return completed !== undefined ? step(completed) : start(s, cmd);
}

function completion(s: Browsing, cmd: CommandSpec | undefined): Browsing | undefined {
  if (cmd === undefined || cmd.command === queryOf(s.text).toLowerCase()) return undefined;
  return browsing(cmd.command, 0);
}

function start(s: Browsing, cmd: CommandSpec | undefined): Step {
  if (cmd === undefined) return step(s);

  const params = Param.begin(cmd.parameters);
  return params === undefined
    ? step(running(cmd), [{ kind: 'run', cmd, answers: {} }])
    : step({ kind: 'collecting', cmd, params }, [{ kind: 'open', cmd }]);
}
