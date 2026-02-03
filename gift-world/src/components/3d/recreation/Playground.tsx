import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface PlaygroundProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  size?: 'small' | 'medium' | 'large';
}

export default function Playground({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  size = 'medium'
}: PlaygroundProps) {
  const groupRef = useRef<THREE.Group>(null);
  const swingRef = useRef<THREE.Group>(null);
  const seesawRef = useRef<THREE.Group>(null);
  const [swingTime, setSwingTime] = useState(0);
  const { isNight } = useTheme();
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLabel(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const sizeMultiplier = size === 'small' ? 0.7 : size === 'large' ? 1.3 : 1;

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    setSwingTime(time);

    // Animate swings
    if (swingRef.current) {
      swingRef.current.children.forEach((swing, i) => {
        swing.rotation.z = Math.sin(time * 1.5 + i * 0.5) * 0.3;
      });
    }

    // Animate seesaw
    if (seesawRef.current) {
      seesawRef.current.rotation.z = Math.sin(time * 0.8) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale * sizeMultiplier}>
      {/* Playground Base */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6, 16]} />
        <meshStandardMaterial color="#90EE90" roughness={0.9} />
      </mesh>

      {/* Playground Border */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.8, 6, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Swing Set */}
      <group ref={swingRef} position={[-3, 0, -2]}>
        {/* Swing frame */}
        <mesh position={[-1, 1.5, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 3, 8]} />
          <meshStandardMaterial color="#FF6B6B" roughness={0.6} />
        </mesh>
        <mesh position={[1, 1.5, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 3, 8]} />
          <meshStandardMaterial color="#FF6B6B" roughness={0.6} />
        </mesh>
        <mesh position={[0, 3, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2.2, 8]} />
          <meshStandardMaterial color="#FF6B6B" roughness={0.6} />
        </mesh>

        {/* Swings */}
        {[-0.6, 0.6].map((x, i) => (
          <group key={`swing-${i}`} position={[x, 3, 0]}>
            {/* Chain */}
            <mesh position={[0, -0.8, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 1.6, 4]} />
              <meshStandardMaterial color="#708090" metalness={0.8} />
            </mesh>
            {/* Seat */}
            <mesh position={[0, -1.6, 0]}>
              <boxGeometry args={[0.4, 0.05, 0.3]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Slide */}
      <group position={[3, 0, -1]}>
        {/* Slide platform */}
        <mesh position={[0, 1.5, 1]}>
          <boxGeometry args={[1.5, 0.1, 1.5]} />
          <meshStandardMaterial color="#4169E1" roughness={0.7} />
        </mesh>
        
        {/* Slide support pillars */}
        {[[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]].map(([x, z], i) => (
          <mesh key={`pillar-${i}`} position={[x, 0.75, 1 + z]}>
            <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
            <meshStandardMaterial color="#4169E1" roughness={0.6} />
          </mesh>
        ))}

        {/* Slide surface */}
        <mesh position={[0, 1, -0.5]} rotation={[-Math.PI / 6, 0, 0]}>
          <boxGeometry args={[0.8, 0.05, 3]} />
          <meshStandardMaterial color="#FFD700" roughness={0.3} />
        </mesh>

        {/* Slide sides */}
        <mesh position={[-0.42, 1.1, -0.5]} rotation={[-Math.PI / 6, 0, 0]}>
          <boxGeometry args={[0.05, 0.2, 3]} />
          <meshStandardMaterial color="#FFD700" roughness={0.3} />
        </mesh>
        <mesh position={[0.42, 1.1, -0.5]} rotation={[-Math.PI / 6, 0, 0]}>
          <boxGeometry args={[0.05, 0.2, 3]} />
          <meshStandardMaterial color="#FFD700" roughness={0.3} />
        </mesh>

        {/* Ladder */}
        <mesh position={[0, 0.75, 1.8]}>
          <boxGeometry args={[0.05, 1.5, 0.05]} />
          <meshStandardMaterial color="#708090" />
        </mesh>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={`ladder-rung-${i}`} position={[0, 0.3 + i * 0.25, 1.8]}>
            <boxGeometry args={[0.4, 0.03, 0.03]} />
            <meshStandardMaterial color="#708090" />
          </mesh>
        ))}
      </group>

      {/* Seesaw */}
      <group ref={seesawRef} position={[0, 0, 3]}>
        {/* Seesaw fulcrum */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.6, 6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        
        {/* Seesaw plank */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[3, 0.05, 0.3]} />
          <meshStandardMaterial color="#FF8C00" roughness={0.7} />
        </mesh>

        {/* Seesaw handles */}
        <mesh position={[-1.3, 0.8, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 6]} />
          <meshStandardMaterial color="#4169E1" />
        </mesh>
        <mesh position={[1.3, 0.8, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 6]} />
          <meshStandardMaterial color="#4169E1" />
        </mesh>
      </group>

      {/* Roundabout/Merry-go-round */}
      <group position={[-1, 0, 2]}>
        {/* Central post */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 1, 8]} />
          <meshStandardMaterial color="#708090" roughness={0.6} />
        </mesh>

        {/* Platform */}
        <mesh position={[0, 0.1, 0]} rotation={[0, swingTime * 0.5, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.1, 8]} />
          <meshStandardMaterial color="#32CD32" roughness={0.7} />
        </mesh>

        {/* Handholds */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2;
          return (
            <mesh 
              key={`handle-${i}`} 
              position={[Math.cos(angle) * 0.9, 0.6, Math.sin(angle) * 0.9]}
              rotation={[0, swingTime * 0.5, 0]}
            >
              <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
              <meshStandardMaterial color="#FF6B6B" />
            </mesh>
          );
        })}
      </group>

      {/* Monkey Bars */}
      <group position={[2, 0, 2.5]}>
        {/* Support posts */}
        <mesh position={[-1.5, 1.2, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 2.4, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} />
        </mesh>
        <mesh position={[1.5, 1.2, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 2.4, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} />
        </mesh>

        {/* Top bar */}
        <mesh position={[0, 2.4, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 3.2, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} />
        </mesh>

        {/* Monkey bars */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`bar-${i}`} position={[-1.3 + i * 0.37, 2.1, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.4, 6]} />
            <meshStandardMaterial color="#FFD700" metalness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Sandbox */}
      <group position={[-2.5, 0, 0.5]}>
        {/* Sandbox border */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[2, 0.2, 2]} />
          <meshStandardMaterial color="#8B4513" roughness={0.9} />
        </mesh>
        
        {/* Sand */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[1.8, 0.1, 1.8]} />
          <meshStandardMaterial color="#F4A460" roughness={1} />
        </mesh>

        {/* Toy bucket */}
        <mesh position={[0.5, 0.15, 0.5]}>
          <cylinderGeometry args={[0.1, 0.08, 0.15, 8]} />
          <meshStandardMaterial color="#FF6B6B" />
        </mesh>

        {/* Toy shovel */}
        <mesh position={[-0.3, 0.12, -0.4]}>
          <boxGeometry args={[0.15, 0.02, 0.08]} />
          <meshStandardMaterial color="#32CD32" />
        </mesh>
        <mesh position={[-0.3, 0.18, -0.5]}>
          <cylinderGeometry args={[0.01, 0.01, 0.2, 6]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>

      {/* Playground Lighting */}
      {isNight && (
        <>
          <pointLight position={[0, 4, 0]} color="#FFFFFF" intensity={1} distance={15} />
          <mesh position={[0, 3.8, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial 
              color="#FFFFFF" 
              emissive="#FFFFFF" 
              emissiveIntensity={1}
            />
          </mesh>
        </>
      )}

      {/* Playground Sign */}
      {showLabel && (
        <Html position={[0, 4.5, -6]} center>
          <div style={{
            color: isNight ? '#FFD700' : '#333',
            fontSize: '12px',
            fontWeight: 'bold',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.9)',
            padding: '4px 8px',
            borderRadius: '6px',
            border: '2px solid #FF6B6B'
          }}>
            🎪 Children's Playground
          </div>
        </Html>
      )}
    </group>
  );
}