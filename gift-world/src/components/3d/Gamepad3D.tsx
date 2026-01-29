import { useRef } from 'react';

export default function Gamepad3D({ color = '#4F8BFF', scale = 1 }) {
  const meshRef = useRef();
  return (
    <group scale={[scale, scale, scale]}>
      {/* Main body */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.5, 0.22, 16, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Buttons */}
      <mesh position={[-0.3, 0.18, 0.18]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh position={[0.3, 0.18, 0.18]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh position={[0, -0.18, 0.18]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
    </group>
  );
}
