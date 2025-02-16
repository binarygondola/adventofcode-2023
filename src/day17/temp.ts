const part1 = () => {

  const part = 1; // IMPORTANT: change this constant to 2 to get the answer for part 2
  const grid = input.map(r => r.map(c => +c));
  const seen = new Set();
  const pq = [[0, 0, 0, 0, 0, 0]];

  while (pq.length > 0) {
    const [hl, r, c, dr, dc, n] = pq.shift();

    if (r === grid.length - 1 && c === grid[0].length - 1 && n >= (part > 1 ? 4 : 0)) {
      console.log(`Part ${part} ->`, hl);
      break;
    }

    if (seen.has(`${r}-${c}-${dr}-${dc}-${n}`)) {
      continue;
    }

    seen.add(`${r}-${c}-${dr}-${dc}-${n}`);

    if (n < (part > 1 ? 10 : 3) && (dr !== 0 || dc !== 0)) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
        pq.push([hl + grid[nr][nc], nr, nc, dr, dc, n + 1]);
        pq.sort((a, b) => a[0] - b[0]);
      }
    }

    if (part > 1) {
      if (n >= 4 || (dr === 0 && dc === 0)) {
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        for (const [ndr, ndc] of directions) {
          if ((ndr !== dr || ndc !== dc) && (ndr !== -dr || ndc !== -dc)) {
            const nr = r + ndr;
            const nc = c + ndc;
            if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
              pq.push([hl + grid[nr][nc], nr, nc, ndr, ndc, 1]);
              pq.sort((a, b) => a[0] - b[0]);
            }
          }
        }
      }
    } else {
      const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      for (const [ndr, ndc] of directions) {
        if ((ndr !== dr || ndc !== dc) && (ndr !== -dr || ndc !== -dc)) {
          const nr = r + ndr;
          const nc = c + ndc;
          if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
            pq.push([hl + grid[nr][nc], nr, nc, ndr, ndc, 1]);
            pq.sort((a, b) => a[0] - b[0]);
          }
        }
      }
    }
  }
  return;
}
