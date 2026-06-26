export type IndexRange = { length: number };
export type Index = number | undefined;


export function indexRange(length: number): IndexRange {
  return { length };
}

export function nextCyclicIndex(range: IndexRange, index: Index): Index {
  return index !== undefined ? (index + 1) % (range.length) : 0;
}

export function prevCyclicIndex(range: IndexRange, index: Index): Index {
  if (index === undefined)
    return range.length - 1;

  const prevIndex = index - 1;
  return prevIndex >= 0 ? prevIndex : prevIndex + range.length;
}
