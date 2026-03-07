'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

type Vec3 = [number, number, number];

// Market Stall with Canopy
function MarketStall({ 
  position, 
  canopyColor = '#ff6600',
  products,
  stallName 
}: { 
  position: Vec3, 
  canopyColor?: string,
  products: 'fruits' | 'vegetables' | 'spices' | 'textiles' | 'flowers' | 'crafts',
  stallName: string
}) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <group position={position}>
      {/* Wooden frame posts */}
      {[[-0.6, 0], [0.6, 0], [-0.6, -0.8], [0.6, -0.8]].map((pos, idx) => (
        <mesh key={idx} position={[pos[0], 1.0, pos[1]]} castShadow>
          <cylinderGeometry args={[0.04, 0.05, 2.0, 8]} />
          <meshStandardMaterial color="#6a5a3a" roughness={0.7} />
        </mesh>
      ))}

      {/* Canopy fabric */}
      <mesh position={[0, 2.05, -0.4]} rotation={[-0.2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.02, 1.0]} />
        <meshStandardMaterial color={canopyColor} roughness={0.8} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Canopy support ribs */}
      {[-0.5, 0, 0.5].map((x, idx) => (
        <mesh key={idx} position={[x, 2.0, -0.4]} rotation={[-0.2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 1.0, 6]} />
          <meshStandardMaterial color="#4a3a2a" roughness={0.6} />
        </mesh>
      ))}

      {/* Display table */}
      <mesh position={[0, 0.75, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
        <meshStandardMaterial color="#6a5a3a" roughness={0.7} />
      </mesh>
      
      {/* Table legs */}
      {[[-0.5, -0.35], [0.5, -0.35], [-0.5, -0.75], [0.5, -0.75]].map((pos, idx) => (
        <mesh key={idx} position={[pos[0], 0.4, pos[1]]} castShadow>
          <cylinderGeometry args={[0.03, 0.04, 0.8, 8]} />
          <meshStandardMaterial color="#5a4a2a" roughness={0.7} />
        </mesh>
      ))}

      {/* Under-table storage crates */}
      {[-0.3, 0.3].map((x, idx) => (
        <mesh key={idx} position={[x, 0.15, -0.4]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#4a3a2a" roughness={0.8} />
        </mesh>
      ))}

      {/* Products based on type */}
      {products === 'fruits' && (
        <>
          {/* Wooden crates with fruits */}
          {[[-0.35, -0.5], [0, -0.5], [0.35, -0.5], [-0.35, -0.2], [0, -0.2], [0.35, -0.2]].map((pos, idx) => {
            const colors = ['#ff3333', '#ff8800', '#ffdd00', '#88ff00', '#8800ff', '#ff0088'];
            return (
              <group key={idx} position={[pos[0], 0.78, pos[1]]}>
                {/* Fruit pile */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <mesh key={i} position={[(Math.random() - 0.5) * 0.08, i * 0.04, (Math.random() - 0.5) * 0.08]} castShadow>
                    <sphereGeometry args={[0.03, 8, 8]} />
                    <meshStandardMaterial color={colors[idx % colors.length]} roughness={0.6} />
                  </mesh>
                ))}
              </group>
            );
          })}
        </>
      )}

      {products === 'vegetables' && (
        <>
          {/* Vegetable baskets */}
          {[[-0.35, -0.5], [0, -0.5], [0.35, -0.5]].map((pos, idx) => (
            <group key={idx} position={[pos[0], 0.78, pos[1]]}>
              {/* Basket */}
              <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.08, 0.06, 0.06, 12]} />
                <meshStandardMaterial color="#8b6f47" roughness={0.8} />
              </mesh>
              {/* Vegetables */}
              {Array.from({ length: 5 }).map((_, i) => {
                const colors = ['#228b22', '#ff6347', '#ff8c00', '#9370db', '#ffd700'];
                return (
                  <mesh key={i} position={[(Math.random() - 0.5) * 0.06, 0.06 + i * 0.02, (Math.random() - 0.5) * 0.06]} castShadow>
                    <sphereGeometry args={[0.025, 8, 8]} />
                    <meshStandardMaterial color={colors[idx % colors.length]} roughness={0.7} />
                  </mesh>
                );
              })}
            </group>
          ))}
        </>
      )}

      {products === 'spices' && (
        <>
          {/* Spice bowls and sacks */}
          {[[-0.35, -0.5], [-0.15, -0.5], [0.05, -0.5], [0.25, -0.5], [-0.35, -0.2], [-0.15, -0.2], [0.05, -0.2], [0.25, -0.2]].map((pos, idx) => (
            <group key={idx} position={[pos[0], 0.78, pos[1]]}>
              {/* Bowl */}
              <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.05, 0.04, 0.04, 12]} />
                <meshStandardMaterial color="#d4a574" roughness={0.5} />
              </mesh>
              {/* Spice pile */}
              <mesh position={[0, 0.025, 0]} castShadow>
                <cylinderGeometry args={[0.045, 0.04, 0.02, 12]} />
                <meshStandardMaterial 
                  color={['#ff0000', '#ffaa00', '#ffff00', '#00aa00', '#8b4513', '#ff6347', '#ffd700', '#dc143c'][idx % 8]} 
                  roughness={0.9} 
                />
              </mesh>
            </group>
          ))}
        </>
      )}

      {products === 'textiles' && (
        <>
          {/* Fabric bolts and stacks */}
          {[[-0.4, -0.5], [-0.1, -0.5], [0.2, -0.5]].map((pos, idx) => (
            <group key={idx} position={[pos[0], 0.8, pos[1]]}>
              {Array.from({ length: 4 }).map((_, i) => (
                <mesh key={i} position={[0, i * 0.04, 0]} rotation={[0, (i * Math.PI) / 4, 0]} castShadow>
                  <boxGeometry args={[0.25, 0.03, 0.15]} />
                  <meshStandardMaterial 
                    color={['#ff1493', '#00ffff', '#ff6600', '#9370db', '#ffd700', '#00ff00'][Math.floor(Math.random() * 6)]} 
                    roughness={0.7} 
                  />
                </mesh>
              ))}
            </group>
          ))}
          {/* Hanging fabrics */}
          {[-0.3, 0, 0.3].map((x, idx) => (
            <mesh key={idx} position={[x, 1.5, -0.8]} castShadow>
              <boxGeometry args={[0.15, 0.6, 0.02]} />
              <meshStandardMaterial 
                color={['#dc143c', '#4169e1', '#ffd700'][idx]} 
                roughness={0.8} 
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </>
      )}

      {products === 'flowers' && (
        <>
          {/* Flower buckets */}
          {[[-0.35, -0.5], [0, -0.5], [0.35, -0.5], [-0.35, -0.2], [0, -0.2], [0.35, -0.2]].map((pos, idx) => (
            <group key={idx} position={[pos[0], 0.78, pos[1]]}>
              {/* Bucket */}
              <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.06, 0.05, 0.12, 12]} />
                <meshStandardMaterial color="#888888" roughness={0.4} metalness={0.6} />
              </mesh>
              {/* Flowers */}
              {Array.from({ length: 5 }).map((_, i) => {
                const angle = (i / 5) * Math.PI * 2;
                const colors = ['#ff1493', '#ff6347', '#ffd700', '#9370db', '#00ffff', '#00ff00'];
                return (
                  <group key={i} position={[Math.cos(angle) * 0.03, 0.08, Math.sin(angle) * 0.03]}>
                    <mesh position={[0, 0.06, 0]} castShadow>
                      <cylinderGeometry args={[0.002, 0.002, 0.12, 6]} />
                      <meshStandardMaterial color="#2a5a2a" roughness={0.8} />
                    </mesh>
                    <mesh position={[0, 0.13, 0]} castShadow>
                      <sphereGeometry args={[0.015, 8, 8]} />
                      <meshStandardMaterial color={colors[idx % colors.length]} roughness={0.5} />
                    </mesh>
                  </group>
                );
              })}
            </group>
          ))}
        </>
      )}

      {products === 'crafts' && (
        <>
          {/* Pottery and handicrafts */}
          {[[-0.35, -0.5], [0, -0.5], [0.35, -0.5], [-0.35, -0.2], [0, -0.2], [0.35, -0.2]].map((pos, idx) => (
            <mesh key={idx} position={[pos[0], 0.82, pos[1]]} castShadow receiveShadow>
              <cylinderGeometry args={[0.04, 0.03, 0.08, 12]} />
              <meshStandardMaterial 
                color={['#8b4513', '#d2691e', '#daa520', '#cd853f', '#b8860b', '#a0522d'][idx % 6]} 
                roughness={0.6} 
              />
            </mesh>
          ))}
        </>
      )}

      {/* Price sign */}
      <group position={[0.5, 1.4, -0.3]}>
        <mesh castShadow>
          <boxGeometry args={[0.25, 0.15, 0.02]} />
          <meshStandardMaterial color="#fffacd" roughness={0.5} />
        </mesh>
        <Html position={[0, 0, 0.02]} center>
          <div style={{
            background: 'transparent',
            color: '#000',
            fontSize: '8px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
            {stallName}
          </div>
        </Html>
      </group>

      {/* Interaction hotspot */}
      <mesh
        position={[0, 1.0, -0.4]}
        onClick={() => setShowInfo(!showInfo)}
        visible={false}
      >
        <boxGeometry args={[1.4, 2.0, 1.0]} />
      </mesh>

      {showInfo && (
        <Html position={[0, 2.5, 0]} center>
          <div style={{
            background: 'rgba(0,0,0,0.9)',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            whiteSpace: 'nowrap',
            border: `2px solid ${canopyColor}`,
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{stallName}</div>
            <div style={{ fontSize: '11px', color: '#aaa' }}>Fresh daily | Local vendors</div>
            <button
              onClick={(e) => { e.stopPropagation(); setShowInfo(false); }}
              style={{
                marginTop: '8px',
                background: canopyColor,
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

// String Lights
function StringLights({ start, end }: { start: Vec3, end: Vec3 }) {
  const { isNight } = useTheme();
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  
  const distance = startVec.distanceTo(endVec);
  const numLights = Math.floor(distance * 3);

  return (
    <group>
      {/* Wire */}
      <mesh position={[(start[0] + end[0]) / 2, (start[1] + end[1]) / 2, (start[2] + end[2]) / 2]}>
        <cylinderGeometry args={[0.005, 0.005, distance, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Light bulbs */}
      {Array.from({ length: numLights }).map((_, idx) => {
        const t = idx / (numLights - 1);
        const pos: Vec3 = [
          start[0] + (end[0] - start[0]) * t,
          start[1] + (end[1] - start[1]) * t - Math.sin(t * Math.PI) * 0.2,
          start[2] + (end[2] - start[2]) * t
        ];
        const colors = ['#ffff00', '#ff6600', '#ff1493', '#00ffff', '#00ff00'];
        
        return (
          <group key={idx} position={pos}>
            <mesh castShadow>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial 
                color={colors[idx % colors.length]} 
                emissive={colors[idx % colors.length]}
                emissiveIntensity={isNight ? 0.6 : 0.2}
                roughness={0.3} 
              />
            </mesh>
            {isNight && (
              <pointLight 
                color={colors[idx % colors.length]} 
                intensity={0.3} 
                distance={1.5} 
              />
            )}
          </group>
        );
      })}
    </group>
  );
}

// Market Entrance Archway
function MarketArchway({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      {/* Posts */}
      {[-1.5, 1.5].map((x, idx) => (
        <mesh key={idx} position={[x, 1.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.18, 3.0, 12]} />
          <meshStandardMaterial color="#8b6f47" roughness={0.7} />
        </mesh>
      ))}

      {/* Arch top */}
      <mesh position={[0, 3.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.3, 0.3]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.7} />
      </mesh>

      {/* Decorative arch curve */}
      <mesh position={[0, 3.15, 0]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[1.6, 0.08, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#daa520" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Sign */}
      <mesh position={[0, 3.2, 0]} castShadow>
        <boxGeometry args={[2.0, 0.4, 0.05]} />
        <meshStandardMaterial color="#f5deb3" roughness={0.5} />
      </mesh>

      <Html position={[0, 3.2, 0.05]} center>
        <div style={{
          background: 'transparent',
          color: '#8b4513',
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center',
          fontFamily: 'serif',
        }}>
          BAZAAR
        </div>
      </Html>
    </group>
  );
}

// Wooden Barrel Decoration
function WoodenBarrel({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.18, 0.4, 16]} />
        <meshStandardMaterial color="#6a5a3a" roughness={0.8} />
      </mesh>
      {/* Metal bands */}
      {[0.15, 0, -0.15].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]} castShadow>
          <cylinderGeometry args={[0.21, 0.21, 0.03, 16]} />
          <meshStandardMaterial color="#555555" roughness={0.4} metalness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// Potted Plant
function PottedPlant({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      {/* Pot */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.08, 0.15, 12]} />
        <meshStandardMaterial color="#8b4513" roughness={0.7} />
      </mesh>
      {/* Plant */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.06, 0.15, Math.sin(angle) * 0.06]} castShadow>
            <coneGeometry args={[0.04, 0.15, 6]} />
            <meshStandardMaterial color="#2a5a2a" roughness={0.8} />
          </mesh>
        );
      })}
    </group>
  );
}

// Market Cart
function MarketCart({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      {/* Cart body */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.3, 0.4]} />
        <meshStandardMaterial color="#6a5a3a" roughness={0.7} />
      </mesh>
      
      {/* Handle */}
      <mesh position={[-0.35, 0.4, 0]} rotation={[0, 0, -0.3]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.6} />
      </mesh>

      {/* Wheels */}
      {[[-0.2, -0.15], [0.2, -0.15], [-0.2, 0.15], [0.2, 0.15]].map((pos, idx) => (
        <mesh key={idx} position={[pos[0], 0.08, pos[1]]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 12]} />
          <meshStandardMaterial color="#3a2a1a" roughness={0.6} />
        </mesh>
      ))}

      {/* Goods in cart */}
      {[-0.1, 0.1].map((x, idx) => (
        <mesh key={idx} position={[x, 0.5, 0]} castShadow>
          <boxGeometry args={[0.2, 0.15, 0.15]} />
          <meshStandardMaterial color={['#8b4513', '#daa520'][idx]} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// Seating Area Bench
function MarketBench({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      {/* Seat */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.08, 0.4]} />
        <meshStandardMaterial color="#6a5a3a" roughness={0.7} />
      </mesh>
      
      {/* Backrest */}
      <mesh position={[0, 0.7, -0.18]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.5, 0.08]} />
        <meshStandardMaterial color="#6a5a3a" roughness={0.7} />
      </mesh>

      {/* Legs */}
      {[[-0.6, 0.15], [0.6, 0.15], [-0.6, -0.15], [0.6, -0.15]].map((pos, idx) => (
        <mesh key={idx} position={[pos[0], 0.2, pos[1]]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
          <meshStandardMaterial color="#5a4a2a" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// Market Soundscape
function MarketSoundscape() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isNight } = useTheme();

  useEffect(() => {
    const audio = new Audio();
    // audio.src = '/audio/market-ambience.mp3';
    audio.loop = true;
    audio.volume = isNight ? 0.2 : 0.35;
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
      audioRef.current.volume = isNight ? 0.2 : 0.35;
    }
  }, [isNight]);

  return null;
}

// Main Indoor Market Hall Component
export function OutdoorMarket() {
  const groupRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();

  return (
    <group ref={groupRef}>
      {/* Soundscape */}
      <MarketSoundscape />

      {/* INDOOR MARKET HALL ARCHITECTURE */}
      
      {/* Floor - Polished tiles */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#c9b89f" roughness={0.5} />
      </mesh>

      {/* Floor tile pattern */}
      {Array.from({ length: 96 }).map((_, idx) => {
        const x = (idx % 12 - 6) * 2;
        const z = (Math.floor(idx / 12) - 4) * 2;
        return (
          <mesh key={idx} position={[x, 0.005, z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <boxGeometry args={[2, 2, 0.02]} />
            <meshStandardMaterial 
              color={idx % 2 === 0 ? "#d9c9a9" : "#b9a98f"} 
              roughness={0.5} 
            />
          </mesh>
        );
      })}

      {/* Left Wall */}
      <mesh position={[-14, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 4, 28]} />
        <meshStandardMaterial color="#a89a84" roughness={0.6} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[14, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 4, 28]} />
        <meshStandardMaterial color="#a89a84" roughness={0.6} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2, -14]} castShadow receiveShadow>
        <boxGeometry args={[28.3, 4, 0.3]} />
        <meshStandardMaterial color="#a89a84" roughness={0.6} />
      </mesh>

      {/* Front Wall with Entrance */}
      <mesh position={[-5, 2, 14]} castShadow receiveShadow>
        <boxGeometry args={[8, 4, 0.3]} />
        <meshStandardMaterial color="#a89a84" roughness={0.6} />
      </mesh>
      <mesh position={[5, 2, 14]} castShadow receiveShadow>
        <boxGeometry args={[8, 4, 0.3]} />
        <meshStandardMaterial color="#a89a84" roughness={0.6} />
      </mesh>

      {/* Ceiling - Metal framework */}
      <mesh position={[0, 4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.7} />
      </mesh>

      {/* Ceiling support beams */}
      {[[-7, 4, -7], [7, 4, -7], [-7, 4, 7], [7, 4, 7]].map((pos, idx) => (
        <mesh key={`beam-${idx}`} position={pos as Vec3} castShadow>
          <boxGeometry args={[1.5, 0.2, 1.5]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.4} metalness={0.5} />
        </mesh>
      ))}

      {/* Wall niches for lighting */}
      {[[-13.5, 2.5, -5], [-13.5, 2.5, 5], [13.5, 2.5, -5], [13.5, 2.5, 5]].map((pos, idx) => (
        <mesh key={`niche-${idx}`} position={pos as Vec3} castShadow>
          <boxGeometry args={[0.8, 0.8, 0.5]} />
          <meshStandardMaterial color="#8a7a5a" roughness={0.6} />
        </mesh>
      ))}
      
      {/* Indoor Lighting - Ceiling lights (professional) */}
      {[[-8, 3.8, -8], [0, 3.8, -8], [8, 3.8, -8], [-8, 3.8, 0], [0, 3.8, 0], [8, 3.8, 0], [-8, 3.8, 8], [0, 3.8, 8], [8, 3.8, 8]].map((pos, idx) => (
        <group key={`light-${idx}`} position={pos as Vec3}>
          {/* Light fixture */}
          <mesh castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
            <meshStandardMaterial 
              color="#1a1a1a" 
              emissive="#444444"
              emissiveIntensity={0.3}
              roughness={0.3} 
            />
          </mesh>
          {/* Industrial pendant light */}
          <pointLight position={[0, -0.2, 0]} intensity={2.5} distance={10} color="#fff8e7" />
        </group>
      ))}

      {/* Accent wall lights */}
      {[[-13.5, 2, -3], [-13.5, 2, 3], [13.5, 2, -3], [13.5, 2, 3]].map((pos, idx) => (
        <group key={`wall-light-${idx}`} position={pos as Vec3}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.6, 0.3]} />
            <meshStandardMaterial 
              color="#8a7a5a" 
              emissive="#ffa500"
              emissiveIntensity={0.4}
              roughness={0.4}
            />
          </mesh>
          <pointLight position={[0, 0, 0.3]} intensity={1.8} distance={8} color="#ffa500" />
        </group>
      ))}

      {/* Enhanced Hall Lighting */}
      <ambientLight intensity={2.0} />
      <hemisphereLight 
        args={['#ffffcc', '#b8a888', 1.5]} 
        position={[0, 4, 0]} 
      />
      <directionalLight 
        position={[8, 3.5, 5]} 
        intensity={1.8} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />

      {/* Indoor fog for atmosphere */}
      <fog attach="fog" args={['#d4bca3', 8, 35]} />

      {/* Market Entrance Archway (Interior) */}
      <MarketArchway position={[0, 0, 13]} />

      {/* Market Stalls - Front Row */}
      <MarketStall position={[-5, 0, 2]} canopyColor="#ff6347" products="fruits" stallName="FRESH FRUITS" />
      <MarketStall position={[-2.5, 0, 2]} canopyColor="#32cd32" products="vegetables" stallName="VEGETABLES" />
      <MarketStall position={[0, 0, 2]} canopyColor="#ff8c00" products="spices" stallName="SPICES" />
      <MarketStall position={[2.5, 0, 2]} canopyColor="#9370db" products="flowers" stallName="FLOWERS" />
      <MarketStall position={[5, 0, 2]} canopyColor="#4169e1" products="textiles" stallName="TEXTILES" />

      {/* Market Stalls - Back Row */}
      <MarketStall position={[-4, 0, -1]} canopyColor="#ff1493" products="crafts" stallName="HANDICRAFTS" />
      <MarketStall position={[-1, 0, -1]} canopyColor="#ffd700" products="spices" stallName="HERBS" />
      <MarketStall position={[2, 0, -1]} canopyColor="#00ced1" products="fruits" stallName="EXOTICS" />
      <MarketStall position={[5, 0, -1]} canopyColor="#dc143c" products="textiles" stallName="FABRICS" />

      {/* String Lights crisscrossing (now indoor) */}
      <StringLights start={[-6, 3.5, -2]} end={[6, 3.5, 3]} />
      <StringLights start={[-6, 3.5, 3]} end={[6, 3.5, -2]} />
      <StringLights start={[-6, 3.2, 0]} end={[6, 3.2, 0]} />
      <StringLights start={[0, 3.5, -3]} end={[0, 3.5, 4]} />

      {/* Decorative Elements */}
      <WoodenBarrel position={[-6.5, 0.2, 1]} />
      <WoodenBarrel position={[6.5, 0.2, 1]} />
      <WoodenBarrel position={[-6.5, 0.2, -2]} />

      <PottedPlant position={[-6, 0, 3]} />
      <PottedPlant position={[6, 0, 3]} />
      <PottedPlant position={[-6, 0, -3]} />
      <PottedPlant position={[6, 0, -3]} />

      <MarketCart position={[-7, 0, 0]} />
      <MarketCart position={[7, 0, -1]} />

      {/* Seating Area */}
      <MarketBench position={[0, 0, 4.5]} />
      <MarketBench position={[-3, 0, -3.5]} />
      <MarketBench position={[3, 0, -3.5]} />

      {/* Indoor lantern posts (corner lit posts) */}
      {[[-6.5, 0, -6], [6.5, 0, -6], [-6.5, 0, 6], [6.5, 0, 6]].map((pos, idx) => (
        <group key={idx} position={pos as Vec3}>
          {/* Post */}
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.1, 3.0, 8]} />
            <meshStandardMaterial color="#4a4a4a" roughness={0.5} metalness={0.4} />
          </mesh>
          {/* Top light fixture */}
          <mesh position={[0, 3.1, 0]} castShadow>
            <boxGeometry args={[0.25, 0.25, 0.25]} />
            <meshStandardMaterial 
              color="#2a2a2a" 
              emissive="#ff9900"
              emissiveIntensity={0.6}
              roughness={0.4} 
            />
          </mesh>
          <pointLight position={[0, 3.1, 0]} color="#ff9900" intensity={1.8} distance={7} />
        </group>
      ))}

      {/* Interior wall decoration (tile panels) */}
      {[-13.5, 13.5].map((x, row) => {
        return Array.from({ length: 5 }).map((_, idx) => {
          const y = 1.2 + idx * 0.5;
          return (
            <mesh key={`tile-${row}-${idx}`} position={[x, y, -5 + idx * 3]} castShadow>
              <boxGeometry args={[0.6, 0.4, 0.1]} />
              <meshStandardMaterial color="#8b7355" roughness={0.6} />
            </mesh>
          );
        });
      })}

      {/* Central display stand */}
      <mesh position={[0, 0.1, 5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2, 24]} />
        <meshStandardMaterial color="#9b8975" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.2, 5]} castShadow>
        <cylinderGeometry args={[1.8, 1.8, 0.3, 24]} />
        <meshStandardMaterial color="#8b7355" roughness={0.7} />
      </mesh>

      {/* Entrance door frames */}
      <mesh position={[-3.5, 1, 14.1]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 2, 2]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.6} />
      </mesh>
      <mesh position={[3.5, 1, 14.1]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 2, 2]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.6} />
      </mesh>
    </group>
  );
}
