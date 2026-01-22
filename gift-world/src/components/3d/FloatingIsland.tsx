'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useGLTF } from '@react-three/drei';

// Simple floating island component
export default function FloatingIsland() {
  const islandRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (islandRef.current) {
      islandRef.current.rotation.y += 0.001;
      islandRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <group ref={islandRef}>
      {/* Base island */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[3, 4, 1, 32]} />
        <meshStandardMaterial
          color="#8B7355"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Top surface */}
      <mesh receiveShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[3.5, 3.5, 0.2, 32]} />
        <meshStandardMaterial
          color="#90EE90"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Decorative elements */}
      <mesh castShadow position={[-1, 1, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial color="#4A7C59" />
      </mesh>

      <mesh castShadow position={[1, 1, 0.5]}>
        <boxGeometry args={[0.3, 0.6, 0.3]} />
        <meshStandardMaterial color="#4A7C59" />
      </mesh>

      <mesh castShadow position={[0, 1.2, -1]}>
        <boxGeometry args={[0.3, 0.5, 0.3]} />
        <meshStandardMaterial color="#4A7C59" />
      </mesh>
    </group>
  );
}
