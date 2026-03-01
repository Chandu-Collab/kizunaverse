import React from 'react';
import { Text } from '@react-three/drei';

interface Lift3DProps {
  position?: [number, number, number];
  currentFloor?: 'ground' | 'first' | 'second';
  totalFloors?: number;
  isNight?: boolean;
}

const Lift3D: React.FC<Lift3DProps> = ({
  position = [0, 0, 0],
  currentFloor = 'ground',
  totalFloors = 3,
  isNight = false,
}) => {
  const FLOOR_HEIGHT = 6;
  const LIFT_WIDTH = 4;
  const LIFT_DEPTH = 3;
  const SHAFT_HEIGHT = totalFloors * FLOOR_HEIGHT;

  // Hospital-grade material properties based on day/night
  const shaftMaterial = isNight 
    ? { color: '#b3e5fc', roughness: 0.1, metalness: 0.9 }
    : { color: '#e0e0e0', roughness: 0.1, metalness: 0.8 };

  const doorMaterial = isNight
    ? { color: '#90caf9', roughness: 0.05, metalness: 0.95 }
    : { color: '#607d8b', roughness: 0.1, metalness: 0.9 };

  const buttonMaterial = (active: boolean) => ({
    color: active ? '#81c784' : '#fffde7',
    emissive: active ? '#4caf50' : '#e3f2fd',
    emissiveIntensity: active ? 0.6 : 0.2,
    metalness: 0.9,
    roughness: 0.05
  });

  // Calculate current lift car position based on floor
  const getCurrentCarY = () => {
    switch (currentFloor) {
      case 'ground': return 0;
      case 'first': return FLOOR_HEIGHT;
      case 'second': return FLOOR_HEIGHT * 2;
      default: return 0;
    }
  };

  const carY = getCurrentCarY();

  return (
    <group position={position}>
      {/* Lift Shaft - extends through all floors */}
      <group>
        {/* Main shaft structure */}
        <mesh position={[0, SHAFT_HEIGHT / 2, 0]}>
          <boxGeometry args={[LIFT_WIDTH + 0.4, SHAFT_HEIGHT, LIFT_DEPTH + 0.4]} />
          <meshStandardMaterial {...shaftMaterial} />
        </mesh>
        
        {/* Shaft interior (hollow) */}
        <mesh position={[0, SHAFT_HEIGHT / 2, 0]}>
          <boxGeometry args={[LIFT_WIDTH, SHAFT_HEIGHT + 0.1, LIFT_DEPTH]} />
          <meshStandardMaterial transparent opacity={0} />
        </mesh>
      </group>

      {/* Lift Car - moves based on current floor */}
      <group position={[0, carY + FLOOR_HEIGHT / 2, 0]}>
        {/* Hospital-grade lift car floor */}
        <mesh position={[0, -FLOOR_HEIGHT / 2 + 0.05, 0]}>
          <boxGeometry args={[LIFT_WIDTH - 0.1, 0.1, LIFT_DEPTH - 0.1]} />
          <meshStandardMaterial 
            color="#fffde7" 
            roughness={0.05} 
            metalness={0.2}
          />
        </mesh>
        
        {/* Medical-grade ceiling */}
        <mesh position={[0, FLOOR_HEIGHT / 2 - 0.05, 0]}>
          <boxGeometry args={[LIFT_WIDTH - 0.1, 0.1, LIFT_DEPTH - 0.1]} />
          <meshStandardMaterial 
            color="#fff" 
            roughness={0.1} 
            metalness={0.6}
          />
        </mesh>
        
        {/* Car interior lighting */}
        <pointLight
          position={[0, FLOOR_HEIGHT / 2 - 0.3, 0]}
          intensity={isNight ? 0.8 : 1.0}
          color={isNight ? "#b3d9ff" : "#ffffff"}
          distance={4}
        />
        
        {/* LED strip lighting around ceiling */}
        <mesh position={[0, FLOOR_HEIGHT / 2 - 0.15, 0]}>
          <torusGeometry args={[LIFT_WIDTH / 2 - 0.2, 0.02, 8, 24]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#e3f2fd"
            emissiveIntensity={isNight ? 0.6 : 0.3}
          />
        </mesh>
      </group>

      {/* Floor indicators and controls for each floor */}
      {[0, 1, 2].map((floorIndex) => {
        const floorNames = ['ground', 'first', 'second'] as const;
        const floorName = floorNames[floorIndex];
        const floorY = floorIndex * FLOOR_HEIGHT;
        const isCurrentFloor = floorName === currentFloor;

        return (
          <group key={floorIndex} position={[0, floorY, 0]}>
            {/* Call button panel outside lift */}
            <group position={[-LIFT_WIDTH / 2 - 0.3, 1.5, 0]}>
              {/* Hospital control panel backing */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.15, 0.8, 0.4]} />
                <meshStandardMaterial 
                  color="#b3e5fc" 
                  metalness={0.9} 
                  roughness={0.05} 
                />
              </mesh>
              
              {/* Up button (if not top floor) */}
              {floorIndex < totalFloors - 1 && (
                <mesh position={[0.05, 0.2, 0]}>
                  <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
                  <meshStandardMaterial {...buttonMaterial(isCurrentFloor)} />
                </mesh>
              )}
              
              {/* Down button (if not ground floor) */}
              {floorIndex > 0 && (
                <mesh position={[0.05, -0.2, 0]}>
                  <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
                  <meshStandardMaterial {...buttonMaterial(isCurrentFloor)} />
                </mesh>
              )}
              
              {/* Medical-grade floor indicator display */}
              <mesh position={[0.05, 0, 0]}>
                <boxGeometry args={[0.02, 0.2, 0.15]} />
                <meshStandardMaterial 
                  color={isCurrentFloor ? "#81c784" : "#fff"}
                  emissive={isCurrentFloor ? "#4caf50" : "#b3e5fc"}
                  emissiveIntensity={isCurrentFloor ? 0.8 : 0.3}
                  roughness={0.1}
                  metalness={0.8}
                />
              </mesh>
            </group>
            
            {/* Floor number text */}
            <Text
              position={[-LIFT_WIDTH / 2 - 0.6, 1.5, 0]}
              fontSize={0.3}
              color={isCurrentFloor ? "#81c784" : (isNight ? "#90caf9" : "#1976d2")}
              anchorX="center"
              anchorY="middle"
            >
              {floorIndex + 1}
            </Text>
            
            {/* Hospital floor label */}
            <Text
              position={[-LIFT_WIDTH / 2 - 0.6, 1.1, 0]}
              fontSize={0.15}
              color={isNight ? "#b3e5fc" : "#607d8b"}
              anchorX="center"
              anchorY="middle"
            >
              {floorName.toUpperCase()}
            </Text>
          </group>
        );
      })}

      {/* Lift doors for current floor */}
      <group position={[0, carY, LIFT_DEPTH / 2]}>
        {/* Left door */}
        <mesh position={[-LIFT_WIDTH / 4, FLOOR_HEIGHT / 2, 0.02]}>
          <boxGeometry args={[LIFT_WIDTH / 2 - 0.05, FLOOR_HEIGHT - 0.2, 0.04]} />
          <meshStandardMaterial {...doorMaterial} />
        </mesh>
        
        {/* Right door */}
        <mesh position={[LIFT_WIDTH / 4, FLOOR_HEIGHT / 2, 0.02]}>
          <boxGeometry args={[LIFT_WIDTH / 2 - 0.05, FLOOR_HEIGHT - 0.2, 0.04]} />
          <meshStandardMaterial {...doorMaterial} />
        </mesh>
        
        {/* Hospital-grade door handles */}
        <mesh position={[-0.3, FLOOR_HEIGHT / 2, 0.05]}>
          <boxGeometry args={[0.05, 0.2, 0.02]} />
          <meshStandardMaterial 
            color="#607d8b" 
            metalness={0.95} 
            roughness={0.05} 
          />
        </mesh>
        <mesh position={[0.3, FLOOR_HEIGHT / 2, 0.05]}>
          <boxGeometry args={[0.05, 0.2, 0.02]} />
          <meshStandardMaterial 
            color="#607d8b" 
            metalness={0.95} 
            roughness={0.05} 
          />
        </mesh>
      </group>

      {/* Emergency lighting above lift on each floor */}
      {[0, 1, 2].map((floorIndex) => {
        const floorY = floorIndex * FLOOR_HEIGHT;
        return (
          <pointLight
            key={`emergency-light-${floorIndex}`}
            position={[0, floorY + FLOOR_HEIGHT - 0.2, LIFT_DEPTH / 2 + 0.3]}
            intensity={isNight ? 0.4 : 0.2}
            color="#ff1744"
            distance={3}
          />
        );
      })}

      {/* Central lift shaft lighting */}
      <pointLight
        position={[0, SHAFT_HEIGHT / 2, 0]}
        intensity={isNight ? 0.6 : 0.4}
        color={isNight ? "#b3d9ff" : "#ffffff"}
        distance={8}
      />

      {/* Hospital lift identification */}
      <Text
        position={[0, SHAFT_HEIGHT + 0.5, 0]}
        fontSize={0.4}
        color={isNight ? "#90caf9" : "#1976d2"}
        anchorX="center"
        anchorY="middle"
      >
        Medical Lift
      </Text>
      
      <Text
        position={[0, SHAFT_HEIGHT + 0.1, 0]}
        fontSize={0.2}
        color={isNight ? "#b3e5fc" : "#607d8b"}
        anchorX="center"
        anchorY="middle"
      >
        Floor: {currentFloor.charAt(0).toUpperCase() + currentFloor.slice(1)}
      </Text>

      {/* Medical cross symbol */}
      <group position={[0, SHAFT_HEIGHT + 0.8, 0]}>
        <mesh>
          <boxGeometry args={[0.15, 0.05, 0.02]} />
          <meshStandardMaterial 
            color="#e53935" 
            emissive="#ffebee"
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh>
          <boxGeometry args={[0.05, 0.15, 0.02]} />
          <meshStandardMaterial 
            color="#e53935" 
            emissive="#ffebee"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Safety barriers around shaft opening on each floor */}
      {[0, 1, 2].map((floorIndex) => {
        const floorY = floorIndex * FLOOR_HEIGHT;
        return (
          <group key={`barrier-${floorIndex}`} position={[0, floorY, 0]}>
            {/* Hospital safety barriers */}
            <mesh position={[0, 0.5, LIFT_DEPTH / 2 + 0.15]}>
              <boxGeometry args={[LIFT_WIDTH + 0.6, 1, 0.1]} />
              <meshStandardMaterial 
                color="#fff59d" 
                transparent 
                opacity={0.6}
                roughness={0.3}
                metalness={0.1}
                emissive="#ffeb3b"
                emissiveIntensity={0.2}
              />
            </mesh>
            
            {/* Medical-grade side barriers */}
            <mesh position={[-LIFT_WIDTH / 2 - 0.15, 0.5, 0]}>
              <boxGeometry args={[0.1, 1, LIFT_DEPTH + 0.3]} />
              <meshStandardMaterial 
                color="#fff59d" 
                transparent 
                opacity={0.6}
                roughness={0.3}
                metalness={0.1}
                emissive="#ffeb3b"
                emissiveIntensity={0.2}
              />
            </mesh>
            <mesh position={[LIFT_WIDTH / 2 + 0.15, 0.5, 0]}>
              <boxGeometry args={[0.1, 1, LIFT_DEPTH + 0.3]} />
              <meshStandardMaterial 
                color="#fff59d" 
                transparent 
                opacity={0.6}
                roughness={0.3}
                metalness={0.1}
                emissive="#ffeb3b"
                emissiveIntensity={0.2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export default Lift3D;