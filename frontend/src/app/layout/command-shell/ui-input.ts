/**
 * A közös bemeneti ábécé. Mindkét állapotgép ezt fogyasztja — a különbség nem
 * a bemenetekben van, hanem abban, hogy melyik gép mit KEZD velük. Az Enter
 * parancsmódban kiegészít vagy futtat, bevitelmódban választ rögzít.
 *
 * A DOM-esemény a komponens határán fordul le erre, egyetlen helyen.
 */
export type UiInput =
  | { readonly kind: 'text'; readonly value: string }         // input esemény
  | { readonly kind: 'commit' }                                // Enter
  | { readonly kind: 'submit' }                                // küldés gomb
  | { readonly kind: 'cancel' }                                // Escape
  | { readonly kind: 'move'; readonly dir: 'next' | 'prev' }   // Tab / Shift+Tab
  | { readonly kind: 'back' }                                  // Backspace üres mezőn
  | { readonly kind: 'completed' };                            // async futás vége
