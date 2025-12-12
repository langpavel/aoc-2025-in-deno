export type Shape = string[];

export const getShapeStats = (
  shapeLines: Shape,
): { shapeLines: Shape; area: number } => {
  const lineMerged = shapeLines.join("");
  const filledChars = lineMerged.split("").filter((ch) => ch === "#");
  const area = filledChars.length;
  return { shapeLines, area };
};
