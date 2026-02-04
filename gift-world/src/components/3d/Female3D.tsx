import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

type Female3DProps = {
  position?: [number, number, number];
  scale?: number;
  rotationY?: number;
  walking?: boolean;
  talking?: boolean;
  walkingSpeed?: number;
  onClick?: () => void;
};

export default function Female3D({ 
  position = [-1.5, 0, 7], 
  scale = 1, 
  rotationY = 0, 
  walking = false, 
  talking = false,
  walkingSpeed = 3.2,
  onClick 
}: Female3DProps) {
  const { isNight } = useTheme();
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const hairRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Graceful breathing animation
    if (groupRef.current) {
      groupRef.current.position.y = (position?.[1] ?? 0) + Math.sin(t * 1.3) * 0.018;
    }
    
    // Gentle hair sway
    if (hairRef.current) {
      hairRef.current.rotation.z = Math.sin(t * 2) * 0.02;
    }
    
    // Talking animation - head and arm gestures
    if (talking) {
      const talkSpeed = 2.5;
      if (bodyRef.current) {
        // Gentle head nods while talking
        bodyRef.current.rotation.x = Math.sin(t * talkSpeed) * 0.03;
        // Side-to-side head movement
        bodyRef.current.rotation.y = Math.sin(t * talkSpeed * 0.7) * 0.06;
      }
      
      // Expressive hand gestures while talking
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.z = 0.18 + Math.sin(t * talkSpeed * 1.3) * 0.1;
        rightArmRef.current.rotation.z = -0.18 + Math.sin(t * talkSpeed * 1.1) * 0.08;
      }
    }
    
    // Elegant walking animation
    if (walking) {
      const swing = Math.sin(t * walkingSpeed) * 0.35;
      const armSwing = Math.sin(t * walkingSpeed) * 0.25;
      
      // Smoother leg movement for feminine gait
      if (leftLegRef.current) leftLegRef.current.rotation.x = swing;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -swing;
      
      // Graceful arm movement (modified if talking)
      if (!talking) {
        if (leftArmRef.current) leftArmRef.current.rotation.x = -armSwing * 0.7;
        if (rightArmRef.current) rightArmRef.current.rotation.x = armSwing * 0.7;
      }
      
      // Subtle body sway
      if (bodyRef.current && !talking) {
        bodyRef.current.rotation.y = Math.sin(t * walkingSpeed * 0.5) * 0.04;
      }
    }
  });
  
  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]} rotation={[0, rotationY, 0]} onClick={onClick}>
      {/* Elegant flats/sandals */}
      <mesh position={[-0.07, 0.04, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[0.075, 0.04, 0.15]} />
        <meshStandardMaterial 
          color="#8B4513" 
          roughness={0.4} 
          metalness={0.2}
        />
      </mesh>
      <mesh position={[0.07, 0.04, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[0.075, 0.04, 0.15]} />
        <meshStandardMaterial 
          color="#8B4513" 
          roughness={0.4} 
          metalness={0.2}
        />
      </mesh>
      
      {/* Elegant legs */}
      <mesh ref={leftLegRef} position={[-0.07, 0.27, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.045, 0.05, 0.48, 16]} />
        <meshStandardMaterial 
          color="#E8C5A0" 
          roughness={0.6}
        />
      </mesh>
      <mesh ref={rightLegRef} position={[0.07, 0.27, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.045, 0.05, 0.48, 16]} />
        <meshStandardMaterial 
          color="#E8C5A0" 
          roughness={0.6}
        />
      </mesh>
      
      {/* Stylish dress/top */}
      <mesh ref={bodyRef} position={[0, 0.72, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.16, 0.75, 24]} />
        <meshStandardMaterial 
          color="#FF6B9D" 
          roughness={0.3}
          metalness={0.02}
        />
      </mesh>
      
      {/* Dress details - decorative belt */}
      <mesh position={[0, 0.58, 0]} castShadow>
        <cylinderGeometry args={[0.17, 0.17, 0.04, 24]} />
        <meshStandardMaterial 
          color="#E91E63" 
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
      
      {/* Natural head shape */}
      <mesh position={[0, 1.16, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial 
          color="#E8C5A0" 
          roughness={0.7}
        />
      </mesh>
      
      {/* Beautiful long hair */}
      <mesh ref={hairRef} position={[0, 1.24, -0.03]} castShadow>
        <sphereGeometry args={[0.145, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.8]} />
        <meshStandardMaterial 
          color="#2C1810" 
          roughness={0.8}
        />
      </mesh>
      
      {/* Hair back flow */}
      <mesh position={[0, 1.05, -0.12]} castShadow>
        <cylinderGeometry args={[0.11, 0.08, 0.35, 16]} />
        <meshStandardMaterial 
          color="#2C1810" 
          roughness={0.8}
        />
      </mesh>
      
      {/* Hair side strands */}
      <mesh position={[-0.09, 1.18, 0.06]} castShadow>
        <boxGeometry args={[0.04, 0.12, 0.03]} />
        <meshStandardMaterial color="#2C1810" roughness={0.8} />
      </mesh>
      <mesh position={[0.09, 1.18, 0.06]} castShadow>
        <boxGeometry args={[0.04, 0.12, 0.03]} />
        <meshStandardMaterial color="#2C1810" roughness={0.8} />
      </mesh>
      
      {/* Graceful arms */}
      <mesh ref={leftArmRef} position={[-0.19, 0.87, 0]} rotation={[0, 0, 0.18]} castShadow receiveShadow>
        <cylinderGeometry args={[0.032, 0.038, 0.38, 12]} />
        <meshStandardMaterial color="#E8C5A0" roughness={0.6} />
      </mesh>
      <mesh ref={rightArmRef} position={[0.19, 0.87, 0]} rotation={[0, 0, -0.18]} castShadow receiveShadow>
        <cylinderGeometry args={[0.032, 0.038, 0.38, 12]} />
        <meshStandardMaterial color="#E8C5A0" roughness={0.6} />
      </mesh>
      
      {/* Delicate hands */}
      <mesh position={[-0.19, 0.68, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.037, 12, 12]} />
        <meshStandardMaterial color="#E8C5A0" roughness={0.6} />
      </mesh>
      <mesh position={[0.19, 0.68, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.037, 12, 12]} />
        <meshStandardMaterial color="#E8C5A0" roughness={0.6} />
      </mesh>
      
      {/* Beautiful eyes */}
      <mesh position={[-0.038, 1.2, 0.115]}>
        <sphereGeometry args={[0.013, 8, 8]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>
      <mesh position={[0.038, 1.2, 0.115]}>
        <sphereGeometry args={[0.013, 8, 8]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>
      
      {/* Eye highlights */}
      <mesh position={[-0.033, 1.202, 0.125]}>
        <sphereGeometry args={[0.004, 6, 6]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.043, 1.202, 0.125]}>
        <sphereGeometry args={[0.004, 6, 6]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Eyelashes */}
      <mesh position={[-0.038, 1.207, 0.122]}>
        <boxGeometry args={[0.018, 0.003, 0.001]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>
      <mesh position={[0.038, 1.207, 0.122]}>
        <boxGeometry args={[0.018, 0.003, 0.001]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>
      
      {/* Sweet smile */}
      <mesh position={[0, 1.14, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.022, 0.005, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#FF6B6B" roughness={0.4} />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 1.17, 0.115]}>
        <sphereGeometry args={[0.006, 6, 6]} />
        <meshStandardMaterial color="#D4A574" roughness={0.7} />
      </mesh>
      
      {/* Earrings */}
      <mesh position={[-0.12, 1.15, 0]}>
        <sphereGeometry args={[0.008, 6, 6]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[0.12, 1.15, 0]}>
        <sphereGeometry args={[0.008, 6, 6]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
}
