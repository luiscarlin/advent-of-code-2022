export const part1 = (input: string) => {
  const pairs = input.split("\n\n");

  const isPacketInRightOrder = (
    left: any[] | number,
    right: any[] | number,
  ): boolean | number => {
    // If both values are integers, the lower integer should come first. If the left integer is lower than the right integer, the inputs are in the right order. If the left integer is higher than the right integer, the inputs are not in the right order. Otherwise, the inputs are the same integer

    if (typeof left === "number" && typeof right === "number") {
      if (left < right) {
        return true;
      } else if (left === right) {
        return -1;
      }
      return false;
    } // If both values are lists, compare the first value of each list, then the second value, and so on. If the left list runs out of items first, the inputs are in the right order. If the right list runs out of items first, the inputs are not in the right order. If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.
    else if (Array.isArray(left) && Array.isArray(right)) {
      for (let i = 0; i < Math.max(left.length, right.length); i++) {
        const [leftNum, rightNum] = [left[i], right[i]];
        if (leftNum === undefined) {
          return true;
        }

        if (rightNum === undefined) {
          return false;
        }

        const result = isPacketInRightOrder(leftNum, rightNum);

        if (result === -1) {
          continue;
        }
        return result;
      }
    } else {
      if (typeof left === "number") {
        return isPacketInRightOrder([left], right);
      }

      if (typeof right === "number") {
        return isPacketInRightOrder(left, [right]);
      }
    }

    // If exactly one value is an integer, convert the integer to a list which contains that integer as its only value, then retry the comparison. For example, if comparing [0,0,0] and 2, convert the right value to [2] (a list containing 2); the result is then found by instead comparing [0,0,0] and [2].

    return -1;
  };

  let sumIndex = 0;
  const indexes = [];

  for (const i of [...Array(pairs.length).keys()]) {
    const [left, right] = pairs[i].split("\n").map(eval);

    const result = isPacketInRightOrder(left, right);

    if (result === -1) {
      continue;
    }

    if (result) {
      sumIndex += i + 1;
      indexes.push(i + 1);
    }
  }

  return sumIndex;
};

export const part2 = (input: string) => {
  const pairs = input.split("\n\n");

  const sortingFunction = (
    left: any[] | number,
    right: any[] | number,
  ): number => {
    // If both values are integers, the lower integer should come first. If the left integer is lower than the right integer, the inputs are in the right order. If the left integer is higher than the right integer, the inputs are not in the right order. Otherwise, the inputs are the same integer

    if (typeof left === "number" && typeof right === "number") {
      if (left < right) {
        return -1;
      } else if (left === right) {
        return 0;
      }
      return 1;
    } // If both values are lists, compare the first value of each list, then the second value, and so on. If the left list runs out of items first, the inputs are in the right order. If the right list runs out of items first, the inputs are not in the right order. If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.
    else if (Array.isArray(left) && Array.isArray(right)) {
      for (let i = 0; i < Math.max(left.length, right.length); i++) {
        const [leftNum, rightNum] = [left[i], right[i]];
        if (leftNum === undefined) {
          return -1;
        }

        if (rightNum === undefined) {
          return 1;
        }

        const result = sortingFunction(leftNum, rightNum);

        if (result === 0) {
          continue;
        }
        return result;
      }
    } else {
      if (typeof left === "number") {
        return sortingFunction([left], right);
      }

      if (typeof right === "number") {
        return sortingFunction(left, [right]);
      }
    }

    // If exactly one value is an integer, convert the integer to a list which contains that integer as its only value, then retry the comparison. For example, if comparing [0,0,0] and 2, convert the right value to [2] (a list containing 2); the result is then found by instead comparing [0,0,0] and [2].
    return 0;
  };

  const allSteps = [[[2]], [[6]]];

  for (const i of [...Array(pairs.length).keys()]) {
    const [left, right] = pairs[i].split("\n").map(eval);

    allSteps.push(left, right);
  }

  const sortedList = allSteps.sort(sortingFunction);
  const indexes = [];

  for (let i = 0; i < sortedList.length; i++) {
    if (
      [JSON.stringify([[2]]), JSON.stringify([[6]])].includes(
        JSON.stringify(sortedList[i]),
      )
    ) {
      indexes.push(i + 1);
    }
  }

  return indexes.reduce((acc, item) => acc * item, 1);
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
