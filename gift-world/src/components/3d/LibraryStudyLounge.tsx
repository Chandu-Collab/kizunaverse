'use client';

import { useRef } from 'react';

export function LibraryStudyLounge() {
  const groupRef = useRef(null);

  return (
    <group ref={groupRef}>
      {/* AMBIENT LIGHTING */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 2]} intensity={0.9} castShadow />

      {/* WALLS */}
      <mesh position={[-6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#e8dcc8" roughness={0.3} />
      </mesh>
      <mesh position={[6, 1.8, 0]} scale={[0.1, 3.6, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#e8dcc8" roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.8, -4]} scale={[12, 3.6, 0.1]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#e8dcc8" roughness={0.3} />
      </mesh>
      <mesh position={[0, 3.5, 0]} scale={[12, 0.1, 8]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#f5f1e8" roughness={0.2} />
      </mesh>

      {/* FLOOR - Wood laminate */}
      <mesh position={[0, -0.05, 0]} scale={[12, 0.1, 8]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#a0826d" roughness={0.4} />
      </mesh>

      {/* TALL BOOKSHELF - Left wall back */}
      <group position={[-5.3, 0, -2.5]}>
        {/* Shelf frame */}
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 2.0, 0.4]} />
          <meshStandardMaterial color="#6b5344" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Horizontal shelves */}
        {[0, 0.4, 0.8, 1.2, 1.6].map((y, idx) => (
          <mesh key={`shelf-${idx}`} position={[0, 0.5 + y, 0]} castShadow>
            <boxGeometry args={[0.48, 0.05, 0.38]} />
            <meshStandardMaterial color="#8b7355" roughness={0.3} metalness={0.1} />
          </mesh>
        ))}
        {/* Books on shelves */}
        {[0, 0.4, 0.8, 1.2, 1.6].map((shelfY, shelfIdx) => (
          <group key={`books-${shelfIdx}`}>
            {[0, 0.1, 0.2].map((x, idx) => (
              <mesh key={`book-${shelfIdx}-${idx}`} position={[-0.15 + x, 0.65 + shelfY, 0]} castShadow>
                <boxGeometry args={[0.08, 0.3, 0.08]} />
                <meshStandardMaterial 
                  color={['#8b0000', '#000000', '#d4a574', '#ff6600', '#006666'][shelfIdx % 5]} 
                  roughness={0.4} 
                  metalness={0.05} 
                />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* TALL BOOKSHELF - Right wall back */}
      <group position={[5.3, 0, -2.5]}>
        {/* Shelf frame */}
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 2.0, 0.4]} />
          <meshStandardMaterial color="#6b5344" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Horizontal shelves */}
        {[0, 0.4, 0.8, 1.2, 1.6].map((y, idx) => (
          <mesh key={`shelf-r-${idx}`} position={[0, 0.5 + y, 0]} castShadow>
            <boxGeometry args={[0.48, 0.05, 0.38]} />
            <meshStandardMaterial color="#8b7355" roughness={0.3} metalness={0.1} />
          </mesh>
        ))}
        {/* Books on shelves */}
        {[0, 0.4, 0.8, 1.2, 1.6].map((shelfY, shelfIdx) => (
          <group key={`books-r-${shelfIdx}`}>
            {[0, 0.1, 0.2].map((x, idx) => (
              <mesh key={`book-r-${shelfIdx}-${idx}`} position={[-0.15 + x, 0.65 + shelfY, 0]} castShadow>
                <boxGeometry args={[0.08, 0.3, 0.08]} />
                <meshStandardMaterial 
                  color={['#8b0000', '#003d99', '#d4a574', '#1a6b3d', '#666600'][shelfIdx % 5]} 
                  roughness={0.4} 
                  metalness={0.05} 
                />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* STUDY TABLE 1 - Left side */}
      <group position={[-3.5, 0, 0.5]}>
        {/* Table top */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.8, 0.8]} />
          <meshStandardMaterial color="#6b5344" roughness={0.3} metalness={0.15} />
        </mesh>
        {/* Surface */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[1.0, 0.1, 0.6]} />
          <meshStandardMaterial color="#d4a574" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Books on table */}
        {[0, 0.25].map((x, idx) => (
          <mesh key={`table-book-${idx}`} position={[x - 0.15, 0.6, 0]} castShadow>
            <boxGeometry args={[0.15, 0.2, 0.25]} />
            <meshStandardMaterial 
              color={idx === 0 ? '#8b0000' : '#003d99'} 
              roughness={0.4} 
              metalness={0.05} 
            />
          </mesh>
        ))}
      </group>

      {/* STUDY TABLE 2 - Center */}
      <group position={[0, 0, 0.8]}>
        {/* Table top */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.8, 1.0]} />
          <meshStandardMaterial color="#6b5344" roughness={0.3} metalness={0.15} />
        </mesh>
        {/* Surface */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[1.8, 0.1, 0.8]} />
          <meshStandardMaterial color="#d4a574" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Lamp on table */}
        <group position={[0.6, 0.6, 0]}>
          {/* Lamp base */}
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.1, 8]} />
            <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* Lamp pole */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <boxGeometry args={[0.03, 0.25, 0.03]} />
            <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* Lamp shade */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.1, 0.15, 8]} />
            <meshStandardMaterial color="#ffffcc" roughness={0.4} metalness={0.1} />
          </mesh>
          {/* Light emission */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.08, 0.08, 8]} />
            <meshStandardMaterial 
              color="#ffff99" 
              emissive="#ffff99" 
              emissiveIntensity={0.4} 
              roughness={0.2} 
              metalness={0.2} 
            />
          </mesh>
        </group>
      </group>

      {/* STUDY TABLE 3 - Right side */}
      <group position={[3.5, 0, 0.5]}>
        {/* Table top */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.8, 0.8]} />
          <meshStandardMaterial color="#6b5344" roughness={0.3} metalness={0.15} />
        </mesh>
        {/* Surface */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[1.0, 0.1, 0.6]} />
          <meshStandardMaterial color="#d4a574" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Notebook and pen */}
        <mesh position={[-0.2, 0.6, 0]} castShadow>
          <boxGeometry args={[0.3, 0.02, 0.2]} />
          <meshStandardMaterial color="#ffffcc" roughness={0.3} metalness={0.05} />
        </mesh>
      </group>

      {/* READING CHAIR 1 - Left front */}
      <group position={[-4.0, 0, -1.5]}>
        {/* Seat */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.25, 0.6]} />
          <meshStandardMaterial color="#8b6f47" roughness={0.5} metalness={0.05} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.75, -0.3]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.5, 0.15]} />
          <meshStandardMaterial color="#8b6f47" roughness={0.5} metalness={0.05} />
        </mesh>
        {/* Armrests */}
        {[-0.35, 0.35].map((x, idx) => (
          <mesh key={`arm-${idx}`} position={[x, 0.5, -0.1]} castShadow>
            <boxGeometry args={[0.08, 0.3, 0.2]} />
            <meshStandardMaterial color="#6b5344" roughness={0.4} metalness={0.1} />
          </mesh>
        ))}
      </group>

      {/* READING CHAIR 2 - Right front */}
      <group position={[4.0, 0, -1.5]}>
        {/* Seat */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.25, 0.6]} />
          <meshStandardMaterial color="#8b6f47" roughness={0.5} metalness={0.05} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.75, -0.3]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.5, 0.15]} />
          <meshStandardMaterial color="#8b6f47" roughness={0.5} metalness={0.05} />
        </mesh>
        {/* Armrests */}
        {[-0.35, 0.35].map((x, idx) => (
          <mesh key={`arm2-${idx}`} position={[x, 0.5, -0.1]} castShadow>
            <boxGeometry args={[0.08, 0.3, 0.2]} />
            <meshStandardMaterial color="#6b5344" roughness={0.4} metalness={0.1} />
          </mesh>
        ))}
      </group>

      {/* FIREPLACE - Back wall center */}
      <group position={[0, 0, -3.85]}>
        {/* Fireplace opening */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.2, 0.3]} />
          <meshStandardMaterial color="#3d3d3d" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Fireplace grate */}
        <mesh position={[0, 0.2, -0.1]} castShadow>
          <boxGeometry args={[1.0, 0.1, 0.2]} />
          <meshStandardMaterial color="#888888" roughness={0.5} metalness={0.5} />
        </mesh>
        {/* Fire glow */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[1.1, 1.1, 0.05]} />
          <meshStandardMaterial 
            color="#ff6600" 
            emissive="#ff6600" 
            emissiveIntensity={0.3} 
            roughness={0.3} 
            metalness={0.1} 
          />
        </mesh>
        {/* Mantel */}
        <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.15, 0.35]} />
          <meshStandardMaterial color="#6b5344" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Decorative items on mantel */}
        <mesh position={[-0.4, 1.4, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.2, 8]} />
          <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.6} />
        </mesh>
        <mesh position={[0.4, 1.4, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.2, 8]} />
          <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.6} />
        </mesh>
      </group>

      {/* BOOK CART - Center */}
      <group position={[0, 0, -1.0]}>
        {/* Cart frame */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.5, 0.5]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.3} metalness={0.15} />
        </mesh>
        {/* Wheels */}
        {[-0.3, 0.3].map((x, idx) => (
          <mesh key={`wheel-${idx}`} position={[x, 0.08, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.08, 8]} />
            <meshStandardMaterial color="#333333" roughness={0.5} metalness={0.3} />
          </mesh>
        ))}
        {/* Books on cart */}
        {[0, 0.25].map((y, idx) => (
          <mesh key={`cart-book-${idx}`} position={[0, 0.35 + y, 0]} castShadow>
            <boxGeometry args={[0.6, 0.15, 0.4]} />
            <meshStandardMaterial 
              color={idx === 0 ? '#006666' : '#8b0000'} 
              roughness={0.4} 
              metalness={0.05} 
            />
          </mesh>
        ))}
      </group>

      {/* SIDE TABLE BY CHAIR - Left */}
      <group position={[-4.5, 0, 1.0]}>
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.6, 0.4]} />
          <meshStandardMaterial color="#6b5344" roughness={0.3} metalness={0.15} />
        </mesh>
        {/* Book on table */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.3, 0.05, 0.3]} />
          <meshStandardMaterial color="#003d99" roughness={0.4} metalness={0.05} />
        </mesh>
      </group>

      {/* SIDE TABLE BY CHAIR - Right */}
      <group position={[4.5, 0, 1.0]}>
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.6, 0.4]} />
          <meshStandardMaterial color="#6b5344" roughness={0.3} metalness={0.15} />
        </mesh>
        {/* Book on table */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.3, 0.05, 0.3]} />
          <meshStandardMaterial color="#8b0000" roughness={0.4} metalness={0.05} />
        </mesh>
      </group>

      {/* DESK LAMP 1 - Left table */}
      <group position={[-3.5, 0.7, -0.25]}>
        {/* Base */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.08, 8]} />
          <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Pole */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.02, 0.25, 0.02]} />
          <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Shade */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.07, 0.1, 8]} />
          <meshStandardMaterial 
            color="#ffffcc" 
            emissive="#ffff99" 
            emissiveIntensity={0.3} 
            roughness={0.3} 
            metalness={0.1} 
          />
        </mesh>
      </group>

      {/* DESK LAMP 2 - Right table */}
      <group position={[3.5, 0.7, -0.25]}>
        {/* Base */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.08, 8]} />
          <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Pole */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.02, 0.25, 0.02]} />
          <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Shade */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.07, 0.1, 8]} />
          <meshStandardMaterial 
            color="#ffffcc" 
            emissive="#ffff99" 
            emissiveIntensity={0.3} 
            roughness={0.3} 
            metalness={0.1} 
          />
        </mesh>
      </group>

      {/* AMBIENT LIGHTING POINTS */}
      <pointLight position={[-3.5, 1.8, 0.5]} intensity={1.1} castShadow color="#ffffcc" />
      <pointLight position={[3.5, 1.8, 0.5]} intensity={1.1} castShadow color="#ffffcc" />
      <pointLight position={[0, 1.8, -1.0]} intensity={1.2} castShadow color="#ffffcc" />
      <pointLight position={[0, 1.2, -3.8]} intensity={0.9} castShadow color="#ff9966" />
    </group>
  );
}
