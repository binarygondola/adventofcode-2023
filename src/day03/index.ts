import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let reNum = /(\d+)/g;
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    let row = input[i];
    let nums = [...row.matchAll(reNum)];

    let withIndex = nums.map((x) => [x[0].length, x.index!, parseInt(x[0])]);

    for (let k = 0; k < withIndex.length; k++) {
      let len = withIndex[k][0];
      let idx = withIndex[k][1];
      let val = withIndex[k][2];

      let start = idx - 1 >= 0 ? idx - 1 : idx;
      let end = idx + len + 1 <= row.length ? idx + len + 1 : idx + len;
      
      let left = idx - 1 >= 0 ? row[idx - 1] : "";
      let right = idx + len < row.length ? row[idx + len] : "";

      let upper = i - 1 >= 0 ? input[i - 1].slice(start, end): "";
      let lower = i + 1 < input.length ? input[i + 1].slice(start, end): "";
      
      if (`${upper}${left}${right}${lower}`.replaceAll(".", "").length !== 0) {
        sum += val;
      }
    }
  }
  return sum;
};

const extractRowValue = (idx: number, row: string) => {
  let rowValue = "";
  let idxStart = idx - 1 >= 0 ? idx - 1 : idx;
  let idxEnd = idx + 1 <= row.length ? idx + 1 : idx;
  rowValue = row.slice(idxStart, idxEnd);
  while ("0123456789".includes(row[idxStart])) {
    idxStart--;
    if (idxStart < 0) {
      idxStart = 0;
      rowValue = row.slice(idxStart, idxEnd);
      break;
    }
    rowValue = row.slice(idxStart, idxEnd);
  }
  while ("0123456789".includes(row[idxEnd])) {
    idxEnd++;
    if (idxEnd > row.length) {
      idxEnd = row.length;
      rowValue = row.slice(idxStart, idxEnd);
      break;
    }
    rowValue = row.slice(idxStart, idxEnd);
  }
  return rowValue;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let reGear = /(\*)/g;
  let sum = 0;
  
  for (let i = 0; i < input.length; i++) {
    let row = input[i];
    let gears = [...row.matchAll(reGear)];
    let gearIdx = gears.map((x) => [x.index!][0]);
    for (let k = 0; k < gearIdx.length; k++) {
      let idx = gearIdx[k];

      let upper = i - 1 >= 0 ? extractRowValue(idx, input[i - 1]): "";
      let lower = i + 1 < input.length ? extractRowValue(idx, input[i + 1]): "";

      let left = idx - 1 >= 0 ? row[idx - 1] : ".";
      if ("0123456789".includes(left)) {
        left = row.slice(Math.max(idx - 3, 0), idx);
      }

      let right = idx + 1 < row.length ? row[idx + 1] : "";
      if ("0123456789".includes(right)) {
        right = row.slice(idx + 1, Math.min(row.length, idx + 4));
      }

      let nums = /(\d+)\D+(\d+)/.exec(`${upper}.${left}.${right}.${lower}`);
      if (nums) {
        sum += parseInt(nums[1]) * parseInt(nums[2]);
      }
    }
  }
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 467835,
      },
      {
        input: `..........
..........
..........
..........
..222.....
..........
...@#$....
...222*111
...$#@....`,
        expected: 24642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
