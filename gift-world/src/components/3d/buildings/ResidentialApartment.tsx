import { useRef, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface ResidentialApartmentProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  floors?: number;
  color?: string;
  name?: string;
}

export default function ResidentialApartment({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  floors = 4,
  color = "#F5DEB3",
  name = "Apartment"
}: ResidentialApartmentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLabel(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const floorHeight = 0.8;
  const totalHeight = floors * floorHeight;

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Main Building Structure */}
      <mesh position={[0, totalHeight/2, 0]}>
        <boxGeometry args={[3, totalHeight, 2.5]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>

      {/* Floor Separators */}
      {Array.from({ length: floors - 1 }).map((_, i) => (
        <mesh key={`floor-sep-${i}`} position={[0, (i + 1) * floorHeight, 0]}>
          <boxGeometry args={[3.1, 0.05, 2.6]} />
          <meshStandardMaterial color="#D3D3D3" roughness={0.8} />
        </mesh>
      ))}

      {/* Windows */}
      {Array.from({ length: floors }).map((_, floor) => 
        Array.from({ length: 3 }).map((_, window) => {
          const windowX = -1 + window * 1;
          const windowY = floor * floorHeight + 0.4;
          const isLit = isNight && Math.random() > 0.4;
          
          return (
            <group key={`window-${floor}-${window}`}>
              {/* Window frame */}
              <mesh position={[windowX, windowY, 1.26]}>
                <boxGeometry args={[0.6, 0.5, 0.02]} />
                <meshStandardMaterial color="#8B4513" roughness={0.8} />
              </mesh>
              {/* Window glass */}
              <mesh position={[windowX, windowY, 1.27]}>
                <boxGeometry args={[0.55, 0.45, 0.01]} />
                <meshStandardMaterial 
                  color={isLit ? "#FFFF99" : "#87CEEB"}
                  transparent
                  opacity={0.7}
                  emissive={isLit ? "#FFFF99" : "#000000"}
                  emissiveIntensity={isLit ? 0.4 : 0}
                />
              </mesh>
              {/* Window divider */}
              <mesh position={[windowX, windowY, 1.28]}>
                <boxGeometry args={[0.02, 0.45, 0.01]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              <mesh position={[windowX, windowY, 1.28]}>
                <boxGeometry args={[0.55, 0.02, 0.01]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              
              {/* Small balcony for upper floors */}
              {floor > 0 && window === 1 && (
                <>
                  <mesh position={[windowX, windowY - 0.3, 1.5]}>
                    <boxGeometry args={[0.8, 0.05, 0.6]} />
                    <meshStandardMaterial color="#D3D3D3" roughness={0.8} />
                  </mesh>
                  <mesh position={[windowX - 0.35, windowY + 0.1, 1.7]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.8, 6]} />
                    <meshStandardMaterial color="#708090" />
                  </mesh>
                  <mesh position={[windowX + 0.35, windowY + 0.1, 1.7]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.8, 6]} />
                    <meshStandardMaterial color="#708090" />
                  </mesh>
                </>
              )}
              
              {/* Interior lighting */}
              {isLit && (
                <pointLight 
                  position={[windowX, windowY, 1.0]} 
                  color="#FFFF99" 
                  intensity={0.3} 
                  distance={2} 
                />
              )}
            </group>
          );
        })
      )}

      {/* Entrance Door */}
      <mesh position={[0, 0.5, 1.26]}>
        <boxGeometry args={[0.7, 1, 0.02]} />
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </mesh>
      <mesh position={[0.15, 0.7, 1.27]}>
        <cylinderGeometry args={[0.03, 0.03, 0.01, 8]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} />
      </mesh>

      {/* Entrance Steps */}
      <mesh position={[0, 0.05, 1.5]}>
        <boxGeometry args={[1.2, 0.1, 0.4]} />
        <meshStandardMaterial color="#D3D3D3" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.1, 1.7]}>
        <boxGeometry args={[1.4, 0.1, 0.3]} />
        <meshStandardMaterial color="#D3D3D3" roughness={0.9} />
      </mesh>

      {/* Rooftop Features */}
      <mesh position={[0, totalHeight + 0.1, 0]}>
        <boxGeometry args={[3.2, 0.2, 2.7]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Water Tank */}
      <mesh position={[-1, totalHeight + 0.5, -0.5]}>
        <cylinderGeometry args={[0.4, 0.4, 0.8, 8]} />
        <meshStandardMaterial color="#4682B4" roughness={0.6} />
      </mesh>

      {/* Satellite Dish */}
      <mesh position={[1, totalHeight + 0.3, 0.5]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 6]} />
        <meshStandardMaterial color="#708090" />
      </mesh>
      <mesh position={[1, totalHeight + 0.6, 0.5]} rotation={[Math.PI / 6, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>

      {/* Building Name Plate */}
      <mesh position={[0, 0.3, 1.3]}>
        <boxGeometry args={[1.5, 0.3, 0.02]} />
        <meshStandardMaterial color="#000080" />
      </mesh>

      {/* Compound Wall */}
      <mesh position={[0, 0.4, 2.5]}>
        <boxGeometry args={[4, 0.8, 0.2]} />
        <meshStandardMaterial color="#CD853F" roughness={0.8} />
      </mesh>
      <mesh position={[-2, 0.4, 1]}>
        <boxGeometry args={[0.2, 0.8, 3]} />
        <meshStandardMaterial color="#CD853F" roughness={0.8} />
      </mesh>
      <mesh position={[2, 0.4, 1]}>
        <boxGeometry args={[0.2, 0.8, 3]} />
        <meshStandardMaterial color="#CD853F" roughness={0.8} />
      </mesh>

      {/* Gate */}
      <mesh position={[0, 0.4, 2.4]}>
        <boxGeometry args={[1.5, 0.8, 0.05]} />
        <meshStandardMaterial color="#4169E1" roughness={0.7} />
      </mesh>

      {/* Name Label */}
      {showLabel && (
        <Html position={[0, totalHeight + 1, 0]} center>
          <div style={{
            color: isNight ? '#FFD700' : '#333',
            fontSize: '10px',
            fontWeight: 'bold',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.8)',
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            🏢 {name}
          </div>
        </Html>
      )}
    </group>
  );
}