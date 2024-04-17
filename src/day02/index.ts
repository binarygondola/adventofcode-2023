import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sumId = 0;

  let greenRe = /(\d+) green/;
  let blueRe = /(\d+) blue/;
  let redRe = /(\d+) red/;

  for (let row of input) {
    let [gameNum, record] = row.trim().split(": ");
    let games = record.split(";");

    let possible = true;

    for (let game of games) {
      if (redRe.test(game)) {
        let redCount = parseInt(redRe.exec(game)![1]);
        if (redCount > 12) {
          possible = false;
          break;
        }
      }
      if (greenRe.test(game)) {
        let greenCount = parseInt(greenRe.exec(game)![1]);
        if (greenCount > 13) {
          possible = false;
          break;
        }
      }
      if (blueRe.test(game)) {
        let blueCount = parseInt(blueRe.exec(game)![1]);
        if (blueCount > 14) {
          possible = false;
          break;
        }
      }
    }

    if (possible) {
      sumId += parseInt(gameNum.split(" ")[1]);
    }
  }
  return sumId;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sumPowers = 0;

  for (let row of input) {
    let record = row.trim().split(": ")[1];
    let games = record.split(";");

    let greenRe = /(\d+) green/;
    let blueRe = /(\d+) blue/;
    let redRe = /(\d+) red/;

    let mins = [0, 0, 0];

    for (let game of games) {
      if (redRe.test(game)) {
        let redCount = parseInt(redRe.exec(game)![1]);
        if (redCount > mins[0]) {
          mins[0] = redCount;
        }
      }
      if (greenRe.test(game)) {
        let greenCount = parseInt(greenRe.exec(game)![1]);
        if (greenCount > mins[1]) {
          mins[1] = greenCount;
        }
      }
      if (blueRe.test(game)) {
        let blueCount = parseInt(blueRe.exec(game)![1]);
        if (blueCount > mins[2]) {
          mins[2] = blueCount;
        }
      }
    }

    sumPowers += mins[0] * mins[1] * mins[2];
  }

  return sumPowers;
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
