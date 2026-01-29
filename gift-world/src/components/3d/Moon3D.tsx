import { useRef } from 'react';

export default function Moon3D({ color = '#FFD700', scale = 1 }) {
  const meshRef = useRef();
  // Crescent moon: subtract a smaller sphere from a larger one
  return (
    <group scale={[scale, scale, scale]}>
      {/* Main moon */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Crescent cutout (fake by overlay) */}
      <mesh position={[0.22, 0, 0.08]} castShadow receiveShadow>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#222" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}
