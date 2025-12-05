import input from "./input.txt" with { type: "text" };

const lines = input.split("\n");
const maxX = lines[0].length;
const maxY = lines.length;

console.log(`Max X: ${maxX}, Max Y: ${maxY}`);
console.log(`Lines:\n${lines.join("\n")}`);

const isRollOnPosition = (x: number, y: number): boolean => {
  if (y < 0 || y >= maxY || x < 0 || x >= maxX) {
    return false;
  }
  const line = lines[y];
  const char = line[x];
  return char === "@";
};

const isMovableOnPosition = (
  x: number,
  y: number,
  lx = 1,
  ly = lx,
): boolean => {
  let count = 0;
  for (let cy = y - ly; cy <= y + ly; cy++) {
    for (let cx = x - lx; cx <= x + lx; cx++) {
      if (isRollOnPosition(cx, cy)) {
        count++;
      }
    }
  }
  return count <= 4;
};

let result1 = 0;
for (let y = 0; y < maxY; y++) {
  for (let x = 0; x < maxX; x++) {
    if (isRollOnPosition(x, y) && isMovableOnPosition(x, y)) {
      result1++;
    }
  }
}

console.log(`Result 1: ${result1}`);
