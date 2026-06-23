import { IconTrophy, IconRefresh, IconHome } from "@tabler/icons-react";

export default function WinScreen({ winner, onReplay, onMenu }) {
  const isX = winner === "X";
  const color = isX ? "#4A90D9" : "#C0392B";
  const colorSoft = isX ? "rgba(74,144,217,0.15)" : "rgba(192,57,43,0.15)";
  const colorBorder = isX ? "rgba(74,144,217,0.35)" : "rgba(192,57,43,0.3)";
  const name = isX ? "Joueur X" : "Joueur O";

  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "rgba(5,10,20,0.88)",
      backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1.5rem", zIndex: 40,
    }} className="fade-in">
      <div style={{
        background: "linear-gradient(160deg, #0F1E33 0%, #080E1A 100%)",
        border: `1px solid ${colorBorder}`,
        borderRadius: 20, padding: "2.5rem 2rem",
        maxWidth: 320, width: "100%", textAlign: "center",
      }}>

        {/* Icône */}
        <div style={{
          width: 64, height: 64, borderRadius: "50%", margin: "0 auto 1.25rem",
          background: colorSoft, border: `1px solid ${colorBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: color,
        }}>
          <IconTrophy size={28} stroke={1.5} />
        </div>

        <div className="font-display" style={{
          fontSize: "0.7rem", color: "rgba(214,228,247,0.35)",
          textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "0.4rem",
        }}>
          Victoire
        </div>

        <div className="font-display" style={{
          fontSize: "2rem", fontWeight: 700, color,
          marginBottom: "0.5rem", lineHeight: 1.1,
        }}>
          {name}
        </div>

        <p style={{ fontSize: "0.85rem", color: "rgba(214,228,247,0.45)", marginBottom: "2rem" }}>
          Alignement réalisé !
        </p>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={onReplay}
            style={{
              flex: 1,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              background: "linear-gradient(135deg, #5BA3E8 0%, #2563AB 100%)",
              border: "none", borderRadius: 12,
              padding: "0.75rem", color: "#050c18",
              fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
              transition: "filter 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.1)"}
            onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
          >
            <IconRefresh size={16} stroke={1.5} /> Rejouer
          </button>
          <button
            onClick={onMenu}
            style={{
              flex: 1,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              background: "rgba(74,144,217,0.07)",
              border: "1px solid rgba(74,144,217,0.2)",
              borderRadius: 12, padding: "0.75rem",
              color: "#D6E4F7", fontSize: "0.875rem",
              cursor: "pointer", transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(74,144,217,0.14)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(74,144,217,0.07)"}
          >
            <IconHome size={16} stroke={1.5} /> Menu
          </button>
        </div>
      </div>
    </div>
  );
}