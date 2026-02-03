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
  TrafficSignal,
  BMSCollege,
  Rajajinagar
} from './BangaloreLandmarks';
import BMTCBus from './vehicles/BMTCBus';
import TwoWheeler from './vehicles/TwoWheeler';
import ModernITPark from './buildings/ModernITPark';
import ShoppingMall from './buildings/ShoppingMall';
import StreetFoodStall from './food/StreetFoodStall';
import WeatherSystem, { useWeatherSystem } from './weather/WeatherSystem';
import BusStop from './transportation/BusStop';
import ResidentialApartment from './buildings/ResidentialApartment';
import Playground from './recreation/Playground';
import TrafficSystem from './infrastructure/TrafficSystem';
import GovernmentOffice from './buildings/GovernmentOffice';
import CommunityHall from './buildings/CommunityHall';
import BankingServices from './services/BankingServices';
import AutoRickshawStand from './transportation/AutoRickshawStand';
import BDALayout from './buildings/BDALayout';
import KiranaStore from './buildings/KiranaStore';
import GardenPark from './nature/GardenPark';
import Temple from './buildings/Temple';
import Male3D from './Male3D';
import Female3D from './Female3D';
import PetDog3D from './PetDog3D';
import { Bird, Butterfly } from './BirdButterfly3D';
import Fountain3D from './Fountain3D';
import Particles from './Particles';

// Simple City Trees - Static components for better performance
function SimpleTree({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const treeRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (treeRef.current) {
      treeRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5 + position[0]) * 0.03;
    }
  });

  return (
    <group ref={treeRef} position={position}>
      {/* Tree trunk */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.8, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>
      
      {/* Tree crown */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#228B22" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Parked Bike Component for decoration
function ParkedBike({ position = [0, 0, 0], rotationY = 0, color = "#FF6B35" }: { 
  position?: [number, number, number]; 
  rotationY?: number;
  color?: string;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Bike frame */}
      <group>
        {/* Main frame */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0.3, 0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[-0.3, 0.3, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
        </mesh>
      </group>
      
      {/* Wheels */}
      <mesh position={[0.4, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.8} />
      </mesh>
      <mesh position={[-0.4, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.8} />
      </mesh>
      
      {/* Seat */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.15, 0.05, 0.08]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>
      
      {/* Handlebars */}
      <mesh position={[0.35, 0.6, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
        <meshStandardMaterial color="#34495E" roughness={0.4} />
      </mesh>
      <mesh position={[0.35, 0.6, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
        <meshStandardMaterial color="#34495E" roughness={0.4} />
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
      
      {/* Decorative Street Elements instead of simple train */}
      {/* Street Lights */}
      <mesh position={[1, 1.8, 1]}>
        <cylinderGeometry args={[0.05, 0.05, 1.8, 6]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      <mesh position={[1, 2.5, 1]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#F1C40F" emissive="#F1C40F" emissiveIntensity={0.3} />
      </mesh>
      
      {/* City Benches */}
      <mesh position={[-1, 0.2, 1.2]}>
        <boxGeometry args={[0.8, 0.4, 0.3]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      
      {/* Decorative Planters */}
      <mesh position={[2, 0.3, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.6, 8]} />
        <meshStandardMaterial color="#CD853F" />
      </mesh>
      <mesh position={[2, 0.7, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
}

// Bangalore Cityscape Component
export default function BangaloreCityscape() {
  const { isNight } = useTheme();
  const [selectedLandmark, setSelectedLandmark] = useState<string | null>(null);
  const { weather, autoWeather, changeWeather, enableAutoWeather } = useWeatherSystem();
  
  // Decorative city elements - Static beautiful elements instead of moving symbols
  const decorativeCityElements = [
    { pos: [-16, 0, 0.5], type: 'lamp', color: '#F1C40F' },
    { pos: [-11, 0, -3], type: 'flowerbed', color: '#E74C3C' },
    { pos: [-21, 0, -1], type: 'sculpture', color: '#95A5A6' },
    { pos: [-7, 0, 1], type: 'lamp', color: '#F39C12' },
    { pos: [-29, 0, 0.5], type: 'flowerbed', color: '#8E44AD' },
    { pos: [-13, 0, 3], type: 'sculpture', color: '#34495E' },
    { pos: [-25, 0, -4], type: 'lamp', color: '#E67E22' },
  ];



  const handleLandmarkClick = (name: string) => {
    setSelectedLandmark(name);
    setTimeout(() => setSelectedLandmark(null), 2000);
  };

  return (
    <group>
      {/* LEFT SIDE - BENGALURU CITY - Expanded and cleaner layout */}
      <group>
        {/* Expanded City Background - Using full left side with more space */}
        <mesh position={[-20, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[40, 25]} />
          <meshStandardMaterial color={isNight ? "#1A1A2E" : "#5A5A5A"} roughness={0.9} />
        </mesh>
        

        
        {/* Enhanced City Buildings with Better Spacing */}
        {Array.from({ length: 6 }).map((_, i) => {
          const x = -35 + i * 6;
          const z = -8 + (i % 3) * 5;
          const height = 2 + (i * 0.5) % 4;
          const buildingColors = ['#4A5568', '#2D3748', '#4A5D23', '#3182CE', '#805AD5', '#D69E2E'];
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
        
        {/* Simple City Trees - Static for better performance */}
        <SimpleTree position={[-8, 0, 9]} />
        <SimpleTree position={[18, 0, 5]} />
        <SimpleTree position={[-35, 0, -8]} />
        
        {/* Additional City Trees */}
        <SimpleTree position={[-10, 0, -1]} />
        <SimpleTree position={[-18, 0, -6]} />
        <SimpleTree position={[-28, 0, -3]} />
        <SimpleTree position={[-5, 0, 7]} />
        <SimpleTree position={[-21, 0, 6]} />
        <SimpleTree position={[-15, 0, 3]} />
        <SimpleTree position={[-32, 0, 1]} />
        
        {/* Rajajinagar Simple Trees */}
        <SimpleTree position={[15, 0, -2]} />
        <SimpleTree position={[25, 0, -1]} />
        <SimpleTree position={[32, 0, 0]} />
        <SimpleTree position={[20, 0, 3]} />
        
        {/* Additional Simple Trees for coverage */}
        <SimpleTree position={[-8, 0, 9]} />
        <SimpleTree position={[18, 0, 5]} />
        <SimpleTree position={[-22, 0, 2]} />
        <SimpleTree position={[-27, 0, -1]} />
        
        {/* Decorative Street Lights */}
        <group>
          {[[-5, 0, 2], [-15, 0, 4], [-25, 0, -1], [-3, 0, -4], [-8, 0, 1]].map((pos, i) => (
            <group key={`street-light-${i}`} position={pos as [number, number, number]}>
              <mesh position={[0, 1.8, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 3.6, 8]} />
                <meshStandardMaterial color="#2C3E50" roughness={0.7} />
              </mesh>
              <mesh position={[0, 3.2, 0]}>
                <sphereGeometry args={[0.25, 12, 12]} />
                <meshStandardMaterial 
                  color={isNight ? "#FFA500" : "#F4F4F4"} 
                  emissive={isNight ? "#FFA500" : "#000000"} 
                  emissiveIntensity={isNight ? 0.6 : 0} 
                />
              </mesh>
            </group>
          ))}
        </group>
        
        {/* City Benches and Seating Areas */}
        <group>
          {[[-6, 0, 3], [-12, 0, -2], [-20, 0, 3], [-28, 0, -2]].map((pos, i) => (
            <group key={`bench-${i}`} position={pos as [number, number, number]}>
              <mesh position={[0, 0.25, 0]}>
                <boxGeometry args={[1.2, 0.5, 0.4]} />
                <meshStandardMaterial color="#8B4513" roughness={0.9} />
              </mesh>
              <mesh position={[0, 0.45, -0.15]}>
                <boxGeometry args={[1.2, 0.1, 0.1]} />
                <meshStandardMaterial color="#8B4513" roughness={0.9} />
              </mesh>
            </group>
          ))}
        </group>
        
        {/* Decorative Urban Planters */}
        <group>
          {[[-9, 0, 0], [-16, 0, -3], [-23, 0, 1], [-31, 0, -1]].map((pos, i) => (
            <group key={`planter-${i}`} position={pos as [number, number, number]}>
              <mesh position={[0, 0.4, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 0.8, 12]} />
                <meshStandardMaterial color="#CD853F" roughness={0.8} />
              </mesh>
              <mesh position={[0, 0.9, 0]}>
                <sphereGeometry args={[0.3, 8, 8]} />
                <meshStandardMaterial color="#228B22" roughness={0.7} />
              </mesh>
            </group>
          ))}
        </group>
        
        {/* Bikes parked near planters */}
        <ParkedBike position={[-8.5, 0, 0.8]} rotationY={Math.PI / 4} color="#FF6B35" />
        <ParkedBike position={[-15.5, 0, -2.2]} rotationY={-Math.PI / 3} color="#4ECDC4" />
        <ParkedBike position={[-22.5, 0, 1.8]} rotationY={Math.PI / 6} color="#45B7D1" />
        <ParkedBike position={[-30.5, 0, -0.2]} rotationY={Math.PI / 2} color="#96CEB4" />
        
        {/* City Information Boards */}
        <group>
          {[[-7, 0, -0.5], [-14, 0, 2], [-26, 0, 0]].map((pos, i) => (
            <group key={`info-board-${i}`} position={pos as [number, number, number]}>
              <mesh position={[0, 1.2, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 2.4, 8]} />
                <meshStandardMaterial color="#34495E" />
              </mesh>
              <mesh position={[0, 1.8, 0]}>
                <boxGeometry args={[0.8, 1.2, 0.05]} />
                <meshStandardMaterial color="#3498DB" roughness={0.3} />
              </mesh>
            </group>
          ))}
        </group>
        
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
        
        {/* Street Food Culture - Authentic Bangalore Food Stalls - Repositioned */}
        <StreetFoodStall position={[-13, 0, 8]} type="dosa" scale={0.7} />
        <StreetFoodStall position={[-31, 0, 2]} type="chaat" scale={0.7} />
        <StreetFoodStall position={[-7, 0, 6]} type="coffee" scale={0.7} />
        <StreetFoodStall position={[-31, 0, -5]} type="juice" scale={0.7} />
        <StreetFoodStall position={[-5, 0, -7]} type="idli" scale={0.7} />
        
        {/* FAR LEFT ADDITIONAL DISTRICTS - Using extreme corners */}
        <group onClick={() => handleLandmarkClick("Koramangala IT Hub")}>
          <ModernITPark position={[-32, 0, -6]} name="Koramangala IT Hub" scale={0.6} />
        </group>
        
        {/* BDA residential areas near IT hubs - Separated */}
        <BDALayout position={[-32, 0, -2]} type="B" phase={4} occupancy="full" scale={0.5} />
        <BDALayout position={[-32, 0, 3]} type="A" phase={6} occupancy="partial" scale={0.5} />
        
        {/* Neighborhood Kirana stores for IT area residents - Repositioned */}
        <KiranaStore position={[-30, 0, -8]} storeName="Techie General Store" type="general" scale={0.5} />
        <KiranaStore position={[-30, 0, 1]} storeName="IT Park Medical" type="medical" bustling scale={0.5} />
        
        <group onClick={() => handleLandmarkClick("Brigade Road")}>
          <ShoppingMall position={[-26, 0, 6]} name="Brigade Road Shopping" type="forum" scale={0.7} />
        </group>
        
        <group onClick={() => handleLandmarkClick("Lalbagh Garden")}>
          <GardenPark position={[-25, 0, 0]} type="lalbagh" name="Lalbagh Botanical Garden" size={2} scale={1} />
        </group>
        
        {/* Parked Bikes near Lalbagh Garden for attraction */}
        <ParkedBike position={[-23, 0, -2]} rotationY={Math.PI / 4} color="#E74C3C" />
        <ParkedBike position={[-24, 0, -1.5]} rotationY={Math.PI / 6} color="#3498DB" />
        <ParkedBike position={[-22.5, 0, -2.2]} rotationY={-Math.PI / 3} color="#F39C12" />
        <ParkedBike position={[-26, 0, 1]} rotationY={Math.PI / 2} color="#9B59B6" />
        <ParkedBike position={[-27, 0, 0.5]} rotationY={-Math.PI / 4} color="#E67E22" />

        {/* Main City Landmarks - Expanded and well-spaced - No overlaps */}
        <group onClick={() => handleLandmarkClick("Vidhana Soudha")}>
          <VidhanaSoudha position={[-15, 0, -8]} />
        </group>
        
        <group onClick={() => handleLandmarkClick("UB City Mall")}>
          <UBCity position={[-25, 0, -3]} />
        </group>
        
        <group onClick={() => handleLandmarkClick("Bangalore Palace")}>
          <BangalorePalace position={[-8, 0, -2]} />
        </group>
        
        <group onClick={() => handleLandmarkClick("ISKCON Temple")}>
          <ISKCONTemple position={[-18, 0, 5]} />
        </group>
        
        <group onClick={() => handleLandmarkClick("Electronic City")}>
          <ModernITPark position={[-6, 0, 3]} name="Electronic City" scale={0.8} />
        </group>
        
        <group onClick={() => handleLandmarkClick("Manyata Tech Park")}>
          <ModernITPark position={[-28, 0, 2]} name="Manyata Tech Park" scale={0.7} />
        </group>
        
        <group onClick={() => handleLandmarkClick("BMS College")}>
          <BMSCollege position={[-22, 0, 8]} />
        </group>
        
        <group onClick={() => handleLandmarkClick("Forum Mall")}>
          <ShoppingMall position={[-12, 0, 7]} name="Forum Mall" type="forum" scale={0.7} />
        </group>
        
        <group onClick={() => handleLandmarkClick("Phoenix Marketcity")}>
          <ShoppingMall position={[-20, 0, -8]} name="Phoenix Marketcity" type="phoenix" scale={0.8} />
        </group>
        
        <group onClick={() => handleLandmarkClick("MG Road")}>
          <MGRoadShops position={[-10, 0, 5]} />
        </group>
        
        <group onClick={() => handleLandmarkClick("Namma Metro")}>
          <NammaMetro position={[-14, 0, 0]} />
        </group>
        
        {/* Decorative City Elements instead of vehicle symbols */}
        {decorativeCityElements.map((element, i) => (
          <group key={`city-element-${i}`} position={element.pos as [number, number, number]}>
            {element.type === 'lamp' && (
              <>
                <mesh position={[0, 1.5, 0]}>
                  <cylinderGeometry args={[0.06, 0.06, 3, 8]} />
                  <meshStandardMaterial color="#2C3E50" />
                </mesh>
                <mesh position={[0, 2.8, 0]}>
                  <sphereGeometry args={[0.2, 12, 12]} />
                  <meshStandardMaterial 
                    color={element.color} 
                    emissive={element.color} 
                    emissiveIntensity={isNight ? 0.5 : 0.1} 
                  />
                </mesh>
              </>
            )}
            {element.type === 'flowerbed' && (
              <>
                <mesh position={[0, 0.1, 0]}>
                  <cylinderGeometry args={[0.4, 0.4, 0.2, 8]} />
                  <meshStandardMaterial color="#8B4513" />
                </mesh>
                <mesh position={[0, 0.3, 0]}>
                  <sphereGeometry args={[0.3, 8, 8]} />
                  <meshStandardMaterial color={element.color} />
                </mesh>
              </>
            )}
            {element.type === 'sculpture' && (
              <>
                <mesh position={[0, 0.5, 0]}>
                  <boxGeometry args={[0.3, 1, 0.3]} />
                  <meshStandardMaterial color={element.color} metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh position={[0, 1.2, 0]}>
                  <sphereGeometry args={[0.2, 12, 12]} />
                  <meshStandardMaterial color={element.color} metalness={0.6} roughness={0.3} />
                </mesh>
              </>
            )}
          </group>
        ))}
        
        {/* BMTC City Buses - Realistic Bangalore Transport - On clear roads */}
        <BMTCBus position={[-4, 0, -0.5]} rotationY={Math.PI / 2} scale={0.7} moving />
        <BMTCBus position={[-1, 0, -8]} rotationY={0} scale={0.7} />
        <BMTCBus position={[-35, 0, -2]} rotationY={-Math.PI / 4} scale={0.7} moving />
        
        {/* Two-wheelers scattered realistically - On roads, not overlapping */}
        <TwoWheeler position={[-11, 0, 1]} rotationY={Math.PI / 3} type="scooter" scale={0.8} />
        <TwoWheeler position={[-17, 0, -2]} rotationY={-Math.PI / 6} type="motorcycle" scale={0.8} />
        <TwoWheeler position={[-5, 0, -3]} rotationY={Math.PI / 2} type="scooter" scale={0.8} />
        <TwoWheeler position={[-29, 0, 1]} rotationY={0} type="motorcycle" scale={0.8} />
        <TwoWheeler position={[-7, 0, 2]} rotationY={Math.PI / 4} type="scooter" scale={0.8} />
        
        {/* Animated City Characters - On sidewalks, not overlapping */}
        <Male3D position={[-21, 0, -0.5]} scale={0.6} rotationY={Math.PI / 3} walking />
        <Female3D position={[-8, 0, -7]} scale={0.6} rotationY={-Math.PI / 4} walking />
        <Male3D position={[-27, 0, 0.5]} scale={0.65} rotationY={Math.PI / 6} />
        
        {/* City Dogs roaming - In open areas */}
        <PetDog3D position={[-14, 0, 2.5]} walkRadius={1.2} walkSpeed={0.3} />
        <PetDog3D position={[-24, 0, -0.5]} scale={0.8} walkRadius={1.0} walkSpeed={0.25} />
        
        {/* City Birds */}
        <Bird position={[-15, 6, -3]} color="#FFD93D" speed={1.2} />
        <Bird position={[-25, 7, 2]} color="#A084E8" speed={0.9} phase={1.5} />
        <Bird position={[-10, 5, 5]} color="#6BCB77" speed={1.1} phase={2} />
        
        {/* Additional BMTC City Buses - On main roads */}
        <BMTCBus position={[-30, 0, -8]} rotationY={Math.PI / 2} scale={0.8} />
        <BMTCBus position={[-2, 0, 6]} rotationY={0} scale={0.8} />
        <BMTCBus position={[-33, 0, 5]} rotationY={-Math.PI / 4} scale={0.8} />
        
        {/* Two-wheelers scattered realistically - Additional vehicles on clear paths */}
        <TwoWheeler position={[-3, 0, 1]} rotationY={Math.PI / 3} type="scooter" scale={0.9} />
        <TwoWheeler position={[-31, 0, -1]} rotationY={-Math.PI / 6} type="motorcycle" scale={0.9} />
        <TwoWheeler position={[-8, 0, -6]} rotationY={Math.PI / 2} type="scooter" scale={0.9} />
        <TwoWheeler position={[-26, 0, 7]} rotationY={0} type="motorcycle" scale={0.9} />
        <TwoWheeler position={[-4, 0, 4]} rotationY={Math.PI / 4} type="scooter" scale={0.9} />
        
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
        
        {/* OUTER RING ROAD (ORR) - Bangalore's famous highway */}
        <group>
          {/* Main ORR segments */}
          <mesh position={[-25, -0.005, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
            <planeGeometry args={[16, 3]} />
            <meshStandardMaterial color="#34495E" roughness={0.8} />
          </mesh>
          
          <mesh position={[-15, -0.005, -8]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 3]} />
            <meshStandardMaterial color="#34495E" roughness={0.8} />
          </mesh>
          
          <mesh position={[-15, -0.005, 8]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 3]} />
            <meshStandardMaterial color="#34495E" roughness={0.8} />
          </mesh>
          
          {/* ORR divider lines */}
          <mesh position={[-25, 0.001, 0]}>
            <boxGeometry args={[0.1, 0.01, 14]} />
            <meshStandardMaterial color="#FFFF00" />
          </mesh>
          
          <mesh position={[-15, 0.001, -8]}>
            <boxGeometry args={[18, 0.01, 0.1]} />
            <meshStandardMaterial color="#FFFF00" />
          </mesh>
          
          <mesh position={[-15, 0.001, 8]}>
            <boxGeometry args={[18, 0.01, 0.1]} />
            <meshStandardMaterial color="#FFFF00" />
          </mesh>
          
          {/* Highway signs */}
          <group position={[-25, 0, -6]}>
            <mesh position={[0, 2, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 4, 8]} />
              <meshStandardMaterial color="#444444" />
            </mesh>
            <mesh position={[0, 4.2, 0]}>
              <boxGeometry args={[3, 0.8, 0.1]} />
              <meshStandardMaterial color="#006400" />
            </mesh>
            <mesh position={[0, 4.2, 0.06]}>
              <boxGeometry args={[2.8, 0.6, 0.01]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
          </group>
        </group>
        
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
        {/* Expanded Town Background - Using much more space for cleaner layout */}
        <mesh position={[25, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[35, 25]} />
          <meshStandardMaterial color={isNight ? "#0F2027" : "#4A5D23"} roughness={0.9} />
        </mesh>
        
        {/* Town Welcome Arch - Better positioned */}
        <group position={[25, 0, -10]}>
          <mesh position={[-2.5, 2, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 4, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[2.5, 2, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 4, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[0, 3.5, 0]}>
            <boxGeometry args={[5.5, 0.5, 0.2]} />
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
          
          {/* Realistic street food stalls in market area */}
          <StreetFoodStall position={[25, 0, 6.5]} type="coffee" scale={0.6} />
          <StreetFoodStall position={[23, 0, 6.5]} type="chaat" scale={0.6} />
          
          {/* Parked two-wheelers near market */}
          <TwoWheeler position={[24.5, 0, 7.2]} rotationY={Math.PI / 4} type="scooter" scale={0.7} parked />
          <TwoWheeler position={[23.5, 0, 7.2]} rotationY={-Math.PI / 6} type="motorcycle" scale={0.7} parked />
        </group>
        
        <group onClick={() => handleLandmarkClick("Village Grove")}>
          <GardenPark position={[28, 0, 2]} type="sankey" name="Village Grove" size={1.5} scale={0.8} />
        </group>
        
        {/* Parked Bikes near Village Grove */}
        <ParkedBike position={[30, 0, 1]} rotationY={Math.PI / 3} color="#1ABC9C" />
        <ParkedBike position={[29, 0, 3]} rotationY={-Math.PI / 6} color="#E91E63" />
        <ParkedBike position={[27, 0, 0.5]} rotationY={Math.PI / 2} color="#FF5722" />
        <ParkedBike position={[30.5, 0, 2.5]} rotationY={0} color="#607D8B" />

        {/* Multiple Town Temples - Using proper 3D components */}
        <group onClick={() => handleLandmarkClick("Main Temple")}>
          <Temple position={[15, 0, -3]} type="main" name="Main Temple" scale={0.8} />
        </group>
        
        <group onClick={() => handleLandmarkClick("Community Temple")}>
          <Temple position={[21, 0, 2]} type="community" name="Community Temple" scale={0.7} />
        </group>
        
        {/* Local Shops - Using proper 3D components instead of static blocks */}
        <KiranaStore position={[7, 0, 3.5]} storeName="Village Store" type="general" scale={0.6} />
        <KiranaStore position={[8.2, 0, 3.5]} storeName="Medical Shop" type="medical" scale={0.6} />
        <KiranaStore position={[9.4, 0, 3.5]} storeName="Stationery" type="stationary" scale={0.6} />
        <KiranaStore position={[10.6, 0, 3.5]} storeName="Provision Store" type="provision" scale={0.6} />
        
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

        {/* NEW RAJAJINAGAR ENHANCEMENTS */}
        
        {/* Local Bus Stop */}
        <BusStop position={[13, 0, -6]} name="Rajajinagar Bus Stop" scale={0.8} />
        
        {/* Residential Apartments */}
        <ResidentialApartment position={[25, 0, -8]} name="Rajaji Residency" floors={3} color="#F5DEB3" scale={0.7} />
        <ResidentialApartment position={[8, 0, -8]} name="Green Valley Apartments" floors={4} color="#DDA0DD" scale={0.6} />
        <ResidentialApartment position={[30, 0, 3]} name="Park View Heights" floors={5} color="#F0E68C" scale={0.8} />
        
        {/* Children's Playground */}
        <Playground position={[6, 0, -2]} size="medium" scale={0.4} />
        
        {/* Traffic Infrastructure */}
        <TrafficSystem position={[18, 0, -1]} type="signal" scale={0.8} />
        <TrafficSystem position={[16, 0, 4]} type="sign" signType="speed" scale={0.7} />
        <TrafficSystem position={[20, 0, -4]} type="sign" signType="stop" scale={0.7} />
        <TrafficSystem position={[18, 0, 2]} type="zebra" scale={0.6} rotation={[0, Math.PI/2, 0]} />
        
        {/* Government Office */}
        <GovernmentOffice position={[10, 0, 6]} name="Rajajinagar Municipality" type="municipality" scale={0.6} />
        
        {/* Community Hall */}
        <CommunityHall position={[22, 0, -7]} name="Rajajinagar Community Hall" capacity={150} scale={0.5} />
        
        {/* Banking Services */}
        <BankingServices position={[14, 0, 8]} type="atm" name="SBI ATM" scale={0.8} />
        <BankingServices position={[26, 0, 1]} type="bank" name="Canara Bank" scale={0.6} />
        <BankingServices position={[12, 0, -8]} type="cooperative" name="Rajajinagar Co-op Bank" scale={0.7} />
        
        {/* Auto-rickshaw Stand */}
        <AutoRickshawStand position={[8, 0, 8]} autoCount={4} scale={0.6} />
        
        {/* Additional Enhancement Features */}
        
        {/* Local Clinic/Health Center */}
        <group position={[28, 0, -3]}>
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[2.5, 1.2, 2]} />
            <meshStandardMaterial color="#98FB98" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.3, 1.01]}>
            <boxGeometry args={[1, 0.6, 0.02]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          <mesh position={[0, 1, 1.01]}>
            <boxGeometry args={[2, 0.3, 0.02]} />
            <meshStandardMaterial color="#FF0000" />
          </mesh>
        </group>
        
        {/* Small Restaurant/Hotel */}
        <group position={[5, 0, 7]}>
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[3, 1.6, 2.5]} />
            <meshStandardMaterial color="#FFA500" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.5, 1.26]}>
            <boxGeometry args={[1.5, 1, 0.02]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          <mesh position={[0, 1.4, 1.26]}>
            <boxGeometry args={[2.5, 0.3, 0.02]} />
            <meshStandardMaterial color="#FF6B6B" />
          </mesh>
          {/* Restaurant Tables outside */}
          {[[-1, 0, 2], [1, 0, 2]].map(([x, y, z], i) => (
            <group key={`table-${i}`} position={[x, y, z]}>
              <mesh position={[0, 0.4, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 0.05, 8]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              <mesh position={[0, 0.2, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.4, 6]} />
                <meshStandardMaterial color="#708090" />
              </mesh>
            </group>
          ))}
        </group>
        
        {/* Flower Vendor Cart */}
        <group position={[24, 0, 6]}>
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[1.5, 0.6, 1]} />
            <meshStandardMaterial color="#FFB6C1" roughness={0.7} />
          </mesh>
          <mesh position={[-0.6, 0.1, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.05, 8]} />
            <meshStandardMaterial color="#2F2F2F" />
          </mesh>
          <mesh position={[0.6, 0.1, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.05, 8]} />
            <meshStandardMaterial color="#2F2F2F" />
          </mesh>
          {/* Flower buckets */}
          {[[-0.5, 0], [0, 0], [0.5, 0]].map(([x, z], i) => (
            <mesh key={`flower-${i}`} position={[x, 0.4, z]}>
              <cylinderGeometry args={[0.15, 0.12, 0.2, 8]} />
              <meshStandardMaterial color={["#FF69B4", "#FFD700", "#FF4500"][i]} />
            </mesh>
          ))}
        </group>
        
        {/* Fruit Cart */}
        <group position={[7, 0, -6]}>
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[1.2, 0.6, 0.8]} />
            <meshStandardMaterial color="#32CD32" roughness={0.7} />
          </mesh>
          <mesh position={[-0.5, 0.1, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 8]} />
            <meshStandardMaterial color="#2F2F2F" />
          </mesh>
          <mesh position={[0.5, 0.1, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 8]} />
            <meshStandardMaterial color="#2F2F2F" />
          </mesh>
          {/* Fruit baskets */}
          {[[-0.3, -0.2], [0.3, -0.2], [0, 0.2]].map(([x, z], i) => (
            <mesh key={`fruit-${i}`} position={[x, 0.45, z]}>
              <sphereGeometry args={[0.12, 8, 8]} />
              <meshStandardMaterial color={["#FF6347", "#FFD700", "#32CD32"][i]} />
            </mesh>
          ))}
        </group>
        
        {/* Water Tank/Overhead Tank */}
        <group position={[15, 0, -9]}>
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[1, 1, 1.5, 12]} />
            <meshStandardMaterial color="#4682B4" roughness={0.6} />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 2, 8]} />
            <meshStandardMaterial color="#708090" />
          </mesh>
          <mesh position={[-0.8, 1, -0.8]}>
            <cylinderGeometry args={[0.06, 0.06, 2, 8]} />
            <meshStandardMaterial color="#708090" />
          </mesh>
          <mesh position={[0.8, 1, -0.8]}>
            <cylinderGeometry args={[0.06, 0.06, 2, 8]} />
            <meshStandardMaterial color="#708090" />
          </mesh>
          <mesh position={[-0.8, 1, 0.8]}>
            <cylinderGeometry args={[0.06, 0.06, 2, 8]} />
            <meshStandardMaterial color="#708090" />
          </mesh>
          <mesh position={[0.8, 1, 0.8]}>
            <cylinderGeometry args={[0.06, 0.06, 2, 8]} />
            <meshStandardMaterial color="#708090" />
          </mesh>
        </group>
        
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
        
        {/* BDA Residential Layouts around Rajajinagar - Spaced properly */}
        <BDALayout position={[11, 0, 5]} type="A" phase={3} occupancy="full" scale={0.7} />
        <BDALayout position={[26, 0, 5]} type="B" phase={5} occupancy="partial" scale={0.7} />
        <BDALayout position={[11, 0, -5]} type="C" phase={2} occupancy="full" scale={0.6} />
        <BDALayout position={[26, 0, -5]} type="D" phase={1} occupancy="developing" scale={0.6} />
        
        {/* Local Kirana Stores serving the neighborhood - Repositioned */}
        <KiranaStore position={[15, 0, 3]} storeName="Raja General Store" type="general" bustling scale={0.7} />
        <KiranaStore position={[21, 0, -3]} storeName="Amma Medical" type="medical" scale={0.7} />
        <KiranaStore position={[12, 0, 1]} storeName="Kids Stationary" type="stationary" scale={0.6} />
        <KiranaStore position={[24, 0, 2]} storeName="Naga Provision Store" type="provision" bustling scale={0.7} />
        <KiranaStore position={[15, 0, -7]} storeName="Mobile Electronics" type="electronics" scale={0.6} />
        
        {/* Neighborhood two-wheelers parked around residential areas - On roads */}
        <TwoWheeler position={[14, 0, 4]} rotationY={Math.PI / 6} type="scooter" scale={0.6} parked />
        <TwoWheeler position={[22, 0, 4]} rotationY={-Math.PI / 4} type="motorcycle" scale={0.6} parked />
        <TwoWheeler position={[12, 0, -4]} rotationY={Math.PI / 3} type="scooter" scale={0.6} parked />
        <TwoWheeler position={[25, 0, -1]} rotationY={0} type="motorcycle" scale={0.6} parked />
        
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
      
      {/* Simplified night lighting to prevent WebGL errors */}
      {isNight && (
        <>
          {/* Main ambient lighting */}
          <ambientLight intensity={0.3} color="#2C3E50" />
          
          {/* Key area lighting only - reduced count */}
          <pointLight 
            position={[-15, 4, 0]} 
            color="#FFE55C" 
            intensity={0.8} 
            distance={25} 
          />
          <pointLight 
            position={[18, 4, 0]} 
            color="#FFA500" 
            intensity={0.7} 
            distance={20} 
          />
          
          {/* Fireflies in parks - visual only, no lighting */}
          {Array.from({ length: 8 }).map((_, i) => {
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
                  emissiveIntensity={0.8}
                  transparent 
                  opacity={0.9} 
                />
              </mesh>
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

      {/* Weather System */}
      <WeatherSystem 
        position={[0, 0, 0]} 
        weatherType={weather}
        autoChange={autoWeather}
        intensity={1.0}
      />
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
    "Manyata Tech Park": "Modern IT Campus Complex",
    "Forum Mall": "Premium Shopping Destination",
    "Phoenix Marketcity": "Largest Mall in Bangalore",
    "Brigade Road": "Shopping Street",
    "Lalbagh Garden": "Historic Botanical Garden"
  };
  
  return info[landmark] || "Welcome to Namma Bengaluru!";
}