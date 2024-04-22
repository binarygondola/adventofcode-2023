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

  let expanded = [...input];

  for (let i = 0; i < rowExpand.length; i++) {
    let str = new Array(expanded[0].length).fill('.').join('');
    expanded = [...expanded.slice(0, rowExpand[i] + i), str, ...expanded.slice(rowExpand[i] + i)];
  }

  for (let i = 0; i < expanded.length; i++) {
    for (let j = 0; j < colExpand.length; j++) {
      expanded[i] = [...expanded[i].slice(0, colExpand[j] + j), '.', ...expanded[i].slice(colExpand[j] + j)].join('');
    }
  }

  let positions: number[][] = [];

  expanded.map(x => x.split('')).forEach((x, i) => x.forEach((y, j) => {
    if (y === '#') {
      positions.push([i, j]);
    }
  }));

  let sum = 0;

  positions.forEach((x, i) => positions.slice(i + 1).forEach((y) => {
    sum += Math.abs(x[0] - y[0]) + Math.abs(x[1] - y[1]);
  }))

  return sum;
};

const part2 = (rawInput: string) => {
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

  let expanded = [...input];

  let positions: number[][] = [];

  expanded.map(x => x.split('')).forEach((x, i) => x.forEach((y, j) => {
    if (y === '#') {
      positions.push([i, j]);
    }
  }));

  let sum = 0;

  for (let i = 0; i < positions.length; i++) {
    let x = positions[i][0];
    let y = positions[i][1];

    let rowMul = rowExpand.map(a => a > x).lastIndexOf(false);
    // here
  }

  positions.forEach((x, i) => positions.slice(i + 1).forEach((y) => {
    sum += Math.abs(x[0] - y[0]) + Math.abs(x[1] - y[1]);
  }))

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`,
        expected: 374,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`,
        expected: 8410,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
