const printGrid = (hPos: [number, number], tPos: [number, number]) => {
  const maxX = Math.max(hPos[0], tPos[0], 0) + 3;
  const minX = Math.min(hPos[0], tPos[0], 0) - 3;

  const maxY = Math.max(hPos[1], tPos[1], 0) + 3;
  const minY = Math.min(hPos[1], tPos[1], 0) - 3;

  for (let y = maxY; y >= minY; y--) {
    let line = "";
    for (let x = minX; x <= maxX; x++) {
      if (JSON.stringify([x, y]) === JSON.stringify(hPos)) {
        line += "H";
      } else if (JSON.stringify([x, y]) === JSON.stringify(tPos)) {
        line += "T";
      } else if (x === 0 && y === 0) {
        line += "s";
      } else {
        line += ".";
      }
    }
    console.log(line);
  }
  console.log();
};

export const part1 = (input: string) => {
  const lines = input.split("\n").map((line) => line.split(" "));

  // x, y
  let hPos: [number, number] = [0, 0];
  const tPos: [number, number] = [0, 0];
  const tPosHistory = new Set();

  const dxdy: { [key: string]: [number, number] } = {
    U: [0, 1],
    R: [1, 0],
    D: [0, -1],
    L: [-1, 0],
  };

  // console.log("== initial state ==");
  // printGrid(hPos, tPos); // debug

  for (const [dir, steps] of lines) {
    // console.log("==", dir, steps, "==");

    for (let i = 0; i < Number(steps); i++) {
      hPos = [hPos[0] + dxdy[dir][0], hPos[1] + dxdy[dir][1]];

      // if same x but y off by one, then change y to get closer
      const shouldMoveVertically = hPos[0] === tPos[0] &&
        (Math.abs(hPos[1] - tPos[1]) > 1);

      // if same y but x off by one, change x to get closer
      const shouldMoveHorizontally = hPos[1] === tPos[1] &&
        (Math.abs(hPos[0] - tPos[0]) > 1);

      // if x and y are off by one, move in that direction
      const shouldMoveDiagonally = ((Math.abs(hPos[0] - tPos[0]) === 2) &&
        (Math.abs(hPos[1] - tPos[1]) === 1)) ||
        ((Math.abs(hPos[1] - tPos[1]) === 2) &&
          (Math.abs(hPos[0] - tPos[0]) === 1));

      if (shouldMoveVertically) {
        tPos[1] = tPos[1] + 1 * (hPos[1] - tPos[1] > 0 ? 1 : -1);
      } else if (shouldMoveHorizontally) {
        tPos[0] = tPos[0] + 1 * (hPos[0] - tPos[0] > 0 ? 1 : -1);
      } else if (shouldMoveDiagonally) {
        // if the y is off by two, move t to match the x and move y closer
        if (Math.abs(hPos[1] - tPos[1]) === 2) {
          tPos[0] = hPos[0];
          tPos[1] = tPos[1] + 1 * (hPos[1] - tPos[1] > 0 ? 1 : -1);
        } else if (Math.abs(hPos[0] - tPos[0]) === 2) {
          // if the x is off by two, move t to match the y and move y closer

          tPos[1] = hPos[1];
          tPos[0] = tPos[0] + 1 * (hPos[0] - tPos[0] > 0 ? 1 : -1);
        } else {
          console.log("how did you get here");
        }
      }

      tPosHistory.add(JSON.stringify(tPos));
    }

    // printGrid(hPos, tPos); // for debug
  }
  return tPosHistory.size;
};

export const part2 = (input: string) => {
  const lines = input.split("\n");

  return lines.length;
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
