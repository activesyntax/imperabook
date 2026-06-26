export type Command = string;
export type CommandGroup = 'nav' | 'shell';

export type CommandSpec = {
  readonly command: Command;
  readonly description: string;
  readonly group?: CommandGroup;
}
