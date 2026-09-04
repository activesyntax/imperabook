export type Command = string;
export type CommandQuery = string;
export type CommandGroup = 'dynamic' | 'fixed' | 'account' | 'application';

export type CredentialRole = 'username' | 'password';

export interface CommandParameter {
  readonly name: string;
  readonly prompt: string;
  readonly required: boolean;
  readonly hint?: string;
  readonly example?: string;
  readonly credential?: CredentialRole;
  readonly connective: string;
}

export interface CommandSpec {
  readonly command: string;
  readonly description: string;
  readonly parameters: readonly CommandParameter[];
  readonly group?: CommandGroup;
  readonly order?: number;
  readonly endpoint?: string;
  readonly refreshesSession?: boolean;
}
