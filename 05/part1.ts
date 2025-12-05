import input from "./input.txt" with { type: "text" };

const [rangeLines, itemLines] = input.split("\n\n").map((section) =>
  section.split("\n")
);

const items = itemLines.map((line) => parseInt(line, 10));
const ranges = rangeLines.map((line) => {
  const [min, max] = line.split("-").map((num) => parseInt(num, 10));
  return { min, max };
});

console.log(items);
console.log(ranges);

let cnt = 0;
for (const item of items) {
  for (const range of ranges) {
    if (item >= range.min && item <= range.max) {
      cnt++;
      break;
    }
  }
}

console.log("Count of items within any range:", cnt);
