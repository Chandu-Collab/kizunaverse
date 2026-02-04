import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import Male3D from './Male3D';
import Female3D from './Female3D';
import * as THREE from 'three';

interface WalkingCoupleProps {
  startPosition?: [number, number, number];
  endPosition?: [number, number, number];
  walkingSpeed?: number;
  scale?: number;
}

export default function WalkingCouple({ 
  startPosition = [0, 0, 30],  // BMS College position
  endPosition = [0, 0, -30],   // Friend's home position
  walkingSpeed = 0.1,          // Extremely slow walking speed
  scale = 0.8
}: WalkingCoupleProps) {
  const { isNight } = useTheme();
  const groupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);
  const [isTalking, setIsTalking] = useState(true);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Update walking progress (extremely slow movement)
    const newProgress = (t * walkingSpeed * 0.02) % 1;
    setProgress(newProgress);
    
    // Toggle talking animation randomly
    if (Math.random() < 0.005) { // 0.5% chance each frame
      setIsTalking(!isTalking);
    }
    
    if (groupRef.current) {
      // Calculate current position along the path
      const currentX = THREE.MathUtils.lerp(startPosition[0], endPosition[0], newProgress);
      const currentZ = THREE.MathUtils.lerp(startPosition[2], endPosition[2], newProgress);
      
      // Add a gentle curve to make the path more natural
      const curve = Math.sin(newProgress * Math.PI) * 2;
      
      groupRef.current.position.set(currentX, 0, currentZ + curve);
      
      // Face the direction of movement
      const direction = Math.atan2(endPosition[0] - startPosition[0], endPosition[2] - startPosition[2]);
      groupRef.current.rotation.y = direction;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Walking couple */}
      <Male3D 
        position={[0.8, 0, 0]} 
        scale={scale} 
        rotationY={0}
        walking={true}
        talking={isTalking}
        walkingSpeed={0.4} // Extremely slow walking animation
      />
      <Female3D 
        position={[-0.8, 0, 0]} 
        scale={scale * 0.95} 
        rotationY={0}
        walking={true}
        talking={isTalking}
        walkingSpeed={0.35} // Extremely slow walking animation
      />
      
      {/* Conversation indicator - floating hearts/speech bubbles */}
      {isTalking && (
        <>
          <mesh position={[0, 2.5, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial 
              color="#FF69B4" 
              transparent 
              opacity={0.7}
              emissive="#FF69B4"
              emissiveIntensity={0.2}
            />
          </mesh>
          <mesh position={[0.3, 2.3, 0.2]}>
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshStandardMaterial 
              color="#FF1493" 
              transparent 
              opacity={0.6}
              emissive="#FF1493"
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh position={[-0.2, 2.4, -0.1]}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshStandardMaterial 
              color="#FF69B4" 
              transparent 
              opacity={0.5}
              emissive="#FF69B4"
              emissiveIntensity={0.4}
            />
          </mesh>
        </>
      )}
    </group>
  );
}