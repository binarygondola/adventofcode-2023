import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let re = /Card\s+(\d+)\: (.+) \| (.+)/;
  let sum = 0;

  for (let row of input) {
    let r = re.exec(row)!;
    let myNums = r[3].replaceAll(/\s\s/g, " ").trim().split(" ").map(Number);
    let winningNums = r[2].replace(/\s+/g, " ").trim().split(" ").map(Number);

    let x = myNums.reduce(
      (acc, val) => (winningNums.includes(val) ? acc * 2 : acc),
      1,
    );
    x = x === 1 ? 0 : x / 2;
    sum += x;
  }
  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let copies = new Array(input.length).fill(1);

  let cardsRe = /Card\s+(\d+)\: (.+) \| (.+)/;
  for (let i = 0; i < input.length; i++) {
    let result = cardsRe.exec(input[i]);
    let nums = result![3].replaceAll(/\s\s/g, " ").trim().split(" ").map(Number);
    let winning = result![2].replace(/\s+/g, " ").trim().split(" ").map(Number);

    let x = nums.reduce(
      (acc, val) => (winning.includes(val) ? acc + 1 : acc),
      0,
    );

    for (let j = i; j < x + i; j++) {
      copies[j + 1] += copies[i];
    }
  }
  return copies.reduce((prev, curr) => prev + curr);
};

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
