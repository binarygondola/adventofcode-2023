import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n\n");

const checkHorizontal = (rows: string[], row: number) => {
  let i = row;
  let j = row + 1;
  while (i >= 0 && j < rows.length) {
    if (rows[i] !== rows[j]) return false;
    i--;
    j++;
  }
  return true;
};

const getTransposed = (pattern: string[]) => {
  let transposed = [];

  for (let i = 0; i < pattern[0].length; i += 1) {
    let newRow = pattern.reduce((acc, curr) => acc + curr[i], "");
    transposed.push(newRow);
  }

  return transposed;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let colNum = 0;
  let rowNum = 0;

  for (let pattern of input) {
    let rows = pattern.split("\n");

    for (let i = 0; i < rows.length - 1; i += 1) {
      if (checkHorizontal(rows, i)) {
        rowNum += 100 * (i + 1);
      }
    }

    let transposed = getTransposed(rows);

    for (let i = 0; i < transposed.length - 1; i += 1) {
      if (checkHorizontal(transposed, i)) {
        colNum += i + 1;
      }
    }
  }
  console.log("part1: ", rowNum + colNum);

  return rowNum + colNum;
};

const countSmudgesInTwoRows = (row1: string, row2: string) => {
  let count = 0;
  for (let i = 0; i < row1.length; i += 1) {
    if (row1[i] !== row2[i]) count += 1;
  }
  return count;
};

const countAllSmudges = (rows: string[], row: number) => {
  let i = row;
  let j = row + 1;
  let allSmudges = 0;

  while (i >= 0 && j < rows.length) {
    allSmudges += countSmudgesInTwoRows(rows[i], rows[j]);
    i--;
    j++;
  }
  return allSmudges;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let colNum = 0;
  let rowNum = 0;

  input.forEach((pattern, idx) => {
    let rows = pattern.split("\n");
    for (let i = 0; i < rows.length - 1; i += 1) {
      if (countAllSmudges(rows, i) === 1) {
        rowNum += (i + 1) * 100;
      }
    }

    let transposed = getTransposed(rows);

    for (let i = 0; i < transposed.length - 1; i += 1) {
      if (countAllSmudges(transposed, i) === 1) {
        colNum += i + 1;
      }
    }
  });

  console.log("part2: ", colNum + rowNum);

  return rowNum + colNum;
};

run({
  part1: {
    tests: [
      {
        input: `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`,
        expected: 405,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`,
        expected: 400,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
