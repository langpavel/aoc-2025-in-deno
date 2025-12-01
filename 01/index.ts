import lines from "./input.txt" with { type: "text" };

const moves = lines.split("\n").map((line) => {
  const [_, direction, distanceStr] = line.match(/([A-Z])(\d+)/)!;
  return { direction, distance: parseInt(distanceStr, 10) };
});

let dialPos = 50;
let pointsAtZero = 0;
let passedZero = 0;

for (const move of moves) {
  let currentPassedZero = 0;
  let currentHitsZero = 0;

  if (move.direction === "L") {
    if (dialPos === 0) {
      dialPos = 100;
    }
    dialPos -= move.distance;
    while (dialPos < 0) {
      currentPassedZero++;
      dialPos += 100;
    }
    if (dialPos === 0) {
      currentHitsZero++;
    }
  } else if (move.direction === "R") {
    dialPos += move.distance;
    while (dialPos >= 100) {
      dialPos -= 100;
      currentPassedZero++;
    }
    if (dialPos === 0) {
      currentHitsZero++;
      currentPassedZero--;
    }
  }

  console.log(
    `${move.direction}${move.distance}\t-> ${dialPos}\t${currentHitsZero}\t${currentPassedZero}`,
  );

  passedZero += currentPassedZero;
  pointsAtZero += currentHitsZero;

  const strOut = [
    `- The dial is rotated ${move.direction}${move.distance} to point at ${dialPos}`,
  ];
  if (currentHitsZero) {
    strOut.push("hits zero");
  }
  if (currentPassedZero > 0) {
    strOut.push(
      `during this rotation, it points at 0 ${
        currentPassedZero === 1 ? "once" : `${currentPassedZero} times`
      }`,
    );
  }

  // console.log(strOut.join("; "));
}
console.log(`Part 1: ${pointsAtZero}`);
console.log(`Part 2: ${passedZero + pointsAtZero}`);
