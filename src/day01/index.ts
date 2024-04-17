import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let re = /([0-9])/g;
  let sum = 0;

  for (let s of input) {
    let match = [...s.matchAll(re)];
    let first = parseInt(match[0][0]);
    let last = parseInt(match[match.length - 1][0]);
    let val = first * 10 + last;
    sum += val;
  }

  return sum;
};

const parseStringNumbers = (s: string) => {
  let first = "";
  let firstIdx = 9000;

  let last = "";
  let lastIdx = -1;
  let numbers = `one, two, three, four, five, six, seven, eight, nine`.split(
    ", ",
  );

  for (let i = 0; i < numbers.length; i++) {
    let reFirst = new RegExp(numbers[i]);
    if (reFirst.test(s)) {
      let num = reFirst.exec(s)!;
      if (num.index < firstIdx) {
        firstIdx = num.index;
        first = numbers[i];
      }
    }

    let reLast = new RegExp(`${numbers[i]}(?!.*${numbers[i]})+`);

    if (reLast.test(s)) {
      let num = reLast.exec(s)!;
      if (num.index > lastIdx) {
        lastIdx = num.index;
        last = numbers[i];
      }
    }
  }

  let numFirst = numbers.findIndex((x) => x === first) + 1;
  let numLast = numbers.findIndex((x) => x === last) + 1;
  return [numFirst, firstIdx, numLast, lastIdx];
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;

  for (let s of input) {
    let firstNum = 0;
    let lastNum = 0;

    let firstIdx = 9000;
    let lastIdx = -1;

    let reNumber = /([0-9])/g;

    [firstNum, firstIdx, lastNum, lastIdx] = parseStringNumbers(s);

    let match = [...s.matchAll(reNumber)];
    if (reNumber.test(s)) {
      if (match[0].index! < firstIdx) {
        firstIdx = match[0].index!;
        firstNum = parseInt(match[0][0]);
      }
      if (match[match.length - 1].index! > lastIdx) {
        lastIdx = match[match.length - 1].index!;
        lastNum = parseInt(match[match.length - 1][0]);
      }
    }
    sum += firstNum * 10 + lastNum;
  }
  
  return sum;
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
      {
        input: `eightone1\noneonetwonetwone\n22twothree`,
        expected: 115,
      },
      {
        input: "eighthree",
        expected: 83,
      },
      {
        input: "hs5sevenasdnn",
        expected: 57,
      },
      {
        input: "oneoneoneonetwoone",
        expected: 11,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
