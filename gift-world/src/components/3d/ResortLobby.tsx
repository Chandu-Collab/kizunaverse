'use client';

import { useTheme } from '@/hooks/useTheme';

export default function ResortLobby() {
  const { isNight } = useTheme();

  return (
    <group>
      {/* ENHANCED LIGHTING SYSTEM - Best Engine Quality */}
      
      {/* Main Ambient Lighting - Soft overall illumination */}
      <ambientLight intensity={isNight ? 0.6 : 0.8} color={isNight ? '#ffd89b' : '#fff8e1'} />
      
      {/* Primary Directional Light - Main scene lighting for expanded space */}
      <directionalLight 
        position={[10, 12, 10]} 
        intensity={isNight ? 0.8 : 1.4}
        color={isNight ? '#ffb347' : '#ffffff'}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={60}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      
      {/* Secondary Fill Light - Removes harsh shadows for larger space */}
      <directionalLight 
        position={[-8, 10, -8]} 
        intensity={isNight ? 0.5 : 0.8}
        color={isNight ? '#ffeaa7' : '#f8f9fa'}
      />
      
      {/* Reception Desk Focused Lighting - Updated for expanded space */}
      <spotLight
        position={[0, 4.5, -2]}
        target-position={[0, 1.2, -2.5]}
        intensity={isNight ? 2.2 : 2.6}
        color={isNight ? '#ffd700' : '#ffffff'}
        angle={Math.PI / 6}
        penumbra={0.3}
        distance={10}
        castShadow
      />
      
      {/* Seating Area Accent Lighting - Updated for new positions */}
      <spotLight
        position={[-3.2, 3.5, 2.5]}
        target-position={[-3.2, 0.5, 1.8]}
        intensity={isNight ? 1.8 : 2.2}
        color={isNight ? '#ffeb3b' : '#f5f5f5'}
        angle={Math.PI / 5}
        penumbra={0.4}
        distance={8}
      />
      
      <spotLight
        position={[3.2, 3.5, 2.5]}
        target-position={[3.2, 0.5, 1.8]}
        intensity={isNight ? 1.8 : 2.2}
        color={isNight ? '#ffeb3b' : '#f5f5f5'}
        angle={Math.PI / 5}
        penumbra={0.4}
        distance={8}
      />
      
      {/* Information Board Highlighting - Updated position */}
      <spotLight
        position={[-2, 4, -3.5]}
        target-position={[-2, 2.2, -3.9]}
        intensity={isNight ? 2.0 : 2.4}
        color={isNight ? '#4fc3f7' : '#ffffff'}
        angle={Math.PI / 8}
        penumbra={0.2}
        distance={6}
      />
      
      {/* Welcome Station Warm Lighting - Updated for new position */}
      <pointLight
        position={[-1.5, 2.5, 3]}
        intensity={isNight ? 1.6 : 2.0}
        color={isNight ? '#ff9800' : '#fff3e0'}
        distance={5}
        decay={1}
      />
      
      {/* Check-in Kiosk Task Lighting - Updated position */}
      <pointLight
        position={[4.5, 2.5, -1.2]}
        intensity={isNight ? 1.7 : 2.1}
        color={isNight ? '#64b5f6' : '#e3f2fd'}
        distance={4}
        decay={1}
      />
      
      {/* Bell Hop Station Lighting - Updated position */}
      <pointLight
        position={[1.5, 2.5, 3]}
        intensity={isNight ? 1.4 : 1.7}
        color={isNight ? '#8b4513' : '#ffffff'}
        distance={4}
      />
      
      {/* Reading Materials Lighting - Updated position */}
      <pointLight
        position={[0, 2.5, 0.2]}
        intensity={isNight ? 1.2 : 1.5}
        color={isNight ? '#8b4513' : '#ffffff'}
        distance={3}
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

      {/* LOBBY FLOOR - Expanded Premium Marble/Tile Flooring */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial 
          color="#F5F5DC" 
          roughness={0.05} 
          metalness={0.3}
          envMapIntensity={0.8}
        />
      </mesh>
      
      {/* Elegant Carpet Runner - Enhanced materials and larger */}
      <mesh position={[0, 0.01, 0.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial 
          color="#B22222" 
          roughness={0.8} 
          normalScale={[0.3, 0.3]}
        />
      </mesh>
      
      {/* LOBBY WALLS - Expanded Interior Walls (3 walls, front open) */}
      {/* Back wall behind reception */}
      <mesh position={[0, 1.8, -4]} receiveShadow>
        <boxGeometry args={[12, 3.6, 0.2]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.6} />
      </mesh>
      
      {/* Left wall - Full length */}
      <mesh position={[-6, 1.8, 0]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 8]} />
        <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
      </mesh>
      
      {/* Right wall - Full length */}
      <mesh position={[6, 1.8, 0]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 8]} />
        <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
      </mesh>
      
      {/* Corner connections for proper wall attachment */}
      {/* Left back corner */}
      <mesh position={[-5.9, 1.8, -3.9]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 0.2]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.6} />
      </mesh>
      
      {/* Right back corner */}
      <mesh position={[5.9, 1.8, -3.9]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 0.2]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.6} />
      </mesh>

      {/* Ceiling/Top structure - Expanded */}
      <mesh position={[0, 3.6, 0]} receiveShadow>
        <boxGeometry args={[12, 0.2, 8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
      </mesh>
      
      {/* RECEPTION DESK - Realistic Design - Repositioned with more space */}
      <group position={[0, 0, -2.5]}>
        {/* Main reception counter */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[5, 1.2, 0.8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.4} metalness={0.1} />
        </mesh>
        
        {/* Counter top - Marble surface */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.2, 0.1, 0.9]} />
          <meshStandardMaterial color="#DCDCDC" roughness={0.1} metalness={0.2} />
        </mesh>
        
        {/* Reception computer/screen */}
        <mesh position={[-1.5, 1.35, 0]} castShadow>
          <boxGeometry args={[0.4, 0.3, 0.05]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Second workstation */}
        <mesh position={[1.5, 1.35, 0]} castShadow>
          <boxGeometry args={[0.4, 0.3, 0.05]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Desk accessories */}
        <mesh position={[0.5, 1.3, 0.2]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.15, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} />
        </mesh>
        
        {/* Bell for service */}
        <mesh position={[-0.5, 1.28, 0]} castShadow>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#B8860B" metalness={0.9} />
        </mesh>
        
        {/* Reception desk chairs */}
        <group position={[-1.2, 0, -0.8]}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.6, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[0, 0.65, 0.15]} castShadow>
            <boxGeometry args={[0.4, 0.1, 0.3]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
        </group>
        
        <group position={[1.2, 0, -0.8]}>
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
      
      {/* LOBBY SEATING AREA - Non-overlapping positions */}
      <group position={[-3.2, 0, 1.8]}>
        {/* Main sofa - moved away from corners */}
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
      
      {/* Second seating area - Clear spacing */}
      <group position={[3.2, 0, 1.8]}>
        {/* Armchair */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 0.5, 0.8]} />
          <meshStandardMaterial color="#32CD32" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.65, -0.3]} castShadow receiveShadow>
          <boxGeometry args={[1, 0.8, 0.2]} />
          <meshStandardMaterial color="#32CD32" roughness={0.7} />
        </mesh>
        {/* Armrests for chair */}
        <mesh position={[-0.4, 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.6, 0.8]} />
          <meshStandardMaterial color="#32CD32" roughness={0.7} />
        </mesh>
        <mesh position={[0.4, 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.6, 0.8]} />
          <meshStandardMaterial color="#32CD32" roughness={0.7} />
        </mesh>
      </group>
      
      {/* COFFEE TABLES - Properly spaced in front of seating */}
      <group position={[-3.2, 0, 0.8]}>
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.05, 0.6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Table legs */}
        <mesh position={[-0.45, 0.125, -0.2]} castShadow>
          <boxGeometry args={[0.05, 0.25, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.45, 0.125, -0.2]} castShadow>
          <boxGeometry args={[0.05, 0.25, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-0.45, 0.125, 0.2]} castShadow>
          <boxGeometry args={[0.05, 0.25, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.45, 0.125, 0.2]} castShadow>
          <boxGeometry args={[0.05, 0.25, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        
        {/* Table decorations */}
        <mesh position={[0, 0.32, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} />
        </mesh>
      </group>
      
      <group position={[3.2, 0, 0.8]}>
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 0.05, 0.5]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Table legs */}
        <mesh position={[-0.35, 0.125, -0.15]} castShadow>
          <boxGeometry args={[0.05, 0.25, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.35, 0.125, -0.15]} castShadow>
          <boxGeometry args={[0.05, 0.25, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-0.35, 0.125, 0.15]} castShadow>
          <boxGeometry args={[0.05, 0.25, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.35, 0.125, 0.15]} castShadow>
          <boxGeometry args={[0.05, 0.25, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        
        {/* Table decorations */}
        <mesh position={[0, 0.32, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} />
        </mesh>
      </group>
      
      {/* LOBBY PLANTS & DECORATION - Clear corner positioning */}
      {/* Large potted plants - True corners, no overlap */}
      <group position={[-5.5, 0, -3.5]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.3, 0.3, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.7, 0]} castShadow>
          <sphereGeometry args={[0.35, 8, 8]} />
          <meshStandardMaterial color="#228B22" roughness={0.6} />
        </mesh>
      </group>
      
      <group position={[5.5, 0, -3.5]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.3, 0.3, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.7, 0]} castShadow>
          <sphereGeometry args={[0.35, 8, 8]} />
          <meshStandardMaterial color="#32CD32" roughness={0.6} />
        </mesh>
      </group>
      
      {/* Front corner plants - Well spaced from seating */}
      <group position={[-5.5, 0, 3.5]}>
        <mesh position={[0, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.25, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.5, 0]} castShadow>
          <sphereGeometry args={[0.28, 8, 8]} />
          <meshStandardMaterial color="#90EE90" roughness={0.6} />
        </mesh>
      </group>
      
      <group position={[5.5, 0, 3.5]}>
        <mesh position={[0, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.25, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.5, 0]} castShadow>
          <sphereGeometry args={[0.28, 8, 8]} />
          <meshStandardMaterial color="#9ACD32" roughness={0.6} />
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

      {/* RESORT MAP & DIRECTORY - Repositioned to avoid seating overlap */}
      <group position={[-5.8, 2, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 1.2, 0.8]} />
          <meshStandardMaterial color="#34495E" />
        </mesh>
        <mesh position={[0.05, 0, 0]} castShadow>
          <boxGeometry args={[0.02, 1.1, 0.7]} />
          <meshStandardMaterial color="#ECF0F1" />
        </mesh>
      </group>

      {/* GUEST CHECK-IN KIOSK - Clear positioning away from seating */}
      <group position={[4.5, 0, -1.2]}>
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

      {/* WELCOME REFRESHMENT STATION - Moved to avoid seating overlap */}
      <group position={[-1.5, 0, 3]}>
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

      {/* BELL HOP STATION - Moved for better spacing */}
      <group position={[1.5, 0, 3]}>
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

      {/* READING MATERIALS STAND - Central but clear of traffic */}
      <group position={[0, 0, 0.2]}>
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

      {/* Updated Information board/directory - Better positioned */}
      <group position={[-5.8, 2.2, 1.5]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 1.4, 1]} />
          <meshStandardMaterial color="#34495E" />
        </mesh>
        <mesh position={[0.05, 0, 0]} castShadow>
          <boxGeometry args={[0.02, 1.3, 0.9]} />
          <meshStandardMaterial color="#ECF0F1" />
        </mesh>
      </group>

      {/* Wall art and decorations - Repositioned with more space */}
      <group position={[-5.8, 2.5, -1.5]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.05, 1, 0.8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[-0.02, 0, 0]} castShadow>
          <boxGeometry args={[0.02, 0.9, 0.7]} />
          <meshStandardMaterial color="#87CEEB" />
        </mesh>
      </group>
      
      <group position={[5.8, 2.5, -1.5]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.05, 1, 0.8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0.02, 0, 0]} castShadow>
          <boxGeometry args={[0.02, 0.9, 0.7]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
      </group>
      
      {/* Additional wall art for larger space */}
      <group position={[0, 2.8, -3.8]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.2, 0.8, 0.05]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 0, -0.02]} castShadow>
          <boxGeometry args={[1.1, 0.7, 0.02]} />
          <meshStandardMaterial color="#DDA0DD" />
        </mesh>
      </group>
    </group>
  );
}