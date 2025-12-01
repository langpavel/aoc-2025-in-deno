import lines from "./input.txt" with { type: "text" };

const moves = lines.split("\n").map((line) => {
  const [_, direction, distanceStr] = line.match(/([A-Z])(\d+)/)!;
  return { direction, distance: parseInt(distanceStr, 10) };
});

let dialPos = 50;
let zeroClicks = 0;

for (const move of moves) {
  // console.log(`Direction: ${move.direction}, Distance: ${move.distance}`);
  if (move.direction === "L") {
    dialPos -= move.distance;
  } else if (move.direction === "R") {
    dialPos += move.distance;
  }
  dialPos = (dialPos + 100) % 100;
  console.log(`New Dial Position: ${dialPos}`);
  if (dialPos === 0) {
    zeroClicks++;
    console.log(`Zero from Left: ${zeroClicks}`);
  }
}
console.log(`Part 1: ${zeroClicks}`);
