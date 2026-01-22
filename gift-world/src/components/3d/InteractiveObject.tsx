'use client';

import { useRef, useState } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Mesh } from 'three';
import { Text } from '@react-three/drei';

interface InteractiveObjectProps {
  position: [number, number, number];
  label: string;
  onClick: () => void;
  color?: string;
  shape?: 'box' | 'sphere' | 'cylinder';
}

export default function InteractiveObject({
  position,
  label,
  onClick,
  color = '#FF6B9D',
  shape = 'box',
}: InteractiveObjectProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onClick();
  };

  const geometryProps = {
    box: <boxGeometry args={[1, 1, 1]} />,
    sphere: <sphereGeometry args={[0.5, 32, 32]} />,
    cylinder: <cylinderGeometry args={[0.5, 0.5, 1, 32]} />,
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {geometryProps[shape]}
        <meshStandardMaterial
          color={hovered ? '#FFB6C1' : color}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text>
    </group>
  );
}
