import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface TempleProps {
  position?: [number, number, number];
  scale?: number;
  type?: 'main' | 'community' | 'ganesha' | 'hanuman' | 'shiva';
  name?: string;
}

export default function Temple({ 
  position = [0, 0, 0], 
  scale = 1,
  type = 'main',
  name = 'Temple'
}: TempleProps) {
  const templeRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();

  const templeConfig = {
    main: {
      baseColor: '#FFE4B5',
      roofColor: '#DAA520',
      height: 1.6,
      width: 2,
      depth: 1.5,
      spires: 3
    },
    community: {
      baseColor: '#F5DEB3',
      roofColor: '#CD853F',
      height: 1.2,
      width: 1.5,
      depth: 1.2,
      spires: 1
    },
    ganesha: {
      baseColor: '#FF6347',
      roofColor: '#8B0000',
      height: 1.4,
      width: 1.8,
      depth: 1.4,
      spires: 2
    },
    hanuman: {
      baseColor: '#FF8C00',
      roofColor: '#B8860B',
      height: 1.8,
      width: 1.6,
      depth: 1.3,
      spires: 1
    },
    shiva: {
      baseColor: '#E6E6FA',
      roofColor: '#9370DB',
      height: 2.0,
      width: 2.2,
      depth: 1.8,
      spires: 4
    }
  };

  const config = templeConfig[type];

  // Gentle temple bell animation
  useFrame(({ clock }) => {
    if (templeRef.current) {
      const time = clock.getElapsedTime();
      // Subtle swaying for flags
      templeRef.current.children.forEach((child) => {
        if (child.userData.isFlag) {
          child.rotation.z = Math.sin(time * 2) * 0.1;
        }
      });
    }
  });

  return (
    <group ref={templeRef} position={position} scale={scale}>
      {/* Temple base platform */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[config.width + 0.5, config.depth + 0.5, 0.2]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.8} />
      </mesh>

      {/* Main temple structure */}
      <mesh position={[0, config.height / 2 + 0.1, 0]}>
        <boxGeometry args={[config.width, config.height, config.depth]} />
        <meshStandardMaterial 
          color={config.baseColor} 
          roughness={0.6} 
        />
      </mesh>

      {/* Temple entrance */}
      <mesh position={[0, config.height * 0.4, config.depth / 2 + 0.01]}>
        <boxGeometry args={[config.width * 0.6, config.height * 0.8, 0.02]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Temple door */}
      <mesh position={[0, config.height * 0.25, config.depth / 2 + 0.02]}>
        <boxGeometry args={[config.width * 0.3, config.height * 0.5, 0.01]} />
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </mesh>

      {/* Temple spires */}
      {Array.from({ length: config.spires }).map((_, i) => {
        const spireX = config.spires === 1 ? 0 : 
                      config.spires === 2 ? (i - 0.5) * config.width * 0.4 :
                      config.spires === 3 ? (i - 1) * config.width * 0.3 :
                      (i - 1.5) * config.width * 0.25;
        
        return (
          <group key={`spire-${i}`} position={[spireX, config.height + 0.1, 0]}>
            {/* Spire base */}
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.3, 0.35, 0.4, 8]} />
              <meshStandardMaterial color={config.roofColor} metalness={0.4} roughness={0.3} />
            </mesh>
            
            {/* Spire dome */}
            <mesh position={[0, 0.6, 0]}>
              <sphereGeometry args={[0.25, 12, 8]} />
              <meshStandardMaterial color={config.roofColor} metalness={0.5} roughness={0.2} />
            </mesh>
            
            {/* Spire top */}
            <mesh position={[0, 0.95, 0]}>
              <coneGeometry args={[0.1, 0.3, 8]} />
              <meshStandardMaterial 
                color="#FFD700" 
                metalness={0.8} 
                roughness={0.1}
                emissive={isNight ? "#332200" : "#000000"}
              />
            </mesh>
          </group>
        );
      })}

      {/* Temple pillars */}
      {Array.from({ length: 4 }).map((_, i) => {
        const pillarPositions: [number, number, number][] = [
          [-config.width * 0.4, 0, config.depth * 0.4],
          [config.width * 0.4, 0, config.depth * 0.4],
          [-config.width * 0.4, 0, -config.depth * 0.4],
          [config.width * 0.4, 0, -config.depth * 0.4]
        ];
        
        return (
          <mesh key={`pillar-${i}`} position={pillarPositions[i]}>
            <cylinderGeometry args={[0.08, 0.08, config.height + 0.2, 12]} />
            <meshStandardMaterial 
              color="#D2B48C" 
              roughness={0.7}
              metalness={0.1}
            />
          </mesh>
        );
      })}

      {/* Temple decorative elements */}
      <mesh position={[0, config.height + 0.1, config.depth / 2]}>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>

      {/* Temple windows */}
      {Array.from({ length: 2 }).map((_, i) => (
        <mesh key={`window-${i}`} position={[
          (i - 0.5) * config.width * 0.6,
          config.height * 0.6,
          config.depth / 2 + 0.01
        ]}>
          <boxGeometry args={[0.2, 0.25, 0.02]} />
          <meshStandardMaterial 
            color={isNight ? "#FFE4B5" : "#87CEEB"} 
            transparent 
            opacity={0.7}
            emissive={isNight ? "#332200" : "#000000"}
          />
        </mesh>
      ))}

      {/* Temple flags */}
      {Array.from({ length: 2 }).map((_, i) => (
        <group key={`flag-${i}`} position={[
          (i - 0.5) * config.width * 0.8,
          0,
          -config.depth * 0.6
        ]}>
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
          <mesh 
            position={[0.2, 2.5, 0]} 
            userData={{ isFlag: true }}
          >
            <boxGeometry args={[0.4, 0.3, 0.01]} />
            <meshStandardMaterial 
              color={type === 'ganesha' ? '#FF6347' : 
                    type === 'hanuman' ? '#FF8C00' :
                    type === 'shiva' ? '#9370DB' : '#DAA520'} 
            />
          </mesh>
        </group>
      ))}

      {/* Temple steps */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={`step-${i}`} position={[0, 0.05 + i * 0.03, config.depth / 2 + 0.1 + i * 0.15]}>
          <boxGeometry args={[config.width + 0.2, 0.06, 0.3]} />
          <meshStandardMaterial color="#D2B48C" roughness={0.8} />
        </mesh>
      ))}

      {/* Oil lamp stands */}
      {Array.from({ length: 4 }).map((_, i) => {
        const lampAngle = (i / 4) * Math.PI * 2;
        const lampRadius = Math.max(config.width, config.depth) * 0.6;
        
        return (
          <group key={`lamp-${i}`} position={[
            Math.cos(lampAngle) * lampRadius,
            0,
            Math.sin(lampAngle) * lampRadius
          ]}>
            <mesh position={[0, 0.3, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.6, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[0, 0.65, 0]}>
              <sphereGeometry args={[0.06, 8, 6]} />
              <meshStandardMaterial 
                color={isNight ? "#FFE4B5" : "#DAA520"} 
                emissive={isNight ? "#FF4500" : "#000000"}
                emissiveIntensity={isNight ? 0.8 : 0}
              />
            </mesh>
          </group>
        );
      })}

      {/* Temple courtyard */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[Math.max(config.width, config.depth) + 1, 16]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.9} />
      </mesh>

      {/* Enhanced evening lighting using emissive materials only */}
      {/* Note: Removed pointLights to prevent WebGL texture unit overflow */}
    </group>
  );
}