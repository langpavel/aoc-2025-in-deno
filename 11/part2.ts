// import input from "./input.txt" with { type: "text" };
import input from "./input.txt" with { type: "text" };

const devices = new Map<string, Set<string>>(
  input.split("\n").map((line) => {
    const [device, outputPart] = line.split(": ");
    return [device, new Set(outputPart.split(" "))];
  }),
);

console.time("Day 11, Part 1");

// console.log(devices);

let cacheHits = 0;

const traceAllPaths = (
  from: string,
  mustPass: Set<string> = new Set(),
  cache: Map<string, number> = new Map(),
): number => {
  if (from === "out") {
    if (mustPass.size > 0) {
      return 0;
    }
    return 1;
  }

  let newMustPass = mustPass;
  if (mustPass.has(from)) {
    newMustPass = new Set(mustPass);
    newMustPass.delete(from);
  }

  const targets = devices.get(from);
  if (!targets) {
    throw new Error(`No device found for ${from}`);
  }

  const cacheKey = `${from}--${[...newMustPass].join("--")}`;
  let result = cache.get(cacheKey);
  if (result !== undefined) {
    // console.log(`Cache hit for ${cacheKey}`);
    cacheHits++;
    return result;
  }
  result = 0;
  for (const target of targets) {
    result += traceAllPaths(target, newMustPass, cache);
  }
  cache.set(cacheKey, result);

  return result;
};

console.log("svr", traceAllPaths("svr", new Set(["fft", "dac"])));

console.log("Cache hits:", cacheHits);
console.timeEnd("Day 11, Part 1");
