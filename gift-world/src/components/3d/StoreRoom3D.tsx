import React, { useState } from "react";
import { Text } from "@react-three/drei";

export default function StoreRoom3D({ position = [0, 0, 0], isNight = false }: { position?: [number, number, number], isNight?: boolean }) {
  const [view, setView] = useState<'exterior' | 'interior'>('exterior');
  // Window material: day is blue, night is glowing yellow
  const windowMaterial = isNight
    ? { color: "#ffe066", emissive: "#ffe066", emissiveIntensity: 1.2, transparent: true, opacity: 0.98 }
    : { color: "#b3e5fc", emissive: "#000000", emissiveIntensity: 0, transparent: true, opacity: 0.7 };
  return (
    <group position={position as [number, number, number]}>
      {/* Lighting: Day/Night difference */}
      <ambientLight intensity={isNight ? 0.13 : 0.6} color={isNight ? "#1a1a2e" : "#e0f7fa"} />
      {isNight && (
        <>
          {/* Interior yellow light for window glow */}
          <pointLight position={[-1, 0.3, 2.5/2 - 0.1]} intensity={1.2} color="#ffe066" distance={2.5} decay={2} />
        </>
      )}
      {/* View toggle buttons */}
      <Text position={[-1, 1.5, 1.3]} fontSize={0.18} color={view === 'exterior' ? '#1976d2' : '#333'} anchorX="center" anchorY="middle" onClick={() => setView('exterior')}>
        Exterior
      </Text>
      <Text position={[1, 1.5, 1.3]} fontSize={0.18} color={view === 'interior' ? '#1976d2' : '#333'} anchorX="center" anchorY="middle" onClick={() => setView('interior')}>
        Interior
      </Text>
      {/* Exterior view (default) */}
      {view === 'exterior' && (
        <>
          {/* Exterior */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3, 2, 2.5]} />
            <meshStandardMaterial color="#bdbdbd" />
          </mesh>
          {/* Door Frame (in wall, only one door, no extra space) */}
          <mesh position={[0, -0.5, 2.5/2 + 0.045]}>
            <boxGeometry args={[0.76, 1.26, 0.11]} />
            <meshStandardMaterial color="#dedede" />
          </mesh>
          {/* Door (inset inside frame, distinct color) */}
          <mesh position={[0, -0.5, 2.5/2 + 0.01]}>
            <boxGeometry args={[0.68, 1.18, 0.06]} />
            <meshStandardMaterial color="#1976d2" />
          </mesh>
          {/* Window (beside door, left side) */}
          <mesh position={[-1, 0.3, 2.5/2]}>
            <boxGeometry args={[0.7, 0.6, 0.08]} />
            <meshStandardMaterial {...windowMaterial} />
          </mesh>
        </>
      )}
      {/* Interior view */}
      {view === 'interior' && (
        <group>
          {/* Left wall shelves (3 levels) */}
          {[0.5, 0, -0.5].map((y, i) => (
            <mesh key={i} position={[-1.25, y, 0]}>
              <boxGeometry args={[0.18, 0.12, 1.5]} />
              <meshStandardMaterial color="#a1887f" />
            </mesh>
          ))}
          {/* Right wall shelves (3 levels) */}
          {[0.5, 0, -0.5].map((y, i) => (
            <mesh key={i} position={[1.25, y, 0]}>
              <boxGeometry args={[0.18, 0.12, 1.5]} />
              <meshStandardMaterial color="#a1887f" />
            </mesh>
          ))}
          {/* Boxes and bottles on shelves */}
          {[[-1.25, 0.5, 0.4], [1.25, 0, -0.5], [-1.25, -0.5, -0.6]].map(([x, y, z], i) => (
            <mesh key={i} position={[x, y + 0.09, z]}>
              <boxGeometry args={[0.22, 0.18, 0.32]} />
              <meshStandardMaterial color="#cfd8dc" />
            </mesh>
          ))}
          {/* Floor crates */}
          <mesh position={[-0.7, -0.9, 0.7]}>
            <boxGeometry args={[0.5, 0.3, 0.5]} />
            <meshStandardMaterial color="#bdbdbd" />
          </mesh>
          <mesh position={[0.7, -0.9, -0.7]}>
            <boxGeometry args={[0.4, 0.3, 0.4]} />
            <meshStandardMaterial color="#bdbdbd" />
          </mesh>
          {/* Step ladder */}
          <mesh position={[1, -0.8, 0.6]}>
            <boxGeometry args={[0.18, 0.5, 0.18]} />
            <meshStandardMaterial color="#757575" />
          </mesh>
          {/* Back wall cabinet */}
          <mesh position={[0, 0.1, -1.1]}>
            <boxGeometry args={[1.1, 0.7, 0.22]} />
            <meshStandardMaterial color="#616161" />
          </mesh>
          {/* Notice board */}
          <mesh position={[-1.1, 0.7, -1.22]}>
            <boxGeometry args={[0.5, 0.32, 0.04]} />
            <meshStandardMaterial color="#ffe066" />
          </mesh>
          {/* Movable cart in center */}
          <mesh position={[0, -0.8, 0]}>
            <boxGeometry args={[0.5, 0.18, 0.32]} />
            <meshStandardMaterial color="#90caf9" />
          </mesh>
          {/* Close button (text) */}
          <Text position={[0, 1.1, 1.3]} fontSize={0.22} color="#c62828" anchorX="center" anchorY="middle" onClick={() => setView('exterior')}>
            Close
          </Text>
        </group>
      )}
      {/* Label (only show in exterior view) */}
      {view === 'exterior' && (
        <Text position={[0, 1.2, 1.3]} fontSize={0.32} color="#333" anchorX="center" anchorY="middle">Store Room</Text>
      )}
    </group>
  );
}
