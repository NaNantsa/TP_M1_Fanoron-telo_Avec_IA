import { useCallback, useState } from "react";
import {
  checkWinner,
  getValidMovements,
  ADJACENCY,
  LABELS,
} from "../utils/gameLogic";

const initialState = ( mode = null,difficulty = "medium",aiDifficulty = null
) => ({
  board: Array(9).fill(null),
  currentPlayer: "X",
  phase: 1,
  piecesPlaced: 0,
  selectedCell: null,
  winner: null,
  winLine: null,
  history: [],
  moveLog: [],
  scores: { X: 0, O: 0 },

  mode,
  difficulty,

  aiDifficulty: aiDifficulty ?? {
    X: difficulty,
    O: difficulty,
  },
});

export function useGameState(mode, difficulty,aiDifficulty) {
  const [state, setState] = useState(() => initialState(mode, difficulty,aiDifficulty));

  const reset = useCallback(
    (keepScores = true) => {
      setState((s) => ({
        ...initialState(s.mode, s.difficulty,s.aiDifficulty),
        scores: keepScores ? s.scores : { X: 0, O: 0 },
      }));
    },
    []
  );

  const setMode = useCallback((nextMode, nextDifficulty,nextaiDifficulty) => {
    setState((s) => ({
      ...initialState(nextMode, nextDifficulty ?? s.difficulty, nextaiDifficulty ?? s.aiDifficulty),
      scores: s.scores,
    }));
  }, []);

const snapshot = (s) => ({
  board: s.board.slice(),
  currentPlayer: s.currentPlayer,
  phase: s.phase,
  piecesPlaced: s.piecesPlaced,
  selectedCell: s.selectedCell,
  winner: s.winner,
  winLine: s.winLine,
  moveLog: s.moveLog.slice(),
  scores: { ...s.scores },
  aiDifficulty: { ...s.aiDifficulty },
});

  // Apply a placement (phase 1) or a movement {from,to} (phase 2).
  const applyMove = useCallback((move) => {
    setState((s) => {
      if (s.winner) return s;
      const player = s.currentPlayer;
      const board = s.board.slice();
      let log;
      if (move.type === "place") {
        if (board[move.to] != null) return s;
        board[move.to] = player;
        log = {
          player,
          from: null,
          to: move.to,
          label: `${player} pose ${LABELS[move.to]}`,
        };
      } else {
        if (board[move.from] !== player || board[move.to] != null) return s;
        if (!ADJACENCY[move.from].includes(move.to)) return s;
        board[move.to] = player;
        board[move.from] = null;
        log = {
          player,
          from: move.from,
          to: move.to,
          label: `${player} ${LABELS[move.from]}→${LABELS[move.to]}`,
        };
      }

      const placed = move.type === "place" ? s.piecesPlaced + 1 : s.piecesPlaced;
      const phase = placed >= 6 ? 2 : 1;
      const { winner, line } = checkWinner(board);
      const next = winner ? player : player === "X" ? "O" : "X";

      const scores = winner
        ? { ...s.scores, [winner]: s.scores[winner] + 1 }
        : s.scores;

      return {
        ...s,
        history: [...s.history, snapshot(s)],
        board,
        currentPlayer: next,
        phase,
        piecesPlaced: placed,
        selectedCell: null,
        winner: winner || null,
        winLine: line,
        moveLog: [...s.moveLog, log],
        scores,
      };
    });
  }, []);

  // Click on a cell — handles both phases & selection logic.
  const handleCellClick = useCallback((idx) => {
    setState((s) => {
      if (s.winner) return s;
      const player = s.currentPlayer;

      if (s.phase === 1) {
        if (s.board[idx] != null) return s;
        const board = s.board.slice();
        board[idx] = player;
        const placed = s.piecesPlaced + 1;
        const phase = placed >= 6 ? 2 : 1;
        const { winner, line } = checkWinner(board);
        const next = winner ? player : player === "X" ? "O" : "X";
        const scores = winner
          ? { ...s.scores, [winner]: s.scores[winner] + 1 }
          : s.scores;
        return {
          ...s,
          history: [...s.history, snapshot(s)],
          board,
          currentPlayer: next,
          phase,
          piecesPlaced: placed,
          selectedCell: null,
          winner: winner || null,
          winLine: line,
          moveLog: [
            ...s.moveLog,
            { player, from: null, to: idx, label: `${player} pose ${LABELS[idx]}` },
          ],
          scores,
        };
      }

      // Phase 2 — movement
      if (s.selectedCell == null) {
        if (s.board[idx] !== player) return s;
        return { ...s, selectedCell: idx };
      }
      // Click own piece again → reselect
      if (s.board[idx] === player) return { ...s, selectedCell: idx };

      // Try to move
      if (!ADJACENCY[s.selectedCell].includes(idx) || s.board[idx] != null) {
        return s;
      }
      const board = s.board.slice();
      board[idx] = player;
      board[s.selectedCell] = null;
      const { winner, line } = checkWinner(board);
      const next = winner ? player : player === "X" ? "O" : "X";
      const scores = winner
        ? { ...s.scores, [winner]: s.scores[winner] + 1 }
        : s.scores;
      return {
        ...s,
        history: [...s.history, snapshot(s)],
        board,
        currentPlayer: next,
        selectedCell: null,
        winner: winner || null,
        winLine: line,
        moveLog: [
          ...s.moveLog,
          {
            player,
            from: s.selectedCell,
            to: idx,
            label: `${player} ${LABELS[s.selectedCell]}→${LABELS[idx]}`,
          },
        ],
        scores,
      };
    });
  }, []);

  const undo = useCallback(() => {
    setState((s) => {
      const isAI =
        s.mode === "hvai" && s.history.length >= 2;
      const steps = isAI ? 2 : 1;
      if (s.history.length < steps) return s;
      const target = s.history[s.history.length - steps];
      const newHistory = s.history.slice(0, s.history.length - steps);
      return {
        ...s,
        ...target,
        history: newHistory,
      };
    });
  }, []);

  // Derived: valid targets for current selection (phase 2)
  const validTargets = (() => {
    if (state.phase !== 2 || state.selectedCell == null || state.winner) return [];
    return ADJACENCY[state.selectedCell].filter((i) => !state.board[i]);
  })();

  // Derived: count pieces remaining to place per player (phase 1)
  const pieceCounts = (() => {
    const placed = { X: 0, O: 0 };
    for (const v of state.board) if (v) placed[v]++;
    // During phase 1, total = 3 each, but pieces are placed alternately
    return {
      X: placed.X,
      O: placed.O,
    };
  })();

  return {
    state,
    setState,
    reset,
    setMode,
    handleCellClick,
    applyMove,
    undo,
    validTargets,
    pieceCounts,
  };
}
