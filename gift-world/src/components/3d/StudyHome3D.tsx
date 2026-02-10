'use client';

import { useRef, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, Text, Sky, ContactShadows, Box, Cylinder, Sphere } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import LibraryStudent from './LibraryStudent';
import { BedroomRoom, KitchenRoom, WashroomRoom, HallRoom, TerraceRoom, LibraryRoom } from './HomeRooms';
import * as THREE from 'three';

interface StudyHome3DProps {
  position?: [number, number, number];
  showStudyRoom?: boolean;
  currentRoom?: 'library' | 'bedroom' | 'kitchen' | 'washroom' | 'hall' | 'terrace' | 'exterior';
  viewMode?: 'exterior' | 'interior';
}

function StudyHomeContent({ 
  showStudyRoom = false, 
  currentRoom = 'exterior',
  viewMode = 'exterior'
}: { 
  showStudyRoom?: boolean;
  currentRoom?: 'library' | 'bedroom' | 'kitchen' | 'washroom' | 'hall' | 'terrace' | 'exterior';
  viewMode?: 'exterior' | 'interior';
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();

  // Animate subtle floating motion
  useFrame((state) => {
    if (groupRef.current && currentRoom === 'exterior') {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.01;
    }
  });

  // Render specific room interior with connected hallway system
  if (currentRoom !== 'exterior') {
    return (
      <group ref={groupRef}>
        {/* Sky and Environment for all rooms */}
        <Sky 
          azimuth={0.25} 
          inclination={isNight ? 0.05 : 0.6} 
          distance={1000}
          mieCoefficient={0.008}
          mieDirectionalG={0.8}
          rayleigh={0.5}
        />
        
        {/* Global Lighting */}
        <ambientLight intensity={isNight ? 0.4 : 0.7} color={isNight ? '#4a5568' : '#fff8e1'} />
        <directionalLight 
          position={[15, 15, 10]} 
          intensity={isNight ? 0.3 : 0.8}
          color={isNight ? '#9ca3af' : '#ffffff'}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={100}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />

        {/* Room-specific content based on view mode */}
        {viewMode === 'exterior' ? (
          // Exterior view: Show only the selected room without connections
          <>
            {currentRoom === 'hall' && <HallRoom position={[0, 0, 0]} />}
            {currentRoom === 'library' && <LibraryRoom position={[0, 0, 0]} />}
            {currentRoom === 'bedroom' && <BedroomRoom position={[0, 0, 0]} />}
            {currentRoom === 'kitchen' && <KitchenRoom position={[0, 0, 0]} />}
            {currentRoom === 'washroom' && <WashroomRoom position={[0, 0, 0]} />}
            {currentRoom === 'terrace' && <TerraceRoom position={[0, 0, 0]} />}
          </>
        ) : (
          // Interior view: Show ALL rooms in realistic 2-floor house layout
          <>
            {/* MAIN HOUSE FOUNDATION & STRUCTURE */}
            {/* Ground Floor Base */}
            <mesh position={[0, -0.2, 0]} receiveShadow>
              <boxGeometry args={[16, 0.4, 12]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
            
            {/* First Floor Base */}
            <mesh position={[0, 4.8, 0]} receiveShadow>
              <boxGeometry args={[16, 0.4, 12]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
            
            {/* GROUND FLOOR - 3 Rooms in realistic layout */}
            <group>
              {/* Living Room - Front Center */}
              <HallRoom position={[0, 0, 2]} />
              {currentRoom === 'hall' && (
                <mesh position={[0, 0.05, 2]}>
                  <boxGeometry args={[12.5, 0.1, 10.5]} />
                  <meshStandardMaterial 
                    color="#FFD700" 
                    transparent 
                    opacity={0.3}
                    emissive="#FFD700"
                    emissiveIntensity={0.2}
                  />
                </mesh>
              )}
            </group>
            
            <group>
              {/* Kitchen - Back Right */}
              <KitchenRoom position={[5, 0, -4]} />
              {currentRoom === 'kitchen' && (
                <mesh position={[5, 0.05, -4]}>
                  <boxGeometry args={[8.5, 0.1, 6.5]} />
                  <meshStandardMaterial 
                    color="#FF6347" 
                    transparent 
                    opacity={0.3}
                    emissive="#FF6347"
                    emissiveIntensity={0.2}
                  />
                </mesh>
              )}
            </group>
            
            <group>
              {/* Study/Library - Back Left */}
              <LibraryRoom position={[-5, 0, -4]} />
              {currentRoom === 'library' && (
                <mesh position={[-5, 0.05, -4]}>
                  <boxGeometry args={[8.5, 0.1, 8.5]} />
                  <meshStandardMaterial 
                    color="#4169E1" 
                    transparent 
                    opacity={0.3}
                    emissive="#4169E1"
                    emissiveIntensity={0.2}
                  />
                </mesh>
              )}
            </group>
            
            {/* STAIRCASE - Connecting floors - Individual Steps */}
            <group position={[7, 2.5, 0]}>
              {/* Individual stair steps */}
              <mesh position={[0, -2, 0]} castShadow>
                <boxGeometry args={[1.5, 0.2, 0.3]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              <mesh position={[0, -1.5, 0.3]} castShadow>
                <boxGeometry args={[1.5, 0.2, 0.3]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              <mesh position={[0, -1, 0.6]} castShadow>
                <boxGeometry args={[1.5, 0.2, 0.3]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              <mesh position={[0, -0.5, 0.9]} castShadow>
                <boxGeometry args={[1.5, 0.2, 0.3]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              <mesh position={[0, 0, 1.2]} castShadow>
                <boxGeometry args={[1.5, 0.2, 0.3]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              <mesh position={[0, 0.5, 1.5]} castShadow>
                <boxGeometry args={[1.5, 0.2, 0.3]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              <mesh position={[0, 1, 1.8]} castShadow>
                <boxGeometry args={[1.5, 0.2, 0.3]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              <mesh position={[0, 1.5, 2.1]} castShadow>
                <boxGeometry args={[1.5, 0.2, 0.3]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              <mesh position={[0, 2, 2.4]} castShadow>
                <boxGeometry args={[1.5, 0.2, 0.3]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              <mesh position={[0, 2.5, 2.7]} castShadow>
                <boxGeometry args={[1.5, 0.2, 0.3]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              
              {/* Stair railings */}
              <mesh position={[0.6, 2.5, 1.5]} castShadow>
                <boxGeometry args={[0.1, 5, 0.1]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              <mesh position={[-0.6, 2.5, 1.5]} castShadow>
                <boxGeometry args={[0.1, 5, 0.1]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
            </group>
            
            {/* FIRST FLOOR - 2 Rooms with optimal spacing */}
            <group>
              {/* Bedroom - Left-center of first floor */}
              <BedroomRoom position={[-4, 5, 2]} />
              {currentRoom === 'bedroom' && (
                <mesh position={[-4, 5.05, 2]}>
                  <boxGeometry args={[8.5, 0.1, 6.5]} />
                  <meshStandardMaterial 
                    color="#DDA0DD" 
                    transparent 
                    opacity={0.3}
                    emissive="#DDA0DD"
                    emissiveIntensity={0.2}
                  />
                </mesh>
              )}
            </group>
            
            <group>
              {/* Washroom - Right-center of first floor */}
              <WashroomRoom position={[4, 5, 2]} />
              {currentRoom === 'washroom' && (
                <mesh position={[4, 5.05, 2]}>
                  <boxGeometry args={[6.5, 0.1, 6.5]} />
                  <meshStandardMaterial 
                    color="#00CED1" 
                    transparent 
                    opacity={0.3}
                    emissive="#00CED1"
                    emissiveIntensity={0.2}
                  />
                </mesh>
              )}
            </group>
            
            {/* SECOND FLOOR / ROOFTOP - Terrace */}
            <group>
              {/* Terrace - Rooftop level */}
              <TerraceRoom position={[0, 10, 0]} />
              {currentRoom === 'terrace' && (
                <mesh position={[0, 10.05, 0]}>
                  <boxGeometry args={[12, 0.1, 8]} />
                  <meshStandardMaterial 
                    color="#32CD32" 
                    transparent 
                    opacity={0.3}
                    emissive="#32CD32"
                    emissiveIntensity={0.2}
                  />
                </mesh>
              )}
            </group>
            
            {/* CONNECTING HALLWAYS */}
            {/* Ground floor hallway */}
            <mesh position={[0, 0.1, -1]} receiveShadow>
              <boxGeometry args={[14, 0.2, 2]} />
              <meshStandardMaterial color="#F5F5DC" roughness={0.8} />
            </mesh>
            
            {/* First floor hallway - optimized for closer room spacing */}
            <mesh position={[0, 5.1, 2]} receiveShadow>
              <boxGeometry args={[12, 0.2, 3]} />
              <meshStandardMaterial color="#F5F5DC" roughness={0.8} />
            </mesh>
            
            {/* Central connecting area between rooms */}
            <mesh position={[0, 5.1, -1]} receiveShadow>
              <boxGeometry args={[4, 0.2, 6]} />
              <meshStandardMaterial color="#F0E68C" roughness={0.8} />
            </mesh>
            
            {/* Second floor base for terrace */}
            <mesh position={[0, 9.8, 0]} receiveShadow>
              <boxGeometry args={[14, 0.4, 10]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
            
            {/* Rooftop terrace access stairs - Individual Steps */}
            <group position={[0, 7.5, -6]}>
              {/* Individual stair steps to terrace */}
              <mesh position={[0, -0.6, 0]} castShadow>
                <boxGeometry args={[1.5, 0.15, 0.25]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              <mesh position={[0, -0.3, 0.2]} castShadow>
                <boxGeometry args={[1.5, 0.15, 0.25]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              <mesh position={[0, 0, 0.4]} castShadow>
                <boxGeometry args={[1.5, 0.15, 0.25]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              <mesh position={[0, 0.3, 0.6]} castShadow>
                <boxGeometry args={[1.5, 0.15, 0.25]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              <mesh position={[0, 0.6, 0.8]} castShadow>
                <boxGeometry args={[1.5, 0.15, 0.25]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              <mesh position={[0, 0.9, 1.0]} castShadow>
                <boxGeometry args={[1.5, 0.15, 0.25]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              <mesh position={[0, 1.2, 1.2]} castShadow>
                <boxGeometry args={[1.5, 0.15, 0.25]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              <mesh position={[0, 1.5, 1.4]} castShadow>
                <boxGeometry args={[1.5, 0.15, 0.25]} />
                <meshStandardMaterial color="#D2691E" />
              </mesh>
              
              {/* Stair railings for terrace access */}
              <mesh position={[0.6, 1.2, 0.8]} castShadow>
                <boxGeometry args={[0.08, 2.4, 0.08]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              <mesh position={[-0.6, 1.2, 0.8]} castShadow>
                <boxGeometry args={[0.08, 2.4, 0.08]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
            </group>
            
            {/* SUPPORT PILLARS - Simplified single structures */}
            <mesh position={[-6, 5, -6]} castShadow>
              <boxGeometry args={[0.3, 10, 0.3]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[6, 5, -6]} castShadow>
              <boxGeometry args={[0.3, 10, 0.3]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[-6, 5, 8]} castShadow>
              <boxGeometry args={[0.3, 10, 0.3]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[6, 5, 8]} castShadow>
              <boxGeometry args={[0.3, 10, 0.3]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
          </>
        )}

        {/* Ground shadows */}
        <ContactShadows 
          position={[0, 0, 0]} 
          opacity={0.3} 
          scale={25} 
          blur={2} 
          far={15} 
        />
      </group>
    );
  }

  // Exterior view
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
      <ambientLight intensity={isNight ? 0.3 : 0.6} color={isNight ? '#4a5568' : '#fff8e1'} />
      <directionalLight 
        position={[15, 15, 10]} 
        intensity={isNight ? 0.4 : 1.2}
        color={isNight ? '#9ca3af' : '#ffffff'}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Modern Victorian-Style House */}
      <Float speed={0.2} rotationIntensity={0.05} floatIntensity={0.05}>
        <group>
          {/* Main House Structure - Two Stories */}
          <mesh position={[0, 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[10, 4, 8]} />
            <meshStandardMaterial 
              color={isNight ? '#F5F5DC' : '#FFFAF0'} 
              roughness={0.4} 
              metalness={0.05}
            />
          </mesh>

          {/* Second Floor */}
          <mesh position={[0, 5, 0]} castShadow receiveShadow>
            <boxGeometry args={[8, 2, 6]} />
            <meshStandardMaterial 
              color={isNight ? '#F0E68C' : '#FFF8DC'} 
              roughness={0.4} 
              metalness={0.05}
            />
          </mesh>

          {/* Victorian-Style Roof */}
          <mesh position={[0, 6.5, 0]} castShadow>
            <coneGeometry args={[6, 2, 4]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </mesh>

          {/* Terrace on Second Floor */}
          <mesh position={[0, 6.2, -4]} castShadow receiveShadow>
            <boxGeometry args={[8, 0.4, 2]} />
            <meshStandardMaterial color="#D2B48C" roughness={0.7} />
          </mesh>

          {/* Terrace Railing */}
          <mesh position={[0, 7.2, -5]} castShadow>
            <boxGeometry args={[8, 2, 0.1]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>

          {/* Chimney */}
          <mesh position={[2, 7, 1]} castShadow>
            <boxGeometry args={[0.6, 1.5, 0.6]} />
            <meshStandardMaterial color="#B22222" roughness={0.9} />
          </mesh>

          {/* Grand Front Door */}
          <mesh position={[0, 1.5, 4.01]} castShadow>
            <boxGeometry args={[1.5, 3, 0.15]} />
            <meshStandardMaterial color="#8B4513" roughness={0.6} />
          </mesh>

          {/* Door Handle */}
          <mesh position={[0.6, 1.5, 4.1]}>
            <sphereGeometry args={[0.08]} />
            <meshStandardMaterial color="#DAA520" roughness={0.1} metalness={0.9} />
          </mesh>

          {/* Windows - First Floor */}
          {[-3, -1, 1, 3].map((x, i) => (
            <group key={`window1-${i}`}>
              {/* Window Frame */}
              <mesh position={[x, 2, 4.01]} castShadow>
                <boxGeometry args={[1.2, 1.8, 0.1]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
              {/* Window Glass */}
              <mesh position={[x, 2, 4.05]}>
                <boxGeometry args={[1.1, 1.7, 0.02]} />
                <meshStandardMaterial 
                  color={isNight ? '#FFE4B5' : '#87ceeb'} 
                  transparent 
                  opacity={0.7}
                  emissive={isNight ? '#FFE4B5' : '#000000'}
                  emissiveIntensity={isNight ? 0.3 : 0}
                />
              </mesh>
              {/* Window Cross */}
              <mesh position={[x, 2, 4.06]}>
                <boxGeometry args={[0.05, 1.7, 0.01]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              <mesh position={[x, 2, 4.06]}>
                <boxGeometry args={[1.1, 0.05, 0.01]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
            </group>
          ))}

          {/* Windows - Second Floor */}
          {[-2, 0, 2].map((x, i) => (
            <group key={`window2-${i}`}>
              <mesh position={[x, 5, 3.01]} castShadow>
                <boxGeometry args={[1, 1.2, 0.1]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
              <mesh position={[x, 5, 3.05]}>
                <boxGeometry args={[0.9, 1.1, 0.02]} />
                <meshStandardMaterial 
                  color={isNight ? '#FFE4B5' : '#87ceeb'} 
                  transparent 
                  opacity={0.7}
                  emissive={isNight ? '#FFE4B5' : '#000000'}
                  emissiveIntensity={isNight ? 0.3 : 0}
                />
              </mesh>
            </group>
          ))}

          {/* Front Steps */}
          <mesh position={[0, 0.15, 5.5]} receiveShadow>
            <boxGeometry args={[2.5, 0.3, 1]} />
            <meshStandardMaterial color="#D3D3D3" roughness={0.7} />
          </mesh>

          {/* Pillars */}
          {[-1.5, 1.5].map((x, i) => (
            <mesh key={`pillar-${i}`} position={[x, 2.5, 4.2]} castShadow>
              <cylinderGeometry args={[0.15, 0.15, 4]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
            </mesh>
          ))}

          {/* Garden Elements */}
          {/* Garden Bed */}
          <mesh position={[0, 0.05, 8]} receiveShadow>
            <boxGeometry args={[16, 0.1, 4]} />
            <meshStandardMaterial color="#228B22" roughness={0.9} />
          </mesh>

          {/* Decorative Trees */}
          {[-6, -3, 3, 6].map((x, i) => (
            <group key={`tree-${i}`} position={[x, 0, 8]}>
              {/* Tree Trunk */}
              <mesh position={[0, 1, 0]} castShadow>
                <cylinderGeometry args={[0.15, 0.2, 2]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              {/* Tree Crown */}
              <mesh position={[0, 2.5, 0]} castShadow>
                <sphereGeometry args={[0.8]} />
                <meshStandardMaterial color="#228B22" roughness={0.8} />
              </mesh>
            </group>
          ))}

          {/* Flower Beds */}
          {[-4, -1, 1, 4].map((x, i) => (
            <group key={`flower-${i}`} position={[x, 0.15, 6.5]}>
              <mesh>
                <sphereGeometry args={[0.2]} />
                <meshStandardMaterial color={['#FF69B4', '#FF6347', '#9370DB', '#FFD700'][i]} />
              </mesh>
            </group>
          ))}

          {/* Pathway */}
          <mesh position={[0, 0.02, 6]} receiveShadow>
            <boxGeometry args={[2, 0.04, 4]} />
            <meshStandardMaterial color="#D2B48C" roughness={0.8} />
          </mesh>

          {/* House Sign */}
          <Float speed={0.8} rotationIntensity={0.1}>
            <Text
              position={[0, 3.5, 4.5]}
              fontSize={0.4}
              color={isNight ? '#DAA520' : '#8B4513'}
              anchorX="center"
              anchorY="middle"
            >
              BEAUTIFUL HOME
            </Text>
          </Float>
        </group>
      </Float>

      {/* Ground */}
      <ContactShadows 
        position={[0, -0.1, 0]} 
        opacity={0.5} 
        scale={25} 
        blur={2} 
        far={15} 
      />
    </group>
  );
}

// Central Hallway System Component
function CentralHallway({ currentRoom }: { currentRoom: string }) {
  const { isNight } = useTheme();
  
  return (
    <group>
      {/* GROUND FLOOR HALLWAYS - Connecting 3 rooms */}
      
      {/* Main Central Hallway */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[16, 0.2, 3]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.8} />
      </mesh>
      
      {/* Left Wing Hallway to Kitchen & Library */}
      <mesh position={[-6, 0.1, 0]} receiveShadow>
        <boxGeometry args={[12, 0.2, 3]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.8} />
      </mesh>
      
      {/* Vertical Connector to Kitchen & Library */}
      <mesh position={[-12, 0.1, -2]} receiveShadow>
        <boxGeometry args={[3, 0.2, 16]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.8} />
      </mesh>

      {/* GROUND FLOOR WALLS */}
      <mesh position={[0, 2, -1.5]} receiveShadow>
        <boxGeometry args={[16, 4, 0.2]} />
        <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
      </mesh>
      <mesh position={[0, 2, 1.5]} receiveShadow>
        <boxGeometry args={[16, 4, 0.2]} />
        <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
      </mesh>

      {/* STAIRCASE - Connecting Ground Floor to First Floor */}
      {/* Stair Steps - More realistic positioning */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[8, 0.3 + (i * 0.5), -2 + (i * 0.4)]} castShadow>
          <boxGeometry args={[2, 0.2, 0.8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.7} />
        </mesh>
      ))}
      
      {/* Stair Railings */}
      <mesh position={[7, 3, 1]} castShadow>
        <boxGeometry args={[0.1, 5, 6]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[9, 3, 1]} castShadow>
        <boxGeometry args={[0.1, 5, 6]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* FIRST FLOOR HALLWAYS - Connecting 2 rooms + terrace */}
      
      {/* First Floor Main Hallway */}
      <mesh position={[6, 5.1, 0]} receiveShadow>
        <boxGeometry args={[12, 0.2, 3]} />
        <meshStandardMaterial color="#F0E68C" roughness={0.8} />
      </mesh>
      
      {/* Right Wing Hallway to Bedroom & Washroom */}
      <mesh position={[12, 5.1, 0]} receiveShadow>
        <boxGeometry args={[3, 0.2, 12]} />
        <meshStandardMaterial color="#F0E68C" roughness={0.8} />
      </mesh>
      
      {/* Terrace Connector */}
      <mesh position={[0, 5.1, 10]} receiveShadow>
        <boxGeometry args={[3, 0.2, 10]} />
        <meshStandardMaterial color="#F0E68C" roughness={0.8} />
      </mesh>

      {/* FIRST FLOOR WALLS */}
      <mesh position={[6, 7, -1.5]} receiveShadow>
        <boxGeometry args={[12, 4, 0.2]} />
        <meshStandardMaterial color="#FFF8DC" roughness={0.6} />
      </mesh>
      <mesh position={[6, 7, 1.5]} receiveShadow>
        <boxGeometry args={[12, 4, 0.2]} />
        <meshStandardMaterial color="#FFF8DC" roughness={0.6} />
      </mesh>
      <mesh position={[1.5, 2, 8]} receiveShadow>
        <boxGeometry args={[0.2, 4, 8]} />
        <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
      </mesh>

      {/* Decorative Elements in Hallway */}
      {/* Wall Art/Paintings */}
      {[-6, -2, 2, 6].map((x, i) => (
        <group key={`art-${i}`}>
          <mesh position={[x, 2.5, 1.48]} castShadow>
            <boxGeometry args={[0.8, 0.6, 0.05]} />
            <meshStandardMaterial color={['#8B4513', '#DAA520', '#B22222', '#4169E1'][i]} />
          </mesh>
          <mesh position={[x, 2.5, 1.45]} castShadow>
            <boxGeometry args={[0.7, 0.5, 0.02]} />
            <meshStandardMaterial color="#FFFAF0" />
          </mesh>
        </group>
      ))}
      
      {/* Hallway Lighting - Ceiling Lights */}
      {[-4, 0, 4].map((x, i) => (
        <mesh key={`light-${i}`} position={[x, 3.8, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.1]} />
          <meshStandardMaterial 
            color={isNight ? '#FFF8DC' : '#FFFFFF'} 
            emissive={isNight ? '#FFF8DC' : '#000000'}
            emissiveIntensity={isNight ? 0.6 : 0}
          />
        </mesh>
      ))}

      {/* Hallway Runner Carpet */}
      <mesh position={[0, 0.22, 0]} receiveShadow>
        <boxGeometry args={[15, 0.02, 1.5]} />
        <meshStandardMaterial color="#B22222" roughness={0.9} />
      </mesh>
      
      <mesh position={[0, 0.22, -6]} receiveShadow>
        <boxGeometry args={[1.5, 0.02, 11]} />
        <meshStandardMaterial color="#B22222" roughness={0.9} />
      </mesh>

      {isNight && (
        <>
          {[-4, 0, 4].map((x, i) => (
            <pointLight
              key={`hallway-light-${i}`}
              position={[x, 3.5, 0]}
              intensity={0.8}
              color="#FFF8DC"
              castShadow
            />
          ))}
        </>
      )}
    </group>
  );
}

// Room Connections Component - Doorways and Transitions
function RoomConnections({ currentRoom }: { currentRoom: string }) {
  const { isNight } = useTheme();
  
  return (
    <group>
      {/* Door Frames and Doorways */}
      
      {/* Library Door (Left side) */}
      <group position={[-6, 0, -4]}>
        <mesh position={[0, 2, 0]} castShadow>
          <boxGeometry args={[0.2, 4, 1.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 2, -1]} castShadow>
          <boxGeometry args={[0.2, 4, 1.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 3.8, -0.5]} castShadow>
          <boxGeometry args={[0.2, 0.4, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Door Label */}
        <Text
          position={[0.2, 3.5, -0.5]}
          fontSize={0.2}
          color="#8B4513"
          rotation={[0, Math.PI/2, 0]}
        >
          📚 LIBRARY
        </Text>
      </group>

      {/* Bedroom Door (Right side) */}
      <group position={[6, 0, -4]}>
        <mesh position={[0, 2, 0]} castShadow>
          <boxGeometry args={[0.2, 4, 1.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 2, -1]} castShadow>
          <boxGeometry args={[0.2, 4, 1.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 3.8, -0.5]} castShadow>
          <boxGeometry args={[0.2, 0.4, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <Text
          position={[-0.2, 3.5, -0.5]}
          fontSize={0.2}
          color="#8B4513"
          rotation={[0, -Math.PI/2, 0]}
        >
          🛏️ BEDROOM
        </Text>
      </group>

      {/* Kitchen Door (Left back) */}
      <group position={[-6, 0, 4]}>
        <mesh position={[0, 2, 0]} castShadow>
          <boxGeometry args={[0.2, 4, 1.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 2, 1]} castShadow>
          <boxGeometry args={[0.2, 4, 1.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 3.8, 0.5]} castShadow>
          <boxGeometry args={[0.2, 0.4, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <Text
          position={[0.2, 3.5, 0.5]}
          fontSize={0.2}
          color="#8B4513"
          rotation={[0, Math.PI/2, 0]}
        >
          🍳 KITCHEN
        </Text>
      </group>

      {/* Washroom Door (Right back) */}
      <group position={[6, 0, 4]}>
        <mesh position={[0, 2, 0]} castShadow>
          <boxGeometry args={[0.2, 4, 1.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 2, 1]} castShadow>
          <boxGeometry args={[0.2, 4, 1.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 3.8, 0.5]} castShadow>
          <boxGeometry args={[0.2, 0.4, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <Text
          position={[-0.2, 3.5, 0.5]}
          fontSize={0.2}
          color="#8B4513"
          rotation={[0, -Math.PI/2, 0]}
        >
          🚿 WASHROOM
        </Text>
      </group>

      {/* Terrace Door/Opening */}
      <group position={[0, 0, 10]}>
        <mesh position={[-1, 2, 0]} castShadow>
          <boxGeometry args={[1, 4, 0.2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[1, 2, 0]} castShadow>
          <boxGeometry args={[1, 4, 0.2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 3.8, 0]} castShadow>
          <boxGeometry args={[2, 0.4, 0.2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <Text
          position={[0, 3.5, 0.2]}
          fontSize={0.2}
          color="#8B4513"
        >
          🏞️ TERRACE
        </Text>
      </group>

      {/* Transition Indicators - Subtle lighting to show connections */}
      {currentRoom !== 'hall' && (
        <>
          {/* Light paths showing room connections */}
          <mesh position={[-6, 0.25, -2]} receiveShadow>
            <boxGeometry args={[0.1, 0.05, 4]} />
            <meshStandardMaterial 
              color="#FFD700" 
              emissive="#FFD700" 
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh position={[6, 0.25, -2]} receiveShadow>
            <boxGeometry args={[0.1, 0.05, 4]} />
            <meshStandardMaterial 
              color="#FFD700" 
              emissive="#FFD700" 
              emissiveIntensity={0.3}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

export default function StudyHome3D({ 
  position = [0, 0, 0],
  showStudyRoom = false,
  currentRoom = 'exterior',
  viewMode = 'exterior'
}: StudyHome3DProps) {
  return (
    <group position={position}>
      <Suspense fallback={null}>
        <StudyHomeContent showStudyRoom={showStudyRoom} currentRoom={currentRoom} viewMode={viewMode} />
      </Suspense>
    </group>
  );
}