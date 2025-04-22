import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import Lights from "./Lights";
import Platform from "./Platform";
import Player from "./Player";
import Rock from "./Rock";

interface RockData {
  id: number;
  position: [number, number, number];
}

export default function SceneContent() {
  const [playerPos, setPlayerPos] = useState<{ x: number; z: number }>({
    x: 0,
    z: 0,
  });
  const [playerVelocity, setPlayerVelocity] = useState<{
    x: number;
    z: number;
  }>({
    x: 0,
    z: 0,
  });
  const [rocks, setRocks] = useState<RockData[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const platformRadius = 5;
  const speed = 0.03;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;
      switch (e.code) {
        case "ArrowLeft":
          setPlayerVelocity((v) => ({ ...v, x: -speed * 10 }));
          break;
        case "ArrowRight":
          setPlayerVelocity((v) => ({ ...v, x: speed * 10 }));
          break;
        case "ArrowUp":
          setPlayerVelocity((v) => ({ ...v, z: -speed * 10 }));
          break;
        case "ArrowDown":
          setPlayerVelocity((v) => ({ ...v, z: speed * 10 }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "ArrowLeft":
        case "ArrowRight":
          setPlayerVelocity((v) => ({ ...v, x: 0 }));
          break;
        case "ArrowUp":
        case "ArrowDown":
          setPlayerVelocity((v) => ({ ...v, z: 0 }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isGameOver]);

  useFrame(() => {
    if (isGameOver) return;
    const newX = playerPos.x + playerVelocity.x;
    const newZ = playerPos.z + playerVelocity.z;
    const distance = Math.sqrt(newX ** 2 + newZ ** 2);
    if (distance < platformRadius - 0.5) {
      setPlayerPos({ x: newX, z: newZ });
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGameOver) return;
      const x = (Math.random() - 0.5) * 5;
      const z = (Math.random() - 0.5) * 5;
      const y = 8;
      setRocks((rocks) => [
        ...rocks,
        { id: Math.random(), position: [x, y, z] },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameOver]);

  const handleHit = () => {
    if (isGameOver) return;
    setIsGameOver(true);
    alert("Game Over! Reload to play again.");
  };

  const handleMiss = (id: number) => {
    setRocks((rocks) => rocks.filter((r) => r.id !== id));
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
      <Player position={playerPos} />
      {rocks.map((rock) => (
        <Rock
          key={rock.id}
          position={rock.position}
          onHitPlayer={handleHit}
          onMiss={() => handleMiss(rock.id)}
        />
      ))}
    </>
  );
}
