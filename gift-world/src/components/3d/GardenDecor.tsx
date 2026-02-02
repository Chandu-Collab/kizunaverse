import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
type FlowerProps = { position: [number, number, number]; color: string };
function Flower({ position, color }: FlowerProps) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 1.5 + position[0]) * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(t * 2.5 + position[2]) * 0.02;
    }
  });
  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <cylinderGeometry args={[0.012, 0.018, 0.22, 8]} />
        <meshStandardMaterial color="#32A132" roughness={0.7} />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.07, 0.11, Math.sin(angle) * 0.07]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
      })}
    </group>
  );
}

type BushProps = { position: [number, number, number] };
function Bush({ position }: BushProps) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.7 + position[0]) * 0.07;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.1 + position[2]) * 0.015;
    }
  });
  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial color="#2d6016" />
      </mesh>
      <mesh position={[0.18, 0, 0]}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial color="#3d7026" />
      </mesh>
    </group>
  );
}

type GardenDecorProps = {
  position?: [number, number, number];
};

export default function GardenDecor({ position = [0, 0, 0] }: GardenDecorProps) {
  // Scatter flowers and bushes
  const flowerColors = ['#FF6B9D', '#FFD93D', '#98E4FF', '#FFB6E1', '#A084E8'];
  return (
    <group position={position}>
      {Array.from({ length: 12 }).map((_, i) => (
        <Flower key={i} position={[-4 + i, 0.01, 7 + Math.sin(i) * 2]} color={flowerColors[i % flowerColors.length]} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <Bush key={i} position={[-3 + i * 2, 0.01, 9 + Math.cos(i) * 2]} />
      ))}
    </group>
  );
}
