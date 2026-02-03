import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

// Vidhana Soudha (Government Building)
export function VidhanaSoudha({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const buildingRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (buildingRef.current) {
      buildingRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.005;
    }
  });

  return (
    <group ref={buildingRef} position={position}>
      {/* Main building */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[3, 3, 2]} />
        <meshStandardMaterial color="#D4B896" roughness={0.7} />
      </mesh>
      
      {/* Central dome */}
      <mesh position={[0, 3.2, 0]}>
        <sphereGeometry args={[0.8, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} />
      </mesh>
      
      {/* Side wings */}
      <mesh position={[-2, 1, 0]}>
        <boxGeometry args={[1, 2, 1.5]} />
        <meshStandardMaterial color="#D4B896" roughness={0.7} />
      </mesh>
      <mesh position={[2, 1, 0]}>
        <boxGeometry args={[1, 2, 1.5]} />
        <meshStandardMaterial color="#D4B896" roughness={0.7} />
      </mesh>
      
      {/* Pillars */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[-1.5 + i * 0.6, 0.8, 1.1]}>
          <cylinderGeometry args={[0.08, 0.08, 1.6, 8]} />
          <meshStandardMaterial color="#F5E6D3" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// UB City Mall & Tower
export function UBCity({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const { isNight } = useTheme();
  
  return (
    <group position={position}>
      {/* Main tower */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[1, 5, 1]} />
        <meshStandardMaterial color="#2C3E50" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Glass sections with night lighting */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[0, 0.5 + i * 0.4, 0.51]}>
          <boxGeometry args={[0.9, 0.3, 0.02]} />
          <meshStandardMaterial 
            color={isNight ? "#FFD700" : "#87CEEB"} 
            transparent 
            opacity={isNight ? 0.8 : 0.3}
            emissive={isNight ? "#FFD700" : "#000000"}
            emissiveIntensity={isNight ? 0.3 : 0}
          />
        </mesh>
      ))}
      
      {/* Mall base */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2, 0.6, 1.5]} />
        <meshStandardMaterial color="#34495E" roughness={0.6} />
      </mesh>
    </group>
  );
}

// Bangalore Palace
export function BangalorePalace({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main palace structure */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2.5, 2, 2]} />
        <meshStandardMaterial color="#F4A460" roughness={0.7} />
      </mesh>
      
      {/* Tudor-style roof */}
      <mesh position={[0, 2.2, 0]}>
        <coneGeometry args={[1.8, 0.8, 4]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      
      {/* Towers */}
      {[-1.2, 1.2].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 1.5, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 3, 8]} />
            <meshStandardMaterial color="#DEB887" roughness={0.7} />
          </mesh>
          <mesh position={[x, 3.2, 0]}>
            <coneGeometry args={[0.4, 0.6, 8]} />
            <meshStandardMaterial color="#A0522D" roughness={0.8} />
          </mesh>
        </group>
      ))}
      
      {/* Windows */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[-0.75 + i * 0.5, 1.2, 1.01]}>
          <boxGeometry args={[0.3, 0.5, 0.02]} />
          <meshStandardMaterial color="#4682B4" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// ISKCON Temple
export function ISKCONTemple({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const templeRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (templeRef.current) {
      // Gentle swaying animation
      templeRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.01;
    }
  });

  return (
    <group ref={templeRef} position={position}>
      {/* Main temple structure */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[2, 2.4, 2]} />
        <meshStandardMaterial color="#FFE4B5" roughness={0.6} />
      </mesh>
      
      {/* Central dome */}
      <mesh position={[0, 2.8, 0]}>
        <sphereGeometry args={[0.8, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#DAA520" metalness={0.4} roughness={0.3} />
      </mesh>
      
      {/* Spire */}
      <mesh position={[0, 3.8, 0]}>
        <coneGeometry args={[0.3, 1, 8]} />
        <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Side domes */}
      {[-1, 1].map((x, i) => (
        <mesh key={i} position={[x, 2.2, 0]}>
          <sphereGeometry args={[0.4, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#DAA520" metalness={0.4} roughness={0.3} />
        </mesh>
      ))}
      
      {/* Pillars */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 1.2, 0.8, Math.sin(angle) * 1.2]}>
            <cylinderGeometry args={[0.08, 0.1, 1.6, 8]} />
            <meshStandardMaterial color="#F5DEB3" roughness={0.8} />
          </mesh>
        );
      })}
    </group>
  );
}

// Tech Park / IT Building
export function TechPark({ position = [0, 0, 0] }: { 
  position?: [number, number, number]; 
}) {
  const { isNight } = useTheme();
  
  return (
    <group position={position}>
      {/* Main building */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[2, 4, 1.5]} />
        <meshStandardMaterial color="#2C3E50" metalness={0.2} roughness={0.8} />
      </mesh>
      
      {/* Glass facade with office lighting */}
      {Array.from({ length: 8 }).map((_, floor) => 
        Array.from({ length: 4 }).map((_, window) => (
          <mesh 
            key={`${floor}-${window}`} 
            position={[-0.6 + window * 0.4, 0.5 + floor * 0.4, 0.76]}
          >
            <boxGeometry args={[0.3, 0.3, 0.02]} />
            <meshStandardMaterial 
              color={isNight && (floor + window) % 3 !== 0 ? "#FFD700" : "#87CEEB"} 
              transparent 
              opacity={0.7}
              emissive={isNight && (floor + window) % 3 !== 0 ? "#FFD700" : "#000000"}
              emissiveIntensity={isNight ? 0.4 : 0}
            />
          </mesh>
        ))
      )}
      
      {/* Company sign */}
      <mesh position={[0, 4.2, 0.8]}>
        <boxGeometry args={[1.5, 0.3, 0.1]} />
        <meshStandardMaterial 
          color="#1E3A8A" 
          emissive={isNight ? "#1E3A8A" : "#000000"}
          emissiveIntensity={isNight ? 0.3 : 0}
        />
      </mesh>
    </group>
  );
}

// Auto Rickshaw (Iconic Bangalore transport)
export function AutoRickshaw({ position = [0, 0, 0], rotation = 0 }: { 
  position?: [number, number, number]; 
  rotation?: number;
}) {
  const autoRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (autoRef.current) {
      // Slight bouncing effect
      autoRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.005;
    }
  });

  return (
    <group ref={autoRef} position={position} rotation={[0, rotation, 0]}>
      {/* Main body */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.2, 0.6, 0.8]} />
        <meshStandardMaterial color="#FFD700" roughness={0.6} />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[1.3, 0.05, 0.9]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.8} />
      </mesh>
      
      {/* Wheels */}
      {[[-0.4, 0.1, 0.5] as const, [-0.4, 0.1, -0.5] as const, [0.4, 0.1, 0] as const].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 8]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.9} />
        </mesh>
      ))}
      
      {/* Front windscreen */}
      <mesh position={[0.61, 0.4, 0]}>
        <boxGeometry args={[0.02, 0.4, 0.6]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

// Traffic Signal (Very Bangalore!)
export function TrafficSignal({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const lightRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (lightRef.current) {
      const time = clock.getElapsedTime();
      const cycle = Math.floor(time / 3) % 3;
      const colors = ["#FF0000", "#FFD700", "#00FF00"];
      (lightRef.current.material as THREE.MeshStandardMaterial).color.setHex(colors[cycle] as any);
      (lightRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(colors[cycle] as any);
      (lightRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
        <meshStandardMaterial color="#666666" roughness={0.8} />
      </mesh>
      
      {/* Signal box */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.15]} />
        <meshStandardMaterial color="#333333" roughness={0.7} />
      </mesh>
      
      {/* Active light */}
      <mesh ref={lightRef} position={[0, 2.2, 0.08]}>
        <circleGeometry args={[0.06, 8]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// BMS College (Bangalore Medical College)
export function BMSCollege({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const { isNight } = useTheme();
  const collegeRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (collegeRef.current) {
      collegeRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.05) * 0.002;
    }
  });

  return (
    <group ref={collegeRef} position={position}>
      {/* Main college building */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[3, 2.4, 2]} />
        <meshStandardMaterial color="#CD853F" roughness={0.7} />
      </mesh>
      
      {/* College entrance gate */}
      <mesh position={[0, 0.8, 1.2]}>
        <boxGeometry args={[1.5, 1.6, 0.2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      
      {/* BMS College sign */}
      <mesh position={[0, 2.5, 1.1]}>
        <boxGeometry args={[2.5, 0.4, 0.1]} />
        <meshStandardMaterial 
          color="#1E3A8A" 
          emissive={isNight ? "#1E3A8A" : "#000000"}
          emissiveIntensity={isNight ? 0.3 : 0}
        />
      </mesh>
      
      {/* College wings */}
      <mesh position={[-2.5, 1, 0]}>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshStandardMaterial color="#DEB887" roughness={0.7} />
      </mesh>
      <mesh position={[2.5, 1, 0]}>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshStandardMaterial color="#DEB887" roughness={0.7} />
      </mesh>
      
      {/* Medical cross symbol */}
      <mesh position={[0, 1.8, 1.1]}>
        <boxGeometry args={[0.3, 0.8, 0.05]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 1.8, 1.1]}>
        <boxGeometry args={[0.8, 0.3, 0.05]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.2} />
      </mesh>
      
      {/* College courtyard */}
      <mesh position={[0, 0.05, -1]}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#90EE90" roughness={0.9} />
      </mesh>
      
      {/* Small trees around college */}
      {[-2, -1, 1, 2].map((x, i) => (
        <group key={i} position={[x, 0, -1.8]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial color="#228B22" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Rajajinagar Area
export function Rajajinagar({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const { isNight } = useTheme();
  
  return (
    <group position={position}>
      {/* Residential buildings */}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = (i % 3) * 1.5 - 1.5;
        const z = Math.floor(i / 3) * 1.2 - 0.6;
        const height = 0.8 + ((i * 37) % 60) / 100; // Deterministic height variation
        const colors = ["#F0E68C", "#DDA0DD", "#98FB98", "#F4A460", "#87CEEB", "#FFB6C1"];
        
        return (
          <group key={i} position={[x, 0, z]}>
            <mesh position={[0, height / 2, 0]}>
              <boxGeometry args={[1, height, 0.8]} />
              <meshStandardMaterial color={colors[i]} roughness={0.7} />
            </mesh>
            
            {/* Windows */}
            {Array.from({ length: 2 }).map((_, floor) => 
              Array.from({ length: 2 }).map((_, window) => (
                <mesh 
                  key={`${floor}-${window}`} 
                  position={[-0.3 + window * 0.6, 0.2 + floor * 0.3, 0.41]}
                >
                  <boxGeometry args={[0.2, 0.2, 0.02]} />
                  <meshStandardMaterial 
                    color={isNight && (i + floor + window) % 5 !== 0 ? "#FFD700" : "#87CEEB"} 
                    transparent 
                    opacity={0.8}
                    emissive={isNight && (i + floor + window) % 5 !== 0 ? "#FFD700" : "#000000"}
                    emissiveIntensity={isNight ? 0.3 : 0}
                  />
                </mesh>
              ))
            )}
            
            {/* Small balconies */}
            <mesh position={[0, height * 0.7, 0.5]}>
              <boxGeometry args={[0.8, 0.05, 0.3]} />
              <meshStandardMaterial color="#696969" roughness={0.8} />
            </mesh>
          </group>
        );
      })}
      
      {/* Rajajinagar area sign */}
      <mesh position={[0, 2, -2]}>
        <boxGeometry args={[3, 0.4, 0.1]} />
        <meshStandardMaterial 
          color="#2E8B57" 
          emissive={isNight ? "#2E8B57" : "#000000"}
          emissiveIntensity={isNight ? 0.2 : 0}
        />
      </mesh>
      
      {/* Small park/garden area */}
      <mesh position={[0, 0.02, 1.5]}>
        <circleGeometry args={[1.2, 16]} />
        <meshStandardMaterial color="#90EE90" roughness={0.9} />
      </mesh>
      
      {/* Central fountain */}
      <mesh position={[0, 0.3, 1.5]}>
        <cylinderGeometry args={[0.3, 0.3, 0.6, 8]} />
        <meshStandardMaterial color="#4682B4" roughness={0.5} />
      </mesh>
      
      {/* Street lamps */}
      {isNight && [-1.5, 1.5].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 2, 8]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
          <pointLight position={[0, 2, 0]} intensity={0.3} color="#FFE55C" distance={3} />
          <mesh position={[0, 2, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial 
              color="#FFE55C" 
              emissive="#FFE55C" 
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// BMTC City Bus
export function BMTCBus({ 
  position = [0, 0, 0], 
  rotationY = 0, 
  scale = 1 
}: { 
  position?: [number, number, number]; 
  rotationY?: number; 
  scale?: number; 
}) {
  const { isNight } = useTheme();
  
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Main bus body */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[3.5, 1.2, 1.8]} />
        <meshStandardMaterial color="#FF6B35" roughness={0.6} />  {/* BMTC Orange */}
      </mesh>
      
      {/* Bus roof */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[3.6, 0.2, 1.9]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
      </mesh>
      
      {/* Windows */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[1 - i * 0.8, 0.8, 0.91]}>
          <boxGeometry args={[0.6, 0.4, 0.02]} />
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
        </mesh>
      ))}
      
      {/* Wheels */}
      {[[-1.3, 0, -0.8], [1.3, 0, -0.8], [-1.3, 0, 0.8], [1.3, 0, 0.8]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
          <meshStandardMaterial color="#2C3E50" roughness={0.9} />
        </mesh>
      ))}
      
      {/* BMTC Text */}
      <mesh position={[0, 0.8, 0.92]}>
        <boxGeometry args={[2, 0.3, 0.01]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Front and rear lights */}
      <mesh position={[1.8, 0.4, 0]}>
        <boxGeometry args={[0.1, 0.2, 0.4]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive={isNight ? "#FFD700" : "#000000"} 
          emissiveIntensity={isNight ? 0.3 : 0} 
        />
      </mesh>
      <mesh position={[-1.8, 0.6, 0]}>
        <boxGeometry args={[0.1, 0.3, 0.6]} />
        <meshStandardMaterial 
          color="#FF0000" 
          emissive={isNight ? "#FF0000" : "#000000"} 
          emissiveIntensity={isNight ? 0.2 : 0} 
        />
      </mesh>
    </group>
  );
}

// Street Food Vendor Stall
export function StreetFoodStall({ 
  position = [0, 0, 0], 
  type = 'dosa',
  scale = 1 
}: { 
  position?: [number, number, number]; 
  type?: 'dosa' | 'chaat' | 'coffee' | 'juice';
  scale?: number; 
}) {
  const { isNight } = useTheme();
  
  const getStallColor = () => {
    switch (type) {
      case 'dosa': return '#FF6B35';
      case 'chaat': return '#4ECDC4';
      case 'coffee': return '#8B4513';
      case 'juice': return '#32CD32';
      default: return '#FF6B35';
    }
  };
  
  return (
    <group position={position} scale={scale}>
      {/* Main cart/stall */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 1.2]} />
        <meshStandardMaterial color={getStallColor()} roughness={0.7} />
      </mesh>
      
      {/* Counter */}
      <mesh position={[0, 1.05, 0.6]}>
        <boxGeometry args={[2.2, 0.1, 0.8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      
      {/* Canopy */}
      <mesh position={[0, 1.8, 0]} rotation={[Math.PI / 12, 0, 0]}>
        <boxGeometry args={[2.5, 0.05, 1.8]} />
        <meshStandardMaterial color="#FF6B6B" roughness={0.8} />
      </mesh>
      
      {/* Support poles */}
      {[[-0.9, 0, -0.7], [0.9, 0, -0.7], [-0.9, 0, 0.7], [0.9, 0, 0.7]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.03, 0.03, 1.6, 8]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
      ))}
      
      {/* Cooking equipment based on type */}
      {type === 'dosa' && (
        <>
          <mesh position={[-0.5, 1.1, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
            <meshStandardMaterial color="#2C3E50" metalness={0.8} />
          </mesh>
          <mesh position={[0.5, 1.1, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
            <meshStandardMaterial color="#2C3E50" metalness={0.8} />
          </mesh>
        </>
      )}
      
      {type === 'coffee' && (
        <mesh position={[0, 1.15, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.3, 8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      )}
      
      {/* Wheels */}
      {[[-0.8, 0.2, -0.6], [0.8, 0.2, -0.6]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 8]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
      ))}
      
      {/* Vendor lighting */}
      {isNight && (
        <pointLight 
          position={[0, 2, 0]} 
          intensity={0.4} 
          color="#FFE4B5" 
          distance={4} 
        />
      )}
    </group>
  );
}

// Modern Shopping Mall (Forum/Phoenix style)
export function ShoppingMall({ 
  position = [0, 0, 0], 
  scale = 1, 
  name = "Shopping Mall",
  color = "#4A90E2"
}: { 
  position?: [number, number, number]; 
  scale?: number; 
  name?: string;
  color?: string;
}) {
  const { isNight } = useTheme();
  
  return (
    <group position={position} scale={scale}>
      {/* Main mall structure */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[4, 3, 3]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.4} 
          roughness={0.5} 
        />
      </mesh>
      
      {/* Glass entrance facade */}
      <mesh position={[0, 1.5, 1.51]}>
        <boxGeometry args={[3.8, 2.8, 0.02]} />
        <meshStandardMaterial 
          color="#B0E0E6" 
          transparent 
          opacity={0.7}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      
      {/* Mall signage */}
      <mesh position={[0, 2.8, 1.52]}>
        <boxGeometry args={[3, 0.4, 0.01]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive={isNight ? "#FFD700" : "#000000"}
          emissiveIntensity={isNight ? 0.4 : 0}
        />
      </mesh>
      
      {/* Side wings */}
      <mesh position={[-3, 1, 0]}>
        <boxGeometry args={[2, 2, 2.5]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.6} />
      </mesh>
      
      <mesh position={[3, 1, 0]}>
        <boxGeometry args={[2, 2, 2.5]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.6} />
      </mesh>
      
      {/* Parking area */}
      <mesh position={[0, 0.01, -4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color="#5A5A5A" roughness={0.8} />
      </mesh>
      
      {/* Parking lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[-2.5 + i, 0.02, -4]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.1, 2.5]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      ))}
      
      {/* Food court canopy */}
      <mesh position={[4, 1.2, 2]}>
        <boxGeometry args={[1.5, 0.1, 1.5]} />
        <meshStandardMaterial color="#FF6B35" roughness={0.6} />
      </mesh>
      
      {/* Landscaping around mall */}
      <mesh position={[0, 0.01, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2, 8]} />
        <meshStandardMaterial color="#90EE90" roughness={0.9} />
      </mesh>
      
      {/* Mall lighting */}
      {isNight && (
        <>
          <pointLight position={[0, 3, 2]} intensity={0.6} color="#FFE4B5" distance={8} />
          <pointLight position={[-2, 2, 2]} intensity={0.4} color="#FFD700" distance={6} />
          <pointLight position={[2, 2, 2]} intensity={0.4} color="#FFD700" distance={6} />
        </>
      )}
    </group>
  );
}

// Modern IT Park with Glass Buildings
export function ModernITPark({ 
  position = [0, 0, 0], 
  scale = 1, 
  name = "IT Park" 
}: { 
  position?: [number, number, number]; 
  scale?: number; 
  name?: string; 
}) {
  const { isNight } = useTheme();
  
  return (
    <group position={position} scale={scale}>
      {/* Main glass tower */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[2, 4, 1.5]} />
        <meshStandardMaterial 
          color="#2C5282" 
          metalness={0.8} 
          roughness={0.1} 
          transparent 
          opacity={0.9} 
        />
      </mesh>
      
      {/* Glass facade with office lights */}
      {Array.from({ length: 8 }).map((_, floor) => 
        Array.from({ length: 3 }).map((_, window) => (
          <mesh 
            key={`${floor}-${window}`} 
            position={[-0.6 + window * 0.6, 0.5 + floor * 0.4, 0.76]}
          >
            <boxGeometry args={[0.4, 0.3, 0.02]} />
            <meshStandardMaterial 
              color={isNight && (floor + window) % 3 !== 2 ? '#FFE4B5' : '#B0E0E6'}
              emissive={isNight && (floor + window) % 3 !== 2 ? '#FFA500' : '#000000'}
              emissiveIntensity={isNight ? 0.4 : 0}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))
      )}
      
      {/* Smaller adjacent buildings */}
      <mesh position={[-3, 1.2, 0]}>
        <boxGeometry args={[1.5, 2.4, 1.2]} />
        <meshStandardMaterial color="#4A5568" metalness={0.6} roughness={0.3} />
      </mesh>
      
      <mesh position={[3, 1.5, 0]}>
        <boxGeometry args={[1.2, 3, 1]} />
        <meshStandardMaterial color="#2D3748" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Company logo area */}
      <mesh position={[0, 4.2, 0.76]}>
        <boxGeometry args={[1.5, 0.3, 0.01]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive={isNight ? "#FFD700" : "#000000"}
          emissiveIntensity={isNight ? 0.3 : 0}
        />
      </mesh>
      
      {/* Entrance canopy */}
      <mesh position={[0, 0.3, 1.2]}>
        <boxGeometry args={[2.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#4A5568" roughness={0.5} />
      </mesh>
      
      {/* Landscaping */}
      <mesh position={[0, 0.01, 2.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 8]} />
        <meshStandardMaterial color="#90EE90" roughness={0.9} />
      </mesh>
      
      {/* Small landscaping trees */}
      {[[-1, 0, 2.2], [1, 0, 2.2]].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.6, 8]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshStandardMaterial color={isNight ? "#2F4F2F" : "#228B22"} roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Two-wheeler (Motorcycle/Scooter)
export function TwoWheeler({ 
  position = [0, 0, 0], 
  rotationY = 0, 
  scale = 1, 
  type = 'scooter' 
}: { 
  position?: [number, number, number]; 
  rotationY?: number; 
  scale?: number; 
  type?: 'scooter' | 'motorcycle'; 
}) {
  const { isNight } = useTheme();
  const color = type === 'scooter' ? '#4ECDC4' : '#2C3E50';
  
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Main body */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.5, 0.4, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.3} />
      </mesh>
      
      {/* Seat */}
      <mesh position={[-0.2, 0.6, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.5]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      
      {/* Handlebar */}
      <mesh position={[0.5, 0.8, 0]} rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 6]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      
      {/* Wheels */}
      {[[-0.6, 0, 0], [0.6, 0, 0]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.1, 8]} />
          <meshStandardMaterial color="#2C3E50" roughness={0.9} />
        </mesh>
      ))}
      
      {/* Headlight */}
      <mesh position={[0.8, 0.5, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial 
          color="#FFE4B5" 
          emissive={isNight ? "#FFE4B5" : "#000000"} 
          emissiveIntensity={isNight ? 0.4 : 0} 
        />
      </mesh>
    </group>
  );
}