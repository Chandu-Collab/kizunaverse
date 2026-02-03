'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface BMTCBusProps {
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
  moving?: boolean;
}

export default function BMTCBus({ 
  position = [0, 0, 0], 
  rotationY = 0, 
  scale = 1,
  moving = false 
}: BMTCBusProps) {
  const { isNight } = useTheme();
  const busRef = useRef<THREE.Group>(null);
  const [currentSpeed] = useState(0.02);
  const [engineSound] = useState(false);
  
  // Realistic bus animation
  useFrame(({ clock }) => {
    if (busRef.current && moving) {
      // Gentle rocking motion
      busRef.current.rotation.z = Math.sin(clock.elapsedTime * 2) * 0.005;
      // Slight forward/backward movement
      busRef.current.position.z += Math.sin(clock.elapsedTime * 3) * 0.001;
    }
  });

  return (
    <group ref={busRef} position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Main chassis with realistic proportions */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[4.2, 1.4, 2.1]} />
        <meshStandardMaterial 
          color="#FF5722" 
          roughness={0.8} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Driver cabin */}
      <mesh position={[1.8, 1.1, 0]}>
        <boxGeometry args={[0.8, 0.6, 2.1]} />
        <meshStandardMaterial color="#FF5722" roughness={0.8} />
      </mesh>
      
      {/* Realistic windshield */}
      <mesh position={[2.15, 1.1, 0]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.02, 0.5, 1.8]} />
        <meshStandardMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.3}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      {/* Side windows - passenger area */}
      {Array.from({ length: 6 }).map((_, i) => (
        <group key={i}>
          <mesh position={[1.2 - i * 0.6, 1, 1.06]}>
            <boxGeometry args={[0.5, 0.4, 0.02]} />
            <meshStandardMaterial 
              color={isNight && (i + 1) % 3 === 0 ? "#FFE4B5" : "#B0E0E6"} 
              transparent 
              opacity={0.7}
              emissive={isNight && (i + 1) % 3 === 0 ? "#FFA500" : "#000000"}
              emissiveIntensity={isNight ? 0.2 : 0}
            />
          </mesh>
          <mesh position={[1.2 - i * 0.6, 1, -1.06]}>
            <boxGeometry args={[0.5, 0.4, 0.02]} />
            <meshStandardMaterial 
              color={isNight && i % 3 === 0 ? "#FFE4B5" : "#B0E0E6"} 
              transparent 
              opacity={0.7}
              emissive={isNight && i % 3 === 0 ? "#FFA500" : "#000000"}
              emissiveIntensity={isNight ? 0.2 : 0}
            />
          </mesh>
        </group>
      ))}
      
      {/* BMTC Branding */}
      <mesh position={[0, 1.2, 1.07]}>
        <boxGeometry args={[3, 0.4, 0.01]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Route number display */}
      <mesh position={[1.8, 1.4, 1.07]}>
        <boxGeometry args={[0.6, 0.3, 0.01]} />
        <meshStandardMaterial 
          color="#000000"
          emissive={isNight ? "#00FF00" : "#000000"}
          emissiveIntensity={isNight ? 0.3 : 0}
        />
      </mesh>
      
      {/* Realistic wheels with detailed rims */}
      {[
        [-1.5, 0, -1], [1.5, 0, -1], 
        [-1.5, 0, 1], [1.5, 0, 1]
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          {/* Tire */}
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.1]}>
            <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Hub */}
          <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.13]}>
            <cylinderGeometry args={[0.1, 0.1, 0.02, 8]} />
            <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}
      
      {/* Front and rear lights */}
      <mesh position={[2.2, 0.5, -0.7]}>
        <boxGeometry args={[0.05, 0.2, 0.4]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive={isNight ? "#FFD700" : "#000000"}
          emissiveIntensity={isNight ? 0.6 : 0}
        />
      </mesh>
      
      <mesh position={[2.2, 0.5, 0.7]}>
        <boxGeometry args={[0.05, 0.2, 0.4]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive={isNight ? "#FFD700" : "#000000"}
          emissiveIntensity={isNight ? 0.6 : 0}
        />
      </mesh>
      
      <mesh position={[-2.2, 0.7, 0]}>
        <boxGeometry args={[0.05, 0.4, 1.2]} />
        <meshStandardMaterial 
          color="#FF0000" 
          emissive={isNight ? "#FF0000" : "#000000"}
          emissiveIntensity={isNight ? 0.4 : 0}
        />
      </mesh>
      
      {/* Exhaust pipe */}
      <mesh position={[-2.1, 0.3, -0.8]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
        <meshStandardMaterial color="#444444" roughness={0.7} />
      </mesh>
      
      {/* Front grille */}
      <mesh position={[2.15, 0.6, 0]}>
        <boxGeometry args={[0.02, 0.4, 1.5]} />
        <meshStandardMaterial color="#2C3E50" metalness={0.5} />
      </mesh>
      
      {/* Side mirrors */}
      <mesh position={[1.9, 1.3, 1.2]}>
        <boxGeometry args={[0.1, 0.08, 0.15]} />
        <meshStandardMaterial color="#2C3E50" metalness={0.8} />
      </mesh>
      <mesh position={[1.9, 1.3, -1.2]}>
        <boxGeometry args={[0.1, 0.08, 0.15]} />
        <meshStandardMaterial color="#2C3E50" metalness={0.8} />
      </mesh>
      
      {/* Destination board */}
      <mesh position={[2.1, 1.6, 0]}>
        <boxGeometry args={[0.01, 0.2, 1.8]} />
        <meshStandardMaterial 
          color="#000000"
          emissive={isNight ? "#00FF00" : "#000000"}
          emissiveIntensity={isNight ? 0.2 : 0}
        />
      </mesh>
      
      {/* Interior lighting */}
      {isNight && (
        <>
          <pointLight 
            position={[0, 1.2, 0]} 
            intensity={0.3} 
            color="#FFE4B5" 
            distance={3} 
          />
          <pointLight 
            position={[1.8, 1.2, 0]} 
            intensity={0.2} 
            color="#FFFFFF" 
            distance={2} 
          />
        </>
      )}
    </group>
  );
}