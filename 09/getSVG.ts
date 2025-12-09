// import input from "./input.txt" with { type: "text" };
import input from "./input.txt" with { type: "text" };

type XY = [number, number];

const coords: XY[] = input.split("\n").map((line) =>
  line.split(",").map(Number) as XY
);

let minX = Infinity;
let maxX = -Infinity;
let minY = Infinity;
let maxY = -Infinity;

for (const [x, y] of coords) {
  if (x < minX) minX = x;
  if (x > maxX) maxX = x;
  if (y < minY) minY = y;
  if (y > maxY) maxY = y;
}

const svgBuilder: string[] = [];
svgBuilder.push(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX - 1} ${minY - 1} ${
    maxX - minX + 2
  } ${maxY - minY + 2}">`,
);
const svgPathBuilder: string[] = [];
svgPathBuilder.push(
  `<path fill="green" stroke="red" d="`,
);
let svgPathCommand = "M";
for (const [x, y] of coords) {
  svgPathBuilder.push(`${svgPathCommand}${x} ${y}`);
  svgPathCommand = "L";
}
svgPathBuilder.push(`Z" />`);

svgBuilder.push(svgPathBuilder.join(""));
svgBuilder.push(`</svg>`);

console.log(svgBuilder.join("\n"));
