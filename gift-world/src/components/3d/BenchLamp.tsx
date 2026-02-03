import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/hooks/useTheme';

export function Bench({ position = [0, 0, 0] }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + (hovered ? 0.08 : 0);
    }
  });
  return (
    <group ref={groupRef} position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      >
      {/* Seat */}
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[0.7, 0.08, 0.22]} />
        <meshStandardMaterial color="#C19A6B" />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.28, -0.09]}>
        <boxGeometry args={[0.7, 0.08, 0.06]} />
        <meshStandardMaterial color="#A67B5B" />
      </mesh>
      {/* Legs */}
      {[-0.28, 0.28].map((x, i) => (
        <mesh key={i} position={[x, 0.09, 0.09]}>
          <boxGeometry args={[0.08, 0.18, 0.08]} />
          <meshStandardMaterial color="#8B5C2A" />
        </mesh>
      ))}
    </group>
  );
}

export function LampPost({ position = [0, 0, 0] }) {
  const lampRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { isNight } = useTheme();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (lampRef.current && isNight) {
      // Enhanced lighting effects
      const baseIntensity = hovered ? 1.2 : 0.9;
      const flicker = Math.sin(t * 8 + position[0] + position[2]) * 0.1;
      lampRef.current.material.emissiveIntensity = baseIntensity + flicker;
      lampRef.current.scale.setScalar(hovered ? 1.15 : 1);
    }
    
    if (glowRef.current && isNight) {
      // Soft glow effect
      const glowIntensity = 0.3 + Math.sin(t * 2 + position[1]) * 0.1;
      glowRef.current.material.opacity = glowIntensity;
      glowRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.1);
    }
  });
  
  return (
    <group position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Enhanced Pole with details */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 1.2, 16]} />
        <meshStandardMaterial color="#333" roughness={0.8} metalness={0.2} />
      </mesh>
      
      {/* Decorative rings on pole */}
      <mesh position={[0, 0.3, 0]}>
        <torusGeometry args={[0.06, 0.01, 8, 16]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <torusGeometry args={[0.06, 0.01, 8, 16]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      
      {/* Lamp housing */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.12, 0.08, 0.15, 8]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.7} />
      </mesh>
      
      {/* Main lamp - lit only at night */}
      <mesh ref={lampRef} position={[0, 1.22, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial 
          color={isNight ? "#FFD700" : "#444"} 
          emissive={isNight ? "#FFD700" : "#000000"} 
          emissiveIntensity={isNight ? 0.9 : 0}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Soft glow effect around lamp - only at night */}
      {isNight && (
        <mesh ref={glowRef} position={[0, 1.22, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color="#FFE55C" 
            transparent 
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
      )}
      
      {/* Point light for illumination - only at night */}
      {isNight && (
        <pointLight 
          position={[0, 1.22, 0]} 
          intensity={hovered ? 1.8 : 1.2} 
          color="#FFD700" 
          distance={6}
          decay={2}
        />
      )}
      
      {/* Ground illumination circle - only at night */}
      {isNight && (
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1.5, 16]} />
          <meshStandardMaterial 
            color="#FFE55C" 
            transparent 
            opacity={hovered ? 0.15 : 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}
