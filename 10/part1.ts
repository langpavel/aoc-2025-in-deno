// import input from "./input.txt" with { type: "text" };
import input from "./input.txt" with { type: "text" };

console.log("Day 10, Part 1:");

const targetStateToNumber = (targetState: string) => {
  let result = 0;
  let currentBit = 1;
  for (let i = 0; i < targetState.length; i++) {
    if (targetState[i] === "#") {
      result += currentBit;
    }
    currentBit <<= 1;
  }
  return result;
};

const data = input.split("\n").map((line) => {
  const match = line.match(
    /^\[(?<rawTargetState>[.#]*)\]\s*(?<buttonConfigs>.*?)\s*{(?<joltage>[\d,]+)}$/,
  );
  if (!match) {
    throw new Error(`Invalid line: ${line}`);
  }
  const buttonConfigs = match.groups!.buttonConfigs
    .split(" ")
    .map((config) => {
      return config.replaceAll(/[()]/g, "").split(",").map(Number);
    });

  const buttonValues = buttonConfigs.map((values) => {
    return values.reduce((a, b) => a + (1 << b), 0);
  });
  return {
    targetState: targetStateToNumber(match.groups!.rawTargetState),
    // ...match.groups!,
    // buttonConfigs,
    buttonValues,
  };
});

// console.log("Data", data);

const getMinPushes = (
  currentState: number,
  targetState: number,
  buttonValues: number[],
): number => {
  if (currentState === targetState) {
    return 0;
  }
  for (const buttonValue of buttonValues) {
    const nextState = currentState ^ buttonValue;
    if (nextState === targetState) {
      return 1;
    }
  }
  for (const buttonValue of buttonValues) {
    const nextButtons = buttonValues.slice(1);
    const numThisIsOff = getMinPushes(currentState, targetState, nextButtons);
    const numThisIsOn = getMinPushes(
      currentState ^ buttonValue,
      targetState,
      nextButtons,
    );
    return Math.min(numThisIsOff, numThisIsOn + 1);
  }
  return Infinity;
};

let sumOfPushes = 0;

for (const { targetState, buttonValues } of data) {
  const minPushes = getMinPushes(0, targetState, buttonValues);
  sumOfPushes += minPushes;
}

console.log("Sum of pushes:", sumOfPushes);
