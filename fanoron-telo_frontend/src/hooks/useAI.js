import { useEffect, useRef, useState } from "react";
import { getBestMove } from "../utils/minimax";

export function useAI({ state, applyMove, mode }) {
  const [thinkingMs, setThinkingMs] = useState(0);
  const [aiMoveCount, setAiMoveCount] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!mode) return;
    if (state.winner) return;

    const isAIVAI = mode === "aivai";
    const isHVAI = mode === "hvai" && state.currentPlayer === "O";

    if (!isAIVAI && !isHVAI) return;

    const delay = isAIVAI ? 500 : 400;

    timerRef.current = setTimeout(() => {
      const t0 = performance.now();

      // 🔥 IMPORTANT : difficulté correcte
      const difficulty =
        state.aiDifficulty?.[state.currentPlayer] ?? state.difficulty ?? "medium";

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
  }, [
    mode,
    state.board,
    state.currentPlayer,
    state.phase,
    state.piecesPlaced,
    state.winner,
    applyMove,
    state.aiDifficulty,
    state.difficulty
  ]);

  return {
    thinkingMs,
    aiMoveCount,
    resetAIStats: () => {
      setThinkingMs(0);
      setAiMoveCount(0);
    },
  };
}