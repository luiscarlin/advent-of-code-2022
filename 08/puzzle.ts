import { asserts, lodash } from "/deps.ts";
export const part1 = (input: string) => {
  const grid = input.split("\n").map(([...line]) => line.map(Number));

  let numVisible = 2 * grid.length + 2 * (grid[0].length - 2);

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      // skip edges
      if (
        row == 0 || row === grid.length - 1 || col === 0 ||
        col === grid[0].length - 1
      ) {
        continue;
      }

      const atLeastVisibleFromOneSide = [
        lodash.range(0, col).map((coli: number) => grid[row][coli]),
        lodash.range(0, row).map((rowi: number) => grid[rowi][col]),
        lodash.range(row + 1, grid.length).map((rowi: number) =>
          grid[rowi][col]
        ),
        lodash.range(col + 1, grid[row].length).map((coli: number) =>
          grid[row][coli]
        ),
      ].some((side) =>
        side.every((treeOnSide: number) => treeOnSide < grid[row][col])
      );

      if (atLeastVisibleFromOneSide) {
        numVisible++;
      }
    }
  }

  asserts.assertEquals(numVisible, 1851);

  return numVisible;
};

export const part2 = (input: string) => {
  const grid = input.split("\n").map(([...line]) => line.map(Number));

  let highestScenicScore = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      // skip edges
      if (
        row == 0 || row === grid.length - 1 || col === 0 ||
        col === grid[0].length - 1
      ) {
        continue;
      }

      const allTreesToEdge: number[][] = [
        lodash.range(0, col).map((coli: number) => grid[row][coli]).reverse(),
        lodash.range(0, row).map((rowi: number) => grid[rowi][col]).reverse(),
        lodash.range(row + 1, grid.length).map((rowi: number) =>
          grid[rowi][col]
        ),
        lodash.range(col + 1, grid[row].length).map((coli: number) =>
          grid[row][coli]
        ),
      ];

      const numVisibleTrees = allTreesToEdge.map((treesInLine) => {
        const index = treesInLine.findIndex((tree) => tree >= grid[row][col]);

        return index === -1 ? treesInLine.length : index + 1;
      });

      const scenicScore = numVisibleTrees.reduce((acc, num) => acc *= num, 1);

      highestScenicScore = Math.max(scenicScore, highestScenicScore);
    }
  }

  asserts.assertEquals(highestScenicScore, 574080);

  return highestScenicScore;
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
