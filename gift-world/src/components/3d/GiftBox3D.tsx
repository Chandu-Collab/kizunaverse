import { useRef } from 'react';

export default function GiftBox3D({ color = '#FFB6C1', scale = 1 }) {
  const meshRef = useRef();
  return (
    <group scale={[scale, scale, scale]}>
      {/* Box base */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Ribbon vertical */}
      <mesh position={[0, 0, 0.36]}>
        <boxGeometry args={[0.08, 0.7, 0.08]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      {/* Ribbon horizontal */}
      <mesh position={[0.36, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.08, 0.7, 0.08]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      {/* Bow */}
      <mesh position={[0, 0.38, 0]}>
        <torusGeometry args={[0.13, 0.04, 12, 24, Math.PI]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      <mesh position={[0, 0.38, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.13, 0.04, 12, 24, Math.PI]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}
