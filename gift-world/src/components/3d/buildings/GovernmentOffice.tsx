import { useRef, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface GovernmentOfficeProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  name?: string;
  type?: 'municipality' | 'panchayat' | 'revenue';
}

export default function GovernmentOffice({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  name = "Government Office",
  type = 'municipality'
}: GovernmentOfficeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLabel(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const typeColors = {
    municipality: "#4682B4",
    panchayat: "#32CD32",
    revenue: "#FF6347"
  };

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Main Building */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[4, 1.6, 3]} />
        <meshStandardMaterial color={typeColors[type]} roughness={0.7} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 1.7, 0]}>
        <boxGeometry args={[4.2, 0.2, 3.2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Entrance Pillars */}
      <mesh position={[-0.8, 1.2, 1.6]}>
        <cylinderGeometry args={[0.1, 0.1, 2.4, 8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
      </mesh>
      <mesh position={[0.8, 1.2, 1.6]}>
        <cylinderGeometry args={[0.1, 0.1, 2.4, 8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
      </mesh>

      {/* Entrance Canopy */}
      <mesh position={[0, 2.5, 1.4]}>
        <boxGeometry args={[2, 0.1, 0.8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
      </mesh>

      {/* Main Door */}
      <mesh position={[0, 0.6, 1.51]}>
        <boxGeometry args={[1, 1.2, 0.02]} />
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </mesh>

      {/* Door Frame */}
      <mesh position={[0, 0.6, 1.52]}>
        <boxGeometry args={[1.1, 1.3, 0.02]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Windows */}
      {[[-1.3, 0], [1.3, 0], [-1.3, 1.2], [1.3, 1.2]].map(([x, y], i) => (
        <group key={`window-${i}`}>
          {/* Window frame */}
          <mesh position={[x, y + 0.6, 1.51]}>
            <boxGeometry args={[0.6, 0.5, 0.02]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </mesh>
          {/* Window glass */}
          <mesh position={[x, y + 0.6, 1.52]}>
            <boxGeometry args={[0.55, 0.45, 0.01]} />
            <meshStandardMaterial 
              color="#87CEEB"
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      ))}

      {/* Government Emblem */}
      <mesh position={[0, 1.4, 1.52]}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 16]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} />
      </mesh>

      {/* Flag Pole */}
      <mesh position={[2.5, 2.5, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 5, 8]} />
        <meshStandardMaterial color="#708090" roughness={0.6} />
      </mesh>

      {/* Indian Flag */}
      <mesh position={[2.2, 4, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.01]} />
        <meshStandardMaterial color="#FF9933" />
      </mesh>
      <mesh position={[2.2, 3.8, 0.005]}>
        <boxGeometry args={[0.8, 0.2, 0.01]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[2.2, 3.6, 0.01]}>
        <boxGeometry args={[0.8, 0.2, 0.01]} />
        <meshStandardMaterial color="#138808" />
      </mesh>

      {/* Entrance Steps */}
      <mesh position={[0, 0.1, 2]}>
        <boxGeometry args={[3, 0.2, 1]} />
        <meshStandardMaterial color="#D3D3D3" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.2, 2.3]}>
        <boxGeometry args={[3.2, 0.2, 0.6]} />
        <meshStandardMaterial color="#D3D3D3" roughness={0.9} />
      </mesh>

      {/* Notice Board */}
      <mesh position={[-2.2, 1, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 2, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-2.2, 1.8, 0]}>
        <boxGeometry args={[0.02, 0.8, 1.2]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-2.21, 1.8, 0]}>
        <boxGeometry args={[0.02, 0.82, 1.22]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Office Name Board */}
      <mesh position={[0, 2, 1.52]}>
        <boxGeometry args={[2.5, 0.3, 0.02]} />
        <meshStandardMaterial color="#000080" />
      </mesh>

      {/* Office Lighting */}
      {isNight && (
        <>
          <pointLight position={[0, 3, 2]} color="#FFFFFF" intensity={1.2} distance={10} />
          <pointLight position={[2.5, 4.5, 0]} color="#FFD700" intensity={0.8} distance={8} />
        </>
      )}

      {/* Name Label */}
      {showLabel && (
        <Html position={[0, 2.8, 0]} center>
          <div style={{
            color: isNight ? '#FFD700' : '#333',
            fontSize: '10px',
            fontWeight: 'bold',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.9)',
            padding: '2px 6px',
            borderRadius: '4px',
            border: `2px solid ${typeColors[type]}`
          }}>
            🏛️ {name}
          </div>
        </Html>
      )}
    </group>
  );
}