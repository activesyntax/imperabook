import { CommandParameter } from '@core/model';
import { CommandInput } from '@app/commands/command-runner';
import { UiInput } from './ui-input';

/**
 * Egy rögzített válasz. Az `undefined` a meg nem válaszolt opcionális mező —
 * nem üres string, mert az „üresen hagyta" és a „üres értéket adott meg"
 * két különböző állítás, és csak az egyik jut el a szerverig.
 */
export type Answer = string | undefined;

/**
 * A bevitelmód állapotgépe. Nem tud a shellről, nem tud parancsokról — csak
 * paraméterlistát kap, és válaszokat gyűjt. A "hányadik paraméternél tartunk"
 * származtatható az answers hosszából.
 */
export type Prompting = {
  readonly kind: 'prompting';
  readonly parameters: readonly CommandParameter[];
  readonly answers: readonly Answer[]; // a parameters sorrendjében, a már rögzítettek
  readonly draft: string;              // az épp gépelt válasz
  readonly blocked: boolean;           // kötelező mezőn üresen próbált továbblépni
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
    ? { kind: 'prompting', parameters, answers: [], draft: '', blocked: false }
    : undefined;
}

// ── származtatott nézetek ───────────────────────────────────────────────────

export const draftOf = (s: Prompting): string => s.draft;

export const isBlockedNow = (s: Prompting): boolean => s.blocked;

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
    // Bármilyen gépelés feloldja a blokkolt jelzést: a felhasználó reagált rá.
    case 'text':
      return prompting({ ...s, draft: i.value, blocked: false });

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
  // Kötelező mező üresen: nem lépünk tovább, és ezt látható állapotként rögzítjük.
  if (isBlocked(s)) return prompting({ ...s, blocked: true });

  const value = s.draft.trim();
  const answers: readonly Answer[] = [...s.answers, value.length > 0 ? value : undefined];

  return answers.length < s.parameters.length
    ? prompting({ ...s, answers, draft: '', blocked: false })
    : done(inputOf(s.parameters, answers));
}

/**
 * Az utolsó választ visszaemeli a draftba; az elsőnél kilép.
 *
 * A jelenlét-vizsgálat a hosszon áll, nem az érték `undefined` voltán: egy
 * átugrott opcionális mező rögzített válasz, csak épp üres.
 */
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
