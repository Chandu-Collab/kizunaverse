'use client';

import { useTheme } from '@/hooks/useTheme';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function LuxuryPoolArea() {
  const { isNight } = useTheme();
  const mainPoolWaterRef = useRef<THREE.Mesh>(null);
  const lapPoolWaterRef = useRef<THREE.Mesh>(null);
  const shallowPoolWaterRef = useRef<THREE.Mesh>(null);
  const hotTubWater1Ref = useRef<THREE.Mesh>(null);
  const hotTubWater2Ref = useRef<THREE.Mesh>(null);
  const mainWaveRefs = useRef<THREE.Mesh[]>([]);
  const lapWaveRefs = useRef<THREE.Mesh[]>([]);

  // Animate water with realistic wave effects like the ocean
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Main pool water with dynamic colors and wave movement
    if (mainPoolWaterRef.current) {
      mainPoolWaterRef.current.position.y = 0.02 + Math.sin(time * 0.5) * 0.03;
      const material = mainPoolWaterRef.current.material as THREE.MeshStandardMaterial;
      material.color.setHSL(
        0.52 + Math.sin(time * 0.1) * 0.03,
        0.8 + Math.sin(time * 0.2) * 0.1,
        isNight ? 0.2 : 0.45 + Math.sin(time * 0.15) * 0.08
      );
    }
    
    // Animate main pool wave lines
    mainWaveRefs.current.forEach((wave, i) => {
      if (wave) {
        wave.position.y = 0.04 + Math.sin(time * 0.8 + i) * 0.02;
        wave.position.z = -3 + (time * 0.4 + i * 0.5) % 6;
        const material = wave.material as THREE.MeshStandardMaterial;
        material.opacity = 0.3 + Math.sin(time + i) * 0.15;
      }
    });
    
    // Lap pool water movement with color variations
    if (lapPoolWaterRef.current) {
      lapPoolWaterRef.current.position.y = 0.02 + Math.sin(time * 0.6) * 0.025;
      const material = lapPoolWaterRef.current.material as THREE.MeshStandardMaterial;
      material.color.setHSL(
        0.55 + Math.sin(time * 0.12) * 0.02,
        0.85 + Math.sin(time * 0.18) * 0.08,
        isNight ? 0.18 : 0.42 + Math.sin(time * 0.14) * 0.06
      );
    }
    
    // Animate lap pool wave lines
    lapWaveRefs.current.forEach((wave, i) => {
      if (wave) {
        wave.position.y = 0.04 + Math.sin(time * 0.9 + i) * 0.015;
        wave.position.z = -2.5 + (time * 0.35 + i * 0.4) % 4.5;
        const material = wave.material as THREE.MeshStandardMaterial;
        material.opacity = 0.25 + Math.sin(time * 1.2 + i) * 0.12;
      }
    });
    
    // Shallow pool gentle ripples
    if (shallowPoolWaterRef.current) {
      shallowPoolWaterRef.current.position.y = 0.02 + Math.sin(time * 0.7) * 0.015;
      const material = shallowPoolWaterRef.current.material as THREE.MeshStandardMaterial;
      material.color.setHSL(
        0.48 + Math.sin(time * 0.15) * 0.03,
        0.75 + Math.sin(time * 0.22) * 0.1,
        isNight ? 0.22 : 0.5 + Math.sin(time * 0.17) * 0.08
      );
    }
    
    // Hot tub water bubbling effect with color variations
    if (hotTubWater1Ref.current) {
      hotTubWater1Ref.current.position.y = 0.15 + Math.sin(time * 2) * 0.04;
      const material = hotTubWater1Ref.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.65 + Math.sin(time * 1.5) * 0.1;
    }
    
    if (hotTubWater2Ref.current) {
      hotTubWater2Ref.current.position.y = 0.15 + Math.sin(time * 2.2) * 0.04;
      const material = hotTubWater2Ref.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.65 + Math.sin(time * 1.8) * 0.1;
    }
  });

  return (
    <group>
      {/* PREMIUM LIGHTING SYSTEM - Comprehensive Pool Illumination */}
      
      {/* Main Ambient Lighting */}
      <ambientLight intensity={isNight ? 0.5 : 0.9} color={isNight ? '#ffecd1' : '#fffef5'} />
      
      {/* Primary Directional Light - Simulates sun/moon */}
      <directionalLight 
        position={[12, 15, 10]} 
        intensity={isNight ? 0.6 : 1.3}
        color={isNight ? '#ffb347' : '#ffffff'}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={60}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      
      {/* Secondary Fill Light */}
      <directionalLight 
        position={[-8, 10, -8]} 
        intensity={isNight ? 0.3 : 0.5}
        color={isNight ? '#ffeaa7' : '#f5f5f5'}
      />
      
      {/* Main Pool Illumination - Center pool */}
      <spotLight
        position={[0, 8, 0]}
        target-position={[0, 0.5, 0]}
        intensity={isNight ? 2.5 : 2.8}
        color={isNight ? '#87ceeb' : '#ffffff'}
        angle={Math.PI / 3}
        penumbra={0.5}
        distance={20}
        castShadow
      />
      
      {/* Lap Pool Lighting - Left side */}
      <spotLight
        position={[-8, 7, 0]}
        target-position={[-8, 0.5, 0]}
        intensity={isNight ? 2.0 : 2.3}
        color={isNight ? '#4fc3f7' : '#ffffff'}
        angle={Math.PI / 4}
        penumbra={0.4}
        distance={15}
      />
      
      {/* Hot Tub Lighting - Right side */}
      <spotLight
        position={[8, 6, 0]}
        target-position={[8, 1.5, 0]}
        intensity={isNight ? 1.8 : 2.1}
        color={isNight ? '#ffa726' : '#ffffff'}
        angle={Math.PI / 5}
        penumbra={0.3}
        distance={12}
      />
      
      {/* Shallow Leisure Pool Lighting - Back */}
      <spotLight
        position={[0, 7, -8]}
        target-position={[0, 0.3, -7.5]}
        intensity={isNight ? 1.9 : 2.2}
        color={isNight ? '#81c784' : '#ffffff'}
        angle={Math.PI / 4}
        penumbra={0.4}
        distance={14}
      />
      
      {/* Poolside Bar Area Lighting */}
      <spotLight
        position={[-5, 5, 6]}
        target-position={[-5, 0.8, 5.5]}
        intensity={isNight ? 2.2 : 2.6}
        color={isNight ? '#ffd700' : '#ffffff'}
        angle={Math.PI / 6}
        penumbra={0.3}
        distance={12}
      />
      
      {/* Lounger Seating Area - Left front */}
      <spotLight
        position={[-10, 6, 4]}
        target-position={[-9, 0, 4]}
        intensity={isNight ? 1.6 : 1.9}
        color={isNight ? '#81c784' : '#ffffff'}
        angle={Math.PI / 7}
        penumbra={0.4}
        distance={10}
      />
      
      {/* Lounger Seating Area - Right front */}
      <spotLight
        position={[10, 6, 4]}
        target-position={[9, 0, 4]}
        intensity={isNight ? 1.6 : 1.9}
        color={isNight ? '#81c784' : '#ffffff'}
        angle={Math.PI / 7}
        penumbra={0.4}
        distance={10}
      />
      
      {/* Changing Rooms Lighting - Back left */}
      <pointLight
        position={[-10, 4, -6]}
        intensity={isNight ? 1.4 : 1.7}
        color={isNight ? '#f39c12' : '#ffffff'}
        distance={8}
      />
      
      {/* Towel Station Lighting */}
      <pointLight
        position={[-7, 3, 6]}
        intensity={isNight ? 1.3 : 1.6}
        color={isNight ? '#ffd700' : '#ffffff'}
        distance={7}
      />
      
      {/* Arcade/Water Features Lighting - Right back */}
      <pointLight
        position={[10, 4, -5]}
        intensity={isNight ? 1.4 : 1.7}
        color={isNight ? '#64b5f6' : '#ffffff'}
        distance={8}
      />
      
      {/* POOL DECK - Premium Marble Flooring */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 15]} />
        <meshStandardMaterial 
          color="#F5F5F5" 
          roughness={0.15} 
          metalness={0.2}
          envMapIntensity={0.7}
        />
      </mesh>
      
      {/* Decorative Striping - Safety line moved to side walkway */}
      <mesh position={[-9.3, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.3, 15]} />
        <meshStandardMaterial color="#3498DB" roughness={0.8} />
      </mesh>
      
      {/* POOL WALLS - Extended for large pool complex */}
      {/* Back wall */}
      <mesh position={[0, 2, -7.5]} receiveShadow>
        <boxGeometry args={[20, 4, 0.2]} />
        <meshStandardMaterial color="#E8F4F8" roughness={0.4} />
      </mesh>
      
      {/* Left wall */}
      <mesh position={[-10, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 15]} />
        <meshStandardMaterial color="#E8F4F8" roughness={0.4} />
      </mesh>
      
      {/* Right wall */}
      <mesh position={[10, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 15]} />
        <meshStandardMaterial color="#E8F4F8" roughness={0.4} />
      </mesh>
      
      {/* Front open entrance - No wall for visibility */}
      
      {/* NO CEILING - Open air pool for visibility */}
      
      {/* ====== MAIN OLYMPIC POOL - Center ====== */}
      <group position={[0, 0, 0]}>
        {/* Pool bottom */}
        <mesh position={[0, -2, 0]} receiveShadow>
          <boxGeometry args={[8, 0.1, 6]} />
          <meshStandardMaterial color="#1E88E5" roughness={0.1} />
        </mesh>

        {/* Main pool cavity walls */}
        <mesh position={[4, -1, 0]} receiveShadow>
          <boxGeometry args={[0.2, 2, 6]} />
          <meshStandardMaterial color="#1A4F7A" roughness={0.2} />
        </mesh>
        <mesh position={[-4, -1, 0]} receiveShadow>
          <boxGeometry args={[0.2, 2, 6]} />
          <meshStandardMaterial color="#1A4F7A" roughness={0.2} />
        </mesh>
        <mesh position={[0, -1, 3]} receiveShadow>
          <boxGeometry args={[8, 2, 0.2]} />
          <meshStandardMaterial color="#1A4F7A" roughness={0.2} />
        </mesh>
        <mesh position={[0, -1, -3]} receiveShadow>
          <boxGeometry args={[8, 2, 0.2]} />
          <meshStandardMaterial color="#1A4F7A" roughness={0.2} />
        </mesh>
        
        {/* Pool water - Realistic animated water surface */}
        <mesh ref={mainPoolWaterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
          <planeGeometry args={[8, 6, 48, 32]} />
          <meshStandardMaterial 
            color={isNight ? "#0B2447" : "#00B8D4"} 
            transparent 
            opacity={isNight ? 0.7 : 0.85}
            roughness={isNight ? 0.08 : 0.02}
            metalness={isNight ? 0.4 : 0.15}
            envMapIntensity={isNight ? 1.5 : 2.2}
            emissive={isNight ? "#001a33" : "#000000"}
            emissiveIntensity={isNight ? 0.25 : 0}
          />
        </mesh>
        
        {/* Wave lines moving across pool */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh 
            key={`main-wave-${i}`}
            ref={(el) => { if (el) mainWaveRefs.current[i] = el; }}
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, 0.04, -3 + i * 0.75]}
          >
            <planeGeometry args={[7 + Math.sin(i) * 1, 0.12 + Math.cos(i) * 0.05]} />
            <meshStandardMaterial 
              color={isNight ? "#B0E0E6" : "#E0F7FA"}
              transparent
              opacity={isNight ? 0.35 : 0.4}
              emissive={isNight ? "#4FC3F7" : "#FFFFFF"}
              emissiveIntensity={isNight ? 0.3 : 0.25}
            />
          </mesh>
        ))}

        {/* Main pool ladder - right front */}
        <mesh position={[3.3, -0.55, 2.2]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 1.4, 8]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[3.6, -0.55, 2.2]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 1.4, 8]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.15} />
        </mesh>
        {[0.0, -0.3, -0.6, -0.9].map((y, i) => (
          <mesh key={`main-ladder-rung-${i}`} position={[3.45, y, 2.2]} castShadow>
            <boxGeometry args={[0.35, 0.03, 0.05]} />
            <meshStandardMaterial color="#B0B0B0" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}

        {/* Main pool depth markers */}
        {[
          [0, 0.02, 3.25],
          [0, 0.02, -3.25],
          [4.25, 0.02, 0],
          [-4.25, 0.02, 0],
        ].map((pos, i) => (
          <group key={`main-depth-marker-${i}`} position={pos as [number, number, number]}>
            <mesh receiveShadow>
              <boxGeometry args={[0.65, 0.02, 0.3]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.012, 0]} receiveShadow>
              <boxGeometry args={[0.42, 0.008, 0.08]} />
              <meshStandardMaterial color="#2F3B52" roughness={0.45} metalness={0.2} />
            </mesh>
          </group>
        ))}

        {/* Underwater lighting - Rope lights along bottom */}
        <pointLight
          position={[0, -1.8, 0]}
          intensity={isNight ? 2.0 : 0.8}
          color="#87ceeb"
          distance={8}
        />
      </group>
      
      {/* ====== LAP POOL - Left side ====== */}
      <group position={[-7, 0, -1]}>
        {/* Pool bottom */}
        <mesh position={[0, -1.8, 0]} receiveShadow>
          <boxGeometry args={[2.5, 0.1, 4.5]} />
          <meshStandardMaterial color="#1565C0" roughness={0.1} />
        </mesh>

        {/* Lap pool cavity walls */}
        <mesh position={[1.25, -0.9, 0]} receiveShadow>
          <boxGeometry args={[0.15, 1.8, 4.5]} />
          <meshStandardMaterial color="#1A4F7A" roughness={0.2} />
        </mesh>
        <mesh position={[-1.25, -0.9, 0]} receiveShadow>
          <boxGeometry args={[0.15, 1.8, 4.5]} />
          <meshStandardMaterial color="#1A4F7A" roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.9, 2.25]} receiveShadow>
          <boxGeometry args={[2.5, 1.8, 0.15]} />
          <meshStandardMaterial color="#1A4F7A" roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.9, -2.25]} receiveShadow>
          <boxGeometry args={[2.5, 1.8, 0.15]} />
          <meshStandardMaterial color="#1A4F7A" roughness={0.2} />
        </mesh>
        
        {/* Pool water - Realistic wave surface */}
        <mesh ref={lapPoolWaterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
          <planeGeometry args={[2.5, 4.5, 20, 28]} />
          <meshStandardMaterial 
            color={isNight ? "#0A1E3D" : "#0091EA"} 
            transparent 
            opacity={isNight ? 0.68 : 0.82}
            roughness={isNight ? 0.1 : 0.03}
            metalness={isNight ? 0.35 : 0.12}
            envMapIntensity={isNight ? 1.4 : 2.0}
            emissive={isNight ? "#001528" : "#000000"}
            emissiveIntensity={isNight ? 0.22 : 0}
          />
        </mesh>
        
        {/* Wave lines for lap pool */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh 
            key={`lap-wave-${i}`}
            ref={(el) => { if (el) lapWaveRefs.current[i] = el; }}
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, 0.04, -2.5 + i * 0.75]}
          >
            <planeGeometry args={[2.2 + Math.sin(i) * 0.2, 0.08]} />
            <meshStandardMaterial 
              color={isNight ? "#ADD8E6" : "#E1F5FE"}
              transparent
              opacity={isNight ? 0.3 : 0.35}
              emissive={isNight ? "#29B6F6" : "#FFFFFF"}
              emissiveIntensity={isNight ? 0.25 : 0.2}
            />
          </mesh>
        ))}

        {/* Lap pool ladder - near entrance side */}
        <mesh position={[0.75, -0.5, 1.8]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 1.2, 8]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[1.0, -0.5, 1.8]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 1.2, 8]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.15} />
        </mesh>
        {[0.0, -0.25, -0.5, -0.75].map((y, i) => (
          <mesh key={`lap-ladder-rung-${i}`} position={[0.875, y, 1.8]} castShadow>
            <boxGeometry args={[0.28, 0.025, 0.04]} />
            <meshStandardMaterial color="#B0B0B0" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}

        {/* Lap pool depth markers */}
        {[
          [0, 0.02, 2.45],
          [0, 0.02, -2.45],
        ].map((pos, i) => (
          <group key={`lap-depth-marker-${i}`} position={pos as [number, number, number]}>
            <mesh receiveShadow>
              <boxGeometry args={[0.5, 0.02, 0.22]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.012, 0]} receiveShadow>
              <boxGeometry args={[0.3, 0.008, 0.07]} />
              <meshStandardMaterial color="#2F3B52" roughness={0.45} metalness={0.2} />
            </mesh>
          </group>
        ))}
        
        {/* Lap lane dividers */}
        <mesh position={[0, -0.5, -1.8]} castShadow>
          <boxGeometry args={[2.4, 1, 0.05]} />
          <meshStandardMaterial color="#FFEB3B" roughness={0.8} />
        </mesh>
        
        <mesh position={[0, -0.5, 0]} castShadow>
          <boxGeometry args={[2.4, 1, 0.05]} />
          <meshStandardMaterial color="#FFEB3B" roughness={0.8} />
        </mesh>
        
        {/* Underwater light */}
        <pointLight
          position={[0, -1.6, 0]}
          intensity={isNight ? 1.6 : 0.6}
          color="#64b5f6"
          distance={6}
        />
      </group>
      
      {/* ====== HOT TUBS/JACUZZIS - Right side ====== */}
      <group position={[7, 0, -1]}>
        {/* Hot tub 1 */}
        <mesh position={[0, -1.2, -1.2]} receiveShadow>
          <cylinderGeometry args={[1.2, 1.2, 1.8, 16]} />
          <meshStandardMaterial color="#1565C0" roughness={0.08} />
        </mesh>
        
        {/* Hot tub 1 water - Animated bubbling */}
        <mesh ref={hotTubWater1Ref} position={[0, 0.15, -1.2]} receiveShadow>
          <cylinderGeometry args={[1.3, 1.3, 0.8, 16]} />
          <meshStandardMaterial 
            color="#00838F" 
            transparent 
            opacity={0.7}
            roughness={0.05}
            metalness={0.7}
            envMapIntensity={1.3}
          />
        </mesh>
        
        {/* Hot tub rim */}
        <mesh position={[0, 0.25, -1.2]} castShadow>
          <cylinderGeometry args={[1.35, 1.2, 0.15, 16]} />
          <meshStandardMaterial color="#DCDCDC" metalness={0.8} roughness={0.1} />
        </mesh>
        
        {/* Hot tub 2 - Offset */}
        <mesh position={[0, -1.2, 1.2]} receiveShadow>
          <cylinderGeometry args={[1.2, 1.2, 1.8, 16]} />
          <meshStandardMaterial color="#1565C0" roughness={0.08} />
        </mesh>
        
        {/* Hot tub 2 water - Animated bubbling */}
        <mesh ref={hotTubWater2Ref} position={[0, 0.15, 1.2]} receiveShadow>
          <cylinderGeometry args={[1.3, 1.3, 0.8, 16]} />
          <meshStandardMaterial 
            color="#00838F" 
            transparent 
            opacity={0.7}
            roughness={0.05}
            metalness={0.7}
            envMapIntensity={1.3}
          />
        </mesh>
        
        <mesh position={[0, 0.25, 1.2]} castShadow>
          <cylinderGeometry args={[1.35, 1.2, 0.15, 16]} />
          <meshStandardMaterial color="#DCDCDC" metalness={0.8} roughness={0.1} />
        </mesh>
        
        {/* Bubble jets indicator */}
        <pointLight
          position={[0, 0, 0]}
          intensity={isNight ? 1.4 : 0.5}
          color="#ffa726"
          distance={4}
        />
      </group>
      
      {/* ====== SHALLOW LEISURE POOL - Back area ====== */}
      <group position={[0, 0, -6.5]}>
        {/* Shallow pool base */}
        <mesh position={[0, -0.8, 0]} receiveShadow>
          <boxGeometry args={[5, 0.1, 2.5]} />
          <meshStandardMaterial color="#4DB6AC" roughness={0.08} />
        </mesh>

        {/* Shallow pool cavity walls */}
        <mesh position={[2.5, -0.4, 0]} receiveShadow>
          <boxGeometry args={[0.15, 0.8, 2.5]} />
          <meshStandardMaterial color="#2A7873" roughness={0.2} />
        </mesh>
        <mesh position={[-2.5, -0.4, 0]} receiveShadow>
          <boxGeometry args={[0.15, 0.8, 2.5]} />
          <meshStandardMaterial color="#2A7873" roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.4, 1.25]} receiveShadow>
          <boxGeometry args={[5, 0.8, 0.15]} />
          <meshStandardMaterial color="#2A7873" roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.4, -1.25]} receiveShadow>
          <boxGeometry args={[5, 0.8, 0.15]} />
          <meshStandardMaterial color="#2A7873" roughness={0.2} />
        </mesh>
        
        {/* Shallow water - Realistic gentle ripples */}
        <mesh ref={shallowPoolWaterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
          <planeGeometry args={[5, 2.5, 32, 20]} />
          <meshStandardMaterial 
            color={isNight ? "#0D3D3D" : "#00BCD4"} 
            transparent 
            opacity={isNight ? 0.65 : 0.75}
            roughness={isNight ? 0.12 : 0.04}
            metalness={isNight ? 0.3 : 0.1}
            envMapIntensity={isNight ? 1.3 : 1.8}
            emissive={isNight ? "#004D4D" : "#000000"}
            emissiveIntensity={isNight ? 0.15 : 0}
          />
        </mesh>
        
        {/* Water feature - Central fountain base */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 8]} />
          <meshStandardMaterial 
            color="#FFD700" 
            metalness={0.9}
            emissive={isNight ? '#FFD700' : '#F0E68C'}
            emissiveIntensity={isNight ? 0.6 : 0.2}
          />
        </mesh>
        
        {/* Fountain jets (decorative) - Lower positioning */}
        <mesh position={[-0.5, 0.4, 0]} castShadow>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#87CEEB" emissive="#87CEEB" emissiveIntensity={0.4} transparent opacity={0.8} />
        </mesh>
        
        <mesh position={[0.5, 0.4, 0]} castShadow>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#87CEEB" emissive="#87CEEB" emissiveIntensity={0.4} transparent opacity={0.8} />
        </mesh>
      </group>
      
      {/* ====== POOLSIDE LOUNGE CHAIRS - Left Front ====== */}
      <group position={[-6.5, 0, 4.5]}>
        {/* Lounge chair 1 */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.15, 2]} />
          <meshStandardMaterial color="#FFFF99" roughness={0.5} />
        </mesh>
        
        <mesh position={[0, 0.5, -1]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.4, 0.8]} />
          <meshStandardMaterial color="#FFFF99" roughness={0.5} />
        </mesh>
        
        {/* Lounge chair legs */}
        <mesh position={[-0.3, 0.15, 1.8]} castShadow>
          <boxGeometry args={[0.08, 0.3, 0.08]} />
          <meshStandardMaterial color="#696969" metalness={0.7} />
        </mesh>
        
        {/* Umbrella - Lower positioning */}
        <mesh position={[-0.3, 1.3, -1.5]} castShadow>
          <cylinderGeometry args={[0.9, 0.9, 0.1, 8]} />
          <meshStandardMaterial color="#FF6B6B" roughness={0.6} />
        </mesh>
        
        <mesh position={[-0.3, 1.0, -1.5]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1.4, 6]} />
          <meshStandardMaterial color="#696969" metalness={0.8} />
        </mesh>
      </group>
      
      {/* ====== POOLSIDE LOUNGE CHAIRS - Right Front ====== */}
      <group position={[6.5, 0, 4.5]}>
        {/* Lounge chair 1 */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.15, 2]} />
          <meshStandardMaterial color="#99CCFF" roughness={0.5} />
        </mesh>
        
        <mesh position={[0, 0.5, -1]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.4, 0.8]} />
          <meshStandardMaterial color="#99CCFF" roughness={0.5} />
        </mesh>
        
        {/* Umbrella - Lower positioning */}
        <mesh position={[0.3, 1.3, -1.5]} castShadow>
          <cylinderGeometry args={[0.9, 0.9, 0.1, 8]} />
          <meshStandardMaterial color="#FFD700" roughness={0.6} />
        </mesh>
        
        <mesh position={[0.3, 1.0, -1.5]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1.4, 6]} />
          <meshStandardMaterial color="#696969" metalness={0.8} />
        </mesh>
      </group>
      
      {/* ====== POOLSIDE BAR COUNTER - Left back corner ====== */}
      <group position={[-6, 0, 5.5]}>
        {/* Bar counter */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 1.2, 0.8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.1} />
        </mesh>
        
        {/* Bar top - Premium material */}
        <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.1, 0.9]} />
          <meshStandardMaterial color="#DEB887" roughness={0.1} metalness={0.3} />
        </mesh>
        
        {/* Bar stools - 3 stools */}
        {Array.from({ length: 3 }).map((_, i) => (
          <group key={i} position={[-0.8 + i * 0.8, 0.55, -0.5]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.25, 0.3, 1.1, 8]} />
              <meshStandardMaterial color="#2C3E50" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.65, 0]} castShadow>
              <cylinderGeometry args={[0.28, 0.25, 0.1, 8]} />
              <meshStandardMaterial color="#654321" metalness={0.7} />
            </mesh>
          </group>
        ))}
        
        {/* Bar shelves with bottles */}
        <mesh position={[0.8, 1.8, -0.25]} castShadow>
          <boxGeometry args={[1.5, 0.06, 0.4]} />
          <meshStandardMaterial color="#654321" metalness={0.7} />
        </mesh>
        
        {/* Display bottles */}
        <mesh position={[0.3, 2, -0.25]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.4, 6]} />
          <meshStandardMaterial color="#90EE90" emissive="#90EE90" emissiveIntensity={0.3} />
        </mesh>
        
        <mesh position={[0.8, 2.1, -0.25]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.5, 6]} />
          <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.3} />
        </mesh>
      </group>
      
      {/* ====== TOWEL STATION - Left side ====== */}
      <group position={[-7, 0, 6]}>
        {/* Towel rack structure */}
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 2, 0.4]} />
          <meshStandardMaterial color="#8B4513" roughness={0.4} />
        </mesh>
        
        {/* Towel shelves */}
        <mesh position={[0, 1.8, 0.22]} castShadow>
          <boxGeometry args={[1.4, 0.05, 0.35]} />
          <meshStandardMaterial color="#654321" metalness={0.6} />
        </mesh>
        
        <mesh position={[0, 1.2, 0.22]} castShadow>
          <boxGeometry args={[1.4, 0.05, 0.35]} />
          <meshStandardMaterial color="#654321" metalness={0.6} />
        </mesh>
        
        {/* Towels - colorful rolled towels */}
        <mesh position={[-0.3, 1.85, 0.23]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.3, 8]} />
          <meshStandardMaterial color="#FF6B6B" roughness={0.8} />
        </mesh>
        
        <mesh position={[0.3, 1.85, 0.23]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.3, 8]} />
          <meshStandardMaterial color="#4ECDC4" roughness={0.8} />
        </mesh>
      </group>
      
      {/* ====== CHANGING ROOMS - Back left corner ====== */}
      <group position={[-8, 0, -6.5]}>
        {/* Building structure */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 2.4, 2]} />
          <meshStandardMaterial color="#D4A574" roughness={0.5} />
        </mesh>
        
        {/* Door frame */}
        <mesh position={[-0.7, 0.9, 1.05]} castShadow>
          <boxGeometry args={[0.8, 1.8, 0.1]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} />
        </mesh>
        
        {/* Door */}
        <mesh position={[-0.7, 0.9, 1.1]} castShadow>
          <boxGeometry args={[0.75, 1.75, 0.05]} />
          <meshStandardMaterial color="#654321" roughness={0.4} metalness={0.1} />
        </mesh>
        
        {/* Door handle */}
        <mesh position={[-0.3, 0.9, 1.15]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.08, 6]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} />
        </mesh>
        
        {/* Second door */}
        <mesh position={[0.7, 0.9, 1.05]} castShadow>
          <boxGeometry args={[0.8, 1.8, 0.1]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} />
        </mesh>
        
        <mesh position={[0.7, 0.9, 1.1]} castShadow>
          <boxGeometry args={[0.75, 1.75, 0.05]} />
          <meshStandardMaterial color="#654321" roughness={0.4} metalness={0.1} />
        </mesh>
      </group>
      
      {/* ====== WATER SLIDE - Right back area ====== */}
      <group position={[7, 0, -3]}>
        {/* Slide tower base */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 3, 0.8]} />
          <meshStandardMaterial color="#FF6B6B" roughness={0.5} />
        </mesh>
        
        {/* Slide slope - Curve simulated with angled box */}
        <mesh position={[0, 0.8, 1.8]} castShadow receiveShadow rotation={[Math.PI / 6, 0, 0]}>
          <boxGeometry args={[0.9, 0.08, 3.5]} />
          <meshStandardMaterial color="#87CEEB" roughness={0.2} metalness={0.3} />
        </mesh>
        
        {/* Ladder */}
        <mesh position={[-0.5, 1.5, -0.3]} castShadow>
          <boxGeometry args={[0.1, 3, 0.1]} />
          <meshStandardMaterial color="#696969" metalness={0.8} />
        </mesh>
        
        {/* Ladder rungs */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[-0.5, 0.5 + i * 0.45, -0.3]} castShadow>
            <boxGeometry args={[0.4, 0.06, 0.08]} />
            <meshStandardMaterial color="#696969" metalness={0.8} />
          </mesh>
        ))}
        
        {/* Slide pool catch basin */}
        <mesh position={[0, -0.8, 2.5]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.1, 1.5]} />
          <meshStandardMaterial color="#0277BD" roughness={0.08} />
        </mesh>
        
        <mesh position={[0, -0.2, 2.5]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.6, 1.5]} />
          <meshStandardMaterial 
            color="#01579B" 
            transparent 
            opacity={0.7}
            roughness={0.05}
            metalness={0.6}
            envMapIntensity={1.2}
          />
        </mesh>
      </group>
      
      {/* ====== DECORATIVE TROPICAL PLANTS & LANDSCAPING ====== */}
      
      {/* ====== POOLSIDE RELAXATION SEATING - Central area ====== */}
      <group position={[0, 0, 5.8]}>
        {/* Lounge cluster - Premium seating */}
        <mesh position={[-2.5, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.15, 2]} />
          <meshStandardMaterial color="#FFE4B5" roughness={0.4} />
        </mesh>
        
        <mesh position={[-2.5, 0.5, -1]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.4, 0.8]} />
          <meshStandardMaterial color="#FFE4B5" roughness={0.4} />
        </mesh>
        
        {/* Side table */}
        <mesh position={[-1.5, 0.4, 0]} castShadow>
          <boxGeometry args={[0.4, 0.3, 0.4]} />
          <meshStandardMaterial color="#8B7355" roughness={0.5} metalness={0.1} />
        </mesh>
      </group>
      
      {/* Premium Night Mode Enhancement */}
      {isNight && (
        <>
          {/* Enhanced underwater glow */}
          <pointLight
            position={[0, -1.8, 0]}
            intensity={2.8}
            color="#87ceeb"
            distance={12}
          />
          
          {/* Ambient pool reflection glow */}
          <pointLight
            position={[0, 2, 3]}
            intensity={1.5}
            color="#4fc3f7"
            distance={15}
          />
          
          {/* Bar ambient lighting */}
          <pointLight
            position={[-6, 1.5, 5.5]}
            intensity={1.8}
            color="#ffd700"
            distance={8}
          />
          
          {/* Hot tub ambient glow */}
          <pointLight
            position={[8.5, 1, 0]}
            intensity={1.6}
            color="#ffa726"
            distance={6}
          />
        </>
      )}
    </group>
  );
}
