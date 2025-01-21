import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

type candidateType = { x: number; y: number; heat: number; };

const bfs = (vis: number[][], candidates: candidateType[], input: string[][]) => {
  while (candidates.length > 0) {
    let c = candidates.shift();
    if (c && c.y >= 0 && c.y < vis.length && c.x >= 0 && c.x < vis[0].length) {
      let i = +input[c.y][c.x];

      if (vis[c.y][c.x] === 0) {
        vis[c.y][c.x] = c.y * 1000 + c.x;
        candidates.push({
          x: c.x + 1,
          y: c.y,
          heat: c.heat + i
        });
        candidates.push({
          x: c.x,
          y: c.y + 1,
          heat: c.heat + i
        });
        candidates.push({
          x: c.x - 1,
          y: c.y,
          heat: c.heat + i
        });
        candidates.push({
          x: c.x,
          y: c.y - 1,
          heat: c.heat + i
        });
        candidates.sort((a, b) => a.heat - b.heat);

        bfs(vis, candidates, input);
      }
    }
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).map(r => r.split(''));

  let vis: number[][] = new Array(input.length).fill(0).map(r => new Array(input[0].length).fill(0));
  let candidates = [];
  candidates.push({ x: 0, y: 0, heat: 0 })
  bfs(vis, candidates, input);

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`,
        expected: 102,
      },
      {
        input: `12
34`,
        expected: 6
      }
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
  onlyTests: true,
});
