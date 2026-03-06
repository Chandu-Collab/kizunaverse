'use client';

import { useRef } from 'react';

export function ArtGallery() {
  const groupRef = useRef(null);
  const sculptureZones = [
    { x: -2.0, z: 1.5 },
    { x: 0.5, z: -1.0 },
    { x: 2.0, z: 1.5 },
  ] as const;

  return (
    <group ref={groupRef}>
      {/* AMBIENT LIGHTING */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 4, 2]} intensity={1.2} castShadow />

      {/* WALLS */}
      <mesh position={[-6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#f5f5f0" roughness={0.3} />
      </mesh>
      <mesh position={[6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#f5f5f0" roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.8, -4]} scale={[12, 3.6, 0.1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#f5f5f0" roughness={0.3} />
      </mesh>
      <mesh position={[0, 3.5, 0]} scale={[12, 0.1, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>

      {/* FLOOR - Polished concrete/marble */}
      <mesh position={[0, -0.05, 0]} scale={[12, 0.1, 8]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#e0e0e0" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* ARCHITECTURAL COLUMNS - Left side */}
      <mesh position={[-4.5, 1.2, 1.0]} scale={[0.25, 2.4, 0.25]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#d9d9d9" roughness={0.3} metalness={0.05} />
      </mesh>

      {/* ARCHITECTURAL COLUMNS - Right side */}
      <mesh position={[4.5, 1.2, 1.0]} scale={[0.25, 2.4, 0.25]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#d9d9d9" roughness={0.3} metalness={0.05} />
      </mesh>

      {/* GALLERY ENTRANCE SIGNAGE */}
      <group position={[0, 2.95, 3.2]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.5, 0.08]} />
          <meshStandardMaterial color="#2f2f2f" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.09, 0.05]}>
          <boxGeometry args={[1.6, 0.07, 0.02]} />
          <meshStandardMaterial color="#f2f2f2" roughness={0.2} metalness={0.1} />
        </mesh>
        <mesh position={[0, -0.03, 0.05]}>
          <boxGeometry args={[1.15, 0.05, 0.02]} />
          <meshStandardMaterial color="#cfcfcf" roughness={0.2} metalness={0.1} />
        </mesh>
        <mesh position={[0, -0.13, 0.05]}>
          <boxGeometry args={[0.85, 0.04, 0.02]} />
          <meshStandardMaterial color="#b8b8b8" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>

      {/* SCULPTURE DISPLAY PEDESTAL 1 - Center front */}
      <group position={[-2.0, 0, 1.5]}>
        {/* Pedestal base */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.7, 0.6]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Sculpture on pedestal - Abstract form */}
        <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
          <tetrahedronGeometry args={[0.25]} />
          <meshStandardMaterial color="#d4af37" roughness={0.15} metalness={0.8} />
        </mesh>
      </group>

      {/* SCULPTURE DISPLAY PEDESTAL 2 - Center mid */}
      <group position={[0.5, 0, -1.0]}>
        {/* Pedestal base */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.7, 0.6]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Sculpture - Smooth sphere */}
        <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color="#c0c0c0" roughness={0.1} metalness={0.9} />
        </mesh>
      </group>

      {/* SCULPTURE DISPLAY PEDESTAL 3 - Right side */}
      <group position={[2.0, 0, 1.5]}>
        {/* Pedestal base */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.7, 0.6]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Sculpture - Twisted form */}
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.2, 0.5, 8]} />
          <meshStandardMaterial color="#8b4513" roughness={0.25} metalness={0.3} />
        </mesh>
      </group>

      {/* PROTECTIVE BARRIERS AROUND SCULPTURES */}
      {sculptureZones.map((zone, zoneIdx) => (
        <group key={`barrier-zone-${zoneIdx}`}>
          {[[-0.65, -0.65], [0.65, -0.65], [-0.65, 0.65], [0.65, 0.65]].map((offset, idx) => (
            <mesh
              key={`barrier-post-${zoneIdx}-${idx}`}
              position={[zone.x + offset[0], 0.38, zone.z + offset[1]]}
              castShadow
              receiveShadow
            >
              <cylinderGeometry args={[0.04, 0.04, 0.75, 12]} />
              <meshStandardMaterial color="#3c3c3c" roughness={0.35} metalness={0.5} />
            </mesh>
          ))}
          <mesh position={[zone.x, 0.62, zone.z - 0.65]} castShadow>
            <boxGeometry args={[1.3, 0.03, 0.03]} />
            <meshStandardMaterial color="#8c1f1f" roughness={0.45} metalness={0.05} />
          </mesh>
          <mesh position={[zone.x, 0.62, zone.z + 0.65]} castShadow>
            <boxGeometry args={[1.3, 0.03, 0.03]} />
            <meshStandardMaterial color="#8c1f1f" roughness={0.45} metalness={0.05} />
          </mesh>
          <mesh position={[zone.x - 0.65, 0.62, zone.z]} castShadow>
            <boxGeometry args={[0.03, 0.03, 1.3]} />
            <meshStandardMaterial color="#8c1f1f" roughness={0.45} metalness={0.05} />
          </mesh>
          <mesh position={[zone.x + 0.65, 0.62, zone.z]} castShadow>
            <boxGeometry args={[0.03, 0.03, 1.3]} />
            <meshStandardMaterial color="#8c1f1f" roughness={0.45} metalness={0.05} />
          </mesh>
        </group>
      ))}

      {/* WALL PAINTING 1 - Left wall upper */}
      <group position={[-5.9, 1.8, -1.0]}>
        {/* Frame */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.8, 0.8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Canvas */}
        <mesh position={[0.05, 0, 0]} castShadow>
          <boxGeometry args={[0.05, 0.75, 0.75]} />
          <meshStandardMaterial color="#f9d9d9" roughness={0.4} metalness={0.05} />
        </mesh>
        <mesh position={[0.08, 0.12, -0.12]} castShadow>
          <boxGeometry args={[0.02, 0.22, 0.18]} />
          <meshStandardMaterial color="#ff6b6b" roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh position={[0.08, -0.1, 0.08]} castShadow>
          <boxGeometry args={[0.02, 0.18, 0.28]} />
          <meshStandardMaterial color="#355c7d" roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh position={[0.08, 0.0, 0.2]} castShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.02, 24]} />
          <meshStandardMaterial color="#f8b500" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Info plaque */}
        <mesh position={[-0.05, -0.55, 0]} castShadow>
          <boxGeometry args={[0.7, 0.08, 0.02]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>

      {/* WALL PAINTING 2 - Left wall lower */}
      <group position={[-5.9, 0.8, 1.2]}>
        {/* Frame */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.7, 0.75]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Canvas */}
        <mesh position={[0.05, 0, 0]} castShadow>
          <boxGeometry args={[0.05, 0.65, 0.7]} />
          <meshStandardMaterial color="#d8f2ef" roughness={0.4} metalness={0.05} />
        </mesh>
        <mesh position={[0.08, 0.12, 0]} castShadow>
          <boxGeometry args={[0.02, 0.18, 0.52]} />
          <meshStandardMaterial color="#4ecdc4" roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh position={[0.08, -0.06, 0]} castShadow>
          <boxGeometry args={[0.02, 0.12, 0.52]} />
          <meshStandardMaterial color="#1a535c" roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh position={[0.08, 0.03, -0.16]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.02, 20]} />
          <meshStandardMaterial color="#ff6b6b" roughness={0.35} metalness={0.05} />
        </mesh>
        {/* Info plaque */}
        <mesh position={[-0.05, -0.5, 0]} castShadow>
          <boxGeometry args={[0.65, 0.08, 0.02]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>

      {/* WALL PAINTING 3 - Right wall upper */}
      <group position={[5.9, 1.8, -1.0]}>
        {/* Frame */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.8, 0.8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Canvas */}
        <mesh position={[-0.05, 0, 0]} castShadow>
          <boxGeometry args={[0.05, 0.75, 0.75]} />
          <meshStandardMaterial color="#fff4bf" roughness={0.4} metalness={0.05} />
        </mesh>
        <mesh position={[-0.08, 0.14, 0]} castShadow>
          <boxGeometry args={[0.02, 0.2, 0.5]} />
          <meshStandardMaterial color="#ffd93d" roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh position={[-0.08, -0.06, 0]} castShadow>
          <boxGeometry args={[0.02, 0.12, 0.45]} />
          <meshStandardMaterial color="#6c5ce7" roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh position={[-0.08, 0.0, -0.18]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 20]} />
          <meshStandardMaterial color="#ff8c42" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Info plaque */}
        <mesh position={[0.05, -0.55, 0]} castShadow>
          <boxGeometry args={[0.7, 0.08, 0.02]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>

      {/* WALL PAINTING 4 - Right wall lower */}
      <group position={[5.9, 0.8, 1.2]}>
        {/* Frame */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.7, 0.75]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Canvas */}
        <mesh position={[-0.05, 0, 0]} castShadow>
          <boxGeometry args={[0.05, 0.65, 0.7]} />
          <meshStandardMaterial color="#e7fff3" roughness={0.4} metalness={0.05} />
        </mesh>
        <mesh position={[-0.08, 0.1, -0.12]} castShadow rotation={[0, 0, 0.35]}>
          <boxGeometry args={[0.02, 0.16, 0.42]} />
          <meshStandardMaterial color="#a8e6cf" roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh position={[-0.08, -0.02, 0.1]} castShadow rotation={[0, 0, -0.25]}>
          <boxGeometry args={[0.02, 0.14, 0.34]} />
          <meshStandardMaterial color="#2a9d8f" roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh position={[-0.08, 0.15, 0.2]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 20]} />
          <meshStandardMaterial color="#264653" roughness={0.35} metalness={0.05} />
        </mesh>
        {/* Info plaque */}
        <mesh position={[0.05, -0.5, 0]} castShadow>
          <boxGeometry args={[0.65, 0.08, 0.02]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>

      {/* BACK WALL GALLERY WALL 1 */}
      <group position={[-2.5, 1.8, -3.95]}>
        {/* Frame 1 */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.7, 0.08]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Canvas 1 */}
        <mesh position={[0, 0.3, 0.05]} castShadow>
          <boxGeometry args={[0.9, 0.6, 0.03]} />
          <meshStandardMaterial color="#ffe1f3" roughness={0.4} metalness={0.05} />
        </mesh>
        <mesh position={[0.18, 0.32, 0.075]} castShadow>
          <boxGeometry args={[0.25, 0.16, 0.015]} />
          <meshStandardMaterial color="#ff1493" roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh position={[-0.18, 0.18, 0.075]} castShadow>
          <boxGeometry args={[0.2, 0.14, 0.015]} />
          <meshStandardMaterial color="#8a2be2" roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh position={[0, 0.4, 0.075]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.015, 24]} />
          <meshStandardMaterial color="#f77f00" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Plaque 1 */}
        <mesh position={[0, -0.2, 0.05]} castShadow>
          <boxGeometry args={[0.62, 0.08, 0.02]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Frame 2 */}
        <mesh position={[-1.2, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.7, 0.08]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Canvas 2 */}
        <mesh position={[-1.2, 0.3, 0.05]} castShadow>
          <boxGeometry args={[0.9, 0.6, 0.03]} />
          <meshStandardMaterial color="#dff7ff" roughness={0.4} metalness={0.05} />
        </mesh>
        <mesh position={[-1.35, 0.3, 0.075]} castShadow rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.28, 0.12, 0.015]} />
          <meshStandardMaterial color="#00bfff" roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh position={[-1.0, 0.26, 0.075]} castShadow rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.22, 0.11, 0.015]} />
          <meshStandardMaterial color="#1d3557" roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh position={[-1.22, 0.43, 0.075]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.015, 24]} />
          <meshStandardMaterial color="#e63946" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Plaque 2 */}
        <mesh position={[-1.2, -0.2, 0.05]} castShadow>
          <boxGeometry args={[0.62, 0.08, 0.02]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>

      {/* BACK WALL GALLERY WALL 2 */}
      <group position={[2.5, 1.8, -3.95]}>
        {/* Frame 1 */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.7, 0.08]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Canvas 1 */}
        <mesh position={[0, 0.3, 0.05]} castShadow>
          <boxGeometry args={[0.9, 0.6, 0.03]} />
          <meshStandardMaterial color="#e8ffe8" roughness={0.4} metalness={0.05} />
        </mesh>
        <mesh position={[0.14, 0.36, 0.075]} castShadow>
          <boxGeometry args={[0.24, 0.12, 0.015]} />
          <meshStandardMaterial color="#32cd32" roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh position={[-0.18, 0.24, 0.075]} castShadow>
          <boxGeometry args={[0.2, 0.1, 0.015]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh position={[0.0, 0.17, 0.075]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.015, 24]} />
          <meshStandardMaterial color="#f4a261" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Plaque 1 */}
        <mesh position={[0, -0.2, 0.05]} castShadow>
          <boxGeometry args={[0.62, 0.08, 0.02]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Frame 2 */}
        <mesh position={[-1.2, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.7, 0.08]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Canvas 2 */}
        <mesh position={[-1.2, 0.3, 0.05]} castShadow>
          <boxGeometry args={[0.9, 0.6, 0.03]} />
          <meshStandardMaterial color="#fff0de" roughness={0.4} metalness={0.05} />
        </mesh>
        <mesh position={[-1.05, 0.34, 0.075]} castShadow>
          <boxGeometry args={[0.23, 0.13, 0.015]} />
          <meshStandardMaterial color="#ff8c00" roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh position={[-1.33, 0.23, 0.075]} castShadow>
          <boxGeometry args={[0.2, 0.12, 0.015]} />
          <meshStandardMaterial color="#e76f51" roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh position={[-1.2, 0.42, 0.075]} castShadow>
          <cylinderGeometry args={[0.075, 0.075, 0.015, 24]} />
          <meshStandardMaterial color="#3d405b" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Plaque 2 */}
        <mesh position={[-1.2, -0.2, 0.05]} castShadow>
          <boxGeometry args={[0.62, 0.08, 0.02]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>

      {/* TRACK LIGHTING FIXTURES */}
      {[-5.5, -2.5, 0.5, 3.5, 5.5].map((x, idx) => (
        <group key={`light-${idx}`} position={[x, 3.4, 1.0]}>
          {/* Track */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.08, 0.08, 1.2]} />
            <meshStandardMaterial color="#333333" roughness={0.5} metalness={0.3} />
          </mesh>
          {/* Light fixture */}
          <mesh position={[0, -0.15, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.15, 8]} />
            <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.5} />
          </mesh>
          {/* Light emissive */}
          <mesh position={[0, -0.25, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.05, 8]} />
            <meshStandardMaterial 
              color="#ffff99" 
              emissive="#ffff99" 
              emissiveIntensity={0.5} 
              roughness={0.2} 
              metalness={0.3} 
            />
          </mesh>
        </group>
      ))}

      {/* INFORMATION KIOSK - Center */}
      <group position={[0, 0, -2.5]}>
        {/* Kiosk structure */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.9, 0.6]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.4} metalness={0.15} />
        </mesh>
        {/* Display screen area */}
        <mesh position={[0, 0.35, -0.28]} castShadow>
          <boxGeometry args={[0.7, 0.5, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.5} />
        </mesh>
      </group>

      {/* SEATING BENCH - Viewing area */}
      <group position={[0, 0, 3.0]}>
        {/* Bench seat */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.7, 0.6]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Back support */}
        <mesh position={[0, 0.9, -0.25]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.35, 0.1]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.3} metalness={0.1} />
        </mesh>
      </group>

      {/* DECORATIVE VASE ON PEDESTAL - Left corner */}
      <group position={[-4.8, 0, -2.0]}>
        {/* Pedestal */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.7, 0.3]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Vase */}
        <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.35, 8]} />
          <meshStandardMaterial color="#d4a574" roughness={0.2} metalness={0.4} />
        </mesh>
      </group>

      {/* DECORATIVE VASE ON PEDESTAL - Right corner */}
      <group position={[4.8, 0, -2.0]}>
        {/* Pedestal */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.7, 0.3]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Vase */}
        <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.35, 8]} />
          <meshStandardMaterial color="#d4a574" roughness={0.2} metalness={0.4} />
        </mesh>
      </group>

      {/* EMERGENCY EXIT INDICATORS */}
      <group position={[-5.2, 3.0, -3.85]}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 0.22, 0.05]} />
          <meshStandardMaterial color="#1f8f4f" roughness={0.25} metalness={0.1} />
        </mesh>
        <mesh position={[0.1, 0, 0.03]}>
          <boxGeometry args={[0.42, 0.06, 0.01]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.05} />
        </mesh>
      </group>
      <group position={[5.2, 3.0, -3.85]}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 0.22, 0.05]} />
          <meshStandardMaterial color="#1f8f4f" roughness={0.25} metalness={0.1} />
        </mesh>
        <mesh position={[-0.1, 0, 0.03]}>
          <boxGeometry args={[0.42, 0.06, 0.01]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.05} />
        </mesh>
      </group>

      {/* SECURITY CAMERAS */}
      <group position={[-5.65, 3.15, 3.2]} rotation={[0.1, 0.7, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.14, 0.08, 0.14]} />
          <meshStandardMaterial color="#d7d7d7" roughness={0.25} metalness={0.35} />
        </mesh>
        <mesh position={[0.12, -0.05, -0.02]} castShadow>
          <boxGeometry args={[0.24, 0.09, 0.09]} />
          <meshStandardMaterial color="#ececec" roughness={0.2} metalness={0.25} />
        </mesh>
        <mesh position={[0.23, -0.05, -0.02]}>
          <cylinderGeometry args={[0.03, 0.03, 0.03, 16]} />
          <meshStandardMaterial color="#2b2b2b" roughness={0.15} metalness={0.5} />
        </mesh>
      </group>
      <group position={[5.65, 3.15, 3.2]} rotation={[0.1, -0.7, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.14, 0.08, 0.14]} />
          <meshStandardMaterial color="#d7d7d7" roughness={0.25} metalness={0.35} />
        </mesh>
        <mesh position={[-0.12, -0.05, -0.02]} castShadow>
          <boxGeometry args={[0.24, 0.09, 0.09]} />
          <meshStandardMaterial color="#ececec" roughness={0.2} metalness={0.25} />
        </mesh>
        <mesh position={[-0.23, -0.05, -0.02]}>
          <cylinderGeometry args={[0.03, 0.03, 0.03, 16]} />
          <meshStandardMaterial color="#2b2b2b" roughness={0.15} metalness={0.5} />
        </mesh>
      </group>
      <group position={[0, 3.2, -3.75]} rotation={[0.2, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.14, 0.08, 0.14]} />
          <meshStandardMaterial color="#d7d7d7" roughness={0.25} metalness={0.35} />
        </mesh>
        <mesh position={[0, -0.05, 0.1]} castShadow>
          <boxGeometry args={[0.1, 0.09, 0.22]} />
          <meshStandardMaterial color="#ececec" roughness={0.2} metalness={0.25} />
        </mesh>
        <mesh position={[0, -0.05, 0.22]}>
          <cylinderGeometry args={[0.03, 0.03, 0.03, 16]} />
          <meshStandardMaterial color="#2b2b2b" roughness={0.15} metalness={0.5} />
        </mesh>
      </group>

      {/* FLOOR PATH GUIDES */}
      <mesh position={[0, 0.006, 2.2]} receiveShadow>
        <boxGeometry args={[3.4, 0.01, 0.08]} />
        <meshStandardMaterial
          color="#b08d57"
          roughness={0.25}
          metalness={0.7}
          emissive="#4a3f2b"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[0, 0.006, 0.8]} receiveShadow>
        <boxGeometry args={[3.4, 0.01, 0.08]} />
        <meshStandardMaterial
          color="#b08d57"
          roughness={0.25}
          metalness={0.7}
          emissive="#4a3f2b"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[0, 0.006, -0.6]} receiveShadow>
        <boxGeometry args={[3.4, 0.01, 0.08]} />
        <meshStandardMaterial
          color="#b08d57"
          roughness={0.25}
          metalness={0.7}
          emissive="#4a3f2b"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[-3.15, 0.006, 0.8]} receiveShadow>
        <boxGeometry args={[0.08, 0.01, 3.2]} />
        <meshStandardMaterial
          color="#b08d57"
          roughness={0.25}
          metalness={0.7}
          emissive="#4a3f2b"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[3.15, 0.006, 0.8]} receiveShadow>
        <boxGeometry args={[0.08, 0.01, 3.2]} />
        <meshStandardMaterial
          color="#b08d57"
          roughness={0.25}
          metalness={0.7}
          emissive="#4a3f2b"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Soft LED guide pips */}
      {[
        [-1.2, 0.012, 2.2],
        [0, 0.012, 2.2],
        [1.2, 0.012, 2.2],
        [-1.2, 0.012, 0.8],
        [0, 0.012, 0.8],
        [1.2, 0.012, 0.8],
        [-1.2, 0.012, -0.6],
        [0, 0.012, -0.6],
        [1.2, 0.012, -0.6],
      ].map((pos, idx) => (
        <mesh key={`guide-pip-${idx}`} position={[pos[0], pos[1], pos[2]]}>
          <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
          <meshStandardMaterial
            color="#f8e7a2"
            emissive="#f8e7a2"
            emissiveIntensity={0.45}
            roughness={0.2}
            metalness={0.15}
          />
        </mesh>
      ))}

      {/* AMBIENT LIGHTING POINTS */}
      <pointLight position={[-3.0, 2.2, 0.5]} intensity={1.3} castShadow color="#ffffff" />
      <pointLight position={[3.0, 2.2, 0.5]} intensity={1.3} castShadow color="#ffffff" />
      <pointLight position={[0, 2.2, -1.5]} intensity={1.4} castShadow color="#ffffff" />
      <pointLight position={[0, 2.0, 2.5]} intensity={1.2} castShadow color="#ffffff" />

      {/* Artwork accent lights for the back wall */}
      <pointLight position={[-2.2, 2.9, -3.0]} intensity={0.9} color="#fff7e0" />
      <pointLight position={[2.2, 2.9, -3.0]} intensity={0.9} color="#fff7e0" />
    </group>
  );
}
