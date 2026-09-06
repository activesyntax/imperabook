export type TokenList = readonly string[];

export function tokens(text: string): TokenList {

  return text.split(/\s+/)
    .map(p => p.trim().toLowerCase())
    .filter(p => p.length > 0);
}

export type TokenMatch = 'equals' | 'exact' | 'prefix' | 'partial' | 'none';

export function tokenListMatch(queryTokens: TokenList, commandTokens: TokenList): TokenMatch {

  const exactMatch = commandTokens.every((token: string, i) => token === queryTokens[i]);

  if (exactMatch) {
    return queryTokens.length === commandTokens.length ? 'equals' : 'exact';
  }


  const prefixMatch = commandTokens.join(' ').startsWith(queryTokens.join(' '));

  if (prefixMatch) {
    return 'prefix';
  }

  const partialMatch = queryTokens.every(q => commandTokens.some(c => c.startsWith(q)));
  if (partialMatch) {
    return 'partial';
  }

  return 'none';
}
