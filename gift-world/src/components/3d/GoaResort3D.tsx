'use client';

import { useRef, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, Text, Sky, ContactShadows, Box, Cylinder, Sphere } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface GoaResort3DProps {
  position?: [number, number, number];
  showResort?: boolean;
  currentArea?: 'lobby' | 'restaurant' | 'pool' | 'suite' | 'spa' | 'terrace' | 'exterior';
  viewMode?: 'exterior' | 'interior';
}

function ResortContent({ 
  showResort = false, 
  currentArea = 'exterior',
  viewMode = 'exterior'
}: { 
  showResort?: boolean;
  currentArea?: 'lobby' | 'restaurant' | 'pool' | 'suite' | 'spa' | 'terrace' | 'exterior';
  viewMode?: 'exterior' | 'interior';
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();

  // Animate subtle floating motion
  useFrame((state) => {
    if (groupRef.current && currentArea === 'exterior') {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.01;
    }
  });

  const roomLightBase = isNight ? 1.4 : 0.8;
  const getAreaLightIntensity = (
    area: 'lobby' | 'restaurant' | 'pool' | 'suite' | 'spa' | 'terrace'
  ) => {
    if (viewMode === 'interior') {
      return currentArea === area ? roomLightBase + 0.7 : roomLightBase * 0.7;
    }
    if (area === 'terrace' && currentArea === 'terrace') {
      return roomLightBase + 0.8;
    }
    return currentArea === area ? roomLightBase + 0.4 : 0.0;
  };

  // Render specific resort area
  if (currentArea !== 'exterior') {
    return (
      <group ref={groupRef}>
        {/* Sky and Environment */}
        <Sky 
          azimuth={0.25} 
          inclination={isNight ? 0.05 : 0.6} 
          distance={1000}
          mieCoefficient={0.008}
          mieDirectionalG={0.8}
          rayleigh={0.5}
        />
        
        {/* Global Lighting */}
        <ambientLight 
          intensity={
            currentArea === 'terrace' 
              ? (isNight ? 1.0 : 1.2) 
              : (isNight ? 0.4 : 0.7)
          } 
          color={isNight ? '#4a5568' : '#fff8e1'} 
        />
        <directionalLight 
          position={[15, 15, 10]} 
          intensity={
            currentArea === 'terrace' 
              ? (isNight ? 0.8 : 1.3) 
              : (isNight ? 0.3 : 0.8)
          }
          color={isNight ? '#9ca3af' : '#ffffff'}
          castShadow
        />

        {/* Resort Area Specific Rendering */}
        {currentArea === 'lobby' && <LobbyArea />}
        {currentArea === 'restaurant' && <RestaurantArea />}
        {currentArea === 'pool' && <PoolArea />}
        {currentArea === 'suite' && <SuiteArea />}
        {currentArea === 'spa' && <SpaArea />}
        {currentArea === 'terrace' && <TerraceArea />}

        {/* Area-specific lighting */}
        <pointLight
          position={[0, 3.2, 2]}
          intensity={getAreaLightIntensity(currentArea as any)}
          color={isNight ? '#FFD6A5' : '#FFF3D6'}
          distance={12}
          decay={2}
        />
      </group>
    );
  }

  // Render exterior resort view
  return (
    <group ref={groupRef}>
      {/* Sky */}
      <Sky 
        azimuth={0.25} 
        inclination={isNight ? 0.05 : 0.6} 
        distance={1000}
      />
      
      {/* Lighting */}
      <ambientLight intensity={isNight ? 0.3 : 0.6} color={isNight ? '#4a5568' : '#fff8e1'} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={isNight ? 0.5 : 1.0} 
        color={isNight ? '#9ca3af' : '#ffffff'}
        castShadow
      />

      {/* Resort Exterior Buildings */}
      <ResortExterior />
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color={isNight ? '#2a5298' : '#f5deb3'} />
      </mesh>

      <ContactShadows opacity={0.3} scale={20} blur={2} far={6} />
    </group>
  );
}

// Resort Area Components
function LobbyArea() {
  const { isNight } = useTheme();
  
  return (
    <group>
      {/* Marble Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 12]} />
        <meshStandardMaterial color="#F8F8FF" metalness={0.8} roughness={0.1} />
      </mesh>
      
      {/* Reception Desk */}
      <mesh position={[0, 1.2, 4]}>
        <boxGeometry args={[4, 2.4, 1]} />
        <meshStandardMaterial color="#8B4513" metalness={0.6} />
      </mesh>
      
      {/* Luxury Seating */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[
          -4 + (i % 3) * 4,
          0.5,
          -2 + Math.floor(i / 3) * 4
        ]}>
          <boxGeometry args={[1.2, 1, 1.2]} />
          <meshStandardMaterial color="#4169E1" />
        </mesh>
      ))}
      
      {/* Crystal Chandelier */}
      <mesh position={[0, 4.5, 0]}>
        <octahedronGeometry args={[1.2, 2]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.9}
          emissive={isNight ? "#FFD700" : "#000000"}
          emissiveIntensity={isNight ? 0.5 : 0}
        />
      </mesh>
      
      {/* Walls */}
      <mesh position={[0, 3, -6]}>
        <boxGeometry args={[15, 6, 0.2]} />
        <meshStandardMaterial color="#F5E6D3" />
      </mesh>
    </group>
  );
}

function RestaurantArea() {
  const { isNight } = useTheme();
  
  return (
    <group>
      {/* Restaurant Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 15]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>
      
      {/* Dining Tables */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group key={i} position={[
          -6 + (i % 4) * 4,
          0.8,
          -3 + Math.floor(i / 4) * 3
        ]}>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.05, 16]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          
          {/* Chairs */}
          {Array.from({ length: 4 }).map((_, j) => (
            <mesh key={j} position={[
              Math.cos((j * Math.PI) / 2) * 0.8,
              0.3,
              Math.sin((j * Math.PI) / 2) * 0.8
            ]}>
              <boxGeometry args={[0.4, 0.6, 0.4]} />
              <meshStandardMaterial color="#D2691E" />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* Elegant Chandelier */}
      <mesh position={[0, 4.5, 0]}>
        <octahedronGeometry args={[1, 2]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.9}
          emissive={isNight ? "#FFD700" : "#000000"}
          emissiveIntensity={isNight ? 0.3 : 0}
        />
      </mesh>
      
      {/* Bar Area */}
      <mesh position={[8, 1.2, 0]}>
        <boxGeometry args={[3, 2.4, 8]} />
        <meshStandardMaterial color="#8B4513" metalness={0.3} />
      </mesh>
    </group>
  );
}

function PoolArea() {
  const { isNight } = useTheme();
  
  return (
    <group>
      {/* Pool Deck */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[25, 20]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>
      
      {/* Main Pool */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 8]} />
        <meshStandardMaterial 
          color={isNight ? "#1E90FF" : "#00BFFF"}
          transparent
          opacity={0.8}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      
      {/* Pool Loungers */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group key={i} position={[
          -8 + (i % 4) * 5,
          0,
          8 + Math.floor(i / 4) * 3
        ]}>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[2, 0.1, 0.8]} />
            <meshStandardMaterial color="#FF6347" />
          </mesh>
          <mesh position={[0, 0.15, -0.2]} rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[2, 0.1, 0.5]} />
            <meshStandardMaterial color="#FF6347" />
          </mesh>
        </group>
      ))}
      
      {/* Pool Bar */}
      <mesh position={[8, 0.5, 0]}>
        <cylinderGeometry args={[2, 2, 0.3, 16]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>
      
      {/* Underwater Lighting */}
      {isNight && Array.from({ length: 6 }).map((_, i) => (
        <pointLight
          key={`underwater-${i}`}
          position={[
            -6 + (i % 3) * 6,
            -0.2,
            -3 + Math.floor(i / 3) * 6
          ]}
          intensity={0.4}
          color="#00CED1"
          distance={3}
        />
      ))}
    </group>
  );
}

function SuiteArea() {
  const { isNight } = useTheme();
  
  return (
    <group>
      {/* Suite Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#F5E6D3" />
      </mesh>
      
      {/* King Bed */}
      <mesh position={[0, 0.8, 2]}>
        <boxGeometry args={[3, 0.6, 2.2]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Luxury Sofa */}
      <mesh position={[-3, 0.5, -1]}>
        <boxGeometry args={[2.5, 0.8, 1]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>
      
      {/* Coffee Table */}
      <mesh position={[-3, 0.3, -2]}>
        <boxGeometry args={[1.5, 0.05, 0.8]} />
        <meshStandardMaterial color="#8B4513" metalness={0.3} />
      </mesh>
      
      {/* Private Balcony */}
      <mesh position={[0, 0.1, -4.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>
      
      {/* Hot Tub on Balcony */}
      <mesh position={[3, 0.4, -4]}>
        <cylinderGeometry args={[1.2, 1.2, 0.8, 16]} />
        <meshStandardMaterial 
          color={isNight ? "#4169E1" : "#87CEEB"}
          metalness={0.2}
        />
      </mesh>
      
      {/* Room Lighting */}
      <pointLight
        position={[0, 3, 0]}
        intensity={1.2}
        color={isNight ? "#FFD700" : "#FFFFFF"}
        distance={8}
      />
    </group>
  );
}

function SpaArea() {
  const { isNight } = useTheme();
  
  return (
    <group>
      {/* Zen Garden Floor */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[8, 32]} />
        <meshStandardMaterial color="#F5DEB3" />
      </mesh>
      
      {/* Meditation Stones */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} position={[
          -3 + i,
          0.2,
          0
        ]}>
          <sphereGeometry args={[0.2 + Math.random() * 0.1, 8, 6]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
      ))}
      
      {/* Treatment Rooms */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={i} position={[
          -4 + i * 4,
          1.5,
          -6
        ]}>
          <boxGeometry args={[3, 3, 2]} />
          <meshStandardMaterial color="#F0E68C" transparent opacity={0.9} />
        </mesh>
      ))}
      
      {/* Water Fountain */}
      <mesh position={[0, 1, 4]}>
        <cylinderGeometry args={[1, 1, 0.3, 16]} />
        <meshStandardMaterial color="#4682B4" />
      </mesh>
      
      {/* Bamboo Decoration */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[
          -6 + (i % 4) * 4,
          1.5,
          6 + Math.floor(i / 4) * 2
        ]}>
          <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
          <meshStandardMaterial color="#DAA520" />
        </mesh>
      ))}
      
      {/* Soft Spa Lighting */}
      <ambientLight intensity={0.4} color="#E6E6FA" />
      <pointLight
        position={[0, 3, 0]}
        intensity={0.6}
        color={isNight ? "#E6E6FA" : "#FFFFFF"}
        distance={10}
      />
    </group>
  );
}

function TerraceArea() {
  const { isNight } = useTheme();
  
  return (
    <group>
      {/* Terrace Platform */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 15]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.4} />
      </mesh>
      
      {/* Luxury Seating Areas */}
      {Array.from({ length: 6 }).map((_, i) => (
        <group key={i} position={[
          -8 + (i % 3) * 8,
          0,
          -4 + Math.floor(i / 3) * 8
        ]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[1.5, 1.5, 0.3, 16]} />
            <meshStandardMaterial color="#4169E1" />
          </mesh>
          
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.05, 16]} />
            <meshStandardMaterial color="#8B4513" metalness={0.3} />
          </mesh>
        </group>
      ))}
      
      {/* Infinity Edge Water */}
      <mesh position={[0, 0.1, 6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 2]} />
        <meshStandardMaterial 
          color={isNight ? "#191970" : "#00BFFF"}
          transparent
          opacity={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Rooftop Bar */}
      <mesh position={[8, 1.2, -6]}>
        <boxGeometry args={[3, 2.4, 1.5]} />
        <meshStandardMaterial color="#8B4513" metalness={0.3} />
      </mesh>
      
      {/* Bar Counter */}
      <mesh position={[8, 1.8, -5]}>
        <boxGeometry args={[2.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#D2691E" metalness={0.7} />
      </mesh>
      
      {/* Panoramic Lighting */}
      {Array.from({ length: 8 }).map((_, i) => (
        <pointLight
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 8,
            2,
            Math.sin((i / 8) * Math.PI * 2) * 6
          ]}
          intensity={0.8}
          color={isNight ? "#FFD700" : "#FFFFFF"}
          distance={6}
        />
      ))}
    </group>
  );
}

function ResortExterior() {
  const { isNight } = useTheme();
  
  return (
    <group>
      {/* Main Resort Building */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[15, 6, 8]} />
        <meshStandardMaterial color={isNight ? "#F5E6D3" : "#FFF8DC"} roughness={0.3} />
      </mesh>
      
      {/* Glass Front */}
      <mesh position={[0, 3, 4.1]}>
        <boxGeometry args={[14, 5, 0.2]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} metalness={0.8} />
      </mesh>
      
      {/* Entrance */}
      <mesh position={[0, 1.5, 4.2]}>
        <boxGeometry args={[3, 3, 0.1]} />
        <meshStandardMaterial color="#DAA520" metalness={0.9} />
      </mesh>
      
      {/* Columns */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[-6 + i * 2.4, 3, 4.1]}>
          <cylinderGeometry args={[0.3, 0.3, 6, 8]} />
          <meshStandardMaterial color="#F5DEB3" />
        </mesh>
      ))}
      
      {/* Resort Sign */}
      <mesh position={[0, 5.5, 4.2]}>
        <boxGeometry args={[8, 1.2, 0.1]} />
        <meshStandardMaterial 
          color={isNight ? "#DAA520" : "#FFFFFF"}
          emissive={isNight ? "#FFD700" : "#000000"}
          emissiveIntensity={isNight ? 0.5 : 0}
        />
      </mesh>
      
      {/* Palm Trees */}
      {Array.from({ length: 4 }).map((_, i) => (
        <group key={i} position={[
          -10 + i * 7,
          0,
          8
        ]}>
          {/* Trunk */}
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 4, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          
          {/* Palm Leaves */}
          <group position={[0, 4, 0]}>
            {Array.from({ length: 6 }).map((_, j) => (
              <mesh 
                key={j} 
                position={[
                  Math.cos((j / 6) * Math.PI * 2) * 1,
                  0,
                  Math.sin((j / 6) * Math.PI * 2) * 1
                ]}
                rotation={[0, (j / 6) * Math.PI * 2, Math.PI * 0.1]}
              >
                <planeGeometry args={[0.3, 1.5]} />
                <meshStandardMaterial color="#228B22" side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
        </group>
      ))}
    </group>
  );
}

export default function GoaResort3D({ 
  position = [0, 0, 0], 
  showResort = false, 
  currentArea = 'exterior',
  viewMode = 'exterior'
}: GoaResort3DProps) {
  return (
    <group position={position}>
      <Suspense fallback={null}>
        <ResortContent 
          showResort={showResort}
          currentArea={currentArea}
          viewMode={viewMode}
        />
      </Suspense>
    </group>
  );
}