import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

type WeatherType = 'sunny' | 'rainy' | 'cloudy' | 'monsoon' | 'winter';

interface WeatherSystemProps {
  position?: [number, number, number];
  intensity?: number;
  weatherType?: WeatherType;
  autoChange?: boolean;
}

export default function WeatherSystem({ 
  position = [0, 10, 0], 
  intensity = 1.0,
  weatherType = 'sunny',
  autoChange = true
}: WeatherSystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rainRef = useRef<THREE.Points>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();
  
  const [currentWeather, setCurrentWeather] = useState<WeatherType>(weatherType);
  const [weatherTimer, setWeatherTimer] = useState(0);

  // Weather patterns for Bengaluru
  const weatherCycle: WeatherType[] = ['sunny', 'cloudy', 'rainy', 'monsoon', 'sunny', 'winter'];
  
  // Auto-change weather every 30 seconds if enabled
  useEffect(() => {
    if (!autoChange) return;
    
    const interval = setInterval(() => {
      setCurrentWeather(prev => {
        const currentIndex = weatherCycle.indexOf(prev);
        const nextIndex = (currentIndex + 1) % weatherCycle.length;
        return weatherCycle[nextIndex];
      });
    }, 30000); // 30 seconds
    
    return () => clearInterval(interval);
  }, [autoChange]);

  // Rain particles
  const rainParticles = useMemo(() => {
    const particles = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      particles[i * 3] = (Math.random() - 0.5) * 80; // x
      particles[i * 3 + 1] = Math.random() * 40 + 10; // y
      particles[i * 3 + 2] = (Math.random() - 0.5) * 60; // z
    }
    return particles;
  }, []);

  // Cloud system
  const clouds = useMemo(() => {
    const cloudData = [];
    for (let i = 0; i < 8; i++) {
      cloudData.push({
        position: [
          (Math.random() - 0.5) * 100,
          20 + Math.random() * 10,
          (Math.random() - 0.5) * 80
        ] as [number, number, number],
        scale: 0.8 + Math.random() * 0.4,
        opacity: 0.3 + Math.random() * 0.4
      });
    }
    return cloudData;
  }, []);

  // Weather animation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Rain animation
    if (rainRef.current && (currentWeather === 'rainy' || currentWeather === 'monsoon')) {
      const positions = rainRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= (currentWeather === 'monsoon' ? 0.8 : 0.4) * intensity; // Fall speed
        
        // Reset rain drop when it hits ground
        if (positions[i + 1] < 0) {
          positions[i + 1] = 40;
          positions[i] = (Math.random() - 0.5) * 80;
          positions[i + 2] = (Math.random() - 0.5) * 60;
        }
      }
      
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    // Cloud movement and animation
    if (cloudsRef.current) {
      cloudsRef.current.children.forEach((cloud, i) => {
        cloud.position.x += Math.sin(time * 0.1 + i) * 0.02;
        cloud.rotation.y = time * 0.05 + i * 0.5;
        
        // Pulsing effect for clouds
        const scale = 0.8 + Math.sin(time * 0.3 + i) * 0.1;
        cloud.scale.setScalar(scale);
      });
    }
    
    // Overall group rotation for wind effect
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.05) * 0.02;
    }
  });

  // Weather-specific effects
  const getWeatherEffects = () => {
    switch (currentWeather) {
      case 'sunny':
        return {
          fogColor: isNight ? '#1a1a2e' : '#87CEEB',
          fogDensity: 0.001,
          ambientIntensity: isNight ? 0.2 : 0.8,
          showRain: false,
          showClouds: false,
          showSunRays: !isNight
        };
      case 'rainy':
        return {
          fogColor: '#708090',
          fogDensity: 0.003,
          ambientIntensity: isNight ? 0.15 : 0.5,
          showRain: true,
          showClouds: true,
          showSunRays: false
        };
      case 'cloudy':
        return {
          fogColor: '#778899',
          fogDensity: 0.002,
          ambientIntensity: isNight ? 0.18 : 0.6,
          showRain: false,
          showClouds: true,
          showSunRays: false
        };
      case 'monsoon':
        return {
          fogColor: '#2F4F4F',
          fogDensity: 0.005,
          ambientIntensity: isNight ? 0.1 : 0.3,
          showRain: true,
          showClouds: true,
          showSunRays: false
        };
      case 'winter':
        return {
          fogColor: isNight ? '#1a1a2e' : '#F0F8FF',
          fogDensity: 0.004,
          ambientIntensity: isNight ? 0.15 : 0.7,
          showRain: false,
          showClouds: true,
          showSunRays: !isNight
        };
      default:
        return {
          fogColor: '#87CEEB',
          fogDensity: 0.001,
          ambientIntensity: 0.6,
          showRain: false,
          showClouds: false,
          showSunRays: true
        };
    }
  };

  const effects = getWeatherEffects();

  return (
    <group ref={groupRef} position={position}>
      {/* Rain System */}
      {effects.showRain && (
        <points ref={rainRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[rainParticles, 3]}
              count={1000}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            color={currentWeather === 'monsoon' ? '#4682B4' : '#87CEEB'}
            size={currentWeather === 'monsoon' ? 0.1 : 0.05}
            transparent
            opacity={0.6}
          />
        </points>
      )}

      {/* Cloud System */}
      {effects.showClouds && (
        <group ref={cloudsRef}>
          {clouds.map((cloud, i) => (
            <group key={i} position={cloud.position} scale={cloud.scale}>
              {/* Main cloud body */}
              <mesh>
                <sphereGeometry args={[3, 16, 12]} />
                <meshStandardMaterial
                  color={isNight ? '#2F2F2F' : '#FFFFFF'}
                  transparent
                  opacity={cloud.opacity * (isNight ? 0.6 : 1)}
                  roughness={0.8}
                />
              </mesh>
              
              {/* Additional cloud puffs */}
              <mesh position={[-2, 0, 1]}>
                <sphereGeometry args={[2.5, 12, 10]} />
                <meshStandardMaterial
                  color={isNight ? '#2F2F2F' : '#FFFFFF'}
                  transparent
                  opacity={cloud.opacity * 0.8 * (isNight ? 0.6 : 1)}
                  roughness={0.8}
                />
              </mesh>
              
              <mesh position={[2.5, -0.5, -0.5]}>
                <sphereGeometry args={[2, 10, 8]} />
                <meshStandardMaterial
                  color={isNight ? '#2F2F2F' : '#FFFFFF'}
                  transparent
                  opacity={cloud.opacity * 0.7 * (isNight ? 0.6 : 1)}
                  roughness={0.8}
                />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* Sun Rays Effect */}
      {effects.showSunRays && !isNight && (
        <group>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * 25,
                  15,
                  Math.sin(angle) * 25
                ]}
                rotation={[0, angle, Math.PI / 4]}
              >
                <planeGeometry args={[1, 20]} />
                <meshStandardMaterial
                  color="#FFD700"
                  transparent
                  opacity={0.1}
                  emissive="#FFD700"
                  emissiveIntensity={0.2}
                />
              </mesh>
            );
          })}
        </group>
      )}

      {/* Lightning Effect (for monsoon) */}
      {currentWeather === 'monsoon' && Math.random() > 0.995 && (
        <mesh position={[Math.random() * 40 - 20, 25, Math.random() * 30 - 15]}>
          <cylinderGeometry args={[0.02, 0.02, 15, 4]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}

      {/* Weather Indicator (for debugging/info) */}
      <Html position={[0, -5, 0]} center>
        <div 
          style={{
            color: 'white',
            background: 'rgba(0,0,0,0.6)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            textAlign: 'center'
          }}
        >
          🌤️ {currentWeather.charAt(0).toUpperCase() + currentWeather.slice(1)}
          {currentWeather === 'rainy' && ' 🌧️'}
          {currentWeather === 'monsoon' && ' ⛈️'}
          {currentWeather === 'sunny' && ' ☀️'}
          {currentWeather === 'cloudy' && ' ☁️'}
          {currentWeather === 'winter' && ' ❄️'}
        </div>
      </Html>
    </group>
  );
}

// Weather Control Hook for external components
export function useWeatherSystem() {
  const [weather, setWeather] = useState<WeatherType>('sunny');
  const [autoWeather, setAutoWeather] = useState(true);
  
  const changeWeather = (newWeather: WeatherType) => {
    setWeather(newWeather);
    setAutoWeather(false);
  };
  
  const enableAutoWeather = () => {
    setAutoWeather(true);
  };
  
  return {
    weather,
    autoWeather,
    changeWeather,
    enableAutoWeather,
    weatherTypes: ['sunny', 'rainy', 'cloudy', 'monsoon', 'winter'] as WeatherType[]
  };
}