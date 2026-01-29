'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { ReactNode, Suspense } from 'react';

interface SceneProps {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  enableControls?: boolean;
  enableShadows?: boolean;
}

export default function Scene({
  children,
  cameraPosition = [0, 5, 10],
  enableControls = true,
  enableShadows = true,
}: SceneProps) {
  return (
    <div className="canvas-container">
      <Canvas
        shadows={enableShadows}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
          {children}
          {enableControls && (
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={20}
              autoRotate={false}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
