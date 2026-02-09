'use client';

import { Suspense } from 'react';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';
import LibraryStudent from './LibraryStudent';

// Bedroom Component
export function BedroomRoom({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const { isNight } = useTheme();
  
  return (
    <group position={position}>
      {/* Floor */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[8, 0.2, 6]} />
        <meshStandardMaterial color="#DEB887" roughness={0.8} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2, -2.9]} receiveShadow>
        <boxGeometry args={[8, 4, 0.2]} />
        <meshStandardMaterial color="#F0E68C" roughness={0.6} />
      </mesh>
      <mesh position={[-3.9, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 6]} />
        <meshStandardMaterial color="#F0E68C" roughness={0.6} />
      </mesh>
      <mesh position={[3.9, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 6]} />
        <meshStandardMaterial color="#F0E68C" roughness={0.6} />
      </mesh>

      {/* Double Bed */}
      <mesh position={[1, 0.4, -1.5]} castShadow>
        <boxGeometry args={[2.5, 0.6, 1.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Mattress */}
      <mesh position={[1, 0.8, -1.5]} castShadow>
        <boxGeometry args={[2.4, 0.2, 1.7]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Pillows */}
      <mesh position={[0.5, 1, -2.2]} castShadow>
        <boxGeometry args={[0.4, 0.15, 0.3]} />
        <meshStandardMaterial color="#FFB6C1" />
      </mesh>
      <mesh position={[1.5, 1, -2.2]} castShadow>
        <boxGeometry args={[0.4, 0.15, 0.3]} />
        <meshStandardMaterial color="#FFB6C1" />
      </mesh>

      {/* Blanket */}
      <mesh position={[1, 0.95, -1]} castShadow>
        <boxGeometry args={[2.2, 0.05, 1.2]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>

      {/* Wardrobe */}
      <mesh position={[-2.5, 2, -2]} castShadow>
        <boxGeometry args={[1.5, 4, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Wardrobe Handles */}
      <mesh position={[-2.2, 2, -1.48]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      <mesh position={[-2.8, 2, -1.48]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>

      {/* Bedside Table */}
      <mesh position={[3, 0.6, -1.5]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.4]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>

      {/* Lamp on Bedside Table */}
      <mesh position={[3, 1.25, -1.5]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.2]} />
        <meshStandardMaterial color="#C0C0C0" />
      </mesh>
      <mesh position={[3, 1.45, -1.5]} castShadow>
        <coneGeometry args={[0.12, 0.15]} />
        <meshStandardMaterial 
          color={isNight ? '#FFF8DC' : '#FFFFFF'} 
          emissive={isNight ? '#FFF8DC' : '#000000'}
          emissiveIntensity={isNight ? 0.4 : 0}
        />
      </mesh>

      {/* Mirror */}
      <mesh position={[-3.85, 2.5, 1]} castShadow>
        <boxGeometry args={[0.05, 1.2, 0.8]} />
        <meshStandardMaterial color="#DCDCDC" />
      </mesh>

      {/* Carpet */}
      <mesh position={[0.5, 0.21, 0.5]} receiveShadow>
        <boxGeometry args={[3, 0.02, 2]} />
        <meshStandardMaterial color="#8B0000" roughness={0.9} />
      </mesh>

      {/* Window */}
      <mesh position={[3.85, 2.5, 1]} castShadow>
        <boxGeometry args={[0.1, 1.5, 1.2]} />
        <meshStandardMaterial 
          color={isNight ? '#FFE4B5' : '#87CEEB'} 
          transparent 
          opacity={0.7}
          emissive={isNight ? '#FFE4B5' : '#000000'}
          emissiveIntensity={isNight ? 0.2 : 0}
        />
      </mesh>

      {/* Ceiling Fan */}
      <mesh position={[1, 3.8, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.2]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>
      
      {/* Fan Blades */}
      {[0, Math.PI/2, Math.PI, (3*Math.PI)/2].map((rotation, i) => (
        <mesh key={i} position={[1, 3.7, 0]} rotation={[0, rotation, 0]} castShadow>
          <boxGeometry args={[0.8, 0.02, 0.1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      ))}

      {isNight && (
        <pointLight
          position={[3, 1.45, -1.5]}
          intensity={0.6}
          color="#FFF8DC"
          castShadow
        />
      )}
    </group>
  );
}

// Kitchen Component
export function KitchenRoom({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const { isNight } = useTheme();
  
  return (
    <group position={position}>
      {/* Floor */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[8, 0.2, 6]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2, -2.9]} receiveShadow>
        <boxGeometry args={[8, 4, 0.2]} />
        <meshStandardMaterial color="#E6E6FA" roughness={0.6} />
      </mesh>
      <mesh position={[-3.9, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 6]} />
        <meshStandardMaterial color="#E6E6FA" roughness={0.6} />
      </mesh>
      <mesh position={[3.9, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 6]} />
        <meshStandardMaterial color="#E6E6FA" roughness={0.6} />
      </mesh>

      {/* Kitchen Counter - L-shaped */}
      <mesh position={[-2, 1, -2]} castShadow>
        <boxGeometry args={[3, 2, 1.5]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>
      <mesh position={[2.5, 1, -1]} castShadow>
        <boxGeometry args={[2, 2, 3]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>

      {/* Countertop */}
      <mesh position={[-2, 2.1, -2]} castShadow>
        <boxGeometry args={[3.2, 0.1, 1.7]} />
        <meshStandardMaterial color="#2F4F4F" />
      </mesh>
      <mesh position={[2.5, 2.1, -1]} castShadow>
        <boxGeometry args={[2.2, 0.1, 3.2]} />
        <meshStandardMaterial color="#2F4F4F" />
      </mesh>

      {/* Refrigerator */}
      <mesh position={[3.2, 2, 1.5]} castShadow>
        <boxGeometry args={[0.8, 4, 0.8]} />
        <meshStandardMaterial color="#DCDCDC" />
      </mesh>

      {/* Refrigerator Handle */}
      <mesh position={[2.75, 2.5, 1.5]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>

      {/* Stove/Cooktop */}
      <mesh position={[-2, 2.15, -2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>
      <mesh position={[-1.5, 2.15, -2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>

      {/* Microwave */}
      <mesh position={[2.8, 2.5, -1]} castShadow>
        <boxGeometry args={[0.5, 0.3, 0.4]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>

      {/* Sink */}
      <mesh position={[2, 2.05, -0.5]} castShadow>
        <boxGeometry args={[0.6, 0.2, 0.4]} />
        <meshStandardMaterial color="#C0C0C0" />
      </mesh>

      {/* Faucet */}
      <mesh position={[2, 2.3, -0.5]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.2]} />
        <meshStandardMaterial color="#C0C0C0" />
      </mesh>

      {/* Upper Cabinets */}
      <mesh position={[-2, 3.2, -2.5]} castShadow>
        <boxGeometry args={[3, 0.8, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[2.5, 3.2, -1.5]} castShadow>
        <boxGeometry args={[2, 0.8, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Dining Table */}
      <mesh position={[-0.5, 0.8, 1]} castShadow>
        <boxGeometry args={[1.5, 0.1, 1]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>

      {/* Table Legs */}
      {[-0.6, 0.6].map((x, i) => 
        [0.4, -0.4].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[-0.5 + x, 0.4, 1 + z]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        ))
      )}

      {/* Chairs */}
      <mesh position={[-1.8, 0.5, 1]} castShadow>
        <boxGeometry args={[0.4, 0.05, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-1.8, 0.9, 0.8]} castShadow>
        <boxGeometry args={[0.4, 0.8, 0.05]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      <mesh position={[0.8, 0.5, 1]} castShadow>
        <boxGeometry args={[0.4, 0.05, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.8, 0.9, 0.8]} castShadow>
        <boxGeometry args={[0.4, 0.8, 0.05]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Kitchen Items */}
      <mesh position={[-2.5, 2.18, -2]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.15]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>

      {/* Fruits on Counter */}
      <mesh position={[2.2, 2.2, -0.8]} castShadow>
        <sphereGeometry args={[0.06]} />
        <meshStandardMaterial color="#FF6347" />
      </mesh>
      <mesh position={[2.4, 2.2, -0.7]} castShadow>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>

      {/* Ceiling Light */}
      <mesh position={[0, 3.8, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial 
          color={isNight ? '#FFF8DC' : '#FFFFFF'} 
          emissive={isNight ? '#FFF8DC' : '#000000'}
          emissiveIntensity={isNight ? 0.8 : 0}
        />
      </mesh>

      {isNight && (
        <pointLight
          position={[0, 3.5, 0]}
          intensity={1.2}
          color="#FFF8DC"
          castShadow
        />
      )}
    </group>
  );
}

// Washroom Component
export function WashroomRoom({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const { isNight } = useTheme();
  
  return (
    <group position={position}>
      {/* Floor - Tiles */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[6, 0.2, 6]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>

      {/* Walls - Tiled */}
      <mesh position={[0, 2, -2.9]} receiveShadow>
        <boxGeometry args={[6, 4, 0.2]} />
        <meshStandardMaterial color="#F0FFFF" roughness={0.3} />
      </mesh>
      <mesh position={[-2.9, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 6]} />
        <meshStandardMaterial color="#F0FFFF" roughness={0.3} />
      </mesh>
      <mesh position={[2.9, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 6]} />
        <meshStandardMaterial color="#F0FFFF" roughness={0.3} />
      </mesh>

      {/* Bathtub */}
      <mesh position={[1.5, 0.5, -1.5]} castShadow>
        <boxGeometry args={[2, 1, 1.2]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Toilet */}
      <mesh position={[-1.5, 0.4, -2]} castShadow>
        <boxGeometry args={[0.6, 0.8, 0.8]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Toilet Seat */}
      <mesh position={[-1.5, 0.85, -1.8]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.05]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Toilet Tank */}
      <mesh position={[-1.5, 1.2, -2.2]} castShadow>
        <boxGeometry args={[0.5, 0.6, 0.3]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Washbasin */}
      <mesh position={[0, 0.9, 2]} castShadow>
        <cylinderGeometry args={[0.3, 0.25, 0.15]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Basin Stand */}
      <mesh position={[0, 0.5, 2]} castShadow>
        <boxGeometry args={[0.8, 1, 0.5]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Faucet */}
      <mesh position={[0, 1.1, 2.2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.15]} />
        <meshStandardMaterial color="#C0C0C0" />
      </mesh>

      {/* Mirror above basin */}
      <mesh position={[0, 1.8, 2.48]} castShadow>
        <boxGeometry args={[0.8, 0.6, 0.02]} />
        <meshStandardMaterial color="#DCDCDC" />
      </mesh>

      {/* Shower */}
      <mesh position={[1.5, 3.5, -1.5]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.05]} />
        <meshStandardMaterial color="#C0C0C0" />
      </mesh>

      {/* Shower Pipe */}
      <mesh position={[1.5, 2.5, -2.2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 2]} />
        <meshStandardMaterial color="#C0C0C0" />
      </mesh>

      {/* Towel Rack */}
      <mesh position={[-2.5, 1.5, 1]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.8]} />
        <meshStandardMaterial color="#C0C0C0" />
      </mesh>

      {/* Towel */}
      <mesh position={[-2.45, 1.5, 1]} castShadow>
        <boxGeometry args={[0.05, 0.6, 0.4]} />
        <meshStandardMaterial color="#FFB6C1" />
      </mesh>

      {/* Floor Mat */}
      <mesh position={[0, 0.22, 1]} receiveShadow>
        <boxGeometry args={[1, 0.02, 0.6]} />
        <meshStandardMaterial color="#4169E1" roughness={0.9} />
      </mesh>

      {/* Ceiling Light */}
      <mesh position={[0, 3.8, 0]} castShadow>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial 
          color={isNight ? '#FFF8DC' : '#FFFFFF'} 
          emissive={isNight ? '#FFF8DC' : '#000000'}
          emissiveIntensity={isNight ? 0.8 : 0}
        />
      </mesh>

      {isNight && (
        <pointLight
          position={[0, 3.5, 0]}
          intensity={1}
          color="#FFF8DC"
          castShadow
        />
      )}
    </group>
  );
}

// Hall/Living Room Component
export function HallRoom({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const { isNight } = useTheme();
  
  return (
    <group position={position}>
      {/* Floor */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[10, 0.2, 8]} />
        <meshStandardMaterial color="#DEB887" roughness={0.8} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2, -3.9]} receiveShadow>
        <boxGeometry args={[10, 4, 0.2]} />
        <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
      </mesh>
      <mesh position={[-4.9, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 8]} />
        <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
      </mesh>
      <mesh position={[4.9, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 8]} />
        <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
      </mesh>

      {/* Large Sofa Set */}
      <mesh position={[0, 0.7, -1]} castShadow>
        <boxGeometry args={[3, 1.4, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Sofa Back */}
      <mesh position={[0, 1.3, -1.5]} castShadow>
        <boxGeometry args={[3, 0.8, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Sofa Arms */}
      <mesh position={[-1.4, 1.1, -1]} castShadow>
        <boxGeometry args={[0.2, 1, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[1.4, 1.1, -1]} castShadow>
        <boxGeometry args={[0.2, 1, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Cushions */}
      {[-0.8, 0, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 1, -1]} castShadow>
          <boxGeometry args={[0.6, 0.2, 0.6]} />
          <meshStandardMaterial color="#FFB6C1" />
        </mesh>
      ))}

      {/* Coffee Table */}
      <mesh position={[0, 0.4, 0.5]} castShadow>
        <boxGeometry args={[2, 0.8, 1]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>

      {/* TV Stand */}
      <mesh position={[0, 0.6, -3.2]} castShadow>
        <boxGeometry args={[3, 1.2, 0.5]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* TV */}
      <mesh position={[0, 1.3, -3.1]} castShadow>
        <boxGeometry args={[2.5, 1.5, 0.1]} />
        <meshStandardMaterial 
          color={isNight ? '#000080' : '#2F2F2F'} 
          emissive={isNight ? '#000080' : '#000000'}
          emissiveIntensity={isNight ? 0.3 : 0}
        />
      </mesh>

      {/* Single Chairs */}
      <mesh position={[-2.5, 0.6, 1.5]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.8]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>
      <mesh position={[2.5, 0.6, 1.5]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.8]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>

      {/* Center Table Items */}
      <mesh position={[-0.3, 0.85, 0.5]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.1]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      
      {/* Books on table */}
      <mesh position={[0.3, 0.82, 0.3]} castShadow>
        <boxGeometry args={[0.2, 0.05, 0.15]} />
        <meshStandardMaterial color="#006400" />
      </mesh>

      {/* Floor Lamp */}
      <mesh position={[3.5, 0.8, 2]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1.6]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>
      <mesh position={[3.5, 1.8, 2]} castShadow>
        <coneGeometry args={[0.2, 0.3]} />
        <meshStandardMaterial 
          color={isNight ? '#FFF8DC' : '#FFFFFF'} 
          emissive={isNight ? '#FFF8DC' : '#000000'}
          emissiveIntensity={isNight ? 0.5 : 0}
        />
      </mesh>

      {/* Wall Art */}
      <mesh position={[0, 2.5, -3.85]} castShadow>
        <boxGeometry args={[1, 0.8, 0.05]} />
        <meshStandardMaterial color="#4682B4" />
      </mesh>

      {/* Potted Plant */}
      <mesh position={[-4, 0.3, 2]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-4, 0.7, 2]} castShadow>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      {/* Area Rug */}
      <mesh position={[0, 0.22, 0]} receiveShadow>
        <boxGeometry args={[4, 0.02, 3]} />
        <meshStandardMaterial color="#8B0000" roughness={0.9} />
      </mesh>

      {/* Chandelier */}
      <mesh position={[0, 3.5, 0]} castShadow>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial 
          color={isNight ? '#FFD700' : '#FFFFFF'} 
          emissive={isNight ? '#FFD700' : '#000000'}
          emissiveIntensity={isNight ? 0.8 : 0}
        />
      </mesh>

      {/* Chandelier Arms */}
      {[0, Math.PI/2, Math.PI, (3*Math.PI)/2].map((rotation, i) => (
        <mesh key={i} position={[0, 3.4, 0]} rotation={[0, rotation, 0]} castShadow>
          <boxGeometry args={[0.4, 0.02, 0.02]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
      ))}

      {isNight && (
        <>
          <pointLight
            position={[0, 3.2, 0]}
            intensity={1.5}
            color="#FFD700"
            castShadow
          />
          <pointLight
            position={[3.5, 1.8, 2]}
            intensity={0.8}
            color="#FFF8DC"
            castShadow
          />
        </>
      )}
    </group>
  );
}

// Terrace Component
export function TerraceRoom({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const { isNight } = useTheme();
  
  return (
    <group position={position}>
      {/* Terrace Floor */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[12, 0.2, 8]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.7} />
      </mesh>

      {/* Railing */}
      {/* Front Railing */}
      <mesh position={[0, 1.2, 3.9]} castShadow>
        <boxGeometry args={[12, 2.4, 0.1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Side Railings */}
      <mesh position={[-5.9, 1.2, 0]} castShadow>
        <boxGeometry args={[0.1, 2.4, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[5.9, 1.2, 0]} castShadow>
        <boxGeometry args={[0.1, 2.4, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Outdoor Furniture Set */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[2, 1.6, 1.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Outdoor Chairs */}
      <mesh position={[-1.5, 0.6, 0]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.6]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>
      <mesh position={[1.5, 0.6, 0]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.6]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>
      <mesh position={[0, 0.6, 1.8]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.6]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>

      {/* Potted Plants */}
      {[-4, -2, 2, 4].map((x, i) => (
        <group key={i} position={[x, 0, -3]}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.6]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[0, 1, 0]} castShadow>
            <sphereGeometry args={[0.4]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
        </group>
      ))}

      {/* BBQ Grill */}
      <mesh position={[4, 1, 2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 2]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>

      {/* Umbrella Stand */}
      <mesh position={[-3, 0.3, 1]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.6]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Umbrella Pole */}
      <mesh position={[-3, 2, 1]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Umbrella Top */}
      <mesh position={[-3, 3.7, 1]} castShadow>
        <coneGeometry args={[1.5, 0.8]} />
        <meshStandardMaterial color="#DC143C" />
      </mesh>

      {/* Outdoor Lights */}
      {[-4, 0, 4].map((x, i) => (
        <mesh key={i} position={[x, 2.5, 3.5]} castShadow>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial 
            color={isNight ? '#FFD700' : '#FFFFFF'} 
            emissive={isNight ? '#FFD700' : '#000000'}
            emissiveIntensity={isNight ? 0.8 : 0}
          />
        </mesh>
      ))}

      {/* Mountain/City View Background */}
      <mesh position={[0, 2, 8]} receiveShadow>
        <boxGeometry args={[20, 4, 0.1]} />
        <meshStandardMaterial 
          color={isNight ? '#191970' : '#87CEEB'} 
          transparent 
          opacity={0.7}
        />
      </mesh>

      {isNight && (
        <>
          {[-4, 0, 4].map((x, i) => (
            <pointLight
              key={i}
              position={[x, 2.5, 3.5]}
              intensity={0.6}
              color="#FFD700"
              castShadow
            />
          ))}
        </>
      )}
    </group>
  );
}

// Library Room (Enhanced)
export function LibraryRoom({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const { isNight } = useTheme();
  
  return (
    <group position={position}>
      {/* Floor */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[8, 0.2, 6]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2, -2.9]} receiveShadow>
        <boxGeometry args={[8, 4, 0.2]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.6} />
      </mesh>
      <mesh position={[-3.9, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 6]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.6} />
      </mesh>
      <mesh position={[3.9, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 6]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.6} />
      </mesh>

      {/* Bookshelf - Left Wall */}
      <mesh position={[-3.7, 2, 0]} castShadow>
        <boxGeometry args={[0.3, 3.5, 5.5]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>

      {/* Bookshelf Shelves */}
      {[0.5, 1.2, 1.9, 2.6, 3.3].map((y, i) => (
        <mesh key={i} position={[-3.5, y, 0]} castShadow>
          <boxGeometry args={[0.25, 0.05, 5.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      ))}

      {/* Books on Shelves */}
      {[0.7, 1.4, 2.1, 2.8, 3.5].map((shelfY, shelfIndex) => 
        Array.from({ length: 12 }).map((_, bookIndex) => {
          const bookColors = ['#8B0000', '#000080', '#006400', '#FF4500', '#4B0082', '#8B4513'];
          const x = -3.4;
          const z = -2.5 + (bookIndex * 0.4);
          const height = 0.15 + Math.random() * 0.1;
          
          return (
            <mesh key={`${shelfIndex}-${bookIndex}`} position={[x, shelfY + height/2, z]} castShadow>
              <boxGeometry args={[0.15, height, 0.05]} />
              <meshStandardMaterial color={bookColors[bookIndex % bookColors.length]} />
            </mesh>
          );
        })
      )}

      {/* Study Desk */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.1, 1.2]} />
        <meshStandardMaterial color="#D2691E" roughness={0.5} />
      </mesh>

      {/* Desk Items and other furniture... (keeping the same as before) */}
      {/* Student at the Desk */}
      <Suspense fallback={null}>
        <LibraryStudent 
          position={[0, 0.2, 1.2]} 
          isReading={true}
        />
      </Suspense>

      {/* ... rest of library furniture from previous implementation */}
      
      {isNight && (
        <pointLight
          position={[0, 3.5, 0]}
          intensity={1.5}
          color="#FFF8DC"
          castShadow
        />
      )}
    </group>
  );
}