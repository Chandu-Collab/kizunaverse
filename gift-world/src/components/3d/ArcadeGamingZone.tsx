'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, PointLight } from 'three';

export function ArcadeGamingZone() {
  const groupRef = useRef(null);
  const vrArenaRef = useRef<Group | null>(null);
  const beaconLeftRef = useRef<Group | null>(null);
  const beaconRightRef = useRef<Group | null>(null);
  const pulseLightsRef = useRef<PointLight[]>([]);
  const cabinetZ = [-2.6, -1.0, 0.6, 2.2];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (vrArenaRef.current) {
      vrArenaRef.current.rotation.y = Math.sin(t * 0.28) * 0.05;
    }

    if (beaconLeftRef.current) {
      beaconLeftRef.current.rotation.y = t * 2.0;
    }

    if (beaconRightRef.current) {
      beaconRightRef.current.rotation.y = -t * 2.0;
    }

    pulseLightsRef.current.forEach((light, idx) => {
      if (!light) return;
      light.intensity = 0.65 + Math.sin(t * 2.2 + idx * 1.5) * 0.22;
    });
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.7} color="#b8c6d8" />
      <hemisphereLight intensity={0.45} color="#dbe8ff" groundColor="#111827" />
      <directionalLight position={[2, 5, 3]} intensity={0.95} castShadow color="#f7f5ef" />

      {/* WALLS */}
      <mesh position={[-6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#2b3447" roughness={0.45} metalness={0.12} />
      </mesh>
      <mesh position={[6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#2b3447" roughness={0.45} metalness={0.12} />
      </mesh>
      <mesh position={[0, 1.8, -4]} scale={[12, 3.6, 0.1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#33415a" roughness={0.38} metalness={0.1} />
      </mesh>

      {/* CEILING */}
      <mesh position={[0, 3.5, 0]} scale={[12, 0.1, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#080d18" roughness={0.5} metalness={0.15} />
      </mesh>

      {/* FLOOR - Dark epoxy */}
      <mesh position={[0, -0.05, 0]} scale={[12, 0.1, 8]} receiveShadow>
        <boxGeometry />
        <meshPhysicalMaterial color="#0b0f17" roughness={0.16} metalness={0.08} clearcoat={0.65} clearcoatRoughness={0.24} />
      </mesh>
      {/* Floor lanes for walk flow and realism */}
      {[-2.4, 0, 2.4].map((x, idx) => (
        <mesh key={`lane-${idx}`} position={[x, 0.003, -0.1]}>
          <boxGeometry args={[0.45, 0.003, 7.2]} />
          <meshStandardMaterial color="#1f2937" roughness={0.7} metalness={0} emissive="#1f2937" emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* Ceiling truss with LED strips */}
      <group position={[0, 3.25, 0]}>
        <mesh position={[0, 0, -2.8]} castShadow>
          <boxGeometry args={[10.8, 0.1, 0.18]} />
          <meshStandardMaterial color="#1b2433" roughness={0.4} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[10.8, 0.1, 0.18]} />
          <meshStandardMaterial color="#1b2433" roughness={0.4} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0, 2.8]} castShadow>
          <boxGeometry args={[10.8, 0.1, 0.18]} />
          <meshStandardMaterial color="#1b2433" roughness={0.4} metalness={0.35} />
        </mesh>
        <mesh position={[0, -0.06, -2.8]}>
          <boxGeometry args={[10.4, 0.02, 0.08]} />
          <meshStandardMaterial color="#6ef3ff" emissive="#6ef3ff" emissiveIntensity={0.55} />
        </mesh>
        <mesh position={[0, -0.06, 0]}>
          <boxGeometry args={[10.4, 0.02, 0.08]} />
          <meshStandardMaterial color="#ff53b0" emissive="#ff53b0" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, -0.06, 2.8]}>
          <boxGeometry args={[10.4, 0.02, 0.08]} />
          <meshStandardMaterial color="#8cff5b" emissive="#8cff5b" emissiveIntensity={0.52} />
        </mesh>
      </group>

      {/* Rotating beacons for subtle arcade motion */}
      <group ref={beaconLeftRef} position={[-4.9, 3.12, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.12, 12]} />
          <meshStandardMaterial color="#1f2937" roughness={0.35} metalness={0.32} />
        </mesh>
        <mesh position={[0, -0.08, 0.18]}>
          <coneGeometry args={[0.09, 0.26, 10]} />
          <meshStandardMaterial color="#ff3ea5" emissive="#ff3ea5" emissiveIntensity={0.38} transparent opacity={0.86} />
        </mesh>
      </group>
      <group ref={beaconRightRef} position={[4.9, 3.12, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.12, 12]} />
          <meshStandardMaterial color="#1f2937" roughness={0.35} metalness={0.32} />
        </mesh>
        <mesh position={[0, -0.08, 0.18]}>
          <coneGeometry args={[0.09, 0.26, 10]} />
          <meshStandardMaterial color="#61f0ff" emissive="#61f0ff" emissiveIntensity={0.38} transparent opacity={0.86} />
        </mesh>
      </group>

      {/* ARCADE CABINETS - Left lane (facing center) */}
      {cabinetZ.map((z, idx) => (
        <group key={`cabinet-left-${idx}`} position={[-4.9, 0, z]} rotation={[0, Math.PI / 2, 0]}>
          <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.95, 1.9, 0.9]} />
            <meshStandardMaterial color={['#ef4444', '#3b82f6', '#22c55e', '#f97316'][idx % 4]} roughness={0.35} metalness={0.18} />
          </mesh>
          <mesh position={[0, 1.72, -0.16]} castShadow receiveShadow>
            <boxGeometry args={[0.85, 0.32, 0.52]} />
            <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.22} />
          </mesh>
          <mesh position={[0, 1.3, -0.42]} castShadow>
            <boxGeometry args={[0.72, 0.62, 0.05]} />
            <meshStandardMaterial color="#05070d" roughness={0.08} metalness={0.42} emissive={['#34d399', '#60a5fa', '#f472b6', '#fde047'][idx % 4]} emissiveIntensity={0.28} />
          </mesh>
          <mesh position={[0, 0.72, -0.34]} castShadow receiveShadow>
            <boxGeometry args={[0.76, 0.18, 0.45]} />
            <meshStandardMaterial color="#1f2937" roughness={0.38} metalness={0.3} />
          </mesh>
          {[-0.22, 0, 0.22].map((x, bIdx) => (
            <mesh key={`cabinet-left-btn-${idx}-${bIdx}`} position={[x, 0.77, -0.46]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 0.03, 12]} />
              <meshStandardMaterial color={['#ef4444', '#22d3ee', '#fde047'][bIdx % 3]} emissive={['#ef4444', '#22d3ee', '#fde047'][bIdx % 3]} emissiveIntensity={0.35} />
            </mesh>
          ))}
          <mesh position={[-0.28, 0.78, -0.46]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.08, 10]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.55} roughness={0.2} />
          </mesh>
          <mesh position={[-0.28, 0.85, -0.46]} castShadow>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={0.35} roughness={0.18} />
          </mesh>
        </group>
      ))}

      {/* ARCADE CABINETS - Right lane (facing center) */}
      {cabinetZ.map((z, idx) => (
        <group key={`cabinet-right-${idx}`} position={[4.9, 0, z]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.95, 1.9, 0.9]} />
            <meshStandardMaterial color={['#eab308', '#a855f7', '#06b6d4', '#fb7185'][idx % 4]} roughness={0.35} metalness={0.18} />
          </mesh>
          <mesh position={[0, 1.72, -0.16]} castShadow receiveShadow>
            <boxGeometry args={[0.85, 0.32, 0.52]} />
            <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.22} />
          </mesh>
          <mesh position={[0, 1.3, -0.42]} castShadow>
            <boxGeometry args={[0.72, 0.62, 0.05]} />
            <meshStandardMaterial color="#05070d" roughness={0.08} metalness={0.42} emissive={['#22d3ee', '#f472b6', '#a3e635', '#f59e0b'][idx % 4]} emissiveIntensity={0.28} />
          </mesh>
          <mesh position={[0, 0.72, -0.34]} castShadow receiveShadow>
            <boxGeometry args={[0.76, 0.18, 0.45]} />
            <meshStandardMaterial color="#1f2937" roughness={0.38} metalness={0.3} />
          </mesh>
          {[-0.22, 0, 0.22].map((x, bIdx) => (
            <mesh key={`cabinet-right-btn-${idx}-${bIdx}`} position={[x, 0.77, -0.46]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 0.03, 12]} />
              <meshStandardMaterial color={['#ef4444', '#22d3ee', '#fde047'][bIdx % 3]} emissive={['#ef4444', '#22d3ee', '#fde047'][bIdx % 3]} emissiveIntensity={0.35} />
            </mesh>
          ))}
          <mesh position={[-0.28, 0.78, -0.46]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.08, 10]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.55} roughness={0.2} />
          </mesh>
          <mesh position={[-0.28, 0.85, -0.46]} castShadow>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.35} roughness={0.18} />
          </mesh>
        </group>
      ))}

      {/* Player stools in front of machine lanes */}
      {[-2.4, -0.8, 0.8, 2.4].map((z, idx) => (
        <group key={`stool-left-${idx}`} position={[-3.8, 0, z]}>
          <mesh position={[0, 0.34, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.08, 14]} />
            <meshStandardMaterial color="#1f2937" roughness={0.35} metalness={0.22} />
          </mesh>
          <mesh position={[0, 0.16, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.28, 10]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.28} metalness={0.55} />
          </mesh>
        </group>
      ))}
      {[-2.4, -0.8, 0.8, 2.4].map((z, idx) => (
        <group key={`stool-right-${idx}`} position={[3.8, 0, z]}>
          <mesh position={[0, 0.34, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.08, 14]} />
            <meshStandardMaterial color="#1f2937" roughness={0.35} metalness={0.22} />
          </mesh>
          <mesh position={[0, 0.16, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.28, 10]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.28} metalness={0.55} />
          </mesh>
        </group>
      ))}

      {/* VR ARENA - Back center */}
      <group ref={vrArenaRef} position={[0, 0, -1.75]}>
        <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.45, 1.5, 0.12, 28]} />
          <meshStandardMaterial color="#1f2937" roughness={0.32} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <torusGeometry args={[1.45, 0.04, 12, 40]} />
          <meshStandardMaterial color="#334155" roughness={0.25} metalness={0.65} />
        </mesh>
        {[0, 90, 180, 270].map((deg, idx) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh key={`vr-pole-${idx}`} position={[Math.cos(rad) * 1.45, 0.38, Math.sin(rad) * 1.45]} castShadow>
              <cylinderGeometry args={[0.03, 0.03, 0.76, 10]} />
              <meshStandardMaterial color="#64748b" roughness={0.28} metalness={0.62} />
            </mesh>
          );
        })}
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[0.32, 0.22, 0.22]} />
          <meshStandardMaterial color="#0b1220" roughness={0.3} metalness={0.38} emissive="#22d3ee" emissiveIntensity={0.25} />
        </mesh>
        <mesh position={[0.22, 0.46, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.14, 10]} />
          <meshStandardMaterial color="#334155" roughness={0.25} metalness={0.55} />
        </mesh>
        <mesh position={[-0.22, 0.46, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.14, 10]} />
          <meshStandardMaterial color="#334155" roughness={0.25} metalness={0.55} />
        </mesh>
      </group>

      {/* AIR HOCKEY TABLE - Center */}
      <group position={[0, 0, 0.35]}>
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.9, 1.1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.32} />
        </mesh>
        <mesh position={[0, 0.92, 0]} castShadow>
          <boxGeometry args={[2.0, 0.05, 0.95]} />
          <meshPhysicalMaterial color="#ecfeff" roughness={0.08} metalness={0.06} clearcoat={0.72} clearcoatRoughness={0.16} />
        </mesh>
        <mesh position={[-0.45, 0.95, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 14]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.25} />
        </mesh>
        <mesh position={[0.45, 0.95, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 14]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.25} />
        </mesh>
      </group>

      {/* DUAL RACING PODS - Front zone */}
      {[-1.5, 1.5].map((x, idx) => (
        <group key={`racing-pod-${idx}`} position={[x, 0, 2.45]} rotation={[0, Math.PI, 0]}>
          <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.15, 0.64, 1.55]} />
            <meshStandardMaterial color={idx === 0 ? '#ef4444' : '#3b82f6'} roughness={0.33} metalness={0.22} />
          </mesh>
          <mesh position={[0, 0.62, -0.2]} castShadow receiveShadow>
            <boxGeometry args={[0.72, 0.62, 0.58]} />
            <meshStandardMaterial color="#111827" roughness={0.35} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0.93, -0.72]} castShadow>
            <boxGeometry args={[0.68, 0.36, 0.06]} />
            <meshStandardMaterial color="#05070d" roughness={0.1} metalness={0.42} emissive={idx === 0 ? '#f97316' : '#22d3ee'} emissiveIntensity={0.32} />
          </mesh>
          <mesh position={[0, 0.73, -0.24]} castShadow>
            <torusGeometry args={[0.16, 0.04, 10, 24]} />
            <meshStandardMaterial color="#111827" roughness={0.28} metalness={0.5} />
          </mesh>
          {[ -0.16, 0, 0.16 ].map((px, pIdx) => (
            <mesh key={`pedal-${idx}-${pIdx}`} position={[px, 0.2, -0.58]} castShadow>
              <boxGeometry args={[0.1, 0.05, 0.16]} />
              <meshStandardMaterial color="#374151" roughness={0.38} metalness={0.35} />
            </mesh>
          ))}
        </group>
      ))}

      {/* CLAW MACHINE - Back-right corner */}
      <group position={[5.0, 0, -2.6]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 2.1, 0.95]} />
          <meshStandardMaterial color="#0f172a" roughness={0.32} metalness={0.22} />
        </mesh>
        <mesh position={[0, 1.2, -0.46]} castShadow>
          <boxGeometry args={[0.84, 1.45, 0.05]} />
          <meshPhysicalMaterial color="#f8fafc" roughness={0.04} transmission={0.86} thickness={0.06} transparent opacity={0.95} />
        </mesh>
        <mesh position={[0, 2.08, -0.43]} castShadow>
          <boxGeometry args={[0.82, 0.24, 0.06]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.45} />
        </mesh>
        {[[-0.24, 0.42], [0, 0.38], [0.24, 0.44]].map((p, idx) => (
          <mesh key={`plush-${idx}`} position={[p[0], p[1], -0.24]} castShadow>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial color={['#f472b6', '#fde047', '#60a5fa'][idx % 3]} roughness={0.55} metalness={0.05} />
          </mesh>
        ))}
      </group>

      {/* NEON SIGNAGE */}
      {[-4.3, -1.6, 1.2, 4.0].map((x, idx) => (
        <mesh key={`neon-${idx}`} position={[x, 2.95, -3.82]} castShadow>
          <boxGeometry args={[1.5, 0.45, 0.06]} />
          <meshStandardMaterial color="#090c14" roughness={0.2} emissive={['#ff3ea5', '#61f0ff', '#9cff57', '#ffd447'][idx % 4]} emissiveIntensity={0.55} />
        </mesh>
      ))}

      {/* SCORE RIBBON DISPLAY */}
      <mesh position={[0, 3.05, 0]} castShadow>
        <boxGeometry args={[3.4, 0.32, 0.07]} />
        <meshStandardMaterial color="#0a1020" roughness={0.15} emissive="#22d3ee" emissiveIntensity={0.28} />
      </mesh>

      {/* Floor glow accents */}
      {[[-3.0, -1.8], [0, -1.8], [3.0, -1.8], [-3.0, 1.9], [3.0, 1.9]].map((p, idx) => (
        <mesh key={`floor-accent-${idx}`} position={[p[0], 0.004, p[1]]}>
          <boxGeometry args={[1.4, 0.008, 0.34]} />
          <meshStandardMaterial color={['#ff3ea5', '#61f0ff', '#9cff57', '#ffd447', '#ff3ea5'][idx]} emissive={['#ff3ea5', '#61f0ff', '#9cff57', '#ffd447', '#ff3ea5'][idx]} emissiveIntensity={0.35} roughness={0.32} metalness={0.2} />
        </mesh>
      ))}

      {/* NEON POINT LIGHTS */}
      <pointLight
        ref={(el) => {
          if (el) pulseLightsRef.current[0] = el;
        }}
        position={[-4.6, 2.3, -0.2]}
        intensity={1.1}
        castShadow
        color="#ff3ea5"
        distance={8}
      />
      <pointLight
        ref={(el) => {
          if (el) pulseLightsRef.current[1] = el;
        }}
        position={[4.6, 2.3, -0.2]}
        intensity={1.1}
        castShadow
        color="#61f0ff"
        distance={8}
      />
      <pointLight
        ref={(el) => {
          if (el) pulseLightsRef.current[2] = el;
        }}
        position={[0, 2.6, -2.0]}
        intensity={0.9}
        castShadow
        color="#9cff57"
        distance={8}
      />
      <pointLight
        ref={(el) => {
          if (el) pulseLightsRef.current[3] = el;
        }}
        position={[0, 2.0, 2.2]}
        intensity={0.8}
        castShadow
        color="#ffd447"
        distance={7}
      />
    </group>
  );
}
