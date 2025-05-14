import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import gsap from "gsap";
import { PLAYER_SIZE, PLAYER_SPEED } from "../../constants/player";
import { useFrame } from "@react-three/fiber";
import { PLATFORM_RADIUS } from "../../constants/scene";
import usePlayerStore from "../../stores/player";
import useGameStore from "../../stores/game";

export default function Player() {
  const ref = useRef<Mesh>(null);

  const gameOver = useGameStore((state) => state.gameOver);
  const { position, setPosition } = usePlayerStore();
  const [velocity, setVelocity] = useState<{
    x: number;
    z: number;
  }>({
    x: 0,
    z: 0,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.code) {
        case "ArrowLeft":
          setVelocity((v) => ({ ...v, x: -PLAYER_SPEED * 10 }));
          break;
        case "ArrowRight":
          setVelocity((v) => ({ ...v, x: PLAYER_SPEED * 10 }));
          break;
        case "ArrowUp":
          setVelocity((v) => ({ ...v, z: -PLAYER_SPEED * 10 }));
          break;
        case "ArrowDown":
          setVelocity((v) => ({ ...v, z: PLAYER_SPEED * 10 }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "ArrowLeft":
        case "ArrowRight":
          setVelocity((v) => ({ ...v, x: 0 }));
          break;
        case "ArrowUp":
        case "ArrowDown":
          setVelocity((v) => ({ ...v, z: 0 }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameOver]);

  useFrame(() => {
    const newX = position.x + velocity.x;
    const newZ = position.z + velocity.z;
    const distance = Math.sqrt(newX ** 2 + newZ ** 2);
    if (distance < PLATFORM_RADIUS - 0.5) {
      setPosition({ x: newX, z: newZ });
    }
  });

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current.position, {
        x: position.x,
        z: position.z,
        duration: 0.1,
        ease: "power1.out",
      });
    }
  }, [position]);

  return (
    <mesh ref={ref} position={[0, 0.5, 0]}>
      <sphereGeometry args={[PLAYER_SIZE, 16, 16]} />
      <meshStandardMaterial color={0x0000ff} />
      {gameOver && (
        <meshStandardMaterial
          color={0xff0000}
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      )}
    </mesh>
  );
}
