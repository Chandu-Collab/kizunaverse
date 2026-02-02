import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

// Floating Fireflies for magical lake atmosphere
function Firefly({ position, color = '#B6FF00' }: { position: [number, number, number]; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [targetPosition] = useState<[number, number, number]>([
    position[0] + (Math.random() - 0.5) * 4,
    position[1] + (Math.random() - 0.5) * 2,
    position[2] + (Math.random() - 0.5) * 4,
  ]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      const speed = 0.5;
      
      // Move towards target with some oscillation
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        targetPosition[0] + Math.sin(t * speed + position[0]) * 0.5,
        0.02
      );
      meshRef.current.position.y = position[1] + Math.sin(t * speed * 1.2 + position[1]) * 0.8;
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        targetPosition[2] + Math.cos(t * speed + position[2]) * 0.5,
        0.02
      );

      // Pulsing glow effect
      const intensity = 0.6 + Math.sin(t * 3 + position[0] + position[2]) * 0.4;
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.8}
        />
      </mesh>
      <pointLight 
        position={position} 
        intensity={0.2} 
        color={color} 
        distance={1.5} 
      />
    </group>
  );
}

// Lakeside Torch for dramatic lighting
function LakesideTorch({ position, flameColor = '#FF4500' }: { position: [number, number, number]; flameColor?: string }) {
  const flameRef = useRef<THREE.Mesh>(null);
  const { isNight } = useTheme();

  useFrame(({ clock }) => {
    if (flameRef.current) {
      const t = clock.getElapsedTime();
      // Flickering flame effect
      flameRef.current.scale.y = 1 + Math.sin(t * 8 + position[0]) * 0.2;
      flameRef.current.scale.x = 1 + Math.sin(t * 6 + position[2]) * 0.15;
      flameRef.current.position.y = position[1] + 2.2 + Math.sin(t * 5) * 0.05;
      
      // Flickering intensity
      const intensity = isNight ? 0.8 + Math.sin(t * 10) * 0.3 : 0.4;
      (flameRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  return (
    <group position={position}>
      {/* Torch pole */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 2, 8]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.9} />
      </mesh>
      
      {/* Torch holder */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.15, 8]} />
        <meshStandardMaterial color="#4A4A4A" roughness={0.8} />
      </mesh>
      
      {/* Flame */}
      <mesh ref={flameRef} position={[0, 2.2, 0]}>
        <coneGeometry args={[0.06, 0.25, 8, 4]} />
        <meshStandardMaterial 
          color={flameColor}
          emissive={flameColor}
          emissiveIntensity={isNight ? 0.8 : 0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Point light for illumination */}
      {isNight && (
        <pointLight 
          position={[0, 2.2, 0]} 
          intensity={1.2} 
          color={flameColor} 
          distance={5}
          decay={2}
        />
      )}
    </group>
  );
}

// Glowing Water Lily
function WaterLily({ position, glowColor = '#FFB6E1' }: { position: [number, number, number]; glowColor?: string }) {
  const lilyRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();

  useFrame(({ clock }) => {
    if (lilyRef.current) {
      const t = clock.getElapsedTime();
      lilyRef.current.position.y = position[1] + Math.sin(t * 0.6 + position[0] + position[2]) * 0.03;
      lilyRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group ref={lilyRef} position={position}>
      {/* Lily pad */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[0.4, 20]} />
        <meshStandardMaterial 
          color="#2d6016"
          emissive={isNight ? "#0a2a0a" : "#000000"}
          emissiveIntensity={isNight ? 0.2 : 0}
          roughness={0.8}
        />
      </mesh>
      
      {/* Flower petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.15,
              0.05,
              Math.sin(angle) * 0.15,
            ]}
            rotation={[Math.PI / 6, angle, 0]}
          >
            <cylinderGeometry args={[0.04, 0.02, 0.2, 8]} />
            <meshStandardMaterial 
              color={glowColor}
              emissive={isNight ? glowColor : "#000000"}
              emissiveIntensity={isNight ? 0.5 : 0}
              roughness={0.3}
            />
          </mesh>
        );
      })}
      
      {/* Center */}
      <mesh position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial 
          color="#FFD93D"
          emissive={isNight ? "#FFD93D" : "#000000"}
          emissiveIntensity={isNight ? 0.6 : 0}
        />
      </mesh>
      
      {/* Soft ambient light */}
      {isNight && (
        <pointLight 
          position={[0, 0.1, 0]} 
          intensity={0.4} 
          color={glowColor} 
          distance={2} 
        />
      )}
    </group>
  );
}

// Main Lake Decoration Component
export default function LakeDecoration() {
  const { isNight } = useTheme();
  
  return (
    <group>
      {/* Lakeside Torches - positioned at lake corners for visibility */}
      <LakesideTorch position={[-3, 0, -7]} flameColor="#FF4500" />
      <LakesideTorch position={[3, 0, -7]} flameColor="#FF6B00" />
      
      {/* Corner lights to define lake boundaries */}
      <LakesideTorch position={[-4, 0, -5]} flameColor="#FFB84D" />
      <LakesideTorch position={[4, 0, -5]} flameColor="#FF8C00" />
      <LakesideTorch position={[-4, 0, -11]} flameColor="#FF4500" />
      <LakesideTorch position={[4, 0, -11]} flameColor="#FF6B00" />
      <LakesideTorch position={[0, 0, -13]} flameColor="#FFB84D" />
      <LakesideTorch position={[0, 0, -3]} flameColor="#FF8C00" />
      
      {/* Water Lilies - reduced count */}
      <WaterLily position={[-1, 0.12, -7]} glowColor="#FFB6E1" />
      <WaterLily position={[1.5, 0.12, -8]} glowColor="#98E4FF" />
      
      {/* Lake corner markers for visibility */}
      <group>
        {/* Corner glowing stones */}
        <mesh position={[-4.5, 0.05, -4.5]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial 
            color="#FFE55C" 
            emissive={isNight ? "#FFE55C" : "#000000"} 
            emissiveIntensity={isNight ? 0.6 : 0}
          />
        </mesh>
        <mesh position={[4.5, 0.05, -4.5]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial 
            color="#FF6B9D" 
            emissive={isNight ? "#FF6B9D" : "#000000"} 
            emissiveIntensity={isNight ? 0.6 : 0}
          />
        </mesh>
        <mesh position={[-4.5, 0.05, -11.5]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial 
            color="#98E4FF" 
            emissive={isNight ? "#98E4FF" : "#000000"} 
            emissiveIntensity={isNight ? 0.6 : 0}
          />
        </mesh>
        <mesh position={[4.5, 0.05, -11.5]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial 
            color="#A084E8" 
            emissive={isNight ? "#A084E8" : "#000000"} 
            emissiveIntensity={isNight ? 0.6 : 0}
          />
        </mesh>
      </group>
      
      {/* Fireflies - reduced for performance */}
      {isNight && (
        <>
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 4 + Math.random() * 2;
            const height = 1.5 + Math.random() * 1;
            const colors = ['#B6FF00', '#98E4FF'];
            
            return (
              <Firefly
                key={i}
                position={[
                  Math.cos(angle) * radius,
                  height,
                  -8 + Math.sin(angle) * radius * 0.4,
                ]}
                color={colors[i % colors.length]}
              />
            );
          })}
        </>
      )}
      
      {/* Lake perimeter lighting for visibility */}
      {isNight && (
        <>
          {/* Corner perimeter lights */}
          <pointLight position={[-5, 1, -5]} intensity={0.4} color="#FF8C00" distance={4} />
          <pointLight position={[5, 1, -5]} intensity={0.4} color="#FFB84D" distance={4} />
          <pointLight position={[-5, 1, -11]} intensity={0.4} color="#FF4500" distance={4} />
          <pointLight position={[5, 1, -11]} intensity={0.4} color="#FF6B00" distance={4} />
          <pointLight position={[0, 1, -13]} intensity={0.4} color="#FFB84D" distance={4} />
          <pointLight position={[0, 1, -3]} intensity={0.4} color="#FF8C00" distance={4} />
          
          {/* Central lake illumination */}
          <pointLight position={[0, 0.5, -8]} intensity={0.6} color="#4A9AE8" distance={8} />
        </>
      )}
    </group>
  );
}