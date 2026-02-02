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
  
  // Auto-rickshaw positions with movement
  const [autoPositions, setAutoPositions] = useState([
    { pos: [-8, 0, 2], rotation: Math.PI / 4 },
    { pos: [6, 0, -3], rotation: -Math.PI / 6 },
    { pos: [0, 0, -8], rotation: Math.PI / 2 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoPositions(prev => prev.map(auto => ({
        ...auto,
        pos: [
          auto.pos[0] + (Math.random() - 0.5) * 0.5,
          auto.pos[1],
          auto.pos[2] + (Math.random() - 0.5) * 0.5
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
      {/* Bangalore Landmarks */}
      
      {/* Vidhana Soudha - Government Building */}
      <group onClick={() => handleLandmarkClick("Vidhana Soudha")}>
        <VidhanaSoudha position={[0, 0, -8]} />
      </group>
      
      {/* UB City Mall & Tower */}
      <group onClick={() => handleLandmarkClick("UB City Mall")}>
        <UBCity position={[-6, 0, -4]} />
      </group>
      
      {/* Bangalore Palace */}
      <group onClick={() => handleLandmarkClick("Bangalore Palace")}>
        <BangalorePalace position={[6, 0, -6]} />
      </group>
      
      {/* ISKCON Temple */}
      <group onClick={() => handleLandmarkClick("ISKCON Temple")}>
        <ISKCONTemple position={[-8, 0, 2]} />
      </group>
      
      {/* Tech Parks */}
      <group onClick={() => handleLandmarkClick("Electronic City")}>
        <TechPark position={[8, 0, 0]} name="Electronic City" />
      </group>
      
      <group onClick={() => handleLandmarkClick("Whitefield IT Hub")}>
        <TechPark position={[4, 0, 4]} name="Whitefield" />
      </group>
      
      {/* MG Road Shopping */}
      <group onClick={() => handleLandmarkClick("MG Road")}>
        <MGRoadShops position={[-2, 0, 6]} />
      </group>
      
      {/* Cubbon Park Trees */}
      <group onClick={() => handleLandmarkClick("Cubbon Park")}>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 4;
          return (
            <CubbonParkTree 
              key={i} 
              position={[
                Math.cos(angle) * radius - 2, 
                0, 
                Math.sin(angle) * radius + 2
              ]} 
            />
          );
        })}
      </group>
      
      {/* Namma Metro */}
      <group onClick={() => handleLandmarkClick("Namma Metro")}>
        <NammaMetro position={[2, 0, -2]} />
      </group>
      
      {/* Auto Rickshaws moving around */}
      {autoPositions.map((auto, i) => (
        <AutoRickshaw 
          key={i} 
          position={auto.pos} 
          rotation={auto.rotation}
        />
      ))}
      
      {/* Traffic Signals */}
      <TrafficSignal position={[-4, 0, 0]} />
      <TrafficSignal position={[2, 0, 2]} />
      
      {/* BMS College & Rajajinagar Area (Opposite sides) */}
      <group onClick={() => handleLandmarkClick("BMS College")}>
        <BMSCollege position={[2, 0, 8]} />
      </group>
      
      <group onClick={() => handleLandmarkClick("Rajajinagar")}>
        <Rajajinagar position={[-2, 0, 8]} />
      </group>
      
      {/* Connecting road between BMS College and Rajajinagar */}
      <mesh position={[0, -0.005, 8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 1]} />
        <meshStandardMaterial color="#34495E" roughness={0.9} />
      </mesh>
      
      {/* Road markings for connection */}
      <mesh position={[0, 0.002, 8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.5, 0.1]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* City Roads */}
      <group>
        {/* Main roads */}
        <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 2]} />
          <meshStandardMaterial color="#2C3E50" roughness={0.9} />
        </mesh>
        
        <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[16, 1.5]} />
          <meshStandardMaterial color="#34495E" roughness={0.9} />
        </mesh>
        
        {/* Road markings */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[-8 + i * 2, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.8, 0.1]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        ))}
      </group>
      
      {/* Atmosphere Lighting for Bangalore */}
      {isNight && (
        <>
          {/* Street lights */}
          {Array.from({ length: 8 }).map((_, i) => {
            const x = -7 + i * 2;
            return (
              <group key={`street-light-${i}`}>
                <mesh position={[x, 1.5, 1]}>
                  <cylinderGeometry args={[0.03, 0.03, 3, 8]} />
                  <meshStandardMaterial color="#444444" />
                </mesh>
                <pointLight 
                  position={[x, 3, 1]} 
                  intensity={0.5} 
                  color="#FFE55C" 
                  distance={4} 
                />
                <mesh position={[x, 3, 1]}>
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
          
          {/* City ambient lighting */}
          <ambientLight intensity={0.3} color="#E6E6FA" />
          <pointLight position={[0, 10, 0]} intensity={0.4} color="#FFB347" distance={25} />
        </>
      )}
      
      {/* Landmark Information Display */}
      {selectedLandmark && (
        <Html position={[0, 5, 0]} center>
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
    "Whitefield IT Hub": "Tech Companies & Startups",
    "MG Road": "Shopping & Commercial Street",
    "Cubbon Park": "Green Lung of Bangalore",
    "Namma Metro": "Bangalore's Metro Rail System",
    "BMS College": "Bangalore Medical College - Premier Medical Institution",
    "Rajajinagar": "Vibrant Residential Area with Local Markets"
  };
  
  return info[landmark] || "Welcome to Namma Bengaluru!";
}