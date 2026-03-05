'use client';

import { useRef } from 'react';

export function PremiumLoungeVIP() {
  const groupRef = useRef(null);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.75} />
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
        <meshStandardMaterial color="#e8dcc8" roughness={0.2} metalness={0.05} />
      </mesh>

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
        </group>
      ))}

      {/* COFFEE TABLE - Center luxury */}
      <group position={[0, 0, 0]}>
        {/* Glass top */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.05, 1.2]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.05} metalness={0.3} transparent opacity={0.8} />
        </mesh>
        {/* Frame */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.1, 1.2]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.5} />
        </mesh>
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
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.05, 0.6]} />
          <meshStandardMaterial color="#e8d4a2" roughness={0.1} metalness={0.6} />
        </mesh>
        {/* Bar front */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.6, 0.6]} />
          <meshStandardMaterial color="#3a2a1a" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Glass shelf */}
        <mesh position={[0, 0.8, 0.35]} castShadow>
          <boxGeometry args={[1.1, 0.05, 0.3]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.05} metalness={0.2} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* CRYSTAL CHANDELIER - Center */}
      <group position={[0, 3.3, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#ffd700" roughness={0.1} metalness={0.8} emissive="#ffd700" emissiveIntensity={0.3} />
        </mesh>
        {/* Hanging crystals */}
        {[0, 72, 144, 216, 288].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh key={`crystal-${idx}`} position={[Math.cos(rad) * 0.4, -0.2, Math.sin(rad) * 0.4]} castShadow>
              <boxGeometry args={[0.06, 0.15, 0.06]} />
              <meshStandardMaterial color="#ffd700" roughness={0.05} metalness={0.9} emissive="#ffd700" emissiveIntensity={0.2} />
            </mesh>
          );
        })}
      </group>

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
      <pointLight position={[-3.5, 2.5, 0.5]} intensity={0.9} castShadow color="#ffd700" />
      <pointLight position={[3.5, 2.5, 0.5]} intensity={0.9} castShadow color="#ffd700" />
      <pointLight position={[0, 3.2, 0]} intensity={1.0} castShadow color="#ffffcc" />
    </group>
  );
}
