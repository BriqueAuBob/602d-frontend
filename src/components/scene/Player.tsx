import { useEffect, useRef } from "react";
import { Mesh } from "three";
import gsap from "gsap";

type PlayerProps = {
  position: {
    x: number;
    z: number;
  };
};

export default function Player({ position }: PlayerProps) {
  const ref = useRef<Mesh>(null);

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
      <sphereGeometry args={[0.75, 16, 16]} />
      <meshStandardMaterial color={0x0000ff} />
    </mesh>
  );
}
