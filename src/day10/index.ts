import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let row = input.findIndex((row) => row.includes('S'));
  let startingPosition = [row, input[row].indexOf('S')];

  let vis = new Array(input.length).fill(0).map(() => new Array(input[0].length).fill(-1));

  let queue = [{ p: startingPosition, steps: 0 }];

  while (queue.length > 0) {
    let elem = queue.shift()!;
    let p = elem.p;
    let steps = elem.steps;
    let currentPipe = input[p[0]][p[1]];

    if (vis[p[0]][p[1]] === -1) {
      vis[p[0]][p[1]] = steps;

      let up = [p[0] - 1, p[1]];
      let down = [p[0] + 1, p[1]];
      let left = [p[0], p[1] - 1];
      let right = [p[0], p[1] + 1];

      switch (currentPipe) {
        case 'S':
          if (input[up[0]][up[1]] === '|' || input[up[0]][up[1]] === '7' || input[up[0]][up[1]] === 'F') {
            queue.push({ p: up, steps: steps + 1 });
          }
          if (input[down[0]][down[1]] === '|' || input[down[0]][down[1]] === 'J' || input[down[0]][down[1]] === 'L') {
            queue.push({ p: down, steps: steps + 1 });
          }
          if (input[left[0]][left[1]] === '-' || input[left[0]][left[1]] === 'L' || input[left[0]][left[1]] === 'F') {
            queue.push({ p: left, steps: steps + 1 });
          }
          if (input[right[0]][right[1]] === '-' || input[right[0]][right[1]] === '7' || input[right[0]][right[1]] === 'J') {
            queue.push({ p: right, steps: steps + 1 });
          }
          break;
        case '|':
          queue.push({ p: down, steps: steps + 1 });
          queue.push({ p: up, steps: steps + 1 });
          break;
        case '-':
          queue.push({ p: left, steps: steps + 1 });
          queue.push({ p: right, steps: steps + 1 });
          break;
        case 'L':
          queue.push({ p: up, steps: steps + 1 });
          queue.push({ p: right, steps: steps + 1 });
          break;
        case 'F':
          queue.push({ p: down, steps: steps + 1 });
          queue.push({ p: right, steps: steps + 1 });
          break;
        case '7':
          queue.push({ p: down, steps: steps + 1 });
          queue.push({ p: left, steps: steps + 1 });
          break;
        case 'J':
          queue.push({ p: up, steps: steps + 1 });
          queue.push({ p: left, steps: steps + 1 });
          break;
        case '.':
          break;
      }
    }
  }

  let max = 0;
  for (let i = 0; i < vis.length; i++) {
    max = Math.max(max, ...vis[i]);
  }
  return max;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let row = input.findIndex((row) => row.includes('S'));
  let startingPosition = [row, input[row].indexOf('S')];

  let up = [startingPosition[0] - 1, startingPosition[1]];
  let down = [startingPosition[0] + 1, startingPosition[1]];
  let left = [startingPosition[0], startingPosition[1] - 1];
  let right = [startingPosition[0], startingPosition[1] + 1];
  // up, down, left, right
  let dirs = new Array(4).fill(false);

  if (input[up[0]][up[1]] === '|' || input[up[0]][up[1]] === '7' || input[up[0]][up[1]] === 'F') {
    dirs[0] = true;
  }
  if (input[down[0]][down[1]] === '|' || input[down[0]][down[1]] === 'J' || input[down[0]][down[1]] === 'L') {
    dirs[1] = true;
  }
  if (input[left[0]][left[1]] === '-' || input[left[0]][left[1]] === 'L' || input[left[0]][left[1]] === 'F') {
    dirs[2] = true;
  }
  if (input[right[0]][right[1]] === '-' || input[right[0]][right[1]] === '7' || input[right[0]][right[1]] === 'J') {
    dirs[3] = true;
  }

  let newS = '';
  let fromObj = {
    up: 0,
    down: 1,
    left: 2,
    right: 3,
  }
  let from = 0; // 0 = up, 1 = down, 2 = left, 3 = right

  if (dirs[0] && dirs[1]) {
    newS = '|';
    from = fromObj.up;
  } else if (dirs[0] && dirs[2]) {
    newS = 'J';
    from = fromObj.up;
  } else if (dirs[0] && dirs[3]) {
    newS = 'L';
    from = fromObj.up;
  } else if (dirs[1] && dirs[2]) {
    newS = '7';
    from = fromObj.down;
  } else if (dirs[1] && dirs[3]) {
    newS = 'F';
    from = fromObj.down;
  } else if (dirs[2] && dirs[3]) {
    newS = '-';
    from = fromObj.left;
  }

  input[startingPosition[0]] = input[startingPosition[0]].replace('S', newS);

  let queue = [{ p: startingPosition, from: from }];

  let vis = new Array(input.length).fill(0).map(() => new Array(input[0].length).fill('O'));

  while (queue.length > 0) {
    let elem = queue.shift()!;
    let p = elem.p;
    let from = elem.from;
    let currentPipe = input[p[0]][p[1]];

    if (vis[p[0]][p[1]] === 'O') {
      vis[p[0]][p[1]] = currentPipe;

      up = [p[0] - 1, p[1]];
      down = [p[0] + 1, p[1]];
      left = [p[0], p[1] - 1];
      right = [p[0], p[1] + 1];

      switch (currentPipe) {
        case '|':
          if (from === fromObj.up) {
            queue.push({ p: down, from: fromObj.up });
          } else {
            queue.push({ p: up, from: fromObj.down });
          }
          break;
        case '-':
          if (from === fromObj.left) {
            queue.push({ p: right, from: fromObj.left });
          } else {
            queue.push({ p: left, from: fromObj.right });
          }
          break;
        case 'L':
          if (from === fromObj.up) {
            queue.push({ p: right, from: fromObj.left });
          } else {
            queue.push({ p: up, from: fromObj.down });
          }
          break;
        case 'F':
          if (from === fromObj.down) {
            queue.push({ p: right, from: fromObj.left });
          } else {
            queue.push({ p: down, from: fromObj.up });
          }
          break;
        case '7':
          if (from === fromObj.down) {
            queue.push({ p: left, from: fromObj.right });
          } else {
            queue.push({ p: down, from: fromObj.up });
          }
          break;
        case 'J':
          if (from === fromObj.up) {
            queue.push({ p: left, from: fromObj.right });
          } else {
            queue.push({ p: up, from: fromObj.down });
          }
          break;
        case '.':
          break;
      }
    }
  }

  for (let i = 0; i < vis.length; i++) {
    let isF = false;
    let isL = false;
    let isInside = false;
    for (let j = 0; j < vis[0].length; j++) {
      switch (vis[i][j]) {
        case 'F':
          isF = true;
          break;
        case '7':
          if (isL) {
            isInside = !isInside;
            isL = false;
          }
          if (isF) {
            isF = false;
          }
          break;
        case 'L':
          isL = true;
          break;
        case 'J':
          if (isL) {
            isL = false;
          }
          if (isF) {
            isInside = !isInside;
            isF = false;
          }
          break;
        case '|':
          isInside = !isInside;
          break;
        case 'O':
          vis[i][j] = isInside ? 'I' : 'O';
      }
    }
  }

  return vis.reduce((a, b) => a + b.filter((x) => x === 'I').length, 0);
};

run({
  part1: {
    tests: [
      {
        input: `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`,
        expected: 8,
      },
      {
        input: `F---7
LS..|
FJ.FJ
|..L7
L---J
.....`,
        expected: 10,
      },
      {
        input: `.....
.S-7.
.|.|.
.L-J.
.....`,
        expected: 4,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`,
        expected: 1,
      },
      {
        input: `...........
.S-------7.
.|F-----7|.
.||OOOOO||.
.||OOOOO||.
.|L-7OF-J|.
.|II|O|II|.
.L--JOL--J.
.....O.....`,
        expected: 4,
      },
      {
        input: `....................
OF----7F7F7F7F-7OOOO
O|F--7||||||||FJOOOO
O||OFJ||||||||L7OOOO
FJL7L7LJLJ||LJIL-7OO
L--JOL7IIILJS7F-7L7O
OOOOF-JIIF7FJ|L7L7L7
OOOOL7IF7||L7|IL7L7|
OOOOO|FJLJ|FJ|F7|OLJ
OOOOFJL-7O||O||||OOO
OOOOL---JOLJOLJLJOOO`,
        expected: 8,
      },
      {
        input: `....................
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`,
        expected: 10,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
