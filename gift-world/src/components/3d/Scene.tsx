'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
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
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={[1, 2]}
        camera={{ 
          fov: 50, 
          near: 0.1, 
          far: 1000, 
          position: cameraPosition 
        }}
      >
        <Suspense fallback={null}>
          {children}
          {enableControls && (
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={50}
              maxPolarAngle={Math.PI / 2.1}
              minPolarAngle={Math.PI / 6}
              autoRotate={false}
              autoRotateSpeed={0.5}
              panSpeed={1.5}
              zoomSpeed={1.2}
              rotateSpeed={0.8}
              enableDamping={true}
              dampingFactor={0.05}
              screenSpacePanning={false}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
