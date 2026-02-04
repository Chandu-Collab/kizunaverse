import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

type Male3DProps = {
  position?: [number, number, number];
  scale?: number;
  rotationY?: number;
  walking?: boolean;
  talking?: boolean;
  walkingSpeed?: number;
  onClick?: () => void;
};

export default function Male3D({ 
  position = [1.5, 0, 7], 
  scale = 1, 
  rotationY = 0, 
  walking = false, 
  talking = false,
  walkingSpeed = 3.5,
  onClick 
}: Male3DProps) {
  const { isNight } = useTheme();
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Subtle breathing animation
    if (groupRef.current) {
      groupRef.current.position.y = (position?.[1] ?? 0) + Math.sin(t * 1.5) * 0.02;
    }
    
    // Talking animation - head and arm gestures
    if (talking) {
      const talkSpeed = 2.2;
      if (bodyRef.current) {
        // Natural head movements while talking
        bodyRef.current.rotation.x = Math.sin(t * talkSpeed * 0.8) * 0.04;
        bodyRef.current.rotation.y = Math.sin(t * talkSpeed * 0.6) * 0.08;
      }
      
      // Hand gestures while talking
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.z = 0.15 + Math.sin(t * talkSpeed * 1.2) * 0.12;
        rightArmRef.current.rotation.z = -0.15 + Math.sin(t * talkSpeed * 0.9) * 0.1;
      }
    }
    
    // Natural walking animation
    if (walking) {
      const swing = Math.sin(t * walkingSpeed) * 0.4;
      const armSwing = Math.sin(t * walkingSpeed) * 0.3;
      
      // Legs swing opposite to each other
      if (leftLegRef.current) leftLegRef.current.rotation.x = swing;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -swing;
      
      // Arms swing opposite to legs for natural walking (modified if talking)
      if (!talking) {
        if (leftArmRef.current) leftArmRef.current.rotation.x = -armSwing * 0.8;
        if (rightArmRef.current) rightArmRef.current.rotation.x = armSwing * 0.8;
      }
      
      // Subtle body sway
      if (bodyRef.current && !talking) {
        bodyRef.current.rotation.y = Math.sin(t * walkingSpeed * 0.5) * 0.05;
      }
    }
  });
  
  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]} rotation={[0, rotationY, 0]} onClick={onClick}>
      {/* Modern sneakers */}
      <mesh position={[-0.08, 0.04, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.05, 0.16]} />
        <meshStandardMaterial 
          color="#2C3E50" 
          roughness={0.3} 
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0.08, 0.04, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.05, 0.16]} />
        <meshStandardMaterial 
          color="#2C3E50" 
          roughness={0.3} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Well-fitted jeans */}
      <mesh ref={leftLegRef} position={[-0.08, 0.28, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.5, 16]} />
        <meshStandardMaterial 
          color="#34495E" 
          roughness={0.8}
          normalScale={[0.3, 0.3]}
        />
      </mesh>
      <mesh ref={rightLegRef} position={[0.08, 0.28, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.5, 16]} />
        <meshStandardMaterial 
          color="#34495E" 
          roughness={0.8}
          normalScale={[0.3, 0.3]}
        />
      </mesh>
      
      {/* Stylish casual shirt */}
      <mesh ref={bodyRef} position={[0, 0.68, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.75, 24]} />
        <meshStandardMaterial 
          color="#3498DB" 
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>
      
      {/* Collar detail */}
      <mesh position={[0, 1.05, 0.08]} castShadow>
        <cylinderGeometry args={[0.16, 0.14, 0.08, 24]} />
        <meshStandardMaterial 
          color="#2980B9" 
          roughness={0.4}
        />
      </mesh>
      
      {/* Natural head shape */}
      <mesh position={[0, 1.18, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial 
          color="#D4A574" 
          roughness={0.7}
        />
      </mesh>
      
      {/* Modern hairstyle */}
      <mesh position={[0, 1.26, -0.02]} castShadow>
        <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        <meshStandardMaterial 
          color="#2C1810" 
          roughness={0.9}
        />
      </mesh>
      
      {/* Hair front */}
      <mesh position={[0, 1.22, 0.09]} castShadow>
        <boxGeometry args={[0.24, 0.08, 0.06]} />
        <meshStandardMaterial 
          color="#2C1810" 
          roughness={0.9}
        />
      </mesh>
      
      {/* Natural arms */}
      <mesh ref={leftArmRef} position={[-0.22, 0.88, 0]} rotation={[0, 0, 0.15]} castShadow receiveShadow>
        <cylinderGeometry args={[0.035, 0.042, 0.4, 12]} />
        <meshStandardMaterial color="#D4A574" roughness={0.7} />
      </mesh>
      <mesh ref={rightArmRef} position={[0.22, 0.88, 0]} rotation={[0, 0, -0.15]} castShadow receiveShadow>
        <cylinderGeometry args={[0.035, 0.042, 0.4, 12]} />
        <meshStandardMaterial color="#D4A574" roughness={0.7} />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-0.22, 0.68, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#D4A574" roughness={0.7} />
      </mesh>
      <mesh position={[0.22, 0.68, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#D4A574" roughness={0.7} />
      </mesh>
      
      {/* Expressive eyes */}
      <mesh position={[-0.04, 1.22, 0.12]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>
      <mesh position={[0.04, 1.22, 0.12]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>
      
      {/* Eye highlights */}
      <mesh position={[-0.035, 1.225, 0.13]}>
        <sphereGeometry args={[0.004, 6, 6]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.045, 1.225, 0.13]}>
        <sphereGeometry args={[0.004, 6, 6]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Friendly smile */}
      <mesh position={[0, 1.16, 0.135]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.025, 0.006, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#E74C3C" roughness={0.5} />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 1.19, 0.125]}>
        <sphereGeometry args={[0.008, 6, 6]} />
        <meshStandardMaterial color="#C49A6C" roughness={0.7} />
      </mesh>
    </group>
  );
}
