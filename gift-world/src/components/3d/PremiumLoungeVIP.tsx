'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import InteractiveObject from './InteractiveObject';
import { Group } from 'three';

export function PremiumLoungeVIP() {
  const groupRef = useRef(null);
  const discoRigRef = useRef<Group | null>(null);
  const [vipModeEnabled, setVipModeEnabled] = useState(false);
  const [discoEnabled, setDiscoEnabled] = useState(false);

  useFrame((state) => {
    if (discoRigRef.current && discoEnabled) {
      const elapsed = state.clock.getElapsedTime();
      discoRigRef.current.rotation.y = elapsed * 0.75;
      discoRigRef.current.position.y = 3.2 + Math.sin(elapsed * 2.2) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.75} />
      <hemisphereLight intensity={0.45} color="#fff8e8" groundColor="#2f241c" />
      <directionalLight position={[2, 4, 3]} intensity={0.95} castShadow />

      {/* WALLS - Luxury finish */}
      <mesh position={[-6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#2a2420" roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#2a2420" roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.8, -4]} scale={[12, 3.6, 0.1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#3a3028" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* CEILING - Painted */}
      <mesh position={[0, 3.5, 0]} scale={[12, 0.1, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#1a1410" roughness={0.3} />
      </mesh>

      {/* FLOOR - Marble effect */}
      <mesh position={[0, -0.05, 0]} scale={[12, 0.1, 8]} receiveShadow>
        <boxGeometry />
        <meshPhysicalMaterial color="#e8dcc8" roughness={0.12} metalness={0.04} clearcoat={0.65} clearcoatRoughness={0.15} />
      </mesh>
      {/* Marble vein accents slightly above floor to avoid z-fighting */}
      {[-2.7, -1.1, 0.6, 2.2].map((x, idx) => (
        <mesh key={`marble-vein-${idx}`} position={[x, 0.003, idx % 2 === 0 ? -0.6 : 0.9]} rotation={[0, idx % 2 === 0 ? 0.15 : -0.22, 0]}>
          <boxGeometry args={[2.6, 0.003, 0.035]} />
          <meshStandardMaterial color="#c7b79f" roughness={0.6} metalness={0} />
        </mesh>
      ))}

      {/* LUXURY SEATING - Left area */}
      <group position={[-3.5, 0, 0.5]}>
        {/* Sofa */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.6, 1.0]} />
          <meshStandardMaterial color="#8b4789" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Back cushion */}
        <mesh position={[0, 0.8, -0.4]} castShadow>
          <boxGeometry args={[1.8, 0.4, 0.15]} />
          <meshStandardMaterial color="#9b5799" roughness={0.4} metalness={0.05} />
        </mesh>
      </group>

      {/* LUXURY SEATING - Right area */}
      <group position={[3.5, 0, 0.5]}>
        {/* Sofa */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.6, 1.0]} />
          <meshStandardMaterial color="#4a6a8b" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Back cushion */}
        <mesh position={[0, 0.8, -0.4]} castShadow>
          <boxGeometry args={[1.8, 0.4, 0.15]} />
          <meshStandardMaterial color="#5a7a9b" roughness={0.4} metalness={0.05} />
        </mesh>
      </group>

      {/* EXCLUSIVE CHAIRS - Premium seating */}
      {[-1.5, 1.5].map((x, idx) => (
        <group key={`chair-${idx}`} position={[x, 0, 1.5]}>
          {/* Seat */}
          <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.3, 0.7]} />
            <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.4} />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, 0.55, -0.3]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.5, 0.15]} />
            <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.4} />
          </mesh>
          {/* Armrest */}
          <mesh position={[0.4, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.15, 0.3, 0.6]} />
            <meshStandardMaterial color="#c9a03a" roughness={0.2} metalness={0.4} />
          </mesh>
          {/* Armrest left */}
          <mesh position={[-0.4, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.15, 0.3, 0.6]} />
            <meshStandardMaterial color="#c9a03a" roughness={0.2} metalness={0.4} />
          </mesh>
        </group>
      ))}

      {/* COFFEE TABLE - Center luxury */}
      <group position={[0, 0, 0]}>
        {/* Glass top */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.05, 1.2]} />
          <meshPhysicalMaterial color="#f3f0e8" roughness={0.03} metalness={0.05} transmission={0.72} thickness={0.08} transparent opacity={0.95} />
        </mesh>
        {/* Frame */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.1, 1.2]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Support legs */}
        {[
          [-1.1, 0.05, -0.45],
          [1.1, 0.05, -0.45],
          [-1.1, 0.05, 0.45],
          [1.1, 0.05, 0.45],
        ].map((pos, idx) => (
          <mesh key={`table-leg-${idx}`} position={pos as [number, number, number]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 0.1, 0.08]} />
            <meshStandardMaterial color="#c49a2c" roughness={0.28} metalness={0.55} />
          </mesh>
        ))}
      </group>

      {/* SIDE TABLES */}
      {[-3.5, 3.5].map((x, idx) => (
        <group key={`sidetable-${idx}`} position={[x, 0, 1.5]}>
          <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.6, 0.5, 0.6]} />
            <meshStandardMaterial color="#8b7355" roughness={0.2} metalness={0.3} />
          </mesh>
        </group>
      ))}

      {/* LUXURY BAR - Back corner right */}
      <group position={[4.5, 0, -2.0]}>
        {/* Counter top */}
        <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.05, 0.6]} />
          <meshStandardMaterial color="#e8d4a2" roughness={0.1} metalness={0.6} />
        </mesh>
        {/* Bar front */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.44, 0.6]} />
          <meshStandardMaterial color="#3a2a1a" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Glass shelf */}
        <mesh position={[0, 0.78, 0.35]} castShadow>
          <boxGeometry args={[1.1, 0.05, 0.3]} />
          <meshPhysicalMaterial color="#f5f5f5" roughness={0.03} metalness={0.05} transmission={0.82} thickness={0.06} transparent opacity={0.96} />
        </mesh>
        {/* Bottles on glass shelf */}
        {[-0.35, -0.1, 0.15, 0.38].map((x, idx) => (
          <mesh key={`bar-bottle-${idx}`} position={[x, 0.93, 0.35]} castShadow>
            <cylinderGeometry args={[0.045, 0.055, 0.22, 10]} />
            <meshStandardMaterial color={['#2f5d2f', '#1f1f1f', '#5c3418', '#4a1222'][idx % 4]} roughness={0.2} metalness={0.18} />
          </mesh>
        ))}
        {/* Cocktail glasses on countertop */}
        {[-0.24, 0.22].map((x, idx) => (
          <group key={`bar-glass-${idx}`} position={[x, 0.53, idx === 0 ? -0.12 : 0.14]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.05, 0.04, 0.12, 12]} />
              <meshPhysicalMaterial color="#f8fafc" roughness={0.02} metalness={0} transmission={0.9} thickness={0.04} transparent opacity={0.96} />
            </mesh>
            <mesh position={[0, -0.07, 0]} castShadow>
              <cylinderGeometry args={[0.013, 0.013, 0.07, 10]} />
              <meshStandardMaterial color="#d8d8d8" roughness={0.22} metalness={0.3} />
            </mesh>
          </group>
        ))}
        {/* Bar stools in front of counter */}
        {[-0.35, 0.35].map((x, idx) => (
          <group key={`vip-bar-stool-${idx}`} position={[x, 0, 0.72]}>
            <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.16, 0.16, 0.08, 14]} />
              <meshStandardMaterial color="#3f2b1a" roughness={0.35} metalness={0.12} />
            </mesh>
            <mesh position={[0, 0.22, 0]} castShadow>
              <cylinderGeometry args={[0.03, 0.03, 0.36, 10]} />
              <meshStandardMaterial color="#a98b55" roughness={0.22} metalness={0.55} />
            </mesh>
            <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.04, 14]} />
              <meshStandardMaterial color="#8a6f40" roughness={0.3} metalness={0.45} />
            </mesh>
          </group>
        ))}
      </group>

      {/* CRYSTAL CHANDELIER - Center */}
      <group position={[0, 3.0, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color="#ffd700"
            roughness={0.1}
            metalness={0.8}
            emissive="#ffd700"
            emissiveIntensity={vipModeEnabled ? 0.55 : 0.3}
          />
        </mesh>
        {/* Hanging crystals */}
        {[0, 72, 144, 216, 288].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh key={`crystal-${idx}`} position={[Math.cos(rad) * 0.38, -0.22, Math.sin(rad) * 0.38]} castShadow>
              <boxGeometry args={[0.06, 0.15, 0.06]} />
              <meshStandardMaterial color="#ffd700" roughness={0.05} metalness={0.9} emissive="#ffd700" emissiveIntensity={0.2} />
            </mesh>
          );
        })}
      </group>

      {/* VIP TOGGLE PEDESTAL - Interactive accent */}
      <group position={[0, 0, 2.9]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.26, 0.7, 16]} />
          <meshStandardMaterial color="#5a4a36" roughness={0.35} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.06, 16]} />
          <meshStandardMaterial color="#c9a03a" roughness={0.2} metalness={0.65} />
        </mesh>
      </group>
      <InteractiveObject
        position={[0, 1.28, 2.9]}
        label=""
        onClick={() => setVipModeEnabled((prev) => !prev)}
        color={vipModeEnabled ? '#ffd700' : '#8b4789'}
        shape="octahedron"
      />
      <InteractiveObject
        position={[-1.2, 1.28, 2.9]}
        label=""
        onClick={() => setDiscoEnabled((prev) => !prev)}
        color={discoEnabled ? '#00d4ff' : '#3a4b62'}
        shape="torus"
      >
        <mesh castShadow receiveShadow>
          <torusGeometry args={[0.26, 0.08, 14, 28]} />
          <meshStandardMaterial
            color={discoEnabled ? '#00d4ff' : '#3a4b62'}
            emissive={discoEnabled ? '#00a3cc' : '#000000'}
            emissiveIntensity={discoEnabled ? 0.35 : 0}
            roughness={0.28}
            metalness={0.45}
          />
        </mesh>
      </InteractiveObject>

      {/* WINE RACK - Left side */}
      <group position={[-4.5, 0, -0.5]}>
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 1.0, 0.4]} />
          <meshStandardMaterial color="#6b5344" roughness={0.3} />
        </mesh>
        {/* Wine bottles */}
        {[0, 0.3, 0.6, 0.9].map((y, idx) => (
          <mesh key={`bottle-${idx}`} position={[0, y - 0.25, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.1, 0.15, 8]} />
            <meshStandardMaterial color={['#2d5016', '#1a1a1a', '#3d2817', '#4a0e0e'][idx % 4]} roughness={0.3} metalness={0.1} />
          </mesh>
        ))}
      </group>

      {/* PAINTING/ART - Back wall */}
      <mesh position={[0, 2.5, -3.9]} castShadow>
        <boxGeometry args={[2.5, 1.2, 0.05]} />
        <meshStandardMaterial color="#1a0000" roughness={0.2} emissive="#8b4789" emissiveIntensity={0.2} />
      </mesh>

      {/* GOLD ACCENTS - Floor trim */}
      {[-5.5, 5.5].map((x, idx) => (
        <mesh key={`trim-${idx}`} position={[x + 0.05, 0.02, 0]} scale={[0.1, 0.1, 8]}>
          <boxGeometry />
          <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={0.8} emissive="#d4af37" emissiveIntensity={0.15} />
        </mesh>
      ))}

      {/* SOFT LIGHTING */}
      <pointLight position={[-3.5, 2.5, 0.5]} intensity={vipModeEnabled ? 1.15 : 0.9} castShadow color="#ffd700" />
      <pointLight position={[3.5, 2.5, 0.5]} intensity={vipModeEnabled ? 1.15 : 0.9} castShadow color="#ffd700" />
      <pointLight position={[0, 3.2, 0]} intensity={vipModeEnabled ? 1.25 : 1.0} castShadow color="#ffffcc" />

      {/* DISCO LIGHTING SYSTEM - Toggleable rotating club lights */}
      <group ref={discoRigRef} position={[0, 3.2, 0]}>
        {/* Fixture casings */}
        {[
          [2.4, 0.0, -0.6],
          [-2.3, 0.0, -0.5],
          [0.1, 0.0, 2.6],
        ].map((pos, idx) => (
          <mesh key={`disco-fixture-${idx}`} position={pos as [number, number, number]} castShadow>
            <boxGeometry args={[0.3, 0.18, 0.28]} />
            <meshStandardMaterial color="#1f1a16" roughness={0.45} metalness={0.25} />
          </mesh>
        ))}

        {/* Rotating RGB beams */}
        <pointLight
          position={[2.4, -0.08, -0.6]}
          intensity={discoEnabled ? 1.8 : 0}
          distance={9}
          decay={2}
          color="#ff3b7a"
        />
        <pointLight
          position={[-2.3, -0.08, -0.5]}
          intensity={discoEnabled ? 1.8 : 0}
          distance={9}
          decay={2}
          color="#2fd4ff"
        />
        <pointLight
          position={[0.1, -0.08, 2.6]}
          intensity={discoEnabled ? 1.8 : 0}
          distance={9}
          decay={2}
          color="#a7ff4d"
        />
      </group>
    </group>
  );
}
