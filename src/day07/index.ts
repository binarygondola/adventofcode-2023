import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const cardsOrder = `A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2`.split(", ");

const getHandType = (cardValues: number[]) => {
  let sorted = cardValues.sort((a, b) => b - a);
  if (sorted.includes(5)) {
    return 1;
  } else if (sorted.includes(4)) {
    return 2;
  } else if (sorted.includes(3) && sorted.includes(2)) {
    return 3;
  } else if (sorted.includes(3)) {
    return 4;
  } else if (sorted[0] === sorted[1] && sorted[0] === 2) {
    return 5;
  } else if (sorted.includes(2)) {
    return 6;
  } else {
    return 7;
  }
}

const isBigger = (a: any, b: any) => {
  if (a.handType > b.handType) {
    return -1;
  }
  if (a.handType < b.handType) {
    return 1;
  }
  let i = 0;
  while (a.cards[i] === b.cards[i]) {
    i++;
  }
  if (cardsOrder.indexOf(a.cards[i]) > cardsOrder.indexOf(b.cards[i])) {
    return -1;
  } else {
    return 1;
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let parsedHands = [];

  for (let line of input) {
    let cards = line.trim().split(" ")[0];
    let bid = parseInt(line.trim().split(" ")[1]);

    let cardValues = new Array(cardsOrder.length).fill(0);
    cards.split("").map((x) => cardValues[cardsOrder.indexOf(x)]++);

    parsedHands.push({ cards, bid, handType: getHandType(cardValues) });
  }

  parsedHands.sort((a, b) => isBigger(a, b))
  let idx = 1;
  let sum = parsedHands.reduce((prev, curr) => prev + curr.bid * idx++, 0);
  return sum;
};

const cardsOrder2 = `A, K, Q, T, 9, 8, 7, 6, 5, 4, 3, 2, J`.split(", ");

const isBigger2 = (a: any, b: any) => {
  if (a.handType > b.handType) {
    return -1;
  }
  if (a.handType < b.handType) {
    return 1;
  }
  let i = 0;
  while (a.cards[i] === b.cards[i]) {
    i++;
  }
  if (cardsOrder2.indexOf(a.cards[i]) > cardsOrder2.indexOf(b.cards[i])) {
    return -1;
  } else {
    return 1;
  }
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let parsedHands = [];

  for (let line of input) {
    let cards = line.trim().split(" ")[0];
    let bid = parseInt(line.trim().split(" ")[1]);

    let cardValues = new Array(cardsOrder2.length).fill(0);
    cards.split("").map((x) => cardValues[cardsOrder2.indexOf(x)]++);

    let cardValues2 = [...cardValues];
    let cards2 = [...cards].join("");

    if (cards.includes('J')) {
      let max = -1;
      let maxIdx = 0;
      for (let i = 0; i < cardValues.length - 1; i++) {
        if (cardValues[i] > max) {
          max = cardValues[i];
          maxIdx = i;
        }
      }
      cardValues2[maxIdx] += cardValues2[cardValues2.length - 1];
      cardValues2[cardValues2.length - 1] = 0;
      cards2 = cards2.replaceAll('J', cardsOrder2[maxIdx]);
    }

    parsedHands.push({ cards, cards2, bid, handType: getHandType(cardValues2) });
  }

  parsedHands.sort((a, b) => isBigger2(a, b));
  let idx = 1;
  let sum = parsedHands.reduce((prev, curr) => prev + curr.bid * idx++, 0);
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
        expected: 5905,
      },
      {
        input: `JJJ2J 1
JJJ8J 2`,
        expected: 5,
      },
      {
        input: `2345A 1
Q2KJJ 13
Q2Q2Q 19
T3T3J 17
T3Q33 11
2345J 3
J345A 2
32T3K 5
T55J5 29
KK677 7
KTJJT 34
QQQJA 31
JJJJJ 37
JAAAA 43
AAAAJ 59
AAAAA 61
2AAAA 23
2JJJJ 53
JJJJ2 41`,
        expected: 6839,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
