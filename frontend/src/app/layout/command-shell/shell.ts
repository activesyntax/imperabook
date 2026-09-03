// import { Browsing, Collecting, Filling, Running, browsing, running } from "./shell-state";
// import * as Param from "./param-model";
// import { CommandParameter, CommandSpec } from "@core/model";
// import { CommandInput } from "@app/commands/command-runner";
// import { signal } from "@angular/core";
//
//
//
// // Model
// export type State = Browsing | Filling | Running;
//
// export type Effect =
//   | { readonly kind: 'open'; readonly cmd: CommandSpec }
//   | { readonly kind: 'run'; readonly cmd: CommandSpec; readonly answers: CommandInput };
//
//
// export interface ShellDeps {
//   readonly suggestionsFor: (query: string) => readonly CommandSpec[];
//
//   readonly forcedCommand: () => CommandSpec | undefined;
// }
//
// export interface Step {
//   readonly state: State;
//   readonly effects: readonly Effect[];
// }
//
// export type UiInput = 'Enter' | 'Tab' | 'Escape';
//
// // =============================================================
//
// export const step = (state: State, effects: readonly Effect[] = []): Step => ({ state, effects });
//
// export function initial(deps: ShellDeps): Step {
//   return idle(deps);
// }
//
// export function idle(deps: ShellDeps): Step {
//   const forced = deps.forcedCommand();
//   return forced === undefined ? step(browsing()) : start(browsing(), forced);
// }
//
// export function start(s: Browsing, cmd: CommandSpec | undefined): Step {
//   console.log('start command', s, cmd);
//   return step(s);
// }
//
// export function text(state: State): string {
//   switch (state.kind) {
//     case 'browsing': return state.text;
//     case 'filling': return `$PARAMETERS: {state.params.parameters.length}`;
//     case 'running': return '';
//   }
// }
//
// export const query = (text: string): string => text.trim();
//
