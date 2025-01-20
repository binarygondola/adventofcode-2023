import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

type beamType = {
  x: number;
  y: number;
  dir: [number, number];
  from: string;
}

const getBeam = (oldBeam: beamType, dir: [number, number]): beamType => {
  return {
    x: oldBeam.x + dir[1],
    y: oldBeam.y + dir[0],
    dir: dir,
    from: '' + oldBeam.y + oldBeam.x,
  }
}

const dfs = (beam: beamType, arr: string[][], vis: string[][][]) => {
  if (beam.x >= arr[0].length || beam.y >= arr.length || beam.x < 0 || beam.y < 0) return;

  let char = arr[beam.y][beam.x];
  let val = vis[beam.y][beam.x];

  if (val.indexOf(beam.from) === -1) {
    vis[beam.y][beam.x].push(beam.from);

    switch (char) {
      case '.':
        dfs(getBeam(beam, beam.dir), arr, vis);
        break;
      case '-':
        if (beam.dir[0] === 0) {
          dfs(getBeam(beam, beam.dir), arr, vis);
        } else {
          let newBeam = getBeam(beam, [0, 1])
          dfs(newBeam, arr, vis);
          newBeam = getBeam(beam, [0, -1])
          dfs(newBeam, arr, vis);
        }
        break;
      case '|':
        if (beam.dir[1] === 0) {
          dfs(getBeam(beam, beam.dir), arr, vis);
        } else {
          let newBeam = getBeam(beam, [1, 0])
          dfs(newBeam, arr, vis);
          newBeam = getBeam(beam, [-1, 0])
          dfs(newBeam, arr, vis);
        }
        break;
      case '\\':
        if (beam.dir[1] === 1) {
          dfs(getBeam(beam, [1, 0]), arr, vis);
        } else if (beam.dir[1] === -1) {
          dfs(getBeam(beam, [-1, 0]), arr, vis);
        } else if (beam.dir[0] === 1) {
          dfs(getBeam(beam, [0, 1]), arr, vis);
        } else if (beam.dir[0] === -1) {
          dfs(getBeam(beam, [0, -1]), arr, vis);
        }
        break;
      case '/':
        if (beam.dir[1] === 1) {
          dfs(getBeam(beam, [-1, 0]), arr, vis);
        } else if (beam.dir[1] === -1) {
          dfs(getBeam(beam, [1, 0]), arr, vis);
        } else if (beam.dir[0] === 1) {
          dfs(getBeam(beam, [0, -1]), arr, vis);
        } else if (beam.dir[0] === -1) {
          dfs(getBeam(beam, [0, 1]), arr, vis);
        }
        break;
    }
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).map(x => x.split(''));

  let vis: string[][][] = new Array(input.length).fill(0).map(_ => new Array(input[0].length).fill(0).map(_ => []));
  let beam: beamType = { x: 0, y: 0, dir: [0, 1], from: '--' };

  dfs(beam, input, vis);

  return vis.reduce((sum, row) => sum + row.reduce((acc, curr) => acc + +(curr.length > 0), 0), 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).map(x => x.split(''));

  let maxEnergized = 0;

  for (let i = 0; i < input.length; i += 1) {
    let vis: string[][][] = new Array(input.length).fill(0).map(_ => new Array(input[0].length).fill(0).map(_ => []));
    let beam: beamType = { x: 0, y: i, dir: [0, 1], from: '--' };

    dfs(beam, input, vis);
    let energized = vis.reduce((sum, row) => sum + row.reduce((acc, curr) => acc + +(curr.length > 0), 0), 0);
    maxEnergized = Math.max(energized, maxEnergized);

    vis = new Array(input.length).fill(0).map(_ => new Array(input[0].length).fill(0).map(_ => []));
    beam = { x: input.length - 1, y: i, dir: [0, -1], from: '--' };

    dfs(beam, input, vis);

    energized = vis.reduce((sum, row) => sum + row.reduce((acc, curr) => acc + +(curr.length > 0), 0), 0);
    maxEnergized = Math.max(energized, maxEnergized);
  }

  for (let i = 0; i < input[0].length; i += 1) {
    let vis: string[][][] = new Array(input.length).fill(0).map(_ => new Array(input[0].length).fill(0).map(_ => []));
    let beam: beamType = { x: i, y: 0, dir: [1, 0], from: '--' };

    dfs(beam, input, vis);
    let energized = vis.reduce((sum, row) => sum + row.reduce((acc, curr) => acc + +(curr.length > 0), 0), 0);
    maxEnergized = Math.max(energized, maxEnergized);

    vis = new Array(input.length).fill(0).map(_ => new Array(input[0].length).fill(0).map(_ => []));
    beam = { x: i, y: input[0].length, dir: [-1, 0], from: '--' };

    dfs(beam, input, vis);

    energized = vis.reduce((sum, row) => sum + row.reduce((acc, curr) => acc + +(curr.length > 0), 0), 0);
    maxEnergized = Math.max(energized, maxEnergized);
  }

  return maxEnergized;
};

run({
  part1: {
    tests: [
      {
        input: String.raw`.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`,
        expected: 46,
      },
      //       {
      //         input: String.raw`.--..\....`,
      //         expected: 46,
      //       },
      //       {
      //         input: String.raw`.-|..\....
      // .--..\....`,
      //         expected: 46,
      //       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`,
        expected: 0,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
