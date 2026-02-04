"use client";

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import { Html, Line } from '@react-three/drei';
import { TrafficSignal } from './BangaloreLandmarks';
import StreetFoodStall from './food/StreetFoodStall';
import AutoRickshawStand from './transportation/AutoRickshawStand';
import KiranaStore from './buildings/KiranaStore';
import Temple from './buildings/Temple';
import Playground from './recreation/Playground';
import Male3D from './Male3D';
import Female3D from './Female3D';
import WalkingCouple from './WalkingCouple';
import PetDog3D from './PetDog3D';
import { Bird, Butterfly } from './BirdButterfly3D';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface MemoryWalkingPathProps {
  startPosition?: [number, number, number];
  endPosition?: [number, number, number];
}

export default function MemoryWalkingPath({ 
  startPosition = [0, 0, 30],  // BMS College position (front center)
  endPosition = [0, 0, -30]    // Friend's home position (back center)
}: MemoryWalkingPathProps) {
  const { isNight } = useTheme();
  const pathRef = useRef<THREE.Group>(null);
  const [showPathInfo, setShowPathInfo] = useState(false);
  const [showStartLabel, setShowStartLabel] = useState(true);
  const [showEndLabel, setShowEndLabel] = useState(true);
  
  // Auto-hide labels after 3 seconds
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setShowStartLabel(false);
    }, 3000);
    
    const endTimer = setTimeout(() => {
      setShowEndLabel(false);
    }, 3500); // Slightly staggered
    
    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, []);
  
  // Create a beautiful curved path between the two points
  const pathPoints: [number, number, number][] = [];
  const steps = 20;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = THREE.MathUtils.lerp(startPosition[0], endPosition[0], t);
    const z = THREE.MathUtils.lerp(startPosition[2], endPosition[2], t);
    // Add a gentle curve to make the path more natural
    const curve = Math.sin(t * Math.PI) * 3;
    pathPoints.push([x, 0.1, z + curve]);
  }

  // Animate glowing particles along the path
  useFrame(({ clock }) => {
    if (pathRef.current) {
      const time = clock.getElapsedTime();
      pathRef.current.children.forEach((child, index) => {
        if (child.name === 'pathParticle') {
          const offset = (index * 0.5 + time) % pathPoints.length;
          const pointIndex = Math.floor(offset);
          const nextIndex = (pointIndex + 1) % pathPoints.length;
          const t = offset - pointIndex;
          
          const currentPoint = pathPoints[pointIndex];
          const nextPoint = pathPoints[nextIndex];
          
          child.position.x = THREE.MathUtils.lerp(currentPoint[0], nextPoint[0], t);
          child.position.y = currentPoint[1] + Math.sin(time * 2 + index) * 0.2;
          child.position.z = THREE.MathUtils.lerp(currentPoint[2], nextPoint[2], t);
        }
      });
    }
  });

  return (
    <group ref={pathRef}>
      {/* The main road surface */}
      {pathPoints.map((point, index) => {
        if (index < pathPoints.length - 1) {
          const nextPoint = pathPoints[index + 1];
          const midX = (point[0] + nextPoint[0]) / 2;
          const midZ = (point[2] + nextPoint[2]) / 2;
          const distance = Math.sqrt((nextPoint[0] - point[0]) ** 2 + (nextPoint[2] - point[2]) ** 2);
          const angle = Math.atan2(nextPoint[2] - point[2], nextPoint[0] - point[0]);
          
          return (
            <mesh 
              key={index} 
              position={[midX, 0.01, midZ]} 
              rotation={[0, angle, 0]}
            >
              <boxGeometry args={[distance, 0.05, 1.5]} />
              <meshStandardMaterial 
                color="#696969" 
                roughness={0.8}
                metalness={0.1}
              />
            </mesh>
          );
        }
        return null;
      })}
      
      {/* Road center line */}
      <Line
        points={pathPoints}
        color={isNight ? "#FFD700" : "#FFFF00"}
        lineWidth={2}
        transparent
        opacity={0.8}
        dashed
        dashScale={10}
        dashSize={1}
        gapSize={0.5}
      />
      
      {/* Road side markings */}
      <Line
        points={pathPoints.map(p => [p[0] - 0.8, p[1] + 0.02, p[2]])}
        color="#FFFFFF"
        lineWidth={1}
        transparent
        opacity={0.6}
      />
      <Line
        points={pathPoints.map(p => [p[0] + 0.8, p[1] + 0.02, p[2]])}
        color="#FFFFFF"
        lineWidth={1}
        transparent
        opacity={0.6}
      />
      
      {/* Street lights along the road - city consistent */}
      {pathPoints.map((point, index) => {
        if (index % 8 === 0) {
          return (
            <group key={`streetlight-${index}`} position={[point[0] + 2, 0, point[2]]}>
              {/* Street light pole */}
              <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 2, 8]} />
                <meshStandardMaterial color="#444444" />
              </mesh>
              {/* Light fixture */}
              {isNight && (
                <>
                  <pointLight position={[0, 2, 0]} intensity={0.3} color="#FFE55C" distance={3} />
                  <mesh position={[0, 2, 0]}>
                    <sphereGeometry args={[0.06, 8, 8]} />
                    <meshStandardMaterial 
                      color="#FFE55C" 
                      emissive="#FFE55C" 
                      emissiveIntensity={0.6}
                    />
                  </mesh>
                </>
              )}
            </group>
          );
        }
        return null;
      })}
      
      {/* Decorative Bengaluru-style lamp posts between main lights */}
      {pathPoints.map((point, index) => {
        if (index % 4 === 2) {
          return (
            <group key={`decorative-lamp-${index}`} position={[point[0] - 2, 0, point[2]]}>
              {/* Decorative lamp post - Bengaluru municipal style */}
              <mesh position={[0, 1.2, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 2.4, 8]} />
                <meshStandardMaterial color="#2C5530" roughness={0.7} />
              </mesh>
              {/* Lamp head */}
              <mesh position={[0, 2.6, 0]}>
                <sphereGeometry args={[0.12, 12, 12]} />
                <meshStandardMaterial 
                  color={isNight ? "#FFF8DC" : "#F5F5DC"}
                  emissive={isNight ? "#FFF8DC" : "#000000"}
                  emissiveIntensity={isNight ? 0.4 : 0}
                  transparent
                  opacity={0.8}
                />
              </mesh>
              {/* Decorative base */}
              <mesh position={[0, 0.2, 0]}>
                <cylinderGeometry args={[0.15, 0.12, 0.4, 8]} />
                <meshStandardMaterial color="#556B2F" roughness={0.8} />
              </mesh>
              {isNight && (
                <pointLight position={[0, 2.6, 0]} intensity={0.2} color="#FFF8DC" distance={2.5} />
              )}
            </group>
          );
        }
        return null;
      })}
      
      {/* Trees along the road - city style */}
      {pathPoints.map((point, index) => {
        if (index % 6 === 0 && index > 0 && index < pathPoints.length - 1) {
          return (
            <group key={`tree-${index}`}>
              {/* Trees on left side */}
              <group position={[point[0] - 2.5, 0, point[2]]}>
                <mesh position={[0, 0.5, 0]}>
                  <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
                  <meshStandardMaterial color="#8B4513" roughness={0.9} />
                </mesh>
                <mesh position={[0, 1.2, 0]}>
                  <sphereGeometry args={[0.4, 12, 12]} />
                  <meshStandardMaterial color={isNight ? "#2F4F2F" : "#228B22"} roughness={0.8} />
                </mesh>
              </group>
              
              {/* Trees on right side */}
              <group position={[point[0] + 2.5, 0, point[2]]}>
                <mesh position={[0, 0.5, 0]}>
                  <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
                  <meshStandardMaterial color="#8B4513" roughness={0.9} />
                </mesh>
                <mesh position={[0, 1.2, 0]}>
                  <sphereGeometry args={[0.4, 12, 12]} />
                  <meshStandardMaterial color={isNight ? "#2F4F2F" : "#228B22"} roughness={0.8} />
                </mesh>
              </group>
            </group>
          );
        }
        return null;
      })}
      
      {/* Street food vendor along the path - authentic Bengaluru experience */}
      <StreetFoodStall position={[2, 0, 0]} type="chaat" scale={0.7} />
      
      {/* Traffic signal at intersection - typical Bengaluru */}
      <TrafficSignal position={[-3, 0, 5]} />
      
      {/* Utility poles with cables - very common in Bengaluru */}
      {pathPoints.map((point, index) => {
        if (index % 14 === 0 && index > 0) {
          return (
            <group key={`utility-${index}`} position={[point[0] + 4, 0, point[2]]}>
              {/* Utility pole */}
              <mesh position={[0, 2.5, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 5, 8]} />
                <meshStandardMaterial color="#654321" roughness={0.9} />
              </mesh>
              {/* Transformer box */}
              <mesh position={[0, 1, 0]}>
                <boxGeometry args={[0.3, 0.4, 0.2]} />
                <meshStandardMaterial color="#696969" roughness={0.7} />
              </mesh>
              {/* Cables - simplified representation */}
              <mesh position={[0, 4.8, 0]} rotation={[0, 0, Math.PI/4]}>
                <boxGeometry args={[2, 0.02, 0.02]} />
                <meshStandardMaterial color="#000000" />
              </mesh>
              {/* Warning sign */}
              <mesh position={[0.2, 1.8, 0]}>
                <boxGeometry args={[0.15, 0.15, 0.02]} />
                <meshStandardMaterial 
                  color="#FFD700" 
                  emissive={isNight ? "#FFD700" : "#000000"}
                  emissiveIntensity={isNight ? 0.2 : 0}
                />
              </mesh>
            </group>
          );
        }
        return null;
      })}
      
      {/* Bus shelter with lighting - common along Bengaluru roads */}
      <group position={[4, 0, 10]}>
        {/* Shelter structure */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[2.5, 2.4, 1]} />
          <meshStandardMaterial color="#4682B4" transparent opacity={0.3} />
        </mesh>
        {/* Shelter roof */}
        <mesh position={[0, 2.5, 0]}>
          <boxGeometry args={[2.7, 0.1, 1.2]} />
          <meshStandardMaterial color="#2F4F4F" roughness={0.8} />
        </mesh>
        {/* Bench inside shelter */}
        <mesh position={[0, 0.3, -0.3]}>
          <boxGeometry args={[2, 0.6, 0.4]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        {/* Shelter lighting */}
        {isNight && (
          <>
            <pointLight position={[0, 2.2, 0]} intensity={0.3} color="#F0F8FF" distance={3} />
            <mesh position={[0, 2.3, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.05, 8]} />
              <meshStandardMaterial 
                color="#F0F8FF" 
                emissive="#F0F8FF" 
                emissiveIntensity={0.5}
              />
            </mesh>
          </>
        )}
      </group>
      
      {/* Decorative benches along the road */}
      {pathPoints.map((point, index) => {
        if (index % 10 === 5) {
          return (
            <group key={`bench-${index}`} position={[point[0] + 2.5, 0, point[2]]}>
              {/* Bench seat */}
              <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[1.5, 0.1, 0.4]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              {/* Bench back */}
              <mesh position={[0, 0.7, -0.15]}>
                <boxGeometry args={[1.5, 0.5, 0.1]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              {/* Bench legs */}
              <mesh position={[-0.6, 0.2, 0]}>
                <boxGeometry args={[0.1, 0.4, 0.1]} />
                <meshStandardMaterial color="#2C2C2C" />
              </mesh>
              <mesh position={[0.6, 0.2, 0]}>
                <boxGeometry args={[0.1, 0.4, 0.1]} />
                <meshStandardMaterial color="#2C2C2C" />
              </mesh>
            </group>
          );
        }
        return null;
      })}
      
      {/* Decorative flower beds along the road */}
      {pathPoints.map((point, index) => {
        if (index % 12 === 3) {
          return (
            <group key={`flowers-${index}`} position={[point[0] - 2.8, 0.05, point[2]]}>
              <mesh>
                <cylinderGeometry args={[0.6, 0.6, 0.1, 16]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              {Array.from({ length: 4 }, (_, i) => (
                <mesh key={i} position={[
                  (Math.random() - 0.5) * 0.8,
                  0.1,
                  (Math.random() - 0.5) * 0.8
                ]}>
                  <sphereGeometry args={[0.06, 8, 8]} />
                  <meshStandardMaterial 
                    color={["#FF69B4", "#FFD700", "#FF4500", "#9370DB"][i]}
                    emissive={["#FF69B4", "#FFD700", "#FF4500", "#9370DB"][i]}
                    emissiveIntensity={0.3}
                  />
                </mesh>
              ))}
            </group>
          );
        }
        return null;
      })}
      
      {/* Bengaluru-style road median decorations */}
      {pathPoints.map((point, index) => {
        if (index % 15 === 7) {
          return (
            <group key={`median-decor-${index}`} position={[point[0], 0.1, point[2]]}>
              {/* Median planter */}
              <mesh position={[0, 0.3, 0]}>
                <boxGeometry args={[2, 0.6, 0.8]} />
                <meshStandardMaterial color="#CD853F" roughness={0.8} />
              </mesh>
              {/* Decorative plants */}
              <mesh position={[-0.6, 0.8, 0]}>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshStandardMaterial color={isNight ? "#2F4F2F" : "#32CD32"} roughness={0.8} />
              </mesh>
              <mesh position={[0.6, 0.8, 0]}>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshStandardMaterial color={isNight ? "#2F4F2F" : "#32CD32"} roughness={0.8} />
              </mesh>
              {/* Small decorative lights in plants */}
              {isNight && (
                <>
                  <pointLight position={[-0.6, 0.8, 0]} intensity={0.1} color="#90EE90" distance={1} />
                  <pointLight position={[0.6, 0.8, 0]} intensity={0.1} color="#90EE90" distance={1} />
                </>
              )}
            </group>
          );
        }
        return null;
      })}
      
      {/* Bengaluru-style signboards and banners */}
      {pathPoints.map((point, index) => {
        if (index % 18 === 9) {
          return (
            <group key={`signboard-${index}`} position={[point[0] + 3.5, 0, point[2]]}>
              {/* Sign post */}
              <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 3, 8]} />
                <meshStandardMaterial color="#4682B4" roughness={0.7} />
              </mesh>
              {/* Sign board - typical Bengaluru municipal board */}
              <mesh position={[0, 2.8, 0]}>
                <boxGeometry args={[1.8, 0.6, 0.05]} />
                <meshStandardMaterial 
                  color="#1E90FF" 
                  emissive={isNight ? "#1E90FF" : "#000000"}
                  emissiveIntensity={isNight ? 0.2 : 0}
                />
              </mesh>
              {/* Smaller info board */}
              <mesh position={[0, 2, 0]}>
                <boxGeometry args={[1.4, 0.4, 0.05]} />
                <meshStandardMaterial 
                  color="#228B22" 
                  emissive={isNight ? "#228B22" : "#000000"}
                  emissiveIntensity={isNight ? 0.15 : 0}
                />
              </mesh>
            </group>
          );
        }
        return null;
      })}
      
      {/* Animated particles moving along the path */}
      {Array.from({ length: 5 }, (_, index) => (
        <mesh 
          key={index} 
          name="pathParticle"
          position={[startPosition[0], 0.5, startPosition[2]]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial 
            color="#FF69B4"
            emissive="#FF1493"
            emissiveIntensity={0.8}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      
      {/* Start marker at BMS College entrance */}
      <group position={startPosition}>
        {/* College entrance gate pillars */}
        <mesh position={[-1, 1.5, 0]}>
          <boxGeometry args={[0.3, 3, 0.3]} />
          <meshStandardMaterial color="#4169E1" />
        </mesh>
        <mesh position={[1, 1.5, 0]}>
          <boxGeometry args={[0.3, 3, 0.3]} />
          <meshStandardMaterial color="#4169E1" />
        </mesh>
        
        {/* College entrance arch */}
        <mesh position={[0, 2.8, 0]}>
          <boxGeometry args={[2.6, 0.3, 0.3]} />
          <meshStandardMaterial 
            color="#4169E1"
            emissive={isNight ? "#4169E1" : "#000000"}
            emissiveIntensity={isNight ? 0.3 : 0}
          />
        </mesh>
        
        {/* Heart symbol on the gate - where love began */}
        <mesh position={[0, 2.8, 0.2]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial 
            color="#FF69B4" 
            emissive="#FF1493"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {showStartLabel && (
          <Html position={[0, 3.5, 0]} center>
            <div className="bg-blue-500/90 backdrop-blur-md rounded-lg p-3 text-white text-center text-sm">
              🎓 BMS College Gate<br/>
              <span className="text-xs opacity-75">Starting point - Jan 18th ✨</span>
            </div>
          </Html>
        )}
      </group>
      
      {/* End marker - Rajajinagar style residential area */}
      <group position={endPosition}>
        {/* Main residential buildings - matching Rajajinagar style */}
        {Array.from({ length: 6 }).map((_, i) => {
          const x = (i % 3) * 1.8 - 1.8;
          const z = Math.floor(i / 3) * 1.5 - 0.75;
          const height = 0.8 + ((i * 37) % 60) / 100;
          const colors = ["#F0E68C", "#DDA0DD", "#98FB98", "#F4A460", "#87CEEB", "#FFB6C1"];
          
          return (
            <group key={i} position={[x, 0, z]}>
              <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[1, height, 0.8]} />
                <meshStandardMaterial color={colors[i]} roughness={0.7} />
              </mesh>
              
              {/* Windows - city style */}
              {Array.from({ length: 2 }).map((_, floor) => 
                Array.from({ length: 2 }).map((_, window) => (
                  <mesh 
                    key={`${floor}-${window}`} 
                    position={[-0.3 + window * 0.6, 0.2 + floor * 0.3, 0.41]}
                  >
                    <boxGeometry args={[0.2, 0.2, 0.02]} />
                    <meshStandardMaterial 
                      color={isNight && (i + floor + window) % 5 !== 0 ? "#FFD700" : "#87CEEB"} 
                      transparent 
                      opacity={0.8}
                      emissive={isNight && (i + floor + window) % 5 !== 0 ? "#FFD700" : "#000000"}
                      emissiveIntensity={isNight ? 0.3 : 0}
                    />
                  </mesh>
                ))
              )}
              
              {/* Small balconies - city style */}
              <mesh position={[0, height * 0.7, 0.5]}>
                <boxGeometry args={[0.8, 0.05, 0.3]} />
                <meshStandardMaterial color="#696969" roughness={0.8} />
              </mesh>
            </group>
          );
        })}
        
        {/* Area sign - matching Rajajinagar */}
        <mesh position={[0, 2, -2]}>
          <boxGeometry args={[3, 0.4, 0.1]} />
          <meshStandardMaterial 
            color="#2E8B57" 
            emissive={isNight ? "#2E8B57" : "#000000"}
            emissiveIntensity={isNight ? 0.2 : 0}
          />
        </mesh>
        
        {/* Small park area - city style */}
        <mesh position={[0, 0.02, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.2, 16]} />
          <meshStandardMaterial color="#90EE90" roughness={0.9} />
        </mesh>
        
        {/* Street lamps - city consistent */}
        {isNight && [-1.5, 1.5].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh position={[0, 1, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 2, 8]} />
              <meshStandardMaterial color="#444444" />
            </mesh>
            <pointLight position={[0, 2, 0]} intensity={0.3} color="#FFE55C" distance={3} />
            <mesh position={[0, 2, 0]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial 
                color="#FFE55C" 
                emissive="#FFE55C" 
                emissiveIntensity={0.6}
              />
            </mesh>
          </group>
        ))}
        
        {/* Auto rickshaw stand - common in residential areas */}
        <AutoRickshawStand position={[3, 0, 2]} autoCount={2} scale={0.7} />
        
        {/* Local kirana store - essential in residential areas */}
        <KiranaStore position={[-2.5, 0, 2.5]} storeName="Rajajinagar Provision Store" type="general" scale={0.7} bustling />
        
        {/* Small community temple - very common in Bengaluru neighborhoods */}
        <Temple position={[2.5, 0, -1]} type="community" name="Local Temple" scale={0.6} />
        
        {/* Animated walking couple going from college to friend's home */}
        <WalkingCouple 
          startPosition={startPosition}
          endPosition={endPosition}
          walkingSpeed={0.08}
          scale={0.85}
        />
        
        {/* Girl waiting in front of friend's home - positioned at the actual end location */}
        <Female3D 
          position={[-1.2, 0, -29]} 
          scale={0.82} 
          rotationY={Math.PI / 4} 
          walking={false}
          talking={true}
        />
        
        {/* Add some waiting gestures - she's checking her phone/looking around */}
        <mesh position={[-1.1, 1.2, -28.8]}>
          <boxGeometry args={[0.06, 0.1, 0.02]} />
          <meshStandardMaterial 
            color="#1A1A1A" 
            emissive="#00BFFF"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Local residents and other characters */}
        <Male3D position={[-2.2, 0, 2.2]} scale={0.65} rotationY={-Math.PI / 4} walking={false} /> {/* Near kirana store */}
        <Female3D position={[2.8, 0, 1.8]} scale={0.62} rotationY={Math.PI / 6} walking={false} /> {/* Near auto stand */}
        <Male3D position={[2.3, 0, -0.8]} scale={0.68} rotationY={Math.PI / 2} walking={false} /> {/* Near temple */}
        
        {/* Some background characters with extremely slow walking */}
        <Female3D 
          position={[-3.5, 0, 5]} 
          scale={0.6} 
          rotationY={Math.PI / 3} 
          walking={true}
          walkingSpeed={0.3}
        />
        <Male3D 
          position={[3.2, 0, -5]} 
          scale={0.6} 
          rotationY={-Math.PI / 4} 
          walking={true}
          walkingSpeed={0.25}
        />
        
        {/* Community playground - common in residential areas */}
        <Playground position={[-3.5, 0, -1]} scale={0.6} />
        
        {/* Roaming dogs - very common in Indian residential areas */}
        <PetDog3D position={[1, 0, 3]} scale={0.85} walkRadius={1.2} walkSpeed={0.28} />
        <PetDog3D position={[-4, 0, 1.5]} scale={0.75} walkRadius={0.9} walkSpeed={0.22} />
        
        {/* Flying birds and butterflies over residential area */}
        <Bird position={[2, 6, 0]} color="#A084E8" speed={1.0} phase={0.8} />
        <Bird position={[-3, 5, 2]} color="#FFD93D" speed={0.8} phase={1.5} />
        <Butterfly position={[0, 3, 1]} color="#FF6B6B" speed={0.6} />
        <Butterfly position={[-2, 2, -2]} color="#4ECDC4" speed={0.7} phase={2} />
        
        {showEndLabel && (
          <Html position={[0, 3, 0]} center>
            <div className="bg-green-500/90 backdrop-blur-md rounded-lg p-3 text-white text-center text-sm">
              🏠 Friend's Neighborhood<br/>
              <span className="text-xs opacity-75">Rajajinagar residential area ✨</span>
            </div>
          </Html>
        )}
      </group>
      
      {/* Interactive path info - positioned in the middle of our journey */}
      <group 
        position={[0, 2, 0]} // Center of the diagonal path
        onPointerOver={() => setShowPathInfo(true)}
        onPointerOut={() => setShowPathInfo(false)}
      >
        <mesh>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial 
            color="#FFD700"
            transparent
            opacity={0.2}
            emissive="#FFD700"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {showPathInfo && (
          <Html position={[0, 1.5, 0]} center>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-md rounded-lg p-4 text-white text-center max-w-sm"
            >
              <h3 className="font-bold text-lg mb-2">🚶‍♂️🚶‍♀️ The Journey</h3>
              <p className="text-sm mb-2">
                "A 2km walk through Bengaluru..."
              </p>
              <p className="text-xs opacity-75">
                From BMS College (front) to her friend's home (back)
              </p>
              <p className="text-xs mt-2 font-medium">
                Every step was meaningful! ✨
              </p>
            </motion.div>
          </Html>
        )}
      </group>
    </group>
  );
}