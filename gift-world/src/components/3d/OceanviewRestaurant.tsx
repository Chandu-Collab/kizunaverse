'use client';

import { useTheme } from '@/hooks/useTheme';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function OceanviewRestaurant() {
  const { isNight } = useTheme();
  const chandelierRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Gentle chandelier sway
    if (chandelierRef.current) {
      chandelierRef.current.rotation.y = Math.sin(time * 0.3) * 0.02;
    }
  });

  return (
    <group>
      {/* LIGHTING SYSTEM */}
      <ambientLight intensity={isNight ? 0.5 : 0.75} color={isNight ? '#ffd89b' : '#fff8e1'} />

      <directionalLight
        position={[9, 12, 9]}
        intensity={isNight ? 0.65 : 1.2}
        color={isNight ? '#ffb347' : '#ffffff'}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={60}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />

      <directionalLight
        position={[-8, 10, -8]}
        intensity={isNight ? 0.35 : 0.6}
        color={isNight ? '#ffeaa7' : '#f8f9fa'}
      />

      {/* CENTER CHANDELIER SPOTLIGHTS */}
      <spotLight
        position={[0, 5.5, 0]}
        target-position={[0, 1, 0]}
        intensity={isNight ? 2.5 : 3.0}
        color={isNight ? '#ffd700' : '#ffffff'}
        angle={Math.PI / 4}
        penumbra={0.4}
        distance={12}
        castShadow
      />

      {/* WALL SCONCES - Left side */}
      <pointLight position={[-5.5, 2.5, 1]} intensity={isNight ? 1.4 : 1.7} color={isNight ? '#ffcc80' : '#fff5ee'} distance={6} />
      <pointLight position={[-5.5, 2.5, -2]} intensity={isNight ? 1.4 : 1.7} color={isNight ? '#ffcc80' : '#fff5ee'} distance={6} />

      {/* WALL SCONCES - Right side */}
      <pointLight position={[5.5, 2.5, 1]} intensity={isNight ? 1.4 : 1.7} color={isNight ? '#ffcc80' : '#fff5ee'} distance={6} />
      <pointLight position={[5.5, 2.5, -2]} intensity={isNight ? 1.4 : 1.7} color={isNight ? '#ffcc80' : '#fff5ee'} distance={6} />

      {/* BAR AREA ACCENT LIGHTING */}
      <spotLight position={[3.5, 4.2, -3.2]} target-position={[3.5, 0.8, -3.2]} intensity={isNight ? 1.8 : 2.2} color={isNight ? '#4fc3f7' : '#ffffff'} angle={Math.PI / 6} penumbra={0.3} distance={8} />

      {/* SERVER STATION LIGHTING */}
      <pointLight position={[-4.2, 2.8, -3.2]} intensity={isNight ? 1.3 : 1.6} color={isNight ? '#90caf9' : '#e3f2fd'} distance={5} />

      {/* FLOOR - Premium polished concrete */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#e8e4d6" roughness={0.15} metalness={0.08} />
      </mesh>

      {/* WALLS - Left & Right only, open front & back */}
      {/* Left wall with window frames */}
      <mesh position={[-6, 1.8, 0]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 8]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.5} />
      </mesh>

      {/* Right wall with window frames */}
      <mesh position={[6, 1.8, 0]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 8]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.5} />
      </mesh>

      {/* CEILING */}
      <mesh position={[0, 3.6, 0]} receiveShadow>
        <boxGeometry args={[12, 0.25, 8]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.3} />
      </mesh>

      {/* LARGE OCEAN-VIEW WINDOWS - Left side (3 tall windows) */}
      {[
        [-6, 1.8, -3],
        [-6, 1.8, 0],
        [-6, 1.8, 3],
      ].map((pos, idx) => (
        <group key={`window-left-${idx}`} position={pos as [number, number, number]}>
          {/* Window frame */}
          <mesh position={[-0.15, 0, 0]} castShadow>
            <boxGeometry args={[0.3, 3, 1.8]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* Glass panes (2x2 grid) */}
          <mesh position={[-0.08, 0.75, -0.45]}>
            <planeGeometry args={[0.8, 1.4]} />
            <meshStandardMaterial color="#b3e5fc" transparent opacity={0.5} roughness={0.1} metalness={0.1} />
          </mesh>
          <mesh position={[-0.08, 0.75, 0.45]}>
            <planeGeometry args={[0.8, 1.4]} />
            <meshStandardMaterial color="#b3e5fc" transparent opacity={0.5} roughness={0.1} metalness={0.1} />
          </mesh>
          <mesh position={[-0.08, -0.75, -0.45]}>
            <planeGeometry args={[0.8, 1.4]} />
            <meshStandardMaterial color="#b3e5fc" transparent opacity={0.5} roughness={0.1} metalness={0.1} />
          </mesh>
          <mesh position={[-0.08, -0.75, 0.45]}>
            <planeGeometry args={[0.8, 1.4]} />
            <meshStandardMaterial color="#b3e5fc" transparent opacity={0.5} roughness={0.1} metalness={0.1} />
          </mesh>
        </group>
      ))}

      {/* LARGE OCEAN-VIEW WINDOWS - Right side (3 tall windows) */}
      {[
        [6, 1.8, -3],
        [6, 1.8, 0],
        [6, 1.8, 3],
      ].map((pos, idx) => (
        <group key={`window-right-${idx}`} position={pos as [number, number, number]}>
          {/* Window frame */}
          <mesh position={[0.15, 0, 0]} castShadow>
            <boxGeometry args={[0.3, 3, 1.8]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* Glass panes */}
          <mesh position={[0.08, 0.75, -0.45]}>
            <planeGeometry args={[0.8, 1.4]} />
            <meshStandardMaterial color="#b3e5fc" transparent opacity={0.5} roughness={0.1} metalness={0.1} />
          </mesh>
          <mesh position={[0.08, 0.75, 0.45]}>
            <planeGeometry args={[0.8, 1.4]} />
            <meshStandardMaterial color="#b3e5fc" transparent opacity={0.5} roughness={0.1} metalness={0.1} />
          </mesh>
          <mesh position={[0.08, -0.75, -0.45]}>
            <planeGeometry args={[0.8, 1.4]} />
            <meshStandardMaterial color="#b3e5fc" transparent opacity={0.5} roughness={0.1} metalness={0.1} />
          </mesh>
          <mesh position={[0.08, -0.75, 0.45]}>
            <planeGeometry args={[0.8, 1.4]} />
            <meshStandardMaterial color="#b3e5fc" transparent opacity={0.5} roughness={0.1} metalness={0.1} />
          </mesh>
        </group>
      ))}

      {/* WALL SCONCE FIXTURES - Left side */}
      {[1.5, -1.5].map((z, idx) => (
        <group key={`sconce-left-${idx}`} position={[-5.7, 2.5, z]}>
          <mesh castShadow>
            <boxGeometry args={[0.15, 0.4, 0.25]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[0.08, 0, 0]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#fff3cd" emissive={isNight ? '#ffcc80' : '#fff5ee'} emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}

      {/* WALL SCONCE FIXTURES - Right side */}
      {[1.5, -1.5].map((z, idx) => (
        <group key={`sconce-right-${idx}`} position={[5.7, 2.5, z]}>
          <mesh castShadow>
            <boxGeometry args={[0.15, 0.4, 0.25]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[-0.08, 0, 0]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#fff3cd" emissive={isNight ? '#ffcc80' : '#fff5ee'} emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}

      {/* ENTRANCE DOOR FRAME - Front entrance (removed open view maintained) */}
      <group position={[0, 0, 3.5]}>
        <mesh position={[0, 1.4, -0.12]} castShadow>
          <boxGeometry args={[2.2, 2.8, 0.24]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.4} />
        </mesh>
        <mesh position={[-1.15, 1.4, 0]}>
          <planeGeometry args={[0.2, 2.6]} />
          <meshStandardMaterial color="#45454a" roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[1.15, 1.4, 0]}>
          <planeGeometry args={[0.2, 2.6]} />
          <meshStandardMaterial color="#45454a" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* CENTRAL DECORATIVE CHANDELIER (visual centerpiece) */}
      <group ref={chandelierRef} position={[0, 3.3, 0]}>
        {/* Main chandelier body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.3, 12]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Hanging crystals (8 points) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = Math.cos(angle) * 0.28;
          const z = Math.sin(angle) * 0.28;
          return (
            <group key={`crystal-${i}`} position={[x, -0.35, z]}>
              <mesh castShadow>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshStandardMaterial color="#90ee90" transparent opacity={0.7} roughness={0.1} metalness={0.3} />
              </mesh>
            </group>
          );
        })}

        {/* Chandelier light bulbs (4 bulbs) */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2;
          const x = Math.cos(angle) * 0.15;
          const z = Math.sin(angle) * 0.15;
          return (
            <mesh key={`bulb-${i}`} position={[x, -0.2, z]} castShadow>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial color="#ffff99" emissive={isNight ? '#ffff00' : '#ffffcc'} emissiveIntensity={0.6} />
            </mesh>
          );
        })}
      </group>

      {/* BOOTH SEATING - Left window side (2-4 seating) */}
      <group position={[-3.8, 0.4, 2.5]}>
        {/* Booth cushion base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.8, 1.4]} />
          <meshStandardMaterial color="#704030" roughness={0.5} />
        </mesh>
        {/* Booth back cushion */}
        <mesh position={[0, 0.65, -0.75]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.8, 0.2]} />
          <meshStandardMaterial color="#654321" roughness={0.5} />
        </mesh>
        {/* Booth table */}
        <mesh position={[0, 0.58, 0.3]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.04, 1.2]} />
          <meshStandardMaterial color="#d4a574" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Booth chairs (2 sides) */}
        {[-1.2, 1.2].map((x, idx) => (
          <group key={`booth-chair-left-${idx}`} position={[x, 0, 0.8]}>
            <mesh castShadow>
              <boxGeometry args={[0.5, 0.7, 0.5]} />
              <meshStandardMaterial color="#456789" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* BOOTH SEATING - Right window side (2-4 seating) */}
      <group position={[3.8, 0.4, 2.5]}>
        {/* Booth cushion base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.8, 1.4]} />
          <meshStandardMaterial color="#704030" roughness={0.5} />
        </mesh>
        {/* Booth back cushion */}
        <mesh position={[0, 0.65, -0.75]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.8, 0.2]} />
          <meshStandardMaterial color="#654321" roughness={0.5} />
        </mesh>
        {/* Booth table */}
        <mesh position={[0, 0.58, 0.3]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.04, 1.2]} />
          <meshStandardMaterial color="#d4a574" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Booth chairs */}
        {[-1.2, 1.2].map((x, idx) => (
          <group key={`booth-chair-right-${idx}`} position={[x, 0, 0.8]}>
            <mesh castShadow>
              <boxGeometry args={[0.5, 0.7, 0.5]} />
              <meshStandardMaterial color="#456789" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ROUND DINING TABLE - Center (premium seating) */}
      <group position={[0, 0.4, 0.5]}>
        {/* Table top */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.0, 1.0, 0.08, 24]} />
          <meshStandardMaterial color="#f5deb3" roughness={0.15} metalness={0.08} />
        </mesh>
        {/* Table base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.14, 0.24, 0.8, 16]} />
          <meshStandardMaterial color="#8b4513" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Centerpiece - Flower vase */}
        <mesh position={[0, 0.48, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.18, 0.3, 12]} />
          <meshStandardMaterial color="#c0504d" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Flowers in centerpiece */}
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * Math.PI * 2;
          return (
            <mesh key={`flower-${i}`} position={[Math.cos(angle) * 0.1, 0.68, Math.sin(angle) * 0.1]} castShadow>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#ff69b4' : '#ffb6c1'} roughness={0.6} />
            </mesh>
          );
        })}
        {/* Candle on table */}
        <mesh position={[0.35, 0.48, 0.35]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.15, 8]} />
          <meshStandardMaterial color="#f5f5dc" roughness={0.5} />
        </mesh>
        {/* Candle flame glow */}
        <mesh position={[0.35, 0.62, 0.35]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#ffff99" emissive={isNight ? '#ff7700' : '#ffcc00'} emissiveIntensity={0.7} />
        </mesh>
        {/* Place settings - 4 plates around table */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2;
          const x = Math.cos(angle) * 0.7;
          const z = Math.sin(angle) * 0.7;
          return (
            <mesh key={`plate-${i}`} position={[x, 0.08, z]} rotation={[0, angle, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.02, 24]} />
              <meshStandardMaterial color="#fffacd" roughness={0.3} metalness={0.1} />
            </mesh>
          );
        })}
        {/* 4 Chairs around table */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2;
          const x = Math.cos(angle) * 1.32;
          const z = Math.sin(angle) * 1.32;
          return (
            <group key={`chair-center-${i}`} position={[x, 0, z]}>
              <mesh castShadow>
                <boxGeometry args={[0.45, 0.7, 0.45]} />
                <meshStandardMaterial color="#2f4f4f" roughness={0.6} />
              </mesh>
              <mesh position={[0, 0.45, -0.18]} castShadow>
                <boxGeometry args={[0.45, 0.5, 0.08]} />
                <meshStandardMaterial color="#1c3a3a" roughness={0.6} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* BAR COUNTER - Back right area */}
      <group position={[3.5, 0.4, -3.0]}>
        {/* Bar top counter */}
        <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.1, 1.0]} />
          <meshStandardMaterial color="#d4a574" roughness={0.15} metalness={0.15} />
        </mesh>
        {/* Bar cabinet body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.2, 1.9, 1.0]} />
          <meshStandardMaterial color="#5c4033" roughness={0.4} metalness={0.05} />
        </mesh>
        {/* Shelves for bottles (3 levels) */}
        {[0.6, 0, -0.6].map((y, idx) => (
          <mesh key={`shelf-${idx}`} position={[0, y, 0.55]} castShadow>
            <boxGeometry args={[3.0, 0.08, 0.5]} />
            <meshStandardMaterial color="#8b6f47" roughness={0.3} metalness={0.1} />
          </mesh>
        ))}
        
        {/* Decorative bottles on shelves */}
        {[
          [-1.2, 0.6, 0.55],
          [-0.4, 0.6, 0.55],
          [0.4, 0.6, 0.55],
          [1.2, 0.6, 0.55],
          [-1.2, 0, 0.55],
          [1.2, 0, 0.55],
          [-0.6, -0.6, 0.55],
          [0.6, -0.6, 0.55],
        ].map((pos, idx) => (
          <mesh key={`bottle-${idx}`} position={pos as [number, number, number]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.35, 12]} />
            <meshStandardMaterial color={idx % 3 === 0 ? '#2d5016' : idx % 3 === 1 ? '#8b0000' : '#d4af37'} metalness={0.4} roughness={0.2} />
          </mesh>
        ))}

        {/* Bar stools (2 stools) */}
        {[-1.2, 1.2].map((x, idx) => (
          <group key={`barstool-${idx}`} position={[x, 0, -0.7]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.28, 0.28, 0.08, 12]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.3} />
            </mesh>
            <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.22, 0.22, 0.04, 12]} />
              <meshStandardMaterial color="#8b7355" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.15, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.12, 0.28, 8]} />
              <meshStandardMaterial color="#454545" metalness={0.5} roughness={0.3} />
            </mesh>
          </group>
        ))}
      </group>

      {/* SERVER STATION - Back left area */}
      <group position={[-4.2, 0.4, -3.2]}>
        {/* Counter top */}
        <mesh position={[0, 0.92, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.1, 0.8]} />
          <meshStandardMaterial color="#d4a574" roughness={0.15} metalness={0.15} />
        </mesh>
        {/* Counter cabinet */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 1.84, 0.8]} />
          <meshStandardMaterial color="#8d6e63" roughness={0.4} metalness={0.05} />
        </mesh>
        {/* Storage compartments (4 drawers) */}
        {[0.55, 0.05, -0.45, -0.95].map((y, idx) => (
          <mesh key={`drawer-${idx}`} position={[0, y, -0.38]} castShadow>
            <boxGeometry args={[2.0, 0.35, 0.1]} />
            <meshStandardMaterial color="#6d4c41" roughness={0.4} metalness={0.1} />
          </mesh>
        ))}
      </group>

      {/* RESTROOM DOOR - Back left corner */}
      <group position={[-5.2, 0, -3.6]}>
        <mesh position={[0, 1.3, 0]} castShadow>
          <boxGeometry args={[0.8, 2.6, 0.15]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.4} />
        </mesh>
        {/* Door frame */}
        <mesh position={[-0.42, 1.3, 0]}>
          <boxGeometry args={[0.15, 2.6, 0.2]} />
          <meshStandardMaterial color="#606060" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Door handle */}
        <mesh position={[0.3, 1.3, 0.15]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.08, 12]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Restroom sign */}
        <mesh position={[0, 2.2, 0.12]}>
          <boxGeometry args={[0.15, 0.2, 0.03]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* DECORATIVE MIRRORS - Wall mirrors for ambiance */}
      <mesh position={[-5.8, 1.6, -2.2]}>
        <planeGeometry args={[1.2, 1.4]} />
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.7} metalness={0.5} roughness={0.1} />
      </mesh>
      <mesh position={[5.8, 1.6, -2.2]}>
        <planeGeometry args={[1.2, 1.4]} />
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.7} metalness={0.5} roughness={0.1} />
      </mesh>

      {/* SIDE SERVICE COUNTER - Right front area (compact) */}
      <group position={[4.8, 0.4, 1.0]}>
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 1.3, 0.8]} />
          <meshStandardMaterial color="#8d6e63" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.32, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.1, 0.9]} />
          <meshStandardMaterial color="#d7ccc8" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>

      {/* HOST DESK - Front entrance */}
      <group position={[0, 0.4, 2.8]}>
        <mesh position={[0, 0.62, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.8, 1.24, 0.9]} />
          <meshStandardMaterial color="#6d4c41" roughness={0.35} metalness={0.1} />
        </mesh>
        <mesh position={[0, 1.26, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.9, 0.12, 1.0]} />
          <meshStandardMaterial color="#dcdcdc" roughness={0.1} metalness={0.25} />
        </mesh>
        {/* Host station sign */}
        <mesh position={[0, 1.5, 0.5]} castShadow>
          <boxGeometry args={[0.6, 0.3, 0.05]} />
          <meshStandardMaterial color="#c0a080" roughness={0.3} metalness={0.3} />
        </mesh>
      </group>
    </group>
  );
}
