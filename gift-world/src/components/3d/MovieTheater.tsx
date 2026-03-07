'use client';

import { useRef } from 'react';
import * as THREE from 'three';

export function MovieTheater() {
  const groupRef = useRef(null);

  return (
    <group ref={groupRef}>
      {/* ENHANCED LIGHTING - Balanced cinematic atmosphere */}
      <ambientLight intensity={0.4} />
      <hemisphereLight 
        color="#2a3a4e" 
        groundColor="#1a1a2f" 
        intensity={0.5} 
      />
      
      {/* General fill lights for visibility */}
      <directionalLight 
        position={[0, 8, 5]} 
        intensity={0.6} 
        color="#6a7a9a" 
        castShadow 
      />

      {/* TEXTURED WALLS WITH ACOUSTIC PANELS */}
      {/* Left wall with fabric panels */}
      <mesh position={[-6, 1.8, 0]} scale={[0.15, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial 
          color="#1a0d0d" 
          roughness={0.95} 
          metalness={0.0}
        />
      </mesh>
      {/* Right wall with fabric panels */}
      <mesh position={[6, 1.8, 0]} scale={[0.15, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial 
          color="#1a0d0d" 
          roughness={0.95} 
          metalness={0.0}
        />
      </mesh>
      {/* Back wall - darker for screen contrast */}
      <mesh position={[0, 1.8, -4]} scale={[12, 3.6, 0.15]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial 
          color="#000000" 
          roughness={0.9} 
          metalness={0.0}
        />
      </mesh>

      {/* ACOUSTIC WALL PANELS - Left side */}
      {[-5.9, -5.9, -5.9].map((x, idx) => (
        [-2, 0, 2].map((z, panelIdx) => (
          <mesh 
            key={`panel-left-${idx}-${panelIdx}`} 
            position={[x, 1.8, z]} 
            receiveShadow
          >
            <boxGeometry args={[0.05, 0.8, 0.8]} />
            <meshStandardMaterial 
              color="#2a1a1a" 
              roughness={0.95} 
              metalness={0.0}
            />
          </mesh>
        ))
      ))}

      {/* ACOUSTIC WALL PANELS - Right side */}
      {[5.9, 5.9, 5.9].map((x, idx) => (
        [-2, 0, 2].map((z, panelIdx) => (
          <mesh 
            key={`panel-right-${idx}-${panelIdx}`} 
            position={[x, 1.8, z]} 
            receiveShadow
          >
            <boxGeometry args={[0.05, 0.8, 0.8]} />
            <meshStandardMaterial 
              color="#2a1a1a" 
              roughness={0.95} 
              metalness={0.0}
            />
          </mesh>
        ))
      ))}

      {/* CEILING WITH RECESSED DETAILS */}
      <mesh position={[0, 3.5, 0]} scale={[12, 0.15, 8]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial 
          color="#0a0a0a" 
          roughness={0.8} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Ceiling crown molding - front */}
      <mesh position={[0, 3.4, 3.9]} receiveShadow>
        <boxGeometry args={[12, 0.12, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.2} />
      </mesh>
      
      {/* Ceiling panels/coffers for depth */}
      {[-3, 0, 3].map((x, idx) => (
        [-2, 0, 2].map((z, zIdx) => (
          <mesh key={`ceiling-panel-${idx}-${zIdx}`} position={[x, 3.42, z]} receiveShadow>
            <boxGeometry args={[2.5, 0.08, 2.5]} />
            <meshStandardMaterial 
              color="#050505" 
              roughness={0.9} 
              metalness={0.05}
            />
          </mesh>
        ))
      ))}

      {/* REALISTIC CARPET FLOOR - with pattern texture simulation */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial 
          color="#1a0808" 
          roughness={0.95} 
          metalness={0.0}
        />
      </mesh>
      
      {/* Carpet pattern strips */}
      {[-4, -2, 0, 2, 4].map((x, idx) => (
        <mesh 
          key={`carpet-stripe-${idx}`} 
          position={[x, 0.01, 0]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          receiveShadow
        >
          <planeGeometry args={[0.3, 8]} />
          <meshStandardMaterial 
            color="#2a0a0a" 
            roughness={0.95} 
            metalness={0.0}
            opacity={0.6}
            transparent
          />
        </mesh>
      ))}

      {/* STAGE PLATFORM UNDER SCREEN */}
      <mesh position={[0, 0.15, -3.7]} receiveShadow>
        <boxGeometry args={[11.5, 0.3, 0.8]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          roughness={0.6} 
          metalness={0.2}
        />
      </mesh>

      {/* MOVIE SCREEN - Premium theater screen */}
      <group position={[0, 1.9, -3.88]}>
        {/* Screen frame - elegant black frame */}
        <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
          <boxGeometry args={[11.2, 2.8, 0.12]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            roughness={0.3} 
            metalness={0.3} 
          />
        </mesh>
        
        {/* Inner frame accent - brushed metal */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[11, 2.6, 0.1]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            roughness={0.4} 
            metalness={0.5} 
          />
        </mesh>
        
        {/* Screen surface - bright white with subtle texture */}
        <mesh position={[0, 0, 0.06]} castShadow>
          <boxGeometry args={[10.6, 2.4, 0.02]} />
          <meshStandardMaterial 
            color="#f5f5f5" 
            roughness={0.15} 
            metalness={0.0}
          />
        </mesh>
        
        {/* Projected content glow - cinematic blue */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[10.5, 2.35, 0.01]} />
          <meshStandardMaterial 
            color="#87ceeb" 
            emissive="#5b9bd5" 
            emissiveIntensity={1.2} 
            roughness={0.1} 
            metalness={0.0}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Screen speakers - left and right */}
        {[-5.3, 5.3].map((x, idx) => (
          <mesh key={`speaker-${idx}`} position={[x, 0, 0.05]} castShadow>
            <boxGeometry args={[0.4, 2.2, 0.2]} />
            <meshStandardMaterial 
              color="#0a0a0a" 
              roughness={0.8} 
              metalness={0.1}
            />
          </mesh>
        ))}
        
        {/* Center channel speaker */}
        <mesh position={[0, -1.05, 0.05]} castShadow>
          <boxGeometry args={[1.5, 0.3, 0.2]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            roughness={0.8} 
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* SCREEN CURTAINS - Velvet drapes */}
      {/* Left curtain */}
      <mesh position={[-5.4, 1.9, -3.75]} receiveShadow>
        <boxGeometry args={[0.6, 3.2, 0.15]} />
        <meshStandardMaterial 
          color="#4a0a0a" 
          roughness={0.85} 
          metalness={0.0}
        />
      </mesh>
      
      {/* Right curtain */}
      <mesh position={[5.4, 1.9, -3.75]} receiveShadow>
        <boxGeometry args={[0.6, 3.2, 0.15]} />
        <meshStandardMaterial 
          color="#4a0a0a" 
          roughness={0.85} 
          metalness={0.0}
        />
      </mesh>
      
      {/* Valance - top decorative curtain */}
      <mesh position={[0, 3.3, -3.75]} receiveShadow>
        <boxGeometry args={[11.5, 0.4, 0.15]} />
        <meshStandardMaterial 
          color="#4a0a0a" 
          roughness={0.85} 
          metalness={0.0}
        />
      </mesh>

      {/* SCREEN WASH LIGHTS - Illuminate the screen edges */}
      <pointLight 
        position={[0, 3.2, -3.5]} 
        intensity={2.5} 
        distance={8}
        color="#87ceeb" 
        castShadow 
      />
      <spotLight
        position={[0, 3.2, -2]}
        target-position={[0, 1.9, -3.88]}
        angle={Math.PI / 4}
        penumbra={0.3}
        intensity={3.5}
        distance={6}
        color="#a0d8f0"
        castShadow
      />
      
      {/* Additional screen area lights */}
      <pointLight 
        position={[-4, 2.5, -3.5]} 
        intensity={1.5} 
        distance={6}
        color="#87ceeb" 
      />
      <pointLight 
        position={[4, 2.5, -3.5]} 
        intensity={1.5} 
        distance={6}
        color="#87ceeb" 
      />

      {/* PREMIUM THEATER SEATING - Plush reclining seats */}
      {/* SEATING SECTION 1 - Left side */}
      {[0, 1.6, 3.2].map((z, rowIdx) => (
        [-3.8, -2.2, -0.6].map((x, seatIdx) => (
          <group key={`seat-l-${rowIdx}-${seatIdx}`} position={[x, 0.35, 1.0 + z]}>
            {/* Seat base - plush cushion */}
            <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.18, 0.55]} />
              <meshStandardMaterial 
                color="#5a0a0a" 
                roughness={0.8} 
                metalness={0.0}
              />
            </mesh>
            
            {/* Seat cushion detail */}
            <mesh position={[0, 0.29, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.48, 0.05, 0.53]} />
              <meshStandardMaterial 
                color="#6a1010" 
                roughness={0.85} 
                metalness={0.0}
              />
            </mesh>
            
            {/* Backrest - tall and padded */}
            <mesh position={[0, 0.52, 0.22]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.45, 0.12]} />
              <meshStandardMaterial 
                color="#5a0a0a" 
                roughness={0.8} 
                metalness={0.0}
              />
            </mesh>
            
            {/* Headrest padding */}
            <mesh position={[0, 0.73, 0.22]} castShadow receiveShadow>
              <boxGeometry args={[0.35, 0.15, 0.1]} />
              <meshStandardMaterial 
                color="#6a1010" 
                roughness={0.85} 
                metalness={0.0}
              />
            </mesh>
            
            {/* Armrest right */}
            <mesh position={[0.28, 0.4, 0.08]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.32, 0.35]} />
              <meshStandardMaterial 
                color="#1a1a1a" 
                roughness={0.4} 
                metalness={0.2}
              />
            </mesh>
            
            {/* Armrest left */}
            <mesh position={[-0.28, 0.4, 0.08]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.32, 0.35]} />
              <meshStandardMaterial 
                color="#1a1a1a" 
                roughness={0.4} 
                metalness={0.2}
              />
            </mesh>
            
            {/* Cup holder on right armrest */}
            <mesh position={[0.28, 0.55, 0.1]} castShadow receiveShadow>
              <cylinderGeometry args={[0.045, 0.05, 0.08, 16]} />
              <meshStandardMaterial 
                color="#0a0a0a" 
                roughness={0.3} 
                metalness={0.4}
              />
            </mesh>
            
            {/* Seat base structure */}
            <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.52, 0.08, 0.5]} />
              <meshStandardMaterial 
                color="#0a0a0a" 
                roughness={0.5} 
                metalness={0.3}
              />
            </mesh>
          </group>
        ))
      ))}

      {/* SEATING SECTION 2 - Center */}
      {[0, 1.6, 3.2].map((z, rowIdx) => (
        [-1.0, 0.2, 1.4].map((x, seatIdx) => (
          <group key={`seat-c-${rowIdx}-${seatIdx}`} position={[x, 0.35, 1.0 + z]}>
            {/* Seat base - plush cushion */}
            <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.18, 0.55]} />
              <meshStandardMaterial 
                color="#5a0a0a" 
                roughness={0.8} 
                metalness={0.0}
              />
            </mesh>
            
            {/* Seat cushion detail */}
            <mesh position={[0, 0.29, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.48, 0.05, 0.53]} />
              <meshStandardMaterial 
                color="#6a1010" 
                roughness={0.85} 
                metalness={0.0}
              />
            </mesh>
            
            {/* Backrest */}
            <mesh position={[0, 0.52, 0.22]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.45, 0.12]} />
              <meshStandardMaterial 
                color="#5a0a0a" 
                roughness={0.8} 
                metalness={0.0}
              />
            </mesh>
            
            {/* Headrest padding */}
            <mesh position={[0, 0.73, 0.22]} castShadow receiveShadow>
              <boxGeometry args={[0.35, 0.15, 0.1]} />
              <meshStandardMaterial 
                color="#6a1010" 
                roughness={0.85} 
                metalness={0.0}
              />
            </mesh>
            
            {/* Armrest right */}
            <mesh position={[0.28, 0.4, 0.08]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.32, 0.35]} />
              <meshStandardMaterial 
                color="#1a1a1a" 
                roughness={0.4} 
                metalness={0.2}
              />
            </mesh>
            
            {/* Cup holder */}
            <mesh position={[0.28, 0.55, 0.1]} castShadow receiveShadow>
              <cylinderGeometry args={[0.045, 0.05, 0.08, 16]} />
              <meshStandardMaterial 
                color="#0a0a0a" 
                roughness={0.3} 
                metalness={0.4}
              />
            </mesh>
            
            {/* Seat base structure */}
            <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.52, 0.08, 0.5]} />
              <meshStandardMaterial 
                color="#0a0a0a" 
                roughness={0.5} 
                metalness={0.3}
              />
            </mesh>
          </group>
        ))
      ))}

      {/* SEATING SECTION 3 - Right side */}
      {[0, 1.6, 3.2].map((z, rowIdx) => (
        [0.6, 2.2, 3.8].map((x, seatIdx) => (
          <group key={`seat-r-${rowIdx}-${seatIdx}`} position={[x, 0.35, 1.0 + z]}>
            {/* Seat base */}
            <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.18, 0.55]} />
              <meshStandardMaterial 
                color="#5a0a0a" 
                roughness={0.8} 
                metalness={0.0}
              />
            </mesh>
            
            {/* Seat cushion detail */}
            <mesh position={[0, 0.29, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.48, 0.05, 0.53]} />
              <meshStandardMaterial 
                color="#6a1010" 
                roughness={0.85} 
                metalness={0.0}
              />
            </mesh>
            
            {/* Backrest */}
            <mesh position={[0, 0.52, 0.22]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.45, 0.12]} />
              <meshStandardMaterial 
                color="#5a0a0a" 
                roughness={0.8} 
                metalness={0.0}
              />
            </mesh>
            
            {/* Headrest */}
            <mesh position={[0, 0.73, 0.22]} castShadow receiveShadow>
              <boxGeometry args={[0.35, 0.15, 0.1]} />
              <meshStandardMaterial 
                color="#6a1010" 
                roughness={0.85} 
                metalness={0.0}
              />
            </mesh>
            
            {/* Armrest left */}
            <mesh position={[-0.28, 0.4, 0.08]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.32, 0.35]} />
              <meshStandardMaterial 
                color="#1a1a1a" 
                roughness={0.4} 
                metalness={0.2}
              />
            </mesh>
            
            {/* Cup holder */}
            <mesh position={[-0.28, 0.55, 0.1]} castShadow receiveShadow>
              <cylinderGeometry args={[0.045, 0.05, 0.08, 16]} />
              <meshStandardMaterial 
                color="#0a0a0a" 
                roughness={0.3} 
                metalness={0.4}
              />
            </mesh>
            
            {/* Seat base structure */}
            <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.52, 0.08, 0.5]} />
              <meshStandardMaterial 
                color="#0a0a0a" 
                roughness={0.5} 
                metalness={0.3}
              />
            </mesh>
          </group>
        ))
      ))}

      {/* BACK ROW VIP SEATING - Extra Premium reclining */}
      {[-1.2, 0, 1.2].map((x, idx) => (
        <group key={`back-seat-${idx}`} position={[x, 0.45, -1.2]}>
          {/* Seat base - wider luxury seat */}
          <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.65, 0.22, 0.7]} />
            <meshStandardMaterial 
              color="#6a1010" 
              roughness={0.75} 
              metalness={0.0}
            />
          </mesh>
          
          {/* Extra cushioning */}
          <mesh position={[0, 0.39, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.63, 0.08, 0.68]} />
            <meshStandardMaterial 
              color="#7a1a1a" 
              roughness={0.8} 
              metalness={0.0}
            />
          </mesh>
          
          {/* Backrest - angled for reclining */}
          <mesh position={[0, 0.65, 0.28]} rotation={[-0.15, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.65, 0.55, 0.15]} />
            <meshStandardMaterial 
              color="#6a1010" 
              roughness={0.75} 
              metalness={0.0}
            />
          </mesh>
          
          {/* Headrest */}
          <mesh position={[0, 0.95, 0.35]} rotation={[-0.15, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.45, 0.22, 0.12]} />
            <meshStandardMaterial 
              color="#7a1a1a" 
              roughness={0.8} 
              metalness={0.0}
            />
          </mesh>
          
          {/* Wide armrests */}
          {[-0.36, 0.36].map((offset, armIdx) => (
            <group key={`arm-${armIdx}`}>
              <mesh position={[offset, 0.5, 0.1]} castShadow receiveShadow>
                <boxGeometry args={[0.12, 0.35, 0.45]} />
                <meshStandardMaterial 
                  color="#1a1a1a" 
                  roughness={0.3} 
                  metalness={0.3}
                />
              </mesh>
              {/* Cup holder */}
              <mesh position={[offset, 0.67, 0.15]} castShadow receiveShadow>
                <cylinderGeometry args={[0.05, 0.055, 0.1, 16]} />
                <meshStandardMaterial 
                  color="#0a0a0a" 
                  roughness={0.25} 
                  metalness={0.5}
                />
              </mesh>
            </group>
          ))}
          
          {/* Seat base/footrest mechanism */}
          <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.68, 0.12, 0.72]} />
            <meshStandardMaterial 
              color="#0a0a0a" 
              roughness={0.4} 
              metalness={0.4}
            />
          </mesh>
        </group>
      ))}

      {/* AISLE LIGHTING - Floor-level LED strips */}
      {/* Left aisle lights */}
      {[0.5, 1.5, 2.5, 3.5].map((z, idx) => (
        <group key={`aisle-light-left-${idx}`}>
          <mesh position={[-4.5, 0.02, z]} receiveShadow>
            <boxGeometry args={[0.15, 0.03, 0.3]} />
            <meshStandardMaterial 
              color="#1a1a3a" 
              emissive="#3a4aff" 
              emissiveIntensity={0.6} 
              roughness={0.3} 
              metalness={0.2}
            />
          </mesh>
          <pointLight 
            position={[-4.5, 0.05, z]} 
            intensity={0.35} 
            distance={2.0}
            color="#5a6aff" 
            decay={2}
          />
        </group>
      ))}
      
      {/* Right aisle lights */}
      {[0.5, 1.5, 2.5, 3.5].map((z, idx) => (
        <group key={`aisle-light-right-${idx}`}>
          <mesh position={[4.5, 0.02, z]} receiveShadow>
            <boxGeometry args={[0.15, 0.03, 0.3]} />
            <meshStandardMaterial 
              color="#1a1a3a" 
              emissive="#3a4aff" 
              emissiveIntensity={0.6} 
              roughness={0.3} 
              metalness={0.2}
            />
          </mesh>
          <pointLight 
            position={[4.5, 0.05, z]} 
            intensity={0.35} 
            distance={2.0}
            color="#5a6aff" 
            decay={2}
          />
        </group>
      ))}
      
      {/* Center aisle lights */}
      {[0.5, 1.5, 2.5, 3.5].map((z, idx) => (
        <group key={`aisle-light-center-${idx}`}>
          <mesh position={[-0.2, 0.02, z]} receiveShadow>
            <boxGeometry args={[0.12, 0.03, 0.3]} />
            <meshStandardMaterial 
              color="#1a1a3a" 
              emissive="#3a4aff" 
              emissiveIntensity={0.55} 
              roughness={0.3} 
              metalness={0.2}
            />
          </mesh>
          <pointLight 
            position={[-0.2, 0.05, z]} 
            intensity={0.3} 
            distance={1.8}
            color="#5a6aff" 
            decay={2}
          />
        </group>
      ))}

      {/* PREMIUM CONCESSION STAND - Right front corner */}
      <group position={[5.0, 0, 1.2]}>
        {/* Main counter base */}
        <mesh position={[0, 0.50, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 1.0, 1.2]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            roughness={0.4} 
            metalness={0.25}
          />
        </mesh>
        
        {/* Glass display case front */}
        <mesh position={[0, 0.75, -0.55]} castShadow receiveShadow>
          <boxGeometry args={[1.3, 0.45, 0.08]} />
          <meshStandardMaterial 
            color="#87ceeb" 
            roughness={0.1} 
            metalness={0.1}
            transparent
            opacity={0.4}
          />
        </mesh>
        
        {/* Counter top - polished granite effect */}
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.08, 1.3]} />
          <meshStandardMaterial 
            color="#2a2a2a" 
            roughness={0.15} 
            metalness={0.6}
          />
        </mesh>
        
        {/* Back wall shelf unit */}
        <mesh position={[0, 1.3, 0.55]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.6, 0.15]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            roughness={0.5} 
            metalness={0.2}
          />
        </mesh>
        
        {/* Popcorn machine - classic red */}
        <group position={[-0.45, 1.08, -0.2]}>
          {/* Machine body */}
          <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.45, 0.7, 0.4]} />
            <meshStandardMaterial 
              color="#cc0000" 
              roughness={0.25} 
              metalness={0.3}
            />
          </mesh>
          
          {/* Glass chamber */}
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.4, 0.5, 0.35]} />
            <meshStandardMaterial 
              color="#ffffff" 
              roughness={0.05} 
              metalness={0.05}
              transparent
              opacity={0.3}
            />
          </mesh>
          
          {/* Popcorn visible inside */}
          <mesh position={[0, 0.35, 0]} castShadow>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial 
              color="#ffffcc" 
              roughness={0.8} 
              metalness={0.0}
            />
          </mesh>
          
          {/* Machine top/lamp */}
          <mesh position={[0, 0.72, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.22, 0.08, 8]} />
            <meshStandardMaterial 
              color="#ffaa00" 
              emissive="#ff8800" 
              emissiveIntensity={0.3} 
              roughness={0.3} 
              metalness={0.2}
            />
          </mesh>
          
          {/* Warming light */}
          <pointLight 
            position={[0, 0.55, 0]} 
            intensity={1.2} 
            distance={1.5}
            color="#ffbb44" 
          />
        </group>
        
        {/* Soda fountain dispenser - Professional 6-tap */}
        <group position={[0.45, 1.08, -0.2]}>
          {/* Dispenser body */}
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.8, 0.35]} />
            <meshStandardMaterial 
              color="#2a2a2a" 
              roughness={0.3} 
              metalness={0.4}
            />
          </mesh>
          
          {/* Dispenser front panel */}
          <mesh position={[0, 0.4, -0.16]} castShadow receiveShadow>
            <boxGeometry args={[0.48, 0.75, 0.04]} />
            <meshStandardMaterial 
              color="#1a1a1a" 
              roughness={0.25} 
              metalness={0.5}
            />
          </mesh>
          
          {/* Tap handles (6) */}
          {[-0.18, -0.06, 0.06, 0.18].map((xOffset, tapIdx) => (
            <mesh key={`tap-${tapIdx}`} position={[xOffset, 0.5, -0.19]} castShadow>
              <cylinderGeometry args={[0.015, 0.02, 0.08, 8]} />
              <meshStandardMaterial 
                color="#cccccc" 
                roughness={0.15} 
                metalness={0.8}
              />
            </mesh>
          ))}
          
          {/* Ice bin below */}
          <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.48, 0.1, 0.33]} />
            <meshStandardMaterial 
              color="#e0e0e0" 
              roughness={0.2} 
              metalness={0.6}
            />
          </mesh>
        </group>
        
        {/* Cup stack display */}
        <group position={[0.15, 1.08, 0.3]}>
          {[0, 0.08, 0.16].map((yOffset, cupIdx) => (
            <mesh key={`cup-${cupIdx}`} position={[0, yOffset, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.06, 0.07, 0.12, 16]} />
              <meshStandardMaterial 
                color={cupIdx === 0 ? "#ff3333" : cupIdx === 1 ? "#ffff33" : "#3333ff"} 
                roughness={0.3} 
                metalness={0.05}
              />
            </mesh>
          ))}
        </group>
        
        {/* Candy/snack boxes on display */}
        {[-0.15, 0, 0.15].map((xOffset, boxIdx) => (
          <mesh key={`candy-${boxIdx}`} position={[xOffset, 0.7, -0.4]} castShadow receiveShadow>
            <boxGeometry args={[0.12, 0.18, 0.08]} />
            <meshStandardMaterial 
              color={["#ff6699", "#66ff99", "#9966ff"][boxIdx]} 
              roughness={0.4} 
              metalness={0.1}
            />
          </mesh>
        ))}
        
        {/* Menu board above */}
        <mesh position={[0, 1.9, 0.5]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.8, 0.08]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            roughness={0.3} 
            metalness={0.3}
          />
        </mesh>
        
        {/* Menu backlight */}
        <mesh position={[0, 1.9, 0.54]} receiveShadow>
          <boxGeometry args={[1.15, 0.75, 0.03]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffcc" 
            emissiveIntensity={0.5} 
            roughness={0.2} 
            metalness={0.1}
          />
        </mesh>
        
        {/* Overhead light for concession area */}
        <pointLight 
          position={[0, 2.3, 0]} 
          intensity={3.0} 
          distance={5}
          color="#ffffcc" 
          castShadow 
        />
        
        {/* Additional concession area lighting */}
        <pointLight 
          position={[0, 1.8, -0.5]} 
          intensity={2.0} 
          distance={3.5}
          color="#fff5e6" 
        />
      </group>

      {/* "NOW SHOWING" NEON SIGN - Left wall */}
      <group position={[-5.85, 2.0, 1.8]} rotation={[0, Math.PI / 2, 0]}>
        {/* Sign backing */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.6, 0.12]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            roughness={0.3} 
            metalness={0.3}
          />
        </mesh>
        
        {/* Neon glow effect - bright pink */}
        <mesh position={[0, 0, -0.07]} castShadow>
          <boxGeometry args={[1.15, 0.55, 0.02]} />
          <meshStandardMaterial 
            color="#ff1493" 
            emissive="#ff1493" 
            emissiveIntensity={1.5} 
            roughness={0.1} 
            metalness={0.2}
          />
        </mesh>
        
        {/* Neon tube simulation - individual letters */}
        <pointLight 
          position={[0, 0, -0.1]} 
          intensity={2.0} 
          distance={4}
          color="#ff1493" 
        />
      </group>

      {/* MOVIE POSTER DISPLAY - Right wall */}
      <group position={[5.85, 1.6, -1.5]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Poster frame - elegant black */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 1.3, 0.08]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            roughness={0.3} 
            metalness={0.4}
          />
        </mesh>
        
        {/* Poster illumination backlight */}
        <mesh position={[0, 0, -0.05]} castShadow>
          <boxGeometry args={[0.85, 1.25, 0.02]} />
          <meshStandardMaterial 
            color="#87ceeb" 
            emissive="#4a90d9" 
            emissiveIntensity={1.2} 
            roughness={0.15} 
            metalness={0.1}
          />
        </mesh>
        
        {/* Poster light */}
        <pointLight 
          position={[0, 0, -0.1]} 
          intensity={1.5} 
          distance={3.5}
          color="#87ceeb" 
        />
      </group>

      {/* EXIT SIGNS - Professional emergency lighting */}
      {[-5.7, 5.7].map((x, idx) => (
        <group key={`exit-sign-${idx}`} position={[x, 3.1, -3.7]}>
          {/* Sign housing - industrial */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.35, 0.12]} />
            <meshStandardMaterial 
              color="#1a1a1a" 
              roughness={0.4} 
              metalness={0.3}
            />
          </mesh>
          
          {/* LED exit display - bright red */}
          <mesh position={[0, 0, -0.07]} castShadow>
            <boxGeometry args={[0.65, 0.3, 0.02]} />
            <meshStandardMaterial 
              color="#ff0000" 
              emissive="#ff0000" 
              emissiveIntensity={1.5} 
              roughness={0.1} 
              metalness={0.1}
            />
          </mesh>
          
          {/* Emergency light beam */}
          <spotLight
            position={[0, -0.2, -0.1]}
            target-position={[0, 0, -2]}
            angle={Math.PI / 6}
            penumbra={0.5}
            intensity={0.8}
            distance={5}
            color="#ff3333"
            castShadow
          />
          
          {/* Exit sign ambient glow */}
          <pointLight 
            position={[0, 0, -0.1]} 
            intensity={1.0} 
            distance={3}
            color="#ff4444" 
          />
        </group>
      ))}

      {/* WASTE RECEPTACLES - Theater style */}
      {/* Main trash bin */}
      <group position={[5.5, 0, 3.0]}>
        {/* Bin body - stainless steel look */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.28, 0.7, 20]} />
          <meshStandardMaterial 
            color="#2a2a2a" 
            roughness={0.2} 
            metalness={0.7}
          />
        </mesh>
        
        {/* Swing lid */}
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.27, 0.27, 0.05, 20]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            roughness={0.25} 
            metalness={0.6}
          />
        </mesh>
        
        {/* Push flap opening */}
        <mesh position={[0, 0.65, 0.15]} castShadow receiveShadow>
          <boxGeometry args={[0.18, 0.12, 0.03]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            roughness={0.4} 
            metalness={0.5}
          />
        </mesh>
        
        {/* Recycling decal */}
        <mesh position={[0, 0.45, 0.26]} castShadow>
          <circleGeometry args={[0.08, 16]} />
          <meshStandardMaterial 
            color="#00cc00" 
            emissive="#00aa00" 
            emissiveIntensity={0.2} 
            roughness={0.4} 
            metalness={0.2}
          />
        </mesh>
      </group>

      {/* Recycling bin next to trash */}
      <group position={[5.5, 0, 3.6]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.25, 0.7, 20]} />
          <meshStandardMaterial 
            color="#1a3a1a" 
            roughness={0.3} 
            metalness={0.5}
          />
        </mesh>
        
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.24, 0.24, 0.05, 20]} />
          <meshStandardMaterial 
            color="#0a2a0a" 
            roughness={0.25} 
            metalness={0.6}
          />
        </mesh>
      </group>

      {/* CEILING RECESSED SPOTLIGHTS - Accent lighting */}
      {[
        [-4, 3.42, -2] as [number, number, number], 
        [-4, 3.42, 1] as [number, number, number], 
        [0, 3.42, -2] as [number, number, number], 
        [0, 3.42, 2] as [number, number, number],
        [4, 3.42, -2] as [number, number, number], 
        [4, 3.42, 1] as [number, number, number]
      ].map((pos, idx) => (
        <group key={`ceiling-spot-${idx}`} position={pos}>
          {/* Recessed fixture housing */}
          <mesh receiveShadow>
            <cylinderGeometry args={[0.12, 0.1, 0.08, 16]} />
            <meshStandardMaterial 
              color="#0a0a0a" 
              roughness={0.3} 
              metalness={0.6}
            />
          </mesh>
          
          {/* Ceiling spotlight - enhanced */}
          <spotLight
            position={[0, -0.05, 0]}
            target-position={[pos[0], 0, pos[2]]}
            angle={Math.PI / 5}
            penumbra={0.4}
            intensity={0.5}
            distance={6}
            color="#d0d8e0"
            decay={2}
          />
        </group>
      ))}

      {/* AMBIENT THEATER LIGHTING - Enhanced for visibility */}
      <pointLight 
        position={[0, 2.8, 2]} 
        intensity={1.0} 
        distance={10}
        color="#5a6a8a" 
        decay={2}
      />
      
      <pointLight 
        position={[-5.0, 1.8, 1.5]} 
        intensity={1.5} 
        distance={4}
        color="#ff1493" 
        decay={2}
      />
      
      <pointLight 
        position={[5.0, 1.8, 1.5]} 
        intensity={1.5} 
        distance={4}
        color="#87ceeb" 
        decay={2}
      />
      
      {/* Additional fill lights for seating area */}
      <pointLight 
        position={[-3, 2.5, 2]} 
        intensity={1.2} 
        distance={6}
        color="#7a8aaa" 
        decay={2}
      />
      
      <pointLight 
        position={[3, 2.5, 2]} 
        intensity={1.2} 
        distance={6}
        color="#7a8aaa" 
        decay={2}
      />
      
      <pointLight 
        position={[0, 2.0, 0]} 
        intensity={1.5} 
        distance={8}
        color="#8a9aba" 
        decay={2}
      />
      
      {/* Back row lighting */}
      <pointLight 
        position={[0, 2.5, -1]} 
        intensity={1.0} 
        distance={5}
        color="#6a7a9a" 
        decay={2}
      />
    </group>
  );
}
