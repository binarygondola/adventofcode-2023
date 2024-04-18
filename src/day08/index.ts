import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let lr = input.shift()!;

  input.shift();

  let map = new Map();
  for (let line of input) {
    let [key, _, left, right] = line.split(' ');
    left = left.replace('(', '').replace(',', '');
    right = right.replace(')', '');
    map.set(key, [left, right]);
  }

  let lrIdx = 1;
  let current = map.get('AAA')[lr[0] === 'L' ? 0 : 1];
  while (current !== 'ZZZ') {
    current = map.get(current)[lr[lrIdx++ % lr.length] === 'L' ? 0 : 1];
  }

  return lrIdx;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const getCycle = (lr: string, current: string, map: Map<string, string[]>) => {
  let lrIdx = 0;
  while (!current.endsWith('Z')) {
    current = map.get(current)![lr[lrIdx % lr.length] === 'L' ? 0 : 1];
    lrIdx++;
  }

  return lrIdx;
}

const gcd = (a: number, b: number): number => {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

const lcm = (a: number, b: number): number => {
  return (a * b) / (gcd(a, b));
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let lr = input.shift()!;
  input.shift();

  let map = new Map();
  for (let line of input) {
    let [key, _, left, right] = line.split(' ');
    left = left.replace('(', '').replace(',', '');
    right = right.replace(')', '');
    map.set(key, [left, right]);
  }

  let currentPoints = [...map.keys()].filter((x) => x.endsWith('A'));
  let cycles = [];

  for (let i = 0; i < currentPoints.length; i++) {
    cycles.push(getCycle(lr, currentPoints[i], map));
  }

  let sum = 1;
  for (let i = 0; i < cycles.length; i++) {
    sum = lcm(cycles[i], sum);
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`,
        expected: 2,
      },
      {
        input: `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
