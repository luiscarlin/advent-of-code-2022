import { lodash } from "/deps.ts";

export const part1 = (input: string) => {
  return Math.max(
    ...input.split("\n\n").map((elfCalories) =>
      lodash.sum(elfCalories.split("\n").map(Number))
    ),
  );
};

export const part2 = (input: string) => {
  const caloriesByElf = input.split("\n\n").map((elfCalories) =>
    lodash.sum(elfCalories.split("\n").map(Number))
  );

  return lodash.sum(caloriesByElf.sort((a, b) => b - a).slice(0, 3));
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
