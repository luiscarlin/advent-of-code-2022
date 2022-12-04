import { lodash } from "/deps.ts";

export const part1 = (input: string) => {
  const lines = input.split("\n");

  let count = 0;

  for (const line of lines) {
    const [left, right] = line.split(",");

    const [startLeft, endLeft] = left.split("-").map(Number);
    const [startRight, endRight] = right.split("-").map(Number);

    if (startLeft <= startRight && endLeft >= endRight) {
      count++;
      continue;
    }

    if (startLeft >= startRight && endLeft <= endRight) {
      count++;
      continue;
    }
  }

  return count;
};

export const part2 = (input: string) => {
  const lines = input.split("\n");

  let count = 0;

  for (const line of lines) {
    const [left, right] = line.split(",");

    const [startLeft, endLeft] = left.split("-").map(Number);
    const [startRight, endRight] = right.split("-").map(Number);

    const leftList = lodash.range(startLeft, endLeft + 1);
    const rightList = lodash.range(startRight, endRight + 1);

    const intersect = lodash.intersection(leftList, rightList);

    if (intersect.length > 0) {
      count++;
    }
  }

  return count;
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
