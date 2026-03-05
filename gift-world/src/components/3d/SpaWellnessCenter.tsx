'use client';

import { useTheme } from '@/hooks/useTheme';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SpaWellnessCenter() {
  const { isNight } = useTheme();
  const steamRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Animate steam opacity
    if (steamRef.current) {
      const material = steamRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.15 + Math.sin(time * 0.5) * 0.08;
    }
  });

  return (
    <group>
      {/* LIGHTING SYSTEM - Spa Ambiance */}
      <ambientLight intensity={isNight ? 0.45 : 0.65} color={isNight ? '#e6d1b8' : '#fef5e7'} />

      <directionalLight
        position={[8, 11, 8]}
        intensity={isNight ? 0.5 : 1.0}
        color={isNight ? '#ffb366' : '#ffffff'}
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
        position={[-8, 9, -8]}
        intensity={isNight ? 0.3 : 0.5}
        color={isNight ? '#ffdab9' : '#fff5ee'}
      />

      {/* WARM AMBIENT LIGHTING - Spa centers */}
      <pointLight position={[-3.5, 2.5, 0]} intensity={isNight ? 1.5 : 1.8} color={isNight ? '#ffcc99' : '#fff8dc'} distance={7} />
      <pointLight position={[3.5, 2.5, 0]} intensity={isNight ? 1.5 : 1.8} color={isNight ? '#ffcc99' : '#fff8dc'} distance={7} />
      <pointLight position={[0, 2.8, -3]} intensity={isNight ? 1.3 : 1.6} color={isNight ? '#87ceeb' : '#e0ffff'} distance={6} />

      {/* FLOOR - Warm stone/tile */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#d4c5b0" roughness={0.25} metalness={0.05} />
      </mesh>

      {/* WALLS - Left, Right & Back (Front open like other areas) */}
      <mesh position={[-6, 1.8, 0]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 8]} />
        <meshStandardMaterial color="#e8dcc8" roughness={0.5} />
      </mesh>

      <mesh position={[6, 1.8, 0]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 8]} />
        <meshStandardMaterial color="#e8dcc8" roughness={0.5} />
      </mesh>

      {/* BACK WALL - Closing off back */}
      <mesh position={[0, 1.8, -4]} receiveShadow>
        <boxGeometry args={[12, 3.6, 0.2]} />
        <meshStandardMaterial color="#e8dcc8" roughness={0.5} />
      </mesh>

      {/* CEILING */}
      <mesh position={[0, 3.6, 0]} receiveShadow>
        <boxGeometry args={[12, 0.25, 8]} />
        <meshStandardMaterial color="#faf8f3" roughness={0.3} />
      </mesh>

      {/* RECEPTION AREA - Front entrance */}
      <group position={[0, 0, 2.8]}>
        {/* Reception desk */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 1.2, 0.8]} />
          <meshStandardMaterial color="#8b7355" roughness={0.4} metalness={0.08} />
        </mesh>
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.3, 0.1, 0.9]} />
          <meshStandardMaterial color="#d4a574" roughness={0.15} metalness={0.2} />
        </mesh>
        {/* Reception nameplate */}
        <mesh position={[0, 1.35, 0.4]} castShadow>
          <boxGeometry args={[0.8, 0.2, 0.05]} />
          <meshStandardMaterial color="#c0a080" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* SPA MASSAGE ROOM - Left side FRONT */}
      <group position={[-3.6, 0, 0.6]}>
        {/* Room divider wall */}
        <mesh position={[-0.1, 1.6, 0]} receiveShadow>
          <boxGeometry args={[0.2, 3.2, 2.0]} />
          <meshStandardMaterial color="#c9a878" roughness={0.5} />
        </mesh>

        {/* Massage table 1 */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.5, 1.0]} />
          <meshStandardMaterial color="#d7b8a3" roughness={0.4} metalness={0.05} />
        </mesh>

        {/* Massage table pillow/head */}
        <mesh position={[0.8, 0.15, 0]} castShadow>
          <boxGeometry args={[0.6, 0.3, 0.8]} />
          <meshStandardMaterial color="#e8c4a8" roughness={0.5} />
        </mesh>

        {/* Oil diffuser on side table */}
        <mesh position={[-1.2, 0.65, 0.6]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.25, 8]} />
          <meshStandardMaterial color="#8b6f47" roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Aromatherapy steam from diffuser */}
        <mesh position={[-1.2, 0.95, 0.6]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color="#e6f3ff" transparent opacity={0.3} roughness={0.2} />
        </mesh>

        {/* Towel rack */}
        <mesh position={[1.2, 0.8, -0.6]} castShadow>
          <boxGeometry args={[0.15, 1.2, 0.5]} />
          <meshStandardMaterial color="#654321" roughness={0.5} metalness={0.3} />
        </mesh>
      </group>

      {/* SAUNA ROOM - Right side FRONT */}
      <group position={[3.6, 0, 0.6]}>
        {/* Sauna wooden walls interior frame */}
        <mesh position={[0.1, 1.6, 0]} receiveShadow>
          <boxGeometry args={[0.2, 3.2, 2.0]} />
          <meshStandardMaterial color="#c9a878" roughness={0.5} />
        </mesh>

        {/* Sauna bench - upper */}
        <mesh position={[0.3, 0.075, -0.4]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.15, 1.6]} />
          <meshStandardMaterial color="#a0826d" roughness={0.6} />
        </mesh>

        {/* Sauna bench - lower */}
        <mesh position={[0.3, 0.075, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.15, 1.6]} />
          <meshStandardMaterial color="#b8956a" roughness={0.6} />
        </mesh>

        {/* Sauna stove/heater */}
        <mesh position={[0.4, 0.4, 0.9]} castShadow>
          <boxGeometry args={[0.4, 0.8, 0.3]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.4} />
        </mesh>

        {/* Heat glow from stove */}
        <mesh position={[0.4, 0.7, 0.9]}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color="#ff9999" emissive={isNight ? '#ff6666' : '#ffb3b3'} emissiveIntensity={0.5} transparent opacity={0.4} />
        </mesh>

        {/* Bucket for water */}
        <mesh position={[-0.8, 0.175, 0.6]} castShadow>
          <cylinderGeometry args={[0.2, 0.22, 0.35, 12]} />
          <meshStandardMaterial color="#8b4513" roughness={0.4} />
        </mesh>
      </group>

      {/* STEAM ROOM - Back center MIDDLE */}
      <group position={[0, 0, -1.6]}>
        {/* Steam room tile walls frame */}
        <mesh position={[0, 1.6, 0.15]} receiveShadow>
          <boxGeometry args={[3.4, 3.2, 0.2]} />
          <meshStandardMaterial color="#b0d0e0" roughness={0.4} metalness={0.1} />
        </mesh>

        {/* Bench seating in steam room */}
        <mesh position={[0, 0.09, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 0.18, 1.4]} />
          <meshStandardMaterial color="#9abdbe" roughness={0.5} metalness={0.08} />
        </mesh>

        {/* Steam room stove/generator */}
        <mesh position={[-1.4, 0.4, 0]} castShadow>
          <boxGeometry args={[0.35, 1.0, 0.35]} />
          <meshStandardMaterial color="#2f4f4f" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Water bucket for steam */}
        <mesh position={[-1.4, 1.4, -0.3]} castShadow>
          <cylinderGeometry args={[0.18, 0.2, 0.3, 12]} />
          <meshStandardMaterial color="#666666" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* Steam cloud effect - animated */}
        <mesh ref={steamRef} position={[0, 1.8, 0.3]}>
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshStandardMaterial color="#c8e6f5" transparent roughness={0.3} metalness={0} />
        </mesh>

        {/* Additional steam clouds */}
        <mesh position={[-0.8, 1.6, 0.2]}>
          <sphereGeometry args={[0.8, 12, 12]} />
          <meshStandardMaterial color="#d4eef8" transparent opacity={0.25} roughness={0.2} />
        </mesh>
        <mesh position={[0.8, 1.7, -0.2]}>
          <sphereGeometry args={[0.9, 12, 12]} />
          <meshStandardMaterial color="#d4eef8" transparent opacity={0.2} roughness={0.2} />
        </mesh>
      </group>

      {/* RELAXATION LOUNGE - Back side BACK */}
      <group position={[0, 0, -3.0]}>
        {/* Lounge seating (curved couch area) */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.0, 0.7, 0.9]} />
          <meshStandardMaterial color="#c9a89f" roughness={0.5} metalness={0.02} />
        </mesh>

        {/* Lounge back cushion */}
        <mesh position={[0, 0.95, -0.5]} castShadow receiveShadow>
          <boxGeometry args={[5.0, 0.8, 0.2]} />
          <meshStandardMaterial color="#b8968f" roughness={0.5} />
        </mesh>

        {/* Lounge side arm - left */}
        <mesh position={[-2.6, 0.35, 0]} castShadow>
          <boxGeometry args={[0.3, 0.7, 0.9]} />
          <meshStandardMaterial color="#b8968f" roughness={0.5} />
        </mesh>

        {/* Lounge side arm - right */}
        <mesh position={[2.6, 0.35, 0]} castShadow>
          <boxGeometry args={[0.3, 0.7, 0.9]} />
          <meshStandardMaterial color="#b8968f" roughness={0.5} />
        </mesh>

        {/* Small table in front */}
        <mesh position={[0, 0.04, 1.2]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.08, 0.8]} />
          <meshStandardMaterial color="#d4a574" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Herbal tea service on table */}
        {[-0.6, 0.6].map((x, idx) => (
          <group key={`tea-${idx}`} position={[x, 0.25, 1.2]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.2, 8]} />
              <meshStandardMaterial color="#a0826d" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.15, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.05, 8]} />
              <meshStandardMaterial color="#8b7355" roughness={0.5} />
            </mesh>
          </group>
        ))}
      </group>

      {/* WATER FOUNTAIN - Decorative centerpiece LEFT-BACK */}
      <group position={[-3.5, 0, -2.2]}>
        {/* Fountain basin */}
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.9, 0.3, 16]} />
          <meshStandardMaterial color="#8ab4c8" roughness={0.3} metalness={0.15} />
        </mesh>

        {/* Fountain center column */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.2, 0.8, 12]} />
          <meshStandardMaterial color="#7a9fb5" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* Water top element */}
        <mesh position={[0, 1.15, 0]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#87ceeb" transparent opacity={0.6} roughness={0.1} metalness={0.1} />
        </mesh>
      </group>

      {/* DECORATIVE PLANTS - Left side */}
      <group position={[-5.2, 0, 0]}>
        <mesh position={[0, 0.275, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.28, 0.32, 0.55, 12]} />
          <meshStandardMaterial color="#9d8b7e" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.9, 0]} castShadow>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshStandardMaterial color="#52b788" roughness={0.7} />
        </mesh>
      </group>

      {/* DECORATIVE PLANTS - Right side */}
      <group position={[5.2, 0, 0]}>
        <mesh position={[0, 0.275, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.28, 0.32, 0.55, 12]} />
          <meshStandardMaterial color="#9d8b7e" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.9, 0]} castShadow>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshStandardMaterial color="#52b788" roughness={0.7} />
        </mesh>
      </group>

      {/* RELAXING AMBIENT MUSIC PLAYER (decorative) - Back corner */}
      <group position={[4.2, 1.5, -3.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.25, 0.3]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 8]} />
          <meshStandardMaterial color="#444444" roughness={0.5} metalness={0.2} />
        </mesh>
      </group>

      {/* MOOD LIGHTING - Colored accent lights */}
      <pointLight position={[0, 2.5, -1.8]} intensity={isNight ? 0.8 : 0} color="#9db3c8" distance={5} />
      <pointLight position={[-3.5, 1.2, -1.2]} intensity={isNight ? 0.6 : 0} color="#87ceeb" distance={4} />
      <pointLight position={[3.5, 1.2, -1.2]} intensity={isNight ? 0.6 : 0} color="#dda0a8" distance={4} />
    </group>
  );
}
