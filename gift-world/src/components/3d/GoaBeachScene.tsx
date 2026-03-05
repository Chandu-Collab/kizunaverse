'use client';

import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import WeatherSystem from './weather/WeatherSystem';
import PriyaCharacter from './PriyaCharacter';
import UruruCharacter from './UruruCharacter';
import GalaxiaAnimeGirl from './GalaxiaAnimeGirl';

// Enhanced Time of Day System
type TimeOfDay = 'dawn' | 'morning' | 'noon' | 'afternoon' | 'evening' | 'night';

interface TimeConfiguration {
  name: string;
  skyColor: string;
  sunColor: string;
  ambientIntensity: number;
  sunIntensity: number;
  pointLightColor: string;
  particleColor: string;
  description: string;
  duration: number; // minutes in real-time
}

const TIME_CONFIGURATIONS: Record<TimeOfDay, TimeConfiguration> = {
  dawn: {
    name: 'Golden Dawn',
    skyColor: '#FFB6C1',
    sunColor: '#FF69B4',
    ambientIntensity: 0.4,
    sunIntensity: 0.8,
    pointLightColor: '#FFB6C1',
    particleColor: '#FF69B4',
    description: 'A gentle awakening with pink and gold hues',
    duration: 2
  },
  morning: {
    name: 'Fresh Morning',
    skyColor: '#87CEEB',
    sunColor: '#FFD700',
    ambientIntensity: 0.6,
    sunIntensity: 1.0,
    pointLightColor: '#FFD700',
    particleColor: '#FFD700',
    description: 'Bright and energizing morning light',
    duration: 3
  },
  noon: {
    name: 'Blazing Noon',
    skyColor: '#00BFFF',
    sunColor: '#FFFFFF',
    ambientIntensity: 0.8,
    sunIntensity: 1.4,
    pointLightColor: '#FFFFFF',
    particleColor: '#FFFF00',
    description: 'Brilliant midday sunshine at its peak',
    duration: 2
  },
  afternoon: {
    name: 'Golden Hour',
    skyColor: '#FFA500',
    sunColor: '#FF8C00',
    ambientIntensity: 0.7,
    sunIntensity: 1.2,
    pointLightColor: '#FFA500',
    particleColor: '#FF8C00',
    description: 'Warm golden light perfect for reflection',
    duration: 3
  },
  evening: {
    name: 'Peaceful Sunset',
    skyColor: '#FF6347',
    sunColor: '#FF4500',
    ambientIntensity: 0.5,
    sunIntensity: 0.9,
    pointLightColor: '#FF6347',
    particleColor: '#FF4500',
    description: 'Magnificent sunset colors painting the sky',
    duration: 2
  },
  night: {
    name: 'Starlit Night',
    skyColor: '#191970',
    sunColor: '#4169E1',
    ambientIntensity: 0.3,
    sunIntensity: 0.2,
    pointLightColor: '#4169E1',
    particleColor: '#87CEEB',
    description: 'Tranquil night under the stars',
    duration: 3
  }
};

// Custom hook for beach time management
function useBeachTime() {
  const [currentTime, setCurrentTime] = useState<TimeOfDay>('morning');
  const [timeProgress, setTimeProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userActivity, setUserActivity] = useState(0);
  
  const timeSequence: TimeOfDay[] = ['dawn', 'morning', 'noon', 'afternoon', 'evening', 'night'];
  
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTimeProgress(prev => {
        const currentConfig = TIME_CONFIGURATIONS[currentTime];
        const progressIncrement = 1 / (currentConfig.duration * 60); // Convert minutes to seconds
        
        if (prev + progressIncrement >= 1) {
          // Time to transition to next phase
          setIsTransitioning(true);
          setTimeout(() => {
            const currentIndex = timeSequence.indexOf(currentTime);
            const nextIndex = (currentIndex + 1) % timeSequence.length;
            setCurrentTime(timeSequence[nextIndex]);
            setIsTransitioning(false);
          }, 1000);
          return 0;
        }
        
        return prev + progressIncrement;
      });
    }, 1000); // Update every second
    
    return () => clearInterval(timeInterval);
  }, [currentTime]);
  
  // Activity-based time acceleration
  useEffect(() => {
    const activityInterval = setInterval(() => {
      setUserActivity(prev => Math.max(0, prev - 0.1)); // Decay activity over time
    }, 1000);
    
    return () => clearInterval(activityInterval);
  }, []);
  
  const accelerateTime = () => {
    setUserActivity(prev => Math.min(10, prev + 1));
    setTimeProgress(prev => Math.min(1, prev + 0.1)); // Skip ahead when user is active
  };
  
  // Listen for external acceleration events from the journal
  useEffect(() => {
    const handleAcceleration = () => {
      accelerateTime();
    };
    
    window.addEventListener('accelerateBeachTime', handleAcceleration);
    return () => window.removeEventListener('accelerateBeachTime', handleAcceleration);
  }, []);
  
  return {
    currentTime,
    timeProgress,
    isTransitioning,
    userActivity,
    accelerateTime,
    currentConfig: TIME_CONFIGURATIONS[currentTime]
  };
}

// Enhanced Tropical Particles System with time-based colors
function TropicalParticles({ timeConfig }: { timeConfig: TimeConfiguration }) {
  const particlesRef = useRef<THREE.Group>(null);
  const particles = useMemo(() => 
    Array.from({ length: 25 }, () => ({
      x: (Math.random() - 0.5) * 30,
      y: Math.random() * 8 + 1,
      z: (Math.random() - 0.5) * 20,
      phase: Math.random() * Math.PI * 2,
      speed: 0.1 + Math.random() * 0.2,
      size: 0.02 + Math.random() * 0.03,
      baseColor: timeConfig.particleColor
    })), [timeConfig.particleColor]
  );

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        const p = particles[i];
        const t = clock.getElapsedTime() * p.speed;
        particle.position.x = p.x + Math.sin(t + p.phase) * 2;
        particle.position.y = p.y + Math.sin(t * 0.5) * 0.5;
        particle.position.z = p.z + Math.cos(t * 0.3 + p.phase) * 1;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshStandardMaterial 
            color={p.baseColor}
            transparent
            opacity={0.6}
            emissive={p.baseColor}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Tropical Butterflies
function TropicalButterfly({ position, color = '#FF69B4' }: { position: [number, number, number]; color?: string }) {
  const butterflyRef = useRef<THREE.Group>(null);
  const [targetPos] = useState<[number, number, number]>([
    position[0] + (Math.random() - 0.5) * 8,
    position[1] + Math.random() * 2,
    position[2] + (Math.random() - 0.5) * 6
  ]);

  useFrame(({ clock }) => {
    if (butterflyRef.current) {
      const t = clock.getElapsedTime();
      // Flutter movement
      butterflyRef.current.position.x = THREE.MathUtils.lerp(
        butterflyRef.current.position.x,
        targetPos[0] + Math.sin(t * 2) * 1.5,
        0.01
      );
      butterflyRef.current.position.y = targetPos[1] + Math.sin(t * 3) * 0.8;
      butterflyRef.current.position.z = THREE.MathUtils.lerp(
        butterflyRef.current.position.z,
        targetPos[2] + Math.cos(t * 1.5) * 1,
        0.01
      );
      
      // Wing flapping
      butterflyRef.current.children.forEach((wing, i) => {
        if (wing.userData.isWing) {
          wing.rotation.y = Math.sin(t * 12 + i * Math.PI) * 0.3;
        }
      });
    }
  });

  return (
    <group ref={butterflyRef} position={position}>
      {/* Butterfly body */}
      <mesh>
        <cylinderGeometry args={[0.008, 0.008, 0.08, 6]} />
        <meshStandardMaterial color="#2C1810" />
      </mesh>
      
      {/* Wings */}
      <mesh position={[-0.02, 0, 0]} userData={{ isWing: true }}>
        <planeGeometry args={[0.04, 0.03]} />
        <meshStandardMaterial 
          color={color}
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh position={[0.02, 0, 0]} userData={{ isWing: true }}>
        <planeGeometry args={[0.04, 0.03]} />
        <meshStandardMaterial 
          color={color}
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

// Beach Vegetation - Tropical plants and bushes
function BeachVegetation({ position }: { position: [number, number, number] }) {
  const vegRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (vegRef.current) {
      const t = clock.getElapsedTime();
      vegRef.current.rotation.y = Math.sin(t * 0.3) * 0.05;
      vegRef.current.children.forEach((plant, i) => {
        plant.rotation.z = Math.sin(t * 0.5 + i) * 0.1;
      });
    }
  });

  return (
    <group ref={vegRef} position={position}>
      {/* Tropical bushes */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.4, 8, 6]} />
        <meshStandardMaterial color="#228B22" roughness={0.9} />
      </mesh>
      <mesh position={[0.3, 0.15, 0.2]}>
        <sphereGeometry args={[0.25, 8, 6]} />
        <meshStandardMaterial color="#32CD32" roughness={0.9} />
      </mesh>
      <mesh position={[-0.2, 0.1, -0.1]}>
        <sphereGeometry args={[0.2, 8, 6]} />
        <meshStandardMaterial color="#90EE90" roughness={0.9} />
      </mesh>
      
      {/* Colorful tropical flowers */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh 
          key={i}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 0.3,
            0.3 + Math.random() * 0.2,
            Math.sin((i / 6) * Math.PI * 2) * 0.3
          ]}
        >
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial 
            color={['#FF69B4', '#FF6347', '#FFD700', '#FF1493', '#FFA500', '#9370DB'][i]}
            emissive={['#FF69B4', '#FF6347', '#FFD700', '#FF1493', '#FFA500', '#9370DB'][i]}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      
      {/* Tall grass */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh 
          key={i}
          position={[
            (Math.random() - 0.5) * 0.8,
            0.15,
            (Math.random() - 0.5) * 0.8
          ]}
          rotation={[0, Math.random() * Math.PI, Math.random() * 0.2]}
        >
          <planeGeometry args={[0.02, 0.3]} />
          <meshStandardMaterial 
            color="#698B22" 
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// Enhanced Ocean with vibrant tropical colors
function DetailedOcean({ season = 'summer', waterColor = '#4169E1' }: { season?: string; waterColor?: string; } = {}) {
  const oceanRef = useRef<THREE.Mesh>(null);
  const waveRefs = useRef<THREE.Mesh[]>([]);
  const { isNight } = useTheme();//helper to determine if it's night based on the current time of day
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (oceanRef.current) {
      oceanRef.current.position.y = -0.48 + Math.sin(t * 0.5) * 0.03;
      // Dynamic color change
      const material = oceanRef.current.material as THREE.MeshStandardMaterial;
      material.color.setHSL(
        0.55 + Math.sin(t * 0.1) * 0.05, // Hue variation
        0.8 + Math.sin(t * 0.2) * 0.1,   // Saturation
        isNight ? 0.2 : 0.5 + Math.sin(t * 0.15) * 0.1 // Lightness
      );
    }
    
    // Animate wave lines with color variations
    waveRefs.current.forEach((wave, i) => {
      if (wave) {
        wave.position.y = -0.45 + Math.sin(t * 0.8 + i) * 0.02;
        wave.position.z = -8 + (t * 0.3 + i) % 16;
        
        const material = wave.material as THREE.MeshStandardMaterial;
        material.opacity = 0.4 + Math.sin(t + i) * 0.2;
      }
    });
  });

  return (
    <group>
      {/* Enhanced Ocean with Day/Night Water Effects */}
      <mesh ref={oceanRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -8]}>
        <planeGeometry args={[50, 25, 64, 32]} />
        <meshStandardMaterial 
          color={isNight ? "#0B1426" : "#00CED1"}
          transparent
          opacity={isNight ? 0.7 : 0.85}
          roughness={isNight ? 0.1 : 0.02}
          metalness={isNight ? 0.3 : 0.1}
          envMapIntensity={isNight ? 1 : 2}
          emissive={isNight ? "#001122" : "#000000"}
          emissiveIntensity={isNight ? 0.2 : 0}
        />
      </mesh>
      
      {/* Sparkling foam waves */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh 
          key={i}
          ref={(el) => { if (el) waveRefs.current[i] = el; }}
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -0.45, -8 + i * 1.1]}
        >
          <planeGeometry args={[35 + Math.sin(i) * 5, 0.15 + Math.cos(i) * 0.1]} />
          <meshStandardMaterial 
            color={isNight ? "#B0E0E6" : "#F0F8FF"}
            transparent
            opacity={isNight ? 0.4 : 0.6}
            emissive={isNight ? "#4169E1" : "#FFFFFF"}
            emissiveIntensity={isNight ? 0.3 : 0.3}
          />
        </mesh>
      ))}
      
      {/* Deeper ocean gradient */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, -20]}>
        <planeGeometry args={[60, 10]} />
        <meshStandardMaterial 
          color={isNight ? "#0f3460" : "#4682B4"}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Underwater light rays */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh 
          key={i}
          rotation={[-Math.PI / 2, 0, (i * Math.PI) / 4]} 
          position={[
            Math.cos((i * Math.PI) / 4) * 12,
            -0.4,
            -10 + Math.sin((i * Math.PI) / 4) * 8
          ]}
        >
          <planeGeometry args={[0.2, 8]} />
          <meshStandardMaterial 
            color="#87CEEB"
            transparent
            opacity={0.2}
            emissive="#87CEEB"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Detailed Goan Beach Shack with authentic architecture
function GoaBeachShack({ position, onClick }: { position: [number, number, number]; onClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group 
      position={position}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onClick={onClick}
      scale={isHovered ? 1.05 : 1}
    >
      {/* Main shack structure */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.5, 1.6, 2]} />
        <meshStandardMaterial color="#D2691E" roughness={0.8} />
      </mesh>
      
      {/* Traditional sloped roof */}
      <mesh position={[0, 1.9, 0]}>
        <boxGeometry args={[2.8, 0.6, 2.3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Front entrance */}
      <mesh position={[0, 0.6, 1.01]}>
        <boxGeometry args={[0.6, 1.2, 0.05]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Side walls with traditional patterns */}
      <mesh position={[-1.26, 1, 0]}>
        <boxGeometry args={[0.02, 1.6, 2]} />
        <meshStandardMaterial color="#CD853F" />
      </mesh>
      <mesh position={[1.26, 1, 0]}>
        <boxGeometry args={[0.02, 1.6, 2]} />
        <meshStandardMaterial color="#CD853F" />
      </mesh>
      
      {/* Windows */}
      <mesh position={[-0.8, 1.1, 1.01]}>
        <boxGeometry args={[0.4, 0.4, 0.02]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.8, 1.1, 1.01]}>
        <boxGeometry args={[0.4, 0.4, 0.02]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.6} />
      </mesh>
      
      {/* Traditional decorative elements */}
      <mesh position={[0, 1.6, 1.02]}>
        <boxGeometry args={[2.4, 0.1, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Coconut decoration */}
      <mesh position={[0.9, 0.5, 1.05]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-0.9, 0.5, 1.05]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

// Colorful Beach Huts - Traditional Goan style
function ColorfulBeachHut({ position, color, roofColor }: { 
  position: [number, number, number]; 
  color: string; 
  roofColor: string; 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group 
      position={position}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      scale={isHovered ? 1.05 : 1}
    >
      {/* Hut base */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.8, 1.6, 1.4]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      
      {/* Colorful roof */}
      <mesh position={[0, 1.8, 0]}>
        <coneGeometry args={[1.3, 0.8, 4]} />
        <meshStandardMaterial color={roofColor} />
      </mesh>
      
      {/* Door */}
      <mesh position={[0, 0.6, 0.71]}>
        <boxGeometry args={[0.5, 1, 0.02]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Windows */}
      <mesh position={[-0.6, 1, 0.71]}>
        <boxGeometry args={[0.3, 0.3, 0.02]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0.6, 1, 0.71]}>
        <boxGeometry args={[0.3, 0.3, 0.02]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>
      
      {/* Decorative elements */}
      <mesh position={[0, 1.9, 0.71]}>
        <boxGeometry args={[1.8, 0.1, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Flower boxes */}
      <mesh position={[-0.6, 0.85, 0.72]}>
        <boxGeometry args={[0.3, 0.1, 0.1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-0.6, 0.9, 0.72]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial color="#FF69B4" />
      </mesh>
      
      <mesh position={[0.6, 0.85, 0.72]}>
        <boxGeometry args={[0.3, 0.1, 0.1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.6, 0.9, 0.72]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}

// Realistic Coconut Palm Tree
function CoconutPalm({ position }: { position: [number, number, number] }) {
  const palmRef = useRef<THREE.Group>(null);
  const leavesRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (palmRef.current && leavesRef.current) {
      const t = clock.getElapsedTime();
      palmRef.current.rotation.z = Math.sin(t * 0.3) * 0.05;
      leavesRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
      
      leavesRef.current.children.forEach((leaf, i) => {
        leaf.rotation.z = Math.sin(t * 0.5 + i * 0.3) * 0.15;
      });
    }
  });

  return (
    <group ref={palmRef} position={position}>
      {/* Realistic curved trunk */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[Math.sin(i * 0.2) * 0.1, i * 0.4, 0]}>
          <cylinderGeometry args={[0.12 - i * 0.01, 0.14 - i * 0.01, 0.45, 12]} />
          <meshStandardMaterial 
            color={`hsl(${30 + i * 2}, 60%, ${40 + i * 2}%)`} 
            roughness={0.9}
            normalScale={new THREE.Vector2(0.5, 0.5)}
          />
        </mesh>
      ))}
      
      {/* Palm frond texture on trunk */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[0, i * 0.25, 0]} rotation={[0, (i * 30 * Math.PI) / 180, 0]}>
          <boxGeometry args={[0.02, 0.1, 0.16]} />
          <meshStandardMaterial color="#8B4513" roughness={0.95} />
        </mesh>
      ))}
      
      {/* Coconuts */}
      <group position={[0, 3, 0]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.cos((i * 72 * Math.PI) / 180) * 0.3,
              -0.2 - i * 0.05,
              Math.sin((i * 72 * Math.PI) / 180) * 0.3
            ]}
          >
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
        ))}
      </group>
      
      {/* Detailed palm fronds */}
      <group ref={leavesRef} position={[0, 3.2, 0]}>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <group key={i} rotation={[0, angle, Math.PI * 0.1]}>
              {/* Main frond stem */}
              <mesh position={[0, 0, 1]}>
                <cylinderGeometry args={[0.015, 0.025, 2, 8]} />
                <meshStandardMaterial color="#228B22" />
              </mesh>
              
              {/* Frond leaves */}
              {Array.from({ length: 20 }).map((_, j) => (
                <mesh
                  key={j}
                  position={[
                    (j % 2 === 0 ? -0.1 : 0.1) * (1 - j * 0.05),
                    0,
                    0.1 + j * 0.095
                  ]}
                  rotation={[0, (j % 2 === 0 ? -0.3 : 0.3), 0]}
                >
                  <planeGeometry args={[0.08 * (1 - j * 0.04), 0.25 * (1 - j * 0.03)]} />
                  <meshStandardMaterial 
                    color={`hsl(${110 + j}, 70%, ${35 + j}%)`}
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.9}
                  />
                </mesh>
              ))}
            </group>
          );
        })}
      </group>
    </group>
  );
}

// Fishing Boat - Traditional Goan boat
function FishingBoat({ position }: { position: [number, number, number] }) {
  const boatRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();
  const drift = useMemo(() => {
    const baseSpeed = 0.18 + Math.random() * 0.14;
    return {
      speed: baseSpeed,
      phase: Math.random() * Math.PI * 2,
      swayX: 0.5 + Math.random() * 0.3,
      swayZ: 0.7 + Math.random() * 0.4,
      yaw: 0.08 + Math.random() * 0.05,
      loopSpan: 10 + Math.random() * 4,
      loopSpeed: 0.2 + Math.random() * 0.1
    };
  }, []);
  
  useFrame(({ clock }) => {
    if (boatRef.current) {
      const t = clock.getElapsedTime();
      const loopOffset = ((t * drift.loopSpeed + drift.phase) % drift.loopSpan) - drift.loopSpan / 2;
      boatRef.current.position.x = position[0] + loopOffset + Math.sin(t * drift.speed + drift.phase) * drift.swayX;
      boatRef.current.position.z = position[2] + Math.cos(t * drift.speed * 0.9 + drift.phase) * drift.swayZ;
      boatRef.current.position.y = position[1] + Math.sin(t * 0.8 + drift.phase) * 0.05;
      boatRef.current.rotation.z = Math.sin(t * 0.6 + drift.phase) * 0.02;
      boatRef.current.rotation.y = Math.sin(t * drift.speed + drift.phase) * drift.yaw;
    }
  });

  return (
    <group ref={boatRef} position={position}>
      {/* Boat hull */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 0.3, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Boat sides - curved */}
      <mesh position={[1.2, 0.15, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.1, 0.4, 0.8]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>
      <mesh position={[-1.2, 0.15, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.1, 0.4, 0.8]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>
      
      {/* Mast */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2.4, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Sail */}
      <mesh position={[0.6, 1.3, 0]}>
        <planeGeometry args={[1.2, 1.8]} />
        <meshStandardMaterial 
          color="#F5F5DC" 
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Fishing nets */}
      <mesh position={[-0.8, 0.1, 0]}>
        <sphereGeometry args={[0.15, 8, 6]} />
        <meshStandardMaterial color="#2F4F4F" transparent opacity={0.6} />
      </mesh>
      
      {/* Lantern */}
      <mesh position={[1, 0.4, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.12, 8]} />
        <meshStandardMaterial 
          color={isNight ? "#2F4F4F" : "#CD853F"}
          emissive={isNight ? "#1E2A2A" : "#000000"}
          emissiveIntensity={isNight ? 0.2 : 0}
        />
      </mesh>
      
      {isNight && (
        <pointLight position={[1, 0.5, 0]} intensity={0.3} color="#FFD700" distance={3} />
      )}
    </group>
  );
}

// Beach Restaurant/Cafe
function BeachCafe({ position }: { position: [number, number, number] }) {
  const { isNight } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group 
      position={position}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Main structure */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[4, 2, 3]} />
        <meshStandardMaterial color="#DEB887" />
      </mesh>
      
      {/* Bamboo roof */}
      <mesh position={[0, 2.2, 0]}>
        <coneGeometry args={[2.8, 0.8, 8]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>
      
      {/* Open sides - beachside dining */}
      <mesh position={[2.1, 1, 0]}>
        <boxGeometry args={[0.1, 2, 3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-2.1, 1, 0]}>
        <boxGeometry args={[0.1, 2, 3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Bar counter */}
      <mesh position={[0, 0.8, -1.2]}>
        <boxGeometry args={[3.5, 0.1, 0.6]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Bar stools */}
      {Array.from({ length: 4 }).map((_, i) => (
        <group key={i} position={[-1.5 + i, 0.4, -0.5]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.6, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[0, 0.65, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.05, 16]} />
            <meshStandardMaterial color="#D2691E" />
          </mesh>
        </group>
      ))}
      
      {/* Hanging string lights */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group key={i}>
          <mesh position={[-1.75 + i * 0.5, 2.0, 1.3]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial 
              color={isNight ? "#FFD700" : "#FFFFE0"}
              emissive={isNight ? "#FFA500" : "#000000"}
              emissiveIntensity={isNight ? 0.6 : 0}
            />
          </mesh>
          {isNight && (
            <pointLight 
              position={[-1.75 + i * 0.5, 2.0, 1.3]} 
              intensity={0.2} 
              color="#FFD700" 
              distance={1} 
            />
          )}
        </group>
      ))}
      
      {/* Menu board */}
      <mesh position={[-1.8, 1.3, 1.51]}>
        <boxGeometry args={[0.8, 1.2, 0.02]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {isHovered && (
        <Html position={[0, 2.8, 0]} center>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-orange-100/95 backdrop-blur-sm rounded-lg p-3 text-center shadow-lg"
          >
            <h3 className="font-bold text-orange-800">🍹 Beach Cafe</h3>
            <p className="text-xs text-orange-700">Fresh seafood & tropical drinks</p>
            <p className="text-xs text-orange-600">Authentic Goan cuisine</p>
          </motion.div>
        </Html>
      )}
    </group>
  );
}

// Detailed Seagull with realistic behavior
function DetailedSeagull({ position, flightPath }: { position: [number, number, number]; flightPath: [number, number, number][] }) {
  const birdRef = useRef<THREE.Group>(null);
  const [pathIndex, setPathIndex] = useState(0);
  const [isLanded, setIsLanded] = useState(false);

  useFrame(({ clock }) => {
    if (birdRef.current && flightPath.length > 1) {
      const t = clock.getElapsedTime();
      
      if (!isLanded) {
        const currentPoint = flightPath[pathIndex % flightPath.length];
        const nextPoint = flightPath[(pathIndex + 1) % flightPath.length];
        
        const alpha = (t * 0.3 % 2) / 2;
        birdRef.current.position.x = THREE.MathUtils.lerp(currentPoint[0], nextPoint[0], alpha);
        birdRef.current.position.y = currentPoint[1] + Math.sin(t * 2) * 0.2;
        birdRef.current.position.z = THREE.MathUtils.lerp(currentPoint[2], nextPoint[2], alpha);
        
        // Wing flapping
        birdRef.current.children.forEach((child, i) => {
          if (child.userData.isWing) {
            child.rotation.z = Math.sin(t * 6 + i * Math.PI) * 0.4;
          }
        });
        
        if (alpha > 0.9) {
          setPathIndex((prev) => (prev + 1) % flightPath.length);
          if (Math.random() < 0.1) setIsLanded(true);
        }
      } else {
        // Landed behavior
        birdRef.current.position.y = 0.1 + Math.sin(t * 4) * 0.02;
        if (t % 8 < 0.1) setIsLanded(false);
      }
    }
  });

  return (
    <group ref={birdRef} position={position}>
      {/* More detailed bird body */}
      <mesh scale={[1, 0.6, 1.4]}>
        <sphereGeometry args={[0.08, 12, 8]} />
        <meshStandardMaterial color="#F8F8FF" roughness={0.8} />
      </mesh>
      
      {/* Wings with feather detail */}
      <mesh position={[-0.07, 0.02, 0]} userData={{ isWing: true }} scale={[1.5, 0.3, 1.2]}>
        <sphereGeometry args={[0.08, 8, 6]} />
        <meshStandardMaterial color="#E0E0E0" roughness={0.9} />
      </mesh>
      <mesh position={[0.07, 0.02, 0]} userData={{ isWing: true }} scale={[1.5, 0.3, 1.2]}>
        <sphereGeometry args={[0.08, 8, 6]} />
        <meshStandardMaterial color="#E0E0E0" roughness={0.9} />
      </mesh>
      
      {/* Wing tips - black */}
      <mesh position={[-0.12, 0.02, 0.02]} userData={{ isWing: true }}>
        <sphereGeometry args={[0.03, 8, 6]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>
      <mesh position={[0.12, 0.02, 0.02]} userData={{ isWing: true }}>
        <sphereGeometry args={[0.03, 8, 6]} />
        <meshStandardMaterial color="#2F2F2F" />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.03, 0.08]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#FFFAFA" />
      </mesh>
      
      {/* Beak */}
      <mesh position={[0, 0, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.012, 0.06, 6]} />
        <meshStandardMaterial color="#FFA500" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.02, 0.04, 0.09]}>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.02, 0.04, 0.09]}>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Tail */}
      <mesh position={[0, 0.01, -0.08]} scale={[0.6, 0.2, 0.8]}>
        <sphereGeometry args={[0.04, 8, 6]} />
        <meshStandardMaterial color="#E0E0E0" />
      </mesh>
      
      {/* Legs (when landed) */}
      {isLanded && (
        <>
          <mesh position={[-0.02, -0.06, 0]}>
            <cylinderGeometry args={[0.004, 0.004, 0.05, 6]} />
            <meshStandardMaterial color="#FFA500" />
          </mesh>
          <mesh position={[0.02, -0.06, 0]}>
            <cylinderGeometry args={[0.004, 0.004, 0.05, 6]} />
            <meshStandardMaterial color="#FFA500" />
          </mesh>
        </>
      )}
    </group>
  );
}

// Beach with realistic sand texture and shells
function DetailedBeachSand() {
  const { isNight } = useTheme();
  
  return (
    <group>
      {/* Main sand surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.51, 0]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial 
          color={isNight ? "#D2B48C" : "#F5DEB3"} 
          roughness={0.95}
        />
      </mesh>
      
      {/* Sand dunes */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 5]}>
        <planeGeometry args={[35, 8]} />
        <meshStandardMaterial color="#DEB887" roughness={0.9} />
      </mesh>
      
      {/* Seashells scattered on beach */}
      {Array.from({ length: 15 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 15;
        const z = Math.random() * 8;
        const rotation = Math.random() * Math.PI * 2;
        return (
          <group key={i} position={[x, -0.48, z]} rotation={[0, rotation, 0]}>
            <mesh>
              <coneGeometry args={[0.03 + Math.random() * 0.02, 0.02, 8]} />
              <meshStandardMaterial 
                color={['#FFB6C1', '#FFA07A', '#F0E68C', '#DDA0DD'][Math.floor(Math.random() * 4)]}
                roughness={0.8}
              />
            </mesh>
          </group>
        );
      })}
      
      {/* Footprints in sand */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh 
          key={i}
          rotation={[-Math.PI / 2, 0, Math.PI / 4]} 
          position={[1 + i * 0.3, -0.49, 2 + i * 0.4]}
          scale={[1.5, 1, 1]}
        >
          <planeGeometry args={[0.06, 0.04]} />
          <meshStandardMaterial color="#CD853F" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// Enhanced Beach Activities with more variety
function BeachActivities() {
  const { isNight } = useTheme();
  
  return (
    <group>
      {/* Surfboards */}
      <group position={[7, 0, 1]}>
        <mesh position={[0, 0.02, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[2.2, 0.04, 0.4]} />
          <meshStandardMaterial color="#FF6347" />
        </mesh>
        <mesh position={[0.2, 0.04, 0.1]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[2, 0.04, 0.35]} />
          <meshStandardMaterial color="#4169E1" />
        </mesh>
      </group>
      
      {/* Beach volleyball net with decorative flags */}
      <group position={[6, 0, 2]}>
        <mesh position={[-1.5, 1.2, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 2.4, 8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[1.5, 1.2, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 2.4, 8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        
        {/* Colorful flags on poles */}
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh 
            key={i}
            position={[-1.5, 2.2 - i * 0.1, 0]}
            rotation={[0, 0, Math.PI / 6]}
          >
            <planeGeometry args={[0.15, 0.08]} />
            <meshStandardMaterial 
              color={['#FF69B4', '#FFD700', '#32CD32'][i]}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
        
        <mesh position={[0, 1.5, 0]}>
          <planeGeometry args={[3, 1]} />
          <meshStandardMaterial 
            color="#FFFFFF" 
            transparent 
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        <mesh position={[0.5, 0.1, 0.5]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#FFE4B5" />
        </mesh>
      </group>
      
      {/* Premium beach umbrellas with patterns */}
      {[
        { pos: [3, 0, 1] as [number, number, number], color: '#FF6347', pattern: '#FFFFFF' },
        { pos: [-4, 0, 2] as [number, number, number], color: '#32CD32', pattern: '#FFD700' },
        { pos: [1, 0, 3] as [number, number, number], color: '#4169E1', pattern: '#FF69B4' }
      ].map((umbrella, i) => (
        <group key={i} position={umbrella.pos}>
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 2.4, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          
          <mesh position={[0, 2.3, 0]}>
            <coneGeometry args={[1.8, 0.4, 16]} />
            <meshStandardMaterial color={umbrella.color} />
          </mesh>
          
          {/* Umbrella patterns */}
          {Array.from({ length: 8 }).map((_, j) => (
            <mesh 
              key={j}
              position={[
                Math.cos((j / 8) * Math.PI * 2) * 1.2,
                2.25,
                Math.sin((j / 8) * Math.PI * 2) * 1.2
              ]}
            >
              <sphereGeometry args={[0.08, 6, 6]} />
              <meshStandardMaterial color={umbrella.pattern} />
            </mesh>
          ))}
          
          <mesh position={[0, 2.1, 0]}>
            <torusGeometry args={[1.7, 0.05, 8, 16]} />
            <meshStandardMaterial color={umbrella.color} />
          </mesh>
        </group>
      ))}
      
      {/* Luxury beach loungers */}
      {[
        { pos: [3.5, 0, 0.5] as [number, number, number], rot: 0.3, color: '#FF69B4' },
        { pos: [-3.8, 0, 1.8] as [number, number, number], rot: -0.2, color: '#87CEEB' }
      ].map((lounger, i) => (
        <group key={i} position={lounger.pos} rotation={[0, lounger.rot, 0]}>
          {/* Gold-trimmed frame */}
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[1.8, 0.05, 0.6]} />
            <meshStandardMaterial color="#DAA520" metalness={0.8} />
          </mesh>
          
          <mesh position={[0, 0.4, -0.2]} rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[1.8, 0.05, 0.4]} />
            <meshStandardMaterial color="#DAA520" metalness={0.8} />
          </mesh>
          
          {[-0.7, 0.7].map((x, j) => (
            <group key={j}>
              <mesh position={[x, 0.08, -0.25]}>
                <cylinderGeometry args={[0.015, 0.015, 0.16, 8]} />
                <meshStandardMaterial color="#DAA520" metalness={0.9} />
              </mesh>
              <mesh position={[x, 0.08, 0.25]}>
                <cylinderGeometry args={[0.015, 0.015, 0.16, 8]} />
                <meshStandardMaterial color="#DAA520" metalness={0.9} />
              </mesh>
            </group>
          ))}
          
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[1.7, 0.02, 0.55]} />
            <meshStandardMaterial color={lounger.color} />
          </mesh>
          
          {/* Beach pillow */}
          <mesh position={[0, 0.22, -0.15]}>
            <boxGeometry args={[0.4, 0.08, 0.2]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>
      ))}
      
      {/* Beach toys and accessories */}
      <group position={[2.8, 0, 0.2]}>
        {/* Colorful beach bag */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.3, 0.2, 0.15]} />
          <meshStandardMaterial color="#FF1493" />
        </mesh>
        
        {/* Beach ball */}
        <mesh position={[0.4, 0.08, 0.3]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh 
            key={i}
            position={[
              0.4 + Math.cos((i / 6) * Math.PI * 2) * 0.07,
              0.08,
              0.3 + Math.sin((i / 6) * Math.PI * 2) * 0.07
            ]}
          >
            <planeGeometry args={[0.02, 0.15]} />
            <meshStandardMaterial 
              color={['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'][i]}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
      
      {/* Designer flip flops */}
      <group position={[3.2, 0.01, 0.8]}>
        <mesh position={[0.05, 0, 0]}>
          <boxGeometry args={[0.08, 0.01, 0.15]} />
          <meshStandardMaterial color="#FF1493" metalness={0.3} />
        </mesh>
        <mesh position={[-0.05, 0, 0]}>
          <boxGeometry args={[0.08, 0.01, 0.15]} />
          <meshStandardMaterial color="#FF1493" metalness={0.3} />
        </mesh>
        
        {/* Decorative straps */}
        <mesh position={[0.05, 0.005, 0]}>
          <cylinderGeometry args={[0.004, 0.004, 0.08, 8]} />
          <meshStandardMaterial color="#DAA520" metalness={0.9} />
        </mesh>
        <mesh position={[-0.05, 0.005, 0]}>
          <cylinderGeometry args={[0.004, 0.004, 0.08, 8]} />
          <meshStandardMaterial color="#DAA520" metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// Sunset/Sunrise Sky Effects
function SkyEffects() {
  const { isNight } = useTheme();
  
  return (
    <group>
      {/* Sun/Moon */}
      <mesh position={[15, 8, -15]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial 
          color={isNight ? "#F5F5DC" : "#FFD700"}
          emissive={isNight ? "#FFFACD" : "#FFA500"}
          emissiveIntensity={isNight ? 0.3 : 0.6}
        />
      </mesh>
      
      {/* Clouds */}
      {Array.from({ length: 6 }).map((_, i) => (
        <group 
          key={i} 
          position={[
            -10 + Math.random() * 20,
            5 + Math.random() * 3,
            -12 - Math.random() * 5
          ]}
        >
          <mesh>
            <sphereGeometry args={[0.8, 8, 8]} />
            <meshStandardMaterial 
              color={isNight ? "#2F2F2F" : "#FFFFFF"}
              transparent
              opacity={0.7}
            />
          </mesh>
          <mesh position={[0.5, 0, 0]}>
            <sphereGeometry args={[0.6, 8, 8]} />
            <meshStandardMaterial 
              color={isNight ? "#2F2F2F" : "#FFFFFF"}
              transparent
              opacity={0.7}
            />
          </mesh>
          <mesh position={[-0.4, 0.1, 0]}>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshStandardMaterial 
              color={isNight ? "#2F2F2F" : "#FFFFFF"}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      ))}
      
      {/* Stars (night only) */}
      {isNight && Array.from({ length: 20 }).map((_, i) => (
        <mesh 
          key={i}
          position={[
            (Math.random() - 0.5) * 40,
            8 + Math.random() * 4,
            -15 - Math.random() * 10
          ]}
        >
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial 
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// Beach vendors and local life
function BeachVendors() {
  return (
    <group>
      {/* Coconut vendor cart */}
      <group position={[-6, 0, 3]}>
        {/* Cart base */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.2, 0.6, 0.8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        
        {/* Wheels */}
        <mesh position={[-0.5, 0.15, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.08, 12]} />
          <meshStandardMaterial color="#2F4F4F" />
        </mesh>
        <mesh position={[0.5, 0.15, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.08, 12]} />
          <meshStandardMaterial color="#2F4F4F" />
        </mesh>
        
        {/* Coconuts on cart */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh 
            key={i}
            position={[
              -0.4 + (i % 3) * 0.4,
              0.65 + Math.floor(i / 3) * 0.12,
              -0.2 + (i % 2) * 0.4
            ]}
          >
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        ))}
        
        {/* Cart handle */}
        <mesh position={[0, 0.8, -0.5]}>
          <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>
      
      {/* Food stall */}
      <group position={[8, 0, 4]}>
        {/* Stall structure */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[2, 2, 1.5]} />
          <meshStandardMaterial color="#F4A460" />
        </mesh>
        
        {/* Colorful banner */}
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[2.2, 0.3, 0.02]} />
          <meshStandardMaterial color="#FF6347" />
        </mesh>
        
        {/* Counter */}
        <mesh position={[0, 0.8, 0.6]}>
          <boxGeometry args={[1.8, 0.1, 0.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        
        {/* Food items */}
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={i} position={[-0.6 + i * 0.4, 0.85, 0.6]}>
            <cylinderGeometry args={[0.05, 0.05, 0.03, 8]} />
            <meshStandardMaterial color={['#FF4500', '#32CD32', '#FFD700', '#FF69B4'][i]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Enhanced Beach Lighting System with Day/Night Drama\nfunction DramaticBeachLighting() {\n  const { isNight } = useTheme();\n  \n  return (\n    <group>\n      {/* Enhanced Sun/Moon Lighting */}\n      <directionalLight\n        position={[10, 10, 5]}\n        intensity={isNight ? 0.1 : 1.2}\n        color={isNight ? \"#4169E1\" : \"#FFF8DC\"}\n        castShadow\n        shadow-mapSize-width={2048}\n        shadow-mapSize-height={2048}\n        shadow-camera-far={50}\n      />\n      \n      {/* Night-only Moon Glow */}\n      {isNight && (\n        <>\n          <pointLight\n            position={[0, 15, -10]}\n            intensity={0.8}\n            color=\"#E6E6FA\"\n            distance={30}\n          />\n          <ambientLight intensity={0.2} color=\"#191970\" />\n        </>\n      )}\n      \n      {/* Day-only Bright Ambient */}\n      {!isNight && (\n        <ambientLight intensity={0.6} color=\"#FFF8DC\" />\n      )}\n      \n      {/* Dynamic Sky Dome */}\n      <mesh>\n        <sphereGeometry args={[100, 32, 32]} />\n        <meshBasicMaterial \n          color={isNight ? \"#0F0F23\" : \"#87CEEB\"}\n          side={THREE.BackSide}\n          transparent\n          opacity={isNight ? 0.9 : 0.8}\n        />\n      </mesh>\n    </group>\n  );\n}\n\n// Night-Only Beach Torches and Street Lamps\nfunction NightBeachLights() {\n  const { isNight } = useTheme();\n  const torchRefs = useRef<THREE.Mesh[]>([]);\n  \n  useFrame(({ clock }) => {\n    const t = clock.getElapsedTime();\n    torchRefs.current.forEach((torch, i) => {\n      if (torch && isNight) {\n        const material = torch.material as THREE.MeshStandardMaterial;\n        material.emissiveIntensity = 0.8 + Math.sin(t * 3 + i) * 0.3;\n      }\n    });\n  });\n  \n  if (!isNight) return null;\n  \n  return (\n    <group>\n      {/* Beach Torches */}\n      {Array.from({ length: 6 }).map((_, i) => {\n        const angle = (i / 6) * Math.PI * 2;\n        const radius = 8;\n        const x = Math.cos(angle) * radius;\n        const z = Math.sin(angle) * radius + 2;\n        \n        return (\n          <group key={i} position={[x, 0, z]}>\n            {/* Torch Pole */}\n            <mesh position={[0, 1.5, 0]}>\n              <cylinderGeometry args={[0.05, 0.08, 3, 8]} />\n              <meshStandardMaterial color=\"#654321\" />\n            </mesh>\n            \n            {/* Torch Fire */}\n            <mesh \n              ref={(el) => { if (el) torchRefs.current[i] = el; }}\n              position={[0, 3.2, 0]}\n            >\n              <coneGeometry args={[0.15, 0.4, 8]} />\n              <meshStandardMaterial \n                color=\"#FF4500\"\n                emissive=\"#FF6347\"\n                emissiveIntensity={1.0}\n              />\n            </mesh>\n            \n            {/* Light Source */}\n            <pointLight\n              position={[0, 3.2, 0]}\n              intensity={1.5}\n              color=\"#FFA500\"\n              distance={8}\n              decay={2}\n            />\n            \n            {/* Flickering Particles */}\n            <mesh position={[0, 3.4, 0]}>\n              <sphereGeometry args={[0.02, 8, 8]} />\n              <meshStandardMaterial \n                color=\"#FFD700\"\n                emissive=\"#FFD700\"\n                emissiveIntensity={1.5}\n              />\n            </mesh>\n          </group>\n        );\n      })}\n      \n      {/* Beach Lanterns on Poles */}\n      {Array.from({ length: 4 }).map((_, i) => {\n        const positions: [number, number, number][] = [\n          [-6, 0, 1], [6, 0, 1], [-8, 0, 4], [8, 0, 4]\n        ];\n        \n        return (\n          <group key={`lantern-${i}`} position={positions[i]}>\n            {/* Lantern Pole */}\n            <mesh position={[0, 2, 0]}>\n              <cylinderGeometry args={[0.03, 0.03, 4, 8]} />\n              <meshStandardMaterial color=\"#2F4F4F\" />\n            </mesh>\n            \n            {/* Lantern */}\n            <mesh position={[0, 3.8, 0]}>\n              <cylinderGeometry args={[0.2, 0.2, 0.6, 6]} />\n              <meshStandardMaterial \n                color=\"#FFD700\"\n                emissive=\"#FFA500\"\n                emissiveIntensity={0.8}\n                transparent\n                opacity={0.9}\n              />\n            </mesh>\n            \n            {/* Lantern Light */}\n            <pointLight\n              position={[0, 3.8, 0]}\n              intensity={1.2}\n              color=\"#FFD700\"\n              distance={6}\n            />\n          </group>\n        );\n      })}\n      \n      {/* Bonfire on Beach */}\n      <group position={[2, -0.4, 3]}>\n        {/* Fire Logs */}\n        {Array.from({ length: 4 }).map((_, i) => (\n          <mesh \n            key={i}\n            position={[\n              Math.cos((i * Math.PI) / 2) * 0.3,\n              0.1,\n              Math.sin((i * Math.PI) / 2) * 0.3\n            ]}\n            rotation={[0, (i * Math.PI) / 2, 0]}\n          >\n            <cylinderGeometry args={[0.05, 0.08, 0.8, 8]} />\n            <meshStandardMaterial color=\"#8B4513\" />\n          </mesh>\n        ))}\n        \n        {/* Fire Flames */}\n        <mesh position={[0, 0.4, 0]}>\n          <coneGeometry args={[0.25, 0.6, 8]} />\n          <meshStandardMaterial \n            color=\"#FF4500\"\n            emissive=\"#FF6347\"\n            emissiveIntensity={1.2}\n          />\n        </mesh>\n        \n        {/* Bonfire Light */}\n        <pointLight\n          position={[0, 0.6, 0]}\n          intensity={2.0}\n          color=\"#FF6347\"\n          distance={10}\n        />\n        \n        {/* Sparks */}\n        {Array.from({ length: 8 }).map((_, i) => (\n          <mesh \n            key={i}\n            position={[\n              (Math.random() - 0.5) * 1.5,\n              0.8 + Math.random() * 0.5,\n              (Math.random() - 0.5) * 1.5\n            ]}\n          >\n            <sphereGeometry args={[0.01, 4, 4]} />\n            <meshStandardMaterial \n              color=\"#FFD700\"\n              emissive=\"#FFD700\"\n              emissiveIntensity={2.0}\n            />\n          </mesh>\n        ))}\n      </group>\n    </group>\n  );\n}\n\n// Magical Night Effects - Fireflies and Stars\nfunction MagicalNightEffects() {\n  const { isNight } = useTheme();\n  const fireflyRefs = useRef<THREE.Mesh[]>([]);\n  \n  useFrame(({ clock }) => {\n    const t = clock.getElapsedTime();\n    \n    fireflyRefs.current.forEach((firefly, i) => {\n      if (firefly && isNight) {\n        // Floating animation\n        firefly.position.y = 1 + Math.sin(t * 0.5 + i) * 0.5;\n        firefly.position.x += Math.sin(t * 0.3 + i) * 0.01;\n        firefly.position.z += Math.cos(t * 0.4 + i) * 0.008;\n        \n        // Glowing effect\n        const material = firefly.material as THREE.MeshStandardMaterial;\n        material.emissiveIntensity = 1.0 + Math.sin(t * 4 + i) * 0.5;\n      }\n    });\n  });\n  \n  if (!isNight) return null;\n  \n  return (\n    <group>\n      {/* Fireflies */}\n      {Array.from({ length: 15 }).map((_, i) => (\n        <mesh \n          key={i}\n          ref={(el) => { if (el) fireflyRefs.current[i] = el; }}\n          position={[\n            (Math.random() - 0.5) * 20,\n            1 + Math.random() * 2,\n            Math.random() * 10 + 1\n          ]}\n        >\n          <sphereGeometry args={[0.02, 8, 8]} />\n          <meshStandardMaterial \n            color=\"#ADFF2F\"\n            emissive=\"#ADFF2F\"\n            emissiveIntensity={1.5}\n          />\n        </mesh>\n      ))}\n      \n      {/* Stars in Sky */}\n      {Array.from({ length: 50 }).map((_, i) => (\n        <mesh \n          key={`star-${i}`}\n          position={[\n            (Math.random() - 0.5) * 80,\n            15 + Math.random() * 20,\n            (Math.random() - 0.5) * 80\n          ]}\n        >\n          <sphereGeometry args={[0.05, 8, 8]} />\n          <meshStandardMaterial \n            color=\"#FFFFFF\"\n            emissive=\"#FFFFFF\"\n            emissiveIntensity={0.8}\n          />\n        </mesh>\n      ))}\n      \n      {/* Moon */}\n      <mesh position={[20, 25, -30]}>\n        <sphereGeometry args={[3, 32, 32]} />\n        <meshStandardMaterial \n          color=\"#F5F5DC\"\n          emissive=\"#F5F5DC\"\n          emissiveIntensity={0.3}\n        />\n      </mesh>\n    </group>\n  );\n}\n\n// Main Comprehensive Goa Beach Scene with enhanced visuals
export default function GoaBeachScene({ 
  season = 'summer', 
  weather = 'sunny', 
  character = 'priya'
}: { 
  season?: string; 
  weather?: string; 
  character?: string;
} = {}) {
  const { currentTime, timeProgress, isTransitioning, userActivity, accelerateTime, currentConfig } = useBeachTime();
  const { isNight } = useTheme();
  const [showShackInfo, setShowShackInfo] = useState(false);
  const [showTimeInfo, setShowTimeInfo] = useState(false);
  const [showEnvironmentInfo, setShowEnvironmentInfo] = useState(false);
  
  // Season-based environment adjustments
  const getSeasonalConfig = () => {
    switch (season) {
      case 'spring':
        return {
          skyTint: '#E6F3FF',
          waterColor: '#87CEEB',
          foliageIntensity: 1.2,
          flowerCount: 3,
          description: 'Spring blooms with fresh sea breeze'
        };
      case 'summer':
        return {
          skyTint: '#FFD700',
          waterColor: '#4169E1',
          foliageIntensity: 1.0,
          flowerCount: 2,
          description: 'Perfect summer beach weather'
        };
      case 'autumn':
        return {
          skyTint: '#FFA500',
          waterColor: '#2F4F4F',
          foliageIntensity: 0.8,
          flowerCount: 1,
          description: 'Golden autumn leaves meet ocean waves'
        };
      case 'winter':
        return {
          skyTint: '#B0C4DE',
          waterColor: '#708090',
          foliageIntensity: 0.6,
          flowerCount: 1,
          description: 'Peaceful winter solitude by the sea'
        };
      case 'tropical':
        return {
          skyTint: '#00CED1',
          waterColor: '#20B2AA',
          foliageIntensity: 1.5,
          flowerCount: 4,
          description: 'Lush tropical paradise'
        };
      case 'monsoon':
        return {
          skyTint: '#696969',
          waterColor: '#2F4F4F',
          foliageIntensity: 1.3,
          flowerCount: 2,
          description: 'Monsoon magic with dramatic skies'
        };
      default:
        return {
          skyTint: '#FFD700',
          waterColor: '#4169E1',
          foliageIntensity: 1.0,
          flowerCount: 2,
          description: 'Perfect beach weather'
        };
    }
  };
  
  const seasonalConfig = getSeasonalConfig();
  
  // Character selection component
  const renderCharacter = () => {
    const charPosition: [number, number, number] = [3, 0, 1];
    
    switch (character) {
      case 'priya':
        return <PriyaCharacter initialPosition={charPosition} />;
      case 'ururu':
        return <UruruCharacter initialPosition={charPosition} />;
      case 'galaxia':
        return <GalaxiaAnimeGirl />;
      default:
        return <PriyaCharacter initialPosition={charPosition} />;
    }
  };
  
  const seagullFlightPaths = useMemo((): [number, number, number][][] => [
    [
      [-3, 3, 2], [-1, 4, 1], [1, 3.5, 0], [3, 4, -1], [1, 3, -2], [-1, 4, -1]
    ],
    [
      [2, 2.5, 3], [4, 3, 1], [2, 3.5, -1], [0, 3, -2], [-2, 2.5, 0], [0, 3, 2]
    ],
    [
      [-6, 4, 1], [-4, 3.5, 3], [-2, 4.2, 2], [0, 3.8, 4], [2, 4, 3], [4, 3.5, 1]
    ]
  ] as [number, number, number][][], []);

  return (
    <group>
      {/* Enhanced Lighting System */}
      <ambientLight intensity={isNight ? 0.2 : 0.6} color={isNight ? "#191970" : "#FFF8DC"} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={isNight ? 0.1 : 1.2}
        color={isNight ? "#4169E1" : "#FFF8DC"}
        castShadow
      />
      
      {/* Night-only Moon Light */}
      {isNight && (
        <pointLight
          position={[0, 15, -10]}
          intensity={0.8}
          color="#E6E6FA"
          distance={30}
        />
      )}
      
      {/* Dynamic Sky Sphere with dramatic day/night colors */}
      <mesh>
        <sphereGeometry args={[100, 32, 32]} />
        <meshBasicMaterial 
          color={isNight ? "#0F0F23" : new THREE.Color(seasonalConfig.skyTint).lerp(new THREE.Color(currentConfig.skyColor), 0.7)}
          side={THREE.BackSide}
          transparent
          opacity={isNight ? 0.9 : 0.8}
        />
      </mesh>
      
      {/* Weather System Integration - Responds to weather changes */}
      <WeatherSystem 
        weatherType={weather as any}
        intensity={weather === 'stormy' ? 1.5 : weather === 'rainy' ? 1.0 : 0.5}
        autoChange={false}
        position={[0, 15, 0]}
      />
      
      {/* Seasonal Environmental Effects */}
      {season === 'spring' && (
        <group>
          {/* More vibrant colors for spring */}
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh key={i} position={[Math.random() * 15 - 7.5, 2 + Math.random() * 2, Math.random() * 3 + 2]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color="#FF69B4" emissive="#FF1493" emissiveIntensity={0.3} />
            </mesh>
          ))}
        </group>
      )}
      {season === 'summer' && (
        <mesh position={[0, 0.5, 0]}>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="#F5DEB3" transparent opacity={0.1} />
        </mesh>
      )}
      {season === 'autumn' && (
        <group>
          {/* Scattered leaves effect */}
          {Array.from({ length: 5 }).map((_, i) => (
            <mesh key={i} position={[Math.random() * 20 - 10, 1 + Math.random() * 1, Math.random() * 5]} rotation={[Math.random() * Math.PI, 0, 0]}>
              <planeGeometry args={[0.15, 0.15]} />
              <meshStandardMaterial color="#FF8C00" side={THREE.DoubleSide} />
            </mesh>
          ))}
        </group>
      )}
      {season === 'winter' && (
        <group>
          {/* Cool blue atmospheric effect */}
          <mesh position={[0, 10, 0]}>
            <sphereGeometry args={[50, 8, 8]} />
            <meshStandardMaterial color="#ADD8E6" transparent opacity={0.1} />
          </mesh>
        </group>
      )}
      
      {/* Luxury Beach Resort - Realistic Architecture */}
      <group position={[0, 0, 3]} rotation={[0, Math.PI, 0]}>
        
        {/* FOUNDATION & GROUND STRUCTURE */}
        {/* Resort Foundation */}
        <mesh position={[0, -0.3, 0]} receiveShadow>
          <boxGeometry args={[12, 0.6, 8]} />
          <meshStandardMaterial color="#D2B48C" roughness={0.8} />
        </mesh>
        
        {/* Stone foundation edges */}
        <mesh position={[0, -0.45, 0]} receiveShadow>
          <boxGeometry args={[12.5, 0.3, 8.5]} />
          <meshStandardMaterial color="#A0522D" roughness={0.9} />
        </mesh>
        
        {/* MAIN RESORT BUILDING - Realistic Scale */}
        {/* Ground Floor - Main Lobby & Reception */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[10, 3, 6]} />
          <meshStandardMaterial color="#F5E6D3" roughness={0.4} metalness={0.1} />
        </mesh>
        
        {/* Second Floor - Guest Rooms */}
        <mesh position={[0, 4, 0]} castShadow receiveShadow>
          <boxGeometry args={[9.5, 2.5, 5.5]} />
          <meshStandardMaterial color="#FAEBD7" roughness={0.4} metalness={0.1} />
        </mesh>
        
        {/* ARCHITECTURAL DETAILS */}
        {/* Front Glass Facade - Large Windows */}
        <mesh position={[0, 1.8, 3.1]}>
          <boxGeometry args={[8, 2.4, 0.05]} />
          <meshStandardMaterial 
            color="#87CEEB" 
            transparent 
            opacity={0.7} 
            metalness={0.8} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Second Floor Windows */}
        <mesh position={[-3, 4, 2.8]}>
          <boxGeometry args={[2, 1.5, 0.05]} />
          <meshStandardMaterial color="#B0E0E6" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, 4, 2.8]}>
          <boxGeometry args={[2, 1.5, 0.05]} />
          <meshStandardMaterial color="#B0E0E6" transparent opacity={0.8} />
        </mesh>
        <mesh position={[3, 4, 2.8]}>
          <boxGeometry args={[2, 1.5, 0.05]} />
          <meshStandardMaterial color="#B0E0E6" transparent opacity={0.8} />
        </mesh>
        
        
        {/* GRAND ENTRANCE & LOBBY */}
        {/* Main entrance doors */}
        <mesh position={[0, 1, 3.15]}>
          <boxGeometry args={[2, 2.2, 0.08]} />
          <meshStandardMaterial color="#DAA520" metalness={0.9} roughness={0.2} />
        </mesh>
        
        {/* Door handles and details */}
        <mesh position={[0.6, 1, 3.2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
          <meshStandardMaterial color="#B8860B" metalness={1.0} />
        </mesh>
        <mesh position={[-0.6, 1, 3.2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
          <meshStandardMaterial color="#B8860B" metalness={1.0} />
        </mesh>
        
        {/* Entrance overhang/canopy */}
        <mesh position={[0, 2.6, 3.5]}>
          <boxGeometry args={[3, 0.1, 0.8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} />
        </mesh>
        
        {/* DECORATIVE COLUMNS */}
        {Array.from({ length: 6 }).map((_, i) => (
          <group key={i}>
            {/* Main column */}
            <mesh position={[-4 + i * 1.6, 2, 3.05]}>
              <cylinderGeometry args={[0.12, 0.15, 3.5, 12]} />
              <meshStandardMaterial color="#F5DEB3" roughness={0.4} />
            </mesh>
            {/* Column capital */}
            <mesh position={[-4 + i * 1.6, 3.6, 3.05]}>
              <cylinderGeometry args={[0.18, 0.12, 0.3, 12]} />
              <meshStandardMaterial color="#DEB887" roughness={0.4} />
            </mesh>
            {/* Column base */}
            <mesh position={[-4 + i * 1.6, 0.4, 3.05]}>
              <cylinderGeometry args={[0.18, 0.15, 0.2, 12]} />
              <meshStandardMaterial color="#DEB887" roughness={0.5} />
            </mesh>
          </group>
        ))}
        
        
        {/* RESORT SIGNAGE */}
        <mesh position={[0, 4.8, 3.1]}>
          <boxGeometry args={[6, 0.6, 0.08]} />
          <meshStandardMaterial 
            color={isNight ? "#DAA520" : "#FFFFFF"}
            emissive={isNight ? "#FFD700" : "#000000"}
            emissiveIntensity={isNight ? 0.3 : 0}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
        
        {/* RESORT WINGS & AMENITIES */}
        {/* Left Wing - Spa & Wellness */}
        <mesh position={[-5.5, 1.2, -0.5]} castShadow receiveShadow>
          <boxGeometry args={[3, 2.4, 4]} />
          <meshStandardMaterial color="#E6E6FA" roughness={0.4} />
        </mesh>
        
        {/* Left Wing Windows */}
        <mesh position={[-5.5, 1.5, -2.51]}>
          <boxGeometry args={[2, 1, 0.05]} />
          <meshStandardMaterial color="#B0E0E6" transparent opacity={0.8} />
        </mesh>
        <mesh position={[-7.01, 1.5, -0.5]}>
          <boxGeometry args={[0.05, 1.5, 2.5]} />
          <meshStandardMaterial color="#B0E0E6" transparent opacity={0.8} />
        </mesh>
        
        {/* Right Wing - Dining & Events */}
        <mesh position={[5.5, 1.2, -0.5]} castShadow receiveShadow>
          <boxGeometry args={[3, 2.4, 4]} />
          <meshStandardMaterial color="#F0E68C" roughness={0.4} />
        </mesh>
        
        {/* Right Wing Windows */}
        <mesh position={[5.5, 1.5, -2.51]}>
          <boxGeometry args={[2, 1, 0.05]} />
          <meshStandardMaterial color="#B0E0E6" transparent opacity={0.8} />
        </mesh>
        <mesh position={[7.01, 1.5, -0.5]}>
          <boxGeometry args={[0.05, 1.5, 2.5]} />
          <meshStandardMaterial color="#B0E0E6" transparent opacity={0.8} />
        </mesh>
        
        
        {/* OUTDOOR AMENITIES */}
        {/* Swimming Pool - Realistic shape */}
        <group position={[6.5, 0.05, 1]}>
          {/* Pool water */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[4, 3]} />
            <meshStandardMaterial 
              color={isNight ? "#1E90FF" : "#00BFFF"}
              transparent
              opacity={0.8}
              metalness={0.1}
              roughness={0.1}
            />
          </mesh>
          {/* Pool edge/border */}
          <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2, 2.2]} />
            <meshStandardMaterial color="#F5DEB3" roughness={0.6} />
          </mesh>
        </group>
        
        {/* Pool Deck & Lounge Area */}
        <mesh position={[6.5, 0.02, 1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[6, 5]} />
          <meshStandardMaterial color="#DEB887" roughness={0.7} />
        </mesh>
        
        {/* Beach Access Walkway */}
        <mesh position={[0, 0.02, 4.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial color="#F5DEB3" roughness={0.6} />
        </mesh>
        
        {/* Tropical Landscaping */}
        {/* Palm trees near resort */}
        <group position={[-3, 0, 1]}>
          <mesh position={[0, 2.5, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.2, 5, 8]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </mesh>
          {/* Palm fronds */}
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={i} position={[Math.cos(i) * 0.8, 5.2, Math.sin(i) * 0.8]}>
              <boxGeometry args={[0.1, 2, 0.05]} />
              <meshStandardMaterial color="#228B22" roughness={0.6} />
            </mesh>
          ))}
        </group>
        
        <group position={[3, 0, 1]}>
          <mesh position={[0, 2, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.18, 4, 8]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </mesh>
          {/* Palm fronds */}
          {Array.from({ length: 5 }).map((_, i) => (
            <mesh key={i} position={[Math.cos(i * 1.2) * 0.6, 4.2, Math.sin(i * 1.2) * 0.6]}>
              <boxGeometry args={[0.08, 1.5, 0.04]} />
              <meshStandardMaterial color="#32CD32" roughness={0.6} />
            </mesh>
          ))}
        </group>
        
        {/* RESORT INTERIORS - Main Lobby & Reception (Todo #1) */}
        <group>
          {/* LOBBY FLOOR - Marble/Tile Flooring */}
          <mesh position={[0, 0.05, 0.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[9, 5]} />
            <meshStandardMaterial color="#F5F5DC" roughness={0.2} metalness={0.1} />
          </mesh>
          
          {/* Elegant Carpet Runner */}
          <mesh position={[0, 0.06, 1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[6, 2]} />
            <meshStandardMaterial color="#B22222" roughness={0.9} />
          </mesh>
          
          {/* LOBBY WALLS - Interior Walls */}
          {/* Back wall behind reception */}
          <mesh position={[0, 1.8, -2]} receiveShadow>
            <boxGeometry args={[8, 3.6, 0.2]} />
            <meshStandardMaterial color="#F5F5DC" roughness={0.6} />
          </mesh>
          
          {/* Left wall */}
          <mesh position={[-4, 1.8, 0.5]} receiveShadow>
            <boxGeometry args={[0.2, 3.6, 4]} />
            <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
          </mesh>
          
          {/* Right wall */}
          <mesh position={[4, 1.8, 0.5]} receiveShadow>
            <boxGeometry args={[0.2, 3.6, 4]} />
            <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
          </mesh>
          
          {/* RECEPTION DESK - Realistic Design */}
          <group position={[0, 0, -1]}>
            {/* Main reception counter */}
            <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
              <boxGeometry args={[4, 1.2, 0.8]} />
              <meshStandardMaterial color="#8B4513" roughness={0.4} metalness={0.1} />
            </mesh>
            
            {/* Counter top - Marble surface */}
            <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[4.2, 0.1, 0.9]} />
              <meshStandardMaterial color="#DCDCDC" roughness={0.1} metalness={0.2} />
            </mesh>
            
            {/* Reception computer/screen */}
            <mesh position={[-1, 1.35, 0]} castShadow>
              <boxGeometry args={[0.4, 0.3, 0.05]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            
            {/* Desk accessories */}
            <mesh position={[0.5, 1.3, 0.2]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.15, 8]} />
              <meshStandardMaterial color="#FFD700" metalness={0.8} />
            </mesh>
            
            {/* Bell for service */}
            <mesh position={[1.2, 1.28, 0]} castShadow>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color="#B8860B" metalness={0.9} />
            </mesh>
            
            {/* Reception desk chair */}
            <group position={[0, 0, -0.8]}>
              <mesh position={[0, 0.3, 0]} castShadow>
                <cylinderGeometry args={[0.25, 0.25, 0.6, 8]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              <mesh position={[0, 0.65, 0.15]} castShadow>
                <boxGeometry args={[0.4, 0.1, 0.3]} />
                <meshStandardMaterial color="#654321" />
              </mesh>
            </group>
          </group>
          
          {/* LOBBY SEATING AREA - Elegant Sofas */}
          <group position={[-2.5, 0, 1.5]}>
            {/* Main sofa */}
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.8, 0.5, 0.8]} />
              <meshStandardMaterial color="#4169E1" roughness={0.7} />
            </mesh>
            {/* Sofa back */}
            <mesh position={[0, 0.65, -0.3]} castShadow receiveShadow>
              <boxGeometry args={[1.8, 0.8, 0.2]} />
              <meshStandardMaterial color="#4169E1" roughness={0.7} />
            </mesh>
            {/* Armrests */}
            <mesh position={[-0.8, 0.55, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.2, 0.6, 0.8]} />
              <meshStandardMaterial color="#4169E1" roughness={0.7} />
            </mesh>
            <mesh position={[0.8, 0.55, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.2, 0.6, 0.8]} />
              <meshStandardMaterial color="#4169E1" roughness={0.7} />
            </mesh>
          </group>
          
          {/* Second seating area */}
          <group position={[2.5, 0, 1.5]}>
            {/* Armchair */}
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.5, 0.8]} />
              <meshStandardMaterial color="#32CD32" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.65, -0.3]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.8, 0.2]} />
              <meshStandardMaterial color="#32CD32" roughness={0.7} />
            </mesh>
          </group>
          
          {/* COFFEE TABLE */}
          <group position={[0, 0, 2]}>
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.2, 0.05, 0.6]} />
              <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.1} />
            </mesh>
            {/* Table legs */}
            <mesh position={[-0.4, 0.125, -0.2]} castShadow>
              <boxGeometry args={[0.05, 0.25, 0.05]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
            <mesh position={[0.4, 0.125, -0.2]} castShadow>
              <boxGeometry args={[0.05, 0.25, 0.05]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
            <mesh position={[-0.4, 0.125, 0.2]} castShadow>
              <boxGeometry args={[0.05, 0.25, 0.05]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
            <mesh position={[0.4, 0.125, 0.2]} castShadow>
              <boxGeometry args={[0.05, 0.25, 0.05]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
            
            {/* Table decorations */}
            <mesh position={[0, 0.32, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
              <meshStandardMaterial color="#FFD700" metalness={0.8} />
            </mesh>
          </group>
          
          {/* LOBBY PLANTS & DECORATION */}
          {/* Large potted plant */}
          <group position={[-3.5, 0, -1]}>
            <mesh position={[0, 0.15, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.25, 0.3, 8]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.6, 0]} castShadow>
              <sphereGeometry args={[0.3, 8, 8]} />
              <meshStandardMaterial color="#228B22" roughness={0.6} />
            </mesh>
          </group>
          
          <group position={[3.5, 0, -1]}>
            <mesh position={[0, 0.15, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.25, 0.3, 8]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.6, 0]} castShadow>
              <sphereGeometry args={[0.3, 8, 8]} />
              <meshStandardMaterial color="#32CD32" roughness={0.6} />
            </mesh>
          </group>
          
          {/* CEILING LIGHTING */}
          {/* Chandelier/Main light */}
          <group position={[0, 3.2, 0]}>
            <mesh position={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.3, 8]} />
              <meshStandardMaterial 
                color={isNight ? "#FFD700" : "#FFFFFF"}
                emissive={isNight ? "#FFD700" : "#000000"}
                emissiveIntensity={isNight ? 0.6 : 0}
                metalness={0.8}
              />
            </mesh>
            {/* Light rays */}
            {Array.from({ length: 6 }).map((_, i) => (
              <mesh key={i} position={[Math.cos(i) * 0.3, -0.1, Math.sin(i) * 0.3]} castShadow>
                <sphereGeometry args={[0.05, 6, 6]} />
                <meshStandardMaterial 
                  color="#FFF8DC"
                  emissive={isNight ? "#FFF8DC" : "#000000"}
                  emissiveIntensity={isNight ? 0.4 : 0}
                />
              </mesh>
            ))}
          </group>
          
          {/* Wall art and decorations */}
          <group position={[-3.8, 2.5, 0]}>
            <mesh position={[0, 0, 0]} castShadow>
              <boxGeometry args={[0.05, 0.8, 0.6]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[0.02, 0, 0]} castShadow>
              <boxGeometry args={[0.02, 0.7, 0.5]} />
              <meshStandardMaterial color="#87CEEB" />
            </mesh>
          </group>
          
          <group position={[3.8, 2.5, 0]}>
            <mesh position={[0, 0, 0]} castShadow>
              <boxGeometry args={[0.05, 0.8, 0.6]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[-0.02, 0, 0]} castShadow>
              <boxGeometry args={[0.02, 0.7, 0.5]} />
              <meshStandardMaterial color="#FFD700" />
            </mesh>
          </group>
          
          {/* Lobby lighting system */}
          {isNight && (
            <>
              <pointLight
                position={[0, 3, 0]}
                intensity={1.2}
                color="#FFF8DC"
                distance={8}
                castShadow
              />
              <pointLight
                position={[-2, 2.5, 1]}
                intensity={0.6}
                color="#FFD700"
                distance={5}
              />
              <pointLight
                position={[2, 2.5, 1]}
                intensity={0.6}
                color="#FFD700"
                distance={5}
              />
            </>
          )}
        </group>
      </group>
      
      {/* Floating Traditional Fishing Boats */}
      <FishingBoat position={[2, -0.3, -6]} />
      <FishingBoat position={[-4, -0.25, -7]} />
      <FishingBoat position={[6, -0.28, -8]} />
      <FishingBoat position={[-7, -0.27, -5]} />
      <FishingBoat position={[4, -0.29, -9]} />
      
      {/* Character in scene */}
      {renderCharacter()}
      
      {/* Enhanced Time-Based Lighting System */}
      <ambientLight 
        intensity={currentConfig.ambientIntensity} 
        color={currentConfig.skyColor}
      />
      
      {/* Dynamic Sun/Moon */}
      <directionalLight 
        position={[12, 6, -8]} 
        intensity={currentConfig.sunIntensity}
        color={currentConfig.sunColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Time-based atmospheric lighting */}
      <pointLight 
        position={[0, 4, 2]} 
        intensity={currentConfig.ambientIntensity * 1.2} 
        color={currentConfig.pointLightColor} 
        distance={25}
      />
      
      {/* Ocean rim lighting with time transitions */}
      <spotLight
        position={[0, 10, -15]}
        target-position={[0, 0, -8]}
        intensity={currentConfig.sunIntensity * 0.6}
        color={currentConfig.sunColor}
        angle={Math.PI / 2.5}
      />
      
      {/* Palm tree rim lighting */}
      <pointLight 
        position={[-8, 8, 4]} 
        intensity={0.4} 
        color={currentConfig.pointLightColor} 
        distance={15}
      />
      <pointLight 
        position={[8, 8, 4]} 
        intensity={0.4} 
        color={currentConfig.pointLightColor} 
        distance={15}
      />
      
      {/* Time-based particle system */}
      <TropicalParticles timeConfig={currentConfig} />
      
      {/* Time Status Display */}
      {showTimeInfo && (
        <Html position={[8, 6, 2]} center>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-white/30 max-w-xs"
          >
            <div className="text-center mb-3">
              <h3 className="font-bold text-lg" style={{ color: currentConfig.sunColor }}>
                🌅 {currentConfig.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {currentConfig.description}
              </p>
            </div>
            
            {/* Time Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{Math.round(timeProgress * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${timeProgress * 100}%`,
                    backgroundColor: currentConfig.sunColor
                  }}
                />
              </div>
            </div>
            
            {/* Activity Indicator */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Activity</span>
                <span>{Math.round(userActivity * 10)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, userActivity * 10)}%` }}
                />
              </div>
            </div>
            
            {isTransitioning && (
              <div className="text-center text-sm font-semibold text-purple-600 mb-2">
                ✨ Time Transitioning...
              </div>
            )}
            
            <button 
              onClick={() => setShowTimeInfo(false)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
            >
              Close
            </button>
          </motion.div>
        </Html>
      )}
      
      {/* Environment Status Display */}
      {showEnvironmentInfo && (
        <Html position={[8, 4, 5]} center>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-white/30 max-w-sm"
          >
            <div className="text-center mb-3">
              <h3 className="font-bold text-lg text-gray-800">
                🌊 Environment Status
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {seasonalConfig.description}
              </p>
            </div>
            
            {/* Environment Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="text-center p-2 bg-blue-100 rounded-lg">
                <div className="font-semibold text-blue-800">Season</div>
                <div className="text-blue-600 capitalize">{season}</div>
              </div>
              <div className="text-center p-2 bg-green-100 rounded-lg">
                <div className="font-semibold text-green-800">Weather</div>
                <div className="text-green-600 capitalize">{weather}</div>
              </div>
              <div className="text-center p-2 bg-purple-100 rounded-lg">
                <div className="font-semibold text-purple-800">Avatar</div>
                <div className="text-purple-600 capitalize">{character}</div>
              </div>
              <div className="text-center p-2 bg-orange-100 rounded-lg">
                <div className="font-semibold text-orange-800">Foliage</div>
                <div className="text-orange-600">{Math.round(seasonalConfig.foliageIntensity * 100)}%</div>
              </div>
            </div>
            
            <button 
              onClick={() => setShowEnvironmentInfo(false)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
            >
              Close Environment Info
            </button>
          </motion.div>
        </Html>
      )}
      
      {/* Beach foundation with enhanced visuals */}
      <DetailedBeachSand />
      <DetailedOcean season={season} waterColor={seasonalConfig.waterColor} />
      
      {/* Clean beach environment - resort focused */}
      
      {/* Time Control Button - Interactive beach elements */}
      <mesh 
        position={[8, 2, 2]} 
        onClick={() => {
          setShowTimeInfo(!showTimeInfo);
          accelerateTime();
        }}
        onPointerEnter={(e) => { document.body.style.cursor = 'pointer'; }}
        onPointerLeave={(e) => { document.body.style.cursor = 'default'; }}
      >
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial 
          color={currentConfig.sunColor}
          emissive={currentConfig.sunColor}
          emissiveIntensity={0.4}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Environment Info Button */}
      <mesh 
        position={[8, 3, 5]} 
        onClick={() => {
          setShowEnvironmentInfo(!showEnvironmentInfo);
          accelerateTime();
        }}
        onPointerEnter={(e) => { document.body.style.cursor = 'pointer'; }}
        onPointerLeave={(e) => { document.body.style.cursor = 'default'; }}
      >
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial 
          color={seasonalConfig.skyTint}
          emissive={seasonalConfig.skyTint}
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Resort-focused beach environment */}
      
      {/* Enhanced Beach Experience */}
      <DetailedOcean season={season} waterColor={seasonalConfig.waterColor} />
      <DetailedBeachSand />
      
      {/* Clean beach for resort experience */}
      
      {/* Enhanced wildlife */}
      <DetailedSeagull position={[-3, 3, 2]} flightPath={seagullFlightPaths[0]} />
      <DetailedSeagull position={[2, 2.5, 3]} flightPath={seagullFlightPaths[1]} />
      <DetailedSeagull position={[-6, 4, 1]} flightPath={seagullFlightPaths[2]} />
      
      {/* Tropical butterflies */}
      <TropicalButterfly position={[-2, 1.5, 2]} color="#FF69B4" />
      <TropicalButterfly position={[3, 1.8, 1]} color="#FFD700" />
      <TropicalButterfly position={[1, 2, 4]} color="#9370DB" />
      <TropicalButterfly position={[-5, 1.2, 3]} color="#32CD32" />
      
      {/* Premium beach elements */}
      <group>
        {/* Artistic driftwood sculptures */}
        {Array.from({ length: 8 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 25;
          const z = Math.random() * 8 + 1;
          return (
            <mesh key={i} position={[x, -0.45, z]} rotation={[0, Math.random() * Math.PI, 0]}>
              <cylinderGeometry args={[0.04, 0.06, 1 + Math.random() * 0.6, 8]} />
              <meshStandardMaterial 
                color="#D2B48C" 
                roughness={0.9}
                normalScale={new THREE.Vector2(0.8, 0.8)}
              />
            </mesh>
          );
        })}
        
        {/* Polished beach stones */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 30;
          const z = Math.random() * 10;
          const scale = 0.08 + Math.random() * 0.12;
          return (
            <mesh 
              key={i} 
              position={[x, -0.48, z]} 
              scale={[scale, scale * 0.6, scale * 1.3]}
              rotation={[Math.random() * 0.3, Math.random() * Math.PI, Math.random() * 0.3]}
            >
              <dodecahedronGeometry args={[1]} />
              <meshStandardMaterial 
                color={['#708090', '#2F4F4F', '#696969', '#A9A9A9', '#778899'][Math.floor(Math.random() * 5)]}
                roughness={0.3}
                metalness={0.1}
              />
            </mesh>
          );
        })}
        
        {/* Elaborate sand castle complex */}
        <group position={[4, -0.45, 1.5]}>
          {/* Main castle */}
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[0.4, 0.3, 0.4]} />
            <meshStandardMaterial color="#F5DEB3" />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <boxGeometry args={[0.25, 0.15, 0.25]} />
            <meshStandardMaterial color="#F5DEB3" />
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <coneGeometry args={[0.1, 0.15, 8]} />
            <meshStandardMaterial color="#DEB887" />
          </mesh>
          
          {/* Side towers */}
          <mesh position={[0.3, 0.08, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.16, 12]} />
            <meshStandardMaterial color="#F5DEB3" />
          </mesh>
          <mesh position={[-0.3, 0.08, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.16, 12]} />
            <meshStandardMaterial color="#F5DEB3" />
          </mesh>
          
          {/* Decorative flags */}
          <mesh position={[0, 0.52, 0]}>
            <planeGeometry args={[0.06, 0.04]} />
            <meshStandardMaterial color="#FF69B4" side={THREE.DoubleSide} />
          </mesh>
        </group>
        
        {/* Tropical fruit scattered around */}
        {Array.from({ length: 6 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 15;
          const z = Math.random() * 5 + 2;
          return (
            <mesh key={i} position={[x, -0.46, z]}>
              <sphereGeometry args={[0.05 + Math.random() * 0.03, 8, 8]} />
              <meshStandardMaterial 
                color={['#FF6347', '#FFD700', '#32CD32', '#FF1493', '#FFA500'][Math.floor(Math.random() * 5)]}
                roughness={0.8}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Interactive luxury experience overlay */}
      {showShackInfo && (
        <Html position={[-1, 3.5, 3]} center>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-gradient-to-br from-orange-50/98 via-yellow-50/96 to-pink-50/98 backdrop-blur-lg rounded-2xl p-6 text-center shadow-2xl border border-orange-200/60 max-w-sm relative"
            style={{
              background: 'linear-gradient(135deg, rgba(255,245,235,0.98) 0%, rgba(255,248,220,0.96) 50%, rgba(255,240,245,0.98) 100%)'
            }}
          >
            {/* Close Button - Prominent */}
            <button
              onClick={() => setShowShackInfo(false)}
              className="absolute top-2 right-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-all duration-200 hover:scale-110 shadow-md"
              title="Close welcome message"
            >
              ✕ Close
            </button>
            
            <h2 className="font-bold text-2xl bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-3">
              🏖️ Paradise Found in Goa
            </h2>
            <p className="text-orange-700 text-sm mb-4 leading-relaxed">
              Welcome to this stunning slice of Goan paradise! This golden beach represents dreams fulfilled, 
              achievements celebrated, and the magical moments that color our lives with joy.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
              <div className="flex items-center gap-1">
                <span>🌴</span>
                <span className="text-green-700">Tropical Palms</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🌊</span>
                <span className="text-blue-700">Crystal Waters</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🦋</span>
                <span className="text-purple-700">Butterflies</span>
              </div>
              <div className="flex items-center gap-1">
                <span>✨</span>
                <span className="text-yellow-700">Golden Hour</span>
              </div>
            </div>
            <button 
              onClick={() => setShowShackInfo(false)}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Continue Paradise Tour ✨
            </button>
          </motion.div>
        </Html>
      )}
    </group>
  );
}