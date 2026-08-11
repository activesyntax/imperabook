import { CommandParameter, CommandSpec } from '@core/model';
import { CommandInput } from '@app/commands/command-runner';
import { Index, IndexMove, indexRange, nextCyclicIndex, prevCyclicIndex } from '@core/index';
import { UiInput } from './ui-input';
import * as Param from './param-model';

// ── állapotok ───────────────────────────────────────────────────────────────

export type Browsing = {
  readonly kind: 'browsing';
  readonly text: string;
  readonly selected: Index;
};

/**
 * Bevitelmód. A shell csak annyit tud róla, MELYIK parancsért fut — a
 * billentyűértelmezés teljes egészében a paramétergépé.
 */
export type Collecting = {
  readonly kind: 'collecting';
  readonly cmd: CommandSpec;
  readonly params: Param.Prompting;
};

export type Running = {
  readonly kind: 'running';
  readonly cmd: CommandSpec;
};

export type ShellState = Browsing | Collecting | Running;

export const browsing = (text = '', selected: Index = undefined): Browsing =>
  ({ kind: 'browsing', text, selected });

export const running = (cmd: CommandSpec): Running =>
  ({ kind: 'running', cmd });

// ── effektek ────────────────────────────────────────────────────────────────

export type Effect = {
  readonly kind: 'run';
  readonly cmd: CommandSpec;
  readonly answers: CommandInput;
};

export interface Step {
  readonly state: ShellState;
  readonly effects: readonly Effect[];
}

const step = (state: ShellState, effects: readonly Effect[] = []): Step => ({ state, effects });

export interface ShellDeps {
  readonly suggestionsFor: (query: string) => readonly CommandSpec[];
}

// ── származtatott nézetek ───────────────────────────────────────────────────
// A komponensnek elég ezt az egy modult ismernie; a Param felé itt megy a híd.

export const queryOf = (text: string): string => text.trim();

export function textOf(state: ShellState): string {
  switch (state.kind) {
    case 'browsing': return state.text;
    case 'collecting': return Param.draftOf(state.params);
    case 'running': return '';
  }
}

export function suggestionsOf(state: ShellState, deps: ShellDeps): readonly CommandSpec[] {
  return state.kind === 'browsing' ? deps.suggestionsFor(queryOf(state.text)) : [];
}

export function selectedOf(state: ShellState, deps: ShellDeps): CommandSpec | undefined {
  if (state.kind !== 'browsing' || state.selected === undefined) return undefined;
  return deps.suggestionsFor(queryOf(state.text))[state.selected];
}

/** Az épp futó, bekérés alatt álló vagy kiválasztott parancs — a leíráshoz. */
export function activeOf(state: ShellState, deps: ShellDeps): CommandSpec | undefined {
  return state.kind === 'browsing' ? selectedOf(state, deps) : state.cmd;
}

export function pendingParameter(state: ShellState): CommandParameter | undefined {
  return state.kind === 'collecting' ? Param.current(state.params) : undefined;
}

export function progressOf(state: ShellState): { readonly index: number; readonly total: number } | undefined {
  return state.kind === 'collecting' ? Param.progressOf(state.params) : undefined;
}

// ── átmenet ─────────────────────────────────────────────────────────────────

export function transition(state: ShellState, input: UiInput, deps: ShellDeps): Step {
  switch (state.kind) {
    case 'browsing': return fromBrowsing(state, input, deps);
    case 'collecting': return fromCollecting(state, input);
    case 'running': return fromRunning(state, input);
  }
}

function fromBrowsing(s: Browsing, i: UiInput, deps: ShellDeps): Step {
  switch (i.kind) {
    case 'text': return step(retyped(s, i.value, deps));
    case 'move': return step(moved(s, i.dir, deps));
    case 'commit': return committed(s, deps);
    case 'submit': return start(selectedOf(s, deps));
    case 'cancel': return step(browsing());   // parancsmódban az Escape csak ürít
    case 'back':
    case 'completed': return step(s);
  }
}

/** A teljes bevitelmódot a paramétergép kezeli; a shell csak a kilépést fordítja le. */
function fromCollecting(s: Collecting, i: UiInput): Step {
  const outcome = Param.transition(s.params, i);

  switch (outcome.kind) {
    case 'prompting': return step({ ...s, params: outcome.state });
    case 'done': return step(running(s.cmd), [{ kind: 'run', cmd: s.cmd, answers: outcome.answers }]);
    case 'aborted': return step(browsing());
  }
}

function fromRunning(s: Running, i: UiInput): Step {
  return i.kind === 'completed' ? step(browsing()) : step(s);
}

// ── parancsmód részletei ────────────────────────────────────────────────────

/** Gépelés: üres lekérdezésnél nincs kiválasztás, egyébként az első találat. */
function retyped(s: Browsing, value: string, deps: ShellDeps): Browsing {
  const query = queryOf(value);
  if (query.length <= 0) return browsing(value, undefined);

  const matchIndex = deps.suggestionsFor(query).findIndex(c => c.command.includes(query));
  return browsing(value, matchIndex < 0 ? undefined : matchIndex);
}

/** Tab: egyetlen találatnál előbb kiegészít, utána ciklikusan lépked. */
function moved(s: Browsing, dir: 'next' | 'prev', deps: ShellDeps): Browsing {
  const matches = deps.suggestionsFor(queryOf(s.text));

  if (matches.length === 1) {
    const completed = completion(s, selectedOf(s, deps));
    if (completed !== undefined) return completed;
  }

  const change: IndexMove = dir === 'prev' ? prevCyclicIndex : nextCyclicIndex;
  return browsing(s.text, change(indexRange(matches.length), s.selected));
}

/** Enter: első nyomásra kiegészít, a másodikra futtat. */
function committed(s: Browsing, deps: ShellDeps): Step {
  const cmd = selectedOf(s, deps);
  const completed = completion(s, cmd);
  return completed !== undefined ? step(completed) : start(cmd);
}

function completion(s: Browsing, cmd: CommandSpec | undefined): Browsing | undefined {
  if (cmd === undefined || cmd.command === queryOf(s.text).toLowerCase()) return undefined;
  return browsing(cmd.command, 0);
}

/** Indítás: paraméter nélkül azonnal fut, egyébként átadja a paramétergépnek. */
function start(cmd: CommandSpec | undefined): Step {
  if (cmd === undefined) return step(browsing());

  const params = Param.begin(cmd.parameters);
  return params === undefined
    ? step(running(cmd), [{ kind: 'run', cmd, answers: {} }])
    : step({ kind: 'collecting', cmd, params });
}
