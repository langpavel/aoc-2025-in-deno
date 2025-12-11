import Solver from "npm:javascript-lp-solver@0.4.24";

// import input from "./input.txt" with { type: "text" };
import input from "./input.txt" with { type: "text" };

console.time("Day 10, Part 2");

type ButtonValues = number[][];
type TargetState = number[];

interface Solution {
  presses: number[];
  total: number;
}

type Machine = {
  buttonValues: ButtonValues;
  targetState: TargetState;
};

const machines: Machine[] = input.split("\n").map((line) => {
  const match = line.match(
    /^\[(?<rawTargetState>[.#]*)\]\s*(?<buttonValues>.*?)\s*{(?<joltage>[\d,]+)}$/,
  );
  if (!match) {
    throw new Error(`Invalid line: ${line}`);
  }

  const targetState = match.groups!.joltage.split(",").map(Number);

  const buttonValues = match.groups!.buttonValues
    .split(" ")
    .map((config) => {
      const values = config.replaceAll(/[()]/g, "").split(",").map(Number);
      const result: number[] = new Array(targetState.length).fill(0);
      for (const v of values) {
        result[v] = 1;
      }
      return result;
    });

  return {
    buttonValues,
    targetState,
  };
});

function findMinimumPresses(
  buttonValues: ButtonValues,
  targetState: TargetState,
): Solution | null {
  const model = {
    optimize: "total",
    opType: "min",
    constraints: {} as Record<string, { equal: number }>,
    variables: {} as Record<string, Record<string, number>>,
    ints: {} as Record<string, number>,
  };

  // Add constraints for each dimension
  targetState.forEach((target, d) => {
    model.constraints[`d${d}`] = { equal: target };
  });

  // Add variables for each button
  buttonValues.forEach((button, i) => {
    const varName = `b${i}`;
    model.variables[varName] = { total: 1 };
    button.forEach((v, d) => {
      model.variables[varName][`d${d}`] = v;
    });
    model.ints[varName] = 1;
  });

  const result = Solver.Solve(model);

  if (!result.feasible) return null;

  const presses = buttonValues.map((_, i) => result[`b${i}`] || 0);
  return { presses, total: result.result };
}

let totalPresses = 0;

for (const { buttonValues, targetState } of machines) {
  const result = findMinimumPresses(buttonValues, targetState);

  totalPresses += result ? result.total : 0;
}

console.log(`Total minimum button presses: ${totalPresses}`);

console.timeEnd("Day 10, Part 2");
