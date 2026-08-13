export type Command = string;
export type CommandQuery = string;
export type CommandGroup = 'dynamic' | 'fixed' | 'account' | 'application';

export interface CommandParameter {
  readonly name: string;
  readonly prompt: string;
  readonly required: boolean;
  readonly secret?: boolean;
}

export interface CommandSpec {
  readonly command: string;
  readonly description: string;
  readonly parameters: readonly CommandParameter[];
  readonly group?: CommandGroup;
  readonly order?: number;
  /** Ha jelen van, a parancs nem a vezérlőcsatornán fut (ADR 18), hanem ezen az útvonalon. */
  readonly endpoint?: string;
}
