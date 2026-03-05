'use client';

import { useRef } from 'react';

export function MeditationTemple() {
  const groupRef = useRef(null);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 4, 3]} intensity={0.8} castShadow />

      {/* WALLS - Calm colors */}
      <mesh position={[-6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#e8dcc8" roughness={0.4} />
      </mesh>
      <mesh position={[6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#e8dcc8" roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.8, -4]} scale={[12, 3.6, 0.1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#d4c4b0" roughness={0.4} />
      </mesh>

      {/* CEILING - Soft */}
      <mesh position={[0, 3.5, 0]} scale={[12, 0.1, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#e0d5c7" roughness={0.5} />
      </mesh>

      {/* FLOOR - Wood */}
      <mesh position={[0, -0.05, 0]} scale={[12, 0.1, 8]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#8b7355" roughness={0.6} />
      </mesh>

      {/* MEDITATION ALTAR - Center */}
      <group position={[0, 0.5, -1.5]}>
        {/* Base platform */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.2, 2.0]} />
          <meshStandardMaterial color="#6b5344" roughness={0.4} />
        </mesh>
        {/* Buddha statue silhouette */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#4a3f35" roughness={0.5} emissive="#4a3f35" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* MEDITATION CUSHIONS - Seating area */}
      {[
        { pos: [-2.0, 0.3, 0.5], color: '#8b4789' },
        { pos: [2.0, 0.3, 0.5], color: '#4a6a8b' },
        { pos: [-1.0, 0.3, 1.5], color: '#8b6b4a' },
        { pos: [1.0, 0.3, 1.5], color: '#4a8b8b' }
      ].map((cushion, idx) => (
        <group key={`cushion-${idx}`} position={cushion.pos as [number, number, number]}>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.5, 0.2, 8]} />
            <meshStandardMaterial color={cushion.color} roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* CANDLES - Ambient lighting */}
      {[
        { pos: [-4.0, 0.5, 0], color: '#ff9900' },
        { pos: [4.0, 0.5, 0], color: '#ff9900' },
        { pos: [0, 0.5, -3.5], color: '#ffaa00' },
        { pos: [-2.0, 0.5, -2.5], color: '#ff9900' },
        { pos: [2.0, 0.5, -2.5], color: '#ffaa00' }
      ].map((candle, idx) => (
        <group key={`candle-${idx}`} position={candle.pos as [number, number, number]}>
          {/* Candle holder */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.1, 0.12, 0.15, 8]} />
            <meshStandardMaterial color="#3a3a3a" roughness={0.3} />
          </mesh>
          {/* Flame glow */}
          <pointLight position={[0, 0.3, 0]} intensity={0.8} castShadow color={candle.color} distance={2} />
        </group>
      ))}

      {/* PRAYER STRINGS - Decorative */}
      {[-3.5, 0, 3.5].map((x, idx) => (
        <group key={`string-${idx}`} position={[x, 2.0, -3.8]}>
          {[0, 0.3, 0.6, 0.9, 1.2].map((y, sidx) => (
            <mesh key={`bead-${sidx}`} position={[0, -y, 0]} castShadow>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color={['#ff6600', '#ffaa00', '#ff9900', '#ffbb00', '#ff8800'][sidx % 5]} roughness={0.4} metalness={0.2} />
            </mesh>
          ))}
        </group>
      ))}

      {/* WATER FEATURE - Zen fountain */}
      <group position={[0, 0.4, 2.0]}>
        {/* Bowl */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.6, 0.7, 0.25, 16]} />
          <meshStandardMaterial color="#8b7355" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Center stone */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#5a5a5a" roughness={0.4} />
        </mesh>
      </group>

      {/* SOFT LANTERNS - Hanging */}
      {[-2.5, 2.5].map((x, idx) => (
        <group key={`lantern-${idx}`} position={[x, 2.8, 0.5]}>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.4, 0.5, 0.4]} />
            <meshStandardMaterial color="#4a3a2a" roughness={0.5} emissive="#ff9900" emissiveIntensity={0.3} />
          </mesh>
          <pointLight position={[0, 0, 0]} intensity={0.7} color="#ffaa00" />
        </group>
      ))}

      {/* MEDITATION BELL - Decorative */}
      <group position={[-4.5, 1.5, -1.5]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.22, 0.25, 8]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* AMBIENT GLOW - Soft points */}
      <pointLight position={[-3.0, 1.5, 1.0]} intensity={0.6} castShadow color="#ffaa00" />
      <pointLight position={[3.0, 1.5, 1.0]} intensity={0.6} castShadow color="#ffaa00" />
    </group>
  );
}
