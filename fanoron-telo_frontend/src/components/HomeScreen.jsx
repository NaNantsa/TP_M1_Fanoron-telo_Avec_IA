import { useState } from "react";
import { IconPlayerPlay, IconBook, IconInfoCircle } from "@tabler/icons-react";

const cardBase = {
  display: "flex", alignItems: "center", gap: "1rem",
  background: "rgba(15,30,51,0.7)",
  border: "1px solid rgba(74,144,217,0.14)",
  borderRadius: 12, padding: "1rem 1.25rem",
  cursor: "pointer", textAlign: "left",
  transition: "background 0.2s, border-color 0.2s, transform 0.15s",
  width: "100%",
};

const cardPrimary = {
  ...cardBase,
  background: "linear-gradient(135deg, rgba(37,99,171,0.35) 0%, rgba(15,30,51,0.9) 100%)",
  border: "1px solid rgba(74,144,217,0.45)",
};

const iconWrap = {
  width: 42, height: 42, borderRadius: 10, flexShrink: 0,
  display: "flex", alignItems: "center", justifyContent: "center",
  background: "rgba(74,144,217,0.12)", border: "1px solid rgba(74,144,217,0.2)",
  color: "#6BAED6",
};

const iconWrapPrimary = {
  ...iconWrap,
  background: "rgba(74,144,217,0.22)", border: "1px solid rgba(74,144,217,0.4)", color: "#90c4ea",
};

function NavCard({ icon: Icon, label, desc, onClick, primary }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...(primary ? cardPrimary : cardBase),
        ...(hovered && !primary ? { background: "rgba(15,30,51,0.95)", borderColor: "rgba(74,144,217,0.38)", transform: "translateX(4px)" } : {}),
        ...(hovered && primary ? { borderColor: "rgba(107,174,214,0.7)", transform: "translateX(4px)" } : {}),
      }}
    >
      <div style={primary ? iconWrapPrimary : iconWrap}>
        <Icon size={20} stroke={1.5} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "0.95rem", fontWeight: 600, color: primary ? "#b8d8f5" : "#D6E4F7" }}>
          {label}
        </div>
        <div style={{ fontSize: "0.78rem", color: "rgba(214,228,247,0.42)", marginTop: 2, fontWeight: 300 }}>
          {desc}
        </div>
      </div>
      <span style={{
        color: hovered ? "#4A90D9" : "rgba(74,144,217,0.45)",
        fontSize: 22, flexShrink: 0,
        transform: hovered ? "translateX(3px)" : "translateX(0)",
        transition: "color 0.2s, transform 0.2s",
      }}>›</span>
    </button>
  );
}

export default function HomeScreen({ onNavigate }) {
  const [about, setAbout] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 fade-in relative overflow-hidden">

      {/* Grille */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(74,144,217,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(74,144,217,0.035) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
      }} />

      {/* Halos */}
      <div className="absolute pointer-events-none" style={{
        width: 700, height: 420, top: -140, left: "50%", transform: "translateX(-50%)",
        background: "radial-gradient(ellipse at center, rgba(74,144,217,0.14) 0%, transparent 68%)",
      }} />
      <div className="absolute pointer-events-none" style={{
        width: 360, height: 260, bottom: -80, right: -40,
        background: "radial-gradient(ellipse at center, rgba(192,57,43,0.09) 0%, transparent 70%)",
      }} />

      {/* Contenu */}
      <div className="relative z-10 text-center flex flex-col items-center w-full" style={{ maxWidth: 480 }}>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1 rounded-full text-xs font-medium tracking-widest uppercase" style={{
          background: "rgba(74,144,217,0.10)", border: "1px solid rgba(74,144,217,0.28)", color: "#4A90D9",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4A90D9", display: "inline-block" }} />
          Jeu traditionnel malgache
        </div>

        {/* Titre */}
        <h1 className="font-display" style={{
          fontSize: "clamp(2.6rem, 7vw, 4rem)", fontWeight: 700, lineHeight: 1.08,
          background: "linear-gradient(135deg, #7EC8F0 0%, #4A90D9 45%, #2563AB 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: 0,
        }}>
          Fanoron-telo
        </h1>

        <p className="font-display tracking-widest uppercase" style={{
          fontSize: "0.8rem", fontWeight: 300, color: "rgba(214,228,247,0.38)", marginTop: "0.75rem",
        }}>
          Stratégie &amp; Tradition
        </p>

        {/* Séparateur */}
        <div style={{
          width: 48, height: 1,
          background: "linear-gradient(90deg, transparent, #4A90D9, transparent)",
          margin: "1.75rem auto",
        }} />

        {/* Cartes */}
        <div className="flex flex-col w-full" style={{ gap: "0.75rem" }}>
          <NavCard
            primary
            icon={IconPlayerPlay}
            label="Jouer"
            desc="Solo contre l'IA ou 2 joueurs en local"
            onClick={() => onNavigate("mode")}
          />
          <NavCard
            icon={IconBook}
            label="Règles du jeu"
            desc="Apprendre les bases du Fanoron-telo"
            onClick={() => onNavigate("rules")}
          />
          <NavCard
            icon={IconInfoCircle}
            label="À propos"
            desc="Histoire du jeu et algorithme Minimax"
            onClick={() => setAbout(true)}
          />
        </div>

        {/* Méta */}
        <div className="flex items-center mt-8" style={{ gap: 12, opacity: 0.3 }}>
          {["VS Ami", "VS IA", "Minimax α-β"].map((label, i, arr) => (
            <div key={label} className="flex items-center" style={{ gap: 12 }}>
              <span style={{ fontSize: 10, color: "#D6E4F7", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                {label}
              </span>
              {i < arr.length - 1 && (
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#4A90D9", display: "inline-block" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {about && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 fade-in"
          style={{ background: "rgba(5,10,20,0.85)", backdropFilter: "blur(6px)" }}
          onClick={() => setAbout(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(160deg, #0F1E33 0%, #080E1A 100%)",
              border: "1px solid rgba(74,144,217,0.22)",
              borderRadius: 16, padding: "2rem", maxWidth: 360, width: "100%",
            }}
          >
            <h2 className="font-display" style={{ fontSize: "1.3rem", fontWeight: 600, color: "#4A90D9", margin: "0 0 1rem 0" }}>
              À propos
            </h2>
            <p style={{ fontSize: "0.875rem", color: "rgba(214,228,247,0.75)", lineHeight: 1.7, margin: 0 }}>
              Le Fanoron-telo est un jeu d'alignement traditionnel de Madagascar.
              Cette version vous permet d'y jouer contre un ami ou contre une intelligence
              artificielle (Easy, Medium, Hard) reposant sur l'algorithme Minimax avec élagage Alpha-Bêta.
            </p>
            <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
              <button
                onClick={() => setAbout(false)}
                style={{
                  background: "transparent", border: "1px solid rgba(74,144,217,0.25)",
                  borderRadius: 99, padding: "0.6rem 1.5rem", color: "#D6E4F7",
                  fontSize: "0.875rem", cursor: "pointer",
                }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}