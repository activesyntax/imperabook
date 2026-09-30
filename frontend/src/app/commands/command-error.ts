import { HttpErrorResponse } from '@angular/common/http';
import type { CommandResult, ViewNode } from '@workspace/views/view-node';

/**
 * RFC 9457 ProblemDetails (ADR 12), kiegészítve azzal, hogy a hibaválasz maga is
 * hozhat nézeteket. Ha hoz, azok jelennek meg — a szerver mondja meg, mit lát a
 * felhasználó, hiba esetén is.
 */
interface CommandProblem {
  readonly title?: string;
  readonly detail?: string;
  readonly views?: readonly ViewNode[];
  readonly keepQuery?: boolean;
}

export function resultOfError(error: unknown): CommandResult {
  if (!(error instanceof HttpErrorResponse)) {
    return { views: [errorView('Something went wrong.')] };
  }

  // status 0: a kérés el sem jutott a szerverig — nincs ProblemDetails.
  if (error.status === 0) {
    return { views: [errorView('Could not reach the server.')] };
  }

  const problem: CommandProblem | null =
    typeof error.error === 'object' ? error.error : null;

  // Másolat, nem az eredeti tömb: a válaszból olvasott adat a hálózaté,
  // a store-ba kerülő állapot a miénk.
  if (problem?.views !== undefined && problem.views.length > 0) {
    return { views: [...problem.views], ...(problem.keepQuery === true && { keepQuery: true }) };
  }

  return { views: [errorView(problem?.detail ?? problem?.title ?? error.statusText)] };
}

/** A parancs érvényes, de még nincs mögötte végpont — a szerverig el sem megy. */
export function resultOfUnsupported(command: string): CommandResult {
  return { views: [{ type: 'message', text: `'${command}' is not available yet.`, kind: 'warning' }] };
}


/**
 * Az egyetlen hely, ahol a frontend maga állít elő nézetet — pontosan azért,
 * mert egy le sem érkezett válasz nem tud magáról nyilatkozni.
 */
const errorView = (text: string): ViewNode => ({ type: 'message', text, kind: 'error' });
