import { asserts, lodash } from "../deps.ts";

export const part1 = (input: string) => {
  const lines = input.split("\n");

  // start coding here

  const tree: { [key: string]: Set<string> } = {};

  const path: string[] = [];

  const getPath = (dir) => dir ? path.join("/") + "/" + dir : path.join("/");

  lines.forEach((line) => {
    const parts = line.split(" ");

    const curDir = path.join("/");

    if (parts[0] == "$") {
      if (parts[1] == "cd") {
        if (parts[2] === "..") {
          path.pop();
        } else {
          path.push(parts[2]);
        }
      }
    } else {
      asserts.assertExists(curDir);

      // I'm assuming this is after doing an ls. If this is not the case, this will blow up.
      if (parts[0] === "dir") {
        const childPath = getPath(parts[1]);

        tree[curDir]
          ? tree[curDir].add(childPath)
          : tree[curDir] = new Set([childPath]);
      } else {
        tree[curDir]
          ? tree[curDir].add(parts[0])
          : tree[curDir] = new Set([parts[0]]);
      }
    }
  });

  // traverse tree

  // console.log(tree);

  // return;

  const cache = {};

  function getSize(dir: string) {
    if (cache[dir]) {
      return cache[dir];
    }

    let dirSize = 0;

    for (const item of tree[dir]) {
      const isDir = isNaN(parseInt(item));

      if (isDir) {
        const childDirSize = getSize(item);
        dirSize += childDirSize;
      } else {
        dirSize += parseInt(item);
      }
    }

    cache[dir] = dirSize;

    return dirSize;
  }

  getSize("/");

  return lodash.sum(
    Object.values(cache).filter((folder) => folder <= 100000),
  );
};

export const part2 = (input: string) => {
  const lines = input.split("\n");

  // start coding here

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
