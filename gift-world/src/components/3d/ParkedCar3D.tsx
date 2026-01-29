type ParkedCar3DProps = {
  position?: [number, number, number];
  scale?: number;
  rotationY?: number;
};

export default function ParkedCar3D({ position = [-3, 0, 2], scale = 1, rotationY = 0 }: ParkedCar3DProps) {
  return (
    <group position={position} scale={[scale, scale, scale]} rotation={[0, rotationY, 0]}>
      {/* Car body */}
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[0.7, 0.22, 0.32]} />
        <meshStandardMaterial color="#4F8BFF" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.32, 0]}>
        <boxGeometry args={[0.36, 0.12, 0.32]} />
        <meshStandardMaterial color="#A084E8" />
      </mesh>
      {/* Wheels */}
      {[-0.22, 0.22].map((x, i) => (
        <mesh key={i} position={[x, 0.08, 0.13]}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 16]} />
          <meshStandardMaterial color="#222" />
          <mesh rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
      ))}
      {[-0.22, 0.22].map((x, i) => (
        <mesh key={i} position={[x, 0.08, -0.13]}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 16]} />
          <meshStandardMaterial color="#222" />
          <mesh rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
      ))}
    </group>
  );
}
