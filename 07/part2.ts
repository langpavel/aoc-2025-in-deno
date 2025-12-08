import input from "./input.txt" with { type: "text" };
// import input from "./input.test.txt" with { type: "text" };
console.log("Day 7, Part 2:");

const lines = input.split(/\n/);

const cache = new Map<string, number>();

const traceBeam = (
  line: number,
  beamPosition: number,
  realities = 1,
): number => {
  const currentLine = lines[line];
  if (!currentLine) {
    return realities;
  }

  const cacheKey = `${line},${beamPosition}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const isSplitter = currentLine[beamPosition] === "^";
  if (isSplitter) {
    const result = traceBeam(line + 1, beamPosition - 1, realities) +
      traceBeam(line + 1, beamPosition + 1, realities);
    cache.set(cacheKey, result);
    return result;
  } else {
    const result = traceBeam(line + 1, beamPosition, realities);
    cache.set(cacheKey, result);
    return result;
  }
};

console.log("Number of realities:", traceBeam(1, lines[0].indexOf("S")));
