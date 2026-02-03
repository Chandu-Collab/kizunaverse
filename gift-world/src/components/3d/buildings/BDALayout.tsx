import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface BDALayoutProps {
  position?: [number, number, number];
  scale?: number;
  type?: 'A' | 'B' | 'C' | 'D' | 'E'; // BDA layout types
  phase?: number; // Phase number (1-8)
  occupancy?: 'full' | 'partial' | 'developing';
}

export default function BDALayout({ 
  position = [0, 0, 0], 
  scale = 1,
  type = 'A',
  phase = 1,
  occupancy = 'full'
}: BDALayoutProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();

  // Generate houses based on BDA layout type
  const houses = useMemo(() => {
    const layouts = {
      'A': { plots: 12, plotSize: 0.8, spacing: 0.3 }, // 30x40 plots
      'B': { plots: 8, plotSize: 1.0, spacing: 0.4 },  // 40x60 plots
      'C': { plots: 6, plotSize: 1.2, spacing: 0.5 },  // 50x80 plots
      'D': { plots: 4, plotSize: 1.5, spacing: 0.6 },  // 60x100 plots
      'E': { plots: 3, plotSize: 2.0, spacing: 0.8 }   // Villa plots
    };

    const layout = layouts[type];
    const houseList = [];
    
    for (let i = 0; i < layout.plots; i++) {
      const row = Math.floor(i / Math.sqrt(layout.plots));
      const col = i % Math.sqrt(layout.plots);
      
      const x = (col - Math.sqrt(layout.plots) / 2) * (layout.plotSize + layout.spacing);
      const z = (row - Math.sqrt(layout.plots) / 2) * (layout.plotSize + layout.spacing);
      
      // Different house styles
      const houseType = Math.floor(Math.random() * 4);
      const isOccupied = occupancy === 'full' || 
                        (occupancy === 'partial' && Math.random() > 0.3) ||
                        (occupancy === 'developing' && Math.random() > 0.6);
      
      houseList.push({
        id: i,
        position: [x, 0, z] as [number, number, number],
        type: houseType,
        occupied: isOccupied,
        plotSize: layout.plotSize
      });
    }
    
    return houseList;
  }, [type, occupancy]);

  // Gentle swaying animation for trees and flags
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      groupRef.current.children.forEach((child, i) => {
        if (child.userData.isTree) {
          child.rotation.z = Math.sin(time + i) * 0.02;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Layout base platform */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[6, 6, 0.1]} />
        <meshStandardMaterial 
          color={isNight ? "#2C3E50" : "#E8E8E8"} 
          roughness={0.8} 
        />
      </mesh>

      {/* BDA Layout Number Board */}
      <group position={[0, 1.5, -2.5]}>
        <mesh>
          <boxGeometry args={[1.5, 0.8, 0.1]} />
          <meshStandardMaterial color="#2E8B57" />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[1.3, 0.6, 0.01]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        {/* BDA Logo placeholder */}
        <mesh position={[-0.4, 0.1, 0.07]}>
          <boxGeometry args={[0.2, 0.2, 0.01]} />
          <meshStandardMaterial color="#FF6B35" />
        </mesh>
      </group>

      {/* Individual houses */}
      {houses.map((house) => (
        <group key={house.id} position={house.position}>
          {house.occupied && (
            <>
              {/* House structure based on type */}
              {house.type === 0 && ( // Traditional Bangalore house
                <>
                  <mesh position={[0, house.plotSize * 0.4, 0]}>
                    <boxGeometry args={[house.plotSize, house.plotSize * 0.8, house.plotSize]} />
                    <meshStandardMaterial 
                      color={isNight ? "#8B4513" : "#DEB887"} 
                      roughness={0.7} 
                    />
                  </mesh>
                  {/* Red tile roof */}
                  <mesh position={[0, house.plotSize * 0.9, 0]}>
                    <coneGeometry args={[house.plotSize * 0.7, 0.3, 4]} />
                    <meshStandardMaterial color="#B22222" roughness={0.8} />
                  </mesh>
                </>
              )}

              {house.type === 1 && ( // Modern apartment style
                <>
                  <mesh position={[0, house.plotSize * 0.6, 0]}>
                    <boxGeometry args={[house.plotSize, house.plotSize * 1.2, house.plotSize]} />
                    <meshStandardMaterial 
                      color={isNight ? "#4A5568" : "#E2E8F0"} 
                      roughness={0.6} 
                    />
                  </mesh>
                  {/* Flat roof with small parapet */}
                  <mesh position={[0, house.plotSize * 1.3, 0]}>
                    <boxGeometry args={[house.plotSize * 1.1, 0.1, house.plotSize * 1.1]} />
                    <meshStandardMaterial color="#2D3748" />
                  </mesh>
                </>
              )}

              {house.type === 2 && ( // Villa style
                <>
                  <mesh position={[0, house.plotSize * 0.45, 0]}>
                    <boxGeometry args={[house.plotSize * 1.2, house.plotSize * 0.9, house.plotSize * 1.2]} />
                    <meshStandardMaterial 
                      color={isNight ? "#A0522D" : "#F5DEB3"} 
                      roughness={0.7} 
                    />
                  </mesh>
                  {/* Pitched roof */}
                  <mesh position={[0, house.plotSize * 1.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[house.plotSize * 0.8, house.plotSize * 0.8, house.plotSize * 1.2, 8, 1, false, 0, Math.PI]} />
                    <meshStandardMaterial color="#8B0000" roughness={0.9} />
                  </mesh>
                </>
              )}

              {house.type === 3 && ( // Duplex house
                <>
                  <mesh position={[0, house.plotSize * 0.7, 0]}>
                    <boxGeometry args={[house.plotSize, house.plotSize * 1.4, house.plotSize]} />
                    <meshStandardMaterial 
                      color={isNight ? "#6B46C1" : "#E0E7FF"} 
                      roughness={0.6} 
                    />
                  </mesh>
                  {/* Balcony */}
                  <mesh position={[0, house.plotSize * 1.0, house.plotSize * 0.6]}>
                    <boxGeometry args={[house.plotSize * 0.8, 0.05, 0.3]} />
                    <meshStandardMaterial color="#4B5563" />
                  </mesh>
                </>
              )}

              {/* Windows with night lighting */}
              {Array.from({ length: Math.floor(house.plotSize * 2) }).map((_, i) => (
                <mesh key={`window-${i}`} position={[
                  (i % 2 - 0.5) * house.plotSize * 0.6,
                  house.plotSize * (0.3 + Math.floor(i / 2) * 0.4),
                  house.plotSize * 0.51
                ]}>
                  <boxGeometry args={[0.15, 0.2, 0.02]} />
                  <meshStandardMaterial 
                    color={isNight && Math.random() > 0.4 ? "#FFF8DC" : "#87CEEB"} 
                    emissive={isNight && Math.random() > 0.4 ? "#332200" : "#000000"}
                    roughness={0.2} 
                    metalness={0.1}
                  />
                </mesh>
              ))}

              {/* Garden elements */}
              <group position={[house.plotSize * 0.3, 0, house.plotSize * 0.7]}>
                {/* Small tree */}
                <mesh position={[0, 0.3, 0]} userData={{ isTree: true }}>
                  <cylinderGeometry args={[0.02, 0.03, 0.4, 6]} />
                  <meshStandardMaterial color="#8B4513" roughness={0.9} />
                </mesh>
                <mesh position={[0, 0.6, 0]}>
                  <sphereGeometry args={[0.15, 6, 6]} />
                  <meshStandardMaterial color="#228B22" roughness={0.8} />
                </mesh>
              </group>

              {/* Gate/Compound wall */}
              <group position={[0, 0.2, house.plotSize * 0.8]}>
                <mesh>
                  <boxGeometry args={[house.plotSize * 1.3, 0.4, 0.05]} />
                  <meshStandardMaterial color="#A0A0A0" roughness={0.8} />
                </mesh>
                {/* Gate */}
                <mesh position={[0, 0, -0.03]}>
                  <boxGeometry args={[0.4, 0.35, 0.02]} />
                  <meshStandardMaterial color="#4A4A4A" roughness={0.7} />
                </mesh>
              </group>
            </>
          )}

          {/* Empty plot marker for undeveloped areas */}
          {!house.occupied && (
            <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <boxGeometry args={[house.plotSize * 1.1, house.plotSize * 1.1, 0.02]} />
              <meshStandardMaterial 
                color={occupancy === 'developing' ? "#DEB887" : "#90EE90"} 
                roughness={0.9} 
              />
            </mesh>
          )}
        </group>
      ))}

      {/* BDA Layout Roads */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1, 6, 0.01]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <boxGeometry args={[1, 6, 0.01]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.9} />
      </mesh>

      {/* Street lights */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.cos(angle) * 2.5;
        const z = Math.sin(angle) * 2.5;
        
        return (
          <group key={`light-${i}`} position={[x, 0, z]}>
            <mesh position={[0, 1.5, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
              <meshStandardMaterial color="#404040" />
            </mesh>
            <mesh position={[0, 3.2, 0]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial 
                color={isNight ? "#FFF8DC" : "#E0E0E0"} 
                emissive={isNight ? "#332200" : "#000000"}
                emissiveIntensity={isNight ? 0.5 : 0}
              />
            </mesh>
            {/* Note: Removed pointLight to prevent WebGL texture unit overflow */}
          </group>
        );
      })}
    </group>
  );
}