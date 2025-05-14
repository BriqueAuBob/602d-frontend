import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
import usePlayerStore from "../../stores/player";

type RockProps = {
  position: [number, number, number];
  onHitPlayer: () => void;
  onMiss: () => void;
};

export default function Rock({ position, onHitPlayer, onMiss }: RockProps) {
  const ref = useRef<Mesh>(null);
  const { position: playerPosition } = usePlayerStore();

  useFrame(() => {
    if (!ref.current) return;

    ref.current.position.y -= 0.1;

    const distance = ref.current.position.distanceTo(
      new Vector3(playerPosition.x, 0.5, playerPosition.z)
    );
    if (ref.current.position.y <= 1 && distance < 1) {
      onHitPlayer();
    } else if (ref.current.position.y < 0) {
      onMiss();
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <dodecahedronGeometry args={[0.5]} />
      <meshStandardMaterial color={0x8b5a2b} />
    </mesh>
  );
}
