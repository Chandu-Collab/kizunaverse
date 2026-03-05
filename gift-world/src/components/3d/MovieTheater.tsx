'use client';

import { useRef } from 'react';

export function MovieTheater() {
  const groupRef = useRef(null);

  return (
    <group ref={groupRef}>
      {/* AMBIENT LIGHTING */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 2, 3]} intensity={0.6} castShadow />

      {/* WALLS */}
      <mesh position={[-6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      <mesh position={[6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.8, -4]} scale={[12, 3.6, 0.1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#000000" roughness={0.6} />
      </mesh>
      <mesh position={[0, 3.5, 0]} scale={[12, 0.1, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>

      {/* FLOOR - Movie theater carpet */}
      <mesh position={[0, -0.05, 0]} scale={[12, 0.1, 8]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>

      {/* MOVIE SCREEN - Back wall */}
      <group position={[0, 1.8, -3.92]}>
        {/* Screen frame */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[11, 2.5, 0.15]} />
          <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Screen surface */}
        <mesh position={[0, 0, 0.08]} castShadow>
          <boxGeometry args={[10.8, 2.4, 0.1]} />
          <meshStandardMaterial color="#ffffff" opacity={0.8} transparent roughness={0.3} metalness={0.05} />
        </mesh>
        {/* Screen glow effect */}
        <mesh position={[0, 0, 0.1]} castShadow>
          <boxGeometry args={[10.5, 2.3, 0.05]} />
          <meshStandardMaterial 
            color="#4da6ff" 
            emissive="#4da6ff" 
            emissiveIntensity={0.2} 
            roughness={0.2} 
            metalness={0.1} 
          />
        </mesh>
      </group>

      {/* SEATING SECTION 1 - Left side */}
      {[0, 1.5].map((z, rowIdx) => (
        [-3.5, -2.0, -0.5].map((x, seatIdx) => (
          <group key={`seat-l-${rowIdx}-${seatIdx}`} position={[x, 0.3, 1.5 + z]}>
            {/* Seat base */}
            <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.45, 0.15, 0.5]} />
              <meshStandardMaterial color="#660000" roughness={0.4} metalness={0.05} />
            </mesh>
            {/* Backrest */}
            <mesh position={[0, 0.45, 0.2]} castShadow receiveShadow>
              <boxGeometry args={[0.45, 0.35, 0.15]} />
              <meshStandardMaterial color="#660000" roughness={0.4} metalness={0.05} />
            </mesh>
            {/* Armrest right */}
            <mesh position={[0.25, 0.35, 0.1]} castShadow>
              <boxGeometry args={[0.05, 0.25, 0.25]} />
              <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.1} />
            </mesh>
          </group>
        ))
      ))}

      {/* SEATING SECTION 2 - Center */}
      {[0, 1.5].map((z, rowIdx) => (
        [-0.8, 0.2, 1.2].map((x, seatIdx) => (
          <group key={`seat-c-${rowIdx}-${seatIdx}`} position={[x, 0.3, 1.5 + z]}>
            {/* Seat base */}
            <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.45, 0.15, 0.5]} />
              <meshStandardMaterial color="#660000" roughness={0.4} metalness={0.05} />
            </mesh>
            {/* Backrest */}
            <mesh position={[0, 0.45, 0.2]} castShadow receiveShadow>
              <boxGeometry args={[0.45, 0.35, 0.15]} />
              <meshStandardMaterial color="#660000" roughness={0.4} metalness={0.05} />
            </mesh>
          </group>
        ))
      ))}

      {/* SEATING SECTION 3 - Right side */}
      {[0, 1.5].map((z, rowIdx) => (
        [0.5, 2.0, 3.5].map((x, seatIdx) => (
          <group key={`seat-r-${rowIdx}-${seatIdx}`} position={[x, 0.3, 1.5 + z]}>
            {/* Seat base */}
            <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.45, 0.15, 0.5]} />
              <meshStandardMaterial color="#660000" roughness={0.4} metalness={0.05} />
            </mesh>
            {/* Backrest */}
            <mesh position={[0, 0.45, 0.2]} castShadow receiveShadow>
              <boxGeometry args={[0.45, 0.35, 0.15]} />
              <meshStandardMaterial color="#660000" roughness={0.4} metalness={0.05} />
            </mesh>
            {/* Armrest left */}
            <mesh position={[-0.25, 0.35, 0.1]} castShadow>
              <boxGeometry args={[0.05, 0.25, 0.25]} />
              <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.1} />
            </mesh>
          </group>
        ))
      ))}

      {/* BACK ROW SEATING - Premium */}
      {[-1.0, 0, 1.0].map((x, idx) => (
        <group key={`back-seat-${idx}`} position={[x, 0.4, -0.5]}>
          {/* Seat base - reclining */}
          <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.2, 0.6]} />
            <meshStandardMaterial color="#8b0000" roughness={0.4} metalness={0.05} />
          </mesh>
          {/* Backrest - angled */}
          <mesh position={[0, 0.55, 0.2]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.4, 0.15]} />
            <meshStandardMaterial color="#8b0000" roughness={0.4} metalness={0.05} />
          </mesh>
        </group>
      ))}

      {/* CONCESSION STAND - Right front */}
      <group position={[5.0, 0, 0.5]}>
        {/* Counter structure */}
        <mesh position={[0, 0.50, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.0, 0.8]} />
          <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.15} />
        </mesh>
        {/* Counter top */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[1.0, 0.1, 0.7]} />
          <meshStandardMaterial color="#ffff00" roughness={0.2} metalness={0.4} />
        </mesh>
        {/* Popcorn machine */}
        <mesh position={[-0.35, 0.9, -0.25]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.6, 0.4]} />
          <meshStandardMaterial color="#ff6600" roughness={0.3} metalness={0.15} />
        </mesh>
        {/* Popcorn inside */}
        <mesh position={[-0.35, 1.1, -0.25]} castShadow>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#ffff00" roughness={0.5} metalness={0.05} />
        </mesh>
        {/* Drink dispenser */}
        <mesh position={[0.35, 0.85, -0.25]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.6, 8]} />
          <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Cups stacked */}
        <mesh position={[0.35, 1.1, -0.25]} castShadow>
          <cylinderGeometry args={[0.15, 0.18, 0.15, 8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
        </mesh>
      </group>

      {/* ENTRANCE SIGN "NOW SHOWING" - Left front */}
      <group position={[-5.0, 1.5, 1.5]}>
        {/* Sign board */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.5, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.15} />
        </mesh>
        {/* Sign glow - neon */}
        <mesh position={[0, 0, 0.06]} castShadow>
          <boxGeometry args={[0.95, 0.45, 0.05]} />
          <meshStandardMaterial 
            color="#ff1493" 
            emissive="#ff1493" 
            emissiveIntensity={0.5} 
            roughness={0.2} 
            metalness={0.2} 
          />
        </mesh>
      </group>

      {/* MOVIE TITLE BOARD - Right side */}
      <group position={[5.0, 1.5, -1.5]}>
        {/* Board */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.6, 0.15]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.15} />
        </mesh>
        {/* Glow */}
        <mesh position={[0, 0, 0.08]} castShadow>
          <boxGeometry args={[1.15, 0.55, 0.05]} />
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff" 
            emissiveIntensity={0.4} 
            roughness={0.2} 
            metalness={0.2} 
          />
        </mesh>
      </group>

      {/* EMERGENCY EXIT SIGN - Back corners */}
      {[-5.5, 5.5].map((x, idx) => (
        <group key={`exit-sign-${idx}`} position={[x, 2.8, -3.5]}>
          {/* Sign plate */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.6, 0.4, 0.1]} />
            <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.2} />
          </mesh>
          {/* Exit glow - red */}
          <mesh position={[0, 0, 0.06]} castShadow>
            <boxGeometry args={[0.55, 0.35, 0.05]} />
            <meshStandardMaterial 
              color="#ff0000" 
              emissive="#ff0000" 
              emissiveIntensity={0.4} 
              roughness={0.2} 
              metalness={0.2} 
            />
          </mesh>
        </group>
      ))}

      {/* TRASH BIN - Corner */}
      <group position={[5.3, 0, 2.5]}>
        {/* Bin */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.5, 8]} />
          <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.15} />
        </mesh>
        {/* Lid */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.1, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* FLOOR LIGHTING - Track accent lights */}
      {[-4.5, -1.5, 1.5, 4.5].map((x, idx) => (
        <mesh key={`floor-light-${idx}`} position={[x, 2.9, 1.5]} castShadow>
          <boxGeometry args={[0.3, 0.3, 0.2]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            emissive={["#ff1493", "#00ffff", "#0fff00", "#ffff00"][idx % 4]} 
            emissiveIntensity={0.3} 
            roughness={0.3} 
            metalness={0.2} 
          />
        </mesh>
      ))}

      {/* AMBIENT LIGHTING POINTS - Very low for theater feel */}
      <pointLight position={[0, 2.5, 0]} intensity={0.3} castShadow color="#4da6ff" />
      <pointLight position={[-4.5, 1.5, 1.5]} intensity={0.4} castShadow color="#ff1493" />
      <pointLight position={[4.5, 1.5, 1.5]} intensity={0.4} castShadow color="#00ffff" />
      <pointLight position={[5.0, 1.5, 0.5]} intensity={0.6} castShadow color="#ffff99" />
    </group>
  );
}
