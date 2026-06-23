import { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import ModeSelectScreen from "./components/ModeSelectScreen";
import GameScreen from "./components/GameScreen";
import RulesScreen from "./components/RulesScreen";

export default function App() {
  const [screen, setScreen] = useState("home");

  const [mode, setMode] = useState("hvh");

  // 🔥 remplace difficulty simple par objet
  const [aiDifficulty, setAiDifficulty] = useState({
    X: "medium",
    O: "medium",
  });

  return (
    <div className="min-h-screen">

      {screen === "home" && (
        <HomeScreen onNavigate={setScreen} />
      )}

      {screen === "mode" && (
        <ModeSelectScreen
          onBack={() => setScreen("home")}

          onStart={(selectedMode, selectedDifficulty) => {
            setMode(selectedMode);

            // 🔥 si HVH → on garde mais inutile
            if (selectedMode === "hvh") {
              setAiDifficulty({ X: null, O: null });
            } else {
              setAiDifficulty(selectedDifficulty);
            }

            setScreen("game");
          }}
        />
      )}

      {screen === "rules" && (
        <RulesScreen onBack={() => setScreen("home")} />
      )}

      {screen === "game" && (
        <GameScreen
          mode={mode}
          aiDifficulty={aiDifficulty}   // 🔥 important
          onMenu={() => setScreen("home")}
        />
      )}

    </div>
  );
}