export const part1 = (input: string) => {
  const grid = input.split("\n").map(([...line]) => line);

  const ROWS = grid.length;
  const COLS = grid[0].length;

  // get all elevations
  const elevations = grid.map((row) =>
    row.map((letter) => {
      if (letter === "S") {
        return 1;
      } else if (letter === "E") {
        return "z".charCodeAt(0) - "a".charCodeAt(0) + 1;
      } else {
        return letter.charCodeAt(0) - "a".charCodeAt(0) + 1;
      }
    })
  );

  const getNeighbors = (row: number, col: number): [number, number][] => {
    return [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]]
      .filter(([r, c]) => 0 <= r && r < ROWS && 0 <= c && c < COLS) as [
        number,
        number,
      ][];
  };

  interface Node {
    row: number;
    col: number;
  }

  const visited: string[] = [];
  const queue: { node: Node; distanceFromStart: number }[] = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === "S") {
        queue.push({ node: { row, col }, distanceFromStart: 0 });
      }
    }
  }

  let steps = 0;

  while (queue.length > 0) {
    // pull from the start
    const { node, distanceFromStart } = queue.shift()!;

    // if has already visited this node, skip it
    if (visited.includes(JSON.stringify(node))) {
      continue;
    }
    // not visited, so add it to visited array
    visited.push(JSON.stringify(node));

    // and step into it
    const { row, col } = node;

    // if you got to the end, then finish it

    if (grid[row][col] === "E") {
      steps = distanceFromStart;
      break;
    }

    // get valid neighbors (less or one higher)
    const neighbors = getNeighbors(row, col).filter(([r, c]) =>
      elevations[r][c]! <= elevations[row][col]! + 1
    );

    // store in queue but at the end and with a higher distance
    for (const [r, c] of neighbors) {
      queue.push({
        node: { row: r, col: c },
        distanceFromStart: distanceFromStart + 1,
      });
    }
  }

  return steps;
};

export const part2 = (input: string) => {
  const grid = input.split("\n").map(([...line]) => line);

  const ROWS = grid.length;
  const COLS = grid[0].length;

  // get all elevations
  const elevations = grid.map((row) =>
    row.map((letter) => {
      if (letter === "S") {
        return 1;
      } else if (letter === "E") {
        return "z".charCodeAt(0) - "a".charCodeAt(0) + 1;
      } else {
        return letter.charCodeAt(0) - "a".charCodeAt(0) + 1;
      }
    })
  );

  const getNeighbors = (row: number, col: number): [number, number][] => {
    return [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]]
      .filter(([r, c]) => 0 <= r && r < ROWS && 0 <= c && c < COLS) as [
        number,
        number,
      ][];
  };

  interface Node {
    row: number;
    col: number;
  }

  const visited: string[] = [];
  const queue: { node: Node; distanceFromStart: number }[] = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (elevations[row][col] === 1) {
        queue.push({ node: { row, col }, distanceFromStart: 0 });
      }
    }
  }

  let steps = 0;

  while (queue.length > 0) {
    // pull from the start
    const { node, distanceFromStart } = queue.shift()!;

    // if has already visited this node, skip it
    if (visited.includes(JSON.stringify(node))) {
      continue;
    }
    // not visited, so add it to visited array
    visited.push(JSON.stringify(node));

    // and step into it
    const { row, col } = node;

    // if you got to the end, then finish it

    if (grid[row][col] === "E") {
      steps = distanceFromStart;
      break;
    }

    // get valid neighbors (less or one higher)
    const neighbors = getNeighbors(row, col).filter(([r, c]) =>
      elevations[r][c]! <= elevations[row][col]! + 1
    );

    // store in queue but at the end and with a higher distance
    for (const [r, c] of neighbors) {
      queue.push({
        node: { row: r, col: c },
        distanceFromStart: distanceFromStart + 1,
      });
    }
  }

  return steps;
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(
    file || `${new URL(".", import.meta.url).pathname}puzzle.in`,
  );

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
