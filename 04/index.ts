import input from "./input.txt" with { type: "text" };

const lines = input.split("\n");
const maxX = lines[0].length;
const maxY = lines.length;

console.log(`Max X: ${maxX}, Max Y: ${maxY}`);

const printBoard = () => {
  console.log(lines.join("\n") + "\n");
};

const isRollOnPosition = (x: number, y: number): boolean => {
  if (y < 0 || y >= maxY || x < 0 || x >= maxX) {
    return false;
  }
  const line = lines[y];
  const char = line[x];
  return char === "@" || char === "x";
};

const markRollOnPosition = (x: number, y: number): void => {
  lines[y] = lines[y].substring(0, x) + "x" + lines[y].substring(x + 1);
};

const clearMarked = () => {
  for (let y = 0; y < maxY; y++) {
    lines[y] = lines[y].replace(/x/g, ".");
  }
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

let wasMarked = false;
let result2 = 0;
while (!wasMarked) {
  wasMarked = false;
  let result1 = 0;
  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      if (isRollOnPosition(x, y) && isMovableOnPosition(x, y)) {
        result1++;
        markRollOnPosition(x, y);
        wasMarked = true;
      }
    }
  }
  console.log(`Result 1: ${result1}`);
  if (result1 === 0) {
    break;
  }
  // printBoard();
  if (wasMarked) {
    clearMarked();
    wasMarked = false;
  }
  result2 += result1;
}

console.log(`Result 2: ${result2}`);
