import { Index } from '@core/index';
import { CommandSpec } from '@core/model';
import * as Param from './param-model';

export type Browsing = {
  readonly kind: 'browsing';
  readonly text: string;
  readonly selected: Index;
};

export type Collecting = {
  readonly kind: 'collecting';
  readonly cmd: CommandSpec;
  readonly params: Param.Prompting;
};

export type Filling = {
  readonly kind: 'filling';
  readonly cmd: CommandSpec;
  readonly params: Param.Specifying;
};

export type Running = {
  readonly kind: 'running';
  readonly cmd: CommandSpec;
};

export type ShellState = Browsing | Collecting | Filling | Running;



// HELPERS
//
export const browsing = (text = '', selected: Index = undefined): Browsing =>
  ({ kind: 'browsing', text, selected });

export const running = (cmd: CommandSpec): Running =>
  ({ kind: 'running', cmd });
