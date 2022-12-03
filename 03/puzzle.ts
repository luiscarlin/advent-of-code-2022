import { lodash } from "/deps.ts";

const isLowerCase = (letter: string) => {
  if (
    letter.toUpperCase() === letter &&
    letter !== letter.toLowerCase()
  ) {
    return false;
  } else {
    // 👉️ this runs
    return true;
  }
};

export const part1 = (input: string) => {
  const lines = input.split("\n");

  // start coding here

  const repeated = [];

  for (const line of lines) {
    const first = line.slice(0, line.length / 2).split("");
    const second = line.slice(line.length / 2).split("");

    repeated.push(...lodash.intersection(first, second));
  }

  // a: 97
  //65  A

  return lodash.sum(
    repeated.map((char) =>
      isLowerCase(char) ? char.charCodeAt(0) - 96 : char.charCodeAt(0) - 38
    ),
  );
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
    repeated.map((char) =>
      isLowerCase(char) ? char.charCodeAt(0) - 96 : char.charCodeAt(0) - 38
    ),
  );
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
