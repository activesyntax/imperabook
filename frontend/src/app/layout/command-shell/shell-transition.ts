import { Browsing, Collecting, Filling, Running, browsing, running } from "./shell-state";
import { UiInput } from "./ui-input";
import { CommandSpec } from "@core/model";
import * as Param from "./param-model";
import { Index, IndexMove, indexRange, nextCyclicIndex, prevCyclicIndex } from "@core/index";
import { State, step, start, idle, query, ShellDeps, Step } from "./shell";


export function transition(state: State, input: UiInput, deps: ShellDeps): Step {
  switch (state.kind) {
    case 'browsing': return fromBrowsing(state, input, deps);
    case 'collecting': return fromCollecting(state, input, deps);
    case 'filling': return fromFilling(state, input, deps);
    case 'running': return fromRunning(state, input, deps);
  }
}

function fromBrowsing(s: Browsing, i: UiInput, deps: ShellDeps): Step {
  switch (i.kind) {
    case 'text': return step(retyped(s, i.value, deps));
    case 'move': return step(moved(s, i.dir, deps));
    case 'commit': return committed(s, deps);
    case 'submit': return start(s, selectedOf(s, deps));
    case 'cancel': return idle(deps);
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

///////////////////////////////


function completion(s: Browsing, cmd: CommandSpec | undefined): Browsing | undefined {
  if (cmd === undefined || cmd.command === query(s.text).toLowerCase()) return undefined;
  return browsing(cmd.command, 0);
}

function retyped(s: Browsing, value: string, deps: ShellDeps): Browsing {
  const q = query(value);
  if (q.length <= 0) return browsing(value, undefined);

  return browsing(value, deps.suggestionsFor(q).length > 0 ? 0 : undefined);
}

function moved(s: Browsing, dir: 'next' | 'prev', deps: ShellDeps): Browsing {
  const matches = deps.suggestionsFor(query(s.text));

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

// =================================================

export function suggestionsOf(state: State, deps: ShellDeps): readonly CommandSpec[] {
  return state.kind === 'browsing' ? deps.suggestionsFor(query(state.text)) : [];
}

export function selectedIndexOf(state: State, deps: ShellDeps): Index {
  if (state.kind !== 'browsing') return undefined;

  const matches = suggestionsOf(state, deps);
  if (matches.length === 0) return undefined;

  return state.selected !== undefined && state.selected < matches.length ? state.selected : undefined;
}

export function selectedOf(state: State, deps: ShellDeps): CommandSpec | undefined {
  const index = selectedIndexOf(state, deps);
  return index === undefined ? undefined : suggestionsOf(state, deps)[index];
}

export function activeOf(state: State, deps: ShellDeps): CommandSpec | undefined {
  return state.kind === 'browsing' ? selectedOf(state, deps) : state.cmd;
}
