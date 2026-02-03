import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

// Ground Spotlight for pathway illumination
function GroundSpotlight({ position, color = '#FFE55C', radius = 1.5 }: {
  position: [number, number, number];
  color?: string;
  radius?: number;
}) {
  const spotRef = useRef<THREE.Mesh>(null);
  const { isNight } = useTheme();
  
  useFrame(({ clock }) => {
    if (spotRef.current && isNight) {
      const t = clock.getElapsedTime();
      const intensity = 0.3 + Math.sin(t * 2 + position[0] + position[2]) * 0.1;
      (spotRef.current.material as THREE.MeshStandardMaterial).opacity = intensity;
    }
  });
  
  // Only show lighting effects at night
  if (!isNight) return null;
  
  return (
    <>
      <mesh ref={spotRef} position={[position[0], position[1] + 0.005, position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 16]} />
        <meshStandardMaterial 
          color={color}
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <spotLight
        position={[position[0], position[1] + 3, position[2]]}
        target-position={position}
        intensity={0.8}
        color={color}
        distance={6}
        angle={Math.PI / 4}
        penumbra={0.5}
        decay={2}
      />
    </>
  );
}

// Decorative Glowing Stone for pathways
function GlowingStone({ position, size = 0.1, color = '#A084E8' }: {
  position: [number, number, number];
  size?: number;
  color?: string;
}) {
  const stoneRef = useRef<THREE.Mesh>(null);
  const { isNight } = useTheme();
  
  useFrame(({ clock }) => {
    if (stoneRef.current && isNight) {
      const t = clock.getElapsedTime();
      const intensity = 0.5 + Math.sin(t * 1.5 + position[0] + position[2]) * 0.3;
      (stoneRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });
  
  // Only show glowing stones at night
  if (!isNight) return null;
  
  return (
    <group>
      <mesh ref={stoneRef} position={position}>
        <dodecahedronGeometry args={[size]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={isNight ? 0.5 : 0}
          roughness={0.3}
        />
      </mesh>
      {isNight && (
        <pointLight 
          position={position} 
          intensity={0.3} 
          color={color} 
          distance={1.5} 
        />
      )}
    </group>
  );
}

// Main Pathway Lighting Component
export default function PathwayLighting() {
  const { isNight } = useTheme();
  
  return (
    <group>
      {/* Ground spotlights - minimal set for performance */}
      <GroundSpotlight position={[0, 0, 2]} color="#FFE55C" radius={1.5} />
      <GroundSpotlight position={[0, 0, 8]} color="#A084E8" radius={1.8} />
      
      {/* Decorative glowing stones - minimal set */}
      <GlowingStone position={[-1.5, 0.02, 3]} size={0.08} color="#FFE55C" />
      <GlowingStone position={[1.8, 0.02, 6]} size={0.09} color="#98E4FF" />
      
      {/* Minimal night-time ambiance for performance */}
      {isNight && (
        <>
          {/* Simple rim lighting */}
          <pointLight position={[10, 3, 0]} intensity={0.1} color="#4A9AE8" distance={15} />
          <pointLight position={[-10, 3, 0]} intensity={0.1} color="#FF6B9D" distance={15} />
        </>
      )}
    </group>
  );
}