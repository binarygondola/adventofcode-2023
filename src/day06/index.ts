import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let times = input[0].split(":")[1].trim().split(/\s+/).map(Number);
  let dist = input[1].split(":")[1].trim().split(/\s+/).map(Number);
  let wins = [];

  for (let i = 0; i < times.length; i++) {
    let arr = new Array(times[i]).fill(0);
    arr = arr.map((_, idx) => ((times[i] - idx) * idx > dist[i] ? 1 : 0));
    let count = arr.reduce((a, b) => a + b);
    wins.push(count);
  }

  return wins.reduce((a, b) => a * b);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let times = parseInt(input[0].split(":")[1].trim().split(/\s+/).join(""));
  let dist = parseInt(input[1].split(":")[1].trim().split(/\s+/).join(""));
  let min = 0;

  while (true) {
    min++;
    if ((times - min) * min > dist) {
      break;
    }
  }
  min--;

  let p = 0;
  let q = dist;
  let m = Math.round((p + q) / 2);
  while (true) {
    m = Math.round((p + q) / 2);
    if ((times - m) * m > dist) {
      p = m;
    } else {
      q = m;
    }
    if (p === q || q - p === 1) {
      break;
    }
  }

  if ((times - m) * m > dist) {
    m--;
  }

  return m - min;
};

run({
  part1: {
    tests: [
      {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
