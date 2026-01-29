import { Vector3 } from '@react-three/fiber';

type PetDog3DProps = {
  position?: Vector3;
  scale?: number;
};

export default function PetDog3D({ position = [2, 0, 5], scale = 1 }: PetDog3DProps) {
  // Simple stylized dog
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Body */}
      <mesh position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#C2B280" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.32, 0.18]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#C2B280" />
      </mesh>
      {/* Legs */}
      {([-0.08, 0.08] as const).map((x, i) => (
        <mesh key={`front-leg-${i}`} position={[x, 0.06, 0.08]}>
          <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
          <meshStandardMaterial color="#A67B5B" />
        </mesh>
      ))}
      {([-0.08, 0.08] as const).map((x, i) => (
        <mesh key={`back-leg-${i}`} position={[x, 0.06, -0.08]}>
          <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
          <meshStandardMaterial color="#A67B5B" />
        </mesh>
      ))}
      {/* Tail */}
      <mesh position={[0, 0.22, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.14, 6]} />
        <meshStandardMaterial color="#A67B5B" />
      </mesh>
      {/* Ears */}
      <mesh position={[-0.06, 0.41, 0.18]}>
        <coneGeometry args={[0.03, 0.08, 8]} />
        <meshStandardMaterial color="#A67B5B" />
      </mesh>
      <mesh position={[0.06, 0.41, 0.18]}>
        <coneGeometry args={[0.03, 0.08, 8]} />
        <meshStandardMaterial color="#A67B5B" />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 0.34, 0.28]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  );
}
