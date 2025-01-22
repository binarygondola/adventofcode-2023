import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

type position = { x: number; y: number };

type candidateType = { pos: position; heat: number; previous: [position, position, position], steps: number };

const getCandidate = (prev: candidateType, moveVec: position, currentPos: position, heat: number): candidateType => {
  return {
    pos: {
      x: prev.pos.x + moveVec.x,
      y: prev.pos.y + moveVec.y,
    },
    previous: [currentPos, ...prev.previous.slice(0, 2) as [position, position]],
    heat: prev.heat + heat,
    steps: prev.steps + 1,
  }
}

const isValidCandidate = (candidate: candidateType, dimX: number, dimY: number, vis: number[][]) => {
  let pos = candidate.pos;
  if (pos.y === candidate.previous[1].y && pos.x === candidate.previous[1].x) return false;
  let xs = new Set(candidate.previous.map(p => p.x));
  if (xs.size === 1 && pos.x === candidate.previous[0].x) return false;
  let ys = new Set(candidate.previous.map(p => p.y));
  if (ys.size === 1 && pos.y === candidate.previous[0].y) return false;
  if (pos.y < 0 || pos.y >= dimY || pos.x < 0 || pos.x >= dimX) return false;
  return true;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).map(r => r.split(''));

  let vis: number[][] = new Array(input.length).fill(0).map(r => new Array(input[0].length).fill(1000000));
  let candidates: candidateType[] = [];
  candidates.push({ pos: { x: 0, y: 0 }, heat: 0, previous: [{ x: -1, y: -1 }, { x: -2, y: -2 }, { x: -3, y: -3 }], steps: 0 })

  let found = false;

  let counter = 10000;

  let dimX = input[0].length;
  let dimY = input.length;

  while (candidates.length > 0 && !found && counter-- > 0) {
    let candidate = candidates.shift()!;
    // console.log(candidate.steps, candidate.heat, candidate.pos, '---', candidate.previous.map(p => [p.x, p.y]).join(', '));
    let pos = candidate.pos;
    let heat = +input[pos.y][pos.x];

    if (candidate.pos.x === dimX - 1 && candidate.pos.y === dimY - 1) {
      console.log('found ', candidate);
      vis[candidate.pos.y][candidate.pos.x] = Math.min(vis[candidate.pos.y][candidate.pos.x], candidate.heat + heat);
      found = true;
      continue;
    }


    [[0, 1], [1, 0], [0, -1], [-1, 0]].forEach(v => {
      let c = getCandidate(candidate, { x: v[0], y: v[1] }, pos, heat);
      if (isValidCandidate(c, dimX, dimY, vis)) candidates.push(c)
    })

    vis[pos.y][pos.x] = Math.min(vis[pos.y][pos.x], candidate.heat + heat);

    candidates.sort((a, b) => a.steps - b.steps);
  }

  // console.log(vis.join('\n'));

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
        input: `1234
2345
3456
4567`,
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
