import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(',');

const hash = (asciiCode: number, val: number) => {
  return (val + asciiCode) * 17 % 256;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let sum = 0;
  for (let step of input) {
    sum += step.split('').reduce((acc, c) => hash(c.charCodeAt(0), acc), 0);
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: 0,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: 0,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
