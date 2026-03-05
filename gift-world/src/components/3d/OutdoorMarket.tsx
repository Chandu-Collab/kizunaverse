'use client';

import { useRef } from 'react';

export function OutdoorMarket() {
  const groupRef = useRef(null);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} castShadow />

      {/* WALLS */}
      <mesh position={[-6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#f5f0e8" roughness={0.3} />
      </mesh>
      <mesh position={[6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#f5f0e8" roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.8, -4]} scale={[12, 3.6, 0.1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#e8dcc8" roughness={0.3} />
      </mesh>
      <mesh position={[0, 3.5, 0]} scale={[12, 0.1, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>

      {/* FLOOR */}
      <mesh position={[0, -0.05, 0]} scale={[12, 0.1, 8]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#d2b48c" roughness={0.5} />
      </mesh>

      {/* MARKET STALLS */}
      {/* Stall 1 - Left */}
      <group position={[-3.5, 0, 0.5]}>
        <mesh position={[0, 0.5, -0.3]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.0, 0.6]} />
          <meshStandardMaterial color="#8b6f47" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 1.1, -0.3]} castShadow>
          <boxGeometry args={[1.3, 0.2, 0.7]} />
          <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Spices/goods */}
        {[0, 0.3, 0.6].map((z, idx) => (
          <mesh key={`goods-${idx}`} position={[0, 0.75, z - 0.6]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.2, 8]} />
            <meshStandardMaterial color={['#ff6600', '#dd0000', '#ffff00'][idx % 3]} roughness={0.5} metalness={0.05} />
          </mesh>
        ))}
      </group>

      {/* Stall 2 - Center left */}
      <group position={[-1.0, 0, 1.2]}>
        <mesh position={[0, 0.5, -0.3]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.0, 0.6]} />
          <meshStandardMaterial color="#8b6f47" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 1.1, -0.3]} castShadow>
          <boxGeometry args={[1.3, 0.2, 0.7]} />
          <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Vegetables/fruits */}
        {[0, 0.3].map((z, idx) => (
          <mesh key={`fruit-${idx}`} position={[0, 0.8, z - 0.45]} castShadow>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color={['#00aa00', '#dd8800'][idx % 2]} roughness={0.6} metalness={0.05} />
          </mesh>
        ))}
      </group>

      {/* Stall 3 - Center right */}
      <group position={[1.0, 0, 1.2]}>
        <mesh position={[0, 0.5, -0.3]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.0, 0.6]} />
          <meshStandardMaterial color="#8b6f47" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 1.1, -0.3]} castShadow>
          <boxGeometry args={[1.3, 0.2, 0.7]} />
          <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.5} />
        </mesh>
      </group>

      {/* Stall 4 - Right */}
      <group position={[3.5, 0, 0.5]}>
        <mesh position={[0, 0.5, -0.3]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.0, 0.6]} />
          <meshStandardMaterial color="#8b6f47" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 1.1, -0.3]} castShadow>
          <boxGeometry args={[1.3, 0.2, 0.7]} />
          <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.5} />
        </mesh>
      </group>

      {/* DECORATIVE BUNTING */}
      {[-4, -1, 2].map((x, idx) => (
        <mesh key={`pennant-${idx}`} position={[x, 2.5, 0]} castShadow>
          <boxGeometry args={[0.3, 0.4, 0.2]} />
          <meshStandardMaterial color={['#ff1493', '#00ffff', '#0fff00'][idx % 3]} roughness={0.4} metalness={0.2} />
        </mesh>
      ))}

      {/* SEATING BENCHES */}
      <group position={[0, 0, -1.8]}>
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.3, 0.5]} />
          <meshStandardMaterial color="#6b5344" roughness={0.4} metalness={0.1} />
        </mesh>
      </group>

      {/* LANTERNS - Hanging */}
      {[-3, 0, 3].map((x, idx) => (
        <group key={`lantern-${idx}`} position={[x, 2.8, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.2, 0.3, 0.2]} />
            <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.3} />
          </mesh>
          <mesh position={[0, -0.05, 0]} castShadow>
            <boxGeometry args={[0.18, 0.15, 0.18]} />
            <meshStandardMaterial 
              color="#ffff99" 
              emissive="#ffff99" 
              emissiveIntensity={0.3} 
              roughness={0.2} 
              metalness={0.2} 
            />
          </mesh>
        </group>
      ))}

      <pointLight position={[-3.5, 2.0, 0.5]} intensity={1.2} castShadow color="#ffffff" />
      <pointLight position={[3.5, 2.0, 0.5]} intensity={1.2} castShadow color="#ffffff" />
      <pointLight position={[0, 2.0, 1.5]} intensity={1.1} castShadow color="#ffffff" />
    </group>
  );
}
