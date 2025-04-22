export default function Platform() {
  return (
    <mesh position={[0, -0.25, 0]}>
      <cylinderGeometry args={[5, 5, 0.5, 32]} />
      <meshStandardMaterial color={0x009900} />
    </mesh>
  );
}
