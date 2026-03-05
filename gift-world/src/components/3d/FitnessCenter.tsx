'use client';

import { useTheme } from '@/hooks/useTheme';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FitnessCenter() {
  const { isNight } = useTheme();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    // Animation hooks for future use
  });

  return (
    <group>
      {/* LIGHTING - Bright Gym Environment */}
      <ambientLight intensity={isNight ? 0.5 : 0.9} color={isNight ? '#e6d1b8' : '#ffffff'} />

      <directionalLight
        position={[8, 13, 8]}
        intensity={isNight ? 0.6 : 1.4}
        color={isNight ? '#ffb366' : '#ffffff'}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={60}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />

      <directionalLight
        position={[-8, 11, -8]}
        intensity={isNight ? 0.4 : 0.7}
        color={isNight ? '#ffdab9' : '#f0f0f0'}
      />

      {/* BRIGHT TASK LIGHTING - Over equipment zones */}
      <pointLight position={[-4, 3, 0.5]} intensity={isNight ? 1.8 : 2.2} color={isNight ? '#ffff99' : '#ffffff'} distance={10} />
      <pointLight position={[0, 3, 0]} intensity={isNight ? 1.8 : 2.2} color={isNight ? '#ffff99' : '#ffffff'} distance={10} />
      <pointLight position={[4, 3, 0.5]} intensity={isNight ? 1.8 : 2.2} color={isNight ? '#ffff99' : '#ffffff'} distance={10} />
      <pointLight position={[0, 3, -1.5]} intensity={isNight ? 1.6 : 2.0} color={isNight ? '#87ceeb' : '#ffffff'} distance={8} />
      <pointLight position={[-2, 3, -2.5]} intensity={isNight ? 1.6 : 2.0} color={isNight ? '#87ceeb' : '#ffffff'} distance={8} />
      <pointLight position={[2, 3, -2.5]} intensity={isNight ? 1.6 : 2.0} color={isNight ? '#87ceeb' : '#ffffff'} distance={8} />

      {/* FLOOR - Gym resilient flooring */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.4} metalness={0.05} />
      </mesh>

      {/* WALLS - Left, Right & Back (Front open) */}
      <mesh position={[-6, 1.8, 0]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 8]} />
        <meshStandardMaterial color="#00ffff" roughness={0.5} metalness={0.2} />
      </mesh>

      <mesh position={[6, 1.8, 0]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 8]} />
        <meshStandardMaterial color="#ff1493" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* BACK WALL */}
      <mesh position={[0, 1.8, -4]} receiveShadow>
        <boxGeometry args={[12, 3.6, 0.2]} />
        <meshStandardMaterial color="#cc00ff" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* CEILING */}
      <mesh position={[0, 3.6, 0]} receiveShadow>
        <boxGeometry args={[12, 0.25, 8]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.3} />
      </mesh>

      {/* MIRRORS - Full-length gym mirrors on walls */}
      <mesh position={[-5.9, 1.8, -1.5]}>
        <planeGeometry args={[0.2, 2.8]} />
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.8} metalness={0.6} roughness={0.1} />
      </mesh>
      <mesh position={[5.9, 1.8, -1.5]}>
        <planeGeometry args={[0.2, 2.8]} />
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.8} metalness={0.6} roughness={0.1} />
      </mesh>
      <mesh position={[-5.9, 1.8, 1.5]}>
        <planeGeometry args={[0.2, 2.8]} />
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.8} metalness={0.6} roughness={0.1} />
      </mesh>

      {/* RECEPTION DESK - Front entrance */}
      <group position={[0, 0, 2.8]}>
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 1.2, 0.8]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.1, 0.1, 0.9]} />
          <meshStandardMaterial color="#34495e" roughness={0.2} metalness={0.2} />
        </mesh>
      </group>

      {/* HAND SANITIZER STATIONS - Front entrance sides */}
      <group position={[-2.5, 0, 2.8]}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial color="#0099ff" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 1.3, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 8]} />
          <meshStandardMaterial color="#00ffff" roughness={0.2} metalness={0.6} />
        </mesh>
      </group>

      <group position={[2.5, 0, 2.8]}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial color="#0099ff" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 1.3, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 8]} />
          <meshStandardMaterial color="#00ffff" roughness={0.2} metalness={0.6} />
        </mesh>
      </group>

      {/* TOWEL DISPENSER - Front center right */}
      <group position={[4.5, 0, 2.6]}>
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 1.4, 0.4]} />
          <meshStandardMaterial color="#8b7355" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 1.4, 0.15]} castShadow>
          <boxGeometry args={[0.4, 0.3, 0.2]} />
          <meshStandardMaterial color="#ff6600" roughness={0.3} metalness={0.3} />
        </mesh>
      </group>

      {/* CARDIO ZONE - Left side (Treadmills & Ellipticals) */}
      <group position={[-4.2, 0, 0.8]}>
        {/* Treadmill 1 */}
        <mesh position={[-0.8, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.8, 1.0]} />
          <meshStandardMaterial color="#00ffff" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[-0.8, 0.85, 0]} castShadow>
          <boxGeometry args={[1.6, 0.1, 0.8]} />
          <meshStandardMaterial color="#ff00ff" roughness={0.3} metalness={0.2} />
        </mesh>

        {/* Elliptical 1 */}
        <mesh position={[0.8, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.7, 1.2]} />
          <meshStandardMaterial color="#0fff00" roughness={0.4} metalness={0.25} />
        </mesh>
        {/* Elliptical handles */}
        <mesh position={[0.8, 1.1, -0.5]} castShadow>
          <boxGeometry args={[1.4, 0.08, 0.08]} />
          <meshStandardMaterial color="#0fff00" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* Treadmill 2 */}
        <mesh position={[-0.8, 0.4, -1.5]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.8, 1.0]} />
          <meshStandardMaterial color="#ff6600" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[-0.8, 0.85, -1.5]} castShadow>
          <boxGeometry args={[1.6, 0.1, 0.8]} />
          <meshStandardMaterial color="#0fff00" roughness={0.3} metalness={0.2} />
        </mesh>

        {/* Elliptical 2 */}
        <mesh position={[0.8, 0.35, -1.5]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.7, 1.2]} />
          <meshStandardMaterial color="#00ffff" roughness={0.4} metalness={0.25} />
        </mesh>
        <mesh position={[0.8, 1.1, -2]} castShadow>
          <boxGeometry args={[1.4, 0.08, 0.08]} />
          <meshStandardMaterial color="#00ffff" metalness={0.5} roughness={0.3} />
        </mesh>
      </group>

      {/* ROWING MACHINES ZONE - Center front */}
      <group position={[0, 0, 0.3]}>
        {/* Rowing Machine 1 */}
        <mesh position={[-1.2, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.6, 0.8]} />
          <meshStandardMaterial color="#ff00ff" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Rowing seat */}
        <mesh position={[-1.2, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.15, 8]} />
          <meshStandardMaterial color="#8b4513" roughness={0.4} />
        </mesh>
        {/* Rowing handle */}
        <mesh position={[-0.2, 0.85, 0]} castShadow>
          <boxGeometry args={[1.2, 0.08, 0.08]} />
          <meshStandardMaterial color="#00ffff" metalness={0.6} roughness={0.2} />
        </mesh>

        {/* Rowing Machine 2 */}
        <mesh position={[1.2, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.6, 0.8]} />
          <meshStandardMaterial color="#0099ff" roughness={0.4} metalness={0.2} />
        </mesh>
        <mesh position={[1.2, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.15, 8]} />
          <meshStandardMaterial color="#8b4513" roughness={0.4} />
        </mesh>
        <mesh position={[2.2, 0.85, 0]} castShadow>
          <boxGeometry args={[1.2, 0.08, 0.08]} />
          <meshStandardMaterial color="#ff6600" metalness={0.6} roughness={0.2} />
        </mesh>
      </group>
      <group position={[3.5, 0, 0.8]}>
        {/* Weight rack */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 1.0, 0.5]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Dumbbell holders on rack */}
        {[-0.8, -0.2, 0.4].map((x, idx) => (
          <mesh key={`db-${idx}`} position={[x, 1.1, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.25, 8]} />
            <meshStandardMaterial color="#696969" metalness={0.7} roughness={0.2} />
          </mesh>
        ))}

        {/* Exercise bench */}
        <mesh position={[0, 0.3, -1.2]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.6, 1.6]} />
          <meshStandardMaterial color="#8b4513" roughness={0.4} metalness={0.05} />
        </mesh>
      </group>

      {/* STRENGTH TRAINING ZONE - Right side (Free weights, Squat Rack, Barbells) */}
      <group position={[4, 0, 0.8]}>
        {/* Dumbbell Rack */}
        <mesh position={[-1.2, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 1.0, 0.5]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Dumbbell holders on rack */}
        {[-0.8, -0.2, 0.4].map((x, idx) => (
          <mesh key={`db-${idx}`} position={[-1.2 + x, 1.1, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.25, 8]} />
            <meshStandardMaterial color="#696969" metalness={0.7} roughness={0.2} />
          </mesh>
        ))}

        {/* SQUAT RACK - Power rack with barbells */}
        <mesh position={[1.0, 1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 2.0, 1.0]} />
          <meshStandardMaterial color="#ff00ff" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Squat bar */}
        <mesh position={[1.0, 1.4, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.8, 12]} />
          <meshStandardMaterial color="#0099ff" metalness={0.8} roughness={0.1} />
        </mesh>

        {/* Exercise bench */}
        <mesh position={[-1.2, 0.3, -1.2]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.6, 1.6]} />
          <meshStandardMaterial color="#8b4513" roughness={0.4} metalness={0.05} />
        </mesh>
      </group>

      {/* BARBELL PLATES STORAGE - Right back area */}
      <group position={[5.5, 0, 0.5]}>
        {/* Plate storage rack */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.0, 1.8]} />
          <meshStandardMaterial color="#654321" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Barbell plates (visual) */}
        {[-0.6, 0, 0.6].map((z, idx) => (
          <mesh key={`plate-${idx}`} position={[0, 0.9, z]} castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.08, 16]} />
            <meshStandardMaterial color={idx === 0 ? '#ff0000' : idx === 1 ? '#0099ff' : '#00ff00'} roughness={0.3} metalness={0.4} />
          </mesh>
        ))}
      </group>

      {/* KETTLEBELLS STATION - Center area */}
      <group position={[0, 0, -0.8]}>
        {/* Kettlebell stand */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.8, 1.2]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.5} metalness={0.1} />
        </mesh>
        {/* Kettlebells on stand */}
        {[-0.6, 0, 0.6].map((x, idx) => (
          <mesh key={`kb-${idx}`} position={[x, 1.1, -0.2]} castShadow>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial color={idx === 0 ? '#ff0000' : idx === 1 ? '#ff00ff' : '#00ffff'} roughness={0.3} metalness={0.5} />
          </mesh>
        ))}
        {/* Handle bars for kettlebells */}
        {[-0.6, 0, 0.6].map((x, idx) => (
          <mesh key={`kb-handle-${idx}`} position={[x, 1.35, -0.2]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.3, 8]} />
            <meshStandardMaterial color="#8b4513" metalness={0.5} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* PERSONAL TRAINING AREA - Center back zone */}
      <group position={[-0.5, 0, -2.8]}>
        {/* Training mat area (floor marker) */}
        <mesh position={[0, 0.01, 0]} receiveShadow>
          <planeGeometry args={[2.8, 1.0]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.05} />
        </mesh>
      </group>
      <group position={[-2.2, 0, -2.0]}>
        {/* Cable machine tower */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 2.4, 0.5]} />
          <meshStandardMaterial color="#ff00ff" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Cable pulleys (visual) */}
        {[0.6, -0.6].map((y, idx) => (
          <mesh key={`pulley-${idx}`} position={[0.28, y, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.08, 12]} />
            <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* STRETCHING & YOGA ZONE - Back center-right */}
      <group position={[2.2, 0, -2.0]}>
        {/* Yoga mat area (textured floor section) */}
        <mesh position={[0, 0.01, 0]}>
          <planeGeometry args={[2.0, 1.8]} />
          <meshStandardMaterial color="#7b68ee" roughness={0.6} />
        </mesh>
        {/* Stretching bar (barre) */}
        <mesh position={[0, 1.0, -0.8]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1.8, 12]} />
          <meshStandardMaterial color="#8b4513" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* FOAM ROLLER DISPLAY - Recovery zone */}
        <mesh position={[-0.8, 0.4, 0.6]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.8, 0.8]} />
          <meshStandardMaterial color="#654321" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Foam rollers (visual) */}
        {[-0.3, 0.3].map((z, idx) => (
          <mesh key={`foam-${idx}`} position={[-0.8, 0.95, z + 0.6]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.8, 12]} />
            <meshStandardMaterial color={idx === 0 ? '#ff6600' : '#00ffff'} roughness={0.5} metalness={0.1} />
          </mesh>
        ))}
      </group>

      {/* CARDIO BIKES ZONE - Back right */}
      <group position={[4.2, 0, -1.8]}>
        {/* Stationary bike 1 */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.6, 1.2]} />
          <meshStandardMaterial color="#0099ff" roughness={0.5} metalness={0.3} />
        </mesh>
        {/* Bike seat */}
        <mesh position={[0, 0.8, -0.3]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.15, 12]} />
          <meshStandardMaterial color="#8b4513" roughness={0.4} />
        </mesh>
        {/* Bike handlebar */}
        <mesh position={[0, 0.85, 0.4]} castShadow>
          <boxGeometry args={[0.6, 0.1, 0.08]} />
          <meshStandardMaterial color="#0099ff" metalness={0.5} roughness={0.3} />
        </mesh>
      </group>

      {/* LOCKER/TOWEL STATION - Back left */}
      <group position={[-4.5, 0, -3.0]}>
        {/* Locker unit */}
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.8, 0.5]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Locker doors (3 rows) */}
        {[0.6, 0, -0.6].map((y, idx) => (
          <mesh key={`locker-${idx}`} position={[-0.45, y, -0.22]} castShadow>
            <boxGeometry args={[0.5, 0.55, 0.08]} />
            <meshStandardMaterial color="#ff10f0" roughness={0.3} metalness={0.3} />
          </mesh>
        ))}
        {/* Towel rack below */}
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[1.0, 0.2, 0.4]} />
          <meshStandardMaterial color="#8b7355" roughness={0.4} metalness={0.1} />
        </mesh>
      </group>

      {/* WATER & NUTRITION STATION - Back right corner */}
      <group position={[4.2, 0, -3.0]}>
        {/* Counter */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 1.0, 0.8]} />
          <meshStandardMaterial color="#8b7355" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Water cooler */}
        <mesh position={[-0.4, 1.1, 0.3]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 12]} />
          <meshStandardMaterial color="#87ceeb" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Cooler top cap */}
        <mesh position={[-0.4, 1.35, 0.3]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.12, 8]} />
          <meshStandardMaterial color="#4682b4" metalness={0.6} roughness={0.2} />
        </mesh>
        {/* Protein supplement shelf */}
        <mesh position={[0.35, 1.0, 0]} castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#daa520" roughness={0.3} metalness={0.1} />
        </mesh>
      </group>

      {/* EQUIPMENT STORAGE - Left back corner */}
      <group position={[-4.5, 0, -3.0]}>
        {/* Mat storage rack */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 1.0, 1.2]} />
          <meshStandardMaterial color="#654321" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Stability ball storage */}
        {[-0.3, 0.3].map((x, idx) => (
          <mesh key={`ball-${idx}`} position={[x, 1.0, 0.3]} castShadow>
            <sphereGeometry args={[0.25, 12, 12]} />
            <meshStandardMaterial color={idx === 0 ? '#ff6b6b' : '#4ecdc4'} roughness={0.5} metalness={0.05} />
          </mesh>
        ))}
      </group>

      {/* MOTIVATIONAL CLOCK/TIMER - Wall-mounted */}
      <mesh position={[-5.8, 2.8, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.1, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[-5.75, 2.8, 0.05]}>
        <cylinderGeometry args={[0.3, 0.3, 0.02, 12]} />
        <meshStandardMaterial color="#e6e6fa" roughness={0.2} metalness={0.2} />
      </mesh>

      {/* VENTILATION UNITS - Ceiling fans (visual) */}
      {[-3, 0, 3].map((x, idx) => (
        <mesh key={`fan-${idx}`} position={[x, 3.5, -1]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.1, 12]} />
          <meshStandardMaterial color="#696969" roughness={0.4} metalness={0.3} />
        </mesh>
      ))}

      {/* PULL-UP BAR - Wall mounted at back */}
      <mesh position={[0, 2.8, -3.95]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 2.0, 12]} />
        <meshStandardMaterial color="#00ffff" metalness={0.8} roughness={0.1} />
      </mesh>

      {/* SOUND SYSTEM SPEAKERS - Ceiling mounted */}
      <group position={[-4.5, 3.5, -2]} castShadow>
        <mesh>
          <boxGeometry args={[0.4, 0.6, 0.4]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.15, 8]} />
          <meshStandardMaterial color="#666666" roughness={0.3} metalness={0.4} />
        </mesh>
      </group>

      <group position={[4.5, 3.5, -2]} castShadow>
        <mesh>
          <boxGeometry args={[0.4, 0.6, 0.4]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.15, 8]} />
          <meshStandardMaterial color="#666666" roughness={0.3} metalness={0.4} />
        </mesh>
      </group>

      {/* TV MONITOR - Wall mounted center back */}
      <mesh position={[0, 2.5, -3.95]}>
        <boxGeometry args={[2.0, 1.2, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.4} />
      </mesh>
      {/* TV screen (glow effect) */}
      <mesh position={[0, 2.5, -3.85]}>
        <planeGeometry args={[1.9, 1.1]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.3} roughness={0.1} metalness={0.2} />
      </mesh>

      {/* TV MONITOR LEFT SIDE - Wall mounted */}
      <mesh position={[-5.8, 2.2, -1.5]}>
        <boxGeometry args={[0.15, 1.0, 1.6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Monitor screen left */}
      <mesh position={[-5.75, 2.2, -1.5]}>
        <planeGeometry args={[0.1, 0.95]} />
        <meshStandardMaterial color="#00ccff" emissive="#00ccff" emissiveIntensity={0.25} roughness={0.1} metalness={0.2} />
      </mesh>
    </group>
  );
}
