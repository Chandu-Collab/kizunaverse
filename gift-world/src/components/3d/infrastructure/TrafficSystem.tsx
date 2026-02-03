import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

interface TrafficSystemProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  type?: 'signal' | 'sign' | 'zebra';
  signType?: 'stop' | 'speed' | 'direction' | 'warning';
}

export default function TrafficSystem({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  type = 'signal',
  signType = 'stop'
}: TrafficSystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [lightState, setLightState] = useState<'red' | 'yellow' | 'green'>('red');
  const { isNight } = useTheme();
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLabel(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useFrame(({ clock }) => {
    // Traffic light cycle: Red (4s) -> Green (4s) -> Yellow (2s)
    const time = Math.floor(clock.getElapsedTime()) % 10;
    if (time < 4) setLightState('red');
    else if (time < 8) setLightState('green');
    else setLightState('yellow');
  });

  if (type === 'signal') {
    return (
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        {/* Traffic Signal Post */}
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 3, 8]} />
          <meshStandardMaterial color="#708090" roughness={0.6} />
        </mesh>

        {/* Signal Box */}
        <mesh position={[0, 3.2, 0]}>
          <boxGeometry args={[0.4, 1.2, 0.2]} />
          <meshStandardMaterial color="#2F2F2F" roughness={0.8} />
        </mesh>

        {/* Traffic Lights */}
        {/* Red Light */}
        <mesh position={[0, 3.6, 0.11]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial 
            color={lightState === 'red' ? "#FF0000" : "#550000"}
            emissive={lightState === 'red' ? "#FF0000" : "#000000"}
            emissiveIntensity={lightState === 'red' ? 0.8 : 0}
          />
        </mesh>

        {/* Yellow Light */}
        <mesh position={[0, 3.2, 0.11]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial 
            color={lightState === 'yellow' ? "#FFFF00" : "#555500"}
            emissive={lightState === 'yellow' ? "#FFFF00" : "#000000"}
            emissiveIntensity={lightState === 'yellow' ? 0.8 : 0}
          />
        </mesh>

        {/* Green Light */}
        <mesh position={[0, 2.8, 0.11]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial 
            color={lightState === 'green' ? "#00FF00" : "#005500"}
            emissive={lightState === 'green' ? "#00FF00" : "#000000"}
            emissiveIntensity={lightState === 'green' ? 0.8 : 0}
          />
        </mesh>

        {/* Signal Hood */}
        <mesh position={[0, 3.7, 0]}>
          <boxGeometry args={[0.5, 0.1, 0.3]} />
          <meshStandardMaterial color="#2F2F2F" />
        </mesh>

        {/* Base */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
          <meshStandardMaterial color="#D3D3D3" roughness={0.9} />
        </mesh>

        {/* Signal Light Effect */}
        {(lightState === 'red' || lightState === 'yellow' || lightState === 'green') && (
          <pointLight 
            position={[0, 3.2, 0.5]} 
            color={lightState === 'red' ? "#FF0000" : lightState === 'yellow' ? "#FFFF00" : "#00FF00"}
            intensity={0.5} 
            distance={8} 
          />
        )}

        {/* Status Label */}
        {showLabel && (
          <Html position={[0, 4, 0]} center>
            <div style={{
              color: lightState === 'red' ? '#FF0000' : lightState === 'yellow' ? '#FFA500' : '#00FF00',
              fontSize: '8px',
              fontWeight: 'bold',
              textAlign: 'center',
              background: 'rgba(0,0,0,0.7)',
              padding: '2px 4px',
              borderRadius: '4px'
            }}>
              🚦 {lightState.toUpperCase()}
            </div>
          </Html>
        )}
      </group>
    );
  }

  if (type === 'sign') {
    const signData = {
      stop: { color: "#FF0000", text: "STOP", emoji: "🛑" },
      speed: { color: "#FFFFFF", text: "40", emoji: "⚡" },
      direction: { color: "#0000FF", text: "→", emoji: "➡️" },
      warning: { color: "#FFFF00", text: "⚠️", emoji: "⚠️" }
    };

    const currentSign = signData[signType];

    return (
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        {/* Sign Post */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
          <meshStandardMaterial color="#708090" roughness={0.6} />
        </mesh>

        {/* Sign Board */}
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.05]} />
          <meshStandardMaterial color={currentSign.color} roughness={0.7} />
        </mesh>

        {/* Sign Border */}
        <mesh position={[0, 2.2, 0.026]}>
          <boxGeometry args={[0.85, 0.85, 0.02]} />
          <meshStandardMaterial color="#2F2F2F" />
        </mesh>

        {/* Base */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.2, 8]} />
          <meshStandardMaterial color="#D3D3D3" roughness={0.9} />
        </mesh>

        {/* Sign Label */}
        <Html position={[0, 2.2, 0.1]} center>
          <div style={{
            color: signType === 'speed' ? '#000' : '#FFF',
            fontSize: signType === 'direction' ? '20px' : '12px',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {signType === 'speed' ? `${currentSign.text} km/h` : currentSign.text}
          </div>
        </Html>

        {/* Sign Info */}
        {showLabel && (
          <Html position={[0, 3, 0]} center>
            <div style={{
              color: isNight ? '#FFD700' : '#333',
              fontSize: '8px',
              fontWeight: 'bold',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.8)',
              padding: '1px 3px',
              borderRadius: '3px'
            }}>
              {currentSign.emoji}
            </div>
          </Html>
        )}
      </group>
    );
  }

  if (type === 'zebra') {
    return (
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        {/* Zebra Crossing Base */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <boxGeometry args={[3, 8, 0.01]} />
          <meshStandardMaterial color="#2F2F2F" roughness={0.9} />
        </mesh>

        {/* White Stripes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`stripe-${i}`} position={[0, 0.006, -3.5 + i]} rotation={[-Math.PI / 2, 0, 0]}>
            <boxGeometry args={[3, 0.8, 0.01]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
          </mesh>
        ))}

        {/* Crossing Signal Posts */}
        <mesh position={[-1.8, 1.2, -4.5]}>
          <cylinderGeometry args={[0.04, 0.04, 2.4, 8]} />
          <meshStandardMaterial color="#FFD700" roughness={0.6} />
        </mesh>
        <mesh position={[1.8, 1.2, 4.5]}>
          <cylinderGeometry args={[0.04, 0.04, 2.4, 8]} />
          <meshStandardMaterial color="#FFD700" roughness={0.6} />
        </mesh>

        {/* Pedestrian Signal Boxes */}
        <mesh position={[-1.8, 2.5, -4.5]}>
          <boxGeometry args={[0.2, 0.4, 0.1]} />
          <meshStandardMaterial color="#2F2F2F" />
        </mesh>
        <mesh position={[1.8, 2.5, 4.5]}>
          <boxGeometry args={[0.2, 0.4, 0.1]} />
          <meshStandardMaterial color="#2F2F2F" />
        </mesh>

        {/* Pedestrian Signals */}
        <mesh position={[-1.8, 2.5, -4.45]}>
          <circleGeometry args={[0.06, 12]} />
          <meshStandardMaterial 
            color={lightState === 'red' ? "#FF0000" : "#00FF00"}
            emissive={lightState === 'red' ? "#FF0000" : "#00FF00"}
            emissiveIntensity={0.6}
          />
        </mesh>
        <mesh position={[1.8, 2.5, 4.55]}>
          <circleGeometry args={[0.06, 12]} />
          <meshStandardMaterial 
            color={lightState === 'red' ? "#FF0000" : "#00FF00"}
            emissive={lightState === 'red' ? "#FF0000" : "#00FF00"}
            emissiveIntensity={0.6}
          />
        </mesh>

        {/* Zebra Crossing Label */}
        {showLabel && (
          <Html position={[0, 1, 0]} center>
            <div style={{
              color: isNight ? '#FFD700' : '#333',
              fontSize: '10px',
              fontWeight: 'bold',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.8)',
              padding: '2px 6px',
              borderRadius: '4px'
            }}>
              🚶 Zebra Crossing
            </div>
          </Html>
        )}
      </group>
    );
  }

  return null;
}