export default function MoveHistory({ log }) {
  const last = log.slice(-5).reverse();
  return (
    <div style={{
      background: "rgba(15,30,51,0.7)",
      border: "1px solid rgba(74,144,217,0.12)",
      borderRadius: 16, padding: "1rem 1.25rem",
    }}>
      <div className="font-display" style={{
        fontSize: "0.65rem", color: "rgba(214,228,247,0.35)",
        textTransform: "uppercase", letterSpacing: "0.12em",
        fontWeight: 500, marginBottom: "0.6rem",
      }}>
        Historique
      </div>
      {last.length === 0 ? (
        <div style={{ fontSize: "0.8rem", color: "rgba(214,228,247,0.25)", fontStyle: "italic" }}>
          Aucun coup joué.
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
          {last.map((m, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, opacity: i === 0 ? 1 : 0.5 - i * 0.05 }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
                background: m.player === "X" ? "#4A90D9" : "#C0392B",
                boxShadow: `0 0 4px ${m.player === "X" ? "#4A90D9" : "#C0392B"}`,
              }} />
              <span style={{ fontSize: "0.8rem", color: "rgba(214,228,247,0.7)" }}>{m.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}