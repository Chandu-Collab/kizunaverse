'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface ShoppingMallProps {
  position?: [number, number, number];
  scale?: number;
  name?: string;
  color?: string;
  type?: 'forum' | 'phoenix' | 'generic';
}

export default function ShoppingMall({ 
  position = [0, 0, 0], 
  scale = 1, 
  name = "Shopping Mall",
  color = "#4A90E2",
  type = 'generic'
}: ShoppingMallProps) {
  const { isNight } = useTheme();
  const mallRef = useRef<THREE.Group>(null);
  
  // Subtle animation for mall signage
  useFrame(({ clock }) => {
    if (mallRef.current && isNight) {
      // Pulsing lights effect
      const signage = mallRef.current.children.find(child => child.userData.isSignage);
      if (signage && 'material' in signage) {
        const material = signage.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 0.4 + Math.sin(clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  const getMallSpecs = () => {
    switch (type) {
      case 'forum':
        return {
          mainColor: '#4A90E2',
          accentColor: '#FFD700',
          width: 5,
          height: 3.5,
          depth: 4
        };
      case 'phoenix':
        return {
          mainColor: '#E74C3C',
          accentColor: '#FFA500',
          width: 6,
          height: 4,
          depth: 5
        };
      default:
        return {
          mainColor: color,
          accentColor: '#FFD700',
          width: 4.5,
          height: 3,
          depth: 3.5
        };
    }
  };

  const specs = getMallSpecs();

  return (
    <group ref={mallRef} position={position} scale={scale}>
      {/* Main mall structure with modern architecture */}
      <mesh position={[0, specs.height/2, 0]}>
        <boxGeometry args={[specs.width, specs.height, specs.depth]} />
        <meshStandardMaterial 
          color={specs.mainColor} 
          metalness={0.3} 
          roughness={0.4} 
        />
      </mesh>
      
      {/* Glass curtain wall entrance */}
      <mesh position={[0, specs.height/2, specs.depth/2 + 0.01]}>
        <boxGeometry args={[specs.width * 0.8, specs.height * 0.8, 0.02]} />
        <meshStandardMaterial 
          color="#B0E0E6" 
          transparent 
          opacity={0.6}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>
      
      {/* Mall entrance doors */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[-1.5 + i, specs.height * 0.3, specs.depth/2 + 0.02]}>
          <boxGeometry args={[0.8, specs.height * 0.6, 0.01]} />
          <meshStandardMaterial 
            color="#87CEEB" 
            transparent 
            opacity={0.4}
            metalness={0.8}
          />
        </mesh>
      ))}
      
      {/* Mall signage with dynamic lighting */}
      <mesh 
        position={[0, specs.height * 0.85, specs.depth/2 + 0.03]}
        userData={{ isSignage: true }}
      >
        <boxGeometry args={[specs.width * 0.7, 0.5, 0.02]} />
        <meshStandardMaterial 
          color={specs.accentColor} 
          emissive={isNight ? specs.accentColor : "#000000"}
          emissiveIntensity={isNight ? 0.5 : 0}
        />
      </mesh>
      
      {/* Side wings for larger malls */}
      {type === 'phoenix' && (
        <>
          <mesh position={[-4, specs.height/2 - 0.3, 0]}>
            <boxGeometry args={[2.5, specs.height - 0.6, specs.depth - 1]} />
            <meshStandardMaterial color={specs.mainColor} metalness={0.2} roughness={0.6} />
          </mesh>
          <mesh position={[4, specs.height/2 - 0.3, 0]}>
            <boxGeometry args={[2.5, specs.height - 0.6, specs.depth - 1]} />
            <meshStandardMaterial color={specs.mainColor} metalness={0.2} roughness={0.6} />
          </mesh>
        </>
      )}
      
      {/* Parking structure */}
      <mesh position={[0, 0.02, -specs.depth - 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[specs.width + 4, 6]} />
        <meshStandardMaterial color="#606060" roughness={0.8} />
      </mesh>
      
      {/* Parking lines and spaces */}
      {Array.from({ length: Math.floor(specs.width + 2) }).map((_, row) => 
        Array.from({ length: 8 }).map((_, col) => (
          <mesh 
            key={`${row}-${col}`} 
            position={[-specs.width/2 + row * 1.2, 0.03, -specs.depth - 4.5 + col * 0.8]} 
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.08, 2.3]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        ))
      )}
      
      {/* Food court extension */}
      <mesh position={[specs.width/2 + 1.5, 1.2, 2]}>
        <boxGeometry args={[2, 2.4, 2]} />
        <meshStandardMaterial color="#FF6B35" roughness={0.6} />
      </mesh>
      
      {/* Food court canopy */}
      <mesh position={[specs.width/2 + 1.5, 2.6, 3.2]} rotation={[Math.PI/8, 0, 0]}>
        <boxGeometry args={[2.2, 0.1, 2]} />
        <meshStandardMaterial color="#FF8C42" roughness={0.5} />
      </mesh>
      
      {/* Multiplex cinema (for larger malls) */}
      {type !== 'generic' && (
        <mesh position={[-specs.width/2 - 1.5, specs.height/2 - 0.2, 0]}>
          <boxGeometry args={[2, specs.height - 0.4, specs.depth - 0.5]} />
          <meshStandardMaterial color="#2C3E50" metalness={0.4} roughness={0.5} />
        </mesh>
      )}
      
      {/* Landscaping around mall */}
      <mesh position={[0, 0.02, specs.depth + 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3, 12]} />
        <meshStandardMaterial color="#90EE90" roughness={0.9} />
      </mesh>
      
      {/* Decorative palm trees */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 2.5;
        return (
          <group key={i} position={[
            Math.cos(angle) * radius,
            0,
            specs.depth + 2 + Math.sin(angle) * radius
          ]}>
            <mesh position={[0, 1.2, 0]}>
              <cylinderGeometry args={[0.12, 0.15, 2.4, 8]} />
              <meshStandardMaterial color="#8B4513" roughness={0.9} />
            </mesh>
            <mesh position={[0, 2.6, 0]}>
              <sphereGeometry args={[0.5, 8, 8]} />
              <meshStandardMaterial color={isNight ? "#2F4F2F" : "#228B22"} roughness={0.8} />
            </mesh>
            {/* Palm fronds */}
            {Array.from({ length: 8 }).map((_, frondIdx) => (
              <mesh 
                key={frondIdx} 
                position={[
                  Math.cos(frondIdx * Math.PI / 4) * 0.3,
                  2.8 + Math.sin(frondIdx * Math.PI / 4) * 0.1,
                  Math.sin(frondIdx * Math.PI / 4) * 0.3
                ]}
                rotation={[
                  Math.random() * 0.3 - 0.15,
                  frondIdx * Math.PI / 4,
                  Math.random() * 0.2 - 0.1
                ]}
              >
                <boxGeometry args={[0.8, 0.02, 0.15]} />
                <meshStandardMaterial color={isNight ? "#2F4F2F" : "#228B22"} />
              </mesh>
            ))}
          </group>
        );
      })}
      
      {/* Mall entrance plaza */}
      <mesh position={[0, 0.02, specs.depth + 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[specs.width + 2, 1.2]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.9} />
      </mesh>
      
      {/* Modern street lighting for mall */}
      {Array.from({ length: 8 }).map((_, i) => {
        const positions = [
          [-3, 0, specs.depth + 1], [3, 0, specs.depth + 1],
          [-4, 0, -specs.depth - 1], [4, 0, -specs.depth - 1],
          [-6, 0, 0], [6, 0, 0],
          [0, 0, -specs.depth - 3], [0, 0, specs.depth + 4]
        ];
        
        return (
          <group key={i} position={positions[i] as [number, number, number]}>
            <mesh position={[0, 2.5, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 5, 8]} />
              <meshStandardMaterial color="#444444" metalness={0.6} />
            </mesh>
            <mesh position={[0, 5.2, 0]}>
              <boxGeometry args={[0.6, 0.3, 0.6]} />
              <meshStandardMaterial 
                color="#FFE4B5"
                emissive={isNight ? "#FFE4B5" : "#000000"}
                emissiveIntensity={isNight ? 0.7 : 0}
              />
            </mesh>
            {isNight && (
              <pointLight 
                position={[0, 5.2, 0]} 
                intensity={0.9} 
                color="#FFE4B5" 
                distance={12}
              />
            )}
          </group>
        );
      })}
      
      {/* Mall interior lighting effects */}
      {isNight && (
        <>
          <pointLight position={[0, specs.height/2, 0]} intensity={0.5} color="#F0F8FF" distance={10} />
          <pointLight position={[-specs.width/4, specs.height/2, 0]} intensity={0.4} color="#FFE4B5" distance={8} />
          <pointLight position={[specs.width/4, specs.height/2, 0]} intensity={0.4} color="#FFE4B5" distance={8} />
        </>
      )}
    </group>
  );
}