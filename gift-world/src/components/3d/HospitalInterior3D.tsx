            {/* --- Stairs on Both Sides with Vertical Rods --- */}
            {/* Ground Floor Stairs (Left to Center, both sides) */}
            <group position={[-7, 1, 5]}>
              {[...Array(6)].map((_, i) => (
                <mesh key={i} position={[-1.2, i * 0.18, i * 0.6]}>
                  <boxGeometry args={[1.2, 0.18, 0.6]} />
                  <meshStandardMaterial color="#bdbdbd" />
                </mesh>
              ))}
              {[...Array(6)].map((_, i) => (
                <mesh key={i+10} position={[1.2, i * 0.18, i * 0.6]}>
                  <boxGeometry args={[1.2, 0.18, 0.6]} />
                  <meshStandardMaterial color="#bdbdbd" />
                </mesh>
              ))}
              {/* Vertical rods connecting floors */}
              <mesh position={[-1.2, 0.54, 1.8]}>
                <cylinderGeometry args={[0.08, 0.08, 4, 16]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
              <mesh position={[1.2, 0.54, 1.8]}>
                <cylinderGeometry args={[0.08, 0.08, 4, 16]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
            </group>
            {/* Ground Floor Stairs (Central building, left side) */}
            <group position={[-6, 1, 13]}>
              {[...Array(6)].map((_, i) => (
                <mesh key={i} position={[0, i * 0.18, i * 0.6]}>
                  <boxGeometry args={[2, 0.18, 0.6]} />
                  <meshStandardMaterial color="#bdbdbd" />
                </mesh>
              ))}
              {/* Simple railings */}
              <mesh position={[-0.95, 0.54, 1.8]}>
                <boxGeometry args={[0.1, 1.2, 0.1]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
              <mesh position={[0.95, 0.54, 1.8]}>
                <boxGeometry args={[0.1, 1.2, 0.1]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
            </group>
            {/* Ground Floor Stairs (Central building, right side) */}
            <group position={[6, 1, 13]}>
              {[...Array(6)].map((_, i) => (
                <mesh key={i} position={[0, i * 0.18, i * 0.6]}>
                  <boxGeometry args={[2, 0.18, 0.6]} />
                  <meshStandardMaterial color="#bdbdbd" />
                </mesh>
              ))}
              {/* Simple railings */}
              <mesh position={[-0.95, 0.54, 1.8]}>
                <boxGeometry args={[0.1, 1.2, 0.1]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
              <mesh position={[0.95, 0.54, 1.8]}>
                <boxGeometry args={[0.1, 1.2, 0.1]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
            </group>
            {/* Ground Floor Stairs (Right to Center, both sides) */}
            <group position={[7, 1, 5]}>
              {[...Array(6)].map((_, i) => (
                <mesh key={i} position={[-1.2, i * 0.18, i * 0.6]}>
                  <boxGeometry args={[1.2, 0.18, 0.6]} />
                  <meshStandardMaterial color="#bdbdbd" />
                </mesh>
              ))}
              {[...Array(6)].map((_, i) => (
                <mesh key={i+10} position={[1.2, i * 0.18, i * 0.6]}>
                  <boxGeometry args={[1.2, 0.18, 0.6]} />
                  <meshStandardMaterial color="#bdbdbd" />
                </mesh>
              ))}
              <mesh position={[-1.2, 0.54, 1.8]}>
                <cylinderGeometry args={[0.08, 0.08, 4, 16]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
              <mesh position={[1.2, 0.54, 1.8]}>
                <cylinderGeometry args={[0.08, 0.08, 4, 16]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
            </group>
            {/* First Floor Stairs (Left to Center, both sides) */}
            <group position={[-7, 4, 5]}>
              {[...Array(6)].map((_, i) => (
                <mesh key={i} position={[-1.2, i * 0.18, i * 0.6]}>
                  <boxGeometry args={[1.2, 0.18, 0.6]} />
                  <meshStandardMaterial color="#bdbdbd" />
                </mesh>
              ))}
              {[...Array(6)].map((_, i) => (
                <mesh key={i+10} position={[1.2, i * 0.18, i * 0.6]}>
                  <boxGeometry args={[1.2, 0.18, 0.6]} />
                  <meshStandardMaterial color="#bdbdbd" />
                </mesh>
              ))}
              <mesh position={[-1.2, 0.54, 1.8]}>
                <cylinderGeometry args={[0.08, 0.08, 4, 16]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
              <mesh position={[1.2, 0.54, 1.8]}>
                <cylinderGeometry args={[0.08, 0.08, 4, 16]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
            </group>
            {/* First Floor Stairs (Central building, left side) */}
            <group position={[-6, 4, 13]}>
              {[...Array(6)].map((_, i) => (
                <mesh key={i} position={[0, i * 0.18, i * 0.6]}>
                  <boxGeometry args={[2, 0.18, 0.6]} />
                  <meshStandardMaterial color="#bdbdbd" />
                </mesh>
              ))}
              {/* Simple railings */}
              <mesh position={[-0.95, 0.54, 1.8]}>
                <boxGeometry args={[0.1, 1.2, 0.1]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
              <mesh position={[0.95, 0.54, 1.8]}>
                <boxGeometry args={[0.1, 1.2, 0.1]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
            </group>
            {/* First Floor Stairs (Central building, right side) */}
            <group position={[6, 4, 13]}>
              {[...Array(6)].map((_, i) => (
                <mesh key={i} position={[0, i * 0.18, i * 0.6]}>
                  <boxGeometry args={[2, 0.18, 0.6]} />
                  <meshStandardMaterial color="#bdbdbd" />
                </mesh>
              ))}
              {/* Simple railings */}
              <mesh position={[-0.95, 0.54, 1.8]}>
                <boxGeometry args={[0.1, 1.2, 0.1]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
              <mesh position={[0.95, 0.54, 1.8]}>
                <boxGeometry args={[0.1, 1.2, 0.1]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
            </group>
            {/* First Floor Stairs (Right to Center, both sides) */}
            <group position={[7, 4, 5]}>
              {[...Array(6)].map((_, i) => (
                <mesh key={i} position={[-1.2, i * 0.18, i * 0.6]}>
                  <boxGeometry args={[1.2, 0.18, 0.6]} />
                  <meshStandardMaterial color="#bdbdbd" />
                </mesh>
              ))}
              {[...Array(6)].map((_, i) => (
                <mesh key={i+10} position={[1.2, i * 0.18, i * 0.6]}>
                  <boxGeometry args={[1.2, 0.18, 0.6]} />
                  <meshStandardMaterial color="#bdbdbd" />
                </mesh>
              ))}
              <mesh position={[-1.2, 0.54, 1.8]}>
                <cylinderGeometry args={[0.08, 0.08, 4, 16]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
              <mesh position={[1.2, 0.54, 1.8]}>
                <cylinderGeometry args={[0.08, 0.08, 4, 16]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
            </group>
      {/* Connecting Stairs - Ground Floor (Left to Center) */}
      <group position={[-12, 1, 6]}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.18, i * 0.6]}>
            <boxGeometry args={[2, 0.18, 0.6]} />
            <meshStandardMaterial color="#bdbdbd" />
          </mesh>
        ))}
      </group>
      {/* Connecting Stairs - Ground Floor (Right to Center) */}
      <group position={[12, 1, 6]}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.18, i * 0.6]}>
            <boxGeometry args={[2, 0.18, 0.6]} />
            <meshStandardMaterial color="#bdbdbd" />
          </mesh>
        ))}
      </group>
      {/* Connecting Stairs - First Floor (Left to Center) */}
      <group position={[-12, 4, 6]}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.18, i * 0.6]}>
            <boxGeometry args={[2, 0.18, 0.6]} />
            <meshStandardMaterial color="#bdbdbd" />
          </mesh>
        ))}
      </group>
      {/* Connecting Stairs - First Floor (Right to Center) */}
      <group position={[12, 4, 6]}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.18, i * 0.6]}>
            <boxGeometry args={[2, 0.18, 0.6]} />
            <meshStandardMaterial color="#bdbdbd" />
          </mesh>
        ))}
      </group>
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Sky } from "@react-three/drei";
import { ReceptionRoom, WardRoom, OperationTheater, PharmacyRoom } from "./HospitalRooms";
import StoreRoom3D from "./StoreRoom3D";
import GeneratorRoom3D from "./GeneratorRoom3D";
import Male3D from "./Male3D";
import Female3D from "./Female3D";
import PetDog3D from "./PetDog3D";

interface HospitalInterior3DProps {
  position?: [number, number, number];
  currentRoom?:
    | "reception"
    | "ward"
    | "operation"
    | "pharmacy"
    | "store"
    | "generator"
    | "staffRest"
    | "exterior";
  viewMode?: "exterior" | "interior";
  isNight?: boolean;
}

export default function HospitalInterior3D({
  position = [0, 0, 0],
  currentRoom = "exterior",
  viewMode = "exterior",
  isNight = false,
}: HospitalInterior3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && viewMode === "exterior") {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.03) * 0.01;
    }
  });



  // Room positions for a realistic hospital layout (example values, adjust as needed)
  const roomPositions: { [key: string]: [number, number, number] } = {
    reception: [0, 0, 6],
    ward: [6, 0, 0],
    operation: [0, 0, -6],
    pharmacy: [-6, 0, 0],
    store: [6, 0, -6],
    generator: [-6, 0, -6],
    staffRest: [0, 0, 0],
  };

  // Room highlight color
  const highlightColor = '#1976d2';

  // Lighting values
  const ambientColor = isNight ? '#4a5568' : '#fff8e1';
  const ambientIntensity = isNight ? 0.4 : 0.7;

  // Room label positions (same as room positions, but above rooms)
  const labelY = 2.2;

  // Render all rooms in a realistic layout
  const allRooms = (
    <group>
      {/* Reception */}
      <group position={roomPositions.reception}>
        <ReceptionRoom />
        <Text position={[0, labelY, 0]} fontSize={0.32} color="#1976d2" anchorX="center" anchorY="middle" outlineColor="#fff" outlineWidth={0.02}>Reception</Text>
        {currentRoom === 'reception' && (
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[3.5, 0.1, 3.5]} />
            <meshStandardMaterial color={highlightColor} transparent opacity={0.18} emissive={highlightColor} emissiveIntensity={0.18} />
          </mesh>
        )}
      </group>
      {/* Ward */}
      <group position={roomPositions.ward}>
        <WardRoom />
        <Text position={[0, labelY, 0]} fontSize={0.32} color="#388e3c" anchorX="center" anchorY="middle" outlineColor="#fff" outlineWidth={0.02}>Ward</Text>
        {currentRoom === 'ward' && (
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[3.5, 0.1, 3.5]} />
            <meshStandardMaterial color="#388e3c" transparent opacity={0.18} emissive="#388e3c" emissiveIntensity={0.18} />
          </mesh>
        )}
      </group>
      {/* Operation Theater */}
      <group position={roomPositions.operation}>
        <OperationTheater />
        <Text position={[0, labelY, 0]} fontSize={0.32} color="#8e24aa" anchorX="center" anchorY="middle" outlineColor="#fff" outlineWidth={0.02}>Operation</Text>
        {currentRoom === 'operation' && (
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[3.5, 0.1, 3.5]} />
            <meshStandardMaterial color="#8e24aa" transparent opacity={0.18} emissive="#8e24aa" emissiveIntensity={0.18} />
          </mesh>
        )}
      </group>
      {/* Pharmacy */}
      <group position={roomPositions.pharmacy}>
        <PharmacyRoom />
        <Text position={[0, labelY, 0]} fontSize={0.32} color="#ff9800" anchorX="center" anchorY="middle" outlineColor="#fff" outlineWidth={0.02}>Pharmacy</Text>
        {currentRoom === 'pharmacy' && (
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[3.5, 0.1, 3.5]} />
            <meshStandardMaterial color="#ff9800" transparent opacity={0.18} emissive="#ff9800" emissiveIntensity={0.18} />
          </mesh>
        )}
      </group>
      {/* Store Room */}
      <group position={roomPositions.store}>
        <StoreRoom3D position={[0,0,0]} />
        <Text position={[0, labelY, 0]} fontSize={0.32} color="#00bcd4" anchorX="center" anchorY="middle" outlineColor="#fff" outlineWidth={0.02}>Store</Text>
        {currentRoom === 'store' && (
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[3.5, 0.1, 3.5]} />
            <meshStandardMaterial color="#00bcd4" transparent opacity={0.18} emissive="#00bcd4" emissiveIntensity={0.18} />
          </mesh>
        )}
      </group>
      {/* Generator Room */}
      <group position={roomPositions.generator}>
        <GeneratorRoom3D position={[0,0,0]} />
        <Text position={[0, labelY, 0]} fontSize={0.32} color="#009688" anchorX="center" anchorY="middle" outlineColor="#fff" outlineWidth={0.02}>Generator</Text>
        {currentRoom === 'generator' && (
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[3.5, 0.1, 3.5]} />
            <meshStandardMaterial color="#009688" transparent opacity={0.18} emissive="#009688" emissiveIntensity={0.18} />
          </mesh>
        )}
      </group>
      {/* Staff Rest Area */}
      <group position={roomPositions.staffRest}>
        <Text position={[0, labelY, 0]} fontSize={0.32} color="#fbc02d" anchorX="center" anchorY="middle" outlineColor="#fff" outlineWidth={0.02}>Staff Rest</Text>
        {/* Add benches, table, etc. here */}
        {currentRoom === 'staffRest' && (
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[3.5, 0.1, 3.5]} />
            <meshStandardMaterial color="#fbc02d" transparent opacity={0.18} emissive="#fbc02d" emissiveIntensity={0.18} />
          </mesh>
        )}
      </group>
    </group>
  );

  return (
    <group ref={groupRef} position={position}>
      {/* Sky and Environment */}
      <Sky azimuth={0.25} inclination={isNight ? 0.05 : 0.6} distance={1000} />
      <ambientLight intensity={ambientIntensity} color={ambientColor} />
      <directionalLight position={[15, 15, 10]} intensity={isNight ? 0.3 : 0.8} color={isNight ? '#9ca3af' : '#ffffff'} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />

      {/* --- Blockout: 3-Building, 2-Floor Structure --- */}

      {/* Central Building (closer to others) */}
      <group position={[0, 0, 0]}>
        {/* Ground Floor Shell */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[18, 2, 28]} />
          <meshStandardMaterial color="#e3eafc" opacity={0.7} transparent />
        </mesh>
        {/* Reception Area (realistic) */}
        <group position={[0, 0, 10]}>
          <ReceptionRoom />
        </group>
        {/* Emergency Room (placeholder, realistic style) */}
        <group position={[0, 0, -8]}>
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[6, 2, 8]} />
            <meshStandardMaterial color="#ffebee" opacity={0.7} transparent />
          </mesh>
          <Text position={[0, 2.2, 0]} fontSize={0.7} color="#d32f2f" anchorX="center" anchorY="middle">Emergency</Text>
        </group>
        {/* Pharmacy (realistic) */}
        <group position={[-6, 0, 0]}>
          <PharmacyRoom />
        </group>
        {/* Restrooms (placeholder, realistic style) */}
        <group position={[6, 0, 0]}>
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[4, 2, 4]} />
            <meshStandardMaterial color="#ede7f6" opacity={0.7} transparent />
          </mesh>
          <Text position={[0, 2.2, 0]} fontSize={0.6} color="#7b1fa2" anchorX="center" anchorY="middle">Restrooms</Text>
        </group>
        {/* First Floor Connecting Corridors (bridges between buildings) */}
        <mesh position={[-7, 2.01, 14]}>
          <boxGeometry args={[4, 0.02, 14]} />
          <meshStandardMaterial color="#42a5f5" opacity={0.85} transparent />
        </mesh>
        <mesh position={[7, 2.01, 14]}>
          <boxGeometry args={[4, 0.02, 14]} />
          <meshStandardMaterial color="#42a5f5" opacity={0.85} transparent />
        </mesh>
        {/* Central bridge between left and right buildings (first floor, rear) */}
        <mesh position={[0, 2.01, -10]}>
          <boxGeometry args={[18, 0.02, 4]} />
          <meshStandardMaterial color="#42a5f5" opacity={0.85} transparent />
        </mesh>
        {/* First Floor */}
        <mesh position={[0, 4, 0]}>
          <boxGeometry args={[18, 2, 28]} />
          <meshStandardMaterial color="#c5cae9" opacity={0.7} transparent />
        </mesh>
        {/* Elevator Shaft (center) */}
        <mesh position={[0, 2.5, 10]}>
          <boxGeometry args={[2, 5, 2]} />
          <meshStandardMaterial color="#b0bec5" opacity={0.85} transparent />
        </mesh>
        {/* Ground Floor Connecting Corridors (between buildings) */}
        <mesh position={[-7, 0.01, 14]}>
          <boxGeometry args={[4, 0.02, 14]} />
          <meshStandardMaterial color="#1976d2" opacity={0.85} transparent />
        </mesh>
        <mesh position={[7, 0.01, 14]}>
          <boxGeometry args={[4, 0.02, 14]} />
          <meshStandardMaterial color="#1976d2" opacity={0.85} transparent />
        </mesh>
        {/* Central corridor between left and right buildings (ground floor, rear) */}
        <mesh position={[0, 0.01, -10]}>
          <boxGeometry args={[18, 0.02, 4]} />
          <meshStandardMaterial color="#1976d2" opacity={0.85} transparent />
        </mesh>
        {/* Elevator Car (ground floor) */}
        <mesh position={[0, 1, 10]}>
          <boxGeometry args={[1.4, 1.6, 1.4]} />
          <meshStandardMaterial color="#78909c" opacity={0.95} transparent />
        </mesh>
        {/* Elevator Doors (ground floor) */}
        <mesh position={[0, 1, 11.05]}>
          <boxGeometry args={[1.4, 1.6, 0.1]} />
          <meshStandardMaterial color="#ececec" />
        </mesh>
        {/* Elevator Doors (first floor) */}
        <mesh position={[0, 4, 11.05]}>
          <boxGeometry args={[1.4, 1.6, 0.1]} />
          <meshStandardMaterial color="#ececec" />
        </mesh>
      </group>
      {/* Left Building (closer) */}
      <group position={[-14, 0, 0]}>
        {/* Ground Floor */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[12, 2, 20]} />
          <meshStandardMaterial color="#ffe0b2" opacity={0.7} transparent />
        </mesh>
        {/* First Floor */}
        <mesh position={[0, 4, 0]}>
          <boxGeometry args={[12, 2, 20]} />
          <meshStandardMaterial color="#ffcc80" opacity={0.7} transparent />
        </mesh>
        {/* Elevator Shaft (center) */}
        <mesh position={[0, 2.5, 6]}>
          <boxGeometry args={[2, 5, 2]} />
          <meshStandardMaterial color="#b0bec5" opacity={0.85} transparent />
        </mesh>
        {/* Elevator Car (ground floor) */}
        <mesh position={[0, 1, 6]}>
          <boxGeometry args={[1.4, 1.6, 1.4]} />
          <meshStandardMaterial color="#78909c" opacity={0.95} transparent />
        </mesh>
        {/* Elevator Doors (ground floor) */}
        <mesh position={[0, 1, 7.05]}>
          <boxGeometry args={[1.4, 1.6, 0.1]} />
          <meshStandardMaterial color="#ececec" />
        </mesh>
        {/* Elevator Doors (first floor) */}
        <mesh position={[0, 4, 7.05]}>
          <boxGeometry args={[1.4, 1.6, 0.1]} />
          <meshStandardMaterial color="#ececec" />
        </mesh>
      </group>
      {/* Right Building (closer) */}
      <group position={[14, 0, 0]}>
        {/* Ground Floor */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[12, 2, 20]} />
          <meshStandardMaterial color="#b2dfdb" opacity={0.7} transparent />
        </mesh>
        {/* First Floor */}
        <mesh position={[0, 4, 0]}>
          <boxGeometry args={[12, 2, 20]} />
          <meshStandardMaterial color="#80cbc4" opacity={0.7} transparent />
        </mesh>
        {/* Elevator Shaft (center) */}
        <mesh position={[0, 2.5, 6]}>
          <boxGeometry args={[2, 5, 2]} />
          <meshStandardMaterial color="#b0bec5" opacity={0.85} transparent />
        </mesh>
        {/* Elevator Car (ground floor) */}
        <mesh position={[0, 1, 6]}>
          <boxGeometry args={[1.4, 1.6, 1.4]} />
          <meshStandardMaterial color="#78909c" opacity={0.95} transparent />
        </mesh>
        {/* Elevator Doors (ground floor) */}
        <mesh position={[0, 1, 7.05]}>
          <boxGeometry args={[1.4, 1.6, 0.1]} />
          <meshStandardMaterial color="#ececec" />
        </mesh>
        {/* Elevator Doors (first floor) */}
        <mesh position={[0, 4, 7.05]}>
          <boxGeometry args={[1.4, 1.6, 0.1]} />
          <meshStandardMaterial color="#ececec" />
        </mesh>
      </group>

      {/* --- Corridors: Floor Meshes for Visual Clarity --- */}
      {/* Ground Floor Corridors */}
      <mesh position={[-7, 0.01, 0]}>
        <boxGeometry args={[4, 0.02, 12]} />
        <meshStandardMaterial color="#90caf9" opacity={0.8} transparent />
      </mesh>
      <mesh position={[7, 0.01, 0]}>
        <boxGeometry args={[4, 0.02, 12]} />
        <meshStandardMaterial color="#90caf9" opacity={0.8} transparent />
      </mesh>
      {/* First Floor Corridors */}
      <mesh position={[-7, 2.01, 0]}>
        <boxGeometry args={[4, 0.02, 12]} />
        <meshStandardMaterial color="#64b5f6" opacity={0.8} transparent />
      </mesh>
      <mesh position={[7, 2.01, 0]}>
        <boxGeometry args={[4, 0.02, 12]} />
        <meshStandardMaterial color="#64b5f6" opacity={0.8} transparent />
      </mesh>

      {/* --- Stairs: Visually Distinct with Railings --- */}
      {/* Ground Floor Stairs (Left to Center) */}
      <group position={[-12, 1, 6]}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.18, i * 0.6]}>
            <boxGeometry args={[2, 0.18, 0.6]} />
            <meshStandardMaterial color="#bdbdbd" />
          </mesh>
        ))}
        {/* Simple railings */}
        <mesh position={[-0.95, 0.54, 1.8]}>
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshStandardMaterial color="#757575" />
        </mesh>
        <mesh position={[0.95, 0.54, 1.8]}>
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshStandardMaterial color="#757575" />
        </mesh>
      </group>
      {/* Ground Floor Stairs (Right to Center) */}
      <group position={[12, 1, 6]}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.18, i * 0.6]}>
            <boxGeometry args={[2, 0.18, 0.6]} />
            <meshStandardMaterial color="#bdbdbd" />
          </mesh>
        ))}
        <mesh position={[-0.95, 0.54, 1.8]}>
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshStandardMaterial color="#757575" />
        </mesh>
        <mesh position={[0.95, 0.54, 1.8]}>
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshStandardMaterial color="#757575" />
        </mesh>
      </group>
      {/* First Floor Stairs (Left to Center) */}
      <group position={[-12, 4, 6]}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.18, i * 0.6]}>
            <boxGeometry args={[2, 0.18, 0.6]} />
            <meshStandardMaterial color="#bdbdbd" />
          </mesh>
        ))}
        <mesh position={[-0.95, 0.54, 1.8]}>
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshStandardMaterial color="#757575" />
        </mesh>
        <mesh position={[0.95, 0.54, 1.8]}>
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshStandardMaterial color="#757575" />
        </mesh>
      </group>
      {/* First Floor Stairs (Right to Center) */}
      <group position={[12, 4, 6]}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.18, i * 0.6]}>
            <boxGeometry args={[2, 0.18, 0.6]} />
            <meshStandardMaterial color="#bdbdbd" />
          </mesh>
        ))}
        <mesh position={[-0.95, 0.54, 1.8]}>
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshStandardMaterial color="#757575" />
        </mesh>
        <mesh position={[0.95, 0.54, 1.8]}>
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshStandardMaterial color="#757575" />
        </mesh>
      </group>

      {/* --- End Blockout --- */}

      {/* Room and layout rendering (keep for future steps) */}
      {/*
      {viewMode === "exterior" ? (
        <Text position={[0, 10, 0]} fontSize={1} color="#1976d2">Hospital Exterior</Text>
      ) : (
        allRooms
      )}
      */}

      {/* Add common elements like staff, pets, etc. */}
      <Male3D position={[2, 0, 2]} />
      <Female3D position={[-2, 0, 2]} />
      <PetDog3D position={[0, 0, -2]} />
    </group>
  );
}
