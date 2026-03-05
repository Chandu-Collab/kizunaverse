'use client';

import { useRef } from 'react';

export function MusicRecordingStudio() {
  const groupRef = useRef(null);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 4, 3]} intensity={0.9} castShadow />

      {/* WALLS */}
      <mesh position={[-6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} />
      </mesh>
      <mesh position={[6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.8, -4]} scale={[12, 3.6, 0.1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#3a3a3a" roughness={0.2} />
      </mesh>

      {/* CEILING */}
      <mesh position={[0, 3.5, 0]} scale={[12, 0.1, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>

      {/* FLOOR */}
      <mesh position={[0, -0.05, 0]} scale={[12, 0.1, 8]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>

      {/* SOUND BOOTH - Left */}
      <group position={[-3.5, 0.7, 0.5]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 1.4, 1.5]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.3} metalness={0.3} />
        </mesh>
        {/* Foam padding visual */}
        <mesh position={[0, 0.05, 0]} scale={[0.95, 0.95, 0.95]}>
          <boxGeometry args={[1.5, 1.4, 1.5]} />
          <meshStandardMaterial color="#6a6a6a" roughness={0.6} />
        </mesh>
      </group>

      {/* CONTROL BOOTH - Right */}
      <group position={[3.5, 0.7, 0.5]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.4, 1.2]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.2} metalness={0.4} />
        </mesh>
        {/* Control desk */}
        <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.1, 1.0]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Control buttons/knobs */}
        {[0, 0.4, 0.8, -0.4, -0.8].map((x, idx) => (
          <mesh key={`knob-${idx}`} position={[x - 0.3, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.12, 0.15, 8]} />
            <meshStandardMaterial color={['#ff1493', '#00ffff', '#0fff00', '#ffff00', '#ff6600'][idx % 5]} roughness={0.4} metalness={0.3} />
          </mesh>
        ))}
      </group>

      {/* MICROPHONE STANDS - Various positions */}
      {[
        { pos: [-4.0, 0, 1.5], color: '#888888' },
        { pos: [0, 0, 1.8], color: '#888888' },
        { pos: [4.0, 0, 1.5], color: '#888888' }
      ].map((mic, idx) => (
        <group key={`mic-${idx}`} position={mic.pos as [number, number, number]}>
          {/* Boom arm */}
          <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 0.8, 0.08]} />
            <meshStandardMaterial color={mic.color} roughness={0.5} metalness={0.7} />
          </mesh>
          {/* Microphone head */}
          <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
            <capsuleGeometry args={[0.12, 0.2, 4, 8]} />
            <meshStandardMaterial color="#444444" roughness={0.3} metalness={0.6} />
          </mesh>
          {/* Shock mount */}
          <mesh position={[0, 1.65, 0]} castShadow>
            <torusGeometry args={[0.15, 0.04, 8, 16]} />
            <meshStandardMaterial color="#ff1493" roughness={0.4} metalness={0.3} />
          </mesh>
        </group>
      ))}

      {/* ACOUSTIC PANELS on walls */}
      {[-4.5, -1.5, 1.5, 4.5].map((x, idx) => (
        <mesh key={`panel-${idx}`} position={[x, 2.0, -3.9]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.0, 0.05]} />
          <meshStandardMaterial color={['#8b0000', '#003d99', '#006600', '#4a4a4a'][idx % 4]} roughness={0.6} />
        </mesh>
      ))}

      {/* SPEAKER MONITORS - Studio monitors */}
      {[-1.5, 1.5].map((x, idx) => (
        <mesh key={`speaker-${idx}`} position={[x + 3.5, 1.2, 0.5]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.7, 0.4]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.4} />
        </mesh>
      ))}

      {/* RACK EQUIPMENT - Right side */}
      {[0, 0.6, 1.2].map((y, idx) => (
        <mesh key={`rack-${idx}`} position={[5.2, 0.5 + y, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.5, 0.4]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.5} />
        </mesh>
      ))}

      {/* NEON ACCENTS */}
      <pointLight position={[-3.5, 2.5, 0.5]} intensity={0.8} castShadow color="#ff1493" />
      <pointLight position={[3.5, 2.5, 0.5]} intensity={0.8} castShadow color="#00ffcc" />
      <pointLight position={[0, 2.0, -1.0]} intensity={1.0} castShadow color="#0fff00" />
    </group>
  );
}
