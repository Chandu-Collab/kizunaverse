import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { 
  VidhanaSoudha, 
  UBCity, 
  BangalorePalace, 
  ISKCONTemple, 
  TechPark, 
  AutoRickshaw, 
  TrafficSignal,
  BMSCollege,
  Rajajinagar
} from './BangaloreLandmarks';
import Male3D from './Male3D';
import Female3D from './Female3D';
import PetDog3D from './PetDog3D';
import { Bird, Butterfly } from './BirdButterfly3D';
import Fountain3D from './Fountain3D';
import Particles from './Particles';

// Cubbon Park Trees
function CubbonParkTree({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const treeRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (treeRef.current) {
      treeRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5 + position[0]) * 0.05;
    }
  });

  return (
    <group ref={treeRef} position={position}>
      {/* Tree trunk */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 1, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>
      
      {/* Tree crown */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshStandardMaterial color="#228B22" roughness={0.8} />
      </mesh>
      
      {/* Additional foliage layers */}
      <mesh position={[0, 1.0, 0]}>
        <sphereGeometry args={[0.35, 8, 8]} />
        <meshStandardMaterial color="#32CD32" roughness={0.8} />
      </mesh>
    </group>
  );
}

// MG Road Shopping Area
function MGRoadShops({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Row of shops */}
      {Array.from({ length: 5 }).map((_, i) => (
        <group key={i} position={[i * 1.2 - 2.4, 0, 0]}>
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[1, 1.2, 0.8]} />
            <meshStandardMaterial 
              color={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'][i]} 
              roughness={0.7} 
            />
          </mesh>
          
          {/* Shop signs */}
          <mesh position={[0, 1.3, 0.41]}>
            <boxGeometry args={[0.8, 0.2, 0.02]} />
            <meshStandardMaterial color="#2C3E50" />
          </mesh>
          
          {/* Shop windows/doors */}
          <mesh position={[0, 0.4, 0.41]}>
            <boxGeometry args={[0.6, 0.8, 0.02]} />
            <meshStandardMaterial color="#87CEEB" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Namma Metro Train
function NammaMetro({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const metroRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (metroRef.current) {
      // Slow movement along track
      metroRef.current.position.x = position[0] + Math.sin(clock.getElapsedTime() * 0.3) * 2;
    }
  });

  return (
    <group ref={metroRef} position={position}>
      {/* Metro track elevated */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[8, 0.1, 0.3]} />
        <meshStandardMaterial color="#666666" roughness={0.8} />
      </mesh>
      
      {/* Metro pillars */}
      {[-3, 0, 3].map((x, i) => (
        <mesh key={i} position={[x, 1, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 2, 8]} />
          <meshStandardMaterial color="#CCCCCC" roughness={0.7} />
        </mesh>
      ))}
      
      {/* Metro train */}
      <mesh position={[0, 2.4, 0]}>
        <boxGeometry args={[3, 0.6, 0.8]} />
        <meshStandardMaterial color="#9B59B6" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Train windows */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[-1.2 + i * 0.4, 2.5, 0.41]}>
          <boxGeometry args={[0.3, 0.3, 0.02]} />
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// Bangalore Cityscape Component
export default function BangaloreCityscape() {
  const { isNight } = useTheme();
  const [selectedLandmark, setSelectedLandmark] = useState<string | null>(null);
  
  // Auto-rickshaw positions with movement in MAXIMUM expanded Bengaluru city
  const [autoPositions, setAutoPositions] = useState([
    { pos: [-28, 0, 4], rotation: Math.PI / 4 },
    { pos: [-15, 0, -6], rotation: -Math.PI / 6 },
    { pos: [-24, 0, -2], rotation: Math.PI / 2 },
    { pos: [-8, 0, 7], rotation: 0 },
    { pos: [-30, 0, 1], rotation: Math.PI / 3 },
    { pos: [-18, 0, 5], rotation: -Math.PI / 4 },
    { pos: [-26, 0, -5], rotation: Math.PI / 6 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoPositions(prev => prev.map(auto => ({
        ...auto,
        pos: [
          Math.max(-32, Math.min(-5, auto.pos[0] + (Math.random() - 0.5) * 0.8)),
          auto.pos[1],
          Math.max(-8, Math.min(8, auto.pos[2] + (Math.random() - 0.5) * 0.8))
        ] as [number, number, number]
      })));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLandmarkClick = (name: string) => {
    setSelectedLandmark(name);
    setTimeout(() => setSelectedLandmark(null), 2000);
  };

  return (
    <group>
      {/* LEFT SIDE - BENGALURU CITY */}
      <group>
        {/* Expanded City Background - Using full left side */}
        <mesh position={[-15, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[28, 18]} />
          <meshStandardMaterial color={isNight ? "#1A1A2E" : "#5A5A5A"} roughness={0.9} />
        </mesh>
        

        
        {/* Enhanced City Buildings with Realistic Lighting */}
        {Array.from({ length: 8 }).map((_, i) => {
          const x = -28 + i * 3.5;
          const z = -7 + (i % 2) * 2;
          const height = 1.5 + (i * 0.4) % 3;
          const buildingColors = ['#4A5568', '#2D3748', '#4A5D23', '#3182CE', '#805AD5', '#D69E2E', '#E53E3E', '#38B2AC'];
          return (
            <group key={`building-${i}`}>
              <mesh position={[x, height/2, z]}>
                <boxGeometry args={[1.5, height, 1.2]} />
                <meshStandardMaterial color={buildingColors[i]} metalness={0.3} roughness={0.7} />
              </mesh>
              
              {/* Building entrance light */}
              {isNight && (
                <pointLight 
                  position={[x, height * 0.3, z + 0.8]} 
                  color="#FFE4B5" 
                  intensity={0.6} 
                  distance={4} 
                />
              )}
              
              {/* Street lamp near each building */}
              <mesh position={[x + 1, 1.8, z + 2]}>
                <cylinderGeometry args={[0.05, 0.05, 3.6, 8]} />
                <meshStandardMaterial color="#444444" />
                <pointLight 
                  color={isNight ? "#FFE55C" : "#FFFFFF"} 
                  intensity={isNight ? 0.8 : 0.3} 
                  distance={6} 
                  position={[0, 1.5, 0]}
                />
              </mesh>
              {/* Building windows */}
              {Array.from({ length: Math.floor(height * 2) }).map((_, floor) => 
                Array.from({ length: 2 }).map((_, window) => (
                  <mesh 
                    key={`${floor}-${window}`} 
                    position={[x - 0.3 + window * 0.6, 0.2 + floor * 0.3, z + 0.51]}
                  >
                    <boxGeometry args={[0.2, 0.2, 0.02]} />
                    <meshStandardMaterial 
                      color={isNight && (i + floor + window) % 4 === 0 ? "#FFD700" : "#87CEEB"} 
                      transparent 
                      opacity={0.7}
                      emissive={isNight && (i + floor + window) % 4 === 0 ? "#FFD700" : "#000000"}
                      emissiveIntensity={isNight ? 0.3 : 0}
                    />
                  </mesh>
                ))
              )}
            </group>
          );
        })}
        
        {/* Bus Stops - Moved to sidewalks */}
        {[[-11, 0, 3.5], [-7, 0, -2.5]].map((pos, i) => (
          <group key={`bus-stop-${i}`} position={pos as [number, number, number]}>
            <mesh position={[0, 1.2, 0]}>
              <boxGeometry args={[0.05, 2.4, 0.8]} />
              <meshStandardMaterial color="#444444" />
            </mesh>
            <mesh position={[0.4, 1.8, 0]}>
              <boxGeometry args={[0.8, 0.05, 0.8]} />
              <meshStandardMaterial color="#444444" />
            </mesh>
            <mesh position={[0.2, 1.2, 0]}>
              <boxGeometry args={[0.4, 1, 0.02]} />
              <meshStandardMaterial color="#2E8B57" />
            </mesh>
          </group>
        ))}
        
        {/* City Fountains - Moved to plaza area */}
        <group position={[-5, 0, -1.5]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 0.6, 12]} />
            <meshStandardMaterial color="#4682B4" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 1, 8]} />
            <meshStandardMaterial color="#708090" roughness={0.5} />
          </mesh>
        </group>
        
        {/* Street Vendors - Moved to sidewalks */}
        {[[-12, 0, 1.5], [-6, 0, 3.5]].map((pos, i) => (
          <group key={`vendor-${i}`} position={pos as [number, number, number]}>
            <mesh position={[0, 0.4, 0]}>
              <boxGeometry args={[0.8, 0.8, 0.6]} />
              <meshStandardMaterial color={i === 0 ? "#FF6B6B" : "#4ECDC4"} roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.85, 0]}>
              <boxGeometry args={[1, 0.05, 0.8]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
          </group>
        ))}
        
        {/* FAR LEFT ADDITIONAL DISTRICTS - Using extreme corners */}
        <group onClick={() => handleLandmarkClick("Koramangala IT Hub")}>
          <mesh position={[-28, 0.6, -4]}>
            <boxGeometry args={[2, 1.2, 2]} />
            <meshStandardMaterial color="#4169E1" metalness={0.3} roughness={0.5} />
          </mesh>
          <mesh position={[-28, 1.3, -4]}>
            <boxGeometry args={[2.2, 0.2, 2.2]} />
            <meshStandardMaterial color="#191970" />
          </mesh>
        </group>
        
        <group onClick={() => handleLandmarkClick("Brigade Road")}>
          <mesh position={[-26, 0.5, 6]}>
            <boxGeometry args={[3, 1, 1.5]} />
            <meshStandardMaterial color="#FF6347" roughness={0.6} />
          </mesh>
          {/* Shopping arcade structure */}
          <mesh position={[-26, 1.2, 6]}>
            <boxGeometry args={[3.2, 0.4, 1.7]} />
            <meshStandardMaterial color="#8B0000" />
          </mesh>
        </group>
        
        <group onClick={() => handleLandmarkClick("Lalbagh Garden")}>
          <mesh position={[-25, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[2, 16]} />
            <meshStandardMaterial color="#9ACD32" roughness={0.9} />
          </mesh>
          {/* Garden trees */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 1.5;
            return (
              <group key={`lalbagh-tree-${i}`} position={[
                -25 + Math.cos(angle) * radius, 
                0, 
                0 + Math.sin(angle) * radius
              ]}>
                <mesh position={[0, 0.5, 0]}>
                  <cylinderGeometry args={[0.08, 0.1, 1, 8]} />
                  <meshStandardMaterial color="#8B4513" roughness={0.9} />
                </mesh>
                <mesh position={[0, 1.2, 0]}>
                  <sphereGeometry args={[0.35, 8, 8]} />
                  <meshStandardMaterial color={isNight ? "#2F4F2F" : "#228B22"} roughness={0.8} />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* Main City Landmarks - Expanded and well-spaced */}
        <group onClick={() => handleLandmarkClick("Vidhana Soudha")}>
          <VidhanaSoudha position={[-15, 0, -6]} />
        </group>
        
        <group onClick={() => handleLandmarkClick("UB City Mall")}>
          <UBCity position={[-22, 0, -3]} />
        </group>
        
        <group onClick={() => handleLandmarkClick("Bangalore Palace")}>
          <BangalorePalace position={[-8, 0, -4]} />
        </group>
        
        <group onClick={() => handleLandmarkClick("ISKCON Temple")}>
          <ISKCONTemple position={[-20, 0, 3]} />
        </group>
        
        <group onClick={() => handleLandmarkClick("Electronic City")}>
          <TechPark position={[-10, 0, 5]} />
        </group>
        
        <group onClick={() => handleLandmarkClick("BMS College")}>
          <BMSCollege position={[-24, 0, 6]} />
        </group>
        
        <group onClick={() => handleLandmarkClick("MG Road")}>
          <MGRoadShops position={[-12, 0, 7]} />
        </group>
        
        <group onClick={() => handleLandmarkClick("Namma Metro")}>
          <NammaMetro position={[-16, 0, -1]} />
        </group>
        
        {/* Auto Rickshaws */}
        {autoPositions.map((auto, i) => (
          <AutoRickshaw 
            key={i} 
            position={auto.pos as [number, number, number]} 
            rotation={auto.rotation}
          />
        ))}
        
        {/* Animated City Characters */}
        <Male3D position={[-20, 0, 2]} scale={0.6} rotationY={Math.PI / 3} walking />
        <Female3D position={[-12, 0, -5]} scale={0.6} rotationY={-Math.PI / 4} walking />
        <Male3D position={[-25, 0, -1]} scale={0.65} rotationY={Math.PI / 6} />
        
        {/* City Dogs roaming */}
        <PetDog3D position={[-18, 0, 1]} walkRadius={1.5} walkSpeed={0.3} />
        <PetDog3D position={[-22, 0, 4]} scale={0.8} walkRadius={1.2} walkSpeed={0.25} />
        
        {/* City Birds */}
        <Bird position={[-15, 6, -3]} color="#FFD93D" speed={1.2} />
        <Bird position={[-25, 7, 2]} color="#A084E8" speed={0.9} phase={1.5} />
        <Bird position={[-10, 5, 5]} color="#6BCB77" speed={1.1} phase={2} />
        
        {/* Traffic Signals - More for expanded area */}
        <TrafficSignal position={[-15, 0, 0]} />
        <TrafficSignal position={[-12, 0, 2]} />
        <TrafficSignal position={[-18, 0, -2]} />
        <TrafficSignal position={[-21, 0, 1]} />
        <TrafficSignal position={[-9, 0, -3]} />
        
        {/* Enhanced City Roads with Dividers - Expanded network */}
        <mesh position={[-15, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[18, 2]} />
          <meshStandardMaterial color="#2C3E50" roughness={0.9} />
        </mesh>
        <mesh position={[-15, -0.01, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[14, 2]} />
          <meshStandardMaterial color="#2C3E50" roughness={0.9} />
        </mesh>
        
        {/* Secondary roads */}
        <mesh position={[-15, -0.01, -4]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[16, 1.5]} />
          <meshStandardMaterial color="#34495E" roughness={0.9} />
        </mesh>
        <mesh position={[-15, -0.01, 4]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[16, 1.5]} />
          <meshStandardMaterial color="#34495E" roughness={0.9} />
        </mesh>
        
        {/* Road Dividers - Extended */}
        <mesh position={[-15, 0.01, 0]}>
          <boxGeometry args={[16, 0.02, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[-15, 0.01, 0]} rotation={[0, Math.PI/2, 0]}>
          <boxGeometry args={[12, 0.02, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        
        {/* City Billboards - Moved to building sides */}
        {[[-13, 2, -2.5], [-5, 2, 2.5]].map((pos, i) => (
          <group key={`billboard-${i}`} position={pos as [number, number, number]}>
            <mesh position={[0, -1, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 2, 8]} />
              <meshStandardMaterial color="#444444" />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2, 1, 0.1]} />
              <meshStandardMaterial 
                color={i === 0 ? "#FF4500" : "#32CD32"} 
                emissive={isNight ? (i === 0 ? "#FF4500" : "#32CD32") : "#000000"}
                emissiveIntensity={isNight ? 0.2 : 0}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* RIGHT SIDE - RAJAJINAGAR TOWN */}
      <group>
        {/* Expanded Town Background - Using full right side */}
        <mesh position={[18, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[24, 16]} />
          <meshStandardMaterial color={isNight ? "#0F2027" : "#4A5D23"} roughness={0.9} />
        </mesh>
        
        {/* Expanded Town Welcome Arch */}
        <group position={[18, 0, -6]}>
          <mesh position={[-2, 1.8, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 3.6, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[2, 1.8, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 3.6, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[0, 3.2, 0]}>
            <boxGeometry args={[4.5, 0.4, 0.15]} />
            <meshStandardMaterial color="#CD853F" />
          </mesh>
        </group>
        
        {/* FAR RIGHT ADDITIONAL TOWN DISTRICTS - Using extreme corners */}
        <group onClick={() => handleLandmarkClick("Rajajinagar Extension")}>
          <mesh position={[26, 0.5, -3]}>
            <boxGeometry args={[2.5, 1, 2]} />
            <meshStandardMaterial color="#DEB887" roughness={0.7} />
          </mesh>
          <mesh position={[26, 1.1, -3]}>
            <coneGeometry args={[1.3, 0.6, 8]} />
            <meshStandardMaterial color="#CD853F" />
          </mesh>
        </group>
        
        <group onClick={() => handleLandmarkClick("Traditional Market")}>
          <mesh position={[24, 0.4, 5]}>
            <boxGeometry args={[3, 0.8, 2]} />
            <meshStandardMaterial color="#F0E68C" roughness={0.8} />
          </mesh>
          {/* Market stalls */}
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh key={`stall-${i}`} position={[24 + (i-1) * 0.8, 0.2, 6]}>
              <boxGeometry args={[0.6, 0.4, 0.5]} />
              <meshStandardMaterial color={["#FFB6C1", "#98FB98", "#DDA0DD"][i]} />
            </mesh>
          ))}
        </group>
        
        <group onClick={() => handleLandmarkClick("Village Grove")}>
          <mesh position={[28, 0.02, 2]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.8, 12]} />
            <meshStandardMaterial color="#8FBC8F" roughness={0.9} />
          </mesh>
          {/* Grove trees */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 1.3;
            return (
              <group key={`grove-tree-${i}`} position={[
                28 + Math.cos(angle) * radius, 
                0, 
                2 + Math.sin(angle) * radius
              ]}>
                <mesh position={[0, 0.4, 0]}>
                  <cylinderGeometry args={[0.06, 0.08, 0.8, 8]} />
                  <meshStandardMaterial color="#8B4513" roughness={0.9} />
                </mesh>
                <mesh position={[0, 1, 0]}>
                  <sphereGeometry args={[0.3, 8, 8]} />
                  <meshStandardMaterial color={isNight ? "#2F4F2F" : "#228B22"} roughness={0.8} />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* Multiple Town Temples */}
        <group onClick={() => handleLandmarkClick("Main Temple")}>
          <mesh position={[15, 0.8, -3]}>
            <boxGeometry args={[2, 1.6, 1.5]} />
            <meshStandardMaterial color="#FFE4B5" roughness={0.6} />
          </mesh>
          <mesh position={[15, 1.8, -3]}>
            <coneGeometry args={[1, 0.8, 8]} />
            <meshStandardMaterial color="#DAA520" metalness={0.4} roughness={0.3} />
          </mesh>
        </group>
        
        <group onClick={() => handleLandmarkClick("Community Temple")}>
          <mesh position={[21, 0.6, 2]}>
            <boxGeometry args={[1.5, 1.2, 1.2]} />
            <meshStandardMaterial color="#FFE4B5" roughness={0.6} />
          </mesh>
          <mesh position={[21, 1.4, 2]}>
            <coneGeometry args={[0.8, 0.6, 8]} />
            <meshStandardMaterial color="#DAA520" metalness={0.4} roughness={0.3} />
          </mesh>
        </group>
        
        {/* Local Shops - Moved away from main road */}
        {Array.from({ length: 4 }).map((_, i) => {
          const x = 7 + i * 1.2;
          const z = 3.5; // Moved further from road
          const colors = ["#F4A460", "#98FB98", "#DDA0DD", "#87CEEB"];
          return (
            <group key={`shop-${i}`} position={[x, 0, z]}>
              <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[1, 0.8, 0.8]} />
                <meshStandardMaterial color={colors[i]} roughness={0.7} />
              </mesh>
              {/* Shop awning */}
              <mesh position={[0, 0.9, 0.5]}>
                <boxGeometry args={[1.1, 0.05, 0.3]} />
                <meshStandardMaterial color="#FF6B6B" roughness={0.8} />
              </mesh>
              {/* Shop sign */}
              <mesh position={[0, 0.6, 0.41]}>
                <boxGeometry args={[0.8, 0.2, 0.02]} />
                <meshStandardMaterial color="#2C3E50" />
              </mesh>
            </group>
          );
        })}
        
        {/* Enhanced Community Fountain (replacing well) */}
        <group position={[14, 0, 2]}>
          <Fountain3D scale={0.8} />
        </group>
        
        {/* Traditional Town Well */}
        <group position={[20, 0, 4]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.6, 12]} />
            <meshStandardMaterial color="#708090" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <torusGeometry args={[0.7, 0.05, 8, 12]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
          {/* Well lighting */}
          {isNight && (
            <pointLight position={[0, 1.2, 0]} color="#FFA500" intensity={0.4} distance={3} />
          )}
        </group>
        
        {/* Town Square - Small central area */}
        <group position={[9, 0, 2]}>
          <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.8, 8]} />
            <meshStandardMaterial color="#D2B48C" roughness={0.9} />
          </mesh>
          {/* Simple flower pots around square */}
          {Array.from({ length: 4 }).map((_, i) => {
            const angle = (i / 4) * Math.PI * 2;
            const radius = 0.6;
            return (
              <group key={`pot-${i}`} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
                <mesh position={[0, 0.1, 0]}>
                  <cylinderGeometry args={[0.1, 0.08, 0.2, 8]} />
                  <meshStandardMaterial color="#8B4513" roughness={0.8} />
                </mesh>
                <mesh position={[0, 0.25, 0]}>
                  <sphereGeometry args={[0.06, 6, 6]} />
                  <meshStandardMaterial color={["#FF69B4", "#FF1493", "#FFD700", "#FF4500"][i]} />
                </mesh>
              </group>
            );
          })}
        </group>
        
        {/* Street Food Cart - Moved to side area */}
        <group position={[11, 0, -2.5]}>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[1.2, 0.8, 0.8]} />
            <meshStandardMaterial color="#FFD700" roughness={0.7} />
          </mesh>
          {/* Cart wheels */}
          <mesh position={[-0.4, 0.1, 0.5]}>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[0.4, 0.1, 0.5]}>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* Umbrella */}
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[1, 1, 0.1, 8]} />
            <meshStandardMaterial color="#FF6B6B" />
          </mesh>
        </group>
        
        {/* Town Trees - Scattered */}
        {[
          [6, 0, 1], [12, 0, -2], [7, 0, 4], [11, 0, 4], [5, 0, -4]
        ].map((pos, i) => (
          <group key={`town-tree-${i}`} position={pos as [number, number, number]}>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
              <meshStandardMaterial color="#8B4513" roughness={0.9} />
            </mesh>
            <mesh position={[0, 1, 0]}>
              <sphereGeometry args={[0.3, 8, 8]} />
              <meshStandardMaterial color={isNight ? "#2F4F2F" : "#228B22"} roughness={0.8} />
            </mesh>
          </group>
        ))}
        
        {/* Enhanced Traditional Lampposts with Realistic Lighting */}
        {[[10, 0, 1], [15, 0, 0], [22, 0, 2], [26, 0, -1]].map((pos, i) => (
          <group key={`lamppost-${i}`} position={pos as [number, number, number]}>
            <mesh position={[0, 1, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 2, 8]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
            <mesh position={[0, 2.4, 0]}>
              <sphereGeometry args={[0.18, 8, 8]} />
              <meshStandardMaterial 
                color="#FFE55C" 
                emissive={isNight ? "#FFE55C" : "#000000"}
                emissiveIntensity={isNight ? 0.7 : 0}
              />
            </mesh>
            {/* Realistic street light illumination */}
            {isNight && (
              <pointLight 
                position={[0, 2.4, 0]} 
                color="#FFE55C" 
                intensity={1.2} 
                distance={8} 
              />
            )}
          </group>
        ))}
        
        {/* Town Characters and Life */}
        <Female3D position={[15, 0, 3]} scale={0.55} rotationY={Math.PI / 2} />
        <Male3D position={[20, 0, -2]} scale={0.6} rotationY={-Math.PI / 3} walking />
        
        {/* Town Dogs */}
        <PetDog3D position={[12, 0, 2]} walkRadius={1} walkSpeed={0.2} scale={0.9} />
        
        {/* Town Birds */}
        <Bird position={[18, 4, 1]} color="#32CD32" speed={0.8} />
        <Bird position={[24, 5, -3]} color="#FF69B4" speed={1.0} phase={1} />
        
        {/* Town Butterflies */}
        <Butterfly position={[16, 2.5, 4]} color="#FFB6E1" speed={1.1} />
        <Butterfly position={[22, 2.2, 1]} color="#FFD93D" speed={0.9} phase={2} />
        
        {/* Main Rajajinagar Residential Area - Repositioned */}
        <group onClick={() => handleLandmarkClick("Rajajinagar")}>
          <Rajajinagar position={[18, 0, 0]} />
        </group>
        
        {/* Expanded town roads with better markings */}
        <mesh position={[18, -0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[16, 1.5]} />
          <meshStandardMaterial color="#708090" roughness={0.9} />
        </mesh>
        <mesh position={[18, -0.005, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[12, 1.5]} />
          <meshStandardMaterial color="#708090" roughness={0.9} />
        </mesh>
        
        {/* Town road center lines - Extended */}
        <mesh position={[18, 0.001, 0]}>
          <boxGeometry args={[14, 0.01, 0.08]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[18, 0.001, 0]} rotation={[0, Math.PI/2, 0]}>
          <boxGeometry args={[10, 0.01, 0.08]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>
      
      {/* DECORATIVE ELEMENTS TO FILL MAXIMUM SPACE */}
      
      {/* Far Left Corner Features */}
      <group position={[-29, 0, -7]}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[2, 1, 1.5]} />
          <meshStandardMaterial color="#4682B4" roughness={0.6} />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[2.2, 0.2, 1.7]} />
          <meshStandardMaterial color="#36648B" />
        </mesh>
      </group>
      
      {/* Far Right Corner Features */}
      <group position={[29, 0, -6]}>
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.8, 0.8, 1.2]} />
          <meshStandardMaterial color="#F4A460" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.9, 0]}>
          <coneGeometry args={[0.9, 0.5, 8]} />
          <meshStandardMaterial color="#DEB887" />
        </mesh>
      </group>
      
      {/* Additional Corner Gardens */}
      <group position={[-30, 0, 8]}>
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.5, 10]} />
          <meshStandardMaterial color="#98FB98" roughness={0.9} />
        </mesh>
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2;
          const radius = 1;
          return (
            <group key={`corner-plant-${i}`} position={[
              Math.cos(angle) * radius, 
              0, 
              Math.sin(angle) * radius
            ]}>
              <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.6, 6]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              <mesh position={[0, 0.7, 0]}>
                <sphereGeometry args={[0.2, 6, 6]} />
                <meshStandardMaterial color="#32CD32" />
              </mesh>
            </group>
          );
        })}
      </group>
      
      <group position={[30, 0, 7]}>
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.2, 8]} />
          <meshStandardMaterial color="#90EE90" roughness={0.9} />
        </mesh>
        {Array.from({ length: 3 }).map((_, i) => {
          const angle = (i / 3) * Math.PI * 2;
          const radius = 0.8;
          return (
            <group key={`corner-flower-${i}`} position={[
              Math.cos(angle) * radius, 
              0, 
              Math.sin(angle) * radius
            ]}>
              <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.3, 6]} />
                <meshStandardMaterial color="#228B22" />
              </mesh>
              <mesh position={[0, 0.35, 0]}>
                <sphereGeometry args={[0.1, 6, 6]} />
                <meshStandardMaterial color={["#FF69B4", "#FF1493", "#FFD700"][i]} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* PARKS OUTSIDE CITY AND TOWN AREAS */}
      
      {/* Cubbon Park - Far North of City */}
      <group onClick={() => handleLandmarkClick("Cubbon Park")}>
        <mesh position={[-9, 0.02, -12]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[3, 20]} />
          <meshStandardMaterial color="#90EE90" roughness={0.9} />
        </mesh>
        {/* Park Trees - Larger and more visible */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 2.5;
          return (
            <group key={`park-tree-${i}`} position={[
              -9 + Math.cos(angle) * radius, 
              0, 
              -12 + Math.sin(angle) * radius
            ]}>
              <mesh position={[0, 0.6, 0]}>
                <cylinderGeometry args={[0.12, 0.15, 1.2, 8]} />
                <meshStandardMaterial color="#8B4513" roughness={0.9} />
              </mesh>
              <mesh position={[0, 1.5, 0]}>
                <sphereGeometry args={[0.5, 12, 12]} />
                <meshStandardMaterial color={isNight ? "#2F4F2F" : "#228B22"} roughness={0.8} />
              </mesh>
              {/* Additional foliage layers for fuller trees */}
              <mesh position={[0, 1.2, 0]}>
                <sphereGeometry args={[0.45, 10, 10]} />
                <meshStandardMaterial color={isNight ? "#1E3A1E" : "#32CD32"} roughness={0.8} />
              </mesh>
              <mesh position={[0, 1.8, 0]}>
                <sphereGeometry args={[0.35, 8, 8]} />
                <meshStandardMaterial color={isNight ? "#0F2A0F" : "#228B22"} roughness={0.8} />
              </mesh>
            </group>
          );
        })}
        {/* Park pathway */}
        <mesh position={[-9, 0.01, -12]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.5, 12]} />
          <meshStandardMaterial color="#D2B48C" roughness={0.9} />
        </mesh>
      </group>
      
      {/* Nature Reserve - South of Town */}
      <group onClick={() => handleLandmarkClick("Nature Reserve")}>
        <mesh position={[9, 0.02, 7]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.5, 16]} />
          <meshStandardMaterial color="#90EE90" roughness={0.9} />
        </mesh>
        {/* Nature trees - More natural scattered placement */}
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * Math.PI * 2 + (i * 0.5); // Slightly offset for natural look
          const radius = 1.2 + (i % 3) * 0.4; // Varying distances
          return (
            <group key={`nature-tree-${i}`} position={[
              9 + Math.cos(angle) * radius, 
              0, 
              7 + Math.sin(angle) * radius
            ]}>
              <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.1, 0.12, 1, 8]} />
                <meshStandardMaterial color="#8B4513" roughness={0.9} />
              </mesh>
              <mesh position={[0, 1.3, 0]}>
                <sphereGeometry args={[0.4, 10, 10]} />
                <meshStandardMaterial color={isNight ? "#2F4F2F" : "#228B22"} roughness={0.8} />
              </mesh>
              <mesh position={[0, 1.1, 0]}>
                <sphereGeometry args={[0.35, 8, 8]} />
                <meshStandardMaterial color={isNight ? "#1E3A1E" : "#32CD32"} roughness={0.8} />
              </mesh>
            </group>
          );
        })}
      </group>
      
      {/* Roadside Trees - Along connecting road */}
      {Array.from({ length: 8 }).map((_, i) => {
        const x = -3 + i * 0.8;
        const z = i % 2 === 0 ? 2 : -2;
        return (
          <group key={`roadside-tree-${i}`} position={[x, 0, z]}>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.08, 0.1, 0.8, 8]} />
              <meshStandardMaterial color="#8B4513" roughness={0.9} />
            </mesh>
            <mesh position={[0, 1, 0]}>
              <sphereGeometry args={[0.3, 8, 8]} />
              <meshStandardMaterial color={isNight ? "#2F4F2F" : "#228B22"} roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.8, 0]}>
              <sphereGeometry args={[0.25, 6, 6]} />
              <meshStandardMaterial color={isNight ? "#1E3A1E" : "#32CD32"} roughness={0.8} />
            </mesh>
          </group>
        );
      })}
      
      {/* EXPANDED connecting road between city and town - Wider for maximum space usage */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 2]} />
        <meshStandardMaterial color="#556B2F" roughness={0.9} />
      </mesh>
      
      {/* Center road divider line */}
      <mesh position={[0, 0.001, 0]}>
        <boxGeometry args={[10, 0.01, 0.1]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Enhanced Atmospheric Effects */}
      <Particles count={isNight ? 100 : 60} />
      
      {/* Night fireflies in parks */}
      {isNight && (
        <>
          {/* Fireflies in Cubbon Park */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const radius = 2 + Math.random() * 1.5;
            const y = 1.5 + Math.random() * 1.5;
            return (
              <mesh key={`firefly-park-${i}`} position={[
                -9 + Math.cos(angle) * radius,
                y,
                -12 + Math.sin(angle) * radius
              ]}>
                <sphereGeometry args={[0.03, 6, 6]} />
                <meshStandardMaterial 
                  color="#B6FF00" 
                  emissive="#B6FF00" 
                  emissiveIntensity={0.8 + Math.random() * 0.3}
                  transparent 
                  opacity={0.9} 
                />
              </mesh>
            );
          })}
          
          {/* Far Left City District Lights */}
          {Array.from({ length: 4 }).map((_, i) => (
            <pointLight 
              key={`far-left-${i}`}
              position={[-26 + i * 2, 3, -2 + (i % 2) * 4]} 
              color="#FFE55C" 
              intensity={0.8} 
              distance={8} 
            />
          ))}
          
          {/* Far Right Town District Lights */}
          {Array.from({ length: 4 }).map((_, i) => (
            <pointLight 
              key={`far-right-${i}`}
              position={[25 + i * 2, 2.5, -1 + (i % 2) * 3]} 
              color="#FFA500" 
              intensity={0.6} 
              distance={6} 
            />
          ))}
          
          {/* City lights - More comprehensive */}
          {Array.from({ length: 8 }).map((_, i) => {
            const x = -18 + i * 2.5;
            const z = i % 2 === 0 ? 1 : -1;
            return (
              <group key={`city-light-${i}`}>
                <mesh position={[x, 1.8, z]}>
                  <cylinderGeometry args={[0.04, 0.04, 3.6, 8]} />
                  <meshStandardMaterial color="#444444" />
                </mesh>
                <pointLight 
                  position={[x, 3.6, z]} 
                  intensity={0.5} 
                  color="#FFE55C" 
                  distance={5} 
                />
                <mesh position={[x, 3.6, z]}>
                  <sphereGeometry args={[0.08, 8, 8]} />
                  <meshStandardMaterial 
                    color="#FFE55C" 
                    emissive="#FFE55C" 
                    emissiveIntensity={0.8}
                  />
                </mesh>
              </group>
            );
          })}
          

          
          {/* Town lights - Traditional style */}
          {Array.from({ length: 4 }).map((_, i) => {
            const positions = [[7, 2], [11, 2], [9, -3], [9, 4]];
            const [x, z] = positions[i];
            return (
              <group key={`town-light-${i}`}>
                <pointLight 
                  position={[x, 2.5, z]} 
                  intensity={0.4} 
                  color="#FFE55C" 
                  distance={4} 
                />
              </group>
            );
          })}
        </>
      )}
      
      {/* Landmark Information Display */}
      {selectedLandmark && (
        <Html position={[0, 4, 0]} center>
          <div style={{
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            border: '2px solid #FF6B6B'
          }}>
            📍 {selectedLandmark}
            <br />
            <span style={{ fontSize: '12px', fontWeight: 'normal' }}>
              {getLandmarkInfo(selectedLandmark)}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}

// Helper function for landmark information
function getLandmarkInfo(landmark: string): string {
  const info: { [key: string]: string } = {
    "Vidhana Soudha": "Karnataka State Legislature Building",
    "UB City Mall": "Luxury Shopping & Business District", 
    "Bangalore Palace": "Tudor-style Architecture Palace",
    "ISKCON Temple": "Beautiful Krishna Temple",
    "Electronic City": "Major IT Hub of Bangalore",
    "BMS College": "Bangalore Medical College",
    "MG Road": "Shopping & Commercial Street",
    "Namma Metro": "Bangalore's Metro Rail System",
    "Cubbon Park": "300-Acre Green Lung with 6000+ Trees",
    "Nature Reserve": "Protected Natural Area",
    "Rajajinagar": "Residential Town Area",
    "Main Temple": "Primary Town Temple",
    "Community Temple": "Local Worship Center",
    "Koramangala IT Hub": "Tech District",
    "Brigade Road": "Shopping Street",
    "Lalbagh Garden": "Historic Botanical Garden"
  };
  
  return info[landmark] || "Welcome to Namma Bengaluru!";
}