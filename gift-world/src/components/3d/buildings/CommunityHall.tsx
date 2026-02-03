import { useRef, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface CommunityHallProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  name?: string;
  capacity?: number;
}

export default function CommunityHall({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  name = "Community Hall",
  capacity = 200
}: CommunityHallProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLabel(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Main Hall Building */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[6, 2.4, 4]} />
        <meshStandardMaterial color="#DDA0DD" roughness={0.7} />
      </mesh>

      {/* Slanted Roof */}
      <mesh position={[0, 2.6, 0]} rotation={[Math.PI / 12, 0, 0]}>
        <boxGeometry args={[6.2, 0.2, 4.4]} />
        <meshStandardMaterial color="#8B0000" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.8, -0.3]} rotation={[-Math.PI / 12, 0, 0]}>
        <boxGeometry args={[6.2, 0.2, 4.4]} />
        <meshStandardMaterial color="#8B0000" roughness={0.8} />
      </mesh>

      {/* Front Entrance */}
      <mesh position={[0, 0.8, 2.01]}>
        <boxGeometry args={[2, 1.6, 0.02]} />
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </mesh>

      {/* Double Door */}
      <mesh position={[-0.5, 0.8, 2.02]}>
        <boxGeometry args={[0.9, 1.5, 0.02]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      <mesh position={[0.5, 0.8, 2.02]}>
        <boxGeometry args={[0.9, 1.5, 0.02]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Door Handles */}
      <mesh position={[-0.2, 0.8, 2.03]}>
        <cylinderGeometry args={[0.02, 0.02, 0.08, 8]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} />
      </mesh>
      <mesh position={[0.2, 0.8, 2.03]}>
        <cylinderGeometry args={[0.02, 0.02, 0.08, 8]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} />
      </mesh>

      {/* Large Windows */}
      {[[-2, 0], [2, 0], [-2, 1.2], [2, 1.2]].map(([x, y], i) => (
        <group key={`window-${i}`}>
          <mesh position={[x, y + 0.8, 2.01]}>
            <boxGeometry args={[1, 0.8, 0.02]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </mesh>
          <mesh position={[x, y + 0.8, 2.02]}>
            <boxGeometry args={[0.95, 0.75, 0.01]} />
            <meshStandardMaterial 
              color="#87CEEB"
              transparent
              opacity={0.7}
            />
          </mesh>
          {/* Window grid */}
          <mesh position={[x, y + 0.8, 2.03]}>
            <boxGeometry args={[0.02, 0.75, 0.01]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[x, y + 0.8, 2.03]}>
            <boxGeometry args={[0.95, 0.02, 0.01]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        </group>
      ))}

      {/* Side Entrance */}
      <mesh position={[3.01, 0.6, 0]}>
        <boxGeometry args={[0.02, 1.2, 1.5]} />
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </mesh>

      {/* Side Windows */}
      {[-1.5, 0, 1.5].map((z, i) => (
        <group key={`side-window-${i}`}>
          <mesh position={[3.01, 1.2, z]}>
            <boxGeometry args={[0.02, 0.6, 0.8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[3.02, 1.2, z]}>
            <boxGeometry args={[0.01, 0.55, 0.75]} />
            <meshStandardMaterial 
              color="#87CEEB"
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      ))}

      {/* Stage Area (visible through windows) */}
      <mesh position={[0, 0.3, -1.5]}>
        <boxGeometry args={[4, 0.6, 1]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Stage Curtains */}
      <mesh position={[0, 1.5, -1.98]}>
        <boxGeometry args={[4, 1.5, 0.02]} />
        <meshStandardMaterial color="#8B0000" roughness={0.9} />
      </mesh>

      {/* Entrance Steps */}
      <mesh position={[0, 0.1, 2.8]}>
        <boxGeometry args={[3, 0.2, 1.5]} />
        <meshStandardMaterial color="#D3D3D3" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.2, 3.2]}>
        <boxGeometry args={[3.5, 0.2, 0.8]} />
        <meshStandardMaterial color="#D3D3D3" roughness={0.9} />
      </mesh>

      {/* Event Banner Post */}
      <mesh position={[-3.5, 1.5, 1]}>
        <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-3.5, 2.8, 1]}>
        <boxGeometry args={[0.02, 0.6, 2]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* AC Units */}
      <mesh position={[2.8, 1.8, 1.5]}>
        <boxGeometry args={[0.4, 0.3, 0.8]} />
        <meshStandardMaterial color="#708090" roughness={0.6} />
      </mesh>
      <mesh position={[2.8, 1.8, -1.5]}>
        <boxGeometry args={[0.4, 0.3, 0.8]} />
        <meshStandardMaterial color="#708090" roughness={0.6} />
      </mesh>

      {/* Parking Area */}
      <mesh position={[-5, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[4, 6, 0.02]} />
        <meshStandardMaterial color="#708090" roughness={0.9} />
      </mesh>

      {/* Parking Lines */}
      {[-2, 0, 2].map((z, i) => (
        <mesh key={`parking-${i}`} position={[-5, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.08, 3.5, 0.01]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      ))}

      {/* Hall Lighting */}
      {isNight && (
        <>
          <pointLight position={[0, 3.5, 2]} color="#FFFFFF" intensity={1.5} distance={12} />
          <pointLight position={[0, 2, 0]} color="#FFFF99" intensity={0.8} distance={8} />
          <pointLight position={[-3.5, 3, 1]} color="#FFD700" intensity={0.6} distance={6} />
        </>
      )}

      {/* Hall Name Board */}
      <mesh position={[0, 2.2, 2.02]}>
        <boxGeometry args={[3, 0.4, 0.02]} />
        <meshStandardMaterial color="#000080" />
      </mesh>

      {/* Name Label */}
      {showLabel && (
        <Html position={[0, 3.5, 0]} center>
          <div style={{
            color: isNight ? '#FFD700' : '#333',
            fontSize: '11px',
            fontWeight: 'bold',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.9)',
            padding: '3px 8px',
            borderRadius: '6px',
            border: '2px solid #DDA0DD'
          }}>
            🎭 {name}<br/>
            <span style={{ fontSize: '8px', opacity: 0.8 }}>Capacity: {capacity}</span>
          </div>
        </Html>
      )}
    </group>
  );
}