import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";

type RockProps = {
  position: [number, number, number];
  onHitPlayer: () => void;
  onMiss: () => void;
};

export default function Rock({ position, onHitPlayer, onMiss }: RockProps) {
  const ref = useRef<Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;

    ref.current.position.y -= 0.1;

    const distance = ref.current.position.distanceTo(new Vector3(0, 0.5, 0));
    if (ref.current.position.y <= 1 && distance < 0.7) {
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
