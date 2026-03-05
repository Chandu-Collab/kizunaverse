'use client';

import { useRef } from 'react';

export function ArcadeGamingZone() {
  const groupRef = useRef(null);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.85} />
      <directionalLight position={[2, 4, 3]} intensity={1.0} castShadow />

      {/* WALLS */}
      <mesh position={[-6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>
      <mesh position={[6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.8, -4]} scale={[12, 3.6, 0.1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#222222" roughness={0.2} />
      </mesh>

      {/* CEILING */}
      <mesh position={[0, 3.5, 0]} scale={[12, 0.1, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#0a0a0a" roughness={0.4} />
      </mesh>

      {/* FLOOR */}
      <mesh position={[0, -0.05, 0]} scale={[12, 0.1, 8]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#0a0a0a" roughness={0.5} />
      </mesh>

      {/* ARCADE CABINET - Left row */}
      {[0, 1.6, 3.2].map((z, idx) => (
        <group key={`cabinet-left-${idx}`} position={[-4.0, 0.8, z - 2.2]}>
          {/* Cabinet body */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 1.6, 0.5]} />
            <meshStandardMaterial color={['#ff0066', '#0066ff', '#00ff66'][idx % 3]} roughness={0.3} metalness={0.2} />
          </mesh>
          {/* Screen */}
          <mesh position={[0, 0.4, -0.26]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.8, 0.05]} />
            <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.3} emissive="#00ffff" emissiveIntensity={0.4} />
          </mesh>
          {/* Controls */}
          <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.4, 0.4]} />
            <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.3} />
          </mesh>
        </group>
      ))}

      {/* ARCADE CABINET - Right row */}
      {[0, 1.6, 3.2].map((z, idx) => (
        <group key={`cabinet-right-${idx}`} position={[4.0, 0.8, z - 2.2]}>
          {/* Cabinet body */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 1.6, 0.5]} />
            <meshStandardMaterial color={['#ffff00', '#ff00ff', '#00ffff'][idx % 3]} roughness={0.3} metalness={0.2} />
          </mesh>
          {/* Screen */}
          <mesh position={[0, 0.4, -0.26]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.8, 0.05]} />
            <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.3} emissive="#00ffff" emissiveIntensity={0.4} />
          </mesh>
          {/* Controls */}
          <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.4, 0.4]} />
            <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.3} />
          </mesh>
        </group>
      ))}

      {/* VR GAMING STATION - Center */}
      <group position={[0, 0.8, -1.5]}>
        {/* VR Platform */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.1, 1.5]} />
          <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.4} />
        </mesh>
        {/* VR Headset stand */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.5, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} />
        </mesh>
      </group>

      {/* RACING SIM RIG - Front */}
      <group position={[0, 0.5, 1.8]}>
        {/* Seat */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.4, 0.8]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.5} />
        </mesh>
        {/* Wheel */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <torusGeometry args={[0.35, 0.08, 8, 16]} />
          <meshStandardMaterial color="#222222" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Pedals */}
        <mesh position={[-0.2, 0, 0.3]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.1, 0.2]} />
          <meshStandardMaterial color="#333333" roughness={0.5} />
        </mesh>
      </group>

      {/* NEON SIGNAGE - Game titles */}
      {[-4.0, 0, 4.0].map((x, idx) => (
        <mesh key={`neon-${idx}`} position={[x, 2.8, -3.8]} castShadow>
          <boxGeometry args={[1.2, 0.4, 0.05]} />
          <meshStandardMaterial color="#000000" roughness={0.1} emissive={['#ff0066', '#00ff66', '#00ffff'][idx % 3]} emissiveIntensity={0.6} />
        </mesh>
      ))}

      {/* SCORE DISPLAY - Top */}
      <mesh position={[0, 3.2, 0]} castShadow>
        <boxGeometry args={[2.0, 0.3, 0.05]} />
        <meshStandardMaterial color="#000000" roughness={0.1} emissive="#ffff00" emissiveIntensity={0.5} />
      </mesh>

      {/* COLORFUL FLOOR ACCENTS */}
      {[-3.0, 0, 3.0].map((x, idx) => (
        <mesh key={`floor-accent-${idx}`} position={[x, 0.0, 0]} castShadow>
          <boxGeometry args={[1.5, 0.02, 1.5]} />
          <meshStandardMaterial color={['#ff0066', '#00ff66', '#00ffff'][idx % 3]} roughness={0.3} metalness={0.4} emissive={['#ff0066', '#00ff66', '#00ffff'][idx % 3]} emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* NEON POINT LIGHTS */}
      <pointLight position={[-4.0, 2.5, 0]} intensity={1.2} castShadow color="#ff0066" />
      <pointLight position={[4.0, 2.5, 0]} intensity={1.2} castShadow color="#00ffff" />
      <pointLight position={[0, 2.0, -1.5]} intensity={1.0} castShadow color="#00ff66" />
      <pointLight position={[0, 2.0, 1.5]} intensity={1.0} castShadow color="#ffff00" />
    </group>
  );
}
