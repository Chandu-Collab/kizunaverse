'use client';

import { useRef } from 'react';

export function AdventureZone() {
  const groupRef = useRef(null);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 4, 3]} intensity={1.0} castShadow />

      {/* WALLS */}
      <mesh position={[-6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#c2b5a3" roughness={0.3} />
      </mesh>
      <mesh position={[6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#c2b5a3" roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.8, -4]} scale={[12, 3.6, 0.1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#d4a574" roughness={0.3} />
      </mesh>
      <mesh position={[0, 3.5, 0]} scale={[12, 0.1, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#e8e0d0" roughness={0.2} />
      </mesh>

      {/* FLOOR */}
      <mesh position={[0, -0.05, 0]} scale={[12, 0.1, 8]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#8b7355" roughness={0.5} />
      </mesh>

      {/* ROCK CLIMBING WALL - Left */}
      <group position={[-5.3, 1.2, 0.5]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 2.4, 2.0]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.6} metalness={0} />
        </mesh>
        {/* Climbing holds */}
        {[0, 0.6, 1.2, 1.8].map((y, idx) => (
          [-0.6, 0, 0.6].map((z, sidx) => (
            <mesh key={`hold-${idx}-${sidx}`} position={[0, 0.8 + y, z - 0.8]} castShadow>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial color={['#ff1493', '#00ffff', '#0fff00'][sidx % 3]} roughness={0.4} metalness={0.2} />
            </mesh>
          ))
        ))}
      </group>

      {/* ZIP LINE STRUCTURE - Right side */}
      <group position={[4.0, 0.5, -1.0]}>
        {/* Support pole */}
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.15, 2.0, 0.15]} />
          <meshStandardMaterial color="#8b6f47" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Zip line cable (visual) */}
        <mesh position={[0, 1.8, 2.0]} castShadow>
          <boxGeometry args={[0.08, 0.08, 3.0]} />
          <meshStandardMaterial color="#888888" roughness={0.5} metalness={0.5} />
        </mesh>
      </group>

      {/* ROPE COURSE RINGS - Center */}
      {[0, 1.0].map((z, idx) => (
        <group key={`ring-${idx}`} position={[0, 1.5, z - 0.5]}>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <torusGeometry args={[0.2, 0.05, 8, 16]} />
            <meshStandardMaterial color={idx % 2 === 0 ? '#ff1493' : '#00ffff'} roughness={0.4} metalness={0.2} />
          </mesh>
        </group>
      ))}

      {/* BALANCE BEAM - Back */}
      <group position={[0, 0.4, -2.5]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.2, 0.25]} />
          <meshStandardMaterial color="#0fff00" roughness={0.5} metalness={0.05} />
        </mesh>
      </group>

      {/* SAFETY NETS - Corners */}
      <mesh position={[-4.5, 1.2, 1.5]} scale={[1.5, 1.2, 1.5]} castShadow>
        <boxGeometry />
        <meshStandardMaterial color="#ffffff" opacity={0.3} transparent roughness={0.4} />
      </mesh>

      {/* INFLATABLE OBSTACLES */}
      {[-2.0, 2.0].map((x, idx) => (
        <mesh key={`inflatable-${idx}`} position={[x, 0.5, 1.5]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.0, 0.6]} />
          <meshStandardMaterial color={['#ff6600', '#ffff00'][idx % 2]} roughness={0.4} metalness={0.05} />
        </mesh>
      ))}

      <pointLight position={[-3.5, 2.2, 0.5]} intensity={1.1} castShadow color="#ffffff" />
      <pointLight position={[3.5, 2.2, 0.5]} intensity={1.1} castShadow color="#ffffff" />
      <pointLight position={[0, 2.0, -1.5]} intensity={1.2} castShadow color="#ffffff" />
    </group>
  );
}
