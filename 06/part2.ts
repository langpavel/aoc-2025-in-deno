import { getReducer } from "./getReducer.ts";
console.log("Day 6, Part 2:");

import input from "./input.txt" with { type: "text" };
// import input from "./input.test.txt" with { type: "text" };

const lines = input.split(/\n/);
const operatorLine = lines[lines.length - 1];

let grandTotal = 0;
let nums: number[] = [];
for (let x = lines[0].length - 1; x >= 0; x--) {
  let num = "";
  for (let y = 0; y < lines.length - 1; y++) {
    const char = lines[y][x];
    if (char !== " ") {
      num = num + char;
    }
  }
  if (num) {
    nums.push(Number(num));
  }
  const currentOperator = operatorLine[x];
  if (currentOperator !== " ") {
    const reducer = getReducer(currentOperator);
    const reduced = nums.reduce(reducer);
    grandTotal += reduced;
    // console.log("operator:", currentOperator, nums, "reduced:", reduced);
    nums = [];
  }
}

console.log("Grand total:", grandTotal);
