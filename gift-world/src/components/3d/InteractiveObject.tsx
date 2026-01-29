'use client';

import { useRef, useState } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Mesh, Shape, ExtrudeGeometry } from 'three';
import { Text, Html } from '@react-three/drei';

import { ReactNode } from 'react';

interface InteractiveObjectProps {
  position: [number, number, number];
  label: string;
  onClick: () => void;
  color?: string;
  shape?: 'box' | 'sphere' | 'cylinder' | 'torus' | 'octahedron' | 'star' | 'heart';
  children?: ReactNode;
}

export default function InteractiveObject({
  position,
  label,
  onClick,
  color = '#FF6B9D',
  shape = 'box',
  children,
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
    torus: <torusGeometry args={[0.5, 0.18, 16, 100]} />,
    octahedron: <octahedronGeometry args={[0.6, 0]} />,
    star: <torusGeometry args={[0.5, 0.18, 5, 24, Math.PI * 2]} />, // Star-like torus
    heart: null, // handled below
  };

  return (
    <group position={position}>
      {/* Render custom 3D model if provided, else fallback to default shape */}
      {children ? (
        <group
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
        >
          {children}
        </group>
      ) : shape === 'heart' ? (
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          rotation={[Math.PI, 0, 0]}
          scale={hovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
        >
          {/* Heart shape using ExtrudeGeometry */}
          {(() => {
            const heartShape = new Shape();
            heartShape.moveTo(0, 0.25);
            heartShape.bezierCurveTo(0, 0.25, -0.3, 0, 0, -0.35);
            heartShape.bezierCurveTo(0.3, 0, 0, 0.25, 0, 0.25);
            return <extrudeGeometry args={[heartShape, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 2 }]} />;
          })()}
          <meshStandardMaterial
            color={hovered ? '#FFB6C1' : color}
            emissive={hovered ? color : '#000000'}
            emissiveIntensity={hovered ? 0.5 : 0}
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>
      ) : (
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
      )}
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
