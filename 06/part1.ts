import input from "./input.txt" with { type: "text" };
// import input from "./input.test.txt" with { type: "text" };

const lines = input.split(/\n/).map((line) => line.trim());
const matrix = lines.map((line) => line.split(/\s+/g));

const numbers = matrix.slice(0, -1).map((row) => row.map(Number));
const ops = matrix.slice(-1)[0];

// console.log(lines);
// console.log(numbers);
// console.log(ops);

let grandTotal = 0;

for (let columnIndex = 0; columnIndex < ops.length; columnIndex++) {
  const op = ops[columnIndex];
  let reducer: (a: number, b: number) => number;
  switch (op[0]) {
    case "+":
      reducer = (a, b) => a + b;
      break;
    case "*":
      reducer = (a, b) => a * b;
      break;
    default:
      throw new Error(`Unknown operation: ${op[0]}`);
  }

  let value = numbers[0][columnIndex];
  for (let rowIndex = 1; rowIndex < numbers.length; rowIndex++) {
    value = reducer(value, numbers[rowIndex][columnIndex]);
  }
  // console.log(`Column ${columnIndex} result:`, value);
  grandTotal += value;
}

console.log("Grand total:", grandTotal);
