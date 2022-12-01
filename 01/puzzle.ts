export const part1 = (input: string) => {
  const list = input.split("\n");

  let maxCaloriesSeen = 0;
  let elfSum = 0;

  list.forEach((item, i) => {
    if (!item || i === list.length - 1) {
      if (elfSum > maxCaloriesSeen) {
        maxCaloriesSeen = elfSum;
      }
      elfSum = 0;
    } else {
      elfSum += Number(item);
    }
  });

  return maxCaloriesSeen;
};

export const part2 = (input: string) => {
  const list = input.split("\n");

  const totalCaloriesByElf: number[] = [];

  let currentSum = 0;

  list.forEach((item, i) => {
    if (!item) {
      totalCaloriesByElf.push(currentSum);
      currentSum = 0;
    } else {
      currentSum += Number(item);

      if (i === list.length - 1) {
        totalCaloriesByElf.push(currentSum);
      }
    }
  });

  const [first, second, third, ..._rest] = totalCaloriesByElf.sort((a, b) =>
    b - a
  );

  return first + second + third;
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
