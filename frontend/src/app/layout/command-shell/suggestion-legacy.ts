
// const suggestionTokenTree = createSuggestionTokenTree(this.registry.commands());
//
// console.log('Suggestion tree:', suggestionTokenTree);
// function levelMatch(queryTokens: TokenList, levelTokens: TokenList, path: SuggestionNode[]): TokenMatch {
//
//   console.log('QUERY TOKENS: ', queryTokens);
//   console.log('LEVEL TOKENS: ', levelTokens);
//   console.log('PATH: ', path);
//
//   const pathTokens = path.flatMap(n => n.tokens);
//   console.log('PATH TOKENS: ', pathTokens);
//
//   const relevantTokens = queryTokens.slice(pathTokens.length);
//   console.log('RELEVANT TOKENS: ', relevantTokens);
//
//   const partialMatch = queryTokens.every(q => levelTokens.some(c => c.startsWith(q)));
//
//   if (partialMatch) {
//     return 'partial';
//   }
//
//   return 'none'
// }
//

// while (queue.size > 0) {
//   const node = queue.dequeue();
//
//   if (!node)
//     continue;
//
//   if (node.tokens.forEach(t => t.includes(queryTokens[0]))) {
//     matches.push(node);
//   }
//
//   const children = node.children;
//   children.forEach(child => queue.enqueue(child));
// }

// let commandMatches = suggestionRootNode.children
//   .filter(c => tokenListMatch(queryTokens, c.tokens) !== 'none')
//
// console.log('COMMAND MATCHES: ', commandMatches);
//
// if (!oneMatch(commandMatches)) {
//   return toString(commandMatches);
// }
//
// const commandMatch = commandMatches[0];
// console.log('COMMAND MATCH: ', commandMatch);
// console.log('TOKEN LIST MATCH: ', tokenListMatch(queryTokens, commandMatch.tokens));
//
// switch (tokenListMatch(queryTokens, commandMatch.tokens)) {
//   case 'equals':
//     return toString(commandMatch.children);
//
//   case 'prefix':
//   case 'partial':
//     return toString(commandMatches);
//
//   case 'exact':
//
//     const filteredParametersMatch = commandMatch.children.map(c => tokenListMatch(queryTokens, c.tokens));
//
//     console.log('combined tokens', [...commandMatch.tokens, ...commandMatch.children[0].tokens])
//     console.log('FILTERED PARAMETERS MATCH: ', filteredParametersMatch);
//
//     const filteredParameters = commandMatch.children.filter(parameter => tokenListMatch(queryTokens, [...commandMatch.tokens, ...parameter.tokens]) === 'partial')
//     return commandMatch.children.length > 0
//       ? toString(filteredParameters) : [];
// };
//
