import { useEffect, useRef, useState } from "react";
import { getBestMove } from "../utils/minimax";

// Drives AI moves for "hvai" (AI plays "O") and "aivai" (both).
export function useAI({ state, applyMove, mode, difficulty }) {
  const [thinkingMs, setThinkingMs] = useState(0);
  const [aiMoveCount, setAiMoveCount] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!mode) return;
    if (state.winner) return;

    let shouldPlay = false;
    let delay = 350;

    if (mode === "hvai" && state.currentPlayer === "O") {
      shouldPlay = true;
      delay = 400;
    } else if (mode === "aivai") {
      shouldPlay = true;
      delay = 800;
    }

    if (!shouldPlay) return;

    timerRef.current = setTimeout(() => {
      const t0 = performance.now();
      const move = getBestMove(
        state.board,
        state.currentPlayer,
        difficulty,
        state.phase,
        state.piecesPlaced
      );
      const t1 = performance.now();
      setThinkingMs(Math.round(t1 - t0));
      setAiMoveCount((c) => c + 1);
      if (move) applyMove(move);
    }, delay);

    return () => clearTimeout(timerRef.current);
  }, [state.board, state.currentPlayer, state.phase, state.winner, mode, difficulty, state.piecesPlaced, applyMove]);

  return { thinkingMs, aiMoveCount, resetAIStats: () => { setThinkingMs(0); setAiMoveCount(0); } };
}
