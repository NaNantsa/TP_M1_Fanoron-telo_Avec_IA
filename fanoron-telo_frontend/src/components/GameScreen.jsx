import { useGameState } from "../hooks/useGameState";
import { useAI } from "../hooks/useAI";
import Board from "./Board";
import PlayerInfo from "./PlayerInfo";
import MoveHistory from "./MoveHistory";
import WinScreen from "./WinScreen";

export default function GameScreen({ mode,difficulty, aiDifficulty, onMenu }) {
  const {
    state,
    handleCellClick,
    applyMove,
    undo,
    reset,
    validTargets,
    pieceCounts,
  } = useGameState(mode,difficulty,aiDifficulty,);

  const { thinkingMs, aiMoveCount, resetAIStats } = useAI({
    state,
    applyMove,
    mode,
  });

  const disabled =
    !!state.winner ||
    mode === "aivai" ||
    (mode === "hvai" && state.currentPlayer === "O");

  const onReplay = () => {
    reset(true);
    resetAIStats();
  };

  return (
    <div className="min-h-screen px-4 md:px-6 py-4 fade-in relative">

      {/* TOP BAR */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="card-surface px-4 py-2 text-sm">
          Phase :{" "}
          <span style={{ color: "var(--gold)" }}>
            {state.phase === 1 ? "Placement" : "Déplacement"}
          </span>
        </div>

        <div className="card-surface px-4 py-2 text-sm">
          Tour :{" "}
          <span style={{ color: state.currentPlayer === "X" ? "#E8C96B" : "#C0392B" }}>
            {state.currentPlayer}
          </span>
        </div>

        <button className="btn-outline" onClick={onMenu}>
          Menu
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_260px] gap-4">

        {/* LEFT */}
        <div className="space-y-3">
          <PlayerInfo
            name={mode === "aivai" ? "IA — X" : "Joueur X"}
            color="#E8C96B"
            isTurn={state.currentPlayer === "X" && !state.winner}
            placed={pieceCounts.X}
            score={state.scores.X}
          />

          {mode === "aivai" && (
            <div className="card-surface p-3 text-sm">
              <div>Coups IA : {aiMoveCount}</div>
              <div>Réflexion : {thinkingMs} ms</div>
              <div>IA X : {aiDifficulty.X}</div>
              <div>IA O : {aiDifficulty.O}</div>
            </div>
          )}
        </div>

        {/* BOARD */}
        <div className="relative">
          <Board
            board={state.board}
            selectedCell={state.selectedCell}
            validTargets={validTargets}
            winLine={state.winLine}
            onCellClick={handleCellClick}
            disabled={disabled}
          />

          {state.winner && (
            <WinScreen
              winner={state.winner}
              onReplay={onReplay}
              onMenu={onMenu}
            />
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-3">
          <PlayerInfo
            name={
              mode === "hvh"
                ? "Joueur O"
                : "IA — O"
            }
            color="#C0392B"
            isTurn={state.currentPlayer === "O" && !state.winner}
            placed={pieceCounts.O}
            score={state.scores.O}
            align="right"
          />

          <MoveHistory log={state.moveLog} />
        </div>

      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 justify-center mt-6">
        <button className="btn-outline" onClick={undo}>
          Annuler
        </button>

        <button className="btn-gold" onClick={onReplay}>
          Nouvelle Partie
        </button>
      </div>
    </div>
  );
}