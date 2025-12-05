export type Range = { min: number; max: number };

/**
 * Check if two ranges overlap
 */
export const isOverlapping = (a: Range, b: Range): boolean => {
  return a.min <= b.max && b.min <= a.max;
};

/**
 * Merge two overlapping ranges into a single range
 */
export const mergeOverlappingRanges = (a: Range, b: Range): Range => {
  return { min: Math.min(a.min, b.min), max: Math.max(a.max, b.max) };
};

/**
 * Compare two ranges first by their minimum value in ascending order,
 * and then by their maximum value in descending order.
 */
export const rangesComparator = (a: Range, b: Range): number => {
  const rangeStartComparison = a.min - b.min;
  if (rangeStartComparison === 0) {
    return b.max - a.max;
  }
  return rangeStartComparison;
};

/**
 * Merge a list of ranges into non-overlapping ranges
 */
export const mergeRanges = (ranges: Range[]): Range[] => {
  if (ranges.length === 0) return [];

  const sortedRanges = ranges.toSorted(rangesComparator);
  const mergedRanges: Range[] = [];

  for (const range of sortedRanges) {
    if (mergedRanges.length === 0) {
      mergedRanges.push(range);
      continue;
    }

    const lastRange = mergedRanges[mergedRanges.length - 1];
    if (isOverlapping(lastRange, range)) {
      mergedRanges[mergedRanges.length - 1] = mergeOverlappingRanges(
        lastRange,
        range,
      );
    } else {
      mergedRanges.push(range);
    }
  }

  return mergedRanges;
};
