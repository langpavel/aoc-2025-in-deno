import lines from "./input.txt" with { type: "text" };

const ranges = lines.split(",").map((range) => {
  const [start, end] = range.split("-").map(Number);
  return { start, end };
});

const isInvalidAtSlice = (str: string, sliceSize: number) => {
  if (str.length % sliceSize !== 0) return false;

  const slice = str.slice(0, sliceSize);
  for (let i = sliceSize; i <= str.length - sliceSize; i += sliceSize) {
    const nextSlice = str.slice(i, i + sliceSize);
    if (slice !== nextSlice) {
      return false;
    }
  }
  return true;
};

const isInvalid = (num: number) => {
  const str = `${num}`;
  if (str.length % 2 !== 0) return false;
  return isInvalidAtSlice(`${num}`, str.length / 2);
};

const isInvalid2 = (num: number) => {
  const str = `${num}`;
  for (let i = Math.floor(str.length / 2); i > 0; i--) {
    if (isInvalidAtSlice(str, i)) {
      return true;
    }
  }
  return false;
};

let sumOfInvalids = 0;

for (const { start, end } of ranges) {
  console.log(`Start: ${start}, End: ${end}`);
  for (let i = start; i <= end; i++) {
    if (isInvalid2(i)) {
      console.log(`  Invalid number found: ${i}`);
      sumOfInvalids += i;
    }
  }
}

console.log(sumOfInvalids);
