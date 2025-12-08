// import input from "./input.txt" with { type: "text" };
import input from "./input.txt" with { type: "text" };

console.log("Day 8, Part 1:");

type XYZ = [number, number, number];

const boxes: XYZ[] = input.split("\n").map((line) =>
  line.split(",").map(Number) as XYZ
);

const boxIndex = new Map<XYZ, number>();
for (let i = 0; i < boxes.length; i++) {
  boxIndex.set(boxes[i], i);
}

const squaredDistance = (a: XYZ, b: XYZ) => {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
};

const allPairs: [XYZ, XYZ][] = [];
for (let i = 0; i < boxes.length; i++) {
  const boxA = boxes[i];
  for (let j = i + 1; j < boxes.length; j++) {
    const boxB = boxes[j];
    allPairs.push([boxA, boxB]);
  }
}

allPairs.sort((pairA, pairB) => {
  const distA = squaredDistance(pairA[0], pairA[1]);
  const distB = squaredDistance(pairB[0], pairB[1]);
  return distA - distB;
});

const circuits = new Set<Set<XYZ>>();

const addToCircuit = (a: XYZ, b: XYZ) => {
  let circuitA: Set<XYZ> | null = null;
  let circuitB: Set<XYZ> | null = null;
  for (const circuit of circuits) {
    if (circuit.has(a)) {
      circuitA = circuit;
    }
    if (circuit.has(b)) {
      circuitB = circuit;
    }
  }
  if (circuitA && circuitB && circuitA !== circuitB) {
    // merge circuits
    for (const box of circuitB) {
      circuitA.add(box);
    }
    circuits.delete(circuitB);
  } else if (circuitA) {
    circuitA.add(b);
  } else if (circuitB) {
    circuitB.add(a);
  } else {
    const newCircuit = new Set<XYZ>([a, b]);
    circuits.add(newCircuit);
  }
};

for (const box of boxes) {
  const newCircuit = new Set<XYZ>();
  newCircuit.add(box);
  circuits.add(newCircuit);
}

for (let i = 0; i < 1000; i++) {
  const [boxA, boxB] = allPairs[i];
  addToCircuit(boxA, boxB);
}

const sortedCircuits = [...circuits].sort((a, b) => b.size - a.size);

console.log(
  `Puzzle answer: ${
    sortedCircuits.slice(0, 3).reduce((acc, circuit) => acc * circuit.size, 1)
  }`,
);
