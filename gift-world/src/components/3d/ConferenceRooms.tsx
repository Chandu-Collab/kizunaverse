'use client';

import { useTheme } from '@/hooks/useTheme';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ConferenceRooms() {
  const { isNight } = useTheme();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    // Animation hooks for future use
  });

  return (
    <group>
      {/* LIGHTING - Professional bright lighting */}
      <ambientLight intensity={isNight ? 0.6 : 0.95} color={isNight ? '#e8d7c3' : '#ffffff'} />

      <directionalLight
        position={[8, 13, 8]}
        intensity={isNight ? 0.7 : 1.5}
        color={isNight ? '#ffb366' : '#ffffff'}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={60}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />

      <directionalLight
        position={[-8, 11, -8]}
        intensity={isNight ? 0.45 : 0.75}
        color={isNight ? '#ffeaa7' : '#f8f9fa'}
      />

      {/* TASK LIGHTING - Over meeting tables */}
      <pointLight position={[-3.5, 3, 0.5]} intensity={isNight ? 2.0 : 2.4} color={isNight ? '#ffff99' : '#ffffff'} distance={10} />
      <pointLight position={[0, 3, 0]} intensity={isNight ? 2.2 : 2.6} color={isNight ? '#ffff99' : '#ffffff'} distance={11} />
      <pointLight position={[3.5, 3, 0.5]} intensity={isNight ? 2.0 : 2.4} color={isNight ? '#ffff99' : '#ffffff'} distance={10} />
      <pointLight position={[-2, 3, -2.5]} intensity={isNight ? 1.8 : 2.2} color={isNight ? '#87ceeb' : '#ffffff'} distance={9} />
      <pointLight position={[2, 3, -2.5]} intensity={isNight ? 1.8 : 2.2} color={isNight ? '#87ceeb' : '#ffffff'} distance={9} />

      {/* FLOOR - Premium polished concrete */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.25} metalness={0.08} />
      </mesh>

      {/* WALLS - Left, Right & Back (Front open) */}
      <mesh position={[-6, 1.8, 0]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 8]} />
        <meshStandardMaterial color="#00ffff" roughness={0.5} metalness={0.2} />
      </mesh>

      <mesh position={[6, 1.8, 0]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 8]} />
        <meshStandardMaterial color="#ff1493" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* BACK WALL */}
      <mesh position={[0, 1.8, -4]} receiveShadow>
        <boxGeometry args={[12, 3.6, 0.2]} />
        <meshStandardMaterial color="#cc00ff" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* CEILING */}
      <mesh position={[0, 3.6, 0]} receiveShadow>
        <boxGeometry args={[12, 0.25, 8]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.3} />
      </mesh>

      {/* RECEPTION DESK - Front entrance */}
      <group position={[0, 0, 2.8]}>
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 1.2, 0.9]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.3, 0.1, 1.0]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.2} />
        </mesh>
      </group>

      {/* SMALL MEETING ROOM 1 - Left side */}
      <group position={[-3.8, 0, 1.2]}>
        {/* Meeting table */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.8, 1.2]} />
          <meshStandardMaterial color="#8b4513" roughness={0.35} metalness={0.05} />
        </mesh>

        {/* Chairs around table - 4 chairs */}
        {[
          [-1.0, 0.4],
          [1.0, 0.4],
          [0, 0.4, -0.7],
          [0, 0.4, 0.7],
        ].map((pos, idx) => (
          <mesh key={`chair-mr1-${idx}`} position={pos as [number, number, number]} castShadow>
            <boxGeometry args={[0.45, 0.8, 0.45]} />
            <meshStandardMaterial color="#0099ff" roughness={0.3} metalness={0.2} />
          </mesh>
        ))}

        {/* Whiteboard */}
        <mesh position={[-0.9, 2.0, -0.55]} castShadow>
          <boxGeometry args={[1.0, 0.9, 0.08]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.05} />
        </mesh>

        {/* TV Screen */}
        <mesh position={[0.7, 1.9, -0.6]}>
          <boxGeometry args={[0.9, 0.65, 0.08]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.3} />
        </mesh>
        <mesh position={[0.7, 1.9, -0.55]}>
          <planeGeometry args={[0.85, 0.6]} />
          <meshStandardMaterial color="#00ccff" emissive="#00ccff" emissiveIntensity={0.2} roughness={0.1} metalness={0.2} />
        </mesh>
      </group>

      {/* SMALL MEETING ROOM 2 - Right side */}
      <group position={[3.8, 0, 1.2]}>
        {/* Meeting table */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.8, 1.2]} />
          <meshStandardMaterial color="#8b4513" roughness={0.35} metalness={0.05} />
        </mesh>

        {/* Chairs around table - 4 chairs */}
        {[
          [-1.0, 0.4],
          [1.0, 0.4],
          [0, 0.4, -0.7],
          [0, 0.4, 0.7],
        ].map((pos, idx) => (
          <mesh key={`chair-mr2-${idx}`} position={pos as [number, number, number]} castShadow>
            <boxGeometry args={[0.45, 0.8, 0.45]} />
            <meshStandardMaterial color="#ff00ff" roughness={0.3} metalness={0.2} />
          </mesh>
        ))}

        {/* Whiteboard */}
        <mesh position={[0.9, 2.0, -0.55]} castShadow>
          <boxGeometry args={[1.0, 0.9, 0.08]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.05} />
        </mesh>

        {/* TV Screen */}
        <mesh position={[-0.7, 1.9, -0.6]}>
          <boxGeometry args={[0.9, 0.65, 0.08]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.3} />
        </mesh>
        <mesh position={[-0.7, 1.9, -0.55]}>
          <planeGeometry args={[0.85, 0.6]} />
          <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={0.2} roughness={0.1} metalness={0.2} />
        </mesh>
      </group>

      {/* BOARDROOM - Center back area (Large conference space) */}
      <group position={[0, 0, -0.8]}>
        {/* Large boardroom table */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.8, 0.9, 1.6]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.4} metalness={0.1} />
        </mesh>

        {/* Boardroom chairs - 8 chairs around table */}
        {[
          [-1.6, 0.4],
          [-0.4, 0.4],
          [0.4, 0.4],
          [1.6, 0.4],
          [0, 0.4, -0.85],
          [0, 0.4, 0.85],
          [-1.8, 0.4, -0.4],
          [1.8, 0.4, 0.4],
        ].map((pos, idx) => (
          <mesh key={`bchair-${idx}`} position={pos as [number, number, number]} castShadow>
            <boxGeometry args={[0.5, 0.9, 0.5]} />
            <meshStandardMaterial color={idx % 2 === 0 ? '#0fff00' : '#00ffff'} roughness={0.35} metalness={0.15} />
          </mesh>
        ))}

        {/* Projector screen wall */}
        <mesh position={[0, 2.7, -0.7]} castShadow>
          <boxGeometry args={[3.6, 1.5, 0.1]} />
          <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Projection surface */}
        <mesh position={[0, 2.7, -0.65]}>
          <planeGeometry args={[3.5, 1.45]} />
          <meshStandardMaterial color="#e8e8e8" emissive="#444444" emissiveIntensity={0.2} roughness={0.15} metalness={0.1} />
        </mesh>

        {/* Projector mounted on ceiling */}
        <mesh position={[0, 3.5, 0.3]} castShadow>
          <boxGeometry args={[0.3, 0.2, 0.4]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Video conferencing camera */}
        <mesh position={[0, 3.4, 0.65]} castShadow>
          <boxGeometry args={[0.2, 0.2, 0.15]} />
          <meshStandardMaterial color="#0099ff" roughness={0.2} metalness={0.5} />
        </mesh>
      </group>

      {/* MEETING ROOM 3 - Back left */}
      <group position={[-3.0, 0, -2.8]}>
        {/* Medium meeting table */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.7, 0.9]} />
          <meshStandardMaterial color="#8b4513" roughness={0.35} metalness={0.05} />
        </mesh>

        {/* Chairs - 4 chairs */}
        {[
          [-0.8, 0.35],
          [0.8, 0.35],
          [0, 0.35, -0.5],
          [0, 0.35, 0.5],
        ].map((pos, idx) => (
          <mesh key={`chair-mr3-${idx}`} position={pos as [number, number, number]} castShadow>
            <boxGeometry args={[0.4, 0.7, 0.4]} />
            <meshStandardMaterial color="#ff10f0" roughness={0.3} metalness={0.2} />
          </mesh>
        ))}

        {/* Whiteboard */}
        <mesh position={[0, 1.8, -0.45]} castShadow>
          <boxGeometry args={[0.9, 0.75, 0.08]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.05} />
        </mesh>
      </group>

      {/* MEETING ROOM 4 - Back right */}
      <group position={[3.0, 0, -2.8]}>
        {/* Medium meeting table */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.7, 0.9]} />
          <meshStandardMaterial color="#8b4513" roughness={0.35} metalness={0.05} />
        </mesh>

        {/* Chairs - 4 chairs */}
        {[
          [-0.8, 0.35],
          [0.8, 0.35],
          [0, 0.35, -0.5],
          [0, 0.35, 0.5],
        ].map((pos, idx) => (
          <mesh key={`chair-mr4-${idx}`} position={pos as [number, number, number]} castShadow>
            <boxGeometry args={[0.4, 0.7, 0.4]} />
            <meshStandardMaterial color="#00ff00" roughness={0.3} metalness={0.2} />
          </mesh>
        ))}

        {/* Whiteboard */}
        <mesh position={[0, 1.8, -0.45]} castShadow>
          <boxGeometry args={[0.9, 0.75, 0.08]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.05} />
        </mesh>
      </group>

      {/* AV EQUIPMENT ROOM - Right side storage */}
      <group position={[5.0, 0, -1.5]}>
        {/* Equipment rack */}
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.4, 1.0]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* Equipment shelves (visual) */}
        {[0, 0.5, 1.0].map((y, idx) => (
          <mesh key={`equip-${idx}`} position={[0, y, 0]} castShadow>
            <boxGeometry args={[0.75, 0.08, 0.95]} />
            <meshStandardMaterial color={idx % 2 === 0 ? '#00ffff' : '#ff00ff'} roughness={0.3} metalness={0.4} />
          </mesh>
        ))}
      </group>

      {/* STORAGE CABINET - Left side */}
      <group position={[-5.0, 0, -1.5]}>
        {/* Cabinet body */}
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.4, 1.0]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.4} metalness={0.1} />
        </mesh>

        {/* Cabinet doors */}
        {[-0.2, 0.2].map((x, idx) => (
          <mesh key={`door-${idx}`} position={[x, 0.7, -0.48]} castShadow>
            <boxGeometry args={[0.35, 1.3, 0.08]} />
            <meshStandardMaterial color="#0099ff" roughness={0.3} metalness={0.3} />
          </mesh>
        ))}
      </group>

      {/* SOUND SYSTEM SPEAKERS - Back corners */}
      <group position={[-5.5, 3.2, -3.8]} castShadow>
        <mesh>
          <boxGeometry args={[0.4, 0.8, 0.4]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 8]} />
          <meshStandardMaterial color="#666666" roughness={0.3} metalness={0.4} />
        </mesh>
      </group>

      <group position={[5.5, 3.2, -3.8]} castShadow>
        <mesh>
          <boxGeometry args={[0.4, 0.8, 0.4]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 8]} />
          <meshStandardMaterial color="#666666" roughness={0.3} metalness={0.4} />
        </mesh>
      </group>

      {/* CEILING LIGHTS - Recessed lighting (visual) */}
      {[-3, 0, 3].map((x, idx) => (
        <mesh key={`light-${idx}`} position={[x, 3.55, -1]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.08, 8]} />
          <meshStandardMaterial color="#ffff99" emissive="#ffff99" emissiveIntensity={0.3} roughness={0.2} metalness={0.3} />
        </mesh>
      ))}

      {/* PHONE CHARGING STATION - Front left */}
      <group position={[-4.5, 0, 2.0]}>
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 1.0, 0.4]} />
          <meshStandardMaterial color="#654321" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Charging ports (visual) */}
        {[-0.12, 0.12].map((x, idx) => (
          <mesh key={`port-${idx}`} position={[x, 0.95, -0.18]} castShadow>
            <boxGeometry args={[0.06, 0.06, 0.05]} />
            <meshStandardMaterial color="#0099ff" roughness={0.2} metalness={0.5} />
          </mesh>
        ))}
      </group>

      {/* WATER COOLER - Near reception */}
      <group position={[1.8, 0, 2.5]}>
        {/* Cooler body */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.9, 16]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Tap */}
        <mesh position={[0, 0.75, 0.14]} castShadow>
          <boxGeometry args={[0.12, 0.08, 0.06]} />
          <meshStandardMaterial color="#888888" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Water level indicator */}
        <mesh position={[0, 0.32, 0.07]} castShadow>
          <boxGeometry args={[0.12, 0.55, 0.03]} />
          <meshStandardMaterial color="#4da6ff" opacity={0.4} transparent />
        </mesh>
      </group>

      {/* GLASSES DISPENSER STACK */}
      <group position={[2.2, 0, 2.5]}>
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.27, 0.4, 0.22]} />
          <meshStandardMaterial color="#888888" roughness={0.5} metalness={0.3} />
        </mesh>
        {/* Stack indicator (visual) */}
        {[0, 0.07, 0.14].map((y, idx) => (
          <mesh key={`glass-${idx}`} position={[0, 0.38 + y, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.07, 0.03, 16]} />
            <meshStandardMaterial color="#e6f2ff" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
        ))}
      </group>

      {/* DECORATIVE WALL PAINTINGS - Left wall */}
      <group position={[-5.9, 1.5, 0]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.8, 0.6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0.05, 0, 1.5]} castShadow>
          <boxGeometry args={[0.1, 0.8, 0.6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Painting canvases */}
        <mesh position={[-0.03, 0, 0.15]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.5]} />
          <meshStandardMaterial color="#ff6b6b" roughness={0.4} metalness={0.05} />
        </mesh>
        <mesh position={[-0.03, 0, 1.65]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.5]} />
          <meshStandardMaterial color="#4ecdc4" roughness={0.4} metalness={0.05} />
        </mesh>
      </group>

      {/* DECORATIVE WALL PAINTINGS - Right wall */}
      <group position={[5.9, 1.5, 0]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.8, 0.6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0, 1.5]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.8, 0.6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Painting canvases */}
        <mesh position={[0.03, 0, 0.15]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.5]} />
          <meshStandardMaterial color="#ffd93d" roughness={0.4} metalness={0.05} />
        </mesh>
        <mesh position={[0.03, 0, 1.65]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.5]} />
          <meshStandardMaterial color="#a8e6cf" roughness={0.4} metalness={0.05} />
        </mesh>
      </group>

      {/* POTTED PLANTS - Corners for ambiance */}
      <group position={[-5.5, 0, 2.8]}>
        {/* Pot */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.18, 0.2, 0.5, 8]} />
          <meshStandardMaterial color="#d4945a" roughness={0.6} metalness={0.05} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.48, 0]} castShadow>
          <cylinderGeometry args={[0.17, 0.17, 0.08, 8]} />
          <meshStandardMaterial color="#5d4e37" roughness={0.7} metalness={0} />
        </mesh>
        {/* Plant leaves */}
        {[0, 1.2, 2.4].map((z, idx) => (
          <mesh key={`leaf-${idx}`} position={[0.08, 0.85 + idx * 0.2, z * 0.1]} castShadow>
            <boxGeometry args={[0.08, 0.3, 0.04]} />
            <meshStandardMaterial color="#0d5932" roughness={0.5} metalness={0.05} />
          </mesh>
        ))}
      </group>

      <group position={[5.5, 0, 2.8]}>
        {/* Pot */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.18, 0.2, 0.5, 8]} />
          <meshStandardMaterial color="#d4945a" roughness={0.6} metalness={0.05} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.48, 0]} castShadow>
          <cylinderGeometry args={[0.17, 0.17, 0.08, 8]} />
          <meshStandardMaterial color="#5d4e37" roughness={0.7} metalness={0} />
        </mesh>
        {/* Plant leaves */}
        {[0, 1.2, 2.4].map((z, idx) => (
          <mesh key={`leaf2-${idx}`} position={[-0.08, 0.85 + idx * 0.2, z * 0.1]} castShadow>
            <boxGeometry args={[0.08, 0.3, 0.04]} />
            <meshStandardMaterial color="#0d5932" roughness={0.5} metalness={0.05} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
