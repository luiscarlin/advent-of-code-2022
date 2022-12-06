import { lodash } from "/deps.ts";
export const part1 = (input: string) => {
  const text = input.split("");

  let index = 0;

  for (const i of lodash.range(text.length)) {
    const subList = text.slice(i, 4 + i);

    if (subList.length !== 4) {
      break;
    }

    const allUnque = subList.every((c, index) =>
      ![...subList.slice(0, index), ...subList.slice(index + 1)].includes(c)
    );

    if (allUnque) {
      index = i + 4;
      break;
    }
  }

  return index;
};

export const part2 = (input: string) => {
  const text = input.split("");

  let index = 0;

  for (const i of lodash.range(text.length)) {
    const subList = text.slice(i, 14 + i);

    if (subList.length !== 14) {
      break;
    }

    const allUnque = subList.every((c, index) =>
      ![...subList.slice(0, index), ...subList.slice(index + 1)].includes(c)
    );

    if (allUnque) {
      index = i + 14;
      break;
    }
  }

  return index;
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
