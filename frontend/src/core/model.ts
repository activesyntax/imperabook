export type Command = string;
export type CommandQuery = string;
export type CommandGroup = 'general' | 'nav' | 'shell';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ParameterLocation = 'route' | 'query' | 'body';

export type CommandParameter = {
  readonly name: string;
  readonly in: ParameterLocation;
  readonly prompt: string;
  readonly required: boolean;
};

export type CommandSpec = {
  readonly command: Command;
  readonly description: string;
  readonly group?: CommandGroup;
  readonly method: HttpMethod;
  readonly url: string;
  readonly parameters: readonly CommandParameter[];
};
