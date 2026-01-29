import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
export function Bench({ position = [0, 0, 0] }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + (hovered ? 0.08 : 0);
    }
  });
  return (
    <group ref={groupRef} position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      >
      {/* Seat */}
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[0.7, 0.08, 0.22]} />
        <meshStandardMaterial color="#C19A6B" />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.28, -0.09]}>
        <boxGeometry args={[0.7, 0.08, 0.06]} />
        <meshStandardMaterial color="#A67B5B" />
      </mesh>
      {/* Legs */}
      {[-0.28, 0.28].map((x, i) => (
        <mesh key={i} position={[x, 0.09, 0.09]}>
          <boxGeometry args={[0.08, 0.18, 0.08]} />
          <meshStandardMaterial color="#8B5C2A" />
        </mesh>
      ))}
    </group>
  );
}

export function LampPost({ position = [0, 0, 0] }) {
  const lampRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useFrame(() => {
    if (lampRef.current) {
      lampRef.current.material.emissiveIntensity = hovered ? 1.5 : 0.7;
      lampRef.current.scale.setScalar(hovered ? 1.18 : 1);
    }
  });
  return (
    <group position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Pole */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 16]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Lamp */}
      <mesh ref={lampRef} position={[0, 1.22, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}
