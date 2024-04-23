import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  for (let row of input) {
    let [springs, pattern] = row.split(" ");

    springs = springs.replaceAll(/\.+/g, ".");
    springs = springs.replaceAll(/^\.+/g, "");
    springs = springs.replaceAll(/\.+$/g, "");


    let parts = springs.split('.');
    let patterns = pattern.split(',').map(Number);
    let replaced = patterns.map(x => new Array(x).fill('#').join('')).join('.');
    console.log(patterns);
    console.log(springs)
    console.log(replaced);
    console.log();
  }

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`,
        expected: 21,
      },
      {
        input: `?????#????? 1,2`,
        expected: 21,
      },
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