import { lodash } from "../deps.ts";

const getDirSizes = (input: string) => {
  const lines = input.split("\n");

  const sizes: { [key: string]: number } = {};
  const path = [];

  for (const line of lines) {
    const parts = line.split(" ");

    if (parts[0] === "$") {
      if (parts[1] == "cd") {
        if (parts[2] === "..") {
          path.pop();
        } else {
          path.push(parts[2]);
        }
      } else if (parts[1] === "ls") {
        continue;
      }
    } else if (parts[0] === "dir") {
      continue;
    } else {
      for (let i = 0; i < path.length; i++) {
        const fullPathDir = path.slice(0, path.length - i).join("/");
        const fileSize = Number(parts[0]);

        sizes[fullPathDir]
          ? sizes[fullPathDir] += fileSize
          : sizes[fullPathDir] = fileSize;
      }
    }
  }

  return sizes;
};
export const part1 = (input: string) => {
  const sizes = getDirSizes(input);

  return lodash.sum(
    Object.values(sizes).filter((folder) => folder <= 100000),
  );
};

export const part2 = (input: string) => {
  const sizes = getDirSizes(input);

  const sizeNeededToRun = 30000000 - (70000000 - sizes["/"]);

  return lodash.min(
    Object.values(sizes).filter((dir) => dir > sizeNeededToRun),
  );
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
