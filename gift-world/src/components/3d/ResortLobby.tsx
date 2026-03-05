'use client';

import { useTheme } from '@/hooks/useTheme';

export default function ResortLobby() {
  const { isNight } = useTheme();

  return (
    <group>
      {/* ENHANCED LIGHTING SYSTEM - Best Engine Quality */}
      
      {/* Main Ambient Lighting - Soft overall illumination */}
      <ambientLight intensity={isNight ? 0.6 : 0.8} color={isNight ? '#ffd89b' : '#fff8e1'} />
      
      {/* Primary Directional Light - Main scene lighting */}
      <directionalLight 
        position={[8, 12, 8]} 
        intensity={isNight ? 0.7 : 1.2}
        color={isNight ? '#ffb347' : '#ffffff'}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Secondary Fill Light - Removes harsh shadows */}
      <directionalLight 
        position={[-5, 8, -5]} 
        intensity={isNight ? 0.4 : 0.6}
        color={isNight ? '#ffeaa7' : '#f8f9fa'}
      />
      
      {/* Reception Desk Focused Lighting */}
      <spotLight
        position={[0, 4, -1]}
        target-position={[0, 1.2, -1.5]}
        intensity={isNight ? 1.5 : 1.8}
        color={isNight ? '#ffd700' : '#ffffff'}
        angle={Math.PI / 6}
        penumbra={0.3}
        distance={8}
        castShadow
      />
      
      {/* Seating Area Accent Lighting */}
      <spotLight
        position={[-2.5, 3.5, 2]}
        target-position={[-2.5, 0.5, 1]}
        intensity={isNight ? 1.2 : 1.5}
        color={isNight ? '#ffeb3b' : '#f5f5f5'}
        angle={Math.PI / 5}
        penumbra={0.4}
        distance={6}
      />
      
      <spotLight
        position={[2.5, 3.5, 2]}
        target-position={[2.5, 0.5, 1]}
        intensity={isNight ? 1.2 : 1.5}
        color={isNight ? '#ffeb3b' : '#f5f5f5'}
        angle={Math.PI / 5}
        penumbra={0.4}
        distance={6}
      />
      
      {/* Information Board Highlighting */}
      <spotLight
        position={[-2, 3.5, -1.8]}
        target-position={[-2, 2, -2.4]}
        intensity={isNight ? 1.8 : 2.2}
        color={isNight ? '#4fc3f7' : '#ffffff'}
        angle={Math.PI / 8}
        penumbra={0.2}
        distance={5}
      />
      
      {/* Welcome Station Warm Lighting */}
      <pointLight
        position={[-3, 2, 1.8]}
        intensity={isNight ? 1.3 : 1.6}
        color={isNight ? '#ff9800' : '#fff3e0'}
        distance={4}
        decay={1}
      />
      
      {/* Check-in Kiosk Task Lighting */}
      <pointLight
        position={[3, 1.5, -1]}
        intensity={isNight ? 1.4 : 1.7}
        color={isNight ? '#64b5f6' : '#e3f2fd'}
        distance={3}
        decay={1}
      />
      
      {/* Ceiling Architectural Lighting */}
      <pointLight
        position={[-3, 3.4, -1]}
        intensity={isNight ? 0.8 : 1.0}
        color={isNight ? '#ffcc80' : '#ffffff'}
        distance={6}
      />
      
      <pointLight
        position={[3, 3.4, -1]}
        intensity={isNight ? 0.8 : 1.0}
        color={isNight ? '#ffcc80' : '#ffffff'}
        distance={6}
      />
      
      {/* Entry Area Welcoming Light */}
      <spotLight
        position={[0, 4, 3]}
        target-position={[0, 0, 2.5]}
        intensity={isNight ? 1.6 : 1.9}
        color={isNight ? '#ffc107' : '#ffffff'}
        angle={Math.PI / 4}
        penumbra={0.5}
        distance={8}
      />
      
      {/* Reading Area Focused Light */}
      <pointLight
        position={[0, 2.5, 0.8]}
        intensity={isNight ? 1.1 : 1.4}
        color={isNight ? '#fff59d' : '#f9f9f9'}
        distance={3}
        decay={0.5}
      />
      
      {/* Wall Art Accent Lights */}
      <spotLight
        position={[-4, 3, 0]}
        target-position={[-4.4, 2.5, -0.8]}
        intensity={isNight ? 0.9 : 1.2}
        color={isNight ? '#81c784' : '#ffffff'}
        angle={Math.PI / 8}
        penumbra={0.3}
        distance={3}
      />
      
      <spotLight
        position={[4, 3, 0]}
        target-position={[4.4, 2.5, -0.8]}
        intensity={isNight ? 0.9 : 1.2}
        color={isNight ? '#ffb74d' : '#ffffff'}
        angle={Math.PI / 8}
        penumbra={0.3}
        distance={3}
      />
      
      {/* Premium Night Mode Enhancement */}
      {isNight && (
        <>
          {/* Chandelier Premium Glow */}
          <pointLight
            position={[0, 3.2, 0]}
            intensity={2.5}
            color="#ffd54f"
            distance={12}
            decay={0.8}
          />
          
          {/* Luxury Under-lighting */}
          <pointLight
            position={[0, 0.2, -1.5]}
            intensity={0.8}
            color="#ff8a65"
            distance={4}
          />
          
          {/* Corner Mood Lighting */}
          <pointLight
            position={[-4, 0.5, -2]}
            intensity={0.6}
            color="#ab47bc"
            distance={3}
          />
          
          <pointLight
            position={[4, 0.5, -2]}
            intensity={0.6}
            color="#26a69a"
            distance={3}
          />
        </>
      )}

      {/* LOBBY FLOOR - Enhanced Marble/Tile Flooring */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9, 5]} />
        <meshStandardMaterial 
          color="#F5F5DC" 
          roughness={0.05} 
          metalness={0.3}
          envMapIntensity={0.8}
        />
      </mesh>
      
      {/* Elegant Carpet Runner - Enhanced materials */}
      <mesh position={[0, 0.01, 0.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 2]} />
        <meshStandardMaterial 
          color="#B22222" 
          roughness={0.8} 
          normalScale={[0.3, 0.3]}
        />
      </mesh>
      
      {/* LOBBY WALLS - Interior Walls (3 walls, front open) */}
      {/* Back wall behind reception */}
      <mesh position={[0, 1.8, -2.5]} receiveShadow>
        <boxGeometry args={[9, 3.6, 0.2]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.6} />
      </mesh>
      
      {/* Left wall - Full length */}
      <mesh position={[-4.5, 1.8, 0]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 5]} />
        <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
      </mesh>
      
      {/* Right wall - Full length */}
      <mesh position={[4.5, 1.8, 0]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 5]} />
        <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
      </mesh>
      
      {/* Corner connections for proper wall attachment */}
      {/* Left back corner */}
      <mesh position={[-4.4, 1.8, -2.4]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 0.2]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.6} />
      </mesh>
      
      {/* Right back corner */}
      <mesh position={[4.4, 1.8, -2.4]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 0.2]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.6} />
      </mesh>

      {/* Ceiling/Top structure */}
      <mesh position={[0, 3.6, 0]} receiveShadow>
        <boxGeometry args={[9, 0.2, 5]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
      </mesh>
      
      {/* RECEPTION DESK - Realistic Design */}
      <group position={[0, 0, -1.5]}>
        {/* Main reception counter */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 1.2, 0.8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.4} metalness={0.1} />
        </mesh>
        
        {/* Counter top - Marble surface */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.2, 0.1, 0.9]} />
          <meshStandardMaterial color="#DCDCDC" roughness={0.1} metalness={0.2} />
        </mesh>
        
        {/* Reception computer/screen */}
        <mesh position={[-1, 1.35, 0]} castShadow>
          <boxGeometry args={[0.4, 0.3, 0.05]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Desk accessories */}
        <mesh position={[0.5, 1.3, 0.2]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.15, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} />
        </mesh>
        
        {/* Bell for service */}
        <mesh position={[1.2, 1.28, 0]} castShadow>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#B8860B" metalness={0.9} />
        </mesh>
        
        {/* Reception desk chair */}
        <group position={[0, 0, -0.8]}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.6, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[0, 0.65, 0.15]} castShadow>
            <boxGeometry args={[0.4, 0.1, 0.3]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
        </group>
      </group>
      
      {/* LOBBY SEATING AREA - Elegant Sofas */}
      <group position={[-2.5, 0, 1]}>
        {/* Main sofa */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.5, 0.8]} />
          <meshStandardMaterial color="#4169E1" roughness={0.7} />
        </mesh>
        {/* Sofa back */}
        <mesh position={[0, 0.65, -0.3]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.8, 0.2]} />
          <meshStandardMaterial color="#4169E1" roughness={0.7} />
        </mesh>
        {/* Armrests */}
        <mesh position={[-0.8, 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.6, 0.8]} />
          <meshStandardMaterial color="#4169E1" roughness={0.7} />
        </mesh>
        <mesh position={[0.8, 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.6, 0.8]} />
          <meshStandardMaterial color="#4169E1" roughness={0.7} />
        </mesh>
      </group>
      
      {/* Second seating area */}
      <group position={[2.5, 0, 1]}>
        {/* Armchair */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.5, 0.8]} />
          <meshStandardMaterial color="#32CD32" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.65, -0.3]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.8, 0.2]} />
          <meshStandardMaterial color="#32CD32" roughness={0.7} />
        </mesh>
      </group>
      
      {/* COFFEE TABLE */}
      <group position={[0, 0, 1.5]}>
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.05, 0.6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Table legs */}
        <mesh position={[-0.4, 0.125, -0.2]} castShadow>
          <boxGeometry args={[0.05, 0.25, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.4, 0.125, -0.2]} castShadow>
          <boxGeometry args={[0.05, 0.25, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-0.4, 0.125, 0.2]} castShadow>
          <boxGeometry args={[0.05, 0.25, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.4, 0.125, 0.2]} castShadow>
          <boxGeometry args={[0.05, 0.25, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        
        {/* Table decorations */}
        <mesh position={[0, 0.32, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} />
        </mesh>
      </group>
      
      {/* LOBBY PLANTS & DECORATION */}
      {/* Large potted plant */}
      <group position={[-3.5, 0, -1.5]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.3, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.6, 0]} castShadow>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color="#228B22" roughness={0.6} />
        </mesh>
      </group>
      
      <group position={[3.5, 0, -1.5]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.3, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.6, 0]} castShadow>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color="#32CD32" roughness={0.6} />
        </mesh>
      </group>
      
      {/* CEILING LIGHTING - Enhanced Chandelier */}
      {/* Chandelier/Main light with premium materials */}
      <group position={[0, 3.2, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.4, 12]} />
          <meshStandardMaterial 
            color={isNight ? "#FFD700" : "#FFFFFF"}
            emissive={isNight ? "#FFD700" : "#F5F5DC"}
            emissiveIntensity={isNight ? 0.8 : 0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Crystal-like light elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 0.4, -0.15, Math.sin(i * Math.PI / 4) * 0.4]} castShadow>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial 
              color="#FFF8DC"
              emissive={isNight ? "#FFE082" : "#FFFDE7"}
              emissiveIntensity={isNight ? 0.6 : 0.2}
              metalness={0.1}
              roughness={0}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
        
        {/* Decorative chain */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial 
            color="#FFD700"
            metalness={1}
            roughness={0.1}
          />
        </mesh>
      </group>
      
      {/* RESORT INFORMATION DISPLAY BOARD - Back wall */}
      <group position={[-2, 2, -2.4]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.5, 1, 0.1]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
        <mesh position={[0, 0, 0.05]} castShadow>
          <boxGeometry args={[1.4, 0.9, 0.02]} />
          <meshStandardMaterial color="#ECF0F1" />
        </mesh>
        {/* Schedule text areas */}
        <mesh position={[-0.3, 0.2, 0.06]} castShadow>
          <boxGeometry args={[0.3, 0.2, 0.01]} />
          <meshStandardMaterial color="#3498DB" />
        </mesh>
        <mesh position={[0.3, 0.2, 0.06]} castShadow>
          <boxGeometry args={[0.3, 0.2, 0.01]} />
          <meshStandardMaterial color="#E74C3C" />
        </mesh>
      </group>

      {/* RESORT MAP & DIRECTORY - Side wall */}
      <group position={[-4.4, 2, 1]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 1.2, 0.8]} />
          <meshStandardMaterial color="#34495E" />
        </mesh>
        <mesh position={[0.05, 0, 0]} castShadow>
          <boxGeometry args={[0.02, 1.1, 0.7]} />
          <meshStandardMaterial color="#ECF0F1" />
        </mesh>
      </group>

      {/* GUEST CHECK-IN KIOSK - Spaced away from main reception */}
      <group position={[3, 0, -1]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.8, 0.4]} />
          <meshStandardMaterial color="#2C3E50" roughness={0.3} />
        </mesh>
        {/* Touch screen */}
        <mesh position={[0, 0.6, 0.21]} castShadow>
          <boxGeometry args={[0.4, 0.3, 0.02]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* Base */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.2, 8]} />
          <meshStandardMaterial color="#95A5A6" />
        </mesh>
      </group>

      {/* WELCOME REFRESHMENT STATION - Corner placement */}
      <group position={[-3, 0, 1.8]}>
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 0.5]} />
          <meshStandardMaterial color="#8B4513" roughness={0.4} />
        </mesh>
        {/* Countertop */}
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.1, 0.1, 0.6]} />
          <meshStandardMaterial color="#DCDCDC" roughness={0.1} />
        </mesh>
        {/* Water dispensers */}
        <mesh position={[-0.25, 1.25, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
          <meshStandardMaterial color="#3498DB" />
        </mesh>
        <mesh position={[0.25, 1.25, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
          <meshStandardMaterial color="#E67E22" />
        </mesh>
      </group>

      {/* BELL HOP STATION - Near entrance, well-spaced */}
      <group position={[3.5, 0, 2]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.8, 0.4]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Luggage cart wheels */}
        <mesh position={[-0.3, 0.1, 0.3]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 8]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
        <mesh position={[0.3, 0.1, 0.3]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 8]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
      </group>

      {/* READING MATERIALS STAND - Between seating areas */}
      <group position={[0, 0, 0.8]}>
        <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.15, 1, 8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Brochure holders */}
        <mesh position={[0, 0.8, 0.2]} castShadow>
          <boxGeometry args={[0.4, 0.3, 0.05]} />
          <meshStandardMaterial color="#ECF0F1" />
        </mesh>
      </group>

      {/* Wall art and decorations - Repositioned with more space */}
      <group position={[-4.4, 2.5, -0.8]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.05, 0.8, 0.6]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[-0.02, 0, 0]} castShadow>
          <boxGeometry args={[0.02, 0.7, 0.5]} />
          <meshStandardMaterial color="#87CEEB" />
        </mesh>
      </group>
      
      <group position={[4.4, 2.5, -0.8]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.05, 0.8, 0.6]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0.02, 0, 0]} castShadow>
          <boxGeometry args={[0.02, 0.7, 0.5]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
      </group>
    </group>
  );
}