export const part1 = (input: string) => {
  interface Monkey {
    items: number[];
    operation: (worry: number) => number;
    test: (worry: number) => number;
  }

  const monkeys: Monkey[] = [{
    items: [73, 77],
    operation: (old) => old * 5,
    test: (num) => num % 11 === 0 ? 6 : 5,
  }, {
    items: [57, 88, 80],
    operation: (old) => old + 5,
    test: (num) => num % 19 === 0 ? 6 : 0,
  }, {
    items: [61, 81, 84, 69, 77, 88],
    operation: (old) => old * 19,
    test: (num) => num % 5 === 0 ? 3 : 1,
  }, {
    items: [78, 89, 71, 60, 81, 84, 87, 75],
    operation: (old) => old + 7,
    test: (num) => num % 3 === 0 ? 1 : 0,
  }, {
    items: [60, 76, 90, 63, 86, 87, 89],
    operation: (old) => old + 2,
    test: (num) => num % 13 === 0 ? 2 : 7,
  }, {
    items: [88],
    operation: (old) => old + 1,
    test: (num) => num % 17 === 0 ? 4 : 7,
  }, {
    items: [84, 98, 78, 85],
    operation: (old) => old * old,
    test: (num) => num % 7 === 0 ? 5 : 4,
  }, {
    items: [98, 89, 78, 73, 71],
    operation: (old) => old + 4,
    test: (num) => num % 2 === 0 ? 3 : 2,
  }];

  // const monkeys: Monkey[] = [{
  //   items: [79, 98],
  //   operation: (old) => old * 19,
  //   test: (num) => num % 23 === 0 ? 2 : 3,
  // }, {
  //   items: [54, 65, 75, 74],
  //   operation: (old) => old + 6,
  //   test: (num) => num % 19 === 0 ? 2 : 0,
  // }, {
  //   items: [79, 60, 97],
  //   operation: (old) => old * old,
  //   test: (num) => num % 13 === 0 ? 1 : 3,
  // }, {
  //   items: [74],
  //   operation: (old) => old + 3,
  //   test: (num) => num % 17 === 0 ? 0 : 1,
  // }];

  const monkeyBusiness = Array(8).fill(0);

  let round = 0;

  while (round < 20) {
    for (let i = 0; i < monkeys.length; i++) {
      const items = monkeys[i].items.length;

      for (let j = 0; j < items; j++) {
        const worry = monkeys[i].items.shift();
        monkeyBusiness[i]++;

        let newWorry = monkeys[i].operation(worry);
        newWorry = Math.floor(newWorry / 3);

        const sendToIndex = monkeys[i].test(newWorry);

        monkeys[sendToIndex].items.push(newWorry);
      }
    }
    round++;
  }

  return monkeyBusiness.sort((a, b) => b - a).slice(0, 2).reduce(
    (acc, num) => acc * num,
    1,
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
