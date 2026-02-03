import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface GardenParkProps {
  position?: [number, number, number];
  scale?: number;
  type?: 'lalbagh' | 'cubbon' | 'sankey' | 'ulsoor';
  name?: string;
  size?: number;
}

export default function GardenPark({ 
  position = [0, 0, 0], 
  scale = 1,
  type = 'lalbagh',
  name = 'City Garden',
  size = 2
}: GardenParkProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();

  const parkConfig = {
    lalbagh: {
      groundColor: '#228B22',
      treeTypes: ['banyan', 'neem', 'gulmohar', 'rain'],
      features: ['glasshouse', 'lake', 'flowerbeds'],
      treeCount: 12
    },
    cubbon: {
      groundColor: '#32CD32',
      treeTypes: ['oak', 'eucalyptus', 'bamboo'],
      features: ['museum', 'library', 'jogtrack'],
      treeCount: 15
    },
    sankey: {
      groundColor: '#9ACD32',
      treeTypes: ['coconut', 'palm', 'mango'],
      features: ['lake', 'boating', 'walkway'],
      treeCount: 8
    },
    ulsoor: {
      groundColor: '#6B8E23',
      treeTypes: ['tamarind', 'ashoka', 'jackfruit'],
      features: ['lake', 'temple', 'island'],
      treeCount: 10
    }
  };

  const config = parkConfig[type];

  // Generate tree positions
  const trees = useMemo(() => {
    const treeList = [];
    for (let i = 0; i < config.treeCount; i++) {
      const angle = (i / config.treeCount) * Math.PI * 2;
      const radius = size * (0.6 + Math.random() * 0.3);
      const treeType = config.treeTypes[Math.floor(Math.random() * config.treeTypes.length)];
      
      treeList.push({
        id: i,
        position: [
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        ] as [number, number, number],
        type: treeType,
        height: 0.8 + Math.random() * 0.6,
        canopySize: 0.3 + Math.random() * 0.2
      });
    }
    return treeList;
  }, [config.treeCount, config.treeTypes, size]);

  // Gentle swaying animation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      groupRef.current.children.forEach((child, i) => {
        if (child.userData.isTree) {
          child.rotation.z = Math.sin(time + i * 0.5) * 0.02;
          child.rotation.x = Math.cos(time * 0.7 + i * 0.3) * 0.01;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Park ground */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[size, 24]} />
        <meshStandardMaterial 
          color={isNight ? '#1B4332' : config.groundColor} 
          roughness={0.9} 
        />
      </mesh>

      {/* Park boundary/fence */}
      <mesh position={[0, 0.3, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[size + 0.1, 0.02, 8, 32]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Park entrance gates */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const gateX = Math.cos(angle) * (size + 0.2);
        const gateZ = Math.sin(angle) * (size + 0.2);
        
        return (
          <group key={`gate-${i}`} position={[gateX, 0, gateZ]}>
            <mesh position={[-0.15, 0.8, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 1.6, 8]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
            <mesh position={[0.15, 0.8, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 1.6, 8]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
            <mesh position={[0, 1.4, 0]}>
              <boxGeometry args={[0.4, 0.1, 0.05]} />
              <meshStandardMaterial color="#2F4F2F" />
            </mesh>
          </group>
        );
      })}

      {/* Trees with different types */}
      {trees.map((tree) => (
        <group 
          key={tree.id} 
          position={tree.position} 
          userData={{ isTree: true }}
        >
          {/* Tree trunk */}
          <mesh position={[0, tree.height / 2, 0]}>
            <cylinderGeometry args={[0.06, 0.08, tree.height, 8]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
          
          {/* Tree canopy based on type */}
          {tree.type === 'banyan' && (
            <>
              <mesh position={[0, tree.height + tree.canopySize / 2, 0]}>
                <sphereGeometry args={[tree.canopySize * 1.2, 12, 8]} />
                <meshStandardMaterial 
                  color={isNight ? "#1B4332" : "#228B22"} 
                  roughness={0.8} 
                />
              </mesh>
              {/* Banyan aerial roots */}
              {Array.from({ length: 3 }).map((_, i) => (
                <mesh key={i} position={[
                  (Math.random() - 0.5) * tree.canopySize,
                  tree.height * 0.7,
                  (Math.random() - 0.5) * tree.canopySize
                ]}>
                  <cylinderGeometry args={[0.02, 0.02, tree.height * 0.7, 6]} />
                  <meshStandardMaterial color="#8B4513" roughness={0.9} />
                </mesh>
              ))}
            </>
          )}

          {tree.type === 'neem' && (
            <mesh position={[0, tree.height + tree.canopySize / 2, 0]}>
              <sphereGeometry args={[tree.canopySize, 10, 8]} />
              <meshStandardMaterial 
                color={isNight ? "#2F4F2F" : "#32CD32"} 
                roughness={0.8} 
              />
            </mesh>
          )}

          {tree.type === 'gulmohar' && (
            <>
              <mesh position={[0, tree.height + tree.canopySize / 2, 0]}>
                <sphereGeometry args={[tree.canopySize, 8, 6]} />
                <meshStandardMaterial 
                  color={isNight ? "#4A0E0E" : "#FF4500"} 
                  roughness={0.8} 
                />
              </mesh>
              {/* Gulmohar flowers */}
              {!isNight && Array.from({ length: 5 }).map((_, i) => (
                <mesh key={i} position={[
                  (Math.random() - 0.5) * tree.canopySize * 1.5,
                  tree.height + (Math.random() - 0.5) * tree.canopySize,
                  (Math.random() - 0.5) * tree.canopySize * 1.5
                ]}>
                  <sphereGeometry args={[0.02, 6, 6]} />
                  <meshStandardMaterial color="#FF6347" emissive="#FF1111" emissiveIntensity={0.2} />
                </mesh>
              ))}
            </>
          )}

          {tree.type === 'coconut' && (
            <>
              <mesh position={[0, tree.height + tree.canopySize / 2, 0]}>
                <sphereGeometry args={[tree.canopySize * 0.6, 8, 8]} />
                <meshStandardMaterial 
                  color={isNight ? "#2F4F2F" : "#228B22"} 
                  roughness={0.8} 
                />
              </mesh>
              {/* Palm fronds */}
              {Array.from({ length: 8 }).map((_, i) => {
                const frondAngle = (i / 8) * Math.PI * 2;
                return (
                  <mesh 
                    key={i} 
                    position={[
                      Math.cos(frondAngle) * tree.canopySize * 0.8,
                      tree.height + tree.canopySize * 0.3,
                      Math.sin(frondAngle) * tree.canopySize * 0.8
                    ]}
                    rotation={[frondAngle, 0, Math.PI / 6]}
                  >
                    <boxGeometry args={[tree.canopySize * 0.8, 0.02, 0.1]} />
                    <meshStandardMaterial color="#228B22" />
                  </mesh>
                );
              })}
            </>
          )}

          {/* Default tree types */}
          {!['banyan', 'neem', 'gulmohar', 'coconut'].includes(tree.type) && (
            <mesh position={[0, tree.height + tree.canopySize / 2, 0]}>
              <sphereGeometry args={[tree.canopySize, 8, 8]} />
              <meshStandardMaterial 
                color={isNight ? "#2F4F2F" : "#228B22"} 
                roughness={0.8} 
              />
            </mesh>
          )}
        </group>
      ))}

      {/* Park features based on type */}
      {config.features.includes('lake') && (
        <mesh position={[size * 0.3, 0.02, size * 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[size * 0.3, 16]} />
          <meshStandardMaterial 
            color={isNight ? "#1B4332" : "#4169E1"} 
            transparent 
            opacity={0.8}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
      )}

      {config.features.includes('glasshouse') && type === 'lalbagh' && (
        <group position={[0, 0, -size * 0.4]}>
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[1.2, 1.2, 0.8]} />
            <meshStandardMaterial 
              color="#E6E6FA" 
              transparent 
              opacity={0.7}
              roughness={0.1}
              metalness={0.3}
            />
          </mesh>
          <mesh position={[0, 1.3, 0]}>
            <coneGeometry args={[0.7, 0.6, 8]} />
            <meshStandardMaterial 
              color="#E6E6FA" 
              transparent 
              opacity={0.7}
              roughness={0.1}
            />
          </mesh>
        </group>
      )}

      {config.features.includes('flowerbeds') && (
        <>
          {Array.from({ length: 4 }).map((_, i) => {
            const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
            const bedX = Math.cos(angle) * size * 0.6;
            const bedZ = Math.sin(angle) * size * 0.6;
            
            return (
              <group key={`flowerbed-${i}`} position={[bedX, 0, bedZ]}>
                <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <circleGeometry args={[0.3, 12]} />
                  <meshStandardMaterial color="#8B4513" roughness={0.9} />
                </mesh>
                {/* Flowers */}
                {Array.from({ length: 6 }).map((_, j) => {
                  const flowerAngle = (j / 6) * Math.PI * 2;
                  const flowerRadius = 0.1 + Math.random() * 0.15;
                  return (
                    <mesh key={j} position={[
                      Math.cos(flowerAngle) * flowerRadius,
                      0.1,
                      Math.sin(flowerAngle) * flowerRadius
                    ]}>
                      <sphereGeometry args={[0.03, 6, 6]} />
                      <meshStandardMaterial 
                        color={['#FF69B4', '#FFD700', '#FF6347', '#9370DB', '#00CED1'][j % 5]} 
                        emissive={isNight ? '#111111' : '#000000'}
                      />
                    </mesh>
                  );
                })}
              </group>
            );
          })}
        </>
      )}

      {/* Park benches */}
      {Array.from({ length: 3 }).map((_, i) => {
        const angle = (i / 3) * Math.PI * 2;
        const benchX = Math.cos(angle) * size * 0.8;
        const benchZ = Math.sin(angle) * size * 0.8;
        
        return (
          <group key={`bench-${i}`} position={[benchX, 0, benchZ]} rotation={[0, -angle, 0]}>
            <mesh position={[0, 0.2, 0]}>
              <boxGeometry args={[0.8, 0.05, 0.3]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.4, -0.12]}>
              <boxGeometry args={[0.8, 0.3, 0.05]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
            {/* Bench legs */}
            <mesh position={[-0.35, 0.1, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
              <meshStandardMaterial color="#444444" metalness={0.8} />
            </mesh>
            <mesh position={[0.35, 0.1, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
              <meshStandardMaterial color="#444444" metalness={0.8} />
            </mesh>
          </group>
        );
      })}

      {/* Park sign */}
      <group position={[0, 0, -size - 0.3]}>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2.4, 8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[1.2, 0.4, 0.1]} />
          <meshStandardMaterial color="#2F4F2F" />
        </mesh>
        <mesh position={[0, 2.2, 0.06]}>
          <boxGeometry args={[1.0, 0.3, 0.01]} />
          <meshStandardMaterial 
            color="#FFFFFF" 
            emissive={isNight ? "#111111" : "#000000"}
          />
        </mesh>
      </group>
    </group>
  );
}