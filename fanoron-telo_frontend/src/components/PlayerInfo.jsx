export default function PlayerInfo({ name, color, isTurn, placed, score, align = "left" }) {
  return (
    <div style={{
      background: "rgba(15,30,51,0.7)",
      border: `1px solid ${isTurn ? "rgba(74,144,217,0.35)" : "rgba(74,144,217,0.12)"}`,
      borderRadius: 16, padding: "1rem 1.25rem",
      transition: "border-color 0.3s",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ textAlign: align === "right" ? "right" : "left" }}>
          <div className="font-display" style={{ fontSize: "1rem", fontWeight: 600, color: "#D6E4F7" }}>
            {name}
          </div>
          <div style={{ fontSize: "0.75rem", color: "rgba(214,228,247,0.38)", marginTop: 2 }}>
            Score : <span style={{ color: "#6BAED6", fontWeight: 600 }}>{score}</span>
          </div>
        </div>
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: color, flexShrink: 0,
          opacity: isTurn ? 1 : 0.25,
          boxShadow: isTurn ? `0 0 10px ${color}, 0 0 20px ${color}` : "none",
          transition: "all 0.3s",
          animation: isTurn ? "pulse 1.5s ease-in-out infinite" : "none",
        }} />
      </div>

      <div style={{
        display: "flex", gap: 8, marginTop: "0.75rem",
        justifyContent: align === "right" ? "flex-end" : "flex-start",
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 14, height: 14, borderRadius: "50%",
            background: i < placed ? color : "transparent",
            border: `1.5px solid ${i < placed ? color : "rgba(74,144,217,0.25)"}`,
            opacity: i < placed ? 1 : 0.4,
            transition: "all 0.2s",
            boxShadow: i < placed ? `0 0 6px ${color}` : "none",
          }} />
        ))}
      </div>
    </div>
  );
}