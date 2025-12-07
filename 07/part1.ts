// import input from "./input.txt" with { type: "text" };
import input from "./input.txt" with { type: "text" };
console.log("Day 7, Part 1:");

const lines = input.split(/\n/);
const lineLength = lines[0].length;

let beamPositions = [lines[0].indexOf("S")];
console.log("Beam positions:", beamPositions);

let splitCount = 0;

for (let li = 0; li < lines.length; li++) {
  const newBeamPositions: number[] = [];
  for (let i = 0; i < lineLength; i++) {
    if (beamPositions.includes(i)) {
      if (lines[li][i] === "^") {
        newBeamPositions.push(i - 1);
        newBeamPositions.push(i + 1);
        splitCount++;
      } else {
        newBeamPositions.push(i);
      }
    }
  }
  beamPositions = newBeamPositions;
}

console.log("Beam positions at the end:", beamPositions);
console.log("Number of splits:", splitCount);
