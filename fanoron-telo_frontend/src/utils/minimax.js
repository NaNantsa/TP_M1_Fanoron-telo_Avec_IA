import {
  checkWinner,
  getValidPlacements,
  getValidMovements,
  opponent,
} from "./gameLogic";

import { WIN_LINES } from "./gameLogic";

function evaluate(board, aiPlayer){

    const enemy = opponent(aiPlayer);

    const {winner} = checkWinner(board);

    if(winner === aiPlayer) return 1000;
    if(winner === enemy) return -1000;

    let score = 0;

    // Centre
    if(board[4] === aiPlayer) score += 30;
    if(board[4] === enemy) score -= 30;


    for(const [a,b,c] of WIN_LINES){

        const line = [board[a],board[b],board[c]];

        const mine =
            line.filter(x=>x===aiPlayer).length;

        const opp =
            line.filter(x=>x===enemy).length;

        const empty =
            line.filter(x=>x==null).length;


        if(mine===2 && empty===1)
            score += 50;

        if(opp===2 && empty===1)
            score -= 60;
    }


    score +=
        getValidMovements(board,aiPlayer).length * 3;

    score -=
        getValidMovements(board,enemy).length * 3;


    return score;
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
    const score = res.score
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


  const depth = difficulty === "hard" ? 6 : difficulty == "medium" ? 3 : 1;
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
