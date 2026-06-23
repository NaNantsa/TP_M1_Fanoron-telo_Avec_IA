import { useState } from "react";
import { IconUsers, IconRobot, IconRefresh, IconArrowLeft, IconPlayerPlay } from "@tabler/icons-react";

const MODES = [
  { id: "hvh",   title: "Humain vs Humain",  desc: "Jeu local à deux joueurs",      icon: IconUsers,   ai: false },
  { id: "hvai",  title: "Humain vs IA",      desc: "Affrontez l'intelligence",       icon: IconRobot,   ai: true  },
  { id: "aivai", title: "IA vs IA",          desc: "Deux IA jouent automatiquement", icon: IconRefresh, ai: true  },
];

const DIFFICULTIES = [
  { id: "easy",   label: "Facile",  desc: "Pour découvrir" },
  { id: "medium", label: "Moyen",   desc: "Équilibré" },
  { id: "hard",   label: "Difficile", desc: "Sans pitié" },
];

export default function ModeSelectScreen({ onStart, onBack }) {
  const [mode, setMode] = useState("hvh");
  const [difficulty, setDifficulty] = useState("medium");
  const selected = MODES.find((m) => m.id === mode);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 fade-in relative overflow-hidden">

      {/* Grille de fond */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(74,144,217,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(74,144,217,0.035) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
      }} />

      {/* Halos */}
      <div className="absolute pointer-events-none" style={{
        width: 600, height: 350, top: -100, left: "50%", transform: "translateX(-50%)",
        background: "radial-gradient(ellipse at center, rgba(74,144,217,0.12) 0%, transparent 70%)",
      }} />
      <div className="absolute pointer-events-none" style={{
        width: 360, height: 260, bottom: -80, right: -40,
        background: "radial-gradient(ellipse at center, rgba(192,57,43,0.08) 0%, transparent 70%)",
      }} />

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-medium tracking-widest uppercase mb-4" style={{
          background: "rgba(74,144,217,0.10)", border: "1px solid rgba(74,144,217,0.28)", color: "#4A90D9",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4A90D9", display: "inline-block" }} />
          Nouvelle partie
        </div>

        <h2 className="font-display text-center" style={{
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, lineHeight: 1.1,
          background: "linear-gradient(135deg, #7EC8F0 0%, #4A90D9 45%, #2563AB 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          margin: "0 0 0.5rem 0",
        }}>
          Choisir un mode
        </h2>

        <p style={{ fontSize: "0.85rem", color: "rgba(214,228,247,0.38)", marginBottom: "2rem" }}>
          Sélectionnez le type de partie
        </p>

        {/* Séparateur */}
        <div style={{
          width: 40, height: 1,
          background: "linear-gradient(90deg, transparent, #4A90D9, transparent)",
          marginBottom: "2rem",
        }} />

        {/* Cartes mode */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.75rem",
          width: "100%",
          marginBottom: "1.5rem",
        }}>
          {MODES.map((m) => {
            const Icon = m.icon;
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                style={{
                  background: active
                    ? "linear-gradient(135deg, rgba(37,99,171,0.45) 0%, rgba(15,30,51,0.95) 100%)"
                    : "rgba(15,30,51,0.7)",
                  border: active
                    ? "1px solid rgba(74,144,217,0.55)"
                    : "1px solid rgba(74,144,217,0.12)",
                  borderRadius: 16,
                  padding: "1.25rem 1rem",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                  display: "flex", flexDirection: "column", gap: "0.6rem",
                  transform: active ? "translateY(-2px)" : "translateY(0)",
                  boxShadow: active ? "0 8px 24px rgba(74,144,217,0.12)" : "none",
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(74,144,217,0.3)"; e.currentTarget.style.background = "rgba(15,30,51,0.9)"; }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(74,144,217,0.12)"; e.currentTarget.style.background = "rgba(15,30,51,0.7)"; }}}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: active ? "rgba(74,144,217,0.25)" : "rgba(74,144,217,0.1)",
                  border: `1px solid ${active ? "rgba(74,144,217,0.45)" : "rgba(74,144,217,0.18)"}`,
                  color: active ? "#90c4ea" : "#6BAED6",
                  transition: "all 0.2s",
                }}>
                  <Icon size={20} stroke={1.5} />
                </div>
                <div className="font-display" style={{
                  fontSize: "0.9rem", fontWeight: 600,
                  color: active ? "#b8d8f5" : "#D6E4F7",
                  lineHeight: 1.2,
                }}>
                  {m.title}
                </div>
                <div style={{ fontSize: "0.75rem", color: "rgba(214,228,247,0.4)", fontWeight: 300 }}>
                  {m.desc}
                </div>

                {/* Indicateur actif */}
                {active && (
                  <div style={{
                    width: 20, height: 2, borderRadius: 99,
                    background: "linear-gradient(90deg, #4A90D9, #7EC8F0)",
                    marginTop: 2,
                  }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Difficulté */}
        {selected?.ai && (
          <div className="fade-in w-full" style={{
            background: "rgba(15,30,51,0.7)",
            border: "1px solid rgba(74,144,217,0.14)",
            borderRadius: 16, padding: "1.25rem 1.5rem",
            marginBottom: "1.5rem",
          }}>
            <p style={{
              fontSize: "0.65rem", color: "rgba(214,228,247,0.35)",
              textTransform: "uppercase", letterSpacing: "0.12em",
              fontWeight: 500, marginBottom: "0.75rem",
            }}>
              Difficulté de l'IA
            </p>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {DIFFICULTIES.map((d) => {
                const active = difficulty === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDifficulty(d.id)}
                    style={{
                      flex: 1,
                      background: active ? "rgba(74,144,217,0.22)" : "rgba(74,144,217,0.05)",
                      border: active ? "1px solid rgba(74,144,217,0.5)" : "1px solid rgba(74,144,217,0.12)",
                      borderRadius: 10, padding: "0.65rem 0.5rem",
                      cursor: "pointer", transition: "all 0.15s",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = "rgba(74,144,217,0.3)"; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = "rgba(74,144,217,0.12)"; }}
                  >
                    <span style={{
                      fontSize: "0.85rem", fontWeight: 600,
                      color: active ? "#90c4ea" : "#D6E4F7",
                    }}>
                      {d.label}
                    </span>
                    <span style={{ fontSize: "0.7rem", color: "rgba(214,228,247,0.35)" }}>
                      {d.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "0.75rem", width: "100%" }}>
          <button
            onClick={onBack}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "rgba(74,144,217,0.07)",
              border: "1px solid rgba(74,144,217,0.2)",
              borderRadius: 12, padding: "0.8rem 1.5rem",
              color: "#D6E4F7", fontSize: "0.875rem",
              cursor: "pointer", transition: "background 0.15s, border-color 0.15s",
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(74,144,217,0.14)"; e.currentTarget.style.borderColor = "rgba(74,144,217,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(74,144,217,0.07)"; e.currentTarget.style.borderColor = "rgba(74,144,217,0.2)"; }}
          >
            <IconArrowLeft size={16} stroke={1.5} />
            Retour
          </button>

          <button
            onClick={() => onStart(mode, difficulty)}
            style={{
              flex: 1,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "linear-gradient(135deg, #5BA3E8 0%, #2563AB 100%)",
              border: "none",
              borderRadius: 12, padding: "0.8rem 1.5rem",
              color: "#050c18", fontSize: "0.95rem", fontWeight: 600,
              cursor: "pointer", transition: "filter 0.15s, transform 0.15s",
              boxShadow: "0 0 24px rgba(74,144,217,0.2)",
            }}
            onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.1)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <IconPlayerPlay size={18} stroke={1.5} />
            Commencer la partie
          </button>
        </div>

      </div>
    </div>
  );
}