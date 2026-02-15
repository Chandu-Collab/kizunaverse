import React, { Suspense, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber'; // Correct import for useFrame
import { Mesh } from 'three';

const MODEL_PATH = '/galaxia_anime_girl.glb';

type AnimatedGLBModelProps = {
  initialPosition: [number, number, number];
  roamRadius: number;
  onInteract: (position: [number, number, number]) => void;
};

export default function AnimatedGLBModel({ initialPosition, roamRadius, onInteract }: AnimatedGLBModelProps) {
  const { scene } = useGLTF(MODEL_PATH);
  const meshRef = useRef<Mesh | null>(null); // Ensure meshRef can be null
  const [hovered, setHovered] = useState(false);

  const ROAM_SPEED = 0.15;
  const ROAM_SCALE = { normal: 1.2, hovered: 1.5 };
  const roamBounds = {
    minX: -10,
    maxX: 10,
    minZ: -12,
    maxZ: 8,
  };

  useFrame(({ clock }: { clock: { getElapsedTime: () => number } }) => { // Explicitly type clock
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      const a = (roamBounds.maxX - roamBounds.minX) / 2 - 2;
      const b = (roamBounds.maxZ - roamBounds.minZ) / 2 - 2;
      const centerX = (roamBounds.maxX + roamBounds.minX) / 2;
      const centerZ = (roamBounds.maxZ + roamBounds.minZ) / 2;
      const x = centerX + Math.cos(t * ROAM_SPEED) * a;
      const z = centerZ + Math.sin(t * ROAM_SPEED) * b;
      meshRef.current.position.x = x;
      meshRef.current.position.z = z;
      meshRef.current.rotation.y = Math.sin(t * 0.5);
      meshRef.current.scale.setScalar(hovered ? ROAM_SCALE.hovered : ROAM_SCALE.normal);
    }
  });

  return (
    <group
      ref={meshRef}
      position={initialPosition}
      scale={[1.2, 1.2, 1.2]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        if (meshRef.current) { // Ensure meshRef is not null
          const position: [number, number, number] = [
            meshRef.current.position.x,
            meshRef.current.position.y,
            meshRef.current.position.z,
          ];
          onInteract(position);
        }
      }}
    >
      <primitive object={scene} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
    </group>
  );
}