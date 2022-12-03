import { asserts, lodash } from "/deps.ts";

const isLowerCase = (letter: string) =>
  letter.toLowerCase() === letter &&
  letter !== letter.toUpperCase();

const convertToASCII = (char: string) => char.charCodeAt(0);

const getCharPriority = (char: string) =>
  convertToASCII(char) - (isLowerCase(char) ? 96 : 38);

export const part1 = (input: string) => {
  return input.split("\n").reduce((acc, rucksack) => {
    const [left, right] = [
      rucksack.slice(0, rucksack.length / 2),
      rucksack.slice(rucksack.length / 2),
    ];

    const repeatedChar = left.split("").find((char) => right.includes(char));
    asserts.assertExists(repeatedChar);

    return acc + getCharPriority(repeatedChar);
  }, 0);
};

export const part2 = (input: string) => {
  const lines = input.split("\n");

  const chunks = lodash.chunk(lines, 3, null);

  const repeated = chunks.flatMap((chunk) =>
    lodash.intersection(
      chunk[0].split(""),
      chunk[1].split(""),
      chunk[2].split(""),
    )
  );

  return lodash.sum(
    repeated.map(getCharPriority),
  );
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
