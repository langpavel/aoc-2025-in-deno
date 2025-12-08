export const getReducer = (op: string): (a: number, b: number) => number => {
  switch (op) {
    case "+":
      return (a, b) => a + b;
    case "*":
      return (a, b) => a * b;
    default:
      throw new Error(`Unknown operation: ${op}`);
  }
};
