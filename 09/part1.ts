// import input from "./input.txt" with { type: "text" };
import input from "./input.txt" with { type: "text" };

console.log("Day 9, Part 1:");

type XY = [number, number];

const coords: XY[] = input.split("\n").map((line) =>
  line.split(",").map(Number) as XY
);

console.log(coords);

const getRectangleSize = (a: XY, b: XY): number => {
  const width = Math.abs(a[0] - b[0]) + 1;
  const height = Math.abs(a[1] - b[1]) + 1;
  return width * height;
};

let greatestSize = 0;

for (let i = 0; i < coords.length; i++) {
  const coordA = coords[i];
  for (let j = i + 1; j < coords.length; j++) {
    const coordB = coords[j];
    const size = getRectangleSize(coordA, coordB);
    if (size > greatestSize) {
      greatestSize = size;
    }
  }
}

console.log("Greatest rectangle size:", greatestSize);
