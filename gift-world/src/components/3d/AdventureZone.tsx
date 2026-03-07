'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Sky, Environment } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

type Vec3 = [number, number, number];

// Realistic Rock Climbing Wall with texture
function ClimbingWall({ position }: { position: Vec3 }) {
  const [showInfo, setShowInfo] = useState(false);
  
  // Generate random rock texture bumps
  const rockBumps = useMemo(() => {
    const bumps = [];
    for (let i = 0; i < 50; i++) {
      bumps.push({
        x: (Math.random() - 0.5) * 3.5,
        y: (Math.random() - 0.5) * 4.5,
        z: Math.random() * 0.3,
        scale: 0.1 + Math.random() * 0.2,
      });
    }
    return bumps;
  }, []);

  return (
    <group position={position}>
      {/* Main rock wall surface */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4.0, 5.0, 0.5]} />
        <meshStandardMaterial color="#6a6055" roughness={0.9} />
      </mesh>

      {/* Rock texture bumps */}
      {rockBumps.map((bump, idx) => (
        <mesh key={idx} position={[bump.x, bump.y, bump.z]} castShadow>
          <sphereGeometry args={[bump.scale, 8, 8]} />
          <meshStandardMaterial color="#7a7065" roughness={0.95} />
        </mesh>
      ))}

      {/* Climbing holds - realistic colors */}
      {Array.from({ length: 35 }).map((_, idx) => {
        const row = Math.floor(idx / 7);
        const col = idx % 7;
        const x = (col - 3) * 0.5 + (Math.random() - 0.5) * 0.3;
        const y = (row - 2) * 0.8 + (Math.random() - 0.5) * 0.4;
        const colors = ['#ff4444', '#00aaff', '#ffaa00', '#44ff44', '#ff00ff', '#00ffff'];
        
        return (
          <group key={idx} position={[x, y, 0.3]}>
            <mesh castShadow receiveShadow>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial 
                color={colors[idx % colors.length]} 
                roughness={0.6} 
                metalness={0.1} 
              />
            </mesh>
            {/* Bolt */}
            <mesh position={[0, 0, -0.05]} castShadow>
              <cylinderGeometry args={[0.015, 0.015, 0.1, 8]} />
              <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.8} />
            </mesh>
          </group>
        );
      })}

      {/* Safety mat at bottom */}
      <mesh position={[0, -2.6, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 0.3, 1.5]} />
        <meshStandardMaterial color="#2a4a6a" roughness={0.7} />
      </mesh>

      {/* Interaction hotspot */}
      <mesh
        position={[0, 0, 0.5]}
        onClick={() => setShowInfo(!showInfo)}
        visible={false}
      >
        <boxGeometry args={[4.0, 5.0, 1.0]} />
      </mesh>

      {showInfo && (
        <Html position={[0, 3, 1]} center>
          <div style={{
            background: 'rgba(0,0,0,0.9)',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            whiteSpace: 'nowrap',
            border: '1px solid #ff4444',
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Rock Climbing Wall</div>
            <div style={{ fontSize: '11px', color: '#aaa' }}>35 holds | 5m height | All skill levels</div>
            <button
              onClick={(e) => { e.stopPropagation(); setShowInfo(false); }}
              style={{
                marginTop: '8px',
                background: '#ff4444',
                color: '#fff',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px',
              }}
            >
              Close
            </button>
          </div>
        </Html>
      )}
    </group>
  );
}

// Zip Line Tower with realistic structure
function ZipLineTower({ position, height = 4.0 }: { position: Vec3, height?: number }) {
  return (
    <group position={position}>
      {/* Main support beams - 4 legs */}
      {[[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]].map(([x, z], idx) => (
        <mesh key={idx} position={[x, height / 2, z]} castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.1, height, 8]} />
          <meshStandardMaterial color="#8b6f47" roughness={0.6} />
        </mesh>
      ))}

      {/* Cross braces */}
      {[0.5, 1.5, 2.5, 3.5].map((y, idx) => (
        <group key={idx}>
          <mesh position={[0, y, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
            <meshStandardMaterial color="#8b6f47" roughness={0.6} />
          </mesh>
          <mesh position={[0, y, 0]} rotation={[0, Math.PI / 2, Math.PI / 4]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
            <meshStandardMaterial color="#8b6f47" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Platform at top */}
      <mesh position={[0, height, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.08, 1.0]} />
        <meshStandardMaterial color="#6a5a3a" roughness={0.7} />
      </mesh>

      {/* Safety railing */}
      {[[-0.5, 0], [0.5, 0], [0, -0.5], [0, 0.5]].map(([x, z], idx) => (
        <mesh key={idx} position={[x, height + 0.4, z]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
          <meshStandardMaterial color="#888888" roughness={0.4} metalness={0.7} />
        </mesh>
      ))}

      {/* Pulley system at top */}
      <mesh position={[0, height + 0.2, 0.4]} castShadow>
        <torusGeometry args={[0.08, 0.03, 8, 16]} />
        <meshStandardMaterial color="#444444" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

// Zip Line Cable between two points
function ZipLineCable({ start, end }: { start: Vec3, end: Vec3 }) {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const mid = new THREE.Vector3(
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2 - 0.4, // Sag in the middle
    (start[2] + end[2]) / 2
  );

  const curve = new THREE.QuadraticBezierCurve3(startVec, mid, endVec);
  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: '#444444' });
  const line = new THREE.Line(geometry, material);

  // Handlebar trolley
  const trolleyRef = useRef<THREE.Group>(null);
  const [trolleyPos] = useState(0.3);

  return (
    <group>
      <primitive object={line} />
      
      {/* Trolley handlebar */}
      <group ref={trolleyRef} position={curve.getPoint(trolleyPos).toArray()}>
        <mesh castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
          <meshStandardMaterial color="#ff4444" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.05, 0.08, 0.05]} />
          <meshStandardMaterial color="#222222" roughness={0.4} metalness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

// Rope Bridge with wooden planks
function RopeBridge({ position, length = 3.0 }: { position: Vec3, length?: number }) {
  const planks = Math.floor(length * 3);

  return (
    <group position={position}>
      {/* Rope sides */}
      {[-0.4, 0.4].map((x, idx) => (
        <mesh key={idx} position={[x, 0, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, length, 8]} />
          <meshStandardMaterial color="#8b6f47" roughness={0.8} />
        </mesh>
      ))}

      {/* Rope handrails */}
      {[-0.4, 0.4].map((x, idx) => (
        <mesh key={`rail-${idx}`} position={[x, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, length, 8]} />
          <meshStandardMaterial color="#8b6f47" roughness={0.8} />
        </mesh>
      ))}

      {/* Wooden planks */}
      {Array.from({ length: planks }).map((_, idx) => {
        const z = (idx - planks / 2) * (length / planks);
        return (
          <mesh key={idx} position={[0, -0.05, z]} rotation={[0, 0, (Math.random() - 0.5) * 0.1]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.05, 0.25]} />
            <meshStandardMaterial color="#6a5a3a" roughness={0.7} />
          </mesh>
        );
      })}

      {/* Vertical rope supports */}
      {Array.from({ length: Math.floor(planks / 3) }).map((_, idx) => {
        const z = (idx - planks / 6) * (length / (planks / 3));
        return (
          <group key={idx}>
            {[-0.4, 0.4].map((x, sidx) => (
              <mesh key={sidx} position={[x, 0.4, z]} castShadow>
                <cylinderGeometry args={[0.01, 0.01, 0.8, 6]} />
                <meshStandardMaterial color="#8b6f47" roughness={0.8} />
              </mesh>
            ))}
          </group>
        );
      })}
    </group>
  );
}

// Tree Platform
function TreePlatform({ position, radius = 0.6 }: { position: Vec3, radius?: number }) {
  return (
    <group position={position}>
      {/* Tree trunk */}
      <mesh position={[0, -1.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.4, 3.0, 12]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.8} />
      </mesh>

      {/* Tree bark texture */}
      {Array.from({ length: 20 }).map((_, idx) => {
        const angle = (idx / 20) * Math.PI * 2;
        const y = -3.0 + (idx % 10) * 0.3;
        return (
          <mesh key={idx} position={[Math.cos(angle) * 0.36, y, Math.sin(angle) * 0.36]} castShadow>
            <boxGeometry args={[0.1, 0.15, 0.05]} />
            <meshStandardMaterial color="#3a2a1a" roughness={0.9} />
          </mesh>
        );
      })}

      {/* Wooden platform */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, 0.1, 16]} />
        <meshStandardMaterial color="#6a5a3a" roughness={0.7} />
      </mesh>

      {/* Platform planks detail */}
      {Array.from({ length: 8 }).map((_, idx) => {
        const angle = (idx / 8) * Math.PI * 2;
        return (
          <mesh key={idx} position={[0, 0.06, 0]} rotation={[0, angle, 0]} castShadow>
            <boxGeometry args={[radius * 2, 0.04, 0.15]} />
            <meshStandardMaterial color="#5a4a2a" roughness={0.7} />
          </mesh>
        );
      })}

      {/* Safety railing */}
      {Array.from({ length: 12 }).map((_, idx) => {
        const angle = (idx / 12) * Math.PI * 2;
        return (
          <mesh key={idx} position={[Math.cos(angle) * radius, 0.4, Math.sin(angle) * radius]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
            <meshStandardMaterial color="#6a5a3a" roughness={0.6} />
          </mesh>
        );
      })}

      {/* Tree canopy (simplified) */}
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.0, 8, 8]} />
        <meshStandardMaterial color="#2a5a2a" roughness={0.8} />
      </mesh>
      {Array.from({ length: 5 }).map((_, idx) => {
        const angle = (idx / 5) * Math.PI * 2;
        return (
          <mesh key={idx} position={[Math.cos(angle) * 0.7, 2.2, Math.sin(angle) * 0.7]} castShadow>
            <sphereGeometry args={[0.6, 8, 8]} />
            <meshStandardMaterial color="#3a6a3a" roughness={0.8} />
          </mesh>
        );
      })}
    </group>
  );
}

// Cargo Net Climbing Structure
function CargoNet({ position, size = [2.0, 3.0] }: { position: Vec3, size?: [number, number] }) {
  const cols = Math.floor(size[0] * 4);
  const rows = Math.floor(size[1] * 3);

  return (
    <group position={position}>
      {/* Frame */}
      {[
        [0, size[1] / 2, 0, 0, 0, 0], // Top
        [0, -size[1] / 2, 0, 0, 0, 0], // Bottom
        [-size[0] / 2, 0, 0, 0, 0, Math.PI / 2], // Left
        [size[0] / 2, 0, 0, 0, 0, Math.PI / 2], // Right
      ].map((props, idx) => (
        <mesh key={idx} position={[props[0], props[1], props[2]]} rotation={[props[3], props[4], props[5]]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, size[0], 8]} />
          <meshStandardMaterial color="#888888" roughness={0.4} metalness={0.7} />
        </mesh>
      ))}

      {/* Net rope - horizontal */}
      {Array.from({ length: rows }).map((_, row) => {
        const y = (row / (rows - 1) - 0.5) * size[1];
        return (
          <mesh key={`h-${row}`} position={[0, y, 0]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, size[0] - 0.2, 6]} />
            <meshStandardMaterial color="#6a5a3a" roughness={0.8} />
          </mesh>
        );
      })}

      {/* Net rope - vertical */}
      {Array.from({ length: cols }).map((_, col) => {
        const x = (col / (cols - 1) - 0.5) * size[0];
        return (
          <mesh key={`v-${col}`} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, size[1] - 0.2, 6]} />
            <meshStandardMaterial color="#6a5a3a" roughness={0.8} />
          </mesh>
        );
      })}

      {/* Net intersections (thicker knots) */}
      {Array.from({ length: rows }).map((_, row) => 
        Array.from({ length: cols }).map((_, col) => {
          const x = (col / (cols - 1) - 0.5) * size[0];
          const y = (row / (rows - 1) - 0.5) * size[1];
          return (
            <mesh key={`knot-${row}-${col}`} position={[x, y, 0]} castShadow>
              <sphereGeometry args={[0.025, 6, 6]} />
              <meshStandardMaterial color="#5a4a2a" roughness={0.8} />
            </mesh>
          );
        })
      )}
    </group>
  );
}

// Balance Beam Obstacle
function BalanceBeam({ position, length = 3.0 }: { position: Vec3, length?: number }) {
  return (
    <group position={position}>
      {/* Support posts */}
      {[-length / 2, length / 2].map((x, idx) => (
        <mesh key={idx} position={[x, -0.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.6, 8]} />
          <meshStandardMaterial color="#6a5a3a" roughness={0.7} />
        </mesh>
      ))}

      {/* Main beam */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, length, 12]} />
        <meshStandardMaterial color="#8b7355" roughness={0.7} />
      </mesh>

      {/* Wood grain detail */}
      {Array.from({ length: Math.floor(length * 2) }).map((_, idx) => {
        const x = (idx / (length * 2) - 0.5) * length;
        return (
          <mesh key={idx} position={[x, 0, 0.11]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.105, 0.105, 0.05, 12]} />
            <meshStandardMaterial color="#7a6345" roughness={0.75} />
          </mesh>
        );
      })}
    </group>
  );
}

// Stepping Stones
function SteppingStones({ position }: { position: Vec3 }) {
  const stones = useMemo(() => {
    return Array.from({ length: 8 }).map((_, idx) => ({
      x: (idx - 3.5) * 0.6 + (Math.random() - 0.5) * 0.2,
      y: 0.1,
      z: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * Math.PI,
      radius: 0.25 + Math.random() * 0.1,
    }));
  }, []);

  return (
    <group position={position}>
      {stones.map((stone, idx) => (
        <mesh key={idx} position={[stone.x, stone.y, stone.z]} rotation={[0, stone.rotation, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[stone.radius, stone.radius * 0.9, 0.2, 16]} />
          <meshStandardMaterial color="#5a5a4a" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// Safety Harness Equipment Display
function SafetyEquipment({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      {/* Equipment stand */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.8, 8]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Helmet */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ff4444" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Harness on hook */}
      <group position={[0.2, 0.7, 0]}>
        {[0, 0.1, 0.2].map((y, idx) => (
          <mesh key={idx} position={[0, -y, 0]} castShadow>
            <torusGeometry args={[0.08, 0.015, 8, 12]} />
            <meshStandardMaterial color="#2a2a4a" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* Carabiners */}
      {[-0.15, 0.15].map((x, idx) => (
        <mesh key={idx} position={[x, 0.6, 0.1]} castShadow>
          <torusGeometry args={[0.04, 0.008, 8, 16]} />
          <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// Signage
function AdventureSign({ position, text }: { position: Vec3, text: string }) {
  return (
    <group position={position}>
      {/* Sign post */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 1.4, 8]} />
        <meshStandardMaterial color="#6a5a3a" roughness={0.7} />
      </mesh>

      {/* Sign board */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.3, 0.05]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.6} />
      </mesh>

      <Html position={[0, 1.5, 0.05]} center>
        <div style={{
          background: 'transparent',
          color: '#ffffff',
          padding: '4px 8px',
          fontSize: '10px',
          fontWeight: 'bold',
          textAlign: 'center',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
        }}>
          {text}
        </div>
      </Html>
    </group>
  );
}

// Adventure Zone Soundscape
function AdventureSoundscape() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isNight } = useTheme();

  useEffect(() => {
    // In a real app, you'd have adventure ambience audio (birds, wind, nature sounds)
    const audio = new Audio();
    // audio.src = '/audio/adventure-ambience.mp3';
    audio.loop = true;
    audio.volume = isNight ? 0.15 : 0.25;
    audioRef.current = audio;

    // Uncomment to play:
    // audio.play().catch(() => console.log('Audio autoplay prevented'));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isNight ? 0.15 : 0.25;
    }
  }, [isNight]);

  return null;
}

// Main Adventure Zone Component
export function AdventureZone() {
  const groupRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();

  return (
    <group ref={groupRef}>
      {/* Soundscape */}
      <AdventureSoundscape />

      {/* Sky and Environment */}
      <Sky
        sunPosition={isNight ? [0, -1, 0] : [100, 20, 100]}
        turbidity={8}
        rayleigh={isNight ? 0.5 : 2}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
        inclination={isNight ? 0.6 : 0.49}
        azimuth={0.25}
      />
      <Environment preset={isNight ? "night" : "sunset"} />
      
      {/* Fog for atmosphere */}
      <fog attach="fog" args={[isNight ? '#1a1a2a' : '#c2d5e8', 10, 30]} />

      {/* Enhanced Lighting */}
      <ambientLight intensity={isNight ? 1.2 : 1.8} />
      <hemisphereLight 
        args={['#87CEEB', '#8b7355', isNight ? 1.0 : 1.5]} 
        position={[0, 10, 0]} 
      />
      <directionalLight 
        position={[10, 15, 5]} 
        intensity={isNight ? 1.0 : 2.0} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <directionalLight position={[-10, 12, -5]} intensity={isNight ? 0.6 : 1.0} />

      {/* Spotlights for night illumination */}
      {isNight && (
        <>
          <spotLight position={[-5, 8, 0]} angle={0.6} penumbra={0.5} intensity={3} color="#ffa500" castShadow />
          <spotLight position={[5, 8, 0]} angle={0.6} penumbra={0.5} intensity={3} color="#ffa500" castShadow />
          <spotLight position={[0, 8, -3]} angle={0.6} penumbra={0.5} intensity={2.5} color="#ffa500" castShadow />
        </>
      )}

      {/* GROUND - Natural grass/dirt - Larger area */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[35, 35]} />
        <meshStandardMaterial color="#5a7a3a" roughness={0.9} />
      </mesh>

      {/* Grass patches - Spread over larger area */}
      {Array.from({ length: 50 }).map((_, idx) => {
        const x = (Math.random() - 0.5) * 28;
        const z = (Math.random() - 0.5) * 28;
        const radius = 0.3 + Math.random() * 0.5;
        return (
          <mesh key={idx} position={[x, 0.01, z]} rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]} receiveShadow>
            <circleGeometry args={[radius, 8]} />
            <meshStandardMaterial color="#4a6a2a" roughness={0.95} />
          </mesh>
        );
      })}

      {/* Dirt paths - Better distributed */}
      {[[0, 0], [4, 3], [-5, 2], [3, -2], [-3, -2]].map(([x, z], idx) => (
        <mesh key={idx} position={[x, 0.005, z]} rotation={[-Math.PI / 2, 0, Math.random() * 0.3]} receiveShadow>
          <circleGeometry args={[1.5, 16]} />
          <meshStandardMaterial color="#6a5a3a" roughness={0.9} />
        </mesh>
      ))}

      {/* Rock Climbing Wall - Far left */}
      <ClimbingWall position={[-7, 2.5, -3.5]} />

      {/* Zip Line System - Well spaced diagonal */}
      <ZipLineTower position={[-5.5, 0, 4]} height={4.5} />
      <ZipLineTower position={[6, 0, -3.5]} height={3.0} />
      <ZipLineCable start={[-5.5, 4.5, 4]} end={[6, 3.0, -3.5]} />

      {/* Tree Platforms Network - More spread out */}
      <TreePlatform position={[-3, 2, -0.5]} radius={0.7} />
      <TreePlatform position={[3.5, 2.2, 2]} radius={0.6} />
      <TreePlatform position={[0, 2.5, -2.5]} radius={0.65} />

      {/* Rope Bridges connecting platforms - Adjusted for new positions */}
      <RopeBridge position={[-1.5, 2, -1]} length={3.0} />
      <RopeBridge position={[1.75, 2.2, -0.25]} length={3.5} />

      {/* Cargo Net Climbing - Far right front */}
      <CargoNet position={[6.5, 1.5, 3]} size={[2.0, 3.0]} />

      {/* Ground Level Obstacles - Better spacing */}
      <BalanceBeam position={[-1.5, 0.3, 3.5]} length={3.5} />
      <SteppingStones position={[-4, 0, 1.5]} />
      <BalanceBeam position={[3.5, 0.4, -0.5]} length={2.5} />

      {/* Safety Equipment Station - Well spaced at entry points */}
      <SafetyEquipment position={[-7, 0, 5]} />
      <SafetyEquipment position={[7, 0, 5]} />

      {/* Signage - Clear spacing */}
      <AdventureSign position={[-7.5, 0, 5.5]} text="HARNESS\nREQUIRED" />
      <AdventureSign position={[0, 0, 5.5]} text="ADVENTURE\nPARK" />
      <AdventureSign position={[7.5, 0, 5.5]} text="SAFETY\nFIRST" />

      {/* Boundary Trees for depth - Further out */}
      {Array.from({ length: 20 }).map((_, idx) => {
        const angle = (idx / 20) * Math.PI * 2;
        const distance = 12 + Math.random() * 2;
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;
        return (
          <group key={idx} position={[x, 0, z]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.3, 0.35, 5, 8]} />
              <meshStandardMaterial color="#3a2a1a" roughness={0.9} />
            </mesh>
            <mesh position={[0, 4, 0]} castShadow>
              <sphereGeometry args={[1.5, 8, 8]} />
              <meshStandardMaterial color="#2a4a2a" roughness={0.9} opacity={0.8} transparent />
            </mesh>
          </group>
        );
      })}

      {/* Light posts for nighttime - Better coverage */}
      {[[-6, 0, 0], [6, 0, 0], [0, 0, -4], [0, 0, 4], [-4, 0, 3], [4, 0, 3]].map((pos, idx) => (
        <group key={idx} position={pos as Vec3}>
          <mesh position={[0, 2, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.06, 4, 8]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, 4.2, 0]} castShadow>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              color={isNight ? "#ffa500" : "#888888"} 
              emissive="#ffa500"
              emissiveIntensity={isNight ? 0.8 : 0.1}
            />
          </mesh>
          {isNight && (
            <pointLight position={[0, 4.2, 0]} color="#ffa500" intensity={2} distance={6} />
          )}
        </group>
      ))}

      {/* Safety netting visible between platforms - Larger coverage */}
      <mesh position={[0, 1, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial 
          color="#ffffff" 
          opacity={0.15} 
          transparent 
          side={THREE.DoubleSide}
          roughness={0.8} 
        />
      </mesh>
    </group>
  );
}
