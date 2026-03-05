'use client';

import { useRef } from 'react';

export function KidsPlayArea() {
  const groupRef = useRef(null);

  return (
    <group ref={groupRef}>
      {/* AMBIENT LIGHTING */}
      <ambientLight intensity={0.85} />
      <directionalLight position={[2, 4, 2]} intensity={1.0} castShadow />

      {/* WALLS */}
      <mesh position={[-6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#fff5e6" roughness={0.3} />
      </mesh>
      <mesh position={[6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#fff5e6" roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.8, -4]} scale={[12, 3.6, 0.1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#fff5e6" roughness={0.3} />
      </mesh>
      <mesh position={[0, 3.5, 0]} scale={[12, 0.1, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>

      {/* FLOOR - Padded mat */}
      <mesh position={[0, -0.05, 0]} scale={[12, 0.1, 8]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#ffb3d9" roughness={0.6} />
      </mesh>

      {/* PLAYGROUND SLIDE STRUCTURE - Left side */}
      <group position={[-3.5, 0, 0.5]}>
        {/* Slide frame */}
        <mesh position={[0, 0.9, -0.3]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 1.8, 0.2]} />
          <meshStandardMaterial color="#00ffcc" roughness={0.3} metalness={0.3} />
        </mesh>
        {/* Slide ramp */}
        <mesh position={[0, 0.5, 0.25]} castShadow>
          <boxGeometry args={[0.35, 0.1, 1.2]} />
          <meshStandardMaterial color="#ffff00" roughness={0.5} metalness={0.1} />
        </mesh>
        {/* Slide stairs */}
        {[0, 0.3, 0.6].map((y, idx) => (
          <mesh key={`stair-${idx}`} position={[0.2, y + 0.4, -0.25 - idx * 0.3]} castShadow>
            <boxGeometry args={[0.1, 0.15, 0.2]} />
            <meshStandardMaterial color="#ff1493" roughness={0.4} metalness={0.2} />
          </mesh>
        ))}
      </group>

      {/* CLIMBING FRAME - Center left */}
      <group position={[-3.5, 0, -1.5]}>
        {/* Frame structure */}
        {[-0.3, 0.3].map((x, idx1) => (
          <mesh key={`frame-${idx1}`} position={[x, 0.8, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 1.6, 0.08]} />
            <meshStandardMaterial color="#00ffff" roughness={0.3} metalness={0.3} />
          </mesh>
        ))}
        {/* Horizontal bars */}
        {[0, 0.35, 0.7, 1.05].map((y, idx) => (
          <mesh key={`bar-${idx}`} position={[0, 0.3 + y, 0]} castShadow>
            <boxGeometry args={[0.7, 0.08, 0.08]} />
            <meshStandardMaterial color="#ff6600" roughness={0.4} metalness={0.2} />
          </mesh>
        ))}
      </group>

      {/* SWINGS - Front center */}
      <group position={[0, 0, 1.8]}>
        {/* Swing frame */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.2, 0.2]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.3} metalness={0.3} />
        </mesh>
        {/* Swing 1 */}
        <group position={[-0.5, 1.15, 0]}>
          {/* Rope */}
          <mesh position={[0, -0.35, 0]} castShadow>
            <boxGeometry args={[0.05, 0.7, 0.05]} />
            <meshStandardMaterial color="#888888" roughness={0.5} metalness={0.1} />
          </mesh>
          {/* Seat */}
          <mesh position={[0, -0.75, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.25, 0.08, 0.25]} />
            <meshStandardMaterial color="#0fff00" roughness={0.4} metalness={0.1} />
          </mesh>
        </group>
        {/* Swing 2 */}
        <group position={[0.5, 1.15, 0]}>
          {/* Rope */}
          <mesh position={[0, -0.35, 0]} castShadow>
            <boxGeometry args={[0.05, 0.7, 0.05]} />
            <meshStandardMaterial color="#888888" roughness={0.5} metalness={0.1} />
          </mesh>
          {/* Seat */}
          <mesh position={[0, -0.75, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.25, 0.08, 0.25]} />
            <meshStandardMaterial color="#ff1493" roughness={0.4} metalness={0.1} />
          </mesh>
        </group>
      </group>

      {/* SEESAW - Right center */}
      <group position={[3.5, 0, 1.0]}>
        {/* Fulcrum */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.25, 0.4, 8]} />
          <meshStandardMaterial color="#8b4513" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Board */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.12, 0.25]} />
          <meshStandardMaterial color="#ff6600" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Handles */}
        <mesh position={[-0.7, 0.65, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
          <meshStandardMaterial color="#00ffff" roughness={0.3} metalness={0.3} />
        </mesh>
        <mesh position={[0.7, 0.65, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
          <meshStandardMaterial color="#00ffff" roughness={0.3} metalness={0.3} />
        </mesh>
      </group>

      {/* SANDBOX - Back left */}
      <group position={[-4.0, 0, -2.5]}>
        {/* Sand box frame */}
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.3, 1.0]} />
          <meshStandardMaterial color="#8b7355" roughness={0.5} metalness={0.05} />
        </mesh>
        {/* Sand fill */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.95, 0.2, 0.95]} />
          <meshStandardMaterial color="#d4a574" roughness={0.7} metalness={0.01} />
        </mesh>
      </group>

      {/* TOY STORAGE BOXES - Back center left */}
      <group position={[-1.5, 0, -2.8]}>
        {/* Box 1 */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.7, 0.7]} />
          <meshStandardMaterial color="#ff1493" roughness={0.3} metalness={0.05} />
        </mesh>
        {/* Lid handle */}
        <mesh position={[0, 0.72, 0]} castShadow>
          <boxGeometry args={[0.2, 0.08, 0.15]} />
          <meshStandardMaterial color="#ffff00" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* TOY STORAGE BOXES - Back center right */}
      <group position={[1.5, 0, -2.8]}>
        {/* Box 2 */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.7, 0.7]} />
          <meshStandardMaterial color="#00ffff" roughness={0.3} metalness={0.05} />
        </mesh>
        {/* Lid handle */}
        <mesh position={[0, 0.72, 0]} castShadow>
          <boxGeometry args={[0.2, 0.08, 0.15]} />
          <meshStandardMaterial color="#0fff00" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* COLORFUL BALL PIT - Back right */}
      <group position={[4.0, 0, -2.5]}>
        {/* Pit container */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.6, 0.6, 0.5, 8]} />
          <meshStandardMaterial color="#ff6600" roughness={0.3} metalness={0.05} />
        </mesh>
        {/* Balls inside */}
        {[0, 0.3, 0.6].map((y, idx) => (
          <mesh key={`ball-${idx}`} position={[0, 0.35 + y, 0]} castShadow>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial 
              color={['#ff1493', '#0fff00', '#00ffff', '#ffff00'][idx % 4]} 
              roughness={0.4} 
              metalness={0.1} 
            />
          </mesh>
        ))}
      </group>

      {/* BALANCE BEAM - Right side */}
      <group position={[5.0, 0, 0.5]}>
        {/* Support posts */}
        <mesh position={[-0.5, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0.5, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Beam */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.12, 0.15]} />
          <meshStandardMaterial color="#0fff00" roughness={0.5} metalness={0.05} />
        </mesh>
      </group>

      {/* TEETER TOTTER / ROCKER - Center right back */}
      <group position={[3.5, 0, -1.0]}>
        {/* Base */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.4, 0.5]} />
          <meshStandardMaterial color="#ff6600" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Spring connectors (visual) */}
        {[-0.2, 0.2].map((x, idx) => (
          <mesh key={`spring-${idx}`} position={[x, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.15, 8]} />
            <meshStandardMaterial color="#ffff00" roughness={0.4} metalness={0.3} />
          </mesh>
        ))}
        {/* Rocker seat */}
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.15, 0.35]} />
          <meshStandardMaterial color="#ff1493" roughness={0.4} metalness={0.05} />
        </mesh>
      </group>

      {/* SOFT PLAY BLOCKS AREA - Front right */}
      <group position={[4.5, 0, 1.8]}>
        {/* Block 1 */}
        <mesh position={[-0.3, 0.25, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.5, 0.4]} />
          <meshStandardMaterial color="#0fff00" roughness={0.5} metalness={0.05} />
        </mesh>
        {/* Block 2 */}
        <mesh position={[0.3, 0.25, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.5, 0.4]} />
          <meshStandardMaterial color="#00ffff" roughness={0.5} metalness={0.05} />
        </mesh>
        {/* Block 3 */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.35, 0.4]} />
          <meshStandardMaterial color="#ff1493" roughness={0.5} metalness={0.05} />
        </mesh>
      </group>

      {/* SAFETY PADDING - Wall mounted */}
      {[-5.9, 5.9].map((x, idx) => (
        <mesh key={`padding-${idx}`} position={[x, 1.0, 0]} castShadow>
          <boxGeometry args={[0.15, 1.5, 6]} />
          <meshStandardMaterial color="#ff6600" roughness={0.6} metalness={0.05} />
        </mesh>
      ))}

      {/* TOYS ON SHELVES - Left corner */}
      <group position={[-5.3, 0.8, 2.0]}>
        {/* Shelf frame */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.7, 0.4]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Toy cubes on shelf */}
        {[0, 0.3].map((z, idx) => (
          <mesh key={`toy-${idx}`} position={[0, 0.65, z - 0.15]} castShadow>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial 
              color={['#ff1493', '#ffff00'][idx % 2]} 
              roughness={0.4} 
              metalness={0.05} 
            />
          </mesh>
        ))}
      </group>

      {/* BALLS SCATTERED AREA - Center */}
      {[0, 0.35, 0.7].map((offset, idx) => (
        <mesh key={`scattered-ball-${idx}`} position={[-0.3 + offset * 0.2, 0.15, -0.5 + offset * 0.3]} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color={['#ff1493', '#0fff00', '#00ffff', '#ffff00'][idx % 4]} 
            roughness={0.5} 
            metalness={0.05} 
          />
        </mesh>
      ))}

      {/* SAFETY MATTING - Center floor */}
      <mesh position={[0, 0.02, 0.5]} scale={[4, 0.04, 3]} castShadow>
        <boxGeometry />
        <meshStandardMaterial color="#ff99cc" opacity={0.6} transparent roughness={0.7} />
      </mesh>

      {/* AMBIENT LIGHTING POINTS */}
      <pointLight position={[-3.5, 2.0, 0.5]} intensity={1.2} castShadow color="#ffffff" />
      <pointLight position={[3.5, 2.0, 0.5]} intensity={1.2} castShadow color="#ffffff" />
      <pointLight position={[0, 2.0, -1.5]} intensity={1.3} castShadow color="#ffffff" />
      <pointLight position={[0, 1.8, 1.8]} intensity={1.1} castShadow color="#ffffff" />
    </group>
  );
}
