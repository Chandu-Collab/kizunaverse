'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface TwoWheelerProps {
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
  type?: 'scooter' | 'motorcycle';
  moving?: boolean;
  parked?: boolean;
}

export default function TwoWheeler({ 
  position = [0, 0, 0], 
  rotationY = 0, 
  scale = 1,
  type = 'scooter',
  moving = false,
  parked = false
}: TwoWheelerProps) {
  const { isNight } = useTheme();
  const vehicleRef = useRef<THREE.Group>(null);
  
  // Animation for moving vehicles
  useFrame(({ clock }) => {
    if (vehicleRef.current && moving) {
      // Subtle vibration for engine
      vehicleRef.current.rotation.y = rotationY + Math.sin(clock.elapsedTime * 8) * 0.002;
      vehicleRef.current.position.z += Math.sin(clock.elapsedTime * 6) * 0.0005;
    }
  });

  const getVehicleSpecs = () => {
    if (type === 'scooter') {
      return {
        bodyColor: '#4ECDC4',
        length: 1.6,
        height: 0.4,
        seatHeight: 0.6,
        wheelSize: 0.22
      };
    } else {
      return {
        bodyColor: '#2C3E50',
        length: 1.8,
        height: 0.5,
        seatHeight: 0.7,
        wheelSize: 0.28
      };
    }
  };

  const specs = getVehicleSpecs();

  return (
    <group ref={vehicleRef} position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Main body frame */}
      <mesh position={[0, specs.height/2, 0]}>
        <boxGeometry args={[specs.length, specs.height, 0.6]} />
        <meshStandardMaterial 
          color={specs.bodyColor} 
          roughness={0.4} 
          metalness={0.6}
        />
      </mesh>
      
      {/* Fuel tank (for motorcycle) / Storage (for scooter) */}
      {type === 'motorcycle' ? (
        <mesh position={[0.1, specs.height + 0.15, 0]}>
          <boxGeometry args={[0.6, 0.3, 0.5]} />
          <meshStandardMaterial color={specs.bodyColor} metalness={0.7} roughness={0.3} />
        </mesh>
      ) : (
        <mesh position={[-0.3, specs.height + 0.1, 0]}>
          <boxGeometry args={[0.4, 0.2, 0.5]} />
          <meshStandardMaterial color={specs.bodyColor} metalness={0.5} roughness={0.5} />
        </mesh>
      )}
      
      {/* Seat */}
      <mesh position={[-0.2, specs.seatHeight, 0]}>
        <boxGeometry args={[0.8, 0.08, 0.45]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      
      {/* Handlebar */}
      <mesh position={[0.6, specs.seatHeight + 0.3, 0]}>
        <boxGeometry args={[0.02, 0.02, 0.7]} />
        <meshStandardMaterial color="#2C3E50" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Handle grips */}
      <mesh position={[0.6, specs.seatHeight + 0.3, -0.35]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0.6, specs.seatHeight + 0.3, 0.35]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      
      {/* Realistic wheels */}
      {[
        [-specs.length/3, 0, 0], 
        [specs.length/3, 0, 0]
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          {/* Tire with tread pattern */}
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[specs.wheelSize, specs.wheelSize, 0.12, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={1} />
          </mesh>
          
          {/* Rim - different styles for scooter vs motorcycle */}
          <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.05]}>
            <cylinderGeometry 
              args={type === 'scooter' ? [0.15, 0.15, 0.04, 12] : [0.18, 0.18, 0.04, 16]} 
            />
            <meshStandardMaterial 
              color={type === 'scooter' ? "#C0C0C0" : "#2C3E50"} 
              metalness={0.9} 
              roughness={0.1} 
            />
          </mesh>
          
          {/* Brake disc */}
          <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.08]}>
            <cylinderGeometry args={[specs.wheelSize - 0.05, specs.wheelSize - 0.05, 0.01, 24]} />
            <meshStandardMaterial color="#708090" metalness={0.8} roughness={0.3} />
          </mesh>
          
          {/* Spokes for motorcycle */}
          {type === 'motorcycle' && Array.from({ length: 8 }).map((_, spokeIdx) => (
            <mesh 
              key={spokeIdx} 
              position={[0, 0, 0.06]} 
              rotation={[Math.PI/2, 0, (spokeIdx * Math.PI) / 4]}
            >
              <boxGeometry args={[0.01, 0.3, 0.01]} />
              <meshStandardMaterial color="#C0C0C0" metalness={0.9} />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* Headlight */}
      <mesh position={[0.7, specs.height + 0.1, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial 
          color="#FFE4B5" 
          emissive={isNight ? "#FFE4B5" : "#000000"}
          emissiveIntensity={isNight ? 0.6 : 0}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      {/* Tail light */}
      <mesh position={[-0.7, specs.height, 0]}>
        <boxGeometry args={[0.06, 0.08, 0.15]} />
        <meshStandardMaterial 
          color="#FF0000" 
          emissive={isNight ? "#FF0000" : "#000000"}
          emissiveIntensity={isNight ? 0.4 : 0}
        />
      </mesh>
      
      {/* Indicators */}
      <mesh position={[0.6, specs.height, 0.25]}>
        <boxGeometry args={[0.04, 0.04, 0.08]} />
        <meshStandardMaterial color="#FFA500" />
      </mesh>
      <mesh position={[0.6, specs.height, -0.25]}>
        <boxGeometry args={[0.04, 0.04, 0.08]} />
        <meshStandardMaterial color="#FFA500" />
      </mesh>
      
      {/* Engine (for motorcycle) */}
      {type === 'motorcycle' && (
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.4, 0.3, 0.4]} />
          <meshStandardMaterial color="#2C3E50" metalness={0.7} roughness={0.4} />
        </mesh>
      )}
      
      {/* Exhaust pipe */}
      <mesh position={[-0.6, 0.25, type === 'scooter' ? -0.25 : 0.3]}>
        <cylinderGeometry args={[0.04, 0.06, 0.4, 8]} />
        <meshStandardMaterial color="#444444" roughness={0.6} metalness={0.5} />
      </mesh>
      
      {/* License plate */}
      <mesh position={[-0.75, specs.height - 0.1, 0]}>
        <boxGeometry args={[0.01, 0.12, 0.25]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Mirrors */}
      <mesh position={[0.58, specs.seatHeight + 0.32, -0.35]}>
        <boxGeometry args={[0.08, 0.06, 0.02]} />
        <meshStandardMaterial color="#2C3E50" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.58, specs.seatHeight + 0.32, 0.35]}>
        <boxGeometry args={[0.08, 0.06, 0.02]} />
        <meshStandardMaterial color="#2C3E50" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Kickstand (only visible when parked) */}
      {(parked || !moving) && (
        <mesh position={[-0.2, 0.05, -0.35]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.01, 0.01, 0.3, 6]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
      )}
      
      {/* Note: Removed pointLight to prevent WebGL texture unit overflow */}
    </group>
  );
}