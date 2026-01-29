"use client";
// Falling Petals/Leaves Particle System
import { useMemo } from 'react';


// Generic animated particle system for seasonal effects
// ...existing code...
// ...existing code...
function AnimatedParticles({ count = 24, type = 'petal', colors, sizeRange = [0.09, 0.13], shape = 'plane' }) {
  const group = useRef();
  // Precompute random properties for each particle
  const particles = useMemo(() => Array.from({ length: count }).map(() => ({
    x: (Math.random() - 0.5) * 24,
    y: 5 + Math.random() * 7,
    z: (Math.random() - 0.5) * 18 - 6,
    phase: Math.random() * Math.PI * 2,
    speed: 0.18 + Math.random() * 0.12,
    sway: 0.7 + Math.random() * 0.5,
    size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
    color: colors[Math.floor(Math.random() * colors.length)]
  })), [count, colors, sizeRange[0], sizeRange[1]]);
  useFrame(() => {
    if (!group.current) return;
    group.current.children.forEach((mesh, i) => {
      const p = particles[i];
      const t = performance.now() / 1000 * p.speed + p.phase;
      // Animate y and x
      mesh.position.y = ((p.y - (t * 1.1) % 12) % 12) - 2;
      mesh.position.x = p.x + Math.sin(t * 1.2) * p.sway;
      mesh.position.z = p.z + Math.cos(t * 0.7) * p.sway * 0.5;
      if (shape === 'plane') {
        mesh.rotation.z = Math.sin(t) * 0.7;
      } else if (shape === 'sphere') {
        mesh.rotation.y = Math.sin(t) * 0.7;
      }
    });
  });
  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          {shape === 'plane' ? (
            <planeGeometry args={[p.size, p.size * 0.7]} />
          ) : (
            <sphereGeometry args={[p.size, 8, 8]} />
          )}
          <meshStandardMaterial color={p.color} transparent opacity={0.82} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group, Color } from 'three';
import { useTheme } from '@/hooks/useTheme';

// Refined Mountain with better proportions
function Mountain({ position, scale = [1, 1, 1], color = '#4A7C59' }: {
  position: [number, number, number];
  scale?: [number, number, number];
  color?: string;
}) {
  const meshRef = useRef<Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.03) * 0.01;
    }
  });

  return (
    <group ref={meshRef} position={position} scale={scale}>
      <mesh castShadow receiveShadow>
        <coneGeometry args={[2, 4.5, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.85} 
          metalness={0.05}
        />
      </mesh>
      {/* Subtle rock details */}
      {Array.from({ length: 3 }).map((_, i) => {
        const angle = (i / 3) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 1.5,
              1.5 + Math.random() * 1,
              Math.sin(angle) * 1.5,
            ]}
            castShadow
          >
            <boxGeometry args={[0.25, 0.3, 0.25]} />
            <meshStandardMaterial color="#6a6a6a" roughness={0.95} />
          </mesh>
        );
      })}
    </group>
  );
}

// Refined Tea Garden - cleaner look
function TeaGarden({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: 8 }).map((_, i) => {
        const offset = (i - 3.5) * 0.5;
        const height = 0.45 + Math.random() * 0.15;
        return (
          <group key={i} position={[offset, 0, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.28, height * 0.4, 0.28]} />
              <meshStandardMaterial color="#1a4a1a" roughness={0.8} />
            </mesh>
            {/* Tea leaves - simplified but attractive */}
            <mesh position={[0, height * 0.35, 0]} castShadow>
              <sphereGeometry args={[0.18, 10, 10]} />
              <meshStandardMaterial color="#2d6016" roughness={0.6} />
            </mesh>
            <mesh position={[0, height * 0.5, 0]} castShadow>
              <sphereGeometry args={[0.15, 10, 10]} />
              <meshStandardMaterial color="#3d7026" roughness={0.6} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Beautiful Lake with enhanced visuals
function Lake() {
  const lakeRef = useRef<Mesh>(null);
  const { isNight } = useTheme();

  useFrame((state) => {
    if (lakeRef.current) {
      const time = state.clock.elapsedTime;
      lakeRef.current.material.uniforms.uTime.value = time;
      lakeRef.current.rotation.z = Math.sin(time * 0.25) * 0.003;
      lakeRef.current.position.y = 0.1 + Math.sin(time * 0.2) * 0.015;
    }
  });

  const waterColor = new Color(isNight ? '#1a4a7a' : '#4A9AE8');
  const waterEmissive = new Color(isNight ? '#0a1a3a' : '#000000');

  return (
    <group>
      {/* Lake base */}
      <mesh position={[0, -0.15, -8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[6, 6, 0.4, 32]} />
        <meshStandardMaterial color="#1a1a3a" roughness={1} />
      </mesh>
      {/* Water surface with animated ripples */}
      <mesh ref={lakeRef} position={[0, 0.1, -8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 8, 96, 96]} />
        <shaderMaterial
          attach="material"
          args={[{
            uniforms: {
              uTime: { value: 0 },
              uColor: { value: waterColor },
              uEmissive: { value: waterEmissive },
              uOpacity: { value: isNight ? 0.7 : 0.8 },
            },
            vertexShader: `
              uniform float uTime;
              varying vec2 vUv;
              void main() {
                vUv = uv;
                vec3 pos = position;
                float freq = 2.0;
                float amp = 0.09;
                pos.z += sin((pos.x + uTime * 0.7) * freq) * amp * 0.5;
                pos.z += sin((pos.y + uTime * 0.5) * freq * 1.2) * amp * 0.5;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
              }
            `,
            fragmentShader: `
              uniform vec3 uColor;
              uniform vec3 uEmissive;
              uniform float uOpacity;
              varying vec2 vUv;
              void main() {
                float ripple = 0.5 + 0.5 * sin((vUv.x + vUv.y) * 30.0);
                gl_FragColor = vec4(uColor * (0.85 + 0.15 * ripple), uOpacity);
                gl_FragColor.rgb += uEmissive * 0.12;
              }
            `,
            transparent: true,
          }]} />
      </mesh>
      {/* Shore */}
      <mesh position={[0, 0.05, -8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[6, 6.25, 48]} />
        <meshStandardMaterial color="#9B8365" roughness={0.85} />
      </mesh>
    </group>
  );
}

// Beautiful Clouds
function Cloud({ position }: { position: [number, number, number] }) {
  const cloudRef = useRef<Group>(null);
  const { isNight } = useTheme();

  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.06) * 0.2;
      cloudRef.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * 0.04) * 0.15;
    }
  });

  const cloudColor = isNight ? '#2a2a3a' : '#FFFFFF';
  const cloudOpacity = isNight ? 0.25 : 0.75;

  return (
    <group ref={cloudRef} position={position}>
      {[
        [0, 0, 0, 0.65],
        [0.45, 0.08, 0, 0.55],
        [-0.35, 0.12, 0.15, 0.5],
        [0.35, 0.08, -0.2, 0.45],
      ].map(([x, y, z, size], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[size, 20, 20]} />
          <meshStandardMaterial 
            color={cloudColor} 
            transparent 
            opacity={cloudOpacity}
            roughness={1}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

// Attractive Colonial Building
function Building({ position, size = [1, 1.5, 1], color = '#D4A574' }: {
  position: [number, number, number];
  size?: [number, number, number];
  color?: string;
}) {
  const buildingRef = useRef<Group>(null);
  const { isNight } = useTheme();

  useFrame((state) => {
    if (buildingRef.current && isNight) {
      const time = state.clock.elapsedTime;
      buildingRef.current.children.forEach((child) => {
        if (child instanceof Mesh && child.material) {
          const material = child.material as any;
          if (material.userData?.isWindow) {
            material.emissiveIntensity = 0.6 + Math.sin(time * 0.4) * 0.15;
          }
        }
      });
    }
  });

  const buildingColor = isNight ? '#C8A882' : color;
  const roofColor = isNight ? '#7B4A2A' : '#9B5523';

  return (
    <group ref={buildingRef} position={position} castShadow>
      {/* Foundation */}
      <mesh position={[0, -size[1] * 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[size[0] * 1.08, size[1] * 0.08, size[2] * 1.08]} />
        <meshStandardMaterial color="#6a6a6a" roughness={0.9} />
      </mesh>
      
      {/* Main structure */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={buildingColor}
          roughness={0.65}
          metalness={0.08}
          emissive={isNight ? '#4a3a2a' : '#000000'}
          emissiveIntensity={isNight ? 0.08 : 0}
        />
      </mesh>
      
      {/* Decorative elements */}
      {Array.from({ length: 3 }).map((_, i) => {
        const row = i - 1;
        return (
          <mesh
            key={i}
            position={[
              (i - 1) * size[0] * 0.35,
              row * size[1] * 0.3,
              size[2] / 2 + 0.01,
            ]}
            castShadow
          >
            <boxGeometry args={[size[0] * 0.2, size[1] * 0.2, 0.015]} />
            <meshStandardMaterial 
              color={isNight ? '#A88A6F' : '#C4B494'} 
              roughness={0.7}
            />
          </mesh>
        );
      })}
      
      {/* Attractive roof */}
      <mesh position={[0, size[1] / 2 + 0.35, 0]} castShadow>
        <coneGeometry args={[size[0] * 0.9, 0.45, 4]} />
        <meshStandardMaterial color={roofColor} roughness={0.75} />
      </mesh>
      
      {/* Windows - glowing at night */}
      {[-0.35, 0.35].map((x, i) => (
        <mesh 
          key={i} 
          position={[x, 0.25, size[2] / 2 + 0.01]} 
          castShadow
        >
          <boxGeometry args={[0.22, 0.28, 0.015]} />
          <meshStandardMaterial
            color={isNight ? '#FFE55C' : '#A8D8F0'}
            emissive={isNight ? '#FFE55C' : '#000000'}
            emissiveIntensity={isNight ? 0.9 : 0}
            userData={{ isWindow: true }}
          />
        </mesh>
      ))}
      
      {/* Door */}
      <mesh position={[0, -size[1] * 0.15, size[2] / 2 + 0.01]} castShadow>
        <boxGeometry args={[0.28, 0.55, 0.015]} />
        <meshStandardMaterial color="#754321" roughness={0.6} />
      </mesh>
    </group>
  );
}

// Beautiful Flowers
function Flower({ position }: { position: [number, number, number] }) {
  const flowerRef = useRef<Group>(null);
  const colors = ['#FF6B9D', '#FF8CC8', '#FFB6E1', '#FF7F7F', '#FFD93D', '#98E4FF'];

  useFrame((state) => {
    if (flowerRef.current) {
      const time = state.clock.elapsedTime;
      flowerRef.current.rotation.y = Math.sin(time * 1.5 + position[0]) * 0.1;
      flowerRef.current.position.y = position[1] + Math.sin(time * 2.5) * 0.02;
    }
  });

  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <group ref={flowerRef} position={position}>
      <mesh>
        <cylinderGeometry args={[0.012, 0.018, 0.22, 8]} />
        <meshStandardMaterial color="#32A132" roughness={0.7} />
      </mesh>
      
      {/* Petals - attractive shape */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.08,
              0.11,
              Math.sin(angle) * 0.08,
            ]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.05, 0.04, 0.015]} />
            <meshStandardMaterial color={color} roughness={0.5} />
          </mesh>
        );
      })}
      
      <mesh position={[0, 0.11, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#FFD700" roughness={0.3} />
      </mesh>
    </group>
  );
}

// Beautiful Butterfly
function Butterfly({ position }: { position: [number, number, number] }) {
  const butterflyRef = useRef<Group>(null);

  useFrame((state) => {
    if (butterflyRef.current) {
      const time = state.clock.elapsedTime;
      butterflyRef.current.position.x = position[0] + Math.sin(time) * 1.8;
      butterflyRef.current.position.y = position[1] + Math.sin(time * 1.8) * 0.4;
      butterflyRef.current.position.z = position[2] + Math.cos(time * 0.6) * 1.2;
      butterflyRef.current.rotation.y = Math.sin(time) * 0.4;
      
      butterflyRef.current.children.forEach((child, i) => {
        if (i > 1 && child instanceof Mesh) {
          child.rotation.z = Math.sin(time * 8) * 0.25;
        }
      });
    }
  });

  return (
    <group ref={butterflyRef} position={position}>
      <mesh>
        <cylinderGeometry args={[0.035, 0.045, 0.12, 8]} />
        <meshStandardMaterial color="#FFD700" roughness={0.2} />
      </mesh>
      
      <mesh position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Upper wings - attractive colors */}
      {[-1, 1].map((side) => (
        <mesh
          key={`upper-${side}`}
          position={[side * 0.11, 0.04, 0]}
          rotation={[0, 0, side * 0.15]}
        >
          <planeGeometry args={[0.16, 0.11]} />
          <meshStandardMaterial 
            color={side === -1 ? '#FF6B9D' : '#FF8CC8'} 
            transparent 
            opacity={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
      
      {/* Lower wings */}
      {[-1, 1].map((side) => (
        <mesh
          key={`lower-${side}`}
          position={[side * 0.09, -0.015, 0]}
          rotation={[0, 0, -side * 0.12]}
        >
          <planeGeometry args={[0.13, 0.09]} />
          <meshStandardMaterial 
            color={side === -1 ? '#FFB6E1' : '#FF6B9D'} 
            transparent 
            opacity={0.85}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Attractive Tree
function RealisticTree({ position, type = 'eucalyptus' }: {
  position: [number, number, number];
  type?: 'eucalyptus' | 'pine';
}) {
  const treeRef = useRef<Group>(null);
  const { isNight } = useTheme();

  useFrame((state) => {
    if (treeRef.current) {
      treeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08 + position[0]) * 0.03;
    }
  });

  const trunkColor = '#754321';
  const foliageColor = isNight 
    ? (type === 'eucalyptus' ? '#1a5a1a' : '#1a4a1a')
    : (type === 'eucalyptus' ? '#2A9B2A' : '#3d6026');

  return (
    <group ref={treeRef} position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.11, 0.14, 1.6, 10]} />
        <meshStandardMaterial color={trunkColor} roughness={0.85} />
      </mesh>
      
      {type === 'eucalyptus' ? (
        <>
          {[
            [0, 1.1, 0, 0.65],
            [0.35, 1.3, 0.15, 0.55],
            [-0.3, 1.25, -0.15, 0.5],
            [0.3, 1.4, 0.1, 0.45],
          ].map(([x, y, z, size], i) => (
            <mesh key={i} position={[x, y, z]} castShadow>
              <sphereGeometry args={[size, 14, 14]} />
              <meshStandardMaterial 
                color={i === 0 ? foliageColor : `#${(parseInt(foliageColor.slice(1), 16) + i * 0x080808).toString(16).padStart(6, '0')}`}
                roughness={0.65}
              />
            </mesh>
          ))}
        </>
      ) : (
        <>
          {[0.75, 0.55, 0.35].map((scale, i) => (
            <mesh
              key={i}
              position={[0, 1.1 + i * 0.35, 0]}
              scale={[scale, 1, scale]}
              castShadow
            >
              <coneGeometry args={[0.55, 0.7, 8]} />
              <meshStandardMaterial 
                color={i === 0 ? foliageColor : `#${(parseInt(foliageColor.slice(1), 16) + i * 0x040404).toString(16).padStart(6, '0')}`}
                roughness={0.75}
              />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

// Beautiful Ground
function Ground() {
  const { isNight } = useTheme();
  const groundColor = isNight ? '#1a4a1a' : '#7BA05B';

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80, 24, 24]} />
        <meshStandardMaterial 
          color={groundColor} 
          roughness={0.85} 
          metalness={0.03}
        />
      </mesh>
      
      {/* Subtle grass patches */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 25;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0.008,
              Math.sin(angle) * radius,
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[0.6, 0.6]} />
            <meshStandardMaterial 
              color={isNight ? '#2a5a2a' : '#8CB06C'} 
              roughness={0.85}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Main Ooty Scene Component
export default function OotyScene({ season = 'spring' }: { season?: string }) {
  const { isNight, isDay, isMorning } = useTheme();
  const sceneRef = useRef<Group>(null);

  useFrame((state) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.02) * 0.008;
    }
  });

  // Fog color and density logic
  let fogColor = '#A8D8F8';
  let fogNear = 28, fogFar = 75;
  if (isNight) {
    fogColor = '#181a2a';
    fogNear = 18; fogFar = 55;
  } else if (isMorning) {
    fogColor = '#e0e6ef';
    fogNear = 16; fogFar = 48;
  }
  const skyColor = isNight ? '#0a0a1a' : '#A8D8F8';
  const ambientIntensity = isNight ? 0.3 : 0.65;
  const directionalIntensity = isNight ? 0.5 : 1.3;

  // Seasonal logic
  const isSpring = season === 'spring';
  const isSummer = season === 'summer';
  const isAutumn = season === 'autumn';
  const isWinter = season === 'winter';
  const isFestival = season === 'festival';

  return (
    <group ref={sceneRef}>
      <fog attach="fog" args={[fogColor, fogNear, fogFar]} />
      {/* Sun rays (day) and moonlight beams (night) */}
      {!isNight && !isWinter && (
        // Sun rays: semi-transparent cones from above
        <group>
          {Array.from({ length: 4 }).map((_, i) => (
            <mesh key={i} position={[Math.sin(i * Math.PI / 2) * 2, 8, Math.cos(i * Math.PI / 2) * 2 - 8]} rotation={[-Math.PI / 2.5, 0, i * Math.PI / 2]}>
              <coneGeometry args={[2.2, 7, 32, 1, true]} />
              <meshStandardMaterial color="#fffbe6" transparent opacity={0.13} emissive="#fffbe6" emissiveIntensity={0.18} />
            </mesh>
          ))}
        </group>
      )}
      {isNight && !isWinter && (
        // Moonlight beams: blueish cones from above
        <group>
          {Array.from({ length: 2 }).map((_, i) => (
            <mesh key={i} position={[Math.sin(i * Math.PI) * 2, 8, Math.cos(i * Math.PI) * 2 - 8]} rotation={[-Math.PI / 2.5, 0, i * Math.PI]}>
              <coneGeometry args={[1.7, 6, 32, 1, true]} />
              <meshStandardMaterial color="#bcd7ff" transparent opacity={0.11} emissive="#bcd7ff" emissiveIntensity={0.13} />
            </mesh>
          ))}
        </group>
      )}
      {/* Winter: snowflakes */}
      {isWinter && (
        <group>
          {Array.from({ length: 40 }).map((_, i) => {
            const x = (Math.random() - 0.5) * 24;
            const y = 5 + Math.random() * 7;
            const z = (Math.random() - 0.5) * 18 - 6;
            return (
              <mesh key={i} position={[x, y, z]}>
                <sphereGeometry args={[0.08 + Math.random() * 0.04, 8, 8]} />
                <meshStandardMaterial color="#fff" transparent opacity={0.85} />
              </mesh>
            );
          })}
        </group>
      )}
      
      {/* Enhanced Lighting */}
        {/* Falling petals (spring/day), leaves (autumn/night), or confetti (festival) */}
        {isSpring && !isNight && (
          <AnimatedParticles
            count={28}
            type="petal"
            colors={["#FFB6E1", "#FFD93D", "#FF8CC8", "#FF6B9D"]}
            sizeRange={[0.11, 0.18]}
            shape="plane"
          />
        )}
        {isAutumn && isNight && (
          <AnimatedParticles
            count={18}
            type="leaf"
            colors={["#A0522D", "#FFD700", "#8B5C2A", "#D2691E"]}
            sizeRange={[0.11, 0.18]}
            shape="plane"
          />
        )}
        {isWinter && (
          <AnimatedParticles
            count={40}
            type="snow"
            colors={["#fff"]}
            sizeRange={[0.09, 0.13]}
            shape="sphere"
          />
        )}
        {isFestival && (
          <AnimatedParticles
            count={32}
            type="confetti"
            colors={["#FFD700", "#FF69B4", "#00CFFF", "#FF8C00", "#ADFF2F"]}
            sizeRange={[0.09, 0.13]}
            shape="sphere"
          />
        )}
        {isSummer && (
          <AnimatedParticles
            count={18}
            type="pollen"
            colors={["#FFFACD", "#FFD700", "#FFF8DC"]}
            sizeRange={[0.07, 0.11]}
            shape="sphere"
          />
        )}
      <ambientLight intensity={ambientIntensity} color={isNight ? '#5a5a7a' : '#ffffff'} />
      <directionalLight
        position={isNight ? [-10, 9, -10] : [10, 13, 5]}
        intensity={directionalIntensity}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        color={isNight ? '#5a6a9a' : '#ffffff'}
      />
      {isNight && (
        <>
          <pointLight position={[0, 11, 0]} intensity={0.35} color="#ffffff" />
          <pointLight position={[-9, 5, -9]} intensity={0.2} color="#FFB84D" />
          <pointLight position={[9, 5, -9]} intensity={0.2} color="#FFB84D" />
        </>
      )}
      <pointLight position={[-22, 9, -22]} intensity={isNight ? 0.15 : 0.12} color="#FFE55C" />
      
      <color attach="background" args={[skyColor]} />
      
      <Ground />
      
      {/* Background Mountains - refined */}
      <Mountain position={[-18, 1.8, -30]} scale={[1.8, 3, 1.8]} color={isNight ? '#3a4a5a' : '#6A8C79'} />
      <Mountain position={[18, 1.6, -30]} scale={[1.6, 2.8, 1.6]} color={isNight ? '#4a5a6a' : '#7A9C89'} />
      <Mountain position={[0, 2.2, -35]} scale={[2.2, 4, 2.2]} color={isNight ? '#2a3a4a' : '#5A7C69'} />
      
      {/* Mid-ground Hills */}
      <Mountain position={[-12, 1, -18]} scale={[1, 2, 1]} color={isNight ? '#4a5a6a' : '#6A9C79'} />
      <Mountain position={[12, 1.2, -18]} scale={[1.2, 2.3, 1.2]} color={isNight ? '#5a6a7a' : '#7AAC89'} />
      
      {/* Tea Gardens */}
      <TeaGarden position={[-15, 0.4, -6]} />
      <TeaGarden position={[15, 0.4, -6]} />
      <TeaGarden position={[-8, 0.4, -4]} />
      <TeaGarden position={[8, 0.4, -4]} />
      
      {/* Buildings */}
      <Building position={[-10, 0.75, 4]} size={[1.4, 1.9, 1.4]} color={isNight ? '#C8A882' : '#D4A574'} />
      <Building position={[10, 0.75, 4]} size={[1.1, 1.7, 1.1]} color={isNight ? '#D8B892' : '#E4B584'} />
      <Building position={[-5, 0.75, 6]} size={[0.95, 1.4, 0.95]} color={isNight ? '#B8946F' : '#C49464'} />
      <Building position={[5, 0.75, 6]} size={[0.85, 1.3, 0.85]} color={isNight ? '#C8A882' : '#D4A574'} />
      
      <Lake />
      
      {/* Clouds */}
      <Cloud position={[-20, 6, -20]} />
      <Cloud position={[20, 5.5, -22]} />
      <Cloud position={[0, 7, -28]} />
      <Cloud position={[-12, 6, -14]} />
      <Cloud position={[12, 6, -16]} />
      
      {/* Trees */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 11 + Math.random() * 4;
        const treeType = Math.random() > 0.5 ? 'eucalyptus' : 'pine';
        
        return (
          <RealisticTree
            key={i}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius - 2,
            ]}
            type={treeType}
          />
        );
      })}
      
      {/* Flowers */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * 7;
        return (
          <Flower
            key={i}
            position={[
              Math.cos(angle) * radius,
              0.12,
              Math.sin(angle) * radius - 1,
            ]}
          />
        );
      })}
      
      {/* Butterflies */}
      <Butterfly position={[-6, 2.5, -4]} />
      <Butterfly position={[6, 2.8, -6]} />
      <Butterfly position={[0, 2.2, -3]} />
      
      {/* Path */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.5, 25, 6, 24]} />
        <meshStandardMaterial color={isNight ? '#7B6B5B' : '#9B8365'} roughness={0.9} />
      </mesh>
      
      {/* Stars */}
      {isNight && Array.from({ length: 60 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const elevation = Math.random() * Math.PI * 0.35 + Math.PI * 0.25;
        const distance = 32 + Math.random() * 12;
        const size = 0.025 + Math.random() * 0.03;
        return (
          <mesh
            key={i}
            position={[
              Math.sin(elevation) * Math.cos(angle) * distance,
              Math.cos(elevation) * distance,
              Math.sin(elevation) * Math.sin(angle) * distance - 10,
            ]}
          >
            <sphereGeometry args={[size, 8, 8]} />
            <meshStandardMaterial 
              color="#FFFFFF" 
              emissive="#FFFFFF" 
              emissiveIntensity={0.7 + Math.random() * 0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}
