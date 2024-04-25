import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let sum = 0;
  for (let row of input) {
    let [springs, pattern] = row.split(" ");

    springs = springs.replaceAll(/\.+/g, ".");
    springs = springs.replaceAll(/^\.+/g, "");
    springs = springs.replaceAll(/\.+$/g, "");

    let parts = springs.split(".");
    let patterns = pattern.split(",").map(Number);
    let replaced = patterns
      .map((x) => new Array(x).fill("#").join(""))
      .join(".");

    let hashCount = springs.split("").reduce((a, c) => (c === "#" ? a + 1 : a), 0);
    let sumPatterns = patterns.reduce((a, b) => a + b, 0);

    let questionMarks = springs.replaceAll(/[^\?]/g, "");

    let misiingHashes = sumPatterns - hashCount;

    let binary = misiingHashes.toString(2);
    let maxNum = Math.pow(2, questionMarks.length);

    let num = 0;
    for (let i = 0; i < maxNum; i++) {
      let bin = i.toString(2).padStart(questionMarks.length, "0");
      let newPattern = bin
        .split("")
        .map((x, j) => (x === "0" ? '.' : x === "1" ? "#" : x))
        .join("");
      if (newPattern.split('').reduce((a, b) => b === '#' ? a + 1 : a, 0) === misiingHashes) {
        let tmpPattern = [...newPattern];
        let tmpSprings = springs.split("").map((x, j) => x === "?" ? tmpPattern.shift() : x).join("");
        tmpSprings = tmpSprings.replaceAll(/\.+/g, ".");
        tmpSprings = tmpSprings.replaceAll(/^\.+/g, "");
        tmpSprings = tmpSprings.replaceAll(/\.+$/g, "");
        let splitted = tmpSprings.replaceAll(/\.+/g, ".").split('.').map(x => x.length);
        if (splitted.toString() === patterns.toString()) {
          num++;
        }
      }
    }

    sum += num;
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
      {
        input: `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`,
        expected: 21,
      },
      // {
      //   input: `?????#????? 1,2`,
      //   expected: 21,
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
