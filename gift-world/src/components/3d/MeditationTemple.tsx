'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointLight } from 'three';

export function MeditationTemple() {
  const groupRef = useRef(null);
  const flameLightsRef = useRef<Array<PointLight | null>>([]);
  const lanternLightsRef = useRef<Array<PointLight | null>>([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    flameLightsRef.current.forEach((light, idx) => {
      if (!light) return;
      light.intensity = 0.52 + Math.sin(t * 4.2 + idx * 1.6) * 0.1;
    });

    lanternLightsRef.current.forEach((light, idx) => {
      if (!light) return;
      light.intensity = 0.45 + Math.sin(t * 1.6 + idx * 2.0) * 0.06;
    });
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.55} color="#f3eadb" />
      <hemisphereLight intensity={0.35} color="#fff6e6" groundColor="#4f4336" />
      <directionalLight position={[2, 4.5, 3]} intensity={0.82} castShadow color="#fff1d6" />

      {/* WALLS - Warm plaster */}
      <mesh position={[-6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#d8c8af" roughness={0.62} metalness={0.02} />
      </mesh>
      <mesh position={[6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#d8c8af" roughness={0.62} metalness={0.02} />
      </mesh>
      <mesh position={[0, 1.8, -4]} scale={[12, 3.6, 0.1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#ccb79c" roughness={0.6} metalness={0.02} />
      </mesh>

      {/* Wooden wall trims */}
      <mesh position={[-5.85, 1.0, 0]} scale={[0.08, 2.0, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#7d654c" roughness={0.45} metalness={0.12} />
      </mesh>
      <mesh position={[5.85, 1.0, 0]} scale={[0.08, 2.0, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#7d654c" roughness={0.45} metalness={0.12} />
      </mesh>
      <mesh position={[0, 3.25, -3.85]} scale={[11.7, 0.08, 0.14]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#7d654c" roughness={0.45} metalness={0.12} />
      </mesh>

      {/* CEILING - Soft */}
      <mesh position={[0, 3.5, 0]} scale={[12, 0.1, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#e7dccb" roughness={0.58} />
      </mesh>

      {/* FLOOR - Polished cedar */}
      <mesh position={[0, -0.05, 0]} scale={[12, 0.1, 8]} receiveShadow>
        <boxGeometry />
        <meshPhysicalMaterial color="#8c6f51" roughness={0.36} metalness={0.05} clearcoat={0.52} clearcoatRoughness={0.24} />
      </mesh>
      {[-3.5, -1.6, 0.3, 2.2].map((x, idx) => (
        <mesh key={`floor-strip-${idx}`} position={[x, 0.002, 0]}>
          <boxGeometry args={[0.08, 0.004, 8]} />
          <meshStandardMaterial color="#a18362" roughness={0.55} metalness={0.02} />
        </mesh>
      ))}

      {/* MEDITATION ALTAR - Main shrine */}
      <group position={[0, 0, -1.5]}>
        <mesh position={[0, 0.07, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.7, 0.14, 2.3]} />
          <meshStandardMaterial color="#6d5643" roughness={0.45} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.1, 1.7]} />
          <meshStandardMaterial color="#80654c" roughness={0.4} metalness={0.08} />
        </mesh>

        {/* Lotus base */}
        <mesh position={[0, 0.34, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.45, 0.52, 0.14, 18]} />
          <meshStandardMaterial color="#c9a35f" roughness={0.28} metalness={0.38} />
        </mesh>
        {/* Statue body */}
        <mesh position={[0, 0.58, 0]} castShadow>
          <cylinderGeometry args={[0.24, 0.34, 0.38, 16]} />
          <meshStandardMaterial color="#8a744f" roughness={0.36} metalness={0.2} emissive="#8a744f" emissiveIntensity={0.08} />
        </mesh>
        {/* Statue head */}
        <mesh position={[0, 0.86, 0.02]} castShadow>
          <sphereGeometry args={[0.16, 18, 18]} />
          <meshStandardMaterial color="#8a744f" roughness={0.35} metalness={0.2} emissive="#8a744f" emissiveIntensity={0.08} />
        </mesh>
        {/* Back halo disc */}
        <mesh position={[0, 0.84, -0.16]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.04, 18]} />
          <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.62} emissive="#d4af37" emissiveIntensity={0.16} />
        </mesh>
      </group>

      {/* MEDITATION CUSHIONS - Seating area */}
      {[
        { pos: [-2.0, 0.1, 0.5], color: '#8b4789' },
        { pos: [2.0, 0.1, 0.5], color: '#4a6a8b' },
        { pos: [-1.0, 0.1, 1.5], color: '#8b6b4a' },
        { pos: [1.0, 0.1, 1.5], color: '#4a8b8b' }
      ].map((cushion, idx) => (
        <group key={`cushion-${idx}`} position={cushion.pos as [number, number, number]}>
          <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.48, 0.5, 0.16, 18]} />
            <meshStandardMaterial color={cushion.color} roughness={0.72} metalness={0.02} />
          </mesh>
          <mesh position={[0, 0.16, 0]} castShadow>
            <cylinderGeometry args={[0.39, 0.42, 0.06, 18]} />
            <meshStandardMaterial color="#f2e8d7" roughness={0.82} metalness={0} />
          </mesh>
        </group>
      ))}

      {/* Tatami prayer mats */}
      {[-2.0, 2.0, -1.0, 1.0].map((x, idx) => (
        <mesh key={`tatami-${idx}`} position={[x, 0.005, idx < 2 ? 0.5 : 1.5]} rotation={[0, idx % 2 === 0 ? 0.1 : -0.1, 0]}>
          <boxGeometry args={[1.1, 0.01, 0.75]} />
          <meshStandardMaterial color="#c8b487" roughness={0.88} metalness={0} />
        </mesh>
      ))}

      {/* CANDLES - Ambient lighting */}
      {[
        { pos: [-4.0, 0.08, 0], color: '#ff9900' },
        { pos: [4.0, 0.08, 0], color: '#ff9900' },
        { pos: [0, 0.08, -3.5], color: '#ffaa00' },
        { pos: [-2.0, 0.08, -2.5], color: '#ff9900' },
        { pos: [2.0, 0.08, -2.5], color: '#ffaa00' }
      ].map((candle, idx) => (
        <group key={`candle-${idx}`} position={candle.pos as [number, number, number]}>
          {/* Candle holder */}
          <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.1, 0.12, 0.15, 8]} />
            <meshStandardMaterial color="#3d3328" roughness={0.35} metalness={0.25} />
          </mesh>
          {/* Wax body */}
          <mesh position={[0, 0.14, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.16, 10]} />
            <meshStandardMaterial color="#f3e9cf" roughness={0.72} metalness={0} />
          </mesh>
          {/* Flame body */}
          <mesh position={[0, 0.26, 0]} castShadow>
            <coneGeometry args={[0.035, 0.08, 10]} />
            <meshStandardMaterial color="#ffb347" emissive="#ffb347" emissiveIntensity={0.65} roughness={0.2} transparent opacity={0.88} />
          </mesh>
          {/* Flame glow */}
          <pointLight
            ref={(el) => {
              flameLightsRef.current[idx] = el;
            }}
            position={[0, 0.32, 0]}
            intensity={0.62}
            castShadow
            color={candle.color}
            distance={2.2}
          />
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
      <group position={[0, 0, 2.0]}>
        {/* Bowl */}
        <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.64, 0.76, 0.24, 20]} />
          <meshStandardMaterial color="#8b7355" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Water */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.5, 0.52, 0.04, 18]} />
          <meshPhysicalMaterial color="#8fd3ff" roughness={0.08} metalness={0.02} transmission={0.72} thickness={0.08} transparent opacity={0.9} />
        </mesh>
        {/* Center stone */}
        <mesh position={[0, 0.36, 0]} castShadow>
          <sphereGeometry args={[0.16, 10, 10]} />
          <meshStandardMaterial color="#5a5a5a" roughness={0.4} metalness={0.1} />
        </mesh>
      </group>

      {/* Bonsai decor */}
      {[-4.7, 4.7].map((x, idx) => (
        <group key={`bonsai-${idx}`} position={[x, 0, 2.7]}>
          <mesh position={[0, 0.14, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.22, 0.28, 0.2, 12]} />
            <meshStandardMaterial color="#6f5741" roughness={0.4} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.34, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.07, 0.22, 8]} />
            <meshStandardMaterial color="#5b4632" roughness={0.55} />
          </mesh>
          <mesh position={[0, 0.5, 0]} castShadow>
            <sphereGeometry args={[0.18, 10, 10]} />
            <meshStandardMaterial color="#4f7d46" roughness={0.7} metalness={0.02} />
          </mesh>
        </group>
      ))}

      {/* SOFT LANTERNS - Hanging */}
      {[-2.5, 2.5].map((x, idx) => (
        <group key={`lantern-${idx}`} position={[x, 2.8, 0.5]}>
          <mesh position={[0, 0.35, 0]} castShadow>
            <cylinderGeometry args={[0.01, 0.01, 0.7, 8]} />
            <meshStandardMaterial color="#574530" roughness={0.4} metalness={0.25} />
          </mesh>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.45, 12]} />
            <meshStandardMaterial color="#e8d5b8" roughness={0.65} emissive="#ffba66" emissiveIntensity={0.22} />
          </mesh>
          <pointLight
            ref={(el) => {
              lanternLightsRef.current[idx] = el;
            }}
            position={[0, -0.03, 0]}
            intensity={0.45}
            color="#ffbf73"
            distance={4.5}
          />
        </group>
      ))}

      {/* MEDITATION BELL - Decorative */}
      <group position={[-4.5, 1.5, -1.5]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.22, 0.25, 8]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* Incense stand near altar */}
      <group position={[0, 0.22, -0.35]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.06, 0.12]} />
          <meshStandardMaterial color="#5d4835" roughness={0.42} metalness={0.08} />
        </mesh>
        {[-0.12, 0, 0.12].map((x, idx) => (
          <mesh key={`incense-${idx}`} position={[x, 0.09, 0]} castShadow>
            <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
            <meshStandardMaterial color="#2f2f2f" roughness={0.6} metalness={0.15} />
          </mesh>
        ))}
      </group>

      {/* AMBIENT GLOW - Soft points */}
      <pointLight position={[-3.0, 1.5, 1.0]} intensity={0.46} castShadow color="#ffc277" />
      <pointLight position={[3.0, 1.5, 1.0]} intensity={0.46} castShadow color="#ffc277" />
    </group>
  );
}
