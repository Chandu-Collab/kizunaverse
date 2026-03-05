'use client';

import { useTheme } from '@/hooks/useTheme';

export default function ConciergeDesk() {
  const { isNight } = useTheme();

  return (
    <group>
      {/* ENHANCED LIGHTING SYSTEM - Premium Quality */}
      
      {/* Main Ambient Lighting */}
      <ambientLight intensity={isNight ? 0.6 : 0.8} color={isNight ? '#ffd89b' : '#fff8e1'} />
      
      {/* Primary Directional Light */}
      <directionalLight 
        position={[8, 12, 8]} 
        intensity={isNight ? 0.7 : 1.2}
        color={isNight ? '#ffb347' : '#ffffff'}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      
      {/* Secondary Fill Light */}
      <directionalLight 
        position={[-5, 8, -5]} 
        intensity={isNight ? 0.4 : 0.6}
        color={isNight ? '#ffeaa7' : '#f8f9fa'}
      />
      
      {/* Updated Lighting for Expanded 12x8 Space and New Positions */}
      
      {/* Main Concierge Desk Focused Lighting */}
      <spotLight
        position={[-3, 4.5, -1]}
        target-position={[-3, 1.2, -1.5]}
        intensity={isNight ? 2.2 : 2.6}
        color={isNight ? '#ffd700' : '#ffffff'}
        angle={Math.PI / 6}
        penumbra={0.3}
        distance={10}
        castShadow
      />
      
      {/* Travel Planning Area Lighting */}
      <spotLight
        position={[3.5, 4, 3]}
        target-position={[3.5, 1, 2.5]}
        intensity={isNight ? 1.8 : 2.2}
        color={isNight ? '#4fc3f7' : '#ffffff'}
        angle={Math.PI / 5}
        penumbra={0.4}
        distance={8}
      />
      
      {/* Activity Booking Station Lighting */}
      <spotLight
        position={[5, 4, -2]}
        target-position={[5, 1, -2.5]}
        intensity={isNight ? 1.6 : 2.0}
        color={isNight ? '#1e3a8a' : '#ffffff'}
        angle={Math.PI / 7}
        penumbra={0.3}
        distance={7}
      />
      
      {/* Information Wall Highlighting */}
      <spotLight
        position={[0, 4, -3.5]}
        target-position={[0, 2.2, -3.9]}
        intensity={isNight ? 1.9 : 2.3}
        color={isNight ? '#81c784' : '#ffffff'}
        angle={Math.PI / 6}
        penumbra={0.2}
        distance={6}
      />
      
      {/* Currency Exchange Lighting - Updated position */}
      <spotLight
        position={[2.5, 3, 0]}
        target-position={[2.5, 0.6, -0.8]}
        intensity={isNight ? 1.5 : 1.8}
        color={isNight ? '#f39c12' : '#ffffff'}
        angle={Math.PI / 8}
        penumbra={0.3}
        distance={5}
      />
      
      {/* VIP Wall Lighting */}
      <spotLight
        position={[5.5, 3.5, 1]}
        target-position={[5.8, 2.2, 0.8]}
        intensity={isNight ? 1.7 : 2.1}
        color={isNight ? '#9b59b6' : '#ffffff'}
        angle={Math.PI / 9}
        penumbra={0.2}
        distance={5}
      />
      
      {/* Lost & Found Station Lighting - Updated position */}
      <pointLight
        position={[4.2, 2.5, 2.8]}
        intensity={isNight ? 1.3 : 1.6}
        color={isNight ? '#34495e' : '#ffffff'}
        distance={4}
      />
      
      {/* Business Cards & Voucher Display Lighting - Updated positions */}
      <pointLight
        position={[1.5, 2, 3.2]}
        intensity={isNight ? 1.2 : 1.5}
        color={isNight ? '#e67e22' : '#ffffff'}
        distance={4}
      />
      
      <pointLight
        position={[-1.5, 2, 3.8]}
        intensity={isNight ? 1.2 : 1.5}
        color={isNight ? '#8b0000' : '#ffffff'}
        distance={4}
      />
      
      {/* Guest Amenities Lighting - Updated position */}
      <spotLight
        position={[-4, 3, 3.5]}
        target-position={[-4, 0.6, 3.2]}
        intensity={isNight ? 1.6 : 1.9}
        color={isNight ? '#3498db' : '#ffffff'}
        angle={Math.PI / 6}
        penumbra={0.4}
        distance={6}
      />
      
      {/* Emergency Panel Lighting */}
      <pointLight
        position={[-5.8, 2.5, 2]}
        intensity={isNight ? 1.4 : 1.7}
        color={isNight ? '#e74c3c' : '#ffffff'}
        distance={4}
      />
      
      {/* GUEST FEEDBACK & SUGGESTION BOX - Better positioned with space */}
      <group position={[0, 0, 3.5]}>
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 1.4, 0.5]} />
          <meshStandardMaterial color="#8B0000" roughness={0.3} />
        </mesh>
        
        {/* Suggestion slot */}
        <mesh position={[0, 1.05, 0.26]} castShadow>
          <boxGeometry args={[0.35, 0.06, 0.03]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Feedback forms holder */}
        <mesh position={[0, 0.45, 0.26]} castShadow>
          <boxGeometry args={[0.4, 0.35, 0.06]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        
        {/* Feedback pen holder */}
        <mesh position={[0.18, 0.75, 0.26]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.15, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} />
        </mesh>
      </group>


      {/* CONCIERGE AREA FLOOR - Expanded Premium Marble */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial 
          color="#FFFAF0" 
          roughness={0.05} 
          metalness={0.4}
          envMapIntensity={0.8}
        />
      </mesh>
      
      {/* Decorative Area Rug - Larger and centered */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial 
          color="#8B0000" 
          roughness={0.8} 
          normalScale={[0.3, 0.3]}
        />
      </mesh>
      
      {/* CONCIERGE AREA WALLS - Expanded */}
      {/* Back wall */}
      <mesh position={[0, 1.8, -4]} receiveShadow>
        <boxGeometry args={[12, 3.6, 0.2]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.6} />
      </mesh>
      
      {/* Left wall */}
      <mesh position={[-6, 1.8, 0]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 8]} />
        <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
      </mesh>
      
      {/* Right wall */}
      <mesh position={[6, 1.8, 0]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 8]} />
        <meshStandardMaterial color="#FFFAF0" roughness={0.6} />
      </mesh>
      
      {/* Corner connections */}
      <mesh position={[-5.9, 1.8, -3.9]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 0.2]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.6} />
      </mesh>
      
      <mesh position={[5.9, 1.8, -3.9]} receiveShadow>
        <boxGeometry args={[0.2, 3.6, 0.2]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.6} />
      </mesh>

      {/* Ceiling - Expanded */}
      <mesh position={[0, 3.6, 0]} receiveShadow>
        <boxGeometry args={[12, 0.2, 8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
      </mesh>
      
      {/* MAIN CONCIERGE DESK - Repositioned for better flow */}
      <group position={[-3, 0, -1.5]}>
        {/* Main desk section */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 1.2, 1]} />
          <meshStandardMaterial color="#654321" roughness={0.3} metalness={0.1} />
        </mesh>
        
        {/* Extension wing */}
        <mesh position={[1.2, 0.6, -0.8]} castShadow receiveShadow>
          <boxGeometry args={[1, 1.2, 1.2]} />
          <meshStandardMaterial color="#654321" roughness={0.3} metalness={0.1} />
        </mesh>
        
        {/* Marble countertops */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.1, 0.1, 1.1]} />
          <meshStandardMaterial color="#DCDCDC" roughness={0.05} metalness={0.3} />
        </mesh>
        
        <mesh position={[1.2, 1.2, -0.8]} castShadow receiveShadow>
          <boxGeometry args={[1.1, 0.1, 1.3]} />
          <meshStandardMaterial color="#DCDCDC" roughness={0.05} metalness={0.3} />
        </mesh>
        
        {/* Computer workstation */}
        <mesh position={[-0.8, 1.35, 0]} castShadow>
          <boxGeometry args={[0.6, 0.4, 0.06]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Concierge nameplate */}
        <mesh position={[0.4, 1.28, 0.4]} castShadow>
          <boxGeometry args={[0.4, 0.18, 0.03]} />
          <meshStandardMaterial color="#B8860B" metalness={0.9} />
        </mesh>
        
        {/* Multi-line phone system */}
        <mesh position={[1, 1.28, -0.3]} castShadow>
          <boxGeometry args={[0.18, 0.1, 0.15]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
        
        <mesh position={[1, 1.28, -0.6]} castShadow>
          <boxGeometry args={[0.25, 0.12, 0.18]} />
          <meshStandardMaterial color="#34495E" />
        </mesh>
        
        {/* PRINTER/DOCUMENT STATION */}
        <mesh position={[1.5, 1.28, -1.2]} castShadow>
          <boxGeometry args={[0.4, 0.18, 0.3]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
        
        {/* Paper tray */}
        <mesh position={[1.5, 1.2, -1.2]} castShadow>
          <boxGeometry args={[0.35, 0.03, 0.25]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        
        {/* FILING SYSTEM - Better positioned */}
        <mesh position={[-1.5, 0.8, -0.8]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 1.6, 0.5]} />
          <meshStandardMaterial color="#8B4513" roughness={0.4} />
        </mesh>
        
        {/* File drawers */}
        <mesh position={[-1.5, 1.3, -0.79]} castShadow>
          <boxGeometry args={[0.35, 0.35, 0.03]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-1.5, 0.9, -0.79]} castShadow>
          <boxGeometry args={[0.35, 0.35, 0.03]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-1.5, 0.5, -0.79]} castShadow>
          <boxGeometry args={[0.35, 0.35, 0.03]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        
        {/* RESERVATION SYSTEM TERMINALS */}
        <mesh position={[-0.4, 1.35, -0.4]} castShadow>
          <boxGeometry args={[0.5, 0.3, 0.06]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Tablet for guest services */}
        <mesh position={[0.6, 1.3, -0.3]} castShadow>
          <boxGeometry args={[0.18, 0.25, 0.03]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        {/* SAFE/SECURE STORAGE */}
        <mesh position={[0, 0.35, -0.8]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.7, 0.5]} />
          <meshStandardMaterial color="#2C3E50" metalness={0.8} />
        </mesh>
        
        {/* Professional office chair */}
        <group position={[0, 0, -1.2]}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.8, 8]} />
            <meshStandardMaterial color="#2C3E50" />
          </mesh>
          <mesh position={[0, 0.85, 0.25]} castShadow>
            <boxGeometry args={[0.6, 0.9, 0.12]} />
            <meshStandardMaterial color="#34495E" />
          </mesh>
          <mesh position={[0, 0.55, 0]} castShadow>
            <boxGeometry args={[0.55, 0.12, 0.45]} />
            <meshStandardMaterial color="#34495E" />
          </mesh>
        </group>
      </group>
      
      {/* TRAVEL PLANNING CONSULTATION AREA - Relocated to spacious corner */}
      <group position={[3.5, 0, 2.5]}>
        {/* Privacy partition */}
        <mesh position={[0, 1, -1]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 2, 0.15]} />
          <meshStandardMaterial color="#8B4513" roughness={0.4} />
        </mesh>
        
        {/* Glass panel for openness */}
        <mesh position={[0, 1.6, -0.99]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 1.2, 0.03]} />
          <meshStandardMaterial color="#E0E0E0" transparent opacity={0.4} />
        </mesh>
        
        {/* Round consultation table - larger */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.8, 0.9, 12]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} />
        </mesh>
        
        {/* Table top */}
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.85, 0.85, 0.06, 12]} />
          <meshStandardMaterial color="#DEB887" roughness={0.2} metalness={0.1} />
        </mesh>
        
        {/* Client chairs - Premium comfort with more space */}
        <group position={[1.1, 0, 0]}>
          <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#8B0000" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.7, -0.25]} castShadow receiveShadow>
            <boxGeometry args={[0.6, 0.7, 0.12]} />
            <meshStandardMaterial color="#8B0000" roughness={0.7} />
          </mesh>
          {/* Armrests */}
          <mesh position={[-0.25, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.1, 0.4, 0.5]} />
            <meshStandardMaterial color="#654321" roughness={0.7} />
          </mesh>
          <mesh position={[0.25, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.1, 0.4, 0.5]} />
            <meshStandardMaterial color="#654321" roughness={0.7} />
          </mesh>
        </group>
        
        <group position={[-1.1, 0, 0]}>
          <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#8B0000" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.7, -0.25]} castShadow receiveShadow>
            <boxGeometry args={[0.6, 0.7, 0.12]} />
            <meshStandardMaterial color="#8B0000" roughness={0.7} />
          </mesh>
          {/* Armrests */}
          <mesh position={[-0.25, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.1, 0.4, 0.5]} />
            <meshStandardMaterial color="#654321" roughness={0.7} />
          </mesh>
          <mesh position={[0.25, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.1, 0.4, 0.5]} />
            <meshStandardMaterial color="#654321" roughness={0.7} />
          </mesh>
        </group>
        
        {/* Travel planning materials */}
        <mesh position={[0.3, 0.96, 0.3]} castShadow>
          <boxGeometry args={[0.25, 0.02, 0.18]} />
          <meshStandardMaterial color="#87CEEB" />
        </mesh>
        
        <mesh position={[-0.3, 0.96, -0.15]} castShadow>
          <boxGeometry args={[0.3, 0.02, 0.25]} />
          <meshStandardMaterial color="#90EE90" />
        </mesh>
        
        {/* Consultation desk lamp */}
        <mesh position={[0.5, 1.25, -0.4]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.35, 8]} />
          <meshStandardMaterial color="#BDC3C7" metalness={0.8} />
        </mesh>
        
        <mesh position={[0.5, 1.42, -0.4]} castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial 
            color={isNight ? "#FFE082" : "#F0F0F0"}
            emissive={isNight ? "#FFD700" : "#000000"}
            emissiveIntensity={isNight ? 0.5 : 0}
          />
        </mesh>
      </group>
      
      {/* ACTIVITY BOOKING STATION - Relocated and expanded */}
      <group position={[5, 0, -2.5]}>
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 1.8, 0.5]} />
          <meshStandardMaterial color="#2C3E50" roughness={0.2} />
        </mesh>
        
        {/* Multiple activity screens */}
        <mesh position={[0, 1.4, 0.26]} castShadow>
          <boxGeometry args={[0.8, 0.5, 0.03]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        <mesh position={[0, 0.8, 0.26]} castShadow>
          <boxGeometry args={[0.8, 0.4, 0.03]} />
          <meshStandardMaterial color="#1E3A8A" emissive="#1E3A8A" emissiveIntensity={0.3} />
        </mesh>
        
        {/* Interactive panel */}
        <mesh position={[0, 0.3, 0.26]} castShadow>
          <boxGeometry args={[0.6, 0.25, 0.03]} />
          <meshStandardMaterial color="#059669" emissive="#059669" emissiveIntensity={0.2} />
        </mesh>
      </group>
      
      {/* TRANSPORTATION & AIRPORT SHUTTLE INFO - Relocated */}
      <group position={[-4.5, 2.5, -2]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.5, 1, 0.12]} />
          <meshStandardMaterial color="#34495E" />
        </mesh>
        <mesh position={[0, 0, 0.06]} castShadow>
          <boxGeometry args={[1.4, 0.9, 0.03]} />
          <meshStandardMaterial color="#ECF0F1" />
        </mesh>
        {/* Schedule displays */}
        <mesh position={[-0.3, 0.2, 0.07]} castShadow>
          <boxGeometry args={[0.4, 0.18, 0.02]} />
          <meshStandardMaterial color="#F39C12" />
        </mesh>
        <mesh position={[0.3, 0.2, 0.07]} castShadow>
          <boxGeometry args={[0.4, 0.18, 0.02]} />
          <meshStandardMaterial color="#E74C3C" />
        </mesh>
      </group>
      
      {/* CURRENCY EXCHANGE COUNTER - Better positioned with clear spacing */}
      <group position={[2.5, 0, -0.8]}>
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.2, 0.7]} />
          <meshStandardMaterial color="#8B4513" roughness={0.4} />
        </mesh>
        
        {/* Exchange rate display */}
        <mesh position={[0, 1.3, 0.36]} castShadow>
          <boxGeometry args={[1, 0.4, 0.03]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Security glass */}
        <mesh position={[0, 1.5, 0.36]} castShadow>
          <boxGeometry args={[1.1, 0.8, 0.03]} />
          <meshStandardMaterial color="#E0E0E0" transparent opacity={0.3} />
        </mesh>
      </group>
      
      {/* LOCAL ATTRACTIONS & TOURS INFORMATION WALL - Repositioned */}
      <group position={[0, 2.2, -3.9]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[4, 1.4, 0.12]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
        <mesh position={[0, 0, 0.06]} castShadow>
          <boxGeometry args={[3.8, 1.3, 0.03]} />
          <meshStandardMaterial color="#ECF0F1" />
        </mesh>
        
        {/* Tour package displays */}
        <mesh position={[-1.2, 0.3, 0.07]} castShadow>
          <boxGeometry args={[0.5, 0.4, 0.02]} />
          <meshStandardMaterial color="#9B59B6" />
        </mesh>
        <mesh position={[0, 0.3, 0.07]} castShadow>
          <boxGeometry args={[0.5, 0.4, 0.02]} />
          <meshStandardMaterial color="#E67E22" />
        </mesh>
        <mesh position={[1.2, 0.3, 0.07]} castShadow>
          <boxGeometry args={[0.5, 0.4, 0.02]} />
          <meshStandardMaterial color="#27AE60" />
        </mesh>
        
        {/* Map display */}
        <mesh position={[0, -0.4, 0.07]} castShadow>
          <boxGeometry args={[3.2, 0.5, 0.02]} />
          <meshStandardMaterial color="#3498DB" />
        </mesh>
      </group>
      
      {/* CONCIERGE SUPPLIES CABINET - Better corner position */}
      <group position={[-5.2, 0, -3]}>
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 2, 0.5]} />
          <meshStandardMaterial color="#8B4513" roughness={0.4} />
        </mesh>
        
        {/* Cabinet doors */}
        <mesh position={[-0.41, 1.3, 0]} castShadow>
          <boxGeometry args={[0.03, 1, 0.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-0.41, 0.7, 0]} castShadow>
          <boxGeometry args={[0.03, 1, 0.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        
        {/* Cabinet handles */}
        <mesh position={[-0.44, 1.4, 0.12]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.06, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} />
        </mesh>
        <mesh position={[-0.44, 0.8, 0.12]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.06, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} />
        </mesh>
      </group>

      {/* VIP GUEST RECOGNITION WALL - Better positioned */}
      <group position={[5.8, 2.2, 0.8]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.12, 1.8, 1.5]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
        <mesh position={[0.06, 0, 0]} castShadow>
          <boxGeometry args={[0.03, 1.7, 1.4]} />
          <meshStandardMaterial color="#ECF0F1" />
        </mesh>
        
        {/* VIP guest photos/cards */}
        <mesh position={[0.07, 0.5, 0.4]} castShadow>
          <boxGeometry args={[0.02, 0.4, 0.25]} />
          <meshStandardMaterial color="#F39C12" />
        </mesh>
        <mesh position={[0.07, 0.5, 0]} castShadow>
          <boxGeometry args={[0.02, 0.4, 0.25]} />
          <meshStandardMaterial color="#9B59B6" />
        </mesh>
        <mesh position={[0.07, 0.5, -0.4]} castShadow>
          <boxGeometry args={[0.02, 0.4, 0.25]} />
          <meshStandardMaterial color="#E74C3C" />
        </mesh>
      </group>

      {/* EMERGENCY COMMUNICATION PANEL - Corner placement */}
      <group position={[-5.8, 1.8, 2]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.12, 0.8, 0.5]} />
          <meshStandardMaterial color="#E74C3C" />
        </mesh>
        
        {/* Emergency buttons */}
        <mesh position={[0.06, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.03, 8]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0.06, 0, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.03, 8]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
        <mesh position={[0.06, -0.25, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.03, 8]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
      </group>

      {/* WEATHER & TIDE INFORMATION DISPLAY - Wall mounted with space */}
      <group position={[-3, 2.5, -3.8]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.5, 0.8, 0.12]} />
          <meshStandardMaterial color="#3498DB" />
        </mesh>
        <mesh position={[0, 0, 0.06]} castShadow>
          <boxGeometry args={[1.4, 0.7, 0.03]} />
          <meshStandardMaterial color="#87CEEB" />
        </mesh>
        
        {/* Weather icons */}
        <mesh position={[-0.35, 0.15, 0.07]} castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0.35, 0.15, 0.07]} castShadow>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#1E88E5" />
        </mesh>
      </group>

      {/* LOCAL BUSINESS CARDS DISPLAY RACK - Repositioned to avoid overlap */}
      <group position={[1.5, 0.95, 3.2]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 0.6, 0.18]} />
          <meshStandardMaterial color="#8B4513" roughness={0.4} />
        </mesh>
        
        {/* Card slots */}
        <mesh position={[0, 0.12, 0.1]} castShadow>
          <boxGeometry args={[0.9, 0.35, 0.03]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        
        {/* Sample business cards */}
        <mesh position={[-0.25, 0.12, 0.11]} castShadow>
          <boxGeometry args={[0.12, 0.08, 0.02]} />
          <meshStandardMaterial color="#E74C3C" />
        </mesh>
        <mesh position={[0, 0.12, 0.11]} castShadow>
          <boxGeometry args={[0.12, 0.08, 0.02]} />
          <meshStandardMaterial color="#27AE60" />
        </mesh>
        <mesh position={[0.25, 0.12, 0.11]} castShadow>
          <boxGeometry args={[0.12, 0.08, 0.02]} />
          <meshStandardMaterial color="#3498DB" />
        </mesh>
      </group>

      {/* LOST & FOUND STATION - Repositioned with better spacing */}
      <group position={[4.2, 0, 2.8]}>
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 1.4, 1]} />
          <meshStandardMaterial color="#34495E" roughness={0.4} />
        </mesh>
        
        {/* Secure lock box */}
        <mesh position={[0, 0.9, 0.51]} castShadow>
          <boxGeometry args={[0.8, 1, 0.03]} />
          <meshStandardMaterial color="#2C3E50" metalness={0.7} />
        </mesh>
        
        {/* Digital lock */}
        <mesh position={[0.25, 0.9, 0.52]} castShadow>
          <boxGeometry args={[0.18, 0.12, 0.03]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>

      {/* GIFT VOUCHER & EXPERIENCE DISPLAY - Moved to avoid z-axis conflict */}
      <group position={[-1.5, 0.95, 3.8]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.7, 0.25]} />
          <meshStandardMaterial color="#8B0000" roughness={0.3} />
        </mesh>
        
        {/* Voucher display slots */}
        <mesh position={[0, 0.06, 0.13]} castShadow>
          <boxGeometry args={[1.1, 0.5, 0.03]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
        
        {/* Sample vouchers */}
        <mesh position={[-0.3, 0.06, 0.14]} castShadow>
          <boxGeometry args={[0.25, 0.15, 0.02]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
        <mesh position={[0, 0.06, 0.14]} castShadow>
          <boxGeometry args={[0.25, 0.15, 0.02]} />
          <meshStandardMaterial color="#FF6B6B" />
        </mesh>
        <mesh position={[0.3, 0.06, 0.14]} castShadow>
          <boxGeometry args={[0.25, 0.15, 0.02]} />
          <meshStandardMaterial color="#4ECDC4" />
        </mesh>
      </group>
      
      {/* GUEST WAITING AMENITIES STATION - Optimized corner position */}
      <group position={[-4, 0, 3.2]}>
        {/* Water station */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.18, 0.18, 1.2, 12]} />
          <meshStandardMaterial color="#3498DB" roughness={0.2} />
        </mesh>
        
        {/* Water dispenser tap */}
        <mesh position={[0.19, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.1, 8]} />
          <meshStandardMaterial color="#BDC3C7" metalness={0.8} />
        </mesh>
        
        {/* Cup dispenser */}
        <mesh position={[-0.25, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.35, 8]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        
        {/* Magazine rack - well spaced */}
        <mesh position={[0.5, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 1, 0.12]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} />
        </mesh>
        
        {/* Magazines */}
        <mesh position={[0.5, 0.6, 0.07]} castShadow>
          <boxGeometry args={[0.3, 0.18, 0.03]} />
          <meshStandardMaterial color="#E67E22" />
        </mesh>
        <mesh position={[0.5, 0.4, 0.07]} castShadow>
          <boxGeometry args={[0.3, 0.18, 0.03]} />
          <meshStandardMaterial color="#9B59B6" />
        </mesh>
        <mesh position={[0.5, 0.2, 0.07]} castShadow>
          <boxGeometry args={[0.3, 0.18, 0.03]} />
          <meshStandardMaterial color="#27AE60" />
        </mesh>
      </group>
      
      {/* CEILING FIXTURE - Elegant Crystal Chandelier */}
      <group position={[0, 3.2, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.5, 12]} />
          <meshStandardMaterial 
            color={isNight ? "#FFD700" : "#FFFFFF"}
            emissive={isNight ? "#FFD700" : "#F5F5DC"}
            emissiveIntensity={isNight ? 0.8 : 0.3}
            metalness={0.9}
            roughness={0.05}
          />
        </mesh>
        
        {/* Decorative crystal elements */}
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh key={i} position={[Math.cos(i * Math.PI / 5) * 0.5, -0.2, Math.sin(i * Math.PI / 5) * 0.5]} castShadow>
            <sphereGeometry args={[0.08, 12, 12]} />
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
      </group>
      
      {/* Premium Night Mode Enhancement */}
      {isNight && (
        <>
          {/* Main chandelier glow */}
          <pointLight
            position={[0, 3.2, 0]}
            intensity={2.8}
            color="#ffd54f"
            distance={10}
            decay={0.8}
          />
          
          {/* Desk task lighting */}
          <pointLight
            position={[-2, 2, 0]}
            intensity={1.5}
            color="#ffab40"
            distance={4}
          />
          
          {/* Consultation area mood lighting */}
          <pointLight
            position={[2, 1.5, 1.5]}
            intensity={1.2}
            color="#81c784"
            distance={5}
          />
          
          {/* Information wall backlighting */}
          <pointLight
            position={[0, 1.5, -2.5]}
            intensity={1.0}
            color="#64b5f6"
            distance={6}
          />
          
          {/* Filing system accent light */}
          <pointLight
            position={[-1.1, 1.5, -0.6]}
            intensity={0.8}
            color="#8b4513"
            distance={3}
          />
          
          {/* VIP wall glamour lighting */}
          <pointLight
            position={[3.8, 2.5, 0.5]}
            intensity={1.2}
            color="#9b59b6"
            distance={4}
          />
          
          {/* Emergency panel warning light */}
          <pointLight
            position={[-3.8, 2, 1]}
            intensity={0.9}
            color="#e74c3c"
            distance={3}
          />
          
          {/* Supplies cabinet utility light */}
          <pointLight
            position={[-3.5, 1.8, -2]}
            intensity={0.7}
            color="#f39c12"
            distance={3}
          />
          
          {/* Lost & found security light - Updated position */}
          <pointLight
            position={[4.2, 1.5, 2.8]}
            intensity={1.0}
            color="#2c3e50"
            distance={4}
          />
          
          {/* Guest amenities warm lighting - Updated position */}
          <pointLight
            position={[-4, 2, 3.2]}
            intensity={1.1}
            color="#3498db"
            distance={4}
          />
          
          {/* Gift voucher display accent - Updated position */}
          <pointLight
            position={[-1.5, 1.5, 3.8]}
            intensity={0.9}
            color="#ffd700"
            distance={3}
          />
          
          {/* Business cards lighting - Updated position */}
          <pointLight
            position={[1.5, 1.5, 3.2]}
            intensity={0.8}
            color="#8b4513"
            distance={3}
          />
        </>
      )}
    </group>
  );
}