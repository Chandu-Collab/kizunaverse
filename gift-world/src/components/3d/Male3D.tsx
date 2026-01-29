import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

type Male3DProps = {
  position?: [number, number, number];
  scale?: number;
  rotationY?: number;
  walking?: boolean;
  onClick?: () => void;
};

export default function Male3D({ position = [1.5, 0, 7], scale = 1, rotationY = 0, walking = false, onClick }: Male3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = (position?.[1] ?? 0) + Math.sin(t * 1.2) * 0.04;
      groupRef.current.scale.setScalar(scale ?? 1 + Math.sin(t * 1.2) * 0.01);
    }
    if (walking) {
      const swing = Math.sin(t * 4) * 0.5;
      if (leftLegRef.current) leftLegRef.current.rotation.x = swing;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -swing;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -swing * 0.7;
      if (rightArmRef.current) rightArmRef.current.rotation.x = swing * 0.7;
    }
  });
  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]} rotation={[0, rotationY, 0]} onClick={onClick}>
      {/* Shoes */}
      <mesh position={[-0.09, 0.05, 0.08]}>
        <boxGeometry args={[0.09, 0.06, 0.18]} />
        <meshStandardMaterial color="#222" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0.09, 0.05, 0.08]}>
        <boxGeometry args={[0.09, 0.06, 0.18]} />
        <meshStandardMaterial color="#222" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Legs */}
      <mesh ref={leftLegRef} position={[-0.09, 0.25, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.45, 16]} />
        <meshStandardMaterial color="#3A5BA0" />
      </mesh>
      <mesh ref={rightLegRef} position={[0.09, 0.25, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.45, 16]} />
        <meshStandardMaterial color="#3A5BA0" />
      </mesh>
      {/* Body (shirt) */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.16, 0.17, 0.7, 24]} />
        <meshStandardMaterial color="#4F8BFF" roughness={0.4} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.13, 0]}>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial color="#F5D6B4" />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 1.22, 0]}>
        <sphereGeometry args={[0.16, 16, 16, 0, Math.PI]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Arms (skin) */}
      <mesh ref={leftArmRef} position={[-0.23, 0.85, 0]} rotation={[0, 0, 0.18]}>
        <cylinderGeometry args={[0.038, 0.045, 0.38, 12]} />
        <meshStandardMaterial color="#F5D6B4" />
      </mesh>
      <mesh ref={rightArmRef} position={[0.23, 0.85, 0]} rotation={[0, 0, -0.18]}>
        <cylinderGeometry args={[0.038, 0.045, 0.38, 12]} />
        <meshStandardMaterial color="#F5D6B4" />
      </mesh>
      {/* Hands */}
      <mesh position={[-0.23, 0.67, 0]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color="#F5D6B4" />
      </mesh>
      <mesh position={[0.23, 0.67, 0]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color="#F5D6B4" />
      </mesh>
      {/* Face: Eyes */}
      <mesh position={[-0.045, 1.18, 0.13]}>
        <sphereGeometry args={[0.016, 8, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0.045, 1.18, 0.13]}>
        <sphereGeometry args={[0.016, 8, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Face: Smile */}
      <mesh position={[0, 1.13, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.032, 0.009, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#E57373" />
      </mesh>
    </group>
  );
}
