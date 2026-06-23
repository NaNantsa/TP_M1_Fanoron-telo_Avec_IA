import { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import ModeSelectScreen from "./components/ModeSelectScreen";
import GameScreen from "./components/GameScreen";
import RulesScreen from "./components/RulesScreen";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState("hvh");
  const [difficulty, setDifficulty] = useState("medium");

  return (
    <div className="min-h-screen">
      {screen === "home" && <HomeScreen onNavigate={setScreen} />}
      {screen === "mode" && (
        <ModeSelectScreen
          onBack={() => setScreen("home")}
          onStart={(m, d) => {
            setMode(m);
            setDifficulty(d);
            setScreen("game");
          }}
        />
      )}
      {screen === "rules" && <RulesScreen onBack={() => setScreen("home")} />}
      {screen === "game" && (
        <GameScreen
          mode={mode}
          difficulty={difficulty}
          onMenu={() => setScreen("home")}
        />
      )}
    </div>
  );
}
