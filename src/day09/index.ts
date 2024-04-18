import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const predictNumber = (arr: number[]): number => {
  let diffs = [];
  for (let i = 0; i < arr.length - 1; i++) {
    diffs.push(arr[i + 1] - arr[i]);
  }
  if (diffs.map((x) => x === 0).includes(false)) {
    return arr[arr.length - 1] + predictNumber(diffs);
  } else {
    return arr[arr.length - 1];
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let ret = 0;
  for (let row of input) {
    let numbers = row.split(' ').map(Number);
    ret += predictNumber(numbers);
  }

  return ret;
};

const predictNumber2 = (arr: number[]): number => {
  let diffs = [];
  for (let i = 0; i < arr.length - 1; i++) {
    diffs.push(arr[i + 1] - arr[i]);
  }
  if (diffs.map((x) => x === 0).includes(false)) {
    return arr[0] - predictNumber2(diffs);
  } else {
    return arr[0];
  }
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let ret = 0;
  for (let row of input) {
    let numbers = row.split(' ').map(Number);
    ret += predictNumber2(numbers);
  }

  return ret;
};

run({
  part1: {
    tests: [
      {
        input: `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
