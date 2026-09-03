// import { Index } from '@core/index';
// import { CommandSpec } from '@core/model';
// import * as Param from './param-model';
//
// export type Browsing = {
//   readonly kind: 'browsing';
//   readonly text: string;
//   readonly selected: Index;
// };
//
// export type Collecting = {
//   readonly kind: 'collecting';
//   readonly cmd: CommandSpec;
//   readonly params: Param.Prompting;
// };
//
// export type Filling = {
//   readonly kind: 'filling';
//   readonly cmd: CommandSpec;
//   readonly params: Param.Filling;
// };
//
// export type Running = {
//   readonly kind: 'running';
//   readonly cmd: CommandSpec;
// };
//
//
//
// export function browsing(text = '', selected: Index = undefined): Browsing {
//   return { kind: 'browsing', text, selected };
// }
//
// export function filing(cmd: CommandSpec, params: Param.Filling): Filling {
//   return { kind: 'filling', cmd, params };
// }
// export const running = (cmd: CommandSpec): Running =>
//   ({ kind: 'running', cmd });
//
//
//
