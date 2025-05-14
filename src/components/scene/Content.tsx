import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import Lights from "./Lights";
import Platform from "./Platform";
import Player from "./Player";
import Rock from "./Rock";
import useScoreStore from "../../stores/game";
import usePlayerStore from "../../stores/player";
import fetchApi from "../../utils/fetchApi";

interface RockData {
  id: number;
  position: [number, number, number];
}

export default function SceneContent() {
  const score = useScoreStore((state) => state.score);
  const setScore = useScoreStore((state) => state.setScore);
  const gameOver = useScoreStore((state) => state.gameOver);
  const setGameOver = useScoreStore((state) => state.setGameOver);
  const [rocks, setRocks] = useState<RockData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver) return;
      const x = (Math.random() - 0.5) * 5;
      const z = (Math.random() - 0.5) * 5;
      const y = 8;
      setRocks((rocks) => [
        ...rocks,
        { id: Math.random(), position: [x, y, z] },
      ]);
    }, 1000);

    const reloadGame = (e: KeyboardEvent) => {
      if (e.key === "r" && gameOver) {
        window.location.reload();
      }
    };
    window.addEventListener("keydown", reloadGame);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", reloadGame);
    };
  }, [gameOver]);

  const handleHit = (id: number) => {
    setScore(score + 1);
    setRocks((rocks) => rocks.filter((r) => r.id !== id));
  };

  const handleMiss = (id: number) => {
    setRocks((rocks) => rocks.filter((r) => r.id !== id));
    setGameOver(true);

    fetchApi("scores", {
      method: "POST",
      body: JSON.stringify({
        score: score.toString(),
      }),
    });
  };

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enableRotate={false}
        enablePan={false}
      />
      <Lights />
      <Platform />
      <Player />
      {rocks.map((rock) => (
        <Rock
          key={rock.id}
          position={rock.position}
          onHitPlayer={() => handleHit(rock.id)}
          onMiss={() => handleMiss(rock.id)}
        />
      ))}
    </>
  );
}
