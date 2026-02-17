import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Ambulance3DProps {
  position?: [number, number, number];
  scale?: number;
  rotationY?: number;
  moving?: boolean;
}

export default function Ambulance3D({
  position = [0, 0, 0],
  scale = 1,
  rotationY = 0,
  moving = false,
}: Ambulance3DProps) {
  const ambulanceRef = useRef<THREE.Group>(null);

  // Subtle animation for realism
  useFrame(({ clock }) => {
    if (ambulanceRef.current && moving) {
      ambulanceRef.current.position.x += Math.sin(clock.elapsedTime * 2) * 0.002;
      ambulanceRef.current.rotation.z = Math.sin(clock.elapsedTime * 2) * 0.01;
    }
  });

  return (
    <group ref={ambulanceRef} position={position} scale={[scale, scale, scale]} rotation={[0, rotationY, 0]}>
      {/* Main body */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.2, 0.5, 0.5]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[0.7, 0.12, 0.5]} />
        <meshStandardMaterial color="#e3eafc" />
      </mesh>
      {/* Red stripe */}
      <mesh position={[0, 0.35, 0.26]}>
        <boxGeometry args={[1.2, 0.08, 0.02]} />
        <meshStandardMaterial color="#d32f2f" />
      </mesh>
      {/* Red cross */}
      <mesh position={[0.35, 0.4, 0.27]}>
        <boxGeometry args={[0.12, 0.04, 0.01]} />
        <meshStandardMaterial color="#d32f2f" />
      </mesh>
      <mesh position={[0.35, 0.4, 0.27]}>
        <boxGeometry args={[0.04, 0.12, 0.01]} />
        <meshStandardMaterial color="#d32f2f" />
      </mesh>
      {/* Siren */}
      <mesh position={[0, 0.62, 0.18]}>
        <boxGeometry args={[0.12, 0.06, 0.12]} />
        <meshStandardMaterial color="#1976d2" emissive="#1976d2" emissiveIntensity={0.7} />
      </mesh>
      {/* Wheels */}
      {[-0.35, 0.35].map((x, i) => (
        <mesh key={i} position={[x, 0.08, 0.18]}>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
          <meshStandardMaterial color="#222" />
          <mesh rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
      ))}
      {[-0.35, 0.35].map((x, i) => (
        <mesh key={i} position={[x, 0.08, -0.18]}>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
          <meshStandardMaterial color="#222" />
          <mesh rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
      ))}
    </group>
  );
}
