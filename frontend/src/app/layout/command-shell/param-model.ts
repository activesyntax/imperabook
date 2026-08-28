import { CommandParameter } from '@core/model';
import { CommandInput } from '@app/commands/command-runner';
import { UiInput } from './ui-input';

export type Answer = string | undefined;

export type Prompting = {
  readonly kind: 'prompting';
  readonly parameters: readonly CommandParameter[];
  readonly answers: readonly Answer[];
  readonly draft: string;
  readonly blocked: boolean;
};

export type Specifying = {
  readonly kind: 'specifying';
  readonly parameters: readonly CommandParameter[];
}

export type Outcome =
  | { readonly kind: 'prompting'; readonly state: Prompting }
  | { readonly kind: 'done'; readonly answers: CommandInput }
  | { readonly kind: 'aborted' };

const prompting = (state: Prompting): Outcome => ({ kind: 'prompting', state });
const done = (answers: CommandInput): Outcome => ({ kind: 'done', answers });
const aborted: Outcome = { kind: 'aborted' };

export function begin(parameters: readonly CommandParameter[]): Prompting | undefined {
  return parameters.length > 0
    ? { kind: 'prompting', parameters, answers: [], draft: '', blocked: false }
    : undefined;
}


export const draftOf = (s: Prompting): string => s.draft;

export const isBlockedNow = (s: Prompting): boolean => s.blocked;

export const current = (s: Prompting): CommandParameter | undefined =>
  s.parameters[s.answers.length];

export const progressOf = (s: Prompting): { readonly index: number; readonly total: number } =>
  ({ index: s.answers.length + 1, total: s.parameters.length });

export function isBlocked(s: Prompting): boolean {
  const param = current(s);
  return param !== undefined && param.required && s.draft.trim().length === 0;
}


export function transition(s: Prompting, i: UiInput): Outcome {
  switch (i.kind) {
    case 'text':
      return prompting({ ...s, draft: i.value, blocked: false });

    case 'commit':
    case 'submit':
      return record(s);

    case 'cancel':
      return aborted;

    case 'back':
      return retreat(s);
    case 'move':
      return i.dir === 'prev' ? retreat(s) : prompting(s);

    case 'completed':
      return prompting(s);
  }
}

function record(s: Prompting): Outcome {
  if (isBlocked(s)) return prompting({ ...s, blocked: true });

  const value = s.draft.trim();
  const answers: readonly Answer[] = [...s.answers, value.length > 0 ? value : undefined];

  return answers.length < s.parameters.length
    ? prompting({ ...s, answers, draft: '', blocked: false })
    : done(inputOf(s.parameters, answers));
}

function retreat(s: Prompting): Outcome {
  if (s.answers.length === 0) return aborted;

  return prompting({
    ...s,
    answers: s.answers.slice(0, -1),
    draft: s.answers.at(-1) ?? '',
    blocked: false,
  });
}

function inputOf(parameters: readonly CommandParameter[], answers: readonly Answer[]): CommandInput {
  return Object.fromEntries(parameters.map((p, i) => [p.name, answers[i]] as const));
}
