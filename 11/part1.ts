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

const traceAllPaths = (from: string): Set<string> => {
  const result = new Set<string>();

  const targets = devices.get(from);
  if (!targets) {
    throw new Error(`No device found for ${from}`);
  }

  for (const target of targets) {
    if (target === "out") {
      result.add(`${from}-out`);
    } else {
      for (const subTarget of traceAllPaths(target)) {
        result.add(`${from}-${subTarget}`);
      }
    }
  }
  return result;
};

console.log(traceAllPaths("you").size);

console.timeEnd("Day 11, Part 1");
