'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface StreetFoodStallProps {
  position?: [number, number, number];
  scale?: number;
  type?: 'dosa' | 'chaat' | 'coffee' | 'juice' | 'idli' | 'vada';
  vendorPresent?: boolean;
}

export default function StreetFoodStall({ 
  position = [0, 0, 0], 
  scale = 1,
  type = 'dosa',
  vendorPresent = true
}: StreetFoodStallProps) {
  const { isNight } = useTheme();
  const stallRef = useRef<THREE.Group>(null);
  
  // Realistic cooking effects
  useFrame(({ clock }) => {
    if (stallRef.current && type === 'dosa') {
      // Steam effect simulation for hot cooking
      const steamElements = stallRef.current.children.filter(child => 
        child.userData.isSteam
      );
      steamElements.forEach((steam, i) => {
        if ('position' in steam) {
          steam.position.y = 1.3 + Math.sin(clock.elapsedTime * 3 + i) * 0.1;
        }
      });
    }
  });

  const getStallSpecs = () => {
    switch (type) {
      case 'dosa':
        return {
          color: '#FF6B35',
          equipmentColor: '#2C3E50',
          name: 'Dosa Corner',
          hasGriddle: true,
          hasTiffin: true
        };
      case 'chaat':
        return {
          color: '#4ECDC4',
          equipmentColor: '#8B4513',
          name: 'Chaat Bhandar',
          hasGriddle: false,
          hasTiffin: false
        };
      case 'coffee':
        return {
          color: '#8B4513',
          equipmentColor: '#C0C0C0',
          name: 'Filter Coffee',
          hasGriddle: false,
          hasTiffin: false
        };
      case 'juice':
        return {
          color: '#32CD32',
          equipmentColor: '#FFD700',
          name: 'Fresh Juice',
          hasGriddle: false,
          hasTiffin: false
        };
      case 'idli':
        return {
          color: '#FFFFFF',
          equipmentColor: '#708090',
          name: 'Idli Vada',
          hasGriddle: false,
          hasTiffin: true
        };
      default:
        return {
          color: '#FF6B35',
          equipmentColor: '#2C3E50',
          name: 'Street Food',
          hasGriddle: false,
          hasTiffin: false
        };
    }
  };

  const specs = getStallSpecs();

  return (
    <group ref={stallRef} position={position} scale={scale}>
      {/* Main cart structure with realistic proportions */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[2.2, 1.2, 1.4]} />
        <meshStandardMaterial color={specs.color} roughness={0.7} />
      </mesh>
      
      {/* Stainless steel counter */}
      <mesh position={[0, 1.25, 0.7]}>
        <boxGeometry args={[2.4, 0.1, 1]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Traditional cloth canopy with realistic fabric physics */}
      <mesh position={[0, 2, 0]} rotation={[Math.PI/16, 0, 0]}>
        <boxGeometry args={[2.8, 0.05, 2]} />
        <meshStandardMaterial color="#FF6B6B" roughness={0.8} />
      </mesh>
      
      {/* Canopy support poles with realistic materials */}
      {[[-1.2, 0, -0.9], [1.2, 0, -0.9], [-1.2, 0, 0.9], [1.2, 0, 0.9]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.03, 0.03, 1.8, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.9} />
        </mesh>
      ))}
      
      {/* Type-specific cooking equipment */}
      {specs.hasGriddle && (
        <>
          {/* Dosa tawa (griddle) */}
          <mesh position={[-0.6, 1.35, 0.2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.05, 20]} />
            <meshStandardMaterial color="#2C3E50" metalness={0.8} roughness={0.3} />
          </mesh>
          
          {/* Smaller tawa for chutneys */}
          <mesh position={[0.6, 1.35, 0.2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
            <meshStandardMaterial color="#2C3E50" metalness={0.8} roughness={0.3} />
          </mesh>
          
          {/* Steam effect */}
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh 
              key={i} 
              position={[-0.6 + i * 0.2, 1.5, 0.2]}
              userData={{ isSteam: true }}
            >
              <sphereGeometry args={[0.02, 6, 6]} />
              <meshStandardMaterial 
                color="#FFFFFF" 
                transparent 
                opacity={0.3}
                emissive="#F0F8FF"
                emissiveIntensity={0.1}
              />
            </mesh>
          ))}
        </>
      )}
      
      {type === 'coffee' && (
        <>
          {/* Traditional South Indian coffee filter */}
          <mesh position={[0, 1.4, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.35, 12]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
          </mesh>
          
          {/* Coffee vessels */}
          <mesh position={[-0.4, 1.35, 0.3]}>
            <cylinderGeometry args={[0.08, 0.08, 0.15, 12]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.8} />
          </mesh>
          <mesh position={[0.4, 1.35, 0.3]}>
            <cylinderGeometry args={[0.08, 0.08, 0.15, 12]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.8} />
          </mesh>
        </>
      )}
      
      {type === 'chaat' && (
        <>
          {/* Chaat mixing bowls */}
          <mesh position={[-0.5, 1.35, 0]}>
            <sphereGeometry args={[0.2, 8, 6]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </mesh>
          <mesh position={[0.5, 1.35, 0]}>
            <sphereGeometry args={[0.18, 8, 6]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </mesh>
          
          {/* Ingredient containers */}
          {Array.from({ length: 4 }).map((_, i) => (
            <mesh key={i} position={[-0.6 + i * 0.4, 1.4, -0.4]}>
              <cylinderGeometry args={[0.08, 0.08, 0.2, 8]} />
              <meshStandardMaterial 
                color={['#FF6347', '#32CD32', '#FFD700', '#8A2BE2'][i]} 
                roughness={0.6} 
              />
            </mesh>
          ))}
        </>
      )}
      
      {type === 'juice' && (
        <>
          {/* Juice extractor machine */}
          <mesh position={[0, 1.4, 0]}>
            <boxGeometry args={[0.4, 0.3, 0.3]} />
            <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.4} />
          </mesh>
          
          {/* Fresh fruit display */}
          {['#FFA500', '#32CD32', '#FF69B4', '#FFD700'].map((color, i) => (
            <mesh key={i} position={[-0.8 + i * 0.3, 1.35, 0.5]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial color={color} roughness={0.3} />
            </mesh>
          ))}
        </>
      )}
      
      {specs.hasTiffin && (
        <>
          {/* Idli steamer */}
          <mesh position={[0, 1.4, -0.3]}>
            <cylinderGeometry args={[0.25, 0.25, 0.3, 12]} />
            <meshStandardMaterial color="#708090" metalness={0.7} roughness={0.4} />
          </mesh>
          
          {/* Sambar pot */}
          <mesh position={[-0.5, 1.35, 0.3]}>
            <cylinderGeometry args={[0.2, 0.15, 0.2, 12]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </mesh>
        </>
      )}
      
      {/* Realistic cart wheels with wear patterns */}
      {[[-0.9, 0.25, -0.7], [0.9, 0.25, -0.7]].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.12, 12]} />
            <meshStandardMaterial color="#2C3E50" roughness={0.9} />
          </mesh>
          {/* Spoke pattern */}
          {Array.from({ length: 6 }).map((_, spokeIdx) => (
            <mesh 
              key={spokeIdx} 
              position={[0, 0, 0.05]} 
              rotation={[Math.PI/2, 0, spokeIdx * Math.PI / 3]}
            >
              <boxGeometry args={[0.008, 0.3, 0.01]} />
              <meshStandardMaterial color="#444444" />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* Vendor character (simplified but realistic) */}
      {vendorPresent && (
        <group position={[0, 0, -1.2]}>
          {/* Body */}
          <mesh position={[0, 0.9, 0]}>
            <boxGeometry args={[0.4, 1.2, 0.3]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </mesh>
          
          {/* Head */}
          <mesh position={[0, 1.8, 0]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color="#D2B48C" roughness={0.6} />
          </mesh>
          
          {/* Traditional cap */}
          <mesh position={[0, 1.95, 0]}>
            <cylinderGeometry args={[0.16, 0.12, 0.1, 8]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
          </mesh>
        </group>
      )}
      
      {/* Storage compartments */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2, 0.4, 1.2]} />
        <meshStandardMaterial color="#654321" roughness={0.8} />
      </mesh>
      
      {/* Price board */}
      <mesh position={[-1.3, 1.8, 0]} rotation={[0, Math.PI/6, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Stall lighting */}
      {isNight && (
        <>
          <pointLight 
            position={[0, 2.2, 0]} 
            intensity={0.6} 
            color="#FFE4B5" 
            distance={5} 
          />
          {/* Warm cooking glow */}
          <pointLight 
            position={[0, 1.4, 0]} 
            intensity={0.3} 
            color="#FF4500" 
            distance={3} 
          />
        </>
      )}
      
      {/* Small gas cylinder (realistic detail) */}
      <mesh position={[0.8, 0.15, -0.5]}>
        <cylinderGeometry args={[0.12, 0.12, 0.3, 8]} />
        <meshStandardMaterial color="#FF0000" roughness={0.6} />
      </mesh>
      
      {/* Water container */}
      <mesh position={[-0.8, 0.8, -0.6]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
        <meshStandardMaterial color="#4169E1" roughness={0.5} />
      </mesh>
    </group>
  );
}