'use client';

import { useRef } from 'react';

export function BusinessLounge() {
  const groupRef = useRef(null);
  const meetingChairs = [
    { position: [0, 0, 2.0] as const, rotationY: Math.PI },
    { position: [0, 0, -0.4] as const, rotationY: 0 },
    { position: [-1.95, 0, 0.8] as const, rotationY: -Math.PI / 2 },
    { position: [1.95, 0, 0.8] as const, rotationY: Math.PI / 2 },
  ];

  return (
    <group ref={groupRef}>
      {/* AMBIENT LIGHTING */}
      <ambientLight intensity={1.05} color="#f4f1e8" />
      <hemisphereLight intensity={0.6} groundColor="#2f3d4a" color="#ffffff" />
      <directionalLight position={[2, 5, 4]} intensity={1.35} color="#fff4d6" castShadow />

      {/* WALLS */}
      <mesh position={[-6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#3b5369" roughness={0.4} />
      </mesh>
      <mesh position={[6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#3b5369" roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.8, -4]} scale={[12, 3.6, 0.1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#425d75" roughness={0.4} />
      </mesh>
      <mesh position={[0, 3.5, 0]} scale={[12, 0.1, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#3a3a3a" roughness={0.3} />
      </mesh>

      {/* FLOOR */}
      <mesh position={[0, -0.05, 0]} scale={[12, 0.1, 8]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#2a2a2a" roughness={0.55} />
      </mesh>

      {/* MAIN BAR COUNTER - Back right */}
      <group position={[3.5, 0, -2.5]}>
        {/* Counter structure */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 1.0, 0.8]} />
          <meshStandardMaterial color="#3d2817" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Counter top */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <boxGeometry args={[2.4, 0.1, 0.7]} />
          <meshStandardMaterial color="#d4a574" roughness={0.2} metalness={0.4} />
        </mesh>
        {/* Backbar shelving */}
        <mesh position={[0, 1.4, -0.3]} castShadow receiveShadow>
          <boxGeometry args={[2.3, 1.5, 0.4]} />
          <meshStandardMaterial color="#2c2c2c" roughness={0.4} metalness={0.15} />
        </mesh>
        {/* Bottles on shelves */}
        {[-0.7, -0.3, 0.1, 0.5].map((x, idx) => (
          <mesh key={`bottle-${idx}`} position={[x, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
            <meshStandardMaterial 
              color={['#ffff00', '#ff6600', '#ff0000', '#885533'][idx % 4]} 
              roughness={0.1} 
              metalness={0.5} 
            />
          </mesh>
        ))}
        {/* Bar stools */}
        {[-0.8, 0, 0.8].map((x, idx) => (
          <group key={`stool-${idx}`} position={[x, 0, 0.5]}>
            {/* Seat */}
            <mesh position={[0, 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.2, 0.15, 8]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.2} />
            </mesh>
            {/* Base */}
            <mesh position={[0, 0.1, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.2, 0.2, 8]} />
              <meshStandardMaterial color="#888888" roughness={0.4} metalness={0.5} />
            </mesh>
          </group>
        ))}
      </group>

      {/* LOUNGE SEATING AREA 1 - Left side */}
      <group position={[-3.5, 0, 0.5]}>
        {/* Large sofa */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.6, 1.0]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.65, 0]} castShadow>
          <boxGeometry args={[2.0, 0.4, 0.9]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.5} metalness={0} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 1.05, -0.45]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.35, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Armrest left */}
        <mesh position={[-1.15, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.5, 1.0]} />
          <meshStandardMaterial color="#000000" roughness={0.5} metalness={0} />
        </mesh>
        {/* Armrest right */}
        <mesh position={[1.15, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.5, 1.0]} />
          <meshStandardMaterial color="#000000" roughness={0.5} metalness={0} />
        </mesh>
      </group>

      {/* COCKTAIL TABLE - In front of sofa 1 */}
      <group position={[-3.5, 0, 1.8]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.7, 0.9]} />
          <meshStandardMaterial color="#3d2817" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[1.6, 0.1, 0.7]} />
          <meshStandardMaterial color="#d4a574" roughness={0.2} metalness={0.3} />
        </mesh>
      </group>

      {/* LOUNGE SEATING AREA 2 - Right side */}
      <group position={[3.5, 0, 0.5]}>
        {/* Large sofa */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.6, 1.0]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.65, 0]} castShadow>
          <boxGeometry args={[2.0, 0.4, 0.9]} />
          <meshStandardMaterial color="#34495e" roughness={0.5} metalness={0} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 1.05, -0.45]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.35, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Armrest left */}
        <mesh position={[-1.15, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.5, 1.0]} />
          <meshStandardMaterial color="#000000" roughness={0.5} metalness={0} />
        </mesh>
        {/* Armrest right */}
        <mesh position={[1.15, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.5, 1.0]} />
          <meshStandardMaterial color="#000000" roughness={0.5} metalness={0} />
        </mesh>
      </group>

      {/* COCKTAIL TABLE - In front of sofa 2 */}
      <group position={[3.5, 0, 1.8]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.7, 0.9]} />
          <meshStandardMaterial color="#3d2817" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[1.6, 0.1, 0.7]} />
          <meshStandardMaterial color="#d4a574" roughness={0.2} metalness={0.3} />
        </mesh>
      </group>

      {/* BUSINESS MEETING TABLE - Center front */}
      <group position={[0, 0, 0.8]}>
        {/* Table top */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 0.9, 1.2]} />
          <meshStandardMaterial color="#4a3728" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Surface */}
        <mesh position={[0, 0.95, 0]} castShadow>
          <boxGeometry args={[2.8, 0.1, 1.0]} />
          <meshStandardMaterial color="#d4a574" roughness={0.2} metalness={0.3} />
        </mesh>
      </group>

      {/* EXECUTIVE CHAIRS - Around meeting table */}
      {meetingChairs.map((chair, idx) => (
        <group key={`chair-${idx}`} position={chair.position} rotation={[0, chair.rotationY, 0]}>
          {/* Seat */}
          <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.45, 0.2, 0.45]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.15} />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, 0.65, -0.2]} castShadow receiveShadow>
            <boxGeometry args={[0.45, 0.35, 0.15]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.15} />
          </mesh>
          {/* Base */}
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.2, 8]} />
            <meshStandardMaterial color="#2c2c2c" roughness={0.4} metalness={0.3} />
          </mesh>
        </group>
      ))}

      {/* AV DISPLAY WALL 1 - Left wall */}
      <group position={[-5.8, 1.8, 0]}>
        {/* TV Screen */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.75, 0.08]} />
          <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.6} />
        </mesh>
        {/* Screen gloss */}
        <mesh position={[0, 0, 0.05]} castShadow>
          <boxGeometry args={[1.15, 0.7, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" opacity={0.4} transparent roughness={0.05} metalness={0.8} />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.4, 0.25]} />
          <meshStandardMaterial color="#2c2c2c" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* AV DISPLAY WALL 2 - Right wall */}
      <group position={[5.8, 1.8, 0]}>
        {/* TV Screen */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.75, 0.08]} />
          <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.6} />
        </mesh>
        {/* Screen gloss */}
        <mesh position={[0, 0, 0.05]} castShadow>
          <boxGeometry args={[1.15, 0.7, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" opacity={0.4} transparent roughness={0.05} metalness={0.8} />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.4, 0.25]} />
          <meshStandardMaterial color="#2c2c2c" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* AV DISPLAY CENTER - Back wall */}
      <group position={[0, 1.8, -3.95]}>
        {/* Large TV Screen */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 1.2, 0.08]} />
          <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.6} />
        </mesh>
        {/* Screen gloss */}
        <mesh position={[0, 0, 0.05]} castShadow>
          <boxGeometry args={[1.95, 1.15, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" opacity={0.4} transparent roughness={0.05} metalness={0.8} />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.5, 0.3]} />
          <meshStandardMaterial color="#2c2c2c" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* DECORATIVE ACCENT - Premium Whiskey Decanter */}
      <group position={[-4.5, 0.5, 2.0]}>
        {/* Decanter */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.25, 0.7, 0.25]} />
          <meshStandardMaterial color="#8b4513" opacity={0.7} transparent roughness={0.05} metalness={0.3} />
        </mesh>
        {/* Liquid inside */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.22, 0.5, 0.22]} />
          <meshStandardMaterial color="#d4a574" opacity={0.6} transparent roughness={0.1} metalness={0.2} />
        </mesh>
      </group>

      {/* SIDE TABLE - Left corner */}
      <group position={[-4.5, 0, -1.0]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.7, 0.6]} />
          <meshStandardMaterial color="#3d2817" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Decorative item */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>

      {/* SIDE TABLE - Right corner */}
      <group position={[4.5, 0, -1.0]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.7, 0.6]} />
          <meshStandardMaterial color="#3d2817" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Decorative item */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>

      {/* ACCENT LIGHTING PANELS - Wall mounted */}
      {[0, 1.5].map((x, idx) => (
        <mesh key={`light-panel-${idx}`} position={[x - 3, 2.5, -3.9]} castShadow>
          <boxGeometry args={[0.8, 0.6, 0.08]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            emissive={["#4da6ff", "#ff6b9d"][idx % 2]} 
            emissiveIntensity={0.3} 
            roughness={0.2} 
            metalness={0.4} 
          />
        </mesh>
      ))}

      {/* AMBIENT LIGHTING POINTS */}
      <pointLight position={[-3.5, 2.2, 0.5]} intensity={1.8} castShadow color="#ffffff" />
      <pointLight position={[3.5, 2.2, 0.5]} intensity={1.8} castShadow color="#ffffff" />
      <pointLight position={[0, 2.4, -1.0]} intensity={2.0} castShadow color="#fff9ef" />
      <pointLight position={[3.5, 1.8, -2.5]} intensity={1.6} castShadow color="#ffd700" />
      <pointLight position={[-3.2, 1.9, -2.0]} intensity={1.25} color="#ffe4b8" />
    </group>
  );
}
