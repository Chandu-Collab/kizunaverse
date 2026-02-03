'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface ModernITParkProps {
  position?: [number, number, number];
  scale?: number;
  name?: string;
  companyLogos?: string[];
}

export default function ModernITPark({ 
  position = [0, 0, 0], 
  scale = 1, 
  name = "IT Park",
  companyLogos = ['TCS', 'Infosys', 'Wipro'] 
}: ModernITParkProps) {
  const { isNight } = useTheme();
  const buildingRef = useRef<THREE.Group>(null);
  
  // Subtle building sway animation
  useFrame(({ clock }) => {
    if (buildingRef.current) {
      buildingRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.001;
      buildingRef.current.rotation.z = Math.cos(clock.elapsedTime * 0.2) * 0.001;
    }
  });

  return (
    <group ref={buildingRef} position={position} scale={scale}>
      {/* Main glass tower - realistic proportions */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[2.5, 5, 2]} />
        <meshStandardMaterial 
          color="#2C5282" 
          metalness={0.9} 
          roughness={0.05}
          transparent 
          opacity={0.85}
        />
      </mesh>
      
      {/* Glass curtain wall facade */}
      <mesh position={[0, 2.5, 1.01]}>
        <boxGeometry args={[2.48, 4.98, 0.02]} />
        <meshStandardMaterial 
          color="#B0E0E6"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.95}
          envMapIntensity={2}
        />
      </mesh>
      
      {/* Individual floor windows with office lighting */}
      {Array.from({ length: 12 }).map((_, floor) => 
        Array.from({ length: 4 }).map((_, window) => (
          <mesh 
            key={`${floor}-${window}`} 
            position={[-0.9 + window * 0.6, 0.8 + floor * 0.35, 1.02]}
          >
            <boxGeometry args={[0.45, 0.25, 0.01]} />
            <meshStandardMaterial 
              color={
                isNight && Math.random() > 0.4 
                  ? (Math.random() > 0.7 ? '#FFE4B5' : '#F0F8FF') 
                  : '#B0E0E6'
              }
              emissive={
                isNight && Math.random() > 0.4 
                  ? (Math.random() > 0.7 ? '#FFA500' : '#4169E1') 
                  : '#000000'
              }
              emissiveIntensity={isNight ? 0.3 : 0}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))
      )}
      
      {/* Building structure frame */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[-1 + i * 0.5, 2.5, 1.02]} >
          <boxGeometry args={[0.05, 5, 0.01]} />
          <meshStandardMaterial color="#2C3E50" metalness={0.8} />
        </mesh>
      ))}
      
      {/* Horizontal floor dividers */}
      {Array.from({ length: 13 }).map((_, i) => (
        <mesh key={i} position={[0, 0.65 + i * 0.35, 1.02]} >
          <boxGeometry args={[2.5, 0.03, 0.01]} />
          <meshStandardMaterial color="#34495E" metalness={0.7} />
        </mesh>
      ))}
      
      {/* Adjacent office buildings */}
      <mesh position={[-4, 1.8, 0]}>
        <boxGeometry args={[2, 3.6, 1.8]} />
        <meshStandardMaterial color="#4A5568" metalness={0.7} roughness={0.2} />
      </mesh>
      
      <mesh position={[4, 2.2, 0]}>
        <boxGeometry args={[1.8, 4.4, 1.6]} />
        <meshStandardMaterial color="#2D3748" metalness={0.8} roughness={0.1} />
      </mesh>
      
      {/* Company logos and branding */}
      <mesh position={[0, 5.2, 1.02]}>
        <boxGeometry args={[2, 0.5, 0.01]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive={isNight ? "#FFD700" : "#000000"}
          emissiveIntensity={isNight ? 0.4 : 0}
        />
      </mesh>
      
      {/* Rooftop elements */}
      {/* Cooling units */}
      <mesh position={[-0.8, 5.3, -0.5]}>
        <boxGeometry args={[0.6, 0.3, 0.8]} />
        <meshStandardMaterial color="#708090" roughness={0.7} />
      </mesh>
      <mesh position={[0.8, 5.3, -0.5]}>
        <boxGeometry args={[0.6, 0.3, 0.8]} />
        <meshStandardMaterial color="#708090" roughness={0.7} />
      </mesh>
      
      {/* Satellite dishes */}
      <mesh position={[0, 5.5, 0.5]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} />
      </mesh>
      
      {/* Entrance canopy with modern design */}
      <mesh position={[0, 0.4, 2.2]} rotation={[Math.PI/12, 0, 0]}>
        <boxGeometry args={[3, 0.08, 1.2]} />
        <meshStandardMaterial color="#4A5568" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Glass entrance doors */}
      <mesh position={[0, 1, 1.8]}>
        <boxGeometry args={[1.5, 2, 0.02]} />
        <meshStandardMaterial 
          color="#B0E0E6" 
          transparent 
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Modern landscaping */}
      <mesh position={[0, 0.02, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.5, 16]} />
        <meshStandardMaterial color="#228B22" roughness={0.9} />
      </mesh>
      
      {/* Landscaping trees with realistic placement */}
      {[
        [-2, 0, 3.8], [2, 0, 3.8], [0, 0, 5.5],
        [-1.5, 0, 2.5], [1.5, 0, 2.5]
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.8, 8]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <sphereGeometry args={[0.4, 12, 12]} />
            <meshStandardMaterial color={isNight ? "#2F4F2F" : "#228B22"} roughness={0.8} />
          </mesh>
        </group>
      ))}
      
      {/* Parking area with realistic layout */}
      <mesh position={[6, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 8]} />
        <meshStandardMaterial color="#5A5A5A" roughness={0.8} />
      </mesh>
      
      {/* Parking lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[6, 0.02, -3.5 + i * 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.1, 2.5]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      ))}
      
      {/* Security booth */}
      <mesh position={[3, 0.8, 2]}>
        <boxGeometry args={[1, 1.6, 1]} />
        <meshStandardMaterial color="#4A5568" />
      </mesh>
      
      {/* Modern outdoor lighting */}
      {[
        [-3, 0, 3], [3, 0, 3], [0, 0, 6],
        [5, 0, -2], [5, 0, 2]
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 4, 8]} />
            <meshStandardMaterial color="#444444" metalness={0.5} />
          </mesh>
          <mesh position={[0, 4.2, 0]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial 
              color="#FFE4B5"
              emissive={isNight ? "#FFE4B5" : "#000000"}
              emissiveIntensity={isNight ? 0.6 : 0}
            />
          </mesh>
          {isNight && (
            <pointLight 
              position={[0, 4.2, 0]} 
              intensity={0.8} 
              color="#FFE4B5" 
              distance={10}
            />
          )}
        </group>
      ))}
      
      {/* Office interior lighting effects */}
      {isNight && (
        <>
          <pointLight position={[0, 3, 0]} intensity={0.4} color="#F0F8FF" distance={8} />
          <pointLight position={[-1, 2, 0]} intensity={0.3} color="#FFE4B5" distance={6} />
          <pointLight position={[1, 4, 0]} intensity={0.3} color="#FFE4B5" distance={6} />
        </>
      )}
    </group>
  );
}