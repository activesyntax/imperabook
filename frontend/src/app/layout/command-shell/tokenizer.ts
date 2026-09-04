import { CommandSpec } from "@core/model";

export type TokenList = readonly string[];
export type TokenGroup = readonly TokenList[];
export type TokenGroups = readonly TokenGroup[];

export function tokens(text: string): TokenList {

  return text.split(/\s+/)
    .map(p => p.trim().toLowerCase())
    .filter(p => p.length > 0);
}

export function tokenGroup(tokenList: TokenList): TokenGroup {
  return [tokenList];
}

export function tokenGroups(tokenLists: TokenList[]): TokenGroups {
  return tokenLists.map(tokenGroup);
}

export function commandTokens(command: CommandSpec): TokenGroups {

  const commandParts = tokens(command.command);
  const parameterParts = command.parameters.map((p) => tokens(p.connective));

  return tokenGroups([commandParts, ...parameterParts]);

}
