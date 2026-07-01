export type Command = string;
export type CommandQuery = string;
export type CommandGroup = 'general' | 'nav' | 'shell';

export type CommandParameter = {
  readonly name: string;
  readonly prompt: string;
  readonly required: boolean;
  readonly connective?: string;
};

export type CommandSpec = {
  readonly command: Command;
  readonly description: string;
  readonly group?: CommandGroup;
  readonly parameters: readonly CommandParameter[];
};
