import {
  checkWinner,
  getValidPlacements,
  getValidMovements,
  opponent,
} from "./gameLogic";

function evaluate(board, aiPlayer) {
  const { winner } = checkWinner(board);
  if (winner === aiPlayer) return 1000;
  if (winner && winner !== aiPlayer) return -1000;
  return 0;
}

function generateMoves(board, player, phase, piecesPlaced) {
  if (phase === 1) {
    // Placement until 6 pieces placed
    return getValidPlacements(board).map((i) => ({ type: "place", to: i }));
  }
  return getValidMovements(board, player).map((m) => ({
    type: "move",
    from: m.from,
    to: m.to,
  }));
}

function applyMove(board, move, player) {
  const b = board.slice();
  if (move.type === "place") b[move.to] = player;
  else {
    b[move.to] = player;
    b[move.from] = null;
  }
  return b;
}

function nextPhaseInfo(phase, piecesPlaced, moveType) {
  if (moveType === "place") {
    const p = piecesPlaced + 1;
    return { phase: p >= 6 ? 2 : 1, piecesPlaced: p };
  }
  return { phase, piecesPlaced };
}

function minimax(
  board,
  player,
  aiPlayer,
  depth,
  phase,
  piecesPlaced,
  useAB,
  alpha,
  beta
) {
  const term = checkWinner(board);
  if (term.winner || depth === 0) {
    return { score: evaluate(board, aiPlayer) };
  }
  const moves = generateMoves(board, player, phase, piecesPlaced);
  if (moves.length === 0) return { score: 0 };

  const maxing = player === aiPlayer;
  let best = { score: maxing ? -Infinity : Infinity, move: null };

  for (const move of moves) {
    const nb = applyMove(board, move, player);
    const np = nextPhaseInfo(phase, piecesPlaced, move.type);
    const res = minimax(
      nb,
      opponent(player),
      aiPlayer,
      depth - 1,
      np.phase,
      np.piecesPlaced,
      useAB,
      alpha,
      beta
    );
    const score = res.score - (maxing ? 0 : 0);
    if (maxing) {
      if (score > best.score) best = { score, move };
      if (useAB) {
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
    } else {
      if (score < best.score) best = { score, move };
      if (useAB) {
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
    }
  }
  return best;
}

export function getBestMove(board, player, difficulty, phase, piecesPlaced) {
  const moves = generateMoves(board, player, phase, piecesPlaced);
  if (moves.length === 0) return null;

  if (difficulty === "easy") {
    return moves[Math.floor(Math.random() * moves.length)];
  }
  const depth = difficulty === "hard" ? 6 : 3;
  const useAB = difficulty === "hard";
  const res = minimax(
    board,
    player,
    player,
    depth,
    phase,
    piecesPlaced,
    useAB,
    -Infinity,
    Infinity
  );
  return res.move || moves[0];
}
