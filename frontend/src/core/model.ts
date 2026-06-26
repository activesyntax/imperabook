
export type Command = string;
export type CommandGroup = 'book' | 'author' | 'query' | 'view' | 'nav' | 'shell';

export type CommandSpec = {
  readonly command: Command;
  readonly description: string;
  readonly group: CommandGroup;
}

