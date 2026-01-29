import { useRef } from 'react';

export default function Book3D({ color = '#A084E8', scale = 1 }) {
  const meshRef = useRef();
  return (
    <group scale={[scale, scale, scale]}>
      {/* Left page */}
      <mesh ref={meshRef} position={[-0.18, 0, 0]} rotation={[0, 0, Math.PI / 8]} castShadow receiveShadow>
        <boxGeometry args={[0.18, 0.04, 0.32]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Right page */}
      <mesh position={[0.18, 0, 0]} rotation={[0, 0, -Math.PI / 8]} castShadow receiveShadow>
        <boxGeometry args={[0.18, 0.04, 0.32]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Book cover left */}
      <mesh position={[-0.19, -0.01, 0]} rotation={[0, 0, Math.PI / 8]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.02, 0.34]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Book cover right */}
      <mesh position={[0.19, -0.01, 0]} rotation={[0, 0, -Math.PI / 8]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.02, 0.34]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}
