import React from 'react';
import { Text } from '@react-three/drei';

interface Lift3DProps {
  position?: [number, number, number];
  currentFloor?: 'ground' | 'first' | 'second';
  totalFloors?: number;
  isNight?: boolean;
  isMoving?: boolean;
  direction?: 'up' | 'down' | 'stopped';
  occupancy?: 'empty' | 'light' | 'moderate' | 'full';
  doorStatus?: 'open' | 'closed' | 'opening' | 'closing';
  waitingQueue?: number;
  maintenanceMode?: boolean;
  estimatedArrival?: number; // in seconds
}

const Lift3D: React.FC<Lift3DProps> = ({
  position = [0, 0, 0],
  currentFloor = 'ground',
  totalFloors = 3,
  isNight = false,
  isMoving = false,
  direction = 'stopped',
  occupancy = 'empty',
  doorStatus = 'closed',
  waitingQueue = 0,
  maintenanceMode = false,
  estimatedArrival = 0,
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

  // Occupancy indicator colors
  const getOccupancyColor = () => {
    switch (occupancy) {
      case 'empty': return '#4caf50';
      case 'light': return '#ffb74d';
      case 'moderate': return '#ff7043';
      case 'full': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  // Door status colors
  const getDoorStatusColor = () => {
    switch (doorStatus) {
      case 'open': return '#4caf50';
      case 'opening': return '#81c784';
      case 'closing': return '#ffb74d';
      case 'closed': return '#e0e0e0';
      default: return '#9e9e9e';
    }
  };

  // Service status
  const getServiceStatus = () => {
    if (maintenanceMode) return { color: '#f44336', text: 'MAINTENANCE' };
    if (isMoving) return { color: '#2196f3', text: 'IN SERVICE' };
    return { color: '#4caf50', text: 'AVAILABLE' };
  };

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
        
        {/* LED strip lighting around ceiling - changes based on status */}
        <mesh position={[0, FLOOR_HEIGHT / 2 - 0.15, 0]}>
          <torusGeometry args={[LIFT_WIDTH / 2 - 0.2, 0.02, 8, 24]} />
          <meshStandardMaterial 
            color={maintenanceMode ? "#f44336" : isMoving ? "#2196f3" : "#ffffff"} 
            emissive={maintenanceMode ? "#ffebee" : isMoving ? "#e3f2fd" : "#e3f2fd"}
            emissiveIntensity={maintenanceMode ? 1.0 : isMoving ? 0.8 : (isNight ? 0.6 : 0.3)}
          />
        </mesh>
        
        {/* Occupancy indicator lights inside car */}
        <group position={[0, FLOOR_HEIGHT / 2 - 0.3, 0]}>
          {['empty', 'light', 'moderate', 'full'].map((level, index) => {
            const isActive = ['empty', 'light', 'moderate', 'full'].indexOf(occupancy) >= index;
            return (
              <mesh key={level} position={[(index - 1.5) * 0.3, 0, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.01, 16]} />
                <meshStandardMaterial 
                  color={isActive ? getOccupancyColor() : "#424242"}
                  emissive={isActive ? getOccupancyColor() : "#000000"}
                  emissiveIntensity={isActive ? 0.6 : 0}
                />
              </mesh>
            );
          })}
        </group>
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
              
              {/* Medical-grade floor indicator display with real-time status */}
              <mesh position={[0.05, 0, 0]}>
                <boxGeometry args={[0.02, 0.2, 0.15]} />
                <meshStandardMaterial 
                  color={isCurrentFloor && !maintenanceMode ? "#81c784" : maintenanceMode ? "#f44336" : "#fff"}
                  emissive={isCurrentFloor && !maintenanceMode ? "#4caf50" : maintenanceMode ? "#f44336" : "#b3e5fc"}
                  emissiveIntensity={isCurrentFloor || maintenanceMode ? 0.8 : 0.3}
                  roughness={0.1}
                  metalness={0.8}
                />
              </mesh>
              
              {/* Real-time arrival indicator */}
              {estimatedArrival > 0 && floorName !== currentFloor && (
                <Text
                  position={[0.15, -0.15, 0]}
                  fontSize={0.05}
                  color="#4caf50"
                  anchorX="center"
                  anchorY="middle"
                >
                  {estimatedArrival}s
                </Text>
              )}
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

      {/* Real-time Status Display Panel */}
      <group position={[LIFT_WIDTH / 2 + 0.8, SHAFT_HEIGHT / 2, 0]}>
        {/* Main status screen */}
        <mesh>
          <boxGeometry args={[0.8, 1.5, 0.1]} />
          <meshStandardMaterial 
            color="#263238"
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
        
        {/* Screen display */}
        <mesh position={[0.06, 0, 0]}>
          <boxGeometry args={[0.7, 1.3, 0.02]} />
          <meshStandardMaterial 
            color="#000"
            emissive="#0d47a1"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Status indicators */}
        <group position={[0.1, 0.4, 0]}>
          {/* Service status light */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
            <meshStandardMaterial 
              color={getServiceStatus().color}
              emissive={getServiceStatus().color}
              emissiveIntensity={maintenanceMode ? 1.0 : 0.8}
            />
          </mesh>
          
          {/* Occupancy indicator */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
            <meshStandardMaterial 
              color={getOccupancyColor()}
              emissive={getOccupancyColor()}
              emissiveIntensity={0.6}
            />
          </mesh>
          
          {/* Door status indicator */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
            <meshStandardMaterial 
              color={getDoorStatusColor()}
              emissive={getDoorStatusColor()}
              emissiveIntensity={doorStatus === 'opening' || doorStatus === 'closing' ? 1.0 : 0.6}
            />
          </mesh>
          
          {/* Movement indicator */}
          {isMoving && (
            <mesh position={[0, -0.15, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
              <meshStandardMaterial 
                color="#2196f3"
                emissive="#2196f3"
                emissiveIntensity={1.0}
              />
            </mesh>
          )}
        </group>
      </group>

      {/* Status Text Display */}
      <group position={[LIFT_WIDTH / 2 + 0.8, SHAFT_HEIGHT / 2, 0.15]}>
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.08}
          color={getServiceStatus().color}
          anchorX="center"
          anchorY="middle"
        >
          {getServiceStatus().text}
        </Text>
        
        <Text
          position={[0, 0.3, 0]}
          fontSize={0.06}
          color={isNight ? "#90caf9" : "#1976d2"}
          anchorX="center"
          anchorY="middle"
        >
          Floor: {currentFloor.toUpperCase()}
        </Text>
        
        <Text
          position={[0, 0.15, 0]}
          fontSize={0.05}
          color={getOccupancyColor()}
          anchorX="center"
          anchorY="middle"
        >
          Load: {occupancy.toUpperCase()}
        </Text>
        
        <Text
          position={[0, 0, 0]}
          fontSize={0.05}
          color={getDoorStatusColor()}
          anchorX="center"
          anchorY="middle"
        >
          Doors: {doorStatus.toUpperCase()}
        </Text>
        
        {isMoving && (
          <Text
            position={[0, -0.15, 0]}
            fontSize={0.05}
            color="#2196f3"
            anchorX="center"
            anchorY="middle"
          >
            {direction === 'up' ? '↑ ASCENDING' : direction === 'down' ? '↓ DESCENDING' : 'MOVING'}
          </Text>
        )}
        
        {waitingQueue > 0 && (
          <Text
            position={[0, -0.35, 0]}
            fontSize={0.04}
            color="#ff9800"
            anchorX="center"
            anchorY="middle"
          >
            Queue: {waitingQueue} waiting
          </Text>
        )}
        
        {estimatedArrival > 0 && (
          <Text
            position={[0, -0.5, 0]}
            fontSize={0.04}
            color="#4caf50"
            anchorX="center"
            anchorY="middle"
          >
            ETA: {estimatedArrival}s
          </Text>
        )}
      </group>

      {/* Movement Direction Indicators */}
      {isMoving && (
        <group position={[0, carY + FLOOR_HEIGHT + 0.5, 0]}>
          {direction === 'up' && (
            <mesh>
              <coneGeometry args={[0.2, 0.4, 6]} />
              <meshStandardMaterial 
                color="#4caf50"
                emissive="#81c784"
                emissiveIntensity={0.8}
              />
            </mesh>
          )}
          {direction === 'down' && (
            <mesh rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.2, 0.4, 6]} />
              <meshStandardMaterial 
                color="#ff9800"
                emissive="#ffb74d"
                emissiveIntensity={0.8}
              />
            </mesh>
          )}
        </group>
      )}

      {/* Queue Status Indicators on Each Floor */}
      {[0, 1, 2].map((floorIndex) => {
        const floorY = floorIndex * FLOOR_HEIGHT;
        const queueAtFloor = Math.max(0, waitingQueue - floorIndex);
        
        return queueAtFloor > 0 ? (
          <group key={`queue-${floorIndex}`} position={[LIFT_WIDTH / 2 + 0.5, floorY + 1.8, 0]}>
            <mesh>
              <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
              <meshStandardMaterial 
                color="#ff9800"
                emissive="#ffb74d"
                emissiveIntensity={0.6}
              />
            </mesh>
            <Text
              position={[0.2, 0, 0]}
              fontSize={0.08}
              color="#ff9800"
              anchorX="left"
              anchorY="middle"
            >
              {queueAtFloor}
            </Text>
          </group>
        ) : null;
      })}

      {/* Hospital lift identification with real-time status */}
      <Text
        position={[0, SHAFT_HEIGHT + 0.5, 0]}
        fontSize={0.4}
        color={maintenanceMode ? "#f44336" : (isNight ? "#90caf9" : "#1976d2")}
        anchorX="center"
        anchorY="middle"
      >
        Medical Lift {maintenanceMode ? "[MAINTENANCE]" : ""}
      </Text>
      
      <Text
        position={[0, SHAFT_HEIGHT + 0.1, 0]}
        fontSize={0.2}
        color={isNight ? "#b3e5fc" : "#607d8b"}
        anchorX="center"
        anchorY="middle"
      >
        {isMoving ? `Moving ${direction} from ${currentFloor}` : `Floor: ${currentFloor.charAt(0).toUpperCase() + currentFloor.slice(1)}`}
      </Text>
      
      {/* Real-time usage statistics */}
      <Text
        position={[0, SHAFT_HEIGHT - 0.2, 0]}
        fontSize={0.15}
        color={getOccupancyColor()}
        anchorX="center"
        anchorY="middle"
      >
        Capacity: {occupancy} • Doors: {doorStatus} {waitingQueue > 0 ? `• Queue: ${waitingQueue}` : ""}
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