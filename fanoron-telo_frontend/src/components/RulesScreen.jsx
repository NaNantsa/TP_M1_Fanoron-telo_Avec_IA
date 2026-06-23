import { IconArrowLeft, IconCircleDot, IconArrowsShuffle } from "@tabler/icons-react";
import Board from "./Board";

export default function RulesScreen({ onBack }) {
  const demoBoard = [null, null, null, null, "X", null, null, null, null];

  return (
    <div className="min-h-screen flex items-center px-6 py-8 fade-in relative overflow-hidden">

      {/* Grille de fond */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(74,144,217,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(74,144,217,0.035) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
      }} />

      {/* Halo */}
      <div className="absolute pointer-events-none" style={{
        width: 600, height: 350, top: -100, left: "50%", transform: "translateX(-50%)",
        background: "radial-gradient(ellipse at center, rgba(74,144,217,0.12) 0%, transparent 70%)",
      }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto">

        {/* Layout 2 colonnes pleine hauteur */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          alignItems: "stretch",
        }}>

          {/* ── Colonne gauche : Board + titre ── */}
          <div style={{
            background: "rgba(15,30,51,0.7)",
            border: "1px solid rgba(74,144,217,0.14)",
            borderRadius: 20,
            padding: "2rem 1.75rem",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: "1.25rem",
          }}>
            <div style={{ textAlign: "center" }}>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-medium tracking-widest uppercase" style={{
                background: "rgba(74,144,217,0.10)", border: "1px solid rgba(74,144,217,0.28)", color: "#4A90D9",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4A90D9", display: "inline-block" }} />
                Guide du jeu
              </div>
              <h2 className="font-display mt-3" style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.1,
                background: "linear-gradient(135deg, #7EC8F0 0%, #4A90D9 45%, #2563AB 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                margin: "0.5rem 0 0 0",
              }}>
                Règles du<br />Fanoron-telo
              </h2>
            </div>

            <div style={{
              width: 40, height: 1,
              background: "linear-gradient(90deg, transparent, #4A90D9, transparent)",
            }} />

            <Board
              board={demoBoard}
              selectedCell={null}
              validTargets={[]}
              winLine={null}
              onCellClick={() => {}}
              disabled
            />

            <p className="font-display tracking-widest uppercase" style={{
              fontSize: "0.65rem", color: "rgba(214,228,247,0.25)", letterSpacing: "0.14em",
            }}>
              Plateau de démonstration
            </p>
          </div>

          {/* ── Colonne droite : Règles + bouton ── */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "0.75rem",
          }}>

            {/* Phase 1 */}
            <div style={{
              flex: 1,
              background: "rgba(15,30,51,0.7)",
              border: "1px solid rgba(74,144,217,0.14)",
              borderRadius: 16, padding: "1.25rem 1.5rem",
              display: "flex", flexDirection: "column", justifyContent: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.6rem" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(74,144,217,0.15)", border: "1px solid rgba(74,144,217,0.25)",
                  color: "#6BAED6",
                }}>
                  <IconCircleDot size={18} stroke={1.5} />
                </div>
                <div>
                  <div style={{ fontSize: "0.62rem", color: "rgba(214,228,247,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500 }}>
                    Phase 1
                  </div>
                  <div className="font-display" style={{ fontSize: "1rem", fontWeight: 600, color: "#90c4ea", lineHeight: 1.2 }}>
                    Placement
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "0.875rem", color: "rgba(214,228,247,0.65)", lineHeight: 1.7, margin: 0 }}>
                Chaque joueur place tour à tour une pièce sur une intersection libre.
                Aligner ses 3 pièces (ligne, colonne ou diagonale) durant le placement donne la victoire immédiate.
              </p>
            </div>

            {/* Phase 2 */}
            <div style={{
              flex: 1,
              background: "rgba(15,30,51,0.7)",
              border: "1px solid rgba(74,144,217,0.14)",
              borderRadius: 16, padding: "1.25rem 1.5rem",
              display: "flex", flexDirection: "column", justifyContent: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.6rem" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(74,144,217,0.15)", border: "1px solid rgba(74,144,217,0.25)",
                  color: "#6BAED6",
                }}>
                  <IconArrowsShuffle size={18} stroke={1.5} />
                </div>
                <div>
                  <div style={{ fontSize: "0.62rem", color: "rgba(214,228,247,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500 }}>
                    Phase 2
                  </div>
                  <div className="font-display" style={{ fontSize: "1rem", fontWeight: 600, color: "#90c4ea", lineHeight: 1.2 }}>
                    Déplacement
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "0.875rem", color: "rgba(214,228,247,0.65)", lineHeight: 1.7, margin: 0 }}>
                Si personne n'a gagné après 6 pièces, on déplace ses pièces d'une intersection
                adjacente à une intersection libre. Le premier à aligner 3 pièces gagne.
              </p>
            </div>

            {/* Astuce */}
            <div style={{
              background: "rgba(15,30,51,0.5)",
              border: "1px solid rgba(74,144,217,0.12)",
              borderRadius: 12, padding: "0.9rem 1.2rem",
            }}>
              <p style={{ fontSize: "0.8rem", color: "rgba(214,228,247,0.5)", lineHeight: 1.6, margin: 0 }}>
                <span style={{ color: "#6BAED6", fontWeight: 600 }}>Astuce : </span>
                Le centre du plateau est la case la plus stratégique — contrôlez-la dès le premier tour.
              </p>
            </div>

            {/* Bouton retour */}
            <button
              onClick={onBack}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: "rgba(74,144,217,0.07)",
                border: "1px solid rgba(74,144,217,0.2)",
                borderRadius: 12, padding: "0.75rem 1.25rem",
                color: "#D6E4F7", fontSize: "0.875rem",
                cursor: "pointer", transition: "background 0.15s, border-color 0.15s",
                width: "100%",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(74,144,217,0.14)"; e.currentTarget.style.borderColor = "rgba(74,144,217,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(74,144,217,0.07)"; e.currentTarget.style.borderColor = "rgba(74,144,217,0.2)"; }}
            >
              <IconArrowLeft size={16} stroke={1.5} />
              Retour à l'accueil
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}