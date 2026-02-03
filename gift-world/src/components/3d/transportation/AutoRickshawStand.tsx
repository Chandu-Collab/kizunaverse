import { useRef, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface AutoRickshawStandProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  autoCount?: number;
}

export default function AutoRickshawStand({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  autoCount = 3
}: AutoRickshawStandProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLabel(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rickshaw component
  const AutoRickshaw = ({ pos, rot, color }: { pos: [number, number, number], rot: number, color: string }) => (
    <group position={pos} rotation={[0, rot, 0]}>
      {/* Main Body */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.2, 0.6, 1.8]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.3, 0.1, 1.9]} />
        <meshStandardMaterial color="#2F2F2F" roughness={0.8} />
      </mesh>

      {/* Front Windshield */}
      <mesh position={[0, 0.5, 0.85]}>
        <boxGeometry args={[1.1, 0.4, 0.02]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>

      {/* Side Windows */}
      <mesh position={[0.6, 0.5, 0.2]}>
        <boxGeometry args={[0.02, 0.4, 1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>
      <mesh position={[-0.6, 0.5, 0.2]}>
        <boxGeometry args={[0.02, 0.4, 1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>

      {/* Driver Seat */}
      <mesh position={[0, 0.15, 0.4]}>
        <boxGeometry args={[0.4, 0.3, 0.3]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>

      {/* Passenger Seat */}
      <mesh position={[0, 0.15, -0.2]}>
        <boxGeometry args={[1, 0.3, 0.6]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>

      {/* Wheels */}
      <mesh position={[0.5, 0.1, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 12]} />
        <meshStandardMaterial color="#2F2F2F" roughness={0.9} />
      </mesh>
      <mesh position={[-0.5, 0.1, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 12]} />
        <meshStandardMaterial color="#2F2F2F" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.1, -0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 12]} />
        <meshStandardMaterial color="#2F2F2F" roughness={0.9} />
      </mesh>

      {/* Handlebar */}
      <mesh position={[0, 0.4, 0.8]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#708090" />
      </mesh>

      {/* Headlight */}
      <mesh position={[0, 0.3, 0.91]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial 
          color="#FFFF99"
          emissive={isNight ? "#FFFF99" : "#000000"}
          emissiveIntensity={isNight ? 0.5 : 0}
        />
      </mesh>

      {/* License Plate */}
      <mesh position={[0, 0.1, 0.91]}>
        <boxGeometry args={[0.3, 0.08, 0.01]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Auto Number Display */}
      <Html position={[0, 0.1, 0.92]} center>
        <div style={{
          fontSize: '4px',
          fontWeight: 'bold',
          color: '#000',
          background: '#FFFFFF',
          padding: '1px 2px',
          borderRadius: '2px',
          border: '1px solid #000'
        }}>
          KA {Math.floor(Math.random() * 99) + 1} {Math.floor(Math.random() * 9999) + 1000}
        </div>
      </Html>
    </group>
  );

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Stand Base/Platform */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[8, 4, 0.04]} />
        <meshStandardMaterial color="#708090" roughness={0.9} />
      </mesh>

      {/* Parking Lines */}
      {Array.from({ length: autoCount + 1 }).map((_, i) => (
        <mesh key={`parking-line-${i}`} position={[-3 + i * 2, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.08, 4, 0.01]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      ))}

      {/* Waiting Shed */}
      <group position={[0, 0, -2.5]}>
        {/* Shed Roof */}
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[6, 0.15, 2]} />
          <meshStandardMaterial color="#FF6B6B" roughness={0.7} />
        </mesh>

        {/* Support Pillars */}
        <mesh position={[-2.5, 1.2, -0.8]}>
          <cylinderGeometry args={[0.06, 0.06, 2.4, 8]} />
          <meshStandardMaterial color="#708090" />
        </mesh>
        <mesh position={[2.5, 1.2, -0.8]}>
          <cylinderGeometry args={[0.06, 0.06, 2.4, 8]} />
          <meshStandardMaterial color="#708090" />
        </mesh>
        <mesh position={[-2.5, 1.2, 0.8]}>
          <cylinderGeometry args={[0.06, 0.06, 2.4, 8]} />
          <meshStandardMaterial color="#708090" />
        </mesh>
        <mesh position={[2.5, 1.2, 0.8]}>
          <cylinderGeometry args={[0.06, 0.06, 2.4, 8]} />
          <meshStandardMaterial color="#708090" />
        </mesh>

        {/* Bench for Waiting */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[4, 0.08, 0.4]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.7, -0.15]}>
          <boxGeometry args={[4, 0.6, 0.08]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>

        {/* Shed Lighting */}
        {isNight && (
          <pointLight position={[0, 2.5, 0]} color="#FFFFFF" intensity={0.8} distance={8} />
        )}
      </group>

      {/* Auto-rickshaws parked */}
      {Array.from({ length: autoCount }).map((_, i) => {
        const colors = ["#FFD700", "#FF6B6B", "#32CD32", "#FF1493", "#00BFFF"];
        const xPos = -2 + i * 2;
        return (
          <AutoRickshaw 
            key={`auto-${i}`}
            pos={[xPos, 0, 0.5]} 
            rot={Math.PI} 
            color={colors[i % colors.length]} 
          />
        );
      })}

      {/* Stand Sign Post */}
      <mesh position={[4, 1.5, -1]}>
        <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Stand Sign Board */}
      <mesh position={[4, 2.8, -1]}>
        <boxGeometry args={[0.02, 0.8, 1.2]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[4.01, 2.8, -1]}>
        <boxGeometry args={[0.02, 0.82, 1.22]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>

      {/* Fare Chart Display */}
      <mesh position={[-4, 1.2, -1]}>
        <boxGeometry args={[0.02, 1.5, 1]} />
        <meshStandardMaterial color="#FFFF99" />
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
            border: '2px solid #FFD700'
          }}>
            🛽 Auto-rickshaw Stand<br/>
            <span style={{ fontSize: '8px', opacity: 0.8 }}>{autoCount} Autos Available</span>
          </div>
        </Html>
      )}

      {/* Driver waiting area */}
      <group position={[-3, 0, -4]}>
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.5, 12]} />
          <meshStandardMaterial color="#90EE90" roughness={0.9} />
        </mesh>
        
        {/* Small tea stall for drivers */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.6, 8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.1, 8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>
    </group>
  );
}