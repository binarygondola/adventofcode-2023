import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let rowExpand = [];
  let colExpand = [];
  for (let i = 0; i < input.length; i++) {
    if (!input[i].includes("#")) {
      rowExpand.push(i);
    }
  }

  for (let i = 0; i < input[0].length; i++) {
    let col = input.map((x) => x[i]);
    if (!col.includes("#")) {
      colExpand.push(i);
    }
  }

  console.log(colExpand);

  return;
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
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
