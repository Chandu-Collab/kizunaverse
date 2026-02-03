import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface BusStopProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  name?: string;
}

export default function BusStop({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  name = "Bus Stop"
}: BusStopProps) {
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
      {/* Bus Stop Shelter Base */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#D3D3D3" roughness={0.8} />
      </mesh>

      {/* Shelter Pillars */}
      <mesh position={[-1.8, 1.2, -0.8]}>
        <cylinderGeometry args={[0.08, 0.08, 2.4, 8]} />
        <meshStandardMaterial color="#708090" roughness={0.6} />
      </mesh>
      <mesh position={[1.8, 1.2, -0.8]}>
        <cylinderGeometry args={[0.08, 0.08, 2.4, 8]} />
        <meshStandardMaterial color="#708090" roughness={0.6} />
      </mesh>

      {/* Shelter Roof */}
      <mesh position={[0, 2.5, -0.4]}>
        <boxGeometry args={[4.2, 0.15, 1.2]} />
        <meshStandardMaterial color="#4169E1" roughness={0.7} />
      </mesh>

      {/* Back Panel */}
      <mesh position={[0, 1.2, -0.9]}>
        <boxGeometry args={[3.8, 2, 0.1]} />
        <meshStandardMaterial color="#F0F8FF" roughness={0.5} />
      </mesh>

      {/* Bench */}
      <group position={[0, 0.4, 0]}>
        {/* Bench seat */}
        <mesh position={[0, 0, -0.5]}>
          <boxGeometry args={[3, 0.08, 0.4]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        {/* Bench back */}
        <mesh position={[0, 0.3, -0.7]}>
          <boxGeometry args={[3, 0.6, 0.08]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        {/* Bench legs */}
        {[-1.2, 0, 1.2].map((x, i) => (
          <group key={`bench-leg-${i}`}>
            <mesh position={[x, -0.2, -0.5]}>
              <cylinderGeometry args={[0.04, 0.04, 0.4, 6]} />
              <meshStandardMaterial color="#708090" />
            </mesh>
            <mesh position={[x, -0.15, -0.7]}>
              <cylinderGeometry args={[0.04, 0.04, 0.3, 6]} />
              <meshStandardMaterial color="#708090" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Bus Route Sign */}
      <mesh position={[0, 2, -0.85]}>
        <boxGeometry args={[1.5, 0.6, 0.05]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive={isNight ? "#FFD700" : "#000000"}
          emissiveIntensity={isNight ? 0.3 : 0}
        />
      </mesh>

      {/* Side Panels */}
      <mesh position={[-1.9, 1.2, -0.2]}>
        <boxGeometry args={[0.1, 2, 1]} />
        <meshStandardMaterial color="#F0F8FF" roughness={0.5} />
      </mesh>
      <mesh position={[1.9, 1.2, -0.2]}>
        <boxGeometry args={[0.1, 2, 1]} />
        <meshStandardMaterial color="#F0F8FF" roughness={0.5} />
      </mesh>

      {/* Dustbin */}
      <mesh position={[2.5, 0.3, 0.5]}>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 8]} />
        <meshStandardMaterial color="#228B22" roughness={0.8} />
      </mesh>
      <mesh position={[2.5, 0.65, 0.5]}>
        <cylinderGeometry args={[0.16, 0.16, 0.05, 8]} />
        <meshStandardMaterial color="#006400" roughness={0.8} />
      </mesh>

      {/* Bus Stop Sign Post */}
      <mesh position={[-2.5, 1.5, 0.5]}>
        <cylinderGeometry args={[0.06, 0.06, 3, 8]} />
        <meshStandardMaterial color="#FF6B6B" roughness={0.6} />
      </mesh>
      <mesh position={[-2.5, 2.8, 0.5]}>
        <boxGeometry args={[0.8, 0.4, 0.05]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Lighting */}
      {isNight && (
        <>
          <pointLight position={[0, 2.8, 0]} color="#FFFFFF" intensity={0.8} distance={8} />
          <mesh position={[0, 2.7, -0.3]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial 
              color="#FFFFFF" 
              emissive="#FFFFFF" 
              emissiveIntensity={1}
              transparent
              opacity={0.8}
            />
          </mesh>
        </>
      )}

      {/* Waiting People */}
      <mesh position={[-0.8, 0.8, -0.3]}>
        <cylinderGeometry args={[0.15, 0.1, 1.6, 8]} />
        <meshStandardMaterial color="#4169E1" roughness={0.7} />
      </mesh>
      <mesh position={[-0.8, 1.7, -0.3]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#FDBCB4" roughness={0.6} />
      </mesh>

      <mesh position={[0.8, 0.8, -0.3]}>
        <cylinderGeometry args={[0.15, 0.1, 1.6, 8]} />
        <meshStandardMaterial color="#DC143C" roughness={0.7} />
      </mesh>
      <mesh position={[0.8, 1.7, -0.3]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#FDBCB4" roughness={0.6} />
      </mesh>

      {/* Name Label */}
      {showLabel && (
        <Html position={[0, 3.2, 0]} center>
          <div style={{
            color: isNight ? '#FFD700' : '#333',
            fontSize: '10px',
            fontWeight: 'bold',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.8)',
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            🚌 {name}
          </div>
        </Html>
      )}
    </group>
  );
}