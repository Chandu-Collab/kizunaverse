import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface KiranaStoreProps {
  position?: [number, number, number];
  scale?: number;
  storeName?: string;
  type?: 'general' | 'medical' | 'stationary' | 'provision' | 'electronics';
  bustling?: boolean;
}

export default function KiranaStore({ 
  position = [0, 0, 0], 
  scale = 1,
  storeName = "Local Store",
  type = 'general',
  bustling = false
}: KiranaStoreProps) {
  const storeRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { isNight } = useTheme();

  const storeColors = {
    general: { main: "#87CEEB", accent: "#4682B4", sign: "#FF6347" },
    medical: { main: "#98FB98", accent: "#32CD32", sign: "#DC143C" },
    stationary: { main: "#DDA0DD", accent: "#9370DB", sign: "#FF1493" },
    provision: { main: "#F0E68C", accent: "#DAA520", sign: "#FF8C00" },
    electronics: { main: "#B0C4DE", accent: "#4169E1", sign: "#00CED1" }
  };

  const colors = storeColors[type];

  // Animate the shop sign and some products
  useFrame(({ clock }) => {
    if (storeRef.current) {
      const time = clock.getElapsedTime();
      
      // Gentle swaying of hanging items
      storeRef.current.children.forEach((child, i) => {
        if (child.userData.isHanging) {
          child.rotation.z = Math.sin(time * 2 + i) * 0.05;
        }
        if (child.userData.isSign && bustling) {
          child.rotation.y = Math.sin(time * 0.5) * 0.02;
        }
      });
    }
  });

  return (
    <group 
      ref={storeRef} 
      position={position} 
      scale={scale}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
    >
      {/* Main store building */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.5, 1.6, 2]} />
        <meshStandardMaterial 
          color={hovered ? "#A0A0FF" : colors.main} 
          roughness={0.8}
          metalness={0.1} 
        />
      </mesh>

      {/* Store roof */}
      <mesh position={[0, 1.8, 0]}>
        <coneGeometry args={[1.5, 0.4, 4]} />
        <meshStandardMaterial color="#8B0000" roughness={0.9} />
      </mesh>

      {/* Front awning/canopy */}
      <group position={[0, 1.3, 1.2]}>
        <mesh>
          <boxGeometry args={[2.8, 0.05, 0.6]} />
          <meshStandardMaterial color={colors.accent} />
        </mesh>
        {/* Awning support poles */}
        <mesh position={[-1.2, -0.6, 0.25]}>
          <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[1.2, -0.6, 0.25]}>
          <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>

      {/* Store entrance door */}
      <mesh position={[0, 0.6, 1.05]}>
        <boxGeometry args={[0.8, 1.2, 0.05]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>

      {/* Door handle */}
      <mesh position={[-0.3, 0.6, 1.08]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Store windows with products visible */}
      <group position={[-0.8, 0.8, 1.05]}>
        <mesh>
          <boxGeometry args={[0.6, 0.6, 0.02]} />
          <meshStandardMaterial color="#87CEEB" roughness={0.1} metalness={0.1} />
        </mesh>
        {/* Window frame */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[0.65, 0.65, 0.02]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>

      <group position={[0.8, 0.8, 1.05]}>
        <mesh>
          <boxGeometry args={[0.6, 0.6, 0.02]} />
          <meshStandardMaterial color="#87CEEB" roughness={0.1} metalness={0.1} />
        </mesh>
        {/* Window frame */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[0.65, 0.65, 0.02]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>

      {/* Store signboard */}
      <group position={[0, 2.2, 0]} userData={{ isSign: true }}>
        <mesh>
          <boxGeometry args={[2.2, 0.4, 0.1]} />
          <meshStandardMaterial color={colors.sign} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[2.0, 0.3, 0.01]} />
          <meshStandardMaterial 
            color="#FFFFFF" 
            emissive={isNight ? "#111111" : "#000000"}
          />
        </mesh>
        
        {/* Store type indicators */}
        {type === 'medical' && (
          <mesh position={[-0.7, 0, 0.07]}>
            <boxGeometry args={[0.15, 0.05, 0.01]} />
            <meshStandardMaterial color="#DC143C" />
          </mesh>
        )}
        
        {type === 'electronics' && (
          <mesh position={[0.7, 0, 0.07]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#00CED1" emissive="#001111" />
          </mesh>
        )}
      </group>

      {/* External product displays based on store type */}
      {type === 'general' && (
        <group position={[1.5, 0.3, 1.2]}>
          {/* Vegetable crates */}
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[0.3, 0.3, 0.2]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh key={`veg-${i}`} position={[(i-1) * 0.1, 0.35, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color={["#FF6347", "#32CD32", "#FFD700"][i]} />
            </mesh>
          ))}
        </group>
      )}

      {type === 'medical' && (
        <group position={[-1.5, 1.2, 1.2]}>
          {/* Medical cross sign */}
          <mesh>
            <boxGeometry args={[0.15, 0.4, 0.02]} />
            <meshStandardMaterial color="#DC143C" />
          </mesh>
          <mesh>
            <boxGeometry args={[0.4, 0.15, 0.02]} />
            <meshStandardMaterial color="#DC143C" />
          </mesh>
        </group>
      )}

      {type === 'stationary' && (
        <group position={[1.5, 0.5, 1.2]}>
          {/* Hanging pens and notebooks */}
          <mesh position={[0, 0, 0]} userData={{ isHanging: true }}>
            <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} />
            <meshStandardMaterial color="#FF1493" />
          </mesh>
          <mesh position={[0.1, -0.1, 0]} userData={{ isHanging: true }}>
            <boxGeometry args={[0.08, 0.12, 0.01]} />
            <meshStandardMaterial color="#87CEEB" />
          </mesh>
        </group>
      )}

      {type === 'provision' && (
        <group position={[1.3, 0.4, 1.3]}>
          {/* Rice/grain sacks */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.15, 0.12, 0.4, 8]} />
            <meshStandardMaterial color="#F5DEB3" roughness={0.9} />
          </mesh>
          <mesh position={[0.2, 0.15, 0.1]}>
            <cylinderGeometry args={[0.12, 0.1, 0.3, 8]} />
            <meshStandardMaterial color="#DEB887" roughness={0.9} />
          </mesh>
        </group>
      )}

      {type === 'electronics' && (
        <group position={[-1.3, 0.8, 1.2]}>
          {/* Small TV/monitor display */}
          <mesh>
            <boxGeometry args={[0.25, 0.2, 0.05]} />
            <meshStandardMaterial color="#1C1C1C" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={[0.2, 0.15, 0.01]} />
            <meshStandardMaterial 
              color={isNight ? "#0066FF" : "#87CEEB"} 
              emissive={isNight ? "#001122" : "#000000"}
            />
          </mesh>
        </group>
      )}

      {/* Floor/base platform */}
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[3, 2.5, 0.04]} />
        <meshStandardMaterial color="#696969" roughness={0.9} />
      </mesh>

      {/* Street-side accessories */}
      {bustling && (
        <>
          {/* Parked bicycle */}
          <group position={[-2, 0.3, 0.5]}>
            <mesh position={[0, 0, 0.3]}>
              <torusGeometry args={[0.15, 0.02, 8, 16]} />
              <meshStandardMaterial color="#4A4A4A" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, -0.3]}>
              <torusGeometry args={[0.15, 0.02, 8, 16]} />
              <meshStandardMaterial color="#4A4A4A" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.01, 0.01, 0.6, 8]} />
              <meshStandardMaterial color="#8B0000" />
            </mesh>
          </group>

          {/* Customers (simple character representations) */}
          <group position={[2.2, 0.8, 0.8]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.2, 1.6, 8]} />
              <meshStandardMaterial color="#DDA0DD" />
            </mesh>
            <mesh position={[0, 1.0, 0]}>
              <sphereGeometry args={[0.15, 8, 8]} />
              <meshStandardMaterial color="#DDBEA9" />
            </mesh>
          </group>
        </>
      )}

      {/* Note: Removed interior lighting to prevent WebGL texture unit overflow */}

      {/* Hover information */}
      {hovered && (
        <Html position={[0, 2.5, 0]} center>
          <div style={{
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            pointerEvents: 'none'
          }}>
            {storeName} ({type.charAt(0).toUpperCase() + type.slice(1)})
          </div>
        </Html>
      )}
    </group>
  );
}