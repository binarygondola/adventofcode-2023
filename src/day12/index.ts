import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let sum = 0;
  let res = [];
  let bins = new Array(110).fill(0);
  let maxNum = 0;

  for (let row of input) {
    let [springs, hashPattern] = row.split(" ");

    springs = springs.replaceAll(/\.+/g, ".").replaceAll(/^\.+/g, "").replaceAll(/\.+$/g, "");

    let patterns = hashPattern.split(",").map(Number);

    let hashCount = springs.split("").reduce((a, c) => (c === "#" ? a + 1 : a), 0);
    let hashPatternSum = patterns.reduce((a, b) => a + b, 0);
    let questionMarksCount = springs.replaceAll(/[^\?]/g, "").length;
    let missingHashes = hashPatternSum - hashCount;
    let maxCombination = Math.pow(2, questionMarksCount);

    let num = 0;
    for (let i = 0; i < maxCombination; i++) {
      let binaryNum = i.toString(2).padStart(questionMarksCount, "0");
      let newPattern = binaryNum.split("").map(x => (x === "0" ? '.' : '#')).join("");
      let newPatternHashSum = newPattern.split("").reduce((a, b) => b === '#' ? a + 1 : a, 0);

      if (newPatternHashSum === missingHashes) {
        let tmpPattern = [...newPattern];
        let tmpSprings = springs.split("").map(x => x === "?" ? tmpPattern.shift() : x).join("");
        tmpSprings = tmpSprings.replaceAll(/\.+/g, ".").replaceAll(/^\.+/g, "").replaceAll(/\.+$/g, "");
        let newHashPattern = tmpSprings.split('.').map(x => x.length);
        if (newHashPattern.toString() === patterns.toString()) {
          num++;
        }
      }
    }

    res.push(num);
    bins[num] += 1;
    maxNum = Math.max(maxNum, num);
    sum += num;
  }
  console.log(maxNum);
  console.log(bins.slice(0, 50));
  console.log(bins.slice(51, 110));

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  for (let row of input) {
    let [springsPattern, hashPattern] = row.split(" ");

    springsPattern = new Array(5).fill(springsPattern).join("?");
    hashPattern = new Array(5).fill(hashPattern).join(",");

    springsPattern = springsPattern.replaceAll(/\.+/g, ".").replaceAll(/^\.+/g, "").replaceAll(/\.+$/g, "");

    // console.log(springsPattern);
  }

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
        input: '????????????????????? 2,1,2,1',
        expected: 0,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.# 1
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`,
        expected: 525152,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
