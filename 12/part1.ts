import input from "./input.txt" with { type: "text" };
import { getShapeStats } from "./shape.ts";

console.time("Day 12, Part 1");

const inputParts = input.split("\n\n");

const RE_PLACE =
  /^(?<width>\d+)x(?<height>\d+):\s*(?<presentCounts>(\d+\s*)*)$/;
const places = inputParts.splice(-1)[0].split("\n").map((line) => {
  const match = line.match(RE_PLACE);
  if (!match || !match.groups) {
    throw new Error(`Invalid place line: ${line}`);
  }
  const width = Number(match.groups.width);
  const height = Number(match.groups.height);
  const presentCounts = match.groups.presentCounts.split(" ").map(Number);

  // console.log(`line: ${line}\t${width}x${height}: ${presentCounts}`);

  return {
    width,
    height,
    presentCounts,
  };
});

const shapes = inputParts.map((part) => part.split("\n").slice(1)).map(
  getShapeStats,
);
console.log("Shapes:", shapes);

let willFitCount = 0;

for (const place of places) {
  const placeArea = place.width * place.height;
  let shapesArea = 0;
  let shapesGreatArea = 0;
  for (let i = 0; i < place.presentCounts.length; i++) {
    const presentCount = place.presentCounts[i];
    shapesArea += presentCount * shapes[i].area;
    shapesGreatArea += presentCount * 9;
  }

  // console.log(`Total area: ${totalArea}, Required area: ${requiredArea}`);
  if (shapesArea >= placeArea) {
    // console.log("No");
  } else if (shapesGreatArea <= placeArea) {
    // console.log("Yes");
    willFitCount++;
  } else {
    console.log(
      `Not sure: total area: ${placeArea}, required: ${shapesArea}, great: ${shapesGreatArea}`,
    );
  }
}

console.log(`willFitCount: ${willFitCount}`);

console.timeEnd("Day 12, Part 1");
