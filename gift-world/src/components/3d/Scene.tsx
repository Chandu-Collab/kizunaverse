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
              minDistance={3}
              maxDistance={100}
              maxPolarAngle={Math.PI / 2.1}
              autoRotate={false}
              panSpeed={1.5}
              zoomSpeed={1.2}
              rotateSpeed={0.8}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
