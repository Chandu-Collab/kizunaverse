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

// Hall/Living Room Component - Enhanced with Realistic Interior
export function HallRoom({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const { isNight } = useTheme();
  
  return (
    <group position={position}>
      {/* Main Floor - Larger Living Space */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[12, 0.2, 10]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.8} />
      </mesh>

      {/* Walls with openings for connected layout */}
      <mesh position={[0, 2, -4.9]} receiveShadow>
        <boxGeometry args={[12, 4, 0.2]} />
        <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
      </mesh>
      <mesh position={[-5.9, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 10]} />
        <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
      </mesh>
      <mesh position={[5.9, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 10]} />
        <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
      </mesh>

      {/* Sectional Sofa Set - L-shaped */}
      {/* Main sofa */}
      <mesh position={[-1, 0.7, -1]} castShadow>
        <boxGeometry args={[4, 1.4, 1.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Corner section */}
      <mesh position={[1.5, 0.7, 0.5]} castShadow>
        <boxGeometry args={[1.2, 1.4, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Sofa backs */}
      <mesh position={[-1, 1.3, -1.6]} castShadow>
        <boxGeometry args={[4, 0.8, 0.2]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[2.1, 1.3, 0.5]} castShadow>
        <boxGeometry args={[0.2, 0.8, 2]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Sofa arms */}
      <mesh position={[-2.9, 1.1, -1]} castShadow>
        <boxGeometry args={[0.2, 1, 1.2]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[0.9, 1.1, -1]} castShadow>
        <boxGeometry args={[0.2, 1, 1.2]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Sofa cushions */}
      {[-2.2, -1.2, -0.2, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 1, -1]} castShadow>
          <boxGeometry args={[0.7, 0.2, 0.8]} />
          <meshStandardMaterial color="#DEB887" />
        </mesh>
      ))}

      {/* Coffee table - Modern glass top */}
      <mesh position={[-0.5, 0.4, 0.8]} castShadow>
        <boxGeometry args={[2.5, 0.1, 1.2]} />
        <meshStandardMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.7}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Coffee table legs */}
      {[-1, 0.5].map((x, i) => 
        [-0.4, 0.4].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[-0.5 + x, 0.2, 0.8 + z]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.4]} />
            <meshStandardMaterial color="#C0C0C0" />
          </mesh>
        ))
      )}

      {/* Entertainment Center */}
      <mesh position={[0, 1, -4.7]} castShadow>
        <boxGeometry args={[6, 2, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* TV */}
      <mesh position={[0, 1.8, -4.5]} castShadow>
        <boxGeometry args={[3, 1.8, 0.15]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>

      {/* TV Screen */}
      <mesh position={[0, 1.8, -4.42]} castShadow>
        <boxGeometry args={[2.8, 1.6, 0.05]} />
        <meshStandardMaterial 
          color={isNight ? '#00008B' : '#000080'} 
          emissive={isNight ? '#00008B' : '#000000'}
          emissiveIntensity={isNight ? 0.3 : 0}
        />
      </mesh>

      {/* Speakers */}
      <mesh position={[-2.5, 1.2, -4.5]} castShadow>
        <boxGeometry args={[0.3, 0.8, 0.2]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>
      <mesh position={[2.5, 1.2, -4.5]} castShadow>
        <boxGeometry args={[0.3, 0.8, 0.2]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>

      {/* Side tables */}
      <mesh position={[-4, 0.6, -1]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.6]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>
      <mesh position={[3, 0.6, 0.5]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.6]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>

      {/* Table lamps */}
      {[[-4, 1.25, -1], [3, 1.25, 0.5]].map(([x, y, z], i) => (
        <group key={i}>
          <mesh position={[x, y, z]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.3]} />
            <meshStandardMaterial color="#C0C0C0" />
          </mesh>
          <mesh position={[x, y + 0.25, z]} castShadow>
            <coneGeometry args={[0.15, 0.2]} />
            <meshStandardMaterial 
              color={isNight ? '#FFF8DC' : '#FFFFFF'} 
              emissive={isNight ? '#FFF8DC' : '#000000'}
              emissiveIntensity={isNight ? 0.4 : 0}
            />
          </mesh>
        </group>
      ))}

      {/* Bookshelf */}
      <mesh position={[5.7, 2, 2]} castShadow>
        <boxGeometry args={[0.3, 3.5, 3]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>

      {/* Books on shelf */}
      {[0.5, 1.2, 1.9, 2.6, 3.3].map((shelfY, shelfIndex) => 
        Array.from({ length: 6 }).map((_, bookIndex) => {
          const bookColors = ['#8B0000', '#000080', '#006400', '#FF4500', '#4B0082', '#8B4513'];
          const x = 5.6;
          const z = 1 + (bookIndex * 0.3);
          
          return (
            <mesh key={`${shelfIndex}-${bookIndex}`} position={[x, shelfY, z]} castShadow>
              <boxGeometry args={[0.15, 0.2, 0.05]} />
              <meshStandardMaterial color={bookColors[bookIndex % bookColors.length]} />
            </mesh>
          );
        })
      )}

      {/* Plants */}
      <mesh position={[-5, 0.8, 3]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-5, 1.2, 3]} castShadow>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color="#228B22" roughness={0.8} />
      </mesh>

      {/* Area rug */}
      <mesh position={[0, 0.22, 0]} receiveShadow>
        <boxGeometry args={[5, 0.02, 3]} />
        <meshStandardMaterial color="#8B0000" roughness={0.9} />
      </mesh>

      {/* Ceiling fan */}
      <mesh position={[0, 3.8, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.2]} />
        <meshStandardMaterial color="#C0C0C0" />
      </mesh>

      {/* Fan blades */}
      {[0, Math.PI/2, Math.PI, 3*Math.PI/2].map((rotation, i) => (
        <mesh key={i} position={[Math.cos(rotation) * 0.8, 3.9, Math.sin(rotation) * 0.8]} castShadow>
          <boxGeometry args={[1.5, 0.05, 0.15]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      ))}

      {/* Coffee table items */}
      <mesh position={[-0.8, 0.52, 0.5]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.15]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.3, 0.52, 1]} castShadow>
        <boxGeometry args={[0.3, 0.02, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Throw pillows */}
      {[[-2, 1.1, -0.8], [-0.5, 1.1, -0.8], [1.3, 1.1, 0.3]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <boxGeometry args={[0.4, 0.15, 0.4]} />
          <meshStandardMaterial color={['#FFB6C1', '#DDA0DD', '#98FB98'][i]} />
        </mesh>
      ))}

      {/* Ceiling Light */}
      <mesh position={[2, 3.8, 2]} castShadow>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial 
          color={isNight ? '#FFF8DC' : '#FFFFFF'} 
          emissive={isNight ? '#FFF8DC' : '#000000'}
          emissiveIntensity={isNight ? 0.8 : 0}
        />
      </mesh>

      {isNight && (
        <>
          <pointLight
            position={[2, 3.5, 2]}
            intensity={1.2}
            color="#FFF8DC"
            castShadow
          />
          {/* Table lamp lights */}
          <pointLight
            position={[-4, 1.5, -1]}
            intensity={0.6}
            color="#FFF8DC"
            castShadow
          />
          <pointLight
            position={[3, 1.5, 0.5]}
            intensity={0.6}
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

// Library Room (Enhanced with Realistic Academic Environment)
export function LibraryRoom({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const { isNight } = useTheme();
  
  return (
    <group position={position}>
      {/* Hardwood Floor */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[10, 0.2, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Walls with warm academic colors */}
      <mesh position={[0, 2, -3.9]} receiveShadow>
        <boxGeometry args={[10, 4, 0.2]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.6} />
      </mesh>
      <mesh position={[-4.9, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 8]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.6} />
      </mesh>
      <mesh position={[4.9, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 8]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.6} />
      </mesh>

      {/* Large Bookshelf Wall - Left Side */}
      <mesh position={[-4.7, 2.2, 0]} castShadow>
        <boxGeometry args={[0.3, 3.8, 7.5]} />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>

      {/* Multiple Bookshelf Levels */}
      {[0.3, 0.9, 1.5, 2.1, 2.7, 3.3, 3.9].map((y, i) => (
        <mesh key={i} position={[-4.5, y, 0]} castShadow>
          <boxGeometry args={[0.25, 0.05, 7.4]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
      ))}

      {/* Extensive Book Collection */}
      {[0.5, 1.1, 1.7, 2.3, 2.9, 3.5, 4.1].map((shelfY, shelfIndex) => 
        Array.from({ length: 25 }).map((_, bookIndex) => {
          const bookColors = [
            '#8B0000', '#000080', '#006400', '#FF4500', '#4B0082', '#8B4513',
            '#2F4F4F', '#B22222', '#9932CC', '#FF6347', '#4169E1', '#DC143C',
            '#00CED1', '#FF1493', '#32CD32', '#FF69B4', '#6495ED', '#CD853F'
          ];
          const x = -4.4;
          const z = -3.5 + (bookIndex * 0.28);
          const height = 0.12 + Math.random() * 0.08;
          
          return (
            <mesh key={`${shelfIndex}-${bookIndex}`} position={[x, shelfY + height/2, z]} castShadow>
              <boxGeometry args={[0.12, height, 0.04]} />
              <meshStandardMaterial color={bookColors[bookIndex % bookColors.length]} />
            </mesh>
          );
        })
      )}

      {/* Right Side Bookshelf */}
      <mesh position={[4.7, 2.2, -2]} castShadow>
        <boxGeometry args={[0.3, 3.8, 3.5]} />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>

      {[0.3, 0.9, 1.5, 2.1, 2.7, 3.3, 3.9].map((y, i) => (
        <mesh key={`right-shelf-${i}`} position={[4.5, y, -2]} castShadow>
          <boxGeometry args={[0.25, 0.05, 3.4]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
      ))}

      {/* Books on right shelf */}
      {[0.5, 1.1, 1.7, 2.3, 2.9, 3.5, 4.1].map((shelfY, shelfIndex) => 
        Array.from({ length: 12 }).map((_, bookIndex) => {
          const bookColors = ['#8B0000', '#000080', '#006400', '#FF4500', '#4B0082', '#8B4513'];
          const x = 4.4;
          const z = -3.5 + (bookIndex * 0.25);
          
          return (
            <mesh key={`right-${shelfIndex}-${bookIndex}`} position={[x, shelfY, z]} castShadow>
              <boxGeometry args={[0.12, 0.15, 0.04]} />
              <meshStandardMaterial color={bookColors[bookIndex % bookColors.length]} />
            </mesh>
          );
        })
      )}

      {/* Large Executive Study Desk */}
      <mesh position={[0, 1, 1.5]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.15, 1.8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.5} />
      </mesh>

      {/* Desk legs */}
      {[-1.5, 1.5].map((x, i) => 
        [-0.7, 0.7].map((z, j) => (
          <mesh key={`desk-leg-${i}-${j}`} position={[x, 0.5, 1.5 + z]} castShadow>
            <boxGeometry args={[0.1, 1, 0.1]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
        ))
      )}

      {/* Desk drawers */}
      {[-1.2, 0, 1.2].map((x, i) => (
        <mesh key={`drawer-${i}`} position={[x, 0.7, 0.6]} castShadow>
          <boxGeometry args={[0.8, 0.3, 0.4]} />
          <meshStandardMaterial color="#A0522D" />
        </mesh>
      ))}

      {/* Drawer handles */}
      {[-1.2, 0, 1.2].map((x, i) => (
        <mesh key={`handle-${i}`} position={[x, 0.7, 0.42]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.1]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
      ))}

      {/* Executive Chair */}
      <mesh position={[0, 0.8, 3]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Chair back */}
      <mesh position={[0, 1.4, 2.8]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Chair arms */}
      {[-0.3, 0.3].map((x, i) => (
        <mesh key={`chair-arm-${i}`} position={[x, 1, 3]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.5]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      ))}

      {/* Chair base with wheels */}
      <mesh position={[0, 0.3, 3]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.6]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>

      {/* Computer Setup */}
      <mesh position={[0, 1.12, 1.2]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.05]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>

      {/* Monitor Screen */}
      <mesh position={[0, 1.12, 1.17]} castShadow>
        <boxGeometry args={[0.55, 0.35, 0.02]} />
        <meshStandardMaterial 
          color={isNight ? '#000080' : '#4169E1'} 
          emissive={isNight ? '#000080' : '#000000'}
          emissiveIntensity={isNight ? 0.3 : 0}
        />
      </mesh>

      {/* Keyboard and Mouse */}
      <mesh position={[0, 1.08, 1.8]} castShadow>
        <boxGeometry args={[0.4, 0.02, 0.15]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>
      
      <mesh position={[0.3, 1.08, 1.6]} castShadow>
        <boxGeometry args={[0.08, 0.02, 0.12]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>

      {/* Desk Items */}
      {/* Pen holder */}
      <mesh position={[-1.2, 1.12, 1]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.15]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Pens in holder */}
      {[-0.02, 0, 0.02].map((x, i) => (
        <mesh key={`pen-${i}`} position={[-1.2 + x, 1.22, 1]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.12]} />
          <meshStandardMaterial color={['#FF0000', '#0000FF', '#000000'][i]} />
        </mesh>
      ))}

      {/* Stack of books on desk */}
      {[0, 0.03, 0.06, 0.09].map((y, i) => (
        <mesh key={`desk-book-${i}`} position={[1, 1.08 + y, 1.2]} castShadow>
          <boxGeometry args={[0.25, 0.03, 0.18]} />
          <meshStandardMaterial color={['#8B0000', '#006400', '#4B0082', '#FF4500'][i]} />
        </mesh>
      ))}

      {/* Table lamp */}
      <mesh position={[-0.8, 1.25, 1.8]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.35]} />
        <meshStandardMaterial color="#C0C0C0" />
      </mesh>
      
      <mesh position={[-0.8, 1.5, 1.8]} castShadow>
        <coneGeometry args={[0.15, 0.2]} />
        <meshStandardMaterial 
          color={isNight ? '#FFF8DC' : '#FFFFFF'} 
          emissive={isNight ? '#FFF8DC' : '#000000'}
          emissiveIntensity={isNight ? 0.5 : 0}
        />
      </mesh>

      {/* Reading chair and side table */}
      <mesh position={[2.5, 0.6, -2]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Reading chair cushion */}
      <mesh position={[2.5, 0.85, -2]} castShadow>
        <boxGeometry args={[0.7, 0.1, 0.7]} />
        <meshStandardMaterial color="#DDA0DD" />
      </mesh>

      {/* Side table */}
      <mesh position={[3.5, 0.6, -2]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 1.2]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>

      {/* Globe on side table */}
      <mesh position={[3.5, 1.3, -2]} castShadow>
        <sphereGeometry args={[0.12]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>

      {/* Area rug */}
      <mesh position={[0, 0.22, 0]} receiveShadow>
        <boxGeometry args={[6, 0.02, 4]} />
        <meshStandardMaterial color="#8B0000" roughness={0.9} />
      </mesh>

      {/* Ceiling with crown molding */}
      <mesh position={[0, 3.9, 0]} receiveShadow>
        <boxGeometry args={[10, 0.1, 8]} />
        <meshStandardMaterial color="#FFFAF0" />
      </mesh>

      {/* Chandelier/Study Light */}
      <mesh position={[0, 3.7, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.2, 0.3]} />
        <meshStandardMaterial 
          color={isNight ? '#FFF8DC' : '#FFFFFF'} 
          emissive={isNight ? '#FFF8DC' : '#000000'}
          emissiveIntensity={isNight ? 0.6 : 0}
        />
      </mesh>

      {/* Student at the Desk */}
      <Suspense fallback={null}>
        <LibraryStudent 
          position={[0, 0.2, 2.5]} 
          isReading={true}
        />
      </Suspense>

      {isNight && (
        <>
          <pointLight
            position={[0, 3.5, 0]}
            intensity={1.5}
            color="#FFF8DC"
            castShadow
          />
          <pointLight
            position={[-0.8, 1.5, 1.8]}
            intensity={0.8}
            color="#FFF8DC"
            castShadow
          />
        </>
      )}
    </group>
  );
}