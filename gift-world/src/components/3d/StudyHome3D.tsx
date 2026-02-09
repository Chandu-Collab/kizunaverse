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
}

function StudyHomeContent({ 
  showStudyRoom = false, 
  currentRoom = 'exterior' 
}: { 
  showStudyRoom?: boolean;
  currentRoom?: 'library' | 'bedroom' | 'kitchen' | 'washroom' | 'hall' | 'terrace' | 'exterior';
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();

  // Animate subtle floating motion
  useFrame((state) => {
    if (groupRef.current && currentRoom === 'exterior') {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.01;
    }
  });

  // Render specific room interior
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

        {/* Room-specific content */}
        {currentRoom === 'library' && <LibraryRoom />}
        {currentRoom === 'bedroom' && <BedroomRoom />}
        {currentRoom === 'kitchen' && <KitchenRoom />}
        {currentRoom === 'washroom' && <WashroomRoom />}
        {currentRoom === 'hall' && <HallRoom />}
        {currentRoom === 'terrace' && <TerraceRoom />}

        {/* Ground shadows */}
        <ContactShadows 
          position={[0, 0, 0]} 
          opacity={0.3} 
          scale={15} 
          blur={2} 
          far={10} 
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

export default function StudyHome3D({ 
  position = [0, 0, 0],
  showStudyRoom = false,
  currentRoom = 'exterior'
}: StudyHome3DProps) {
  return (
    <group position={position}>
      <Suspense fallback={null}>
        <StudyHomeContent showStudyRoom={showStudyRoom} currentRoom={currentRoom} />
      </Suspense>
    </group>
  );
}