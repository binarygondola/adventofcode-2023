import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(',');

const hash = (asciiCode: number, val: number) => {
  return (val + asciiCode) * 17 % 256;
}

const HASH = (op: string) => {
  return op.split('').reduce((acc, c) => hash(c.charCodeAt(0), acc), 0);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((acc, curr) => acc + HASH(curr), 0);;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let boxes: Map<string, number>[] = new Array(256).fill(0).map(_ => new Map());

  for (let op of input) {
    let label, focalLength, box;
    if (op.split('').includes('-')) {
      label = op.slice(0, -1);
    } else {
      [label, focalLength] = op.split('=');
      focalLength = +focalLength;
    }

    box = HASH(label);

    if (focalLength) {
      boxes[box].set(label, focalLength);
    } else {
      boxes[box].delete(label);
    }
  }


  let hashmapValues = [...boxes.entries()].map(hashmap => [...hashmap[1].values()]);
  let partialSums = hashmapValues.map((e, index) => e.reduce((acc, curr, idx) => acc + (index + 1) * curr * (idx + 1), 0));
  return partialSums.reduce((acc, curr) => acc + curr, 0);
};

run({
  part1: {
    tests: [
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 1320,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 145,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
