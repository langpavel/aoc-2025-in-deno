import input from "./input.txt" with { type: "text" };
import { mergeRanges, type Range } from "./range.ts";

const [rangeLines] = input.split("\n\n").map((section) => section.split("\n"));

const inputRanges: Range[] = rangeLines.map((line) => {
  const [min, max] = line.split("-").map((num) => parseInt(num, 10));
  return { min, max };
});

const mergedRanges = mergeRanges(inputRanges);

console.log("Merged Ranges:", mergedRanges);

const totalCovered = mergedRanges.reduce(
  (sum, range) => sum + (range.max - range.min + 1),
  0,
);

console.log("Total covered numbers:", totalCovered);
