import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import { Group } from 'three';
import { Vector3 } from 'three';

type ButterflyProps = {
  position?: [number, number, number];
  color?: string;
  speed?: number;
  phase?: number;
};

export function Butterfly({ position = [0, 2, 0], color = '#FFB6E1', speed = 1, phase = 0 }: ButterflyProps) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + phase;
      ref.current.position.x = position[0] + Math.sin(t) * 0.7;
      ref.current.position.y = position[1] + Math.sin(t * 2) * 0.2;
      ref.current.position.z = position[2] + Math.cos(t) * 0.7;
      ref.current.rotation.y = Math.sin(t) * 0.5;
    }
  });
  return (
    <group ref={ref}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 0.12, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Wings */}
      <mesh position={[-0.04, 0.04, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.04, 0.04, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

type BirdProps = {
  position?: [number, number, number];
  color?: string;
  speed?: number;
  phase?: number;
};

export function Bird({ position = [0, 4, -4], color = '#FFD93D', speed = 0.7, phase = 0 }: BirdProps) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + phase;
      ref.current.position.x = position[0] + Math.sin(t) * 2.5;
      ref.current.position.y = position[1] + Math.sin(t * 2) * 0.4;
      ref.current.position.z = position[2] + Math.cos(t) * 2.5;
      ref.current.rotation.y = Math.sin(t) * 0.5;
    }
  });
  return (
    <group ref={ref}>
      {/* Body */}
      <mesh>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Wings */}
      <mesh position={[-0.13, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.18, 0.03, 0.06]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.13, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.18, 0.03, 0.06]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Beak */}
      <mesh position={[0, -0.03, 0.09]}>
        <coneGeometry args={[0.02, 0.06, 8]} />
        <meshStandardMaterial color="#FF8C00" />
      </mesh>
    </group>
  );
}
