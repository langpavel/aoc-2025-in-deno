import { getReducer } from "./getReducer.ts";

import input from "./input.txt" with { type: "text" };
// import input from "./input.test.txt" with { type: "text" };

const lines = input.split(/\n/).map((line) => line.trim());
const matrix = lines.map((line) => line.split(/\s+/g));

const numbers = matrix.slice(0, -1).map((row) => row.map(Number));
const ops = matrix.slice(-1)[0];

let grandTotal = 0;

for (let columnIndex = 0; columnIndex < ops.length; columnIndex++) {
  const op = ops[columnIndex];
  const reducer = getReducer(op[0]);

  let value = numbers[0][columnIndex];
  for (let rowIndex = 1; rowIndex < numbers.length; rowIndex++) {
    value = reducer(value, numbers[rowIndex][columnIndex]);
  }
  grandTotal += value;
}

console.log("Grand total:", grandTotal);
