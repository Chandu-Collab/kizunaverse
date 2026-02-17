"use client";

    "use client";


import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Float, Text, Sky, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { ReceptionRoom, WardRoom, OperationTheater, PharmacyRoom } from "./HospitalRooms";
import Ambulance3D from "./Ambulance3D";
import ParkedCar3D from "./ParkedCar3D";
import Male3D from "./Male3D";
import Female3D from "./Female3D";
import PetDog3D from "./PetDog3D";

interface Hospital3DProps {
  position?: [number, number, number];
}

function HospitalContent() {
  // All hooks must be at the top level and only called once
  const groupRef = useRef<THREE.Group>(null);
  const windowMaterial = useRef(new THREE.MeshStandardMaterial({ color: "#b3e5fc", transparent: true, opacity: 0.7 })).current;
  const benchMaterial = useRef(new THREE.MeshStandardMaterial({ color: "#a1887f" })).current;
  const lampPostMaterial = useRef(new THREE.MeshStandardMaterial({ color: "#757575", metalness: 0.6, roughness: 0.4 })).current;
  const lampHeadMaterial = useRef(new THREE.MeshStandardMaterial({ color: "#fffde7", emissive: "#fffde7", emissiveIntensity: 0.8 })).current;
  const treeTrunkMaterial = useRef(new THREE.MeshStandardMaterial({ color: "#8d6e63" })).current;
  const treeLeafMaterial = useRef(new THREE.MeshStandardMaterial({ color: "#388e3c", roughness: 0.8 })).current;
  const shrubMaterial = useRef(new THREE.MeshStandardMaterial({ color: "#43a047" })).current;
  const flowerBedMaterial1 = useRef(new THREE.MeshStandardMaterial({ color: "#ffb6b9" })).current;
  const flowerBedMaterial2 = useRef(new THREE.MeshStandardMaterial({ color: "#f8e9a1" })).current;
  const flowerBedMaterial3 = useRef(new THREE.MeshStandardMaterial({ color: "#b5ead7" })).current;
  const flowerBedMaterial4 = useRef(new THREE.MeshStandardMaterial({ color: "#c7ceea" })).current;
  const flowerBedMaterials = [flowerBedMaterial1, flowerBedMaterial2, flowerBedMaterial3, flowerBedMaterial4];
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.03) * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sky and Environment */}
      <Sky azimuth={0.3} inclination={0.5} distance={1000} />
      {/* Realistic Lighting */}
      <ambientLight intensity={0.6} color="#e0f7fa" />
      <directionalLight
        position={[20, 30, 10]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      {/* Hospital Exterior Structure */}
      <Float speed={0.15} rotationIntensity={0.03} floatIntensity={0.03}>
        <group>
          {/* Main Building Block */}
          <mesh position={[0, 4, 0]} castShadow receiveShadow>
            <boxGeometry args={[18, 8, 12]} />
            <meshStandardMaterial color="#e3eafc" roughness={0.4} metalness={0.1} />
          </mesh>
          {/* Rooftop HVAC vents (smaller, at corners, flush on roof) */}
          {[[-7.5, 8.04, 4.5], [7.5, 8.04, -4.5], [-7.5, 8.04, -4.5], [7.5, 8.04, 4.5]].map(([x, y, z], i) => (
            <mesh key={`hvac-vent-${i}`} position={[x, y, z]} castShadow>
              <boxGeometry args={[0.7, 0.32, 0.5]} />
              <meshStandardMaterial color="#b0bec5" metalness={0.3} roughness={0.5} />
            </mesh>
          ))}
          {/* Helipad (centered, large H, border) */}
          <mesh position={[0, 8.09, 0]} receiveShadow>
            <cylinderGeometry args={[3.2, 3.2, 0.08, 48]} />
            <meshStandardMaterial color="#e0e0e0" />
          </mesh>
          {/* Helipad border */}
          <mesh position={[0, 8.13, 0]}>
            <cylinderGeometry args={[3.35, 3.2, 0.03, 48]} />
            <meshStandardMaterial color="#1976d2" />
          </mesh>
          {/* Helipad H marking */}
          <mesh position={[0, 8.15, 0]}>
            <boxGeometry args={[2.1, 0.28, 0.03]} />
            <meshStandardMaterial color="#fff" />
          </mesh>
          <mesh position={[0, 8.15, 0]}>
            <boxGeometry args={[0.28, 1.2, 0.03]} />
            <meshStandardMaterial color="#fff" />
          </mesh>
          {/* Wall vents (side and back wings, embedded in wing walls) */}
          {/* Left side wing vents */}
          {[-5, 0, 5].map((z, i) => (
            <mesh key={`side-vent-left-${i}`} position={[-15, 5.5, z]}>
              <boxGeometry args={[0.18, 0.7, 1.2]} />
              <meshStandardMaterial color="#90a4ae" />
            </mesh>
          ))}
          {/* Right side wing vents */}
          {[-5, 0, 5].map((z, i) => (
            <mesh key={`side-vent-right-${i}`} position={[15, 5.5, z]}>
              <boxGeometry args={[0.18, 0.7, 1.2]} />
              <meshStandardMaterial color="#90a4ae" />
            </mesh>
          ))}
          {/* Back wall vents (main building, flush with wall) */}
          {[-4, 0, 4].map((x, i) => (
            <mesh key={`back-vent-main-${i}`} position={[x, 5.5, -6.01]}>
              <boxGeometry args={[1.2, 0.7, 0.18]} />
              <meshStandardMaterial color="#90a4ae" />
            </mesh>
          ))}
          {/* Front wall vents removed for clean facade */}
          {/* Emergency Exit Doors (back and sides, with red sign, at wall level) */}
          {/* Back exit */}
          <group position={[0, 1.1, -12.11]}>
            <mesh>
              <boxGeometry args={[1.1, 2.1, 0.13]} />
              <meshStandardMaterial color="#e0e0e0" />
            </mesh>
            <mesh position={[0, 1.2, 0.09]}>
              <boxGeometry args={[0.9, 0.32, 0.04]} />
              <meshStandardMaterial color="#c62828" />
            </mesh>
            <mesh position={[0, 1.2, 0.13]}>
              <boxGeometry args={[0.7, 0.18, 0.04]} />
              <meshStandardMaterial color="#fff" />
            </mesh>
            <Text
              position={[0, 1.2, 0.13]}
              fontSize={0.18}
              color="#c62828"
              anchorX="center"
              anchorY="middle"
              outlineColor="#fff"
              outlineWidth={0.02}
              rotation={[0, 0, 0]}
            >
              EMERGENCY EXIT
            </Text>
          </group>
          {/* Left side exit */}
          <group position={[-15.9, 1.1, 6]} rotation={[0, Math.PI/2, 0]}>
            <mesh>
              <boxGeometry args={[1.1, 2.1, 0.13]} />
              <meshStandardMaterial color="#e0e0e0" />
            </mesh>
            <mesh position={[0, 1.2, 0.09]}>
              <boxGeometry args={[0.9, 0.32, 0.04]} />
              <meshStandardMaterial color="#c62828" />
            </mesh>
            <mesh position={[0, 1.2, 0.13]}>
              <boxGeometry args={[0.7, 0.18, 0.04]} />
              <meshStandardMaterial color="#fff" />
            </mesh>
            <Text
              position={[0, 1.2, 0.13]}
              fontSize={0.18}
              color="#c62828"
              anchorX="center"
              anchorY="middle"
              outlineColor="#fff"
              outlineWidth={0.02}
              rotation={[0, 0, 0]}
            >
              EMERGENCY EXIT
            </Text>
          </group>
          {/* Right side exit */}
          <group position={[15.9, 1.1, -6]} rotation={[0, -Math.PI/2, 0]}>
            <mesh>
              <boxGeometry args={[1.1, 2.1, 0.13]} />
              <meshStandardMaterial color="#e0e0e0" />
            </mesh>
            <mesh position={[0, 1.2, 0.09]}>
              <boxGeometry args={[0.9, 0.32, 0.04]} />
              <meshStandardMaterial color="#c62828" />
            </mesh>
            <mesh position={[0, 1.2, 0.13]}>
              <boxGeometry args={[0.7, 0.18, 0.04]} />
              <meshStandardMaterial color="#fff" />
            </mesh>
            <Text
              position={[0, 1.2, 0.13]}
              fontSize={0.18}
              color="#c62828"
              anchorX="center"
              anchorY="middle"
              outlineColor="#fff"
              outlineWidth={0.02}
              rotation={[0, 0, 0]}
            >
              EMERGENCY EXIT
            </Text>
          </group>
          {/* Extended Entrance Canopy for Vehicle Drop-off (pillars attach flush) */}
          <mesh position={[0, 3.2, 8.5]} castShadow receiveShadow>
            <boxGeometry args={[9, 0.7, 5]} />
            <meshStandardMaterial color="#b3c6e7" metalness={0.22} roughness={0.28} />
          </mesh>
          {/* Glass Doors (flush with building, below windows) */}
          <mesh position={[-0.7, 1.2, 6.61]}>
            <boxGeometry args={[0.7, 1.6, 0.05]} />
            <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
          </mesh>
          <mesh position={[0.7, 1.2, 6.61]}>
            <boxGeometry args={[0.7, 1.6, 0.05]} />
            <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
          </mesh>
          {/* Entrance Steps (directly in front of doors, below canopy) */}
          <mesh position={[0, 0.25, 7.1]} receiveShadow>
            <boxGeometry args={[4.5, 0.2, 0.8]} />
            <meshStandardMaterial color="#bdbdbd" />
          </mesh>
          <mesh position={[0, 0.05, 7.7]} receiveShadow>
            <boxGeometry args={[5, 0.1, 0.5]} />
            <meshStandardMaterial color="#e0e0e0" />
          </mesh>
          {/* Accessibility Ramp (right side of steps, gentle slope) */}
          <mesh position={[2.7, 0.18, 7.1]} rotation={[-0.18, 0, 0]} receiveShadow>
            <boxGeometry args={[1.2, 0.13, 2.1]} />
            <meshStandardMaterial color="#90caf9" />
          </mesh>
          {/* Ramp railings */}
          <mesh position={[3.2, 0.38, 7.1]} rotation={[-0.18, 0, 0]}>
            <boxGeometry args={[0.05, 0.35, 2.1]} />
            <meshStandardMaterial color="#1976d2" />
          </mesh>
          <mesh position={[2.2, 0.38, 7.1]} rotation={[-0.18, 0, 0]}>
            <boxGeometry args={[0.05, 0.35, 2.1]} />
            <meshStandardMaterial color="#1976d2" />
          </mesh>
          {/* Pillars supporting extended canopy (flush with canopy bottom at y=2.85) */}
          {[-3.8, 0, 3.8].map((x, i) => (
            <mesh key={i} position={[x, 1.85, 10.7]}>
              <cylinderGeometry args={[0.18, 0.18, 2.7, 24]} />
              <meshStandardMaterial color="#b0bec5" />
            </mesh>
          ))}
          {/* Side Pillars for canopy stability (flush with canopy bottom at y=2.85) */}
          {[-4.2, 4.2].map((x, i) => (
            <mesh key={i} position={[x, 1.85, 7.7]}>
              <cylinderGeometry args={[0.13, 0.13, 2.7, 24]} />
              <meshStandardMaterial color="#b0bec5" />
            </mesh>
          ))}
          {/* Hospital Name on Front Top (centered, symbol above text) */}
          <group position={[0, 8.1, 6.15]}>
            {/* Red Cross Symbol above text */}
            <group position={[0, 0.7, 0.01]}>
              <mesh>
                <boxGeometry args={[0.6, 0.18, 0.1]} />
                <meshStandardMaterial color="#d32f2f" />
              </mesh>
              <mesh>
                <boxGeometry args={[0.18, 0.6, 0.1]} />
                <meshStandardMaterial color="#d32f2f" />
              </mesh>
            </group>
            <Text
              position={[0, 0, 0]}
              fontSize={0.7}
              color="#1976d2"
              anchorX="center"
              anchorY="middle"
              outlineColor="#fff"
              outlineWidth={0.04}
              rotation={[0, 0, 0]}
              maxWidth={10}
            >
              CITY CENTRAL HOSPITAL
            </Text>
          </group>

          {/* Main Entrance Sign: attached to front of entrance canopy */}
          <group position={[0, 3.7, 11]}>
            <Text
              position={[0, 0, 0]}
              fontSize={0.45}
              color="#1976d2"
              anchorX="center"
              anchorY="middle"
              outlineColor="#fff"
              outlineWidth={0.04}
              rotation={[0, 0, 0]}
            >
              MAIN ENTRANCE
            </Text>
          </group>

          {/* Emergency Sign: attached board with bold style */}
          <group position={[-10, 2.2, 15.5]} rotation={[0, Math.PI/4, 0]}>
            <mesh>
              <boxGeometry args={[2.6, 0.7, 0.13]} />
              <meshStandardMaterial color="#c62828" />
            </mesh>
            <Text
              position={[0, 0.04, 0.08]}
              fontSize={0.42}
              color="#fff"
              anchorX="center"
              anchorY="middle"
              outlineColor="#fff"
              outlineWidth={0.03}
            >
              EMERGENCY
            </Text>
          </group>

          {/* Directional Sign: Parking */}
          <group position={[8, 1.5, 18.5]} rotation={[0, -Math.PI/8, 0]}>
            <mesh>
              <boxGeometry args={[1.7, 0.45, 0.09]} />
              <meshStandardMaterial color="#388e3c" />
            </mesh>
            <Text
              position={[0, 0.01, 0.05]}
              fontSize={0.28}
              color="#fff"
              anchorX="center"
              anchorY="middle"
            >
              PARKING
            </Text>
          </group>

          {/* Directional Sign: Pharmacy */}
          <group position={[14.5, 2, -6]} rotation={[0, Math.PI/2.2, 0]}>
            <mesh>
              <boxGeometry args={[1.7, 0.45, 0.09]} />
              <meshStandardMaterial color="#00897b" />
            </mesh>
            <Text
              position={[0, 0.01, 0.05]}
              fontSize={0.28}
              color="#fff"
              anchorX="center"
              anchorY="middle"
            >
              PHARMACY
            </Text>
          </group>

          {/* Directional Sign: Wards */}
          <group position={[-14.5, 2, -6]} rotation={[0, -Math.PI/2.2, 0]}>
            <mesh>
              <boxGeometry args={[1.7, 0.45, 0.09]} />
              <meshStandardMaterial color="#5e35b1" />
            </mesh>
            <Text
              position={[0, 0.01, 0.05]}
              fontSize={0.28}
              color="#fff"
              anchorX="center"
              anchorY="middle"
            >
              WARDS
            </Text>
          </group>
          {/* Windows - grid pattern (restored full row above entrance) */}
          {Array.from({ length: 3 }).map((_, floor) =>
            Array.from({ length: 6 }).map((_, col) => (
              <mesh
                key={`window-${floor}-${col}`}
                position={[-6 + col * 2.4, 7.2 - floor * 2.5, 6.1]}
                material={windowMaterial}
              >
                <boxGeometry args={[1.5, 1.2, 0.1]} />
              </mesh>
            ))
          )}
          {/* Side Wings (reduced height, visually matching center block) */}
          <mesh position={[-12, 3.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[6, 7, 12]} />
            <meshStandardMaterial color="#e3eafc" />
          </mesh>
          <mesh position={[12, 3.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[6, 7, 12]} />
            <meshStandardMaterial color="#e3eafc" />
          </mesh>
          {/* Side Wing Windows - Left (3 rows, 2 columns, matching center block style) */}
          {Array.from({ length: 3 }).map((_, floor) =>
            Array.from({ length: 2 }).map((_, col) => (
              <mesh
                key={`side-left-window-${floor}-${col}`}
                position={[-14.9, 6.5 - floor * 2.3, -3.5 + col * 7]}
                material={windowMaterial}
              >
                <boxGeometry args={[0.18, 1.2, 3.2]} />
              </mesh>
            ))
          )}
          {/* Side Wing Windows - Right (3 rows, 2 columns, matching center block style) */}
          {Array.from({ length: 3 }).map((_, floor) =>
            Array.from({ length: 2 }).map((_, col) => (
              <mesh
                key={`side-right-window-${floor}-${col}`}
                position={[14.9, 6.5 - floor * 2.3, -3.5 + col * 7]}
                material={windowMaterial}
              >
                <boxGeometry args={[0.18, 1.2, 3.2]} />
              </mesh>
            ))
          )}
          {/* Side Wing Windows - Left */}
          {Array.from({ length: 2 }).map((_, floor) =>
            Array.from({ length: 3 }).map((_, col) => (
              <mesh
                key={`side-left-window-${floor}-${col}`}
                position={[-11.9, 4.5 - floor * 2.5, -3.5 + col * 3.5]}
                material={windowMaterial}
              >
                <boxGeometry args={[0.18, 1.2, 2.2]} />
              </mesh>
            ))
          )}
          {/* Side Wing Windows - Right */}
          {Array.from({ length: 2 }).map((_, floor) =>
            Array.from({ length: 3 }).map((_, col) => (
              <mesh
                key={`side-right-window-${floor}-${col}`}
                position={[11.9, 4.5 - floor * 2.5, -3.5 + col * 3.5]}
                material={windowMaterial}
              >
                <boxGeometry args={[0.18, 1.2, 2.2]} />
              </mesh>
            ))
          )}
          {/* Main Door (hidden behind glass doors) intentionally omitted */}
          {/* Pathway to entrance (shorter, in front of steps) */}
          <mesh position={[0, 0.05, 8.3]} receiveShadow>
            <boxGeometry args={[8, 0.1, 2.2]} />
            <meshStandardMaterial color="#bdbdbd" />
          </mesh>
          {/* Parking Area (in front, within ground) */}
          <mesh position={[0, 0.02, 12.5]} receiveShadow>
            <boxGeometry args={[18, 0.04, 6]} />
            <meshStandardMaterial color="#eeeeee" />
          </mesh>
          {/* Parking Lines */}
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={i} position={[-7.5 + i * 3, 0.04, 14.7]}>
              <boxGeometry args={[0.15, 0.01, 5.2]} />
              <meshStandardMaterial color="#fff" />
            </mesh>
          ))}
          {/* Handicapped Parking Spot (blue, near ramp/entrance) */}
          <mesh position={[5.7, 0.021, 13.2]} receiveShadow>
            <boxGeometry args={[2.1, 0.012, 4.2]} />
            <meshStandardMaterial color="#90caf9" />
          </mesh>
          {/* Handicapped Symbol (simple white cross and circle) */}
          <mesh position={[5.7, 0.031, 13.2]}>
            <cylinderGeometry args={[0.7, 0.7, 0.01, 32]} />
            <meshStandardMaterial color="#fff" />
          </mesh>
          <mesh position={[5.7, 0.031, 13.2]} rotation={[0, 0, Math.PI/4]}>
            <boxGeometry args={[0.18, 0.01, 1.1]} />
            <meshStandardMaterial color="#fff" />
          </mesh>
          <mesh position={[5.7, 0.031, 13.2]} rotation={[0, 0, -Math.PI/4]}>
            <boxGeometry args={[0.18, 0.01, 1.1]} />
            <meshStandardMaterial color="#fff" />
          </mesh>
          {/* Handicapped Parking Sign */}
          <group position={[5.7, 0.7, 15.2]}>
            <mesh>
              <boxGeometry args={[0.22, 1.1, 0.18]} />
              <meshStandardMaterial color="#1976d2" />
            </mesh>
            <mesh position={[0, 0.6, 0.13]}>
              <boxGeometry args={[0.7, 0.32, 0.04]} />
              <meshStandardMaterial color="#90caf9" />
            </mesh>
            <mesh position={[0, 0.6, 0.15]}>
              <cylinderGeometry args={[0.13, 0.13, 0.04, 24]} />
              <meshStandardMaterial color="#fff" />
            </mesh>
          </group>
          {/* Parked Cars (spaced within parking area, color/rotation variety) */}
          <ParkedCar3D position={[-6, 0.13, 13.5]} scale={1.1} rotationY={-Math.PI/16} />
          <ParkedCar3D position={[-2.5, 0.13, 14.2]} scale={1.1} rotationY={-Math.PI/18} />
          <ParkedCar3D position={[1, 0.13, 13.7]} scale={1.1} rotationY={-Math.PI/20} />
          <ParkedCar3D position={[4.5, 0.13, 14.3]} scale={1.1} rotationY={-Math.PI/22} />
          <ParkedCar3D position={[8, 0.13, 13.8]} scale={1.1} rotationY={-Math.PI/24} />
          {/* More cars for realism */}
          <ParkedCar3D position={[-8.5, 0.13, 12.2]} scale={1.05} rotationY={Math.PI/12} />
          <ParkedCar3D position={[10, 0.13, 12.7]} scale={1.08} rotationY={-Math.PI/10} />
          <ParkedCar3D position={[6.5, 0.13, 11.8]} scale={1.12} rotationY={Math.PI/14} />
          {/* Realistic Ambulances */}
          <Ambulance3D position={[-7, 0.13, 13]} scale={2} rotationY={Math.PI / 8} moving={true} />
          <Ambulance3D position={[12, 0.13, 10]} scale={1.7} rotationY={-Math.PI / 7} moving={false} />
          {/* People and activity */}
          {/* Male walking toward entrance */}
          <Male3D position={[2, 0, 10]} scale={1.1} rotationY={-Math.PI/8} walking={true} walkingSpeed={2.5} />
          {/* Female standing near entrance */}
          <Female3D position={[-1.5, 0, 8.2]} scale={1.08} rotationY={Math.PI/10} talking={true} />
          {/* Male near parking */}
          <Male3D position={[-9, 0, 13]} scale={1.05} rotationY={Math.PI/6} walking={false} />
          {/* Female walking with dog */}
          <Female3D position={[7, 0, 12]} scale={1.1} rotationY={-Math.PI/7} walking={true} walkingSpeed={2.8} />
          <PetDog3D position={[7.7, 0, 11.5]} scale={0.7} walkRadius={0.7} walkSpeed={0.5} />
          {/* Landscaping: Trees, Shrubs, Flower Beds, Benches (all around hospital) */}
          {/* Trees: at ground edges to free up space near hospital for parking and pathways */}
          {[-18, -14, -10, -6, -2, 2, 6, 10, 14, 18].map((x, i) => (
            <group key={`tree-front-${i}`} position={[x, 0, 19.5]}>
              <mesh position={[0, 1.1, 0]} castShadow material={treeTrunkMaterial}>
                <cylinderGeometry args={[0.22, 0.28, 2.2]} />
              </mesh>
              <mesh position={[0, 2.7, 0]} castShadow material={treeLeafMaterial}>
                <sphereGeometry args={[1.1]} />
              </mesh>
            </group>
          ))}
          {[-18, -14, -10, -6, -2, 2, 6, 10, 14, 18].map((x, i) => (
            <group key={`tree-back-${i}`} position={[x, 0, -19.5]}>
              <mesh position={[0, 1.1, 0]} castShadow material={treeTrunkMaterial}>
                <cylinderGeometry args={[0.22, 0.28, 2.2]} />
              </mesh>
              <mesh position={[0, 2.7, 0]} castShadow material={treeLeafMaterial}>
                <sphereGeometry args={[1.1]} />
              </mesh>
            </group>
          ))}
          {[[-19.5, -14], [-19.5, -7], [-19.5, 0], [-19.5, 7], [-19.5, 14], [19.5, -14], [19.5, -7], [19.5, 0], [19.5, 7], [19.5, 14]].map(([x, z], i) => (
            <group key={`tree-side-${i}`} position={[x, 0, z]}>
              <mesh position={[0, 1.1, 0]} castShadow material={treeTrunkMaterial}>
                <cylinderGeometry args={[0.22, 0.28, 2.2]} />
              </mesh>
              <mesh position={[0, 2.7, 0]} castShadow material={treeLeafMaterial}>
                <sphereGeometry args={[1.1]} />
              </mesh>
            </group>
          ))}
          {/* Shrubs: front, back, and sides */}
          {[-3, 0, 3].map((x, i) => (
            <mesh key={`shrub-front-${i}`} position={[x, 0.25, 8.5]} material={shrubMaterial}>
              <sphereGeometry args={[0.5]} />
            </mesh>
          ))}
          {[-3, 0, 3].map((x, i) => (
            <mesh key={`shrub-back-${i}`} position={[x, 0.25, -8.5]} material={shrubMaterial}>
              <sphereGeometry args={[0.5]} />
            </mesh>
          ))}
          {[-8, -3, 3, 8].map((z, i) => (
            <mesh key={`shrub-side-left-${i}`} position={[-16, 0.25, z]} material={shrubMaterial}>
              <sphereGeometry args={[0.5]} />
            </mesh>
          ))}
          {[-8, -3, 3, 8].map((z, i) => (
            <mesh key={`shrub-side-right-${i}`} position={[16, 0.25, z]} material={shrubMaterial}>
              <sphereGeometry args={[0.5]} />
            </mesh>
          ))}
          {/* Flower beds: front, back, and sides */}
          {[-6, -2, 2, 6].map((x, i) => (
            <mesh key={`flowerbed-front-${i}`} position={[x, 0.12, 10.5]} material={flowerBedMaterials[i]}>
              <boxGeometry args={[1.2, 0.08, 0.7]} />
            </mesh>
          ))}
          {[-6, -2, 2, 6].map((x, i) => (
            <mesh key={`flowerbed-back-${i}`} position={[x, 0.12, -10.5]} material={flowerBedMaterials[i]}>
              <boxGeometry args={[1.2, 0.08, 0.7]} />
            </mesh>
          ))}
          {[-10, -5, 0, 5, 10].map((z, i) => (
            <mesh key={`flowerbed-side-left-${i}`} position={[-16, 0.12, z]} material={flowerBedMaterials[i % 4]}>
              <boxGeometry args={[0.7, 0.08, 1.2]} />
            </mesh>
          ))}
          {[-10, -5, 0, 5, 10].map((z, i) => (
            <mesh key={`flowerbed-side-right-${i}`} position={[16, 0.12, z]} material={flowerBedMaterials[i % 4]}>
              <boxGeometry args={[0.7, 0.08, 1.2]} />
            </mesh>
          ))}
          {/* Benches: front, back, and sides */}
          {[-8, 8].map((x, i) => (
            <mesh key={`bench-front-${i}`} position={[x, 0.3, 15.5]} castShadow material={benchMaterial}>
              <boxGeometry args={[1.2, 0.2, 0.4]} />
            </mesh>
          ))}
          {[-8, 8].map((x, i) => (
            <mesh key={`bench-back-${i}`} position={[x, 0.3, -15.5]} castShadow material={benchMaterial}>
              <boxGeometry args={[1.2, 0.2, 0.4]} />
            </mesh>
          ))}
          {[-12, 12].map((x, i) => (
            <mesh key={`bench-side-${i}`} position={[x, 0.3, 6]} castShadow material={benchMaterial}>
              <boxGeometry args={[1.2, 0.2, 0.4]} />
            </mesh>
          ))}
          {[-12, 12].map((x, i) => (
            <mesh key={`bench-side-back-${i}`} position={[x, 0.3, -6]} castShadow material={benchMaterial}>
              <boxGeometry args={[1.2, 0.2, 0.4]} />
            </mesh>
          ))}

          {/* Lamp Posts: corners, entrance, and parking for exterior lighting */}
          {[
            [-17, 0, 17], [17, 0, 17], [-17, 0, -17], [17, 0, -17], // corners
            [0, 0, 15], // front center
            [-10, 0, 10], [10, 0, 10], // front sides
            [0, 0, -15], // back center
            [-10, 0, -10], [10, 0, -10], // back sides
            [-7, 0, 12], [7, 0, 12], // parking area
            [-7, 0, 7], [7, 0, 7] // approach to entrance
          ].map(([x, y, z], i) => (
            <group key={`lamp-post-${i}`} position={[x, y, z]}>
              {/* Post */}
              <mesh castShadow receiveShadow material={lampPostMaterial}>
                <cylinderGeometry args={[0.13, 0.13, 4.2, 16]} />
              </mesh>
              {/* Lamp Head: hemisphere with glass cover */}
              <mesh position={[0, 2.2, 0]} castShadow material={lampHeadMaterial}>
                <sphereGeometry args={[0.32, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
              </mesh>
              {/* Glass cover for lamp head */}
              <mesh position={[0, 2.25, 0]}>
                <sphereGeometry args={[0.34, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#fffde7" transparent opacity={0.25} emissive="#fffde7" emissiveIntensity={0.15} />
              </mesh>
              {/* Soft glow effect */}
              <mesh position={[0, 2.3, 0]}>
                <sphereGeometry args={[0.45, 16, 16]} />
                <meshStandardMaterial color="#fffbe7" transparent opacity={0.12} emissive="#fffbe7" emissiveIntensity={0.18} />
              </mesh>
              {/* Light Source */}
              <pointLight
                position={[0, 2.3, 0]}
                intensity={1.5}
                distance={16}
                color="#fffbe7"
                castShadow
                decay={2}
              />
            </group>
          ))}
        </group>
      </Float>
      {/* Hospital Interior Layout (Ground Floor) */}
      <group position={[0, 0.11, 0]}>
        {/* Reception at entrance */}
        <ReceptionRoom position={[0, 0, 4.5]} />
        {/* Wards left and right */}
        <WardRoom position={[-5.5, 0, 0]} beds={3} />
        <WardRoom position={[5.5, 0, 0]} beds={3} />
        {/* Operation Theater at back left */}
        <OperationTheater position={[-5.5, 0, -5]} />
        {/* Pharmacy at back right */}
        <PharmacyRoom position={[5.5, 0, -5]} />
      </group>
      {/* Ground and Shadows */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[40, 0.2, 40]} />
        <meshStandardMaterial color="#c8e6c9" />
      </mesh>
      <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={30} blur={2} far={20} />
    </group>
  );
}

export default function Hospital3D({ position = [0, 0, 0] }: Hospital3DProps) {
  return (
    <group position={position}>
      <Suspense fallback={null}>
        <HospitalContent />
      </Suspense>
    </group>
  );
}