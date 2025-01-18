import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const pushNorth = (arr: string[][]) => {
  for (let i = 1; i < arr.length; i += 1) {
    for (let j = 0; j < arr[i].length; j += 1) {
      let item = arr[i][j];
      if (item === 'O') {
        let column = arr.map((row => row[j])).slice(0, i);
        let lastObstaclePos = Math.max(column.lastIndexOf('O'), column.lastIndexOf('#'));
        arr[i][j] = '.';
        arr[lastObstaclePos + 1][j] = item;
      }
    }
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let arr = input.map(row => row.split(''));

  pushNorth(arr);

  let sum = arr.map((row, idx) => row.filter(a => a === 'O').length * (arr.length - idx)).reduce((prev, curr) => prev + curr, 0);

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let arr = input.map(row => row.split(''));

  let sums = [];
  let n = 0;

  while (true) {
    for (let k = 0; k < 4; k += 1) {
      pushNorth(arr);
      // rotating right
      arr = arr.map((row, y) => row.map((_, x) => arr[row.length - x - 1][y]));
    }

    let partialSums = arr.map((row, idx) => row.filter(a => a === 'O').length * (arr.length - idx));
    sums.push(partialSums.reduce((prev, curr) => prev + curr, 0));

    let cycleLength = 3;
    while (cycleLength < sums.length / 3) {
      let maybeCycles = [];
      let tmp = sums.map(x => x).reverse();
      maybeCycles.push(tmp.slice(0, cycleLength).join(','));
      maybeCycles.push(tmp.slice(cycleLength, 2 * cycleLength).join(','));
      maybeCycles.push(tmp.slice(2 * cycleLength, 3 * cycleLength).join(','));

      if (maybeCycles[0] === maybeCycles[1] && maybeCycles[1] === maybeCycles[2]) {
        let cycle = maybeCycles[0].split(',').reverse();
        n += 1;
        let fullRotations = 1000000000;
        let currentRotation = fullRotations - n;
        let cyclesCount = Math.floor(currentRotation / cycleLength);
        let idx = fullRotations - (n + cyclesCount * cycleLength) - 1;

        return +(cycle[idx]);
      }
      cycleLength += 1;
    }
    n += 1;
  }
};

run({
  part1: {
    tests: [
      {
        input: `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`,
        expected: 136,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`,
        expected: 64,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
