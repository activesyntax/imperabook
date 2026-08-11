import { CommandParameter } from '@core/model';
import { CommandInput } from '@app/commands/command-runner';
import { UiInput } from './ui-input';

/**
 * A bevitelmód állapotgépe. Nem tud a shellről, nem tud parancsokról — csak
 * paraméterlistát kap, és válaszokat gyűjt. Egyetlen állapota van, mert a
 * "hányadik paraméternél tartunk" származtatható az answers hosszából.
 */
export type Prompting = {
  readonly kind: 'prompting';
  readonly parameters: readonly CommandParameter[];
  readonly answers: readonly string[]; // a parameters sorrendjében, a már rögzítettek
  readonly draft: string;              // az épp gépelt válasz
};

/**
 * Az átmenet eredménye. A 'done' és az 'aborted' a gép kilépési pontjai —
 * ezeket a hívó (a shell) értelmezi, a gép maga nem tudja, mi történik utánuk.
 */
export type Outcome =
  | { readonly kind: 'prompting'; readonly state: Prompting }
  | { readonly kind: 'done'; readonly answers: CommandInput }
  | { readonly kind: 'aborted' };

const prompting = (state: Prompting): Outcome => ({ kind: 'prompting', state });
const done = (answers: CommandInput): Outcome => ({ kind: 'done', answers });
const aborted: Outcome = { kind: 'aborted' };

/** Belépés. `undefined`, ha nincs mit bekérni — a hívó ilyenkor át se lép ide. */
export function begin(parameters: readonly CommandParameter[]): Prompting | undefined {
  return parameters.length > 0
    ? { kind: 'prompting', parameters, answers: [], draft: '' }
    : undefined;
}

// ── származtatott nézetek ───────────────────────────────────────────────────

export const draftOf = (s: Prompting): string => s.draft;

/** A soron következő, még megválaszolatlan paraméter. */
export const current = (s: Prompting): CommandParameter | undefined =>
  s.parameters[s.answers.length];

export const progressOf = (s: Prompting): { readonly index: number; readonly total: number } =>
  ({ index: s.answers.length + 1, total: s.parameters.length });

/** Kötelező mező üresen — a commit ilyenkor nem lép tovább. */
export function isBlocked(s: Prompting): boolean {
  const param = current(s);
  return param !== undefined && param.required && s.draft.trim().length === 0;
}

// ── átmenet ─────────────────────────────────────────────────────────────────

export function transition(s: Prompting, i: UiInput): Outcome {
  switch (i.kind) {
    case 'text':
      return prompting({ ...s, draft: i.value });

    // Enter és a küldés gomb egyaránt: válasz rögzítése.
    case 'commit':
    case 'submit':
      return record(s);

    // Escape: az egész bekérés megszakad. (Parancsmódban ugyanez csak ürít.)
    case 'cancel':
      return aborted;

    // Backspace üres mezőn, illetve Shift+Tab: vissza az előző válaszhoz.
    case 'back':
      return retreat(s);
    case 'move':
      return i.dir === 'prev' ? retreat(s) : prompting(s);

    case 'completed':
      return prompting(s);
  }
}

function record(s: Prompting): Outcome {
  if (isBlocked(s)) return prompting(s); // kötelező mező, üres válasz

  const answers = [...s.answers, s.draft];

  return answers.length < s.parameters.length
    ? prompting({ ...s, answers, draft: '' })
    : done(inputOf(s.parameters, answers));
}

/** Az utolsó választ visszaemeli a draftba; az elsőnél kilép. */
function retreat(s: Prompting): Outcome {
  const previous = s.answers.at(-1);
  if (previous === undefined) return aborted;

  return prompting({ ...s, answers: s.answers.slice(0, -1), draft: previous });
}

function inputOf(parameters: readonly CommandParameter[], answers: readonly string[]): CommandInput {
  return Object.fromEntries(
    parameters.map((p, i) => [p.name, answers[i] ?? ''] as const)
  );
}
