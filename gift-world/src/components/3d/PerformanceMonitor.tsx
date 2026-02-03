import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

interface PerformanceMonitorProps {
  showStats?: boolean;
}

export default function PerformanceMonitor({ showStats = true }: PerformanceMonitorProps) {
  const { gl } = useThree();
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const fps = useRef(60);
  
  useFrame(() => {
    frameCount.current++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime.current >= 1000) {
      fps.current = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
      frameCount.current = 0;
      lastTime.current = currentTime;
      
      if (showStats) {
        const info = gl.info;
        console.log(`FPS: ${fps.current}, Draw Calls: ${info.render.calls}, Triangles: ${info.render.triangles}`);
      }
    }
  });

  if (!showStats) return null;

  return (
    <group position={[-12, 6, 0]}>
      {/* FPS Display Background */}
      <mesh>
        <planeGeometry args={[3, 1]} />
        <meshBasicMaterial color="rgba(0,0,0,0.7)" transparent />
      </mesh>
      
      {/* Performance warning if FPS is low */}
      {fps.current < 30 && (
        <mesh position={[0, -0.7, 0.01]}>
          <planeGeometry args={[3, 0.3]} />
          <meshBasicMaterial color="rgba(255,0,0,0.8)" transparent />
        </mesh>
      )}
    </group>
  );
}

// Performance utilities
export const PerformanceUtils = {
  // Simplified geometry creation
  createOptimizedGeometry: (type: 'box' | 'cylinder' | 'sphere', args: number[]) => {
    switch (type) {
      case 'box':
        return [args[0], args[1], args[2]];
      case 'cylinder':
        return [args[0], args[1], args[2], Math.max(4, args[3] || 8)]; // Min 4 segments
      case 'sphere':
        return [args[0], Math.max(4, args[1] || 8), Math.max(4, args[2] || 8)]; // Min 4 segments
      default:
        return args;
    }
  },
  
  // Material optimization
  createOptimizedMaterial: (color: string, options: { metalness?: number; roughness?: number; } = {}) => ({
    color,
    metalness: options.metalness || 0,
    roughness: options.roughness || 0.8,
  }),
  
  // LOD calculation based on distance
  calculateLOD: (distance: number) => {
    if (distance < 10) return 'high';
    if (distance < 25) return 'medium';
    return 'low';
  }
};