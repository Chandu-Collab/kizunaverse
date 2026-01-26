import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

const MODEL_PATH = '/galaxia_anime_girl.glb';

export default function AnimatedGLBModel() {
  const { scene } = useGLTF(MODEL_PATH);
  return (
    <group position={[0, 0.5, 6]} scale={[1.2, 1.2, 1.2]}>
      <primitive object={scene} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
    </group>
  );
}