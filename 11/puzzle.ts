import { asserts } from "/deps.ts";

interface Monkey {
  items: number[];
  operation: (worry: number) => number;
  div: number;
  test: (worry: number, div: number) => number;
}

export const part1 = () => {
  const monkeys: Monkey[] = [{
    items: [73, 77],
    operation: (old) => old * 5,
    div: 11,
    test: (num, div) => num % div === 0 ? 6 : 5,
  }, {
    items: [57, 88, 80],
    operation: (old) => old + 5,
    div: 19,
    test: (num, div) => num % div === 0 ? 6 : 0,
  }, {
    items: [61, 81, 84, 69, 77, 88],
    operation: (old) => old * 19,
    div: 5,
    test: (num, div) => num % div === 0 ? 3 : 1,
  }, {
    items: [78, 89, 71, 60, 81, 84, 87, 75],
    operation: (old) => old + 7,
    div: 3,
    test: (num, div) => num % div === 0 ? 1 : 0,
  }, {
    items: [60, 76, 90, 63, 86, 87, 89],
    operation: (old) => old + 2,
    div: 13,
    test: (num, div) => num % div === 0 ? 2 : 7,
  }, {
    items: [88],
    operation: (old) => old + 1,
    div: 17,
    test: (num, div) => num % div === 0 ? 4 : 7,
  }, {
    items: [84, 98, 78, 85],
    operation: (old) => old * old,
    div: 7,
    test: (num, div) => num % div === 0 ? 5 : 4,
  }, {
    items: [98, 89, 78, 73, 71],
    operation: (old) => old + 4,
    div: 2,
    test: (num, div) => num % div === 0 ? 3 : 2,
  }];

  // const monkeys: Monkey[] = [{
  //   items: [79, 98],
  //   operation: (old) => old * 19,
  //   div: 23,
  //   test: (num, div) => num % div === 0 ? 2 : 3,
  // }, {
  //   items: [54, 65, 75, 74],
  //   operation: (old) => old + 6,
  //   div: 19,
  //   test: (num, div) => num % div === 0 ? 2 : 0,
  // }, {
  //   items: [79, 60, 97],
  //   operation: (old) => old * old,
  //   div: 13,
  //   test: (num, div) => num % div === 0 ? 1 : 3,
  // }, {
  //   items: [74],
  //   operation: (old) => old + 3,
  //   div: 17,
  //   test: (num, div) => num % div === 0 ? 0 : 1,
  // }];

  const monkeyBusiness = Array(8).fill(0);

  let round = 0;

  while (round < 20) {
    for (let i = 0; i < monkeys.length; i++) {
      const items = monkeys[i].items.length;

      for (let j = 0; j < items; j++) {
        const worry = monkeys[i].items.shift();
        monkeyBusiness[i]++;

        asserts.assertExists(worry);

        let newWorry = monkeys[i].operation(worry);
        newWorry = Math.floor(newWorry / 3);

        const sendToIndex = monkeys[i].test(newWorry, monkeys[i].div);

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

export const part2 = () => {
  const monkeys: Monkey[] = [{
    items: [73, 77],
    operation: (old) => old * 5,
    div: 11,
    test: (num, div) => num % div === 0 ? 6 : 5,
  }, {
    items: [57, 88, 80],
    operation: (old) => old + 5,
    div: 19,
    test: (num, div) => num % div === 0 ? 6 : 0,
  }, {
    items: [61, 81, 84, 69, 77, 88],
    operation: (old) => old * 19,
    div: 5,
    test: (num, div) => num % div === 0 ? 3 : 1,
  }, {
    items: [78, 89, 71, 60, 81, 84, 87, 75],
    operation: (old) => old + 7,
    div: 3,
    test: (num, div) => num % div === 0 ? 1 : 0,
  }, {
    items: [60, 76, 90, 63, 86, 87, 89],
    operation: (old) => old + 2,
    div: 13,
    test: (num, div) => num % div === 0 ? 2 : 7,
  }, {
    items: [88],
    operation: (old) => old + 1,
    div: 17,
    test: (num, div) => num % div === 0 ? 4 : 7,
  }, {
    items: [84, 98, 78, 85],
    operation: (old) => old * old,
    div: 7,
    test: (num, div) => num % div === 0 ? 5 : 4,
  }, {
    items: [98, 89, 78, 73, 71],
    operation: (old) => old + 4,
    div: 2,
    test: (num, div) => num % div === 0 ? 3 : 2,
  }];

  // const monkeys: Monkey[] = [{
  //   items: [79, 98],
  //   operation: (old) => old * 19,
  //   div: 23,
  //   test: (num, div) => num % div === 0 ? 2 : 3,
  // }, {
  //   items: [54, 65, 75, 74],
  //   operation: (old) => old + 6,
  //   div: 19,
  //   test: (num, div) => num % div === 0 ? 2 : 0,
  // }, {
  //   items: [79, 60, 97],
  //   operation: (old) => old * old,
  //   div: 13,
  //   test: (num, div) => num % div === 0 ? 1 : 3,
  // }, {
  //   items: [74],
  //   operation: (old) => old + 3,
  //   div: 17,
  //   test: (num, div) => num % div === 0 ? 0 : 1,
  // }];

  const monkeyBusiness = Array(8).fill(0);

  let round = 0;

  const lcm = monkeys.map((monkey) => monkey.div).reduce(
    (acc, num) => acc * num,
    1,
  );

  while (round < 10000) {
    for (let i = 0; i < monkeys.length; i++) {
      const items = monkeys[i].items.length;

      for (let j = 0; j < items; j++) {
        const worry = monkeys[i].items.shift();
        monkeyBusiness[i]++;

        asserts.assertExists(worry);

        let newWorry = monkeys[i].operation(worry);
        newWorry = newWorry % lcm;

        const sendToIndex = monkeys[i].test(newWorry, monkeys[i].div);

        monkeys[sendToIndex].items.push(newWorry);
      }
    }
    round++;
  }

  const sorted = monkeyBusiness.sort((a, b) => b - a);
  return sorted[0] * sorted[1];
};

export const main = () => {
  console.log("part1", part1());
  console.log("part2", part2());
};

import.meta.main && main();
