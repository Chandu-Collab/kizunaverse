'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function GuestSuitesDeluxe() {
  const groupRef = useRef(null);

  return (
    <group ref={groupRef}>
      {/* AMBIENT LIGHTING */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 3, 2]} intensity={1.0} castShadow />

      {/* WALLS */}
      <mesh position={[-6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#f5f0e8" roughness={0.4} />
      </mesh>
      <mesh position={[6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#f5f0e8" roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.8, -4]} scale={[12, 3.6, 0.1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#e8d7c3" roughness={0.4} />
      </mesh>
      <mesh position={[0, 3.5, 0]} scale={[12, 0.1, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#f0f0f0" roughness={0.3} />
      </mesh>

      {/* FLOOR */}
      <mesh position={[0, -0.05, 0]} scale={[12, 0.1, 8]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#c2b5a3" roughness={0.5} />
      </mesh>

      {/* KING BED - Center left, against wall */}
      <group position={[-3.0, 0, -1.0]}>
        {/* Bed frame */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.7, 3.0]} />
          <meshStandardMaterial color="#3d2817" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Mattress */}
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.3, 2.8]} />
          <meshStandardMaterial color="#8b7355" roughness={0.5} metalness={0} />
        </mesh>
        {/* Pillows - at head of bed */}
        {[-0.7, 0.7].map((x, idx) => (
          <mesh key={`pillow-${idx}`} position={[x, 1.0, -1.25]} castShadow>
            <boxGeometry args={[0.45, 0.3, 0.3]} />
            <meshStandardMaterial color="#e6d7c3" roughness={0.4} metalness={0} />
          </mesh>
        ))}
        {/* Bedcover */}
        <mesh position={[0, 0.8, 0.1]} castShadow>
          <boxGeometry args={[2.6, 0.1, 2.2]} />
          <meshStandardMaterial color="#cc9966" roughness={0.3} metalness={0.05} />
        </mesh>
        {/* Headboard */}
        <mesh position={[0, 1.0, -1.5]} castShadow receiveShadow>
          <boxGeometry args={[2.9, 0.8, 0.15]} />
          <meshStandardMaterial color="#4a3728" roughness={0.3} metalness={0.1} />
        </mesh>
      </group>

      {/* LUXURY BATHROOM - Back right area */}
      <group position={[3.0, 0, -2.0]}>
        {/* Bathtub */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.8, 1.8]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Bathtub interior */}
        <mesh position={[0, 0.32, 0]} castShadow>
          <boxGeometry args={[1.2, 0.6, 1.6]} />
          <meshStandardMaterial color="#4da6ff" opacity={0.3} transparent />
        </mesh>
        {/* Faucet */}
        <mesh position={[0, 1.1, -0.75]} castShadow>
          <boxGeometry args={[0.15, 0.3, 0.08]} />
          <meshStandardMaterial color="#888888" roughness={0.4} metalness={0.6} />
        </mesh>
      </group>

      {/* TOILET - Back left of bathroom */}
      <group position={[2.0, 0, -2.8]}>
        {/* Bowl */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.18, 0.2, 0.6, 8]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Seat */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 8]} />
          <meshStandardMaterial color="#d9d9d9" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Tank */}
        <mesh position={[0, 0.95, 0.15]} castShadow receiveShadow>
          <boxGeometry args={[0.35, 0.4, 0.22]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.2} metalness={0.3} />
        </mesh>
      </group>

      {/* SHOWER STALL - Back of bathroom */}
      <group position={[4.0, 0, -2.0]}>
        {/* Shower enclosure */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 2.4, 0.8]} />
          <meshStandardMaterial color="#ffffff" opacity={0.15} transparent roughness={0.1} metalness={0.6} />
        </mesh>
        {/* Shower head */}
        <mesh position={[0, 1.8, -0.3]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.08, 8]} />
          <meshStandardMaterial color="#888888" roughness={0.4} metalness={0.7} />
        </mesh>
      </group>

      {/* VANITY SINK - Inner bathroom */}
      <group position={[3.0, 0, -3.2]}>
        {/* Vanity counter */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.9, 0.6]} />
          <meshStandardMaterial color="#c2a284" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Sink bowl */}
        <mesh position={[0, 0.82, -0.1]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.1, 8]} />
          <meshStandardMaterial color="#e6e6e6" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Faucet */}
        <mesh position={[0, 1.0, -0.1]} castShadow>
          <boxGeometry args={[0.1, 0.25, 0.08]} />
          <meshStandardMaterial color="#888888" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Mirror */}
        <mesh position={[0, 1.2, -0.25]} castShadow>
          <boxGeometry args={[1.0, 0.9, 0.08]} />
          <meshStandardMaterial color="#d0d0d0" roughness={0.1} metalness={0.7} />
        </mesh>
      </group>

      {/* LIVING SOFA - Front left area */}
      <group position={[-4.0, 0, 2.3]}>
        {/* Sofa frame */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.6, 1.0]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Cushions */}
        <mesh position={[0, 0.65, 0]} castShadow>
          <boxGeometry args={[2.0, 0.4, 0.9]} />
          <meshStandardMaterial color="#8b7355" roughness={0.5} metalness={0} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 1.05, -0.45]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.35, 0.2]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.4} metalness={0.1} />
        </mesh>
      </group>

      {/* COFFEE TABLE - Front center */}
      <group position={[0, 0, 2.3]}>
        {/* Table top */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.8, 0.8]} />
          <meshStandardMaterial color="#5d4e37" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Surface */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[1.0, 0.1, 0.6]} />
          <meshStandardMaterial color="#d4a574" roughness={0.2} metalness={0.3} />
        </mesh>
      </group>

      {/* WORK DESK - Right side */}
      <group position={[4.0, 0, -0.5]}>
        {/* Desk */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.8, 0.8]} />
          <meshStandardMaterial color="#6b5344" roughness={0.3} metalness={0.15} />
        </mesh>
        {/* Desktop */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[1.4, 0.1, 0.7]} />
          <meshStandardMaterial color="#d4a574" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Desk lamp */}
        <mesh position={[0.5, 0.85, 0.3]} castShadow>
          <boxGeometry args={[0.12, 0.4, 0.12]} />
          <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.2} />
        </mesh>
        <mesh position={[0.5, 0.95, 0.3]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.15, 8]} />
          <meshStandardMaterial color="#ffff99" emissive="#ffff99" emissiveIntensity={0.4} roughness={0.2} metalness={0.3} />
        </mesh>
      </group>

      {/* OFFICE CHAIR - At desk */}
      <group position={[4.0, 0, 1.2]}>
        {/* Seat cushion */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.15, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.35, 0.5, 0.35]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Base */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.1, 8]} />
          <meshStandardMaterial color="#333333" roughness={0.5} metalness={0.2} />
        </mesh>
      </group>

      {/* Mini Bar - Right corner */}
      <group position={[5.2, 0, 1.0]}>
        {/* Bar counter */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.0, 0.6]} />
          <meshStandardMaterial color="#5d4e37" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Counter top */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[0.7, 0.1, 0.5]} />
          <meshStandardMaterial color="#d4a574" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Bottles (visual) */}
        {[-0.2, 0, 0.2].map((x, idx) => (
          <mesh key={`bottle-${idx}`} position={[x, 0.8, -0.15]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.35, 8]} />
            <meshStandardMaterial color={idx === 0 ? '#ffff00' : idx === 1 ? '#ff6600' : '#ff0000'} roughness={0.1} metalness={0.5} />
          </mesh>
        ))}
      </group>

      {/* WARDROBE CLOSET - Left wall (attached to wall) */}
      <group position={[-5.7, 0, 1.5]}>
        {/* Cabinet body */}
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 1.6, 0.6]} />
          <meshStandardMaterial color="#4a3728" roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Doors */}
        {[-0.18, 0.18].map((x, idx) => (
          <mesh key={`door-${idx}`} position={[x, 0.8, -0.32]} castShadow>
            <boxGeometry args={[0.3, 1.5, 0.08]} />
            <meshStandardMaterial color="#cc9966" roughness={0.3} metalness={0.15} />
          </mesh>
        ))}
      </group>

      {/* TV ENTERTAINMENT UNIT - Wall mounted */}
      <group position={[-3.0, 1.5, -3.95]}>
        {/* TV Stand */}
        <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.4, 0.4]} />
          <meshStandardMaterial color="#2c2c2c" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* TV Screen */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.0, 0.08]} />
          <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.5} />
        </mesh>
        {/* Screen gloss */}
        <mesh position={[0, 0, 0.05]} castShadow>
          <boxGeometry args={[1.7, 0.95, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" opacity={0.4} transparent roughness={0.05} metalness={0.7} />
        </mesh>
      </group>

      {/* AMBIENT SIDE TABLE - By sofa (repositioned away from bed) */}
      <group position={[3.5, 0, 2.3]}>
        {/* Table top */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.8, 0.4]} />
          <meshStandardMaterial color="#6b5344" roughness={0.3} metalness={0.15} />
        </mesh>
        {/* Decorative item */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
          <meshStandardMaterial color="#ff6b9d" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* WINDOW SIMULATION - Back wall */}
      <group position={[-1.5, 1.8, -3.95]}>
        {/* Window frame */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 1.2, 0.08]} />
          <meshStandardMaterial color="#5d7a8a" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Glass pane */}
        <mesh position={[0, 0, 0.05]} castShadow>
          <boxGeometry args={[1.3, 1.1, 0.05]} />
          <meshStandardMaterial color="#87ceeb" opacity={0.6} transparent roughness={0.05} metalness={0.7} />
        </mesh>
        {/* View effect (light) */}
        <pointLight position={[0, 0, 0.5]} intensity={0.6} color="#87ceeb" />
      </group>

      {/* WALL MIRROR - Left wall (attached to wall) */}
      <group position={[-5.96, 1.5, -1.0]}>
        {/* Frame */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.9, 0.08]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Mirror glass */}
        <mesh position={[0, 0, 0.05]} castShadow>
          <boxGeometry args={[0.6, 0.8, 0.05]} />
          <meshStandardMaterial color="#d0d0d0" roughness={0.05} metalness={0.8} />
        </mesh>
      </group>

      {/* TASK LIGHTING OVER AREA */}
      <pointLight position={[-3.0, 2.0, -1.0]} intensity={1.5} castShadow color="#ffffff" />
      <pointLight position={[4.0, 2.0, -0.5]} intensity={1.4} castShadow color="#ffffff" />
      <pointLight position={[3.0, 2.0, -2.0]} intensity={1.6} castShadow color="#ffffff" />
    </group>
  );
}
