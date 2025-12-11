import input from "./input.txt" with { type: "text" };

const devices = new Map<string, Set<string>>(
  input.split("\n").map((line) => {
    const [device, outputPart] = line.split(": ");
    return [device, new Set(outputPart.split(" "))];
  }),
);

console.time("Day 11, Part 1");

const traceAllPaths = (
  from: string,
  cache = new Map<string, number>(),
): number => {
  if (from === "out") {
    return 1;
  }

  let result = cache.get(from);
  if (result !== undefined) {
    return result;
  }
  result = 0;
  for (const target of devices.get(from)!) {
    result += traceAllPaths(target, cache);
  }
  cache.set(from, result);

  return result;
};

console.log("you", traceAllPaths("you"));

console.timeEnd("Day 11, Part 1");
