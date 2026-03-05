'use client';

import { useRef } from 'react';

export function BotanicalGarden() {
  const groupRef = useRef(null);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 4, 3]} intensity={1.1} castShadow />

      {/* WALLS - conservatory glass effect */}
      <mesh position={[-6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#d0f0e0" roughness={0.1} metalness={0.05} />
      </mesh>
      <mesh position={[6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#d0f0e0" roughness={0.1} metalness={0.05} />
      </mesh>
      <mesh position={[0, 1.8, -4]} scale={[12, 3.6, 0.1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#d0f0e0" roughness={0.1} metalness={0.05} />
      </mesh>

      {/* CEILING - glass */}
      <mesh position={[0, 3.5, 0]} scale={[12, 0.1, 8]}>
        <boxGeometry />
        <meshStandardMaterial color="#a8e6d3" roughness={0.05} metalness={0.1} />
      </mesh>

      {/* FLOOR - soil/wood path */}
      <mesh position={[0, -0.05, 0]} scale={[12, 0.1, 8]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#8b7355" roughness={0.6} />
      </mesh>

      {/* TALL PALM TREES - Back corners */}
      {[-4.5, 4.5].map((x, idx) => (
        <group key={`palm-${idx}`} position={[x, 0, -2.5]}>
          {/* Trunk */}
          <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.25, 0.3, 2.0, 8]} />
            <meshStandardMaterial color="#8b7355" roughness={0.4} />
          </mesh>
          {/* Leaves */}
          {[0, 72, 144, 216, 288].map((angle, lidx) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <mesh key={`leaf-${lidx}`} position={[Math.cos(rad) * 0.6, 2.2, Math.sin(rad) * 0.6]} castShadow>
                <boxGeometry args={[0.3, 1.0, 0.1]} />
                <meshStandardMaterial color={['#00cc00', '#00dd00', '#00ee00', '#00ff00', '#00cc00'][lidx % 5]} roughness={0.5} />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* FLOWER BEDS - Front rows */}
      {[-3.5, -1.0, 1.5, 4.0].map((x, idx) => (
        <group key={`flowers-${idx}`} position={[x, 0, 1.5]}>
          <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.9, 0.3, 0.7]} />
            <meshStandardMaterial color="#8b4513" roughness={0.5} />
          </mesh>
          {/* Colorful flowers */}
          {[0, 0.25, 0.5, -0.25, -0.5].map((offset, fidx) => (
            <mesh key={`flower-${fidx}`} position={[offset * 1.2, 0.4, 0]} castShadow>
              <sphereGeometry args={[0.15, 8, 8]} />
              <meshStandardMaterial color={['#ff1493', '#ff69b4', '#ff6347', '#ffd700', '#ff6600'][fidx % 5]} roughness={0.4} metalness={0.1} />
            </mesh>
          ))}
        </group>
      ))}

      {/* POTTED PLANTS - Shelving area */}
      {[-4.0, -2.0, 0, 2.0, 4.0].map((x, pidx) => (
        <group key={`potted-${pidx}`} position={[x, 0, -1.5]}>
          {/* Pot */}
          <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.3, 0.35, 0.4, 8]} />
            <meshStandardMaterial color={['#d4a574', '#8b6f47', '#c9b388', '#a89968', '#8b7355'][pidx % 5]} roughness={0.3} />
          </mesh>
          {/* Plant */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshStandardMaterial color={['#00aa00', '#00bb00', '#00cc00', '#00dd00', '#00ee00'][pidx % 5]} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* DECORATIVE FOUNTAIN - Center */}
      <group position={[0, 0, 0.5]}>
        {/* Base */}
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 1.0, 0.3, 16]} />
          <meshStandardMaterial color="#8b7355" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Bowl */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 0.6, 0.2, 16]} />
          <meshStandardMaterial color="#aaaaaa" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Central spire */}
        <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.2, 0.6, 8]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.2} metalness={0.6} emissive="#00ffff" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* VINES on walls - decorative */}
      {[-5.5, 5.5].map((x, idx) => (
        <group key={`vine-${idx}`} position={[x, 2.0, 0]}>
          {[0, 0.5, 1.0].map((y, vidx) => (
            <mesh key={`vine-segment-${vidx}`} position={[0, -y, 0]} castShadow>
              <boxGeometry args={[0.1, 0.3, 0.05]} />
              <meshStandardMaterial color="#00aa00" roughness={0.6} />
            </mesh>
          ))}
        </group>
      ))}

      {/* WOODEN BENCHES - Seating */}
      {[-2.5, 2.5].map((x, idx) => (
        <mesh key={`bench-${idx}`} position={[x, 0.15, -2.0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.3, 0.4]} />
          <meshStandardMaterial color="#6b5344" roughness={0.5} />
        </mesh>
      ))}

      {/* AMBIENT LIGHTING - Green glow */}
      <pointLight position={[-4.0, 2.5, 1.0]} intensity={1.0} castShadow color="#00ff99" />
      <pointLight position={[4.0, 2.5, 1.0]} intensity={1.0} castShadow color="#00ff99" />
      <pointLight position={[0, 2.0, -1.5]} intensity={1.2} castShadow color="#ffffff" />
    </group>
  );
}
