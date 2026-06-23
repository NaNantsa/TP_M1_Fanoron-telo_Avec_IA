import { POSITIONS, ADJACENCY } from "../utils/gameLogic";

const SEGMENTS = (() => {
  const seen = new Set();
  const segs = [];
  for (const a in ADJACENCY) {
    for (const b of ADJACENCY[a]) {
      const key = +a < +b ? `${a}-${b}` : `${b}-${a}`;
      if (seen.has(key)) continue;
      seen.add(key);
      segs.push([+a, +b]);
    }
  }
  return segs;
})();

export default function Board({ board, selectedCell, validTargets, winLine, onCellClick, disabled }) {
  return (
    <div className="w-full max-w-[min(80vw,460px)] aspect-square mx-auto">
      <svg viewBox="0 0 300 300" className="w-full h-full select-none">
        <rect x="10" y="10" width="280" height="280" rx="16"
          fill="#0A1628" stroke="rgba(74,144,217,0.2)" strokeWidth="1.5" />

        {SEGMENTS.map(([a, b], i) => {
          const A = POSITIONS[a], B = POSITIONS[b];
          return (
            <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
              stroke="#4A90D9" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          );
        })}

        {winLine && (() => {
          const a = POSITIONS[winLine[0]], c = POSITIONS[winLine[2]];
          return (
            <line x1={a.x} y1={a.y} x2={c.x} y2={c.y}
              stroke="#6BAED6" strokeWidth="8" strokeLinecap="round"
              className="win-pulse" />
          );
        })()}

        {POSITIONS.map((p, i) => (
          <circle key={`dot-${i}`} cx={p.x} cy={p.y} r="4"
            fill="#4A90D9" opacity="0.5" />
        ))}

        {validTargets.map((i) => {
          const p = POSITIONS[i];
          return (
            <circle key={`target-${i}`} cx={p.x} cy={p.y} r="18"
              fill="none" stroke="#6BAED6" strokeWidth="2"
              className="target-pulse" />
          );
        })}

        {board.map((v, i) => {
          if (!v) return null;
          const p = POSITIONS[i];
          const isX = v === "X";
          const fill = isX ? "#4A90D9" : "#C0392B";
          const glow = isX ? "rgba(74,144,217,0.4)" : "rgba(192,57,43,0.4)";
          const isSelected = selectedCell === i;
          return (
            <g key={`piece-${i}`} className="piece-pop">
              <circle cx={p.x} cy={p.y + 3} r="18" fill={glow} />
              <circle cx={p.x} cy={p.y} r="18" fill={fill}
                stroke={isSelected ? "#D6E4F7" : "rgba(255,255,255,0.15)"}
                strokeWidth={isSelected ? 2.5 : 1} />
              <circle cx={p.x - 5} cy={p.y - 6} r="5"
                fill="rgba(255,255,255,0.25)" />
            </g>
          );
        })}

        {POSITIONS.map((p, i) => (
          <circle key={`hit-${i}`} cx={p.x} cy={p.y} r="25"
            fill="transparent"
            style={{ cursor: disabled ? "not-allowed" : "pointer" }}
            onClick={() => !disabled && onCellClick(i)} />
        ))}
      </svg>
    </div>
  );
}