"use client";

    "use client";


import { useRef, useState, useEffect, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Float, Text, Sky, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import StoreRoom3D from "./StoreRoom3D";
import GeneratorRoom3D from "./GeneratorRoom3D";
import { WardRoom, OperationTheater } from "./HospitalRooms";
import Ambulance3D from "./Ambulance3D";
import ParkedCar3D from "./ParkedCar3D";
import Male3D from "./Male3D";
import Female3D from "./Female3D";
import PetDog3D from "./PetDog3D";

interface Hospital3DProps {
  position?: [number, number, number];
  isNight?: boolean;
}

function HospitalContent({ isNight = false }: { isNight?: boolean }) {
  // Side emergency exit door animation state
  const [sideExitDoorOpen, setSideExitDoorOpen] = useState(false);
  const [sideExitDoorAnim, setSideExitDoorAnim] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSideExitDoorOpen(open => !open), 5000);
    return () => clearInterval(interval);
  }, []);
  useFrame(() => {
    setSideExitDoorAnim(prev => {
      const target = sideExitDoorOpen ? 1 : 0;
      const speed = 0.08;
      if (Math.abs(prev - target) < 0.01) return target;
      return prev + (target - prev) * speed;
    });
  });
                  // Back entrance door animation state (sync with front for simplicity)
                  const [backDoorOpen, setBackDoorOpen] = useState(false);
                  const [backDoorAnim, setBackDoorAnim] = useState(0);
                  useEffect(() => {
                    const interval = setInterval(() => setBackDoorOpen(open => !open), 5000);
                    return () => clearInterval(interval);
                  }, []);
                  useFrame(() => {
                    setBackDoorAnim(prev => {
                      const target = backDoorOpen ? 1 : 0;
                      const speed = 0.08;
                      if (Math.abs(prev - target) < 0.01) return target;
                      return prev + (target - prev) * speed;
                    });
                  });
                {/* Back wall vents (main building, above windows, not overlapping) */}
                {[-4.8, -1.6, 1.6, 4.8].map((x, i) => (
                  <mesh key={`back-vent-main-${i}`} position={[x, 9.1, -6.01]}>
                    <boxGeometry args={[1.2, 0.7, 0.18]} />
                    <meshStandardMaterial color="#90a4ae" />
                  </mesh>
                ))}
      // Side building door animation state (sync with main for simplicity)
      const [sideDoorOpen, setSideDoorOpen] = useState(false);
      const [sideDoorAnim, setSideDoorAnim] = useState(0);
      useEffect(() => {
        const interval = setInterval(() => setSideDoorOpen(open => !open), 5000);
        return () => clearInterval(interval);
      }, []);
      useFrame(() => {
        setSideDoorAnim(prev => {
          const target = sideDoorOpen ? 1 : 0;
          const speed = 0.08;
          if (Math.abs(prev - target) < 0.01) return target;
          return prev + (target - prev) * speed;
        });
      });
    // Door animation state
    const [doorOpen, setDoorOpen] = useState(false);
    const [doorAnim, setDoorAnim] = useState(0); // 0 = closed, 1 = open
    // Toggle door every 5 seconds
    useEffect(() => {
      const interval = setInterval(() => setDoorOpen(open => !open), 5000);
      return () => clearInterval(interval);
    }, []);
    // Animate doorAnim smoothly
    useFrame(() => {
      setDoorAnim(prev => {
        const target = doorOpen ? 1 : 0;
        const speed = 0.08;
        if (Math.abs(prev - target) < 0.01) return target;
        return prev + (target - prev) * speed;
      });
    });
  // All hooks must be at the top level and only called once
  const groupRef = useRef<THREE.Group>(null);
  // Window material: day is blue, night is glowing yellow
  const windowMaterial = useRef(new THREE.MeshStandardMaterial({
    color: isNight ? "#ffe066" : "#b3e5fc",
    emissive: isNight ? "#ffe066" : "#000000",
    emissiveIntensity: isNight ? 0.55 : 0,
    transparent: true,
    opacity: isNight ? 0.92 : 0.7
  })).current;
  const benchMaterial = useRef(new THREE.MeshStandardMaterial({ color: "#a1887f" })).current;
  const lampPostMaterial = useRef(new THREE.MeshStandardMaterial({ color: "#757575", metalness: 0.6, roughness: 0.4 })).current;
  // Realistic window/door frame and handle materials
  const frameMaterial = useRef(new THREE.MeshStandardMaterial({ color: "#FFFFFF", roughness: 0.3 })).current;
  const crossbarMaterial = useRef(new THREE.MeshStandardMaterial({ color: "#8B4513" })).current;
  const handleMaterial = useRef(new THREE.MeshStandardMaterial({ color: "#DAA520", roughness: 0.1, metalness: 0.9 })).current;
  // Lamp head: stronger emissive at night
  const lampHeadMaterial = useRef(new THREE.MeshStandardMaterial({
    color: "#fffde7",
    emissive: "#fffde7",
    emissiveIntensity: isNight ? 1.1 : 0.2
  })).current;
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
      {/* Lighting for Emergency Exits and Entrances (all buildings, front and back) */}
      <>
        {/* Central Building - Front Entrance */}
        <pointLight position={[0, 3.2, 7.2]} intensity={isNight ? 1.2 : 0.3} color="#ff5252" distance={7} decay={2} />
        {/* Central Building - Back Entrance */}
        <pointLight position={[0, 3.2, -7.2]} intensity={isNight ? 1.2 : 0.3} color="#ff5252" distance={7} decay={2} />
        {/* Central Building - Emergency Exit (Back) */}
        <pointLight position={[0, 2.7, -6.07]} intensity={isNight ? 1.3 : 0.3} color="#ff5252" distance={5} decay={2} />
        {/* Left Side Building - Front Entrance */}
        <pointLight position={[-12, 2.2, 7.2]} intensity={isNight ? 1.1 : 0.25} color="#ff5252" distance={5.5} decay={2} />
        {/* Left Side Building - Back Entrance */}
        <pointLight position={[-12, 2.2, -7.2]} intensity={isNight ? 1.1 : 0.25} color="#ff5252" distance={5.5} decay={2} />
        {/* Left Side Building - Emergency Exit (Side) */}
        <pointLight position={[-15.07, 3.2, 0]} intensity={isNight ? 1.1 : 0.25} color="#ff5252" distance={5} decay={2} />
        {/* Right Side Building - Front Entrance */}
        <pointLight position={[12, 2.2, 7.2]} intensity={isNight ? 1.1 : 0.25} color="#ff5252" distance={5.5} decay={2} />
        {/* Right Side Building - Back Entrance */}
        <pointLight position={[12, 2.2, -7.2]} intensity={isNight ? 1.1 : 0.25} color="#ff5252" distance={5.5} decay={2} />
        {/* Right Side Building - Emergency Exit (Side) */}
        <pointLight position={[15.07, 3.2, 0]} intensity={isNight ? 1.1 : 0.25} color="#ff5252" distance={5} decay={2} />
      </>
      {/* Sky and Environment */}
      <Sky
        azimuth={0.3}
        inclination={0.5}
        distance={1000}
        sunPosition={isNight ? [0, -1, 0] : [0, 1, 0]}
        turbidity={isNight ? 0.8 : 2}
        rayleigh={isNight ? 0.2 : 2}
        mieCoefficient={isNight ? 0.001 : 0.005}
        mieDirectionalG={isNight ? 0.7 : 0.8}
      />
      {/* Realistic Lighting */}
      <ambientLight intensity={isNight ? 0.13 : 0.6} color={isNight ? "#1a1a2e" : "#e0f7fa"} />
      <directionalLight
        position={[20, 30, 10]}
        intensity={isNight ? 0.13 : 1.2}
        color={isNight ? "#b0c4de" : "#ffffff"}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      {/* Night: subtle blue overlay for sky, stars, and glowing lights */}
      {isNight && (
        <>
          {/* Star field (simple points) */}
          {Array.from({ length: 80 }).map((_, i) => (
            <mesh key={i} position={[
              (Math.random() - 0.5) * 80,
              18 + Math.random() * 10,
              (Math.random() - 0.5) * 80
            ]}>
              <sphereGeometry args={[0.08 + Math.random() * 0.07, 6, 6]} />
              <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.7 + Math.random() * 0.5} />
            </mesh>
          ))}
        </>
      )}
      {/* Hospital Exterior Structure */}
      <Float speed={0.15} rotationIntensity={0.03} floatIntensity={0.03}>
        <group>
          {/* Main Building Block */}
          <mesh position={[0, 4, 0]} castShadow receiveShadow>
            <boxGeometry args={[18, 8, 12]} />
            <meshStandardMaterial color={isNight ? "#232b3b" : "#e3eafc"} roughness={0.4} metalness={0.1} />
          </mesh>
          {/* Rooftop Additions */}
          {/* Store Room (Detailed) */}
          <StoreRoom3D position={[-6.5, 9, 3.5]} />
          {/* Water Tanks (flush on roof, with base) */}
          <group>
            {/* Label for Water Tanks */}
            <Text position={[7.25, 10.3, 4.5]} fontSize={0.34} color="#1976d2" anchorX="center" anchorY="middle" outlineColor="#fff" outlineWidth={0.03}>
              Water Tanks
            </Text>
            {/* Tank 1 */}
            <mesh position={[6.5, 8.6, 4.5]} castShadow>
              {/* Base */}
              <cylinderGeometry args={[0.8, 0.8, 0.18, 24]} />
              <meshStandardMaterial color="#616161" />
            </mesh>
            <mesh position={[6.5, 8.8 + 0.6, 4.5]} castShadow>
              {/* Tank */}
              <cylinderGeometry args={[0.7, 0.7, 1.2, 24]} />
              <meshStandardMaterial color="#1976d2" />
            </mesh>
            {/* Tank 2 */}
            <mesh position={[8, 8.6, 4.5]} castShadow>
              {/* Base */}
              <cylinderGeometry args={[0.8, 0.8, 0.18, 24]} />
              <meshStandardMaterial color="#616161" />
            </mesh>
            <mesh position={[8, 8.8 + 0.6, 4.5]} castShadow>
              {/* Tank */}
              <cylinderGeometry args={[0.7, 0.7, 1.2, 24]} />
              <meshStandardMaterial color="#1976d2" />
            </mesh>
          </group>
          {/* Solar Panels on Left Building */}
          <group>
            {/* Label for Solar Panels (Left) */}
            <Text position={[-12.5, 9.5, 0]} fontSize={0.28} color="#388e3c" anchorX="center" anchorY="middle" outlineColor="#fff" outlineWidth={0.02}>
              Solar Panels
            </Text>
            {[0, 1].map(i => (
              <mesh
                key={i}
                position={[-12.5, 8.09, -2.5 + i * 3]}
                rotation={[-Math.PI/7, 0, 0]}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[1.2, 0.08, 2.2]} />
                <meshStandardMaterial color="#263238" />
              </mesh>
            ))}
          </group>
          {/* Solar Panels on Right Building */}
          <group>
            {/* Label for Solar Panels (Right) */}
            <Text position={[12.5, 9.5, 0]} fontSize={0.28} color="#388e3c" anchorX="center" anchorY="middle" outlineColor="#fff" outlineWidth={0.02}>
              Solar Panels
            </Text>
            {[0, 1].map(i => (
              <mesh
                key={i}
                position={[12.5, 8.09, -2.5 + i * 3]}
                rotation={[-Math.PI/7, 0, 0]}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[1.2, 0.08, 2.2]} />
                <meshStandardMaterial color="#263238" />
              </mesh>
            ))}
          </group>
          {/* Generator Room */}
          {/* Generator Room (Detailed) */}
          <GeneratorRoom3D position={[6.5, 9, -4.5]} />
          {/* Staff Rest Area (enhanced with roof and rain protection) */}
          <group position={[-7.5, 8.1, -4.5]}>
            {/* Label for Staff Rest Area */}
            <Text position={[0, 1.7, 0]} fontSize={0.32} color="#6d4c41" anchorX="center" anchorY="middle" outlineColor="#fff" outlineWidth={0.02}>
              Staff Rest Area
            </Text>
            {/* Roof */}
            <mesh position={[0, 1.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.6, 0.14, 2.2]} />
              <meshStandardMaterial color="#b0bec5" metalness={0.4} roughness={0.3} />
            </mesh>
            {/* Roof support pillars */}
            <mesh position={[-1.15, 0.6, 1]} rotation={[0,0,0]}>
              <cylinderGeometry args={[0.06, 0.06, 1.2, 12]} />
              <meshStandardMaterial color="#757575" />
            </mesh>
            <mesh position={[1.15, 0.6, 1]} rotation={[0,0,0]}>
              <cylinderGeometry args={[0.06, 0.06, 1.2, 12]} />
              <meshStandardMaterial color="#757575" />
            </mesh>
            <mesh position={[-1.15, 0.6, -1]} rotation={[0,0,0]}>
              <cylinderGeometry args={[0.06, 0.06, 1.2, 12]} />
              <meshStandardMaterial color="#757575" />
            </mesh>
            <mesh position={[1.15, 0.6, -1]} rotation={[0,0,0]}>
              <cylinderGeometry args={[0.06, 0.06, 1.2, 12]} />
              <meshStandardMaterial color="#757575" />
            </mesh>
            {/* Table */}
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.7, 0.7, 0.18, 18]} />
              <meshStandardMaterial color="#fffde7" />
            </mesh>
            {/* Benches - spread out for more space */}
            <mesh position={[-1.3, 0.2, 0.7]}>
              <boxGeometry args={[0.3, 0.18, 1.2]} />
              <meshStandardMaterial color="#a1887f" />
            </mesh>
            <mesh position={[1.3, 0.2, 0.7]}>
              <boxGeometry args={[0.3, 0.18, 1.2]} />
              <meshStandardMaterial color="#a1887f" />
            </mesh>
            <mesh position={[-1.3, 0.2, -0.7]}>
              <boxGeometry args={[0.3, 0.18, 1.2]} />
              <meshStandardMaterial color="#a1887f" />
            </mesh>
            <mesh position={[1.3, 0.2, -0.7]}>
              <boxGeometry args={[0.3, 0.18, 1.2]} />
              <meshStandardMaterial color="#a1887f" />
            </mesh>
            {/* Stretcher near entrance */}
            <group position={[0, 0.25, 1.5]}>
              {/* Bed frame */}
              <mesh>
                <boxGeometry args={[1.2, 0.12, 0.45]} />
                <meshStandardMaterial color="#90caf9" />
              </mesh>
              {/* Mattress */}
              <mesh position={[0, 0.08, 0]}>
                <boxGeometry args={[1.1, 0.08, 0.38]} />
                <meshStandardMaterial color="#e3eafc" />
              </mesh>
              {/* Legs */}
              <mesh position={[-0.5, -0.12, -0.18]}>
                <cylinderGeometry args={[0.04, 0.04, 0.18, 10]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
              <mesh position={[0.5, -0.12, -0.18]}>
                <cylinderGeometry args={[0.04, 0.04, 0.18, 10]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
              <mesh position={[-0.5, -0.12, 0.18]}>
                <cylinderGeometry args={[0.04, 0.04, 0.18, 10]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
              <mesh position={[0.5, -0.12, 0.18]}>
                <cylinderGeometry args={[0.04, 0.04, 0.18, 10]} />
                <meshStandardMaterial color="#757575" />
              </mesh>
              {/* Wheels */}
              <mesh position={[-0.5, -0.22, -0.18]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#212121" />
              </mesh>
              <mesh position={[0.5, -0.22, -0.18]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#212121" />
              </mesh>
              <mesh position={[-0.5, -0.22, 0.18]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#212121" />
              </mesh>
              <mesh position={[0.5, -0.22, 0.18]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#212121" />
              </mesh>
              {/* Side rails */}
              <mesh position={[-0.6, 0.08, 0]} rotation={[0,0,Math.PI/2]}>
                <cylinderGeometry args={[0.02, 0.02, 0.38, 8]} />
                <meshStandardMaterial color="#1976d2" />
              </mesh>
              <mesh position={[0.6, 0.08, 0]} rotation={[0,0,Math.PI/2]}>
                <cylinderGeometry args={[0.02, 0.02, 0.38, 8]} />
                <meshStandardMaterial color="#1976d2" />
              </mesh>
            </group>
            {/* Plants */}
            <mesh position={[0, 0.18, 0.9]}>
              <cylinderGeometry args={[0.13, 0.13, 0.32, 8]} />
              <meshStandardMaterial color="#388e3c" />
            </mesh>
          </group>
          {/* Spacious Back Windows - Central Building (2 rows, 4 columns) */}
                    {/* Back Entrance - Central Building (auto-opening double doors) */}
                    {/* Left Door (slides left, flush with building) */}
                    <group position={[-0.7 - 0.5 * backDoorAnim, 1.2, -6.01]}>
                      {/* Frame */}
                      <mesh>
                        <boxGeometry args={[0.74, 1.64, 0.09]} />
                        <primitive object={frameMaterial} attach="material" />
                      </mesh>
                      {/* Glass */}
                      <mesh position={[0, 0, -0.05]}>
                        <boxGeometry args={[0.66, 1.54, 0.03]} />
                        <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
                      </mesh>
                      {/* Crossbars */}
                      <mesh position={[0, 0, -0.07]}>
                        <boxGeometry args={[0.05, 1.54, 0.01]} />
                        <primitive object={crossbarMaterial} attach="material" />
                      </mesh>
                      <mesh position={[0, 0, -0.07]}>
                        <boxGeometry args={[0.66, 0.05, 0.01]} />
                        <primitive object={crossbarMaterial} attach="material" />
                      </mesh>
                      {/* Handle */}
                      <mesh position={[0.25, 0, -0.12]} ref={el => { if (el) el.rotation.set(Math.PI / 2, 0, 0); }}>
                        <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
                        <primitive object={handleMaterial} attach="material" />
                      </mesh>
                    </group>
                    {/* Right Door (slides right, flush with building) */}
                    <group position={[0.7 + 0.5 * backDoorAnim, 1.2, -6.01]}>
                      {/* Frame */}
                      <mesh>
                        <boxGeometry args={[0.74, 1.64, 0.09]} />
                        <primitive object={frameMaterial} attach="material" />
                      </mesh>
                      {/* Glass */}
                      <mesh position={[0, 0, -0.05]}>
                        <boxGeometry args={[0.66, 1.54, 0.03]} />
                        <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
                      </mesh>
                      {/* Crossbars */}
                      <mesh position={[0, 0, -0.07]}>
                        <boxGeometry args={[0.05, 1.54, 0.01]} />
                        <primitive object={crossbarMaterial} attach="material" />
                      </mesh>
                      <mesh position={[0, 0, -0.07]}>
                        <boxGeometry args={[0.66, 0.05, 0.01]} />
                        <primitive object={crossbarMaterial} attach="material" />
                      </mesh>
                      {/* Handle */}
                      <mesh position={[-0.25, 0, -0.12]} ref={el => { if (el) el.rotation.set(Math.PI / 2, 0, 0); }}>
                        <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
                        <primitive object={handleMaterial} attach="material" />
                      </mesh>
                    </group>
          {Array.from({ length: 2 }).map((_, floor) =>
            Array.from({ length: 4 }).map((_, col) => {
              const x = -4.8 + col * 3.2;
              const y = 7.2 - floor * 2.5;
              return (
                <group key={`central-back-window-${floor}-${col}`}>
                  {/* Window Frame */}
                  <mesh position={[x, y, -6.1]}>
                    <boxGeometry args={[2.6, 1.4, 0.13]} />
                    <primitive object={frameMaterial} attach="material" />
                  </mesh>
                  {/* Window Glass */}
                  <mesh position={[x, y, -6.16]}>
                    <boxGeometry args={[2.5, 1.3, 0.03]} />
                    <meshStandardMaterial
                      color={isNight ? '#ffe066' : '#b3e5fc'}
                      emissive={isNight ? '#ffe066' : '#000000'}
                      emissiveIntensity={isNight ? 0.55 : 0}
                      transparent
                      opacity={isNight ? 0.92 : 0.7}
                    />
                  </mesh>
                  {/* Window Crossbars */}
                  <mesh position={[x, y, -6.18]}>
                    <boxGeometry args={[0.08, 1.3, 0.01]} />
                    <primitive object={crossbarMaterial} attach="material" />
                  </mesh>
                  <mesh position={[x, y, -6.18]}>
                    <boxGeometry args={[2.5, 0.08, 0.01]} />
                    <primitive object={crossbarMaterial} attach="material" />
                  </mesh>
                </group>
              );
            })
          )}
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
            <meshStandardMaterial color={isNight ? "#b0bec5" : "#e0e0e0"} />
          </mesh>
          {/* Glowing window/lamp/porch lights at night */}
          {isNight && (
            <>
              {/* Main entrance lamp */}
              <pointLight position={[0, 6.5, 7.2]} intensity={1.1} color="#fffde7" distance={10} decay={2} />
              <mesh position={[0, 6.5, 7.1]}>
                <sphereGeometry args={[0.22, 10, 10]} />
                <meshStandardMaterial color="#fffde7" emissive="#fffde7" emissiveIntensity={1.2} />
              </mesh>
              {/* Extra glow for entrance */}
              <mesh position={[0, 6.5, 7.1]}>
                <sphereGeometry args={[0.32, 10, 10]} />
                <meshStandardMaterial color="#fffde7" transparent opacity={0.18} emissive="#fffde7" emissiveIntensity={0.25} />
              </mesh>
              {/* Porch/side lamps */}
              <pointLight position={[-7.5, 3.5, 7.2]} intensity={0.7} color="#fffde7" distance={7} decay={2} />
              <mesh position={[-7.5, 3.5, 7.1]}>
                <sphereGeometry args={[0.13, 8, 8]} />
                <meshStandardMaterial color="#fffde7" emissive="#fffde7" emissiveIntensity={1.0} />
              </mesh>
              <mesh position={[-7.5, 3.5, 7.1]}>
                <sphereGeometry args={[0.22, 8, 8]} />
                <meshStandardMaterial color="#fffde7" transparent opacity={0.15} emissive="#fffde7" emissiveIntensity={0.18} />
              </mesh>
              <pointLight position={[7.5, 3.5, 7.2]} intensity={0.7} color="#fffde7" distance={7} decay={2} />
              <mesh position={[7.5, 3.5, 7.1]}>
                <sphereGeometry args={[0.13, 8, 8]} />
                <meshStandardMaterial color="#fffde7" emissive="#fffde7" emissiveIntensity={1.0} />
              </mesh>
              <mesh position={[7.5, 3.5, 7.1]}>
                <sphereGeometry args={[0.22, 8, 8]} />
                <meshStandardMaterial color="#fffde7" transparent opacity={0.15} emissive="#fffde7" emissiveIntensity={0.18} />
              </mesh>
            </>
          )}
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
          {/* Back wall vents removed to avoid overlap with new windows */}
          {/* Front wall vents removed for clean facade */}
          {/* Emergency Exit Doors (back and sides, with red sign, flush and clearly visible) */}
          {/* Back exit */}
          <group position={[0, 1.1, -6.07]}>
            <mesh>
              <boxGeometry args={[1.1, 2.1, 0.13]} />
              <meshStandardMaterial color="#e0e0e0" />
            </mesh>
            <mesh position={[0, 1.2, 0.13]}>
              <boxGeometry args={[0.9, 0.32, 0.04]} />
              <meshStandardMaterial color="#c62828" />
            </mesh>
            <mesh position={[0, 1.2, 0.17]}>
              <boxGeometry args={[0.7, 0.18, 0.04]} />
              <meshStandardMaterial color="#fff" />
            </mesh>
            <Text
              position={[0, 1.2, 0.19]}
              fontSize={0.22}
              color="#c62828"
              anchorX="center"
              anchorY="middle"
              outlineColor="#fff"
              outlineWidth={0.025}
              rotation={[0, 0, 0]}
            >
              EMERGENCY EXIT
            </Text>
          </group>
          {/* Left side exit with animated auto-opening doors and lighting */}
          <group position={[-15.07, 1.1, 0]} rotation={[0, Math.PI/2, 0]}>
            {/* Left Door (slides left) */}
            <group position={[-0.28 - 0.25 * sideExitDoorAnim, 0, 0.065]}>
              <mesh>
                <boxGeometry args={[0.55, 2.1, 0.13]} />
                <meshStandardMaterial color="#e0e0e0" />
              </mesh>
              <mesh position={[0, 1.2, 0.13]}>
                <boxGeometry args={[0.45, 0.32, 0.04]} />
                <meshStandardMaterial color="#c62828" />
              </mesh>
              <mesh position={[0, 1.2, 0.17]}>
                <boxGeometry args={[0.35, 0.18, 0.04]} />
                <meshStandardMaterial color="#fff" />
              </mesh>
              <Text
                position={[0, 1.2, 0.19]}
                fontSize={0.22}
                color="#c62828"
                anchorX="center"
                anchorY="middle"
                outlineColor="#fff"
                outlineWidth={0.025}
                rotation={[0, 0, 0]}
              >
                EMERGENCY EXIT
              </Text>
            </group>
            {/* Right Door (slides right) */}
            <group position={[0.28 + 0.25 * sideExitDoorAnim, 0, 0.065]}>
              <mesh>
                <boxGeometry args={[0.55, 2.1, 0.13]} />
                <meshStandardMaterial color="#e0e0e0" />
              </mesh>
              <mesh position={[0, 1.2, 0.13]}>
                <boxGeometry args={[0.45, 0.32, 0.04]} />
                <meshStandardMaterial color="#c62828" />
              </mesh>
              <mesh position={[0, 1.2, 0.17]}>
                <boxGeometry args={[0.35, 0.18, 0.04]} />
                <meshStandardMaterial color="#fff" />
              </mesh>
              <Text
                position={[0, 1.2, 0.19]}
                fontSize={0.22}
                color="#c62828"
                anchorX="center"
                anchorY="middle"
                outlineColor="#fff"
                outlineWidth={0.025}
                rotation={[0, 0, 0]}
              >
                EMERGENCY EXIT
              </Text>
            </group>
          </group>
          {/* Right side exit with animated auto-opening doors and lighting */}
          <group position={[15.07, 1.1, 0]} rotation={[0, -Math.PI/2, 0]}>
            {/* Left Door (slides left) */}
            <group position={[-0.28 - 0.25 * sideExitDoorAnim, 0, 0.065]}>
              <mesh>
                <boxGeometry args={[0.55, 2.1, 0.13]} />
                <meshStandardMaterial color="#e0e0e0" />
              </mesh>
              <mesh position={[0, 1.2, 0.13]}>
                <boxGeometry args={[0.45, 0.32, 0.04]} />
                <meshStandardMaterial color="#c62828" />
              </mesh>
              <mesh position={[0, 1.2, 0.17]}>
                <boxGeometry args={[0.35, 0.18, 0.04]} />
                <meshStandardMaterial color="#fff" />
              </mesh>
              <Text
                position={[0, 1.2, 0.19]}
                fontSize={0.22}
                color="#c62828"
                anchorX="center"
                anchorY="middle"
                outlineColor="#fff"
                outlineWidth={0.025}
                rotation={[0, 0, 0]}
              >
                EMERGENCY EXIT
              </Text>
            </group>
            {/* Right Door (slides right) */}
            <group position={[0.28 + 0.25 * sideExitDoorAnim, 0, 0.065]}>
              <mesh>
                <boxGeometry args={[0.55, 2.1, 0.13]} />
                <meshStandardMaterial color="#e0e0e0" />
              </mesh>
              <mesh position={[0, 1.2, 0.13]}>
                <boxGeometry args={[0.45, 0.32, 0.04]} />
                <meshStandardMaterial color="#c62828" />
              </mesh>
              <mesh position={[0, 1.2, 0.17]}>
                <boxGeometry args={[0.35, 0.18, 0.04]} />
                <meshStandardMaterial color="#fff" />
              </mesh>
              <Text
                position={[0, 1.2, 0.19]}
                fontSize={0.22}
                color="#c62828"
                anchorX="center"
                anchorY="middle"
                outlineColor="#fff"
                outlineWidth={0.025}
                rotation={[0, 0, 0]}
              >
                EMERGENCY EXIT
              </Text>
            </group>
          </group>
          {/* Extended Entrance Canopy for Vehicle Drop-off (pillars attach flush) */}
          <mesh position={[0, 3.2, 8.5]} castShadow receiveShadow>
            <boxGeometry args={[9, 0.7, 5]} />
            <meshStandardMaterial color="#b3c6e7" metalness={0.22} roughness={0.28} />
          </mesh>
          {/* Entrance Lighting - Central Building (Front) */}
          <pointLight position={[0, 3.2, 7.2]} intensity={isNight ? 1.2 : 0.3} color="#fffde7" distance={8} decay={2} />
          {isNight && (
            <mesh position={[0, 3.2, 7.1]}>
              <sphereGeometry args={[0.18, 10, 10]} />
              <meshStandardMaterial color="#fffde7" emissive="#fffde7" emissiveIntensity={1.1} />
            </mesh>
          )}
          {/* Realistic Main Entrance Doors (double doors with frames, glass, crossbars, handles) */}
                    {/* Entrance Lighting - Central Building (Back) */}
                    <pointLight position={[0, 3.2, -7.2]} intensity={isNight ? 1.2 : 0.3} color="#fffde7" distance={8} decay={2} />
                    {isNight && (
                      <mesh position={[0, 3.2, -7.1]}>
                        <sphereGeometry args={[0.18, 10, 10]} />
                        <meshStandardMaterial color="#fffde7" emissive="#fffde7" emissiveIntensity={1.1} />
                      </mesh>
                    )}
          {/* Animated Auto-Opening Main Entrance Doors */}
          {/* Left Door (slides left) */}
          <group position={[-0.7 - 0.5 * doorAnim, 1.2, 6.61]}>
            {/* Frame */}
            <mesh>
              <boxGeometry args={[0.74, 1.64, 0.09]} />
              <primitive object={frameMaterial} attach="material" />
            </mesh>
            {/* Glass */}
            <mesh position={[0, 0, 0.05]}>
              <boxGeometry args={[0.66, 1.54, 0.03]} />
              <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
            </mesh>
            {/* Crossbars */}
            <mesh position={[0, 0, 0.07]}>
              <boxGeometry args={[0.05, 1.54, 0.01]} />
              <primitive object={crossbarMaterial} attach="material" />
            </mesh>
            <mesh position={[0, 0, 0.07]}>
              <boxGeometry args={[0.66, 0.05, 0.01]} />
              <primitive object={crossbarMaterial} attach="material" />
            </mesh>
            {/* Handle */}
            <mesh position={[0.25, 0, 0.12]} ref={el => { if (el) el.rotation.set(Math.PI / 2, 0, 0); }}>
              <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
              <primitive object={handleMaterial} attach="material" />
            </mesh>
          </group>
          {/* Right Door (slides right) */}
          <group position={[0.7 + 0.5 * doorAnim, 1.2, 6.61]}>
            {/* Frame */}
            <mesh>
              <boxGeometry args={[0.74, 1.64, 0.09]} />
              <primitive object={frameMaterial} attach="material" />
            </mesh>
            {/* Glass */}
            <mesh position={[0, 0, 0.05]}>
              <boxGeometry args={[0.66, 1.54, 0.03]} />
              <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
            </mesh>
            {/* Crossbars */}
            <mesh position={[0, 0, 0.07]}>
              <boxGeometry args={[0.05, 1.54, 0.01]} />
              <primitive object={crossbarMaterial} attach="material" />
            </mesh>
            <mesh position={[0, 0, 0.07]}>
              <boxGeometry args={[0.66, 0.05, 0.01]} />
              <primitive object={crossbarMaterial} attach="material" />
            </mesh>
            {/* Handle */}
            <mesh position={[-0.25, 0, 0.12]} ref={el => { if (el) el.rotation.set(Math.PI / 2, 0, 0); }}>
              <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
              <primitive object={handleMaterial} attach="material" />
            </mesh>
          </group>
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

          {/* Emergency Sign: attached board with bold style (moved forward for full visibility) */}
          <group position={[-10, 2.2, 18]} rotation={[0, Math.PI/8, 0]}>
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

          {/* Directional Sign: Parking (moved forward for full visibility) */}
          <group position={[8, 1.5, 20]} rotation={[0, -Math.PI/12, 0]}>
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

          {/* Directional Sign: Pharmacy (attached to building corner, flush with wall) */}
          <group position={[15.05, 3.2, -6]} rotation={[0, Math.PI/2, 0]}>
            <mesh position={[0.13, 0, 0]}>
              <boxGeometry args={[1.7, 0.45, 0.09]} />
              <meshStandardMaterial color="#00897b" />
            </mesh>
            <Text
              position={[0.13, 0.01, 0.05]}
              fontSize={0.32}
              color="#fff"
              anchorX="center"
              anchorY="middle"
            >
              PHARMACY
            </Text>
          </group>

          {/* Directional Sign: Wards (attached to building corner, flush with wall) */}
          <group position={[-15.05, 2, -6]} rotation={[0, -Math.PI/2, 0]}>
            <mesh position={[-0.13, 0, 0]}>
              <boxGeometry args={[1.7, 0.45, 0.09]} />
              <meshStandardMaterial color="#5e35b1" />
            </mesh>
            <Text
              position={[-0.13, 0.01, 0.05]}
              fontSize={0.28}
              color="#fff"
              anchorX="center"
              anchorY="middle"
            >
              WARDS
            </Text>
          </group>
          {/* Realistic Front Windows - with frames, glass, crossbars */}
          {Array.from({ length: 3 }).map((_, floor) =>
            Array.from({ length: 6 }).map((_, col) => {
              const x = -6 + col * 2.4;
              const y = 7.2 - floor * 2.5;
              return (
                <group key={`window-${floor}-${col}`}>
                  {/* Window Frame */}
                  <mesh position={[x, y, 6.1]}>
                    <boxGeometry args={[1.54, 1.24, 0.13]} />
                    <primitive object={frameMaterial} attach="material" />
                  </mesh>
                  {/* Window Glass */}
                  <mesh position={[x, y, 6.16]}>
                    <boxGeometry args={[1.44, 1.14, 0.03]} />
                    <meshStandardMaterial
                      color={isNight ? '#ffe066' : '#b3e5fc'}
                      emissive={isNight ? '#ffe066' : '#000000'}
                      emissiveIntensity={isNight ? 0.55 : 0}
                      transparent
                      opacity={isNight ? 0.92 : 0.7}
                    />
                  </mesh>
                  {/* Window Crossbars */}
                  <mesh position={[x, y, 6.18]}>
                    <boxGeometry args={[0.06, 1.14, 0.01]} />
                    <primitive object={crossbarMaterial} attach="material" />
                  </mesh>
                  <mesh position={[x, y, 6.18]}>
                    <boxGeometry args={[1.44, 0.06, 0.01]} />
                    <primitive object={crossbarMaterial} attach="material" />
                  </mesh>
                </group>
              );
            })
          )}
          {/* Side Wings (reduced height, visually matching center block) */}
          {/* Entrance Lighting - Left Side Building (Front) */}
          <pointLight position={[-12, 2.2, 7.2]} intensity={isNight ? 1.1 : 0.25} color="#fffde7" distance={7} decay={2} />
          {isNight && (
            <mesh position={[-12, 2.2, 7.1]}>
              <sphereGeometry args={[0.14, 8, 8]} />
              <meshStandardMaterial color="#fffde7" emissive="#fffde7" emissiveIntensity={1.0} />
            </mesh>
          )}
          {/* Entrance Lighting - Left Side Building (Back) */}
          <pointLight position={[-12, 2.2, -7.2]} intensity={isNight ? 1.1 : 0.25} color="#fffde7" distance={7} decay={2} />
          {isNight && (
            <mesh position={[-12, 2.2, -7.1]}>
              <sphereGeometry args={[0.14, 8, 8]} />
              <meshStandardMaterial color="#fffde7" emissive="#fffde7" emissiveIntensity={1.0} />
            </mesh>
          )}
                      {/* Back Entrance - Left Side Building (auto-opening double doors) */}
                      {/* Left Door (slides left) */}
                      <group position={[-0.7 - 0.5 * backDoorAnim, -2.3, -6.1]}>
                        <mesh>
                          <boxGeometry args={[0.74, 1.64, 0.09]} />
                          <primitive object={frameMaterial} attach="material" />
                        </mesh>
                        <mesh position={[0, 0, -0.05]}>
                          <boxGeometry args={[0.66, 1.54, 0.03]} />
                          <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
                        </mesh>
                        <mesh position={[0, 0, -0.07]}>
                          <boxGeometry args={[0.05, 1.54, 0.01]} />
                          <primitive object={crossbarMaterial} attach="material" />
                        </mesh>
                        <mesh position={[0, 0, -0.07]}>
                          <boxGeometry args={[0.66, 0.05, 0.01]} />
                          <primitive object={crossbarMaterial} attach="material" />
                        </mesh>
                        <mesh position={[0.25, 0, -0.12]} ref={el => { if (el) el.rotation.set(Math.PI / 2, 0, 0); }}>
                          <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
                          <primitive object={handleMaterial} attach="material" />
                        </mesh>
                      </group>
                      {/* Right Door (slides right) */}
                      <group position={[0.7 + 0.5 * backDoorAnim, -2.3, -6.1]}>
                        <mesh>
                          <boxGeometry args={[0.74, 1.64, 0.09]} />
                          <primitive object={frameMaterial} attach="material" />
                        </mesh>
                        <mesh position={[0, 0, -0.05]}>
                          <boxGeometry args={[0.66, 1.54, 0.03]} />
                          <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
                        </mesh>
                        <mesh position={[0, 0, -0.07]}>
                          <boxGeometry args={[0.05, 1.54, 0.01]} />
                          <primitive object={crossbarMaterial} attach="material" />
                        </mesh>
                        <mesh position={[0, 0, -0.07]}>
                          <boxGeometry args={[0.66, 0.05, 0.01]} />
                          <primitive object={crossbarMaterial} attach="material" />
                        </mesh>
                        <mesh position={[-0.25, 0, -0.12]} ref={el => { if (el) el.rotation.set(Math.PI / 2, 0, 0); }}>
                          <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
                          <primitive object={handleMaterial} attach="material" />
                        </mesh>
                      </group>
          <group position={[-12, 3.5, 0]}>
                        {/* Back Entrance - Left Side Building (auto-opening double doors, flush with wall) */}
                        {/* Left Door (slides left) */}
                        <group position={[-0.7 - 0.5 * backDoorAnim, -2.3, -6.1]}>
                          {/* Frame */}
                          <mesh>
                            <boxGeometry args={[0.74, 1.64, 0.09]} />
                            <primitive object={frameMaterial} attach="material" />
                          </mesh>
                          {/* Glass */}
                          <mesh position={[0, 0, -0.05]}>
                            <boxGeometry args={[0.66, 1.54, 0.03]} />
                            <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
                          </mesh>
                          {/* Crossbars */}
                          <mesh position={[0, 0, -0.07]}>
                            <boxGeometry args={[0.05, 1.54, 0.01]} />
                            <primitive object={crossbarMaterial} attach="material" />
                          </mesh>
                          <mesh position={[0, 0, -0.07]}>
                            <boxGeometry args={[0.66, 0.05, 0.01]} />
                            <primitive object={crossbarMaterial} attach="material" />
                          </mesh>
                          {/* Handle */}
                          <mesh position={[0.25, 0, -0.12]} ref={el => { if (el) el.rotation.set(Math.PI / 2, 0, 0); }}>
                            <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
                            <primitive object={handleMaterial} attach="material" />
                          </mesh>
                        </group>
                        {/* Right Door (slides right) */}
                        <group position={[0.7 + 0.5 * backDoorAnim, -2.3, -6.1]}>
                          {/* Frame */}
                          <mesh>
                            <boxGeometry args={[0.74, 1.64, 0.09]} />
                            <primitive object={frameMaterial} attach="material" />
                          </mesh>
                          {/* Glass */}
                          <mesh position={[0, 0, -0.05]}>
                            <boxGeometry args={[0.66, 1.54, 0.03]} />
                            <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
                          </mesh>
                          {/* Crossbars */}
                          <mesh position={[0, 0, -0.07]}>
                            <boxGeometry args={[0.05, 1.54, 0.01]} />
                            <primitive object={crossbarMaterial} attach="material" />
                          </mesh>
                          <mesh position={[0, 0, -0.07]}>
                            <boxGeometry args={[0.66, 0.05, 0.01]} />
                            <primitive object={crossbarMaterial} attach="material" />
                          </mesh>
                          {/* Handle */}
                          <mesh position={[-0.25, 0, -0.12]} ref={el => { if (el) el.rotation.set(Math.PI / 2, 0, 0); }}>
                            <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
                            <primitive object={handleMaterial} attach="material" />
                          </mesh>
                        </group>
            {/* Main block */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[6, 7, 12]} />
              <meshStandardMaterial color="#e3eafc" />
            </mesh>
            {/* Spacious Back Windows - Left Side Building (2 rows, 2 columns) */}
            {Array.from({ length: 2 }).map((_, floor) =>
              Array.from({ length: 2 }).map((_, col) => {
                const x = -1.5 + col * 3;
                const y = 2.2 - floor * 2.5;
                return (
                  <group key={`side-left-back-window-${floor}-${col}`}>
                    {/* Window Frame */}
                    <mesh position={[x, y, -6.1]}>
                      <boxGeometry args={[2.2, 1.4, 0.13]} />
                      <primitive object={frameMaterial} attach="material" />
                    </mesh>
                    {/* Window Glass */}
                    <mesh position={[x, y, -6.16]}>
                      <boxGeometry args={[2.1, 1.3, 0.03]} />
                      <meshStandardMaterial
                        color={isNight ? '#ffe066' : '#b3e5fc'}
                        emissive={isNight ? '#ffe066' : '#000000'}
                        emissiveIntensity={isNight ? 0.55 : 0}
                        transparent
                        opacity={isNight ? 0.92 : 0.7}
                      />
                    </mesh>
                    {/* Window Crossbars */}
                    <mesh position={[x, y, -6.18]}>
                      <boxGeometry args={[0.08, 1.3, 0.01]} />
                      <primitive object={crossbarMaterial} attach="material" />
                    </mesh>
                    <mesh position={[x, y, -6.18]}>
                      <boxGeometry args={[2.1, 0.08, 0.01]} />
                      <primitive object={crossbarMaterial} attach="material" />
                    </mesh>
                  </group>
                );
              })
            )}
            {/* Realistic Windows - 2 rows, 3 columns (front) */}
            {Array.from({ length: 2 }).map((_, floor) =>
              Array.from({ length: 3 }).map((_, col) => {
                const x = -1.8 + col * 1.8;
                const y = 2.2 - floor * 2.5;
                return (
                  <group key={`side-left-window-front-${floor}-${col}`}>
                    {/* Window Frame */}
                    <mesh position={[x, y, 6.1]}>
                      <boxGeometry args={[1.54, 1.24, 0.13]} />
                      <primitive object={frameMaterial} attach="material" />
                    </mesh>
                    {/* Window Glass */}
                    <mesh position={[x, y, 6.16]}>
                      <boxGeometry args={[1.44, 1.14, 0.03]} />
                      <meshStandardMaterial
                        color={isNight ? '#ffe066' : '#b3e5fc'}
                        emissive={isNight ? '#ffe066' : '#000000'}
                        emissiveIntensity={isNight ? 0.55 : 0}
                        transparent
                        opacity={isNight ? 0.92 : 0.7}
                      />
                    </mesh>
                    {/* Window Crossbars */}
                    <mesh position={[x, y, 6.18]}>
                      <boxGeometry args={[0.06, 1.14, 0.01]} />
                      <primitive object={crossbarMaterial} attach="material" />
                    </mesh>
                    <mesh position={[x, y, 6.18]}>
                      <boxGeometry args={[1.44, 0.06, 0.01]} />
                      <primitive object={crossbarMaterial} attach="material" />
                    </mesh>
                  </group>
                );
              })
            )}
            {/* Realistic Windows - 2 rows, 2 columns (left side) */}
            {Array.from({ length: 2 }).map((_, floor) =>
              Array.from({ length: 2 }).map((_, col) => {
                const z = -3 + col * 6;
                const y = 2.2 - floor * 2.5;
                return (
                  <group key={`side-left-window-left-${floor}-${col}`}>
                    {/* Window Frame */}
                    <mesh position={[-3.11, y, z]} rotation={[0, Math.PI / 2, 0]}>
                      <boxGeometry args={[1.54, 1.24, 0.13]} />
                      <primitive object={frameMaterial} attach="material" />
                    </mesh>
                    {/* Window Glass */}
                    <mesh position={[-3.16, y, z]} rotation={[0, Math.PI / 2, 0]}>
                      <boxGeometry args={[1.44, 1.14, 0.03]} />
                      <meshStandardMaterial
                        color={isNight ? '#ffe066' : '#b3e5fc'}
                        emissive={isNight ? '#ffe066' : '#000000'}
                        emissiveIntensity={isNight ? 0.55 : 0}
                        transparent
                        opacity={isNight ? 0.92 : 0.7}
                      />
                    </mesh>
                    {/* Window Crossbars */}
                    <mesh position={[-3.18, y, z]} rotation={[0, Math.PI / 2, 0]}>
                      <boxGeometry args={[0.06, 1.14, 0.01]} />
                      <primitive object={crossbarMaterial} attach="material" />
                    </mesh>
                    <mesh position={[-3.18, y, z]} rotation={[0, Math.PI / 2, 0]}>
                      <boxGeometry args={[1.44, 0.06, 0.01]} />
                      <primitive object={crossbarMaterial} attach="material" />
                    </mesh>
                  </group>
                );
              })
            )}
            {/* Animated Auto-Opening Entrance Doors for Side Building */}
            {/* Left Door (slides left, flush with building) */}
            <group position={[-0.7 - 0.5 * sideDoorAnim, -2.3, 6.01]}>
              {/* Frame */}
              <mesh>
                <boxGeometry args={[0.74, 1.64, 0.09]} />
                <primitive object={frameMaterial} attach="material" />
              </mesh>
              {/* Glass */}
              <mesh position={[0, 0, 0.05]}>
                <boxGeometry args={[0.66, 1.54, 0.03]} />
                <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
              </mesh>
              {/* Crossbars */}
              <mesh position={[0, 0, 0.07]}>
                <boxGeometry args={[0.05, 1.54, 0.01]} />
                <primitive object={crossbarMaterial} attach="material" />
              </mesh>
              <mesh position={[0, 0, 0.07]}>
                <boxGeometry args={[0.66, 0.05, 0.01]} />
                <primitive object={crossbarMaterial} attach="material" />
              </mesh>
              {/* Handle */}
              <mesh position={[0.25, 0, 0.12]} ref={el => { if (el) el.rotation.set(Math.PI / 2, 0, 0); }}>
                <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
                <primitive object={handleMaterial} attach="material" />
              </mesh>
            </group>
            {/* Right Door (slides right, flush with building, no gap) */}
            <group position={[0.7 + 0.5 * sideDoorAnim, -2.3, 6.0]}>
              <mesh>
                <boxGeometry args={[0.74, 1.64, 0.09]} />
                <primitive object={frameMaterial} attach="material" />
              </mesh>
              <mesh position={[0, 0, 0.05]}>
                <boxGeometry args={[0.66, 1.54, 0.03]} />
                <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
              </mesh>
              <mesh position={[0, 0, 0.07]}>
                <boxGeometry args={[0.05, 1.54, 0.01]} />
                <primitive object={crossbarMaterial} attach="material" />
              </mesh>
              <mesh position={[0, 0, 0.07]}>
                <boxGeometry args={[0.66, 0.05, 0.01]} />
                <primitive object={crossbarMaterial} attach="material" />
              </mesh>
              <mesh position={[-0.25, 0, 0.12]} ref={el => { if (el) el.rotation.set(Math.PI / 2, 0, 0); }}>
                <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
                <primitive object={handleMaterial} attach="material" />
              </mesh>
            </group>
          </group>
          {/* Entrance Lighting - Right Side Building (Front) */}
          <pointLight position={[12, 2.2, 7.2]} intensity={isNight ? 1.1 : 0.25} color="#fffde7" distance={7} decay={2} />
          {isNight && (
            <mesh position={[12, 2.2, 7.1]}>
              <sphereGeometry args={[0.14, 8, 8]} />
              <meshStandardMaterial color="#fffde7" emissive="#fffde7" emissiveIntensity={1.0} />
            </mesh>
          )}
          {/* Entrance Lighting - Right Side Building (Back) */}
          <pointLight position={[12, 2.2, -7.2]} intensity={isNight ? 1.1 : 0.25} color="#fffde7" distance={7} decay={2} />
          {isNight && (
            <mesh position={[12, 2.2, -7.1]}>
              <sphereGeometry args={[0.14, 8, 8]} />
              <meshStandardMaterial color="#fffde7" emissive="#fffde7" emissiveIntensity={1.0} />
            </mesh>
          )}
                      {/* Back Entrance - Right Side Building (auto-opening double doors) */}
                      {/* Left Door (slides left) */}
                      <group position={[-0.7 - 0.5 * backDoorAnim, -2.3, -6.1]}>
                        <mesh>
                          <boxGeometry args={[0.74, 1.64, 0.09]} />
                          <primitive object={frameMaterial} attach="material" />
                        </mesh>
                        <mesh position={[0, 0, -0.05]}>
                          <boxGeometry args={[0.66, 1.54, 0.03]} />
                          <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
                        </mesh>
                        <mesh position={[0, 0, -0.07]}>
                          <boxGeometry args={[0.05, 1.54, 0.01]} />
                          <primitive object={crossbarMaterial} attach="material" />
                        </mesh>
                        <mesh position={[0, 0, -0.07]}>
                          <boxGeometry args={[0.66, 0.05, 0.01]} />
                          <primitive object={crossbarMaterial} attach="material" />
                        </mesh>
                        <mesh position={[0.25, 0, -0.12]} ref={el => { if (el) el.rotation.set(Math.PI / 2, 0, 0); }}>
                          <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
                          <primitive object={handleMaterial} attach="material" />
                        </mesh>
                      </group>
                      {/* Right Door (slides right) */}
                      <group position={[0.7 + 0.5 * backDoorAnim, -2.3, -6.1]}>
                        <mesh>
                          <boxGeometry args={[0.74, 1.64, 0.09]} />
                          <primitive object={frameMaterial} attach="material" />
                        </mesh>
                        <mesh position={[0, 0, -0.05]}>
                          <boxGeometry args={[0.66, 1.54, 0.03]} />
                          <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
                        </mesh>
                        <mesh position={[0, 0, -0.07]}>
                          <boxGeometry args={[0.05, 1.54, 0.01]} />
                          <primitive object={crossbarMaterial} attach="material" />
                        </mesh>
                        <mesh position={[0, 0, -0.07]}>
                          <boxGeometry args={[0.66, 0.05, 0.01]} />
                          <primitive object={crossbarMaterial} attach="material" />
                        </mesh>
                        <mesh position={[-0.25, 0, -0.12]} ref={el => { if (el) el.rotation.set(Math.PI / 2, 0, 0); }}>
                          <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
                          <primitive object={handleMaterial} attach="material" />
                        </mesh>
                      </group>
          <group position={[12, 3.5, 0]}>
                        {/* Back Entrance - Right Side Building (auto-opening double doors, flush with wall) */}
                        {/* Left Door (slides left) */}
                        <group position={[-0.7 - 0.5 * backDoorAnim, -2.3, -6.1]}>
                          {/* Frame */}
                          <mesh>
                            <boxGeometry args={[0.74, 1.64, 0.09]} />
                            <primitive object={frameMaterial} attach="material" />
                          </mesh>
                          {/* Glass */}
                          <mesh position={[0, 0, -0.05]}>
                            <boxGeometry args={[0.66, 1.54, 0.03]} />
                            <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
                          </mesh>
                          {/* Crossbars */}
                          <mesh position={[0, 0, -0.07]}>
                            <boxGeometry args={[0.05, 1.54, 0.01]} />
                            <primitive object={crossbarMaterial} attach="material" />
                          </mesh>
                          <mesh position={[0, 0, -0.07]}>
                            <boxGeometry args={[0.66, 0.05, 0.01]} />
                            <primitive object={crossbarMaterial} attach="material" />
                          </mesh>
                          {/* Handle */}
                          <mesh position={[0.25, 0, -0.12]} ref={el => { if (el) el.rotation.set(Math.PI / 2, 0, 0); }}>
                            <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
                            <primitive object={handleMaterial} attach="material" />
                          </mesh>
                        </group>
                        {/* Right Door (slides right) */}
                        <group position={[0.7 + 0.5 * backDoorAnim, -2.3, -6.1]}>
                          {/* Frame */}
                          <mesh>
                            <boxGeometry args={[0.74, 1.64, 0.09]} />
                            <primitive object={frameMaterial} attach="material" />
                          </mesh>
                          {/* Glass */}
                          <mesh position={[0, 0, -0.05]}>
                            <boxGeometry args={[0.66, 1.54, 0.03]} />
                            <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
                          </mesh>
                          {/* Crossbars */}
                          <mesh position={[0, 0, -0.07]}>
                            <boxGeometry args={[0.05, 1.54, 0.01]} />
                            <primitive object={crossbarMaterial} attach="material" />
                          </mesh>
                          <mesh position={[0, 0, -0.07]}>
                            <boxGeometry args={[0.66, 0.05, 0.01]} />
                            <primitive object={crossbarMaterial} attach="material" />
                          </mesh>
                          {/* Handle */}
                          <mesh position={[-0.25, 0, -0.12]} ref={el => { if (el) el.rotation.set(Math.PI / 2, 0, 0); }}>
                            <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
                            <primitive object={handleMaterial} attach="material" />
                          </mesh>
                        </group>
            {/* Main block */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[6, 7, 12]} />
              <meshStandardMaterial color="#e3eafc" />
            </mesh>
            {/* Spacious Back Windows - Right Side Building (2 rows, 2 columns) */}
            {Array.from({ length: 2 }).map((_, floor) =>
              Array.from({ length: 2 }).map((_, col) => {
                const x = -1.5 + col * 3;
                const y = 2.2 - floor * 2.5;
                return (
                  <group key={`side-right-back-window-${floor}-${col}`}>
                    {/* Window Frame */}
                    <mesh position={[x, y, -6.1]}>
                      <boxGeometry args={[2.2, 1.4, 0.13]} />
                      <primitive object={frameMaterial} attach="material" />
                    </mesh>
                    {/* Window Glass */}
                    <mesh position={[x, y, -6.16]}>
                      <boxGeometry args={[2.1, 1.3, 0.03]} />
                      <meshStandardMaterial
                        color={isNight ? '#ffe066' : '#b3e5fc'}
                        emissive={isNight ? '#ffe066' : '#000000'}
                        emissiveIntensity={isNight ? 0.55 : 0}
                        transparent
                        opacity={isNight ? 0.92 : 0.7}
                      />
                    </mesh>
                    {/* Window Crossbars */}
                    <mesh position={[x, y, -6.18]}>
                      <boxGeometry args={[0.08, 1.3, 0.01]} />
                      <primitive object={crossbarMaterial} attach="material" />
                    </mesh>
                    <mesh position={[x, y, -6.18]}>
                      <boxGeometry args={[2.1, 0.08, 0.01]} />
                      <primitive object={crossbarMaterial} attach="material" />
                    </mesh>
                  </group>
                );
              })
            )}
            {/* Realistic Windows - 2 rows, 3 columns (front) */}
            {Array.from({ length: 2 }).map((_, floor) =>
              Array.from({ length: 3 }).map((_, col) => {
                const x = -1.8 + col * 1.8;
                const y = 2.2 - floor * 2.5;
                return (
                  <group key={`side-right-window-front-${floor}-${col}`}>
                    {/* Window Frame */}
                    <mesh position={[x, y, 6.1]}>
                      <boxGeometry args={[1.54, 1.24, 0.13]} />
                      <primitive object={frameMaterial} attach="material" />
                    </mesh>
                    {/* Window Glass */}
                    <mesh position={[x, y, 6.16]}>
                      <boxGeometry args={[1.44, 1.14, 0.03]} />
                      <meshStandardMaterial
                        color={isNight ? '#ffe066' : '#b3e5fc'}
                        emissive={isNight ? '#ffe066' : '#000000'}
                        emissiveIntensity={isNight ? 0.55 : 0}
                        transparent
                        opacity={isNight ? 0.92 : 0.7}
                      />
                    </mesh>
                    {/* Window Crossbars */}
                    <mesh position={[x, y, 6.18]}>
                      <boxGeometry args={[0.06, 1.14, 0.01]} />
                      <primitive object={crossbarMaterial} attach="material" />
                    </mesh>
                    <mesh position={[x, y, 6.18]}>
                      <boxGeometry args={[1.44, 0.06, 0.01]} />
                      <primitive object={crossbarMaterial} attach="material" />
                    </mesh>
                  </group>
                );
              })
            )}
            {/* Realistic Windows - 2 rows, 2 columns (right side) */}
            {Array.from({ length: 2 }).map((_, floor) =>
              Array.from({ length: 2 }).map((_, col) => {
                const z = -3 + col * 6;
                const y = 2.2 - floor * 2.5;
                return (
                  <group key={`side-right-window-right-${floor}-${col}`}>
                    {/* Window Frame */}
                    <mesh position={[3.11, y, z]} rotation={[0, -Math.PI / 2, 0]}>
                      <boxGeometry args={[1.54, 1.24, 0.13]} />
                      <primitive object={frameMaterial} attach="material" />
                    </mesh>
                    {/* Window Glass */}
                    <mesh position={[3.16, y, z]} rotation={[0, -Math.PI / 2, 0]}>
                      <boxGeometry args={[1.44, 1.14, 0.03]} />
                      <meshStandardMaterial
                        color={isNight ? '#ffe066' : '#b3e5fc'}
                        emissive={isNight ? '#ffe066' : '#000000'}
                        emissiveIntensity={isNight ? 0.55 : 0}
                        transparent
                        opacity={isNight ? 0.92 : 0.7}
                      />
                    </mesh>
                    {/* Window Crossbars */}
                    <mesh position={[3.18, y, z]} rotation={[0, -Math.PI / 2, 0]}>
                      <boxGeometry args={[0.06, 1.14, 0.01]} />
                      <primitive object={crossbarMaterial} attach="material" />
                    </mesh>
                    <mesh position={[3.18, y, z]} rotation={[0, -Math.PI / 2, 0]}>
                      <boxGeometry args={[1.44, 0.06, 0.01]} />
                      <primitive object={crossbarMaterial} attach="material" />
                    </mesh>
                  </group>
                );
              })
            )}
            {/* Animated Auto-Opening Entrance Doors for Side Building */}
            {/* Left Door (slides left, at bottom entrance) */}
            <group position={[-0.7 - 0.5 * sideDoorAnim, -2.3, 6.01]}>
              {/* Frame */}
              <mesh>
                <boxGeometry args={[0.74, 1.64, 0.09]} />
                <primitive object={frameMaterial} attach="material" />
              </mesh>
              {/* Glass */}
              <mesh position={[0, 0, 0.05]}>
                <boxGeometry args={[0.66, 1.54, 0.03]} />
                <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
              </mesh>
              {/* Crossbars */}
              <mesh position={[0, 0, 0.07]}>
                <boxGeometry args={[0.05, 1.54, 0.01]} />
                <primitive object={crossbarMaterial} attach="material" />
              </mesh>
              <mesh position={[0, 0, 0.07]}>
                <boxGeometry args={[0.66, 0.05, 0.01]} />
                <primitive object={crossbarMaterial} attach="material" />
              </mesh>
              {/* Handle */}
              <mesh position={[0.25, 0, 0.12]} ref={el => { if (el) el.rotation.set(Math.PI / 2, 0, 0); }}>
                <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
                <primitive object={handleMaterial} attach="material" />
              </mesh>
            </group>
            {/* Right Door (slides right) */}
            <group position={[0.7 + 0.5 * sideDoorAnim, -2.3, 6.01]}>
              <mesh>
                <boxGeometry args={[0.74, 1.64, 0.09]} />
                <primitive object={frameMaterial} attach="material" />
              </mesh>
              <mesh position={[0, 0, 0.05]}>
                <boxGeometry args={[0.66, 1.54, 0.03]} />
                <meshStandardMaterial color="#e3f2fd" transparent opacity={0.6} metalness={0.4} />
              </mesh>
              <mesh position={[0, 0, 0.07]}>
                <boxGeometry args={[0.05, 1.54, 0.01]} />
                <primitive object={crossbarMaterial} attach="material" />
              </mesh>
              <mesh position={[0, 0, 0.07]}>
                <boxGeometry args={[0.66, 0.05, 0.01]} />
                <primitive object={crossbarMaterial} attach="material" />
              </mesh>
              <mesh position={[-0.25, 0, 0.12]} ref={el => { if (el) el.rotation.set(Math.PI / 2, 0, 0); }}>
                <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
                <primitive object={handleMaterial} attach="material" />
              </mesh>
            </group>
          </group>
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
              {/* Light Source - only at night */}
              {isNight && (
                <pointLight
                  position={[0, 2.3, 0]}
                  intensity={1.5}
                  distance={16}
                  color="#fffbe7"
                  castShadow
                  decay={2}
                />
              )}
            </group>
          ))}
        </group>
      </Float>
      {/* Hospital Interior Layout (Ground Floor) */}
      <group position={[0, 0.11, 0]}>
        {/* Removed Reception at entrance */}
        {/* Wards left and right */}
        <WardRoom position={[-5.5, 0, 0]} beds={3} />
        <WardRoom position={[5.5, 0, 0]} beds={3} />
        {/* Operation Theater at back left */}
        <OperationTheater position={[-5.5, 0, -5]} />
        {/* Pharmacy at back right (not implemented) */}
        {/* <PharmacyRoom position={[5.5, 0, -5]} /> */}
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

export default function Hospital3D({ position = [0, 0, 0], isNight = false }: Hospital3DProps) {
  return (
    <group position={position}>
      <Suspense fallback={null}>
        <HospitalContent isNight={isNight} />
      </Suspense>
    </group>
  );
}