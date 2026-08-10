export type Command = string;
export type CommandQuery = string;
export type CommandGroup = 'dynamic' | 'fixed';

export type CommandParameter = {
  readonly name: string;
  readonly prompt: string;
  readonly required: boolean;
  readonly secret: boolean;
};

export type CommandSpec = {
  readonly command: Command;
  readonly description: string;
  readonly group?: CommandGroup;
  readonly order?: number;
  readonly parameters: readonly CommandParameter[];
};
