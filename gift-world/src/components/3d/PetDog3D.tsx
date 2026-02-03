import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type PetDog3DProps = {
  position?: [number, number, number];
  scale?: number;
  walkRadius?: number;
  walkSpeed?: number;
};

export default function PetDog3D({ 
  position = [2, 0, 5], 
  scale = 1, 
  walkRadius = 1.5,
  walkSpeed = 0.3 
}: PetDog3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const frontLegRefs = useRef<THREE.Mesh[]>([]);
  const backLegRefs = useRef<THREE.Mesh[]>([]);
  
  // Base position for circular movement
  const basePosition = useRef<[number, number, number]>(position);
  const walkPhase = useRef(Math.random() * Math.PI * 2); // Random starting phase
  const sniffPhase = useRef(Math.random() * Math.PI * 2);
  const pauseTime = useRef(0);
  const isSniffing = useRef(false);
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    const time = clock.getElapsedTime();
    const personalOffset = basePosition.current[0] * 0.5 + basePosition.current[2] * 0.3; // Unique timing per dog
    
    // Occasional pausing to sniff around (every 8-12 seconds randomly)
    if (Math.sin(time * 0.1 + personalOffset) > 0.97 && !isSniffing.current) {
      isSniffing.current = true;
      pauseTime.current = time + 2 + Math.random() * 2; // Pause for 2-4 seconds
    }
    
    if (isSniffing.current && time > pauseTime.current) {
      isSniffing.current = false;
    }
    
    // Movement only when not sniffing
    if (!isSniffing.current) {
      // Circular walking movement around base position
      walkPhase.current = time * walkSpeed + personalOffset;
      const walkX = basePosition.current[0] + Math.cos(walkPhase.current) * walkRadius;
      const walkZ = basePosition.current[2] + Math.sin(walkPhase.current) * walkRadius;
      groupRef.current.position.set(walkX, basePosition.current[1], walkZ);
      
      // Dog faces direction of movement
      const directionAngle = walkPhase.current + Math.PI / 2;
      groupRef.current.rotation.y = directionAngle;
      
      // Gentle up-down walking bounce
      const bounceY = basePosition.current[1] + Math.sin(time * walkSpeed * 8 + personalOffset) * 0.005;
      groupRef.current.position.y = bounceY;
    }
    
    // Tail wagging animation (faster when walking, slower when sniffing)
    if (tailRef.current) {
      const wagSpeed = isSniffing.current ? 3 : 5;
      tailRef.current.rotation.z = Math.sin(time * wagSpeed + personalOffset) * 0.4;
      tailRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 3 + personalOffset) * 0.1;
    }
    
    // Head movement (more active when sniffing)
    if (headRef.current) {
      if (isSniffing.current) {
        // Sniffing behavior - head moves down and around
        sniffPhase.current += 0.05;
        headRef.current.rotation.y = Math.sin(sniffPhase.current * 2) * 0.6;
        headRef.current.rotation.x = -0.3 + Math.sin(sniffPhase.current * 3) * 0.2;
      } else {
        // Normal looking around
        sniffPhase.current += 0.02;
        headRef.current.rotation.y = Math.sin(sniffPhase.current) * 0.2;
        headRef.current.rotation.x = Math.sin(sniffPhase.current * 0.7) * 0.1;
      }
    }
    
    // Body slight tilt during walking
    if (bodyRef.current) {
      if (!isSniffing.current) {
        bodyRef.current.rotation.z = Math.sin(walkPhase.current * 4) * 0.05;
      } else {
        bodyRef.current.rotation.z = 0; // Stay still when sniffing
      }
    }
    
    // Leg movement for walking animation (only when moving)
    if (!isSniffing.current) {
      const legSwing = Math.sin(time * walkSpeed * 8 + personalOffset) * 0.1;
      frontLegRefs.current.forEach((leg, i) => {
        if (leg) {
          leg.rotation.x = i === 0 ? legSwing : -legSwing;
        }
      });
      backLegRefs.current.forEach((leg, i) => {
        if (leg) {
          leg.rotation.x = i === 0 ? -legSwing : legSwing;
        }
      });
    } else {
      // Reset leg positions when sniffing
      frontLegRefs.current.forEach((leg) => {
        if (leg) leg.rotation.x = 0;
      });
      backLegRefs.current.forEach((leg) => {
        if (leg) leg.rotation.x = 0;
      });
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#C2B280" />
      </mesh>
      
      {/* Head */}
      <mesh ref={headRef} position={[0, 0.32, 0.18]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#C2B280" />
      </mesh>
      
      {/* Front Legs with walking animation */}
      {([-0.08, 0.08] as const).map((x, i) => (
        <mesh 
          key={`front-leg-${i}`} 
          ref={(ref) => { if (ref) frontLegRefs.current[i] = ref; }}
          position={[x, 0.06, 0.08]}
        >
          <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
          <meshStandardMaterial color="#A67B5B" />
        </mesh>
      ))}
      
      {/* Back Legs with walking animation */}
      {([-0.08, 0.08] as const).map((x, i) => (
        <mesh 
          key={`back-leg-${i}`} 
          ref={(ref) => { if (ref) backLegRefs.current[i] = ref; }}
          position={[x, 0.06, -0.08]}
        >
          <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
          <meshStandardMaterial color="#A67B5B" />
        </mesh>
      ))}
      
      {/* Animated Tail */}
      <mesh ref={tailRef} position={[0, 0.22, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.14, 6]} />
        <meshStandardMaterial color="#A67B5B" />
      </mesh>
      
      {/* Ears */}
      <mesh position={[-0.06, 0.41, 0.18]}>
        <coneGeometry args={[0.03, 0.08, 8]} />
        <meshStandardMaterial color="#A67B5B" />
      </mesh>
      <mesh position={[0.06, 0.41, 0.18]}>
        <coneGeometry args={[0.03, 0.08, 8]} />
        <meshStandardMaterial color="#A67B5B" />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 0.34, 0.28]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  );
}
