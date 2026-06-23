// Index map: 0=a3 1=b3 2=c3 / 3=a2 4=b2 5=c2 / 6=a1 7=b1 8=c1
export const LABELS = ["a3","b3","c3","a2","b2","c2","a1","b1","c1"];

export const POSITIONS = [
  { x: 50,  y: 50  }, { x: 150, y: 50  }, { x: 250, y: 50  },
  { x: 50,  y: 150 }, { x: 150, y: 150 }, { x: 250, y: 150 },
  { x: 50,  y: 250 }, { x: 150, y: 250 }, { x: 250, y: 250 },
];

export const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

// Adjacency following Fanoron-telo board lines.
// Corners connect only to orthogonal neighbours; center connects to all 8.
export const ADJACENCY = {
  0: [1,3,4],
  1: [0,2,4],
  2: [1,4,5],
  3: [0,4,6],
  4: [0,1,2,3,5,6,7,8],
  5: [2,4,8],
  6: [3,4,7],
  7: [4,6,8],
  8: [4,5,7],
};

export function checkWinner(board) {
  for (const line of WIN_LINES) {
    const [a,b,c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return { winner: null, line: null };
}

export function getValidPlacements(board) {
  const out = [];
  for (let i = 0; i < 9; i++) if (!board[i]) out.push(i);
  return out;
}

export function getValidMovements(board, player) {
  const moves = [];
  for (let i = 0; i < 9; i++) {
    if (board[i] !== player) continue;
    for (const j of ADJACENCY[i]) {
      if (!board[j]) moves.push({ from: i, to: j });
    }
  }
  return moves;
}

export const opponent = (p) => (p === "X" ? "O" : "X");
