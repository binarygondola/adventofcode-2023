import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let maxR = 2000;
  let maxC = 2000;

  let arr = new Array(maxR).fill(0).map(() => new Array(maxC).fill(0));

  let r = maxR / 2;
  let c = maxC / 2;

  arr[r][c] = 1;

  let newR = 0;
  let newC = 0;

  for (let line of input) {
    let [dir, count, color] = line.split(' ');
    switch (dir) {
      case 'R':
        newR = r + +count;
        for (let i = r; i < newR; i++) {
          arr[c][i] = 1;
        }
        r = newR;
        break;
      case 'L':
        newR = r - +count;
        for (let i = r; i >= newR; i--) {
          arr[c][i] = 3;
        }
        r = newR;
        break;
      case 'D':
        newC = c + +count;
        for (let i = c; i < newC; i++) {
          arr[i][r] = 2;
        }
        c = newC;
        break;
      case 'U':
        newC = c - +count;
        for (let i = c; i >= newC; i--) {
          arr[i][r] = 4;
        }
        c = newC;
        break;
    }
  }

  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    let row = arr[i].join('');
    let re = /[34]+0*[21]+/g;
    if (re.test(row)) {
      let zeros = row.match(re)!.map(x => x.split('').filter(y => y === '0'));
      sum += zeros.map(x => x.length).reduce((a, b) => a + b, 0);
    }
    let nums = /[1-4]+/g;
    if (nums.test(row)) {
      let count = row.match(nums)!.map(x => x.length).reduce((a, b) => a + b, 0);
      sum += count;
    }
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
        input: `L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)
R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)`,
        expected: 62,
      },
      {
        input: `L 5 (#8ceee2)
U 4 (#caa173)
R 2 (#1b58a2)
D 2 (#caa171)
R 2 (#7807d2)
U 2 (#a77fa3)
R 2 (#015232)
D 5 (#7a21e3)`,
        expected: 33,
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
