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

/**
 * A két kör. `open` a bekérés MELLÉ kért nézet — a login ajtaja, később az
 * `add book` piszkozata (UX.md); `run` maga a végrehajtás. Az `open` nem visz
 * választ, mert még nincs; épp ezért nem is vihet titkot.
 */
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

  /**
   * A parancs, amit a shellnek nincs miért nem futtatnia. Session nélkül a jegyzék
   * egyetlen elemű, tehát a `browsing` — ahol a felhasználó választ — nem létező
   * választást kínálna: üres sáv, egyetlen lehetőséggel, amit ki kell találni.
   *
   * Ez nem a komponens beavatkozása az állapotgépbe, hanem a gép bemenete, ugyanúgy,
   * ahogy a `suggestionsFor` is az. Ettől lesz minden tétlenné válás — indulás, kilépés,
   * megszakítás, visszautasított bejelentkezés — ugyanaz az egy átmenet.
   */
  readonly forcedCommand: () => CommandSpec | undefined;
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

/**
 * A kijelölt elem indexe — nem közvetlenül az állapoté.
 *
 * A tárolt `selected` a Tab-lépkedés emlékezete, de a lista, amire mutat,
 * később érkezik, mint az állapot (a registry HTTP-n jön). Ezért a tárolt index
 * a listához igazodik: érvénytelen vagy hiányzó kijelölés a legjobb találatra
 * esik vissza, üres lekérdezésnél pedig nincs kijelölés.
 */
export function selectedIndexOf(state: ShellState, deps: ShellDeps): Index {
  if (state.kind !== 'browsing' || queryOf(state.text).length === 0) return undefined;

  const matches = suggestionsOf(state, deps);
  if (matches.length === 0) return undefined;

  return state.selected !== undefined && state.selected < matches.length ? state.selected : 0;
}

export function selectedOf(state: ShellState, deps: ShellDeps): CommandSpec | undefined {
  const index = selectedIndexOf(state, deps);
  return index === undefined ? undefined : suggestionsOf(state, deps)[index];
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

/** Kötelező mezőn üresen próbált továbblépni — a template ezt jelzi ki. */
export function blockedOf(state: ShellState): boolean {
  return state.kind === 'collecting' && Param.isBlockedNow(state.params);
}

/**
 * Credential-bekérés fut-e.
 *
 * A jelző a PARANCSRA vonatkozik, nem a lépésre. A bekérés teljes idejére
 * dedikált input elem szolgál ki, akkor is, amikor épp a username-lépésnél
 * tartunk — az önmagában nem titok, de a Chrome a rá következő password-mezővel
 * összeköti, és a parancssort jelölné meg username-mezőnek (ADR 25).
 */
export function credentialModeOf(state: ShellState): boolean {
  return state.kind === 'collecting' && state.cmd.parameters.some((p) => p.credential !== undefined);
}

// ── átmenet ─────────────────────────────────────────────────────────────────

export function transition(state: ShellState, input: UiInput, deps: ShellDeps): Step {
  switch (state.kind) {
    case 'browsing': return fromBrowsing(state, input, deps);
    case 'collecting': return fromCollecting(state, input, deps);
    case 'running': return fromRunning(state, input, deps);
  }
}

/**
 * A kezdőállapot, ha a jegyzék már betöltött. A gép `browsing()`-gal jön létre, mert a
 * komponens a jegyzék előtt épül fel; ez az a lépés, ami utólag újraértékeli.
 */
export function initial(deps: ShellDeps): Step {
  return idle(deps);
}

/**
 * A tétlen állapot — ahányszor a shellnek nincs dolga. A `forcedCommand` létezése maga az
 * állítás, hogy nincs mit választani, és a gép ilyenkor nem vár, hanem lép.
 *
 * Nem ciklizál: a kényszerített parancs `collecting` vagy `running` állapotba visz, tehát
 * a következő tétlenné válás csak azután jöhet, hogy az véget ért — és ha addigra van
 * session, a `forcedCommand` már `undefined`-ot ad.
 */
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

/** A teljes bevitelmódot a paramétergép kezeli; a shell csak a kilépést fordítja le. */
function fromCollecting(s: Collecting, i: UiInput, deps: ShellDeps): Step {
  const outcome = Param.transition(s.params, i);

  switch (outcome.kind) {
    case 'prompting': return step({ ...s, params: outcome.state });
    case 'done': return step(running(s.cmd), [{ kind: 'run', cmd: s.cmd, answers: outcome.answers }]);
    case 'aborted': return idle(deps);
  }
}

function fromRunning(s: Running, i: UiInput, deps: ShellDeps): Step {
  return i.kind === 'completed' ? idle(deps) : step(s);
}

// ── parancsmód részletei ────────────────────────────────────────────────────

/**
 * Gépelés: üres lekérdezésnél nincs kiválasztás, egyébként a legjobb találat.
 *
 * A rangsort a suggestionsFor már elvégezte — a lista első eleme definíció
 * szerint a legjobb egyezés, így itt nincs második, gyengébb szűrés.
 */
function retyped(s: Browsing, value: string, deps: ShellDeps): Browsing {
  const query = queryOf(value);
  if (query.length <= 0) return browsing(value, undefined);

  return browsing(value, deps.suggestionsFor(query).length > 0 ? 0 : undefined);
}

/** Tab: egyetlen találatnál előbb kiegészít, utána ciklikusan lépked. */
function moved(s: Browsing, dir: 'next' | 'prev', deps: ShellDeps): Browsing {
  const matches = deps.suggestionsFor(queryOf(s.text));

  if (matches.length === 1) {
    const completed = completion(s, selectedOf(s, deps));
    if (completed !== undefined) return completed;
  }

  const change: IndexMove = dir === 'prev' ? prevCyclicIndex : nextCyclicIndex;
  return browsing(s.text, change(indexRange(matches.length), selectedIndexOf(s, deps)));
}

/** Enter: első nyomásra kiegészít, a másodikra futtat. */
function committed(s: Browsing, deps: ShellDeps): Step {
  const cmd = selectedOf(s, deps);
  const completed = completion(s, cmd);
  return completed !== undefined ? step(completed) : start(s, cmd);
}

function completion(s: Browsing, cmd: CommandSpec | undefined): Browsing | undefined {
  if (cmd === undefined || cmd.command === queryOf(s.text).toLowerCase()) return undefined;
  return browsing(cmd.command, 0);
}

/**
 * Indítás.
 *
 * Paraméter nélkül egyetlen kör: nincs mit bekérni, tehát nincs mihez nézetet
 * kérni — a `run` válasza maga az eredmény.
 *
 * Paraméterrel két kör: előbb `open`, ami megadja a bekérés melletti nézetet
 * (a login ajtaja), és csak a kitöltés után `run`. A nyitó kör mindig a
 * vezérlőcsatornán megy, mert nem visz választ — így titkot sem.
 *
 * Ha nincs mit indítani, az állapot változatlan marad: a beírt szöveg nem
 * tűnik el a felhasználó alól. (A search fall-through külön kerül be; ez a hely.)
 */
function start(s: Browsing, cmd: CommandSpec | undefined): Step {
  if (cmd === undefined) return step(s);

  const params = Param.begin(cmd.parameters);
  return params === undefined
    ? step(running(cmd), [{ kind: 'run', cmd, answers: {} }])
    : step({ kind: 'collecting', cmd, params }, [{ kind: 'open', cmd }]);
}
