'use client';

import { useRef } from 'react';

export function ArtGallery() {
  const groupRef = useRef(null);

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
          <meshStandardMaterial color="#ff6b6b" roughness={0.4} metalness={0.05} />
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
          <meshStandardMaterial color="#4ecdc4" roughness={0.4} metalness={0.05} />
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
          <meshStandardMaterial color="#ffd93d" roughness={0.4} metalness={0.05} />
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
          <meshStandardMaterial color="#a8e6cf" roughness={0.4} metalness={0.05} />
        </mesh>
      </group>

      {/* BACK WALL GALLERY WALL 1 */}
      <group position={[-2.5, 1.8, -3.95]}>
        {/* Frame 1 */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.6, 0.6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Canvas 1 */}
        <mesh position={[0.05, 0.3, 0]} castShadow>
          <boxGeometry args={[0.05, 0.55, 0.55]} />
          <meshStandardMaterial color="#ff1493" roughness={0.4} metalness={0.05} />
        </mesh>
        {/* Frame 2 */}
        <mesh position={[-1.2, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.6, 0.6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Canvas 2 */}
        <mesh position={[-1.15, 0.3, 0]} castShadow>
          <boxGeometry args={[0.05, 0.55, 0.55]} />
          <meshStandardMaterial color="#00bfff" roughness={0.4} metalness={0.05} />
        </mesh>
      </group>

      {/* BACK WALL GALLERY WALL 2 */}
      <group position={[2.5, 1.8, -3.95]}>
        {/* Frame 1 */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.6, 0.6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Canvas 1 */}
        <mesh position={[0.05, 0.3, 0]} castShadow>
          <boxGeometry args={[0.05, 0.55, 0.55]} />
          <meshStandardMaterial color="#32cd32" roughness={0.4} metalness={0.05} />
        </mesh>
        {/* Frame 2 */}
        <mesh position={[-1.2, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.6, 0.6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Canvas 2 */}
        <mesh position={[-1.15, 0.3, 0]} castShadow>
          <boxGeometry args={[0.05, 0.55, 0.55]} />
          <meshStandardMaterial color="#ff8c00" roughness={0.4} metalness={0.05} />
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

      {/* AMBIENT LIGHTING POINTS */}
      <pointLight position={[-3.0, 2.2, 0.5]} intensity={1.3} castShadow color="#ffffff" />
      <pointLight position={[3.0, 2.2, 0.5]} intensity={1.3} castShadow color="#ffffff" />
      <pointLight position={[0, 2.2, -1.5]} intensity={1.4} castShadow color="#ffffff" />
      <pointLight position={[0, 2.0, 2.5]} intensity={1.2} castShadow color="#ffffff" />
    </group>
  );
}
