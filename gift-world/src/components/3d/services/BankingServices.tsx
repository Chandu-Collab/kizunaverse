import { useRef, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface BankingServicesProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  type?: 'atm' | 'bank' | 'cooperative';
  name?: string;
}

export default function BankingServices({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  type = 'atm',
  name = "ATM"
}: BankingServicesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLabel(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (type === 'atm') {
    return (
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        {/* ATM Booth Structure */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[1.5, 2.4, 1.2]} />
          <meshStandardMaterial color="#4682B4" roughness={0.6} />
        </mesh>

        {/* ATM Door */}
        <mesh position={[0, 0.8, 0.61]}>
          <boxGeometry args={[0.8, 1.6, 0.02]} />
          <meshStandardMaterial color="#2F4F4F" roughness={0.7} />
        </mesh>

        {/* Door Handle */}
        <mesh position={[0.3, 0.8, 0.62]}>
          <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} />
        </mesh>

        {/* ATM Machine */}
        <mesh position={[0, 1.2, -0.58]}>
          <boxGeometry args={[0.6, 1.8, 0.04]} />
          <meshStandardMaterial color="#2F2F2F" roughness={0.5} />
        </mesh>

        {/* ATM Screen */}
        <mesh position={[0, 1.4, -0.56]}>
          <boxGeometry args={[0.35, 0.25, 0.02]} />
          <meshStandardMaterial 
            color="#000080"
            emissive={isNight ? "#000080" : "#000000"}
            emissiveIntensity={isNight ? 0.5 : 0}
          />
        </mesh>

        {/* ATM Keypad */}
        <mesh position={[0, 1, -0.56]}>
          <boxGeometry args={[0.2, 0.15, 0.02]} />
          <meshStandardMaterial color="#708090" />
        </mesh>

        {/* Cash Dispenser */}
        <mesh position={[0, 0.8, -0.56]}>
          <boxGeometry args={[0.25, 0.05, 0.02]} />
          <meshStandardMaterial color="#2F2F2F" />
        </mesh>

        {/* ATM Canopy */}
        <mesh position={[0, 2.6, 0.3]}>
          <boxGeometry args={[1.8, 0.1, 1.8]} />
          <meshStandardMaterial color="#FF6B6B" roughness={0.7} />
        </mesh>

        {/* Support Pillars */}
        <mesh position={[-0.8, 1.4, 0.8]}>
          <cylinderGeometry args={[0.04, 0.04, 2.8, 8]} />
          <meshStandardMaterial color="#708090" />
        </mesh>
        <mesh position={[0.8, 1.4, 0.8]}>
          <cylinderGeometry args={[0.04, 0.04, 2.8, 8]} />
          <meshStandardMaterial color="#708090" />
        </mesh>

        {/* ATM Sign */}
        <mesh position={[0, 2.8, 0.61]}>
          <boxGeometry args={[1, 0.3, 0.02]} />
          <meshStandardMaterial 
            color="#FF0000"
            emissive={isNight ? "#FF0000" : "#000000"}
            emissiveIntensity={isNight ? 0.3 : 0}
          />
        </mesh>

        {/* Security Camera */}
        <mesh position={[0.5, 2.2, 0.5]}>
          <cylinderGeometry args={[0.03, 0.04, 0.08, 8]} />
          <meshStandardMaterial color="#2F2F2F" />
        </mesh>

        {/* ATM Lighting */}
        {isNight && (
          <pointLight position={[0, 2.5, 0]} color="#FFFFFF" intensity={1} distance={6} />
        )}

        {/* Name Label */}
        {showLabel && (
          <Html position={[0, 3.2, 0]} center>
            <div style={{
              color: isNight ? '#FFD700' : '#333',
              fontSize: '9px',
              fontWeight: 'bold',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.9)',
              padding: '2px 6px',
              borderRadius: '4px',
              border: '2px solid #4682B4'
            }}>
              🏧 {name}
            </div>
          </Html>
        )}
      </group>
    );
  }

  if (type === 'bank') {
    return (
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        {/* Bank Building */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[4, 2, 3]} />
          <meshStandardMaterial color="#F5DEB3" roughness={0.7} />
        </mesh>

        {/* Bank Entrance */}
        <mesh position={[0, 0.6, 1.51]}>
          <boxGeometry args={[1.5, 1.2, 0.02]} />
          <meshStandardMaterial color="#654321" roughness={0.9} />
        </mesh>

        {/* Bank Sign */}
        <mesh position={[0, 1.8, 1.51]}>
          <boxGeometry args={[3, 0.4, 0.02]} />
          <meshStandardMaterial color="#000080" />
        </mesh>

        {/* Security Features */}
        <mesh position={[1.8, 1.5, 1.4]}>
          <cylinderGeometry args={[0.04, 0.04, 0.1, 8]} />
          <meshStandardMaterial color="#2F2F2F" />
        </mesh>

        {/* Bank Windows with Grills */}
        {[[-1.2, 0.8], [1.2, 0.8]].map(([x, y], i) => (
          <group key={`bank-window-${i}`}>
            <mesh position={[x, y, 1.51]}>
              <boxGeometry args={[0.8, 0.6, 0.02]} />
              <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
            </mesh>
            {/* Security grill */}
            {Array.from({ length: 5 }).map((_, j) => (
              <mesh key={`grill-${j}`} position={[x - 0.3 + j * 0.15, y, 1.52]}>
                <cylinderGeometry args={[0.005, 0.005, 0.6, 6]} />
                <meshStandardMaterial color="#2F2F2F" />
              </mesh>
            ))}
          </group>
        ))}

        {/* Name Label */}
        {showLabel && (
          <Html position={[0, 2.5, 0]} center>
            <div style={{
              color: isNight ? '#FFD700' : '#333',
              fontSize: '10px',
              fontWeight: 'bold',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.9)',
              padding: '2px 6px',
              borderRadius: '4px',
              border: '2px solid #F5DEB3'
            }}>
              🏦 {name}
            </div>
          </Html>
        )}
      </group>
    );
  }

  // Cooperative Bank
  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Cooperative Building */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[3, 1.6, 2.5]} />
        <meshStandardMaterial color="#90EE90" roughness={0.7} />
      </mesh>

      {/* Entrance */}
      <mesh position={[0, 0.5, 1.26]}>
        <boxGeometry args={[1, 1, 0.02]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Cooperative Sign */}
      <mesh position={[0, 1.4, 1.26]}>
        <boxGeometry args={[2.5, 0.3, 0.02]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      {/* Name Label */}
      {showLabel && (
        <Html position={[0, 2, 0]} center>
          <div style={{
            color: isNight ? '#FFD700' : '#333',
            fontSize: '9px',
            fontWeight: 'bold',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.9)',
            padding: '2px 5px',
            borderRadius: '4px',
            border: '2px solid #90EE90'
          }}>
            🏛️ {name}
          </div>
        </Html>
      )}
    </group>
  );
}