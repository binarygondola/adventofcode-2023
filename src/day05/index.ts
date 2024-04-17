import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let seedNums = input[0].matchAll(/(\d+)/g);
  let seeds = [...seedNums].map((x) => parseInt(x[0]));

  input.shift();

  input.forEach((element) => {
    let mappings = element.split("\n");
    mappings.shift();
    let mapping = mappings.map((x) => x.split(" ").map(Number));

    let seed = seeds[0];
    let mapped = seeds.map((x) => 0);
    for (let k = 0; k < mapping.length; k++) {
      let dest = mapping[k][0];
      let source = mapping[k][1];
      let range = mapping[k][2];

      let delta = dest - source;

      for (let s = 0; s < seeds.length; s++) {
        seed = seeds[s];
        if (seed >= source && seed <= source + range && mapped[s] !== 1) {
          seeds[s] = seed + delta;
          mapped[s] = 1;
        }
      }
    }

    mapped = seeds.map((x) => 0);
  });
  return Math.min(...seeds);
};

const getMin = (seeds: number[], mappings: number[][][]) => {
  let seed = seeds[0];
  let mapped = new Array(seeds.length).fill(0);
  for (let qwe = 0; qwe < mappings.length; qwe++) {
    let mapping = mappings[qwe];
    for (let k = 0; k < mapping.length; k++) {
      let dest = mapping[k][0];
      let source = mapping[k][1];
      let range = mapping[k][2];

      let diff = dest - source;

      for (let s = 0; s < seeds.length; s++) {
        seed = seeds[s];
        if (seed >= source && seed <= source + range && mapped[s] !== 1) {
          seeds[s] = seed + diff;
          mapped[s] = 1;
        }
      }
    }
    mapped = seeds.map((x) => 0);
  }
  let min = Number.MAX_SAFE_INTEGER;
  for (let num of seeds) {
    min = Math.min(min, num);
  }
  return min;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let matched = input[0].matchAll(/(\d+)/g);
  let seedPairs = [...matched].map((x) => parseInt(x[0]));
  input.shift();

  let min = Number.MAX_SAFE_INTEGER;
  let mapping: number[][][] = [];

  input.forEach((element) => {
    let mappingRaw = element.split("\n");
    mappingRaw.shift();
    mapping.push(mappingRaw.map((x) => x.split(" ").map(Number)));
  });

  let seeds: number[] = [];

  for (let s = 0; s < seedPairs.length; s += 2) {
    for (let tmp = 0; tmp < seedPairs[s + 1]; tmp++) {
      seeds.push(tmp + seedPairs[s]);
      if (seeds.length > 2000000) {
        let val = getMin(seeds, mapping);
        if (val < min) {
          min = val;
          console.log("counting...", min);
        }
        seeds = [];
      }
    }
  }
  let val = getMin(seeds, mapping);
  if (val < min) {
    min = val;
    console.log("here", min);
  }
  return min;
};

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
