'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface LibraryStudentProps {
  position?: [number, number, number];
  isReading?: boolean;
}

export default function LibraryStudent({ 
  position = [0, 0, 0],
  isReading = true 
}: LibraryStudentProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle breathing animation
  useFrame((state) => {
    if (groupRef.current && isReading) {
      groupRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.4, 0.8, 0.3]} />
        <meshStandardMaterial color="#C8A2C8" /> {/* Light purple shirt */}
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#FDBCB4" /> {/* Skin tone */}
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.5, -0.05]}>
        <sphereGeometry args={[0.18]} />
        <meshStandardMaterial color="#4A4A4A" /> {/* Dark hair */}
      </mesh>

      {/* Arms */}
      <mesh position={[-0.3, 0.9, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#FDBCB4" />
      </mesh>
      <mesh position={[0.3, 0.9, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#FDBCB4" />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.3, 0.6, 0]}>
        <sphereGeometry args={[0.06]} />
        <meshStandardMaterial color="#FDBCB4" />
      </mesh>
      <mesh position={[0.3, 0.6, 0]}>
        <sphereGeometry args={[0.06]} />
        <meshStandardMaterial color="#FDBCB4" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.15, 0.2, 0]}>
        <boxGeometry args={[0.12, 0.4, 0.12]} />
        <meshStandardMaterial color="#4169E1" /> {/* Blue jeans */}
      </mesh>
      <mesh position={[0.15, 0.2, 0]}>
        <boxGeometry args={[0.12, 0.4, 0.12]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>

      {/* Shoes */}
      <mesh position={[-0.15, 0.05, 0.1]}>
        <boxGeometry args={[0.15, 0.05, 0.25]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>
      <mesh position={[0.15, 0.05, 0.1]}>
        <boxGeometry args={[0.15, 0.05, 0.25]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>

      {/* Book in hands (if reading) */}
      {isReading && (
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.05}>
          <mesh position={[0, 0.7, 0.2]} rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[0.25, 0.05, 0.18]} />
            <meshStandardMaterial color="#8B0000" />
          </mesh>
        </Float>
      )}

      {/* Backpack */}
      <mesh position={[0, 0.8, -0.2]}>
        <boxGeometry args={[0.3, 0.4, 0.15]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      {/* Backpack straps */}
      <mesh position={[-0.1, 1.1, -0.1]}>
        <boxGeometry args={[0.03, 0.3, 0.03]} />
        <meshStandardMaterial color="#006400" />
      </mesh>
      <mesh position={[0.1, 1.1, -0.1]}>
        <boxGeometry args={[0.03, 0.3, 0.03]} />
        <meshStandardMaterial color="#006400" />
      </mesh>
    </group>
  );
}