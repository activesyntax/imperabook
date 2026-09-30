/** How far parameters sit in from the command, so they read as belonging to it. */
export const PARAM_INDENT = '    ';

/**
 * Lays a command out the way it is read: the command on the first line, each
 * parameter below it indented by PARAM_INDENT. Whatever indentation a
 * continuation line had is replaced; blank lines before the command and blanks
 * before it on its own line are dropped; Windows line breaks become plain ones.
 *
 * Formatting is line-local and never moves text across lines, so the formatted
 * text before a caret is exactly what precedes it in the formatted whole — see
 * formatAround.
 */
export function formatQuery(text: string): string {
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  while (lines.length > 1 && lines[0].trim() === '') lines.shift();

  const [first, ...rest] = lines;
  return [first.trimStart(), ...rest.map(line => PARAM_INDENT + line.trimStart())].join('\n');
}

/** Formats text that has a caret in it, keeping the caret where it belongs. */
export function formatAround(text: string, caret: number): { text: string; caret: number } {
  return { text: formatQuery(text), caret: formatQuery(text.slice(0, caret)).length };
}
