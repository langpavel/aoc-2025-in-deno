// import input from "./input.txt" with { type: "text" };
import input from "./input.txt" with { type: "text" };
import { DuckDBInstance } from "npm:@duckdb/node-api@1.4.2-r.1";

console.log("Day 9, Part 2:");

type XY = [number, number];

const coords: XY[] = input.split("\n").map((line) =>
  line.split(",").map(Number) as XY
);

const instance = await DuckDBInstance.create(":memory:");
const connection = await instance.connect();

await connection.run(`INSTALL spatial`);
await connection.run(`LOAD spatial`);
console.log("Spatial extension loaded.");

const loadPath = async () => {
  await connection.run(
    `create or replace table path(p geometry);`,
  );

  const wktCoords = coords.map(([x, y]) => `${x} ${y}`);
  const wkt = `POLYGON((${wktCoords.join(", ")}, ${wktCoords[0]}))`;

  await connection.run(
    `INSERT INTO path VALUES (ST_GeomFromText('${wkt}'));`,
  );
};
await loadPath();
console.log("Path loaded.");

const allPairs: [XY, XY][] = [];
for (let i = 0; i < coords.length; i++) {
  const coordA = coords[i];
  for (let j = i + 1; j < coords.length; j++) {
    const coordB = coords[j];
    allPairs.push([coordA, coordB]);
  }
}
console.log(`Generated ${allPairs.length} rectangle pairs.`);

const loadRectangles = async () => {
  await connection.run(
    `create or replace table rectangles(rect geometry);`,
  );

  const queryParts: string[] = [];
  for (const [[x1, y1], [x2, y2]] of allPairs) {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    const wkt =
      `POLYGON((${minX} ${minY}, ${maxX} ${minY}, ${maxX} ${maxY}, ${minX} ${maxY}, ${minX} ${minY}))`;

    queryParts.push(
      `(ST_GeomFromText('${wkt}'))`,
    );
  }
  console.log(`Prepared ${queryParts.length} rectangle insert queries.`);

  await connection.run(
    `INSERT INTO rectangles VALUES ${queryParts.join(", ")}`,
  );
  console.log(`Inserted rectangles into database.`);
};
await loadRectangles();
console.log("Rectangles loaded.");

console.log(
  (await connection.runAndReadAll(
    `select ST_AsText(rect) r, ST_Area(ST_Buffer(rect,0.5,8,'CAP_SQUARE', 'JOIN_MITRE', 10.0)) area from rectangles, path where ST_CoveredBy(rect, p) order by 2 desc limit 5;`,
  )).getRowObjectsJS(),
);

connection.closeSync();
instance.closeSync();
