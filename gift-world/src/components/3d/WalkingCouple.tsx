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
  friendPosition?: [number, number, number]; // Position of the waiting friend
}

export default function WalkingCouple({ 
  startPosition = [0, 0, 30],  // BMS College position
  endPosition = [0, 0, -30],   // Friend's home position
  walkingSpeed = 0.1,          // Extremely slow walking speed
  scale = 0.8,
  friendPosition = [0, 0, 15] // Friend waiting on main road in front of town
}: WalkingCoupleProps) {
  const { isNight } = useTheme();
  const groupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);
  const [isTalking, setIsTalking] = useState(true);
  const [hasMetFriend, setHasMetFriend] = useState(false);
  const [isNearFriend, setIsNearFriend] = useState(false);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (!hasMetFriend) {
      // Update walking progress only if hasn't met friend yet - NO LOOPING
      const newProgress = Math.min((t * walkingSpeed * 0.02), 1); // Remove % 1 to prevent looping
      setProgress(newProgress);
      
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
        
        // Check if near the waiting friend
        const distanceToFriend = Math.sqrt(
          Math.pow(currentX - friendPosition[0], 2) + 
          Math.pow(currentZ + curve - friendPosition[2], 2)
        );
        
        if (distanceToFriend < 3 && !isNearFriend) {
          setIsNearFriend(true);
          setHasMetFriend(true);
          setIsTalking(true);
          
          // Turn to face the friend
          const friendDirection = Math.atan2(friendPosition[0] - currentX, friendPosition[2] - (currentZ + curve));
          groupRef.current.rotation.y = friendDirection;
        }
      }
    } else {
      // They've met the friend, so they stop and talk
      if (Math.random() < 0.008) { // Slightly more frequent talking when meeting friend
        setIsTalking(!isTalking);
      }
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Walking couple - positioned closer side by side */}
      <Male3D 
        position={[0.4, 0, 0]} 
        scale={scale} 
        rotationY={0}
        walking={!hasMetFriend} // Stop walking when they meet the friend
        talking={isTalking || hasMetFriend} // Talk more when they meet the friend
        walkingSpeed={hasMetFriend ? 0 : 0.4} // Stop walking animation when meeting friend
      />
      <Female3D 
        position={[-0.4, 0, 0]} 
        scale={scale * 0.95} 
        rotationY={0}
        walking={!hasMetFriend} // Stop walking when they meet the friend
        talking={isTalking || hasMetFriend} // Talk more when they meet the friend
        walkingSpeed={hasMetFriend ? 0 : 0.35} // Stop walking animation when meeting friend
      />
      
      {/* Conversation indicator - more prominent when meeting friend */}
      {(isTalking || hasMetFriend) && (
        <>
          <mesh position={[0, 2.5, 0]}>
            <sphereGeometry args={[hasMetFriend ? 0.12 : 0.1, 8, 8]} />
            <meshStandardMaterial 
              color={hasMetFriend ? "#FF1493" : "#FF69B4"} 
              transparent 
              opacity={hasMetFriend ? 0.9 : 0.7}
              emissive={hasMetFriend ? "#FF1493" : "#FF69B4"}
              emissiveIntensity={hasMetFriend ? 0.4 : 0.2}
            />
          </mesh>
          <mesh position={[0.3, 2.3, 0.2]}>
            <sphereGeometry args={[hasMetFriend ? 0.08 : 0.06, 6, 6]} />
            <meshStandardMaterial 
              color="#FF1493" 
              transparent 
              opacity={hasMetFriend ? 0.8 : 0.6}
              emissive="#FF1493"
              emissiveIntensity={hasMetFriend ? 0.5 : 0.3}
            />
          </mesh>
          <mesh position={[-0.2, 2.4, -0.1]}>
            <sphereGeometry args={[hasMetFriend ? 0.05 : 0.04, 6, 6]} />
            <meshStandardMaterial 
              color="#FF69B4" 
              transparent 
              opacity={hasMetFriend ? 0.7 : 0.5}
              emissive="#FF69B4"
              emissiveIntensity={hasMetFriend ? 0.6 : 0.4}
            />
          </mesh>
          
          {/* Additional hearts when meeting friend */}
          {hasMetFriend && (
            <>
              <mesh position={[0.5, 2.6, 0]}>
                <sphereGeometry args={[0.03, 6, 6]} />
                <meshStandardMaterial 
                  color="#FFD700" 
                  transparent 
                  opacity={0.8}
                  emissive="#FFD700"
                  emissiveIntensity={0.5}
                />
              </mesh>
              <mesh position={[-0.3, 2.7, 0.3]}>
                <sphereGeometry args={[0.025, 6, 6]} />
                <meshStandardMaterial 
                  color="#FF6347" 
                  transparent 
                  opacity={0.7}
                  emissive="#FF6347"
                  emissiveIntensity={0.4}
                />
              </mesh>
            </>
          )}
        </>
      )}
    </group>
  );
}