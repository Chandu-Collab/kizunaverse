import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';

type FlowerProps = { position: [number, number, number]; color: string };
type LanternProps = { position: [number, number, number]; color?: string; height?: number };
type GlowingMushroomProps = { position: [number, number, number]; size?: number };
type FairyLightProps = { position: [number, number, number]; count?: number; radius?: number };
type LilyPadProps = { position: [number, number, number]; size?: number };
function Flower({ position, color }: FlowerProps) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 1.5 + position[0]) * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(t * 2.5 + position[2]) * 0.02;
    }
  });
  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <cylinderGeometry args={[0.012, 0.018, 0.22, 8]} />
        <meshStandardMaterial color="#32A132" roughness={0.7} />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.07, 0.11, Math.sin(angle) * 0.07]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
      })}
    </group>
  );
}

type BushProps = { position: [number, number, number] };
function Bush({ position }: BushProps) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.7 + position[0]) * 0.07;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.1 + position[2]) * 0.015;
    }
  });
  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial color="#2d6016" />
      </mesh>
      <mesh position={[0.18, 0, 0]}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial color="#3d7026" />
      </mesh>
    </group>
  );
}

// Glowing Lantern for atmospheric lighting
function Lantern({ position, color = '#FFE55C', height = 1.5 }: LanternProps) {
  const lanternRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.Mesh>(null);
  const { isNight } = useTheme();
  
  useFrame(({ clock }) => {
    if (lanternRef.current) {
      const t = clock.getElapsedTime();
      // Simplified animation
      lanternRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.01;
    }
    if (lightRef.current) {
      const intensity = isNight ? 0.7 + Math.sin(clock.getElapsedTime() * 1.5) * 0.2 : 0.3;
      (lightRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });
  
  return (
    <group ref={lanternRef} position={position}>
      {/* Pole */}
      <mesh position={[0, height / 2 - 0.1, 0]}>
        <cylinderGeometry args={[0.02, 0.025, height - 0.2, 8]} />
        <meshStandardMaterial color="#4A4A4A" roughness={0.8} />
      </mesh>
      
      {/* Lantern base */}
      <mesh position={[0, height - 0.15, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.1, 8]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.7} />
      </mesh>
      
      {/* Glass chamber */}
      <mesh position={[0, height - 0.05, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.15, 8]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.3} roughness={0.1} />
      </mesh>
      
      {/* Glowing light */}
      <mesh ref={lightRef} position={[0, height - 0.05, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={isNight ? 0.8 : 0.3}
          transparent 
          opacity={0.9}
        />
      </mesh>
      
      {/* Point light for illumination */}
      {isNight && <pointLight position={[0, height - 0.05, 0]} intensity={0.5} color={color} distance={3} />}
    </group>
  );
}

// Glowing Mushroom for mystical atmosphere
function GlowingMushroom({ position, size = 0.12 }: GlowingMushroomProps) {
  const mushroomRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();
  
  useFrame(({ clock }) => {
    if (mushroomRef.current) {
      const t = clock.getElapsedTime();
      mushroomRef.current.rotation.y = Math.sin(t * 0.3 + position[0]) * 0.05;
      const glowIntensity = isNight ? 0.4 + Math.sin(t * 1.5 + position[2]) * 0.2 : 0;
      mushroomRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.emissiveIntensity = glowIntensity;
        }
      });
    }
  });
  
  return (
    <group ref={mushroomRef} position={position}>
      {/* Stem */}
      <mesh position={[0, size * 0.5, 0]}>
        <cylinderGeometry args={[size * 0.2, size * 0.15, size * 1.2, 8]} />
        <meshStandardMaterial color="#E8E8E8" roughness={0.9} />
      </mesh>
      
      {/* Cap */}
      <mesh position={[0, size * 1.1, 0]}>
        <sphereGeometry args={[size * 0.8, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color="#FF6B9D" 
          emissive={isNight ? "#FF6B9D" : "#000000"} 
          emissiveIntensity={isNight ? 0.4 : 0}
          roughness={0.6}
        />
      </mesh>
      
      {/* Glowing spots */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} position={[
            Math.cos(angle) * size * 0.4,
            size * 1.1,
            Math.sin(angle) * size * 0.4
          ]}>
            <sphereGeometry args={[size * 0.15, 8, 8]} />
            <meshStandardMaterial 
              color="#98E4FF" 
              emissive={isNight ? "#98E4FF" : "#000000"} 
              emissiveIntensity={isNight ? 0.6 : 0}
              transparent 
              opacity={0.8}
            />
          </mesh>
        );
      })}
      
      {/* Ambient light for mushroom */}
      {isNight && <pointLight position={[0, size * 1.1, 0]} intensity={0.3} color="#FF6B9D" distance={1.5} />}
    </group>
  );
}

// Fairy Light String for magical ambiance
function FairyLights({ position, count = 8, radius = 2 }: FairyLightProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Simplified rotation animation
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const lightColors = ['#FFE55C', '#98E4FF', '#FF6B9D', '#A084E8', '#6BCB77'];
        const color = lightColors[i % lightColors.length];
        const height = 0.5 + Math.sin(angle * 2) * 0.3;
        
        return (
          <group key={i}>
            {/* Light position */}
            <mesh position={[
              Math.cos(angle) * radius,
              height,
              Math.sin(angle) * radius
            ]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial 
                color={color} 
                emissive={color} 
                emissiveIntensity={isNight ? 0.8 : 0.2}
                transparent 
                opacity={0.9}
              />
            </mesh>
            
            {/* Individual point lights */}
            {isNight && (
              <pointLight 
                position={[
                  Math.cos(angle) * radius,
                  height,
                  Math.sin(angle) * radius
                ]} 
                intensity={0.2} 
                color={color} 
                distance={1.2} 
              />
            )}
          </group>
        );
      })}
    </group>
  );
}

// Lily Pad with bioluminescent effect for lake
function LilyPad({ position, size = 0.3 }: LilyPadProps) {
  const padRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();
  
  useFrame(({ clock }) => {
    if (padRef.current) {
      const t = clock.getElapsedTime();
      padRef.current.position.y = position[1] + Math.sin(t * 0.8 + position[0] + position[2]) * 0.02;
      padRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
    }
  });
  
  return (
    <group ref={padRef} position={position}>
      {/* Lily pad */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[size, 16]} />
        <meshStandardMaterial 
          color="#2d6016" 
          emissive={isNight ? "#0a3a0a" : "#000000"} 
          emissiveIntensity={isNight ? 0.3 : 0}
          roughness={0.8}
        />
      </mesh>
      
      {/* Bioluminescent edges */}
      {isNight && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 0.8, size, 16]} />
          <meshStandardMaterial 
            color="#6BCB77" 
            emissive="#6BCB77" 
            emissiveIntensity={0.5}
            transparent 
            opacity={0.6}
          />
        </mesh>
      )}
      
      {/* Small lily flower */}
      <mesh position={[0, 0.02, 0]}>
        <sphereGeometry args={[size * 0.2, 8, 8]} />
        <meshStandardMaterial 
          color="#FFB6E1" 
          emissive={isNight ? "#FFB6E1" : "#000000"} 
          emissiveIntensity={isNight ? 0.4 : 0}
        />
      </mesh>
    </group>
  );
}

type GardenDecorProps = {
  position?: [number, number, number];
};

export default function GardenDecor({ position = [0, 0, 0] }: GardenDecorProps) {
  const flowerColors = ['#FF6B9D', '#FFD93D', '#98E4FF', '#FFB6E1', '#A084E8'];
  const { isNight } = useTheme();
  
  return (
    <group position={position}>
      {/* Original flowers and bushes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Flower key={i} position={[-4 + i, 0.01, 7 + Math.sin(i) * 2]} color={flowerColors[i % flowerColors.length]} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <Bush key={i} position={[-3 + i * 2, 0.01, 9 + Math.cos(i) * 2]} />
      ))}
      
      {/* Atmospheric Lanterns - reduced count */}
      <Lantern position={[-2, 0, 8]} color="#FFE55C" height={1.6} />
      <Lantern position={[2, 0, 10]} color="#FF6B9D" height={1.7} />
      
      {/* Glowing Mushrooms - reduced count */}
      <GlowingMushroom position={[-1.5, 0.01, 9.5]} size={0.12} />
      <GlowingMushroom position={[1.8, 0.01, 10.2]} size={0.14} />
      
      {/* Fairy Light String - single optimized set */}
      <FairyLights position={[0, 0.5, 9]} count={6} radius={2.0} />
      
      {/* Lily Pads for lake areas (if positioned near water) */}
      {position[2] > 10 && (
        <>
          <LilyPad position={[-1.5, 0.05, 2]} size={0.25} />
          <LilyPad position={[2, 0.05, 1.5]} size={0.3} />
          <LilyPad position={[0.5, 0.05, 3]} size={0.28} />
          <LilyPad position={[-0.8, 0.05, 2.8]} size={0.22} />
          <LilyPad position={[1.8, 0.05, 2.5]} size={0.35} />
        </>
      )}
      
      {/* Removed floating orbs for performance */}
    </group>
  );
}
