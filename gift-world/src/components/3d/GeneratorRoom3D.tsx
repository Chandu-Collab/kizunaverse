import React, { useState } from "react";
import { Text } from "@react-three/drei";

export default function GeneratorRoom3D({ position = [0, 0, 0], isNight = false }: { position?: [number, number, number], isNight?: boolean }) {
  const [view, setView] = useState<'exterior' | 'interior'>('exterior');
  // Window material: day is blue, night is glowing yellow
  const windowMaterial = isNight
    ? { color: "#ffe066", emissive: "#ffe066", emissiveIntensity: 1.1, transparent: true, opacity: 0.95 }
    : { color: "#b3e5fc", emissive: "#000000", emissiveIntensity: 0, transparent: true, opacity: 0.7 };
  return (
    <group position={position as [number, number, number]}>
      {/* Lighting: Day/Night difference */}
      <ambientLight intensity={isNight ? 0.13 : 0.6} color={isNight ? "#1a1a2e" : "#e0f7fa"} />
      {isNight && (
        <pointLight position={[-0.7, 0.2, 1]} intensity={1.1} color="#ffe066" distance={2.2} decay={2} />
      )}
      {/* View toggle buttons */}
      <Text position={[-0.8, 1.1, 1.1]} fontSize={0.16} color={view === 'exterior' ? '#1976d2' : '#333'} anchorX="center" anchorY="middle" onClick={() => setView('exterior')}>
        Exterior
      </Text>
      <Text position={[0.8, 1.1, 1.1]} fontSize={0.16} color={view === 'interior' ? '#1976d2' : '#333'} anchorX="center" anchorY="middle" onClick={() => setView('interior')}>
        Interior
      </Text>
      {/* Exterior view */}
      {view === 'exterior' && (
        <>
          {/* Exterior */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.2, 1.4, 2]} />
            <meshStandardMaterial color="#757575" />
          </mesh>
          {/* Door Frame */}
          <mesh position={[0, -0.3, 2/2 + 0.045]}>
            <boxGeometry args={[0.56, 0.86, 0.11]} />
            <meshStandardMaterial color="#dedede" />
          </mesh>
          {/* Door (inset) */}
          <mesh position={[0, -0.3, 2/2 + 0.01]}>
            <boxGeometry args={[0.48, 0.78, 0.06]} />
            <meshStandardMaterial color="#1976d2" />
          </mesh>
          {/* Window */}
          <mesh position={[-0.7, 0.2, 2/2]}>
            <boxGeometry args={[0.5, 0.4, 0.08]} />
            <meshStandardMaterial {...windowMaterial} />
          </mesh>
        </>
      )}
      {/* Interior view */}
      {view === 'interior' && (
        <group>
          {/* Enhanced lighting for interior */}
          <ambientLight intensity={0.38} color={isNight ? "#ffe066" : "#fffde7"} />
          <pointLight position={[0, 0.8, 0]} intensity={1.1} color={isNight ? "#ffe066" : "#fffde7"} distance={3.5} decay={2} castShadow />
          {/* Generator main unit */}
          <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.1, 0.5, 0.7]} />
            <meshStandardMaterial color="#bdbdbd" />
          </mesh>
          {/* Generator details: exhaust pipe */}
          <mesh position={[0.5, -0.2, 0.3]} castShadow receiveShadow>
            <boxGeometry args={[0.18, 0.08, 0.08]} />
            <meshStandardMaterial color="#757575" />
          </mesh>
          {/* Control panel */}
          <mesh position={[-0.5, -0.2, 0.45]} castShadow receiveShadow>
            <boxGeometry args={[0.32, 0.18, 0.08]} />
            <meshStandardMaterial color="#1976d2" />
          </mesh>
          {/* Fuel drums */}
          <mesh position={[0.7, -0.6, -0.5]} castShadow receiveShadow>
            <cylinderGeometry args={[0.13, 0.13, 0.38, 24]} />
            <meshStandardMaterial color="#c62828" />
          </mesh>
          <mesh position={[0.4, -0.6, -0.7]} castShadow receiveShadow>
            <cylinderGeometry args={[0.13, 0.13, 0.38, 24]} />
            <meshStandardMaterial color="#fbc02d" />
          </mesh>
          {/* Shelves on left wall */}
          {[0.3, -0.2].map((y, i) => (
            <mesh key={i} position={[-0.95, y, 0.2]} castShadow receiveShadow>
              <boxGeometry args={[0.12, 0.08, 0.8]} />
              <meshStandardMaterial color="#a1887f" />
            </mesh>
          ))}
          {/* Tools on shelves */}
          <mesh position={[-0.95, 0.38, 0.4]} castShadow receiveShadow>
            <boxGeometry args={[0.18, 0.12, 0.18]} />
            <meshStandardMaterial color="#90caf9" />
          </mesh>
          <mesh position={[-0.95, -0.12, -0.2]} castShadow receiveShadow>
            <boxGeometry args={[0.18, 0.12, 0.18]} />
            <meshStandardMaterial color="#cfd8dc" />
          </mesh>
          {/* Electrical cabinet on back wall */}
          <mesh position={[0, 0.1, -0.9]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.5, 0.16]} />
            <meshStandardMaterial color="#616161" />
          </mesh>
          {/* Notice board */}
          <mesh position={[-0.8, 0.5, -0.95]} castShadow receiveShadow>
            <boxGeometry args={[0.36, 0.22, 0.04]} />
            <meshStandardMaterial color="#ffe066" />
          </mesh>
          {/* Close button (text) */}
          <Text position={[0, 0.9, 1.1]} fontSize={0.19} color="#c62828" anchorX="center" anchorY="middle" onClick={() => setView('exterior')}>
            Close
          </Text>
        </group>
      )}
      {/* Label (only show in exterior view) */}
      {view === 'exterior' && (
        <Text position={[0, 0.8, 1.1]} fontSize={0.28} color="#333" anchorX="center" anchorY="middle">Generator Room</Text>
      )}
    </group>
  );
}
