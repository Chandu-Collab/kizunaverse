import { useRef } from 'react';
import type { Mesh } from 'three';

export default function Cake3D({ color = '#FFB6C1', scale = 1 }) {
  const meshRef = useRef<Mesh | null>(null);
  return (
    <group scale={[scale, scale, scale]}>
      {/* Cake base */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Cake top */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.12, 32]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Candle */}
      <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.18, 16]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      {/* Flame */}
      <mesh position={[0, 0.43, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#FF8C00" emissive="#FF8C00" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}
