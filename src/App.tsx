import { Canvas } from "@react-three/fiber";
import SceneContent from "./components/scene/Content";
import useScoreStore from "./stores/game";
import Leaderboard from "./components/ui/Leaderboard";
import { useState } from "react";
import Login from "./components/ui/Login";
import Register from "./components/ui/Register";

export default function App() {
  const score = useScoreStore((state) => state.score);
  const gameOver = useScoreStore((state) => state.gameOver);

  const [currentScreen, setCurrentScreen] = useState<
    "menu" | "login" | "game" | "register"
  >("menu");

  return currentScreen === "game" ? (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas id="canvas" camera={{ position: [0, 5, 10], fov: 75 }} flat>
        <SceneContent />
      </Canvas>
      <div className="score">{score}</div>
      <Leaderboard />
      {gameOver && (
        <div className="game-over">
          <h1>Game Over</h1>
          <p>Final Score: {score}</p>
          <p>Press R to restart</p>
        </div>
      )}
    </div>
  ) : currentScreen === "menu" ? (
    <div className="menu">
      <h1>Welcome to the Game</h1>
      <button onClick={() => setCurrentScreen("game")}>Play</button>
      <div className="group">
        <button onClick={() => setCurrentScreen("login")}>Login</button>
        <button onClick={() => setCurrentScreen("register")}>Register</button>
      </div>
    </div>
  ) : currentScreen === "login" ? (
    <Login setCurrentScreen={setCurrentScreen} />
  ) : (
    <Register setCurrentScreen={setCurrentScreen} />
  );
}
