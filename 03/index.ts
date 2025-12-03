import lines from "./input.txt" with { type: "text" };

const banks = lines.split("\n");

const getBankJoltage = (voltages: number[], bankSize = 2): number => {
  for (let i = 9; i >= 0; i--) {
    const indexOfVoltage = voltages.indexOf(i);
    if (indexOfVoltage === -1) {
      continue;
    }
    if (bankSize === 1) {
      return i;
    }
    const nextVoltages = voltages.slice(indexOfVoltage + 1);
    const nextJoltage = getBankJoltage(nextVoltages, bankSize - 1);
    if (nextJoltage >= 0) {
      return i * 10 ** (bankSize - 1) + nextJoltage;
    }
  }
  return -Infinity;
};

let sumOfJoltages = 0;

for (const bank of banks) {
  const voltages = bank.split("").map((char) => parseInt(char, 10));
  const joltage = getBankJoltage(voltages);
  sumOfJoltages += joltage;
  console.log(`Bank: ${voltages.join("")}: joltage = ${joltage}`);
}

console.log(`Sum of joltages: ${sumOfJoltages}`);
