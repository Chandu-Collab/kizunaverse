'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import Button from '@/components/ui/Button';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';
type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';

interface Leaf {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: number;
  rotationSpeed: number;
  size: number;
  color: THREE.Color;
  targetPosition: THREE.Vector3;
  trail?: THREE.Vector3[];
}

interface Butterfly {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  wingPhase: number;
  targetPosition: THREE.Vector3;
}

interface Firefly {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  glowIntensity: number;
  glowPhase: number;
}

interface Petal {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: number;
  rotationSpeed: number;
  size: number;
  color: THREE.Color;
}

interface WindBurst {
  position: THREE.Vector3;
  strength: number;
  radius: number;
  lifetime: number;
}

interface WindLeavesGameProps {
  onGameEnd?: () => void;
}

// Create realistic leaf shape
function createLeafShape() {
  const shape = new THREE.Shape();
  
  // Main leaf outline - realistic leaf shape
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(0.2, 0.3, 0.3, 0.6);
  shape.quadraticCurveTo(0.35, 0.9, 0.2, 1.2);
  shape.quadraticCurveTo(0.1, 1.4, 0, 1.5);
  shape.quadraticCurveTo(-0.1, 1.4, -0.2, 1.2);
  shape.quadraticCurveTo(-0.35, 0.9, -0.3, 0.6);
  shape.quadraticCurveTo(-0.2, 0.3, 0, 0);
  
  return shape;
}

function LeafParticle({ leaf }: { leaf: Leaf }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [leafShape] = useState(() => createLeafShape());

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.lerp(leaf.position, 0.1);
      groupRef.current.rotation.z += leaf.rotationSpeed;
      // Add subtle 3D rotation for more realism
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001 + leaf.id) * 0.3;
      groupRef.current.rotation.y = Math.cos(Date.now() * 0.0015 + leaf.id) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={leaf.position}>
      {/* Main leaf body */}
      <mesh ref={meshRef}>
        <shapeGeometry args={[leafShape]} />
        <meshStandardMaterial
          color={leaf.color}
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
          emissive={leaf.color}
          emissiveIntensity={0.15}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Center vein */}
      <mesh position={[0, 0.75, 0.001]}>
        <planeGeometry args={[0.02, 1.5]} />
        <meshStandardMaterial
          color={new THREE.Color(leaf.color).multiplyScalar(0.6)}
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Side veins */}
      {[0.3, 0.6, 0.9, 1.2].map((y, i) => (
        <React.Fragment key={i}>
          {/* Left vein */}
          <mesh 
            position={[-0.15, y, 0.001]} 
            rotation={[0, 0, -0.5]}
          >
            <planeGeometry args={[0.015, 0.3]} />
            <meshStandardMaterial
              color={new THREE.Color(leaf.color).multiplyScalar(0.6)}
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
            />
          </mesh>
          {/* Right vein */}
          <mesh 
            position={[0.15, y, 0.001]} 
            rotation={[0, 0, 0.5]}
          >
            <planeGeometry args={[0.015, 0.3]} />
            <meshStandardMaterial
              color={new THREE.Color(leaf.color).multiplyScalar(0.6)}
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
            />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
}

// Butterfly component
function ButterflyParticle({ butterfly }: { butterfly: Butterfly }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Mesh>(null);
  const rightWingRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.lerp(butterfly.position, 0.05);
      
      // Wing flapping animation
      if (leftWingRef.current && rightWingRef.current) {
        const wingAngle = Math.sin(butterfly.wingPhase) * 0.8;
        leftWingRef.current.rotation.y = -Math.PI / 4 + wingAngle;
        rightWingRef.current.rotation.y = Math.PI / 4 - wingAngle;
      }
    }
  });

  return (
    <group ref={groupRef} position={butterfly.position}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#2c1810" />
      </mesh>
      
      {/* Left wing */}
      <mesh ref={leftWingRef} position={[-0.1, 0, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial 
          color="#FF6B9D" 
          side={THREE.DoubleSide} 
          transparent 
          opacity={0.8}
          emissive="#FF6B9D"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Right wing */}
      <mesh ref={rightWingRef} position={[0.1, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial 
          color="#FF6B9D" 
          side={THREE.DoubleSide} 
          transparent 
          opacity={0.8}
          emissive="#FF6B9D"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

// Firefly component
function FireflyParticle({ firefly }: { firefly: Firefly }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (meshRef.current && lightRef.current) {
      meshRef.current.position.lerp(firefly.position, 0.08);
      lightRef.current.position.copy(meshRef.current.position);
      lightRef.current.intensity = firefly.glowIntensity;
    }
  });

  return (
    <>
      <mesh ref={meshRef} position={firefly.position}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial 
          color="#FFEB3B" 
          emissive="#FFEB3B"
          emissiveIntensity={firefly.glowIntensity * 2}
          transparent
          opacity={0.9}
        />
      </mesh>
      <pointLight 
        ref={lightRef}
        color="#FFEB3B" 
        intensity={firefly.glowIntensity} 
        distance={3}
      />
    </>
  );
}

// Flower petal component
function FlowerPetal({ petal }: { petal: Petal }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.lerp(petal.position, 0.12);
      meshRef.current.rotation.z += petal.rotationSpeed;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.002 + petal.id) * 0.5;
    }
  });

  const petalShape = new THREE.Shape();
  petalShape.moveTo(0, 0);
  petalShape.quadraticCurveTo(0.1, 0.1, 0.1, 0.2);
  petalShape.quadraticCurveTo(0.1, 0.3, 0, 0.4);
  petalShape.quadraticCurveTo(-0.1, 0.3, -0.1, 0.2);
  petalShape.quadraticCurveTo(-0.1, 0.1, 0, 0);

  return (
    <mesh ref={meshRef} position={petal.position}>
      <shapeGeometry args={[petalShape]} />
      <meshStandardMaterial
        color={petal.color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.7}
        emissive={petal.color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function WindEffect({ season, timeOfDay }: { season: Season; timeOfDay: TimeOfDay }) {
  const { camera, size, gl } = useThree();
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const [petals, setPetals] = useState<Petal[]>([]);
  const [windBursts, setWindBursts] = useState<WindBurst[]>([]);
  const mousePos = useRef(new THREE.Vector3(0, 0, 0));
  const windForce = useRef(new THREE.Vector3(0, 0, 0));

  // Get seasonal colors
  const getSeasonalColors = () => {
    switch (season) {
      case 'spring':
        return {
          leaves: [
            new THREE.Color(0x90EE90), // Light green
            new THREE.Color(0x98FB98), // Pale green
            new THREE.Color(0x00FF7F), // Spring green
            new THREE.Color(0x32CD32), // Lime green
          ],
          petals: [
            new THREE.Color(0xFFB6C1), // Light pink
            new THREE.Color(0xFFC0CB), // Pink
            new THREE.Color(0xFFFFFF), // White
            new THREE.Color(0xFFE4E1), // Misty rose
          ]
        };
      case 'summer':
        return {
          leaves: [
            new THREE.Color(0x228B22), // Forest green
            new THREE.Color(0x32CD32), // Lime green
            new THREE.Color(0x00FF00), // Green
            new THREE.Color(0x7FFF00), // Chartreuse
          ],
          petals: [
            new THREE.Color(0xFFD700), // Gold
            new THREE.Color(0xFFA500), // Orange
            new THREE.Color(0xFF69B4), // Hot pink
            new THREE.Color(0xFF1493), // Deep pink
          ]
        };
      case 'autumn':
        return {
          leaves: [
            new THREE.Color(0x2D5016), // Forest green
            new THREE.Color(0xD2691E), // Chocolate
            new THREE.Color(0xFF8C00), // Dark orange
            new THREE.Color(0xB8860B), // Dark goldenrod
            new THREE.Color(0xCD853F), // Peru
            new THREE.Color(0xDC143C), // Crimson
            new THREE.Color(0x8B4513), // Saddle brown
          ],
          petals: []
        };
      case 'winter':
        return {
          leaves: [
            new THREE.Color(0xFFFFFF), // White (snowflakes)
            new THREE.Color(0xF0F8FF), // Alice blue
            new THREE.Color(0xE6F3FF), // Light blue
            new THREE.Color(0xB0E0E6), // Powder blue
          ],
          petals: []
        };
    }
  };

  // Initialize leaves/snowflakes based on season
  useEffect(() => {
    const colors = getSeasonalColors();
    const newLeaves: Leaf[] = [];
    const count = season === 'winter' ? 80 : 60;

    for (let i = 0; i < count; i++) {
      newLeaves.push({
        id: i,
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 5
        ),
        velocity: new THREE.Vector3(0, 0, 0),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        size: season === 'winter' ? 0.2 + Math.random() * 0.3 : 0.4 + Math.random() * 0.5,
        color: colors.leaves[Math.floor(Math.random() * colors.leaves.length)],
        targetPosition: new THREE.Vector3(0, 0, 0),
        trail: []
      });
    }
    setLeaves(newLeaves);

    // Add petals for spring and summer
    if (colors.petals.length > 0) {
      const newPetals: Petal[] = [];
      for (let i = 0; i < 20; i++) {
        newPetals.push({
          id: i,
          position: new THREE.Vector3(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 3
          ),
          velocity: new THREE.Vector3(0, 0, 0),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          size: 0.3 + Math.random() * 0.2,
          color: colors.petals[Math.floor(Math.random() * colors.petals.length)]
        });
      }
      setPetals(newPetals);
    } else {
      setPetals([]);
    }
  }, [season]);

  // Initialize butterflies (spring and summer)
  useEffect(() => {
    if (season === 'spring' || season === 'summer') {
      const newButterflies: Butterfly[] = [];
      for (let i = 0; i < 8; i++) {
        newButterflies.push({
          id: i,
          position: new THREE.Vector3(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10,
            Math.random() * 3
          ),
          velocity: new THREE.Vector3(0, 0, 0),
          wingPhase: Math.random() * Math.PI * 2,
          targetPosition: new THREE.Vector3(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10,
            Math.random() * 3
          )
        });
      }
      setButterflies(newButterflies);
    } else {
      setButterflies([]);
    }
  }, [season]);

  // Initialize fireflies (dusk and night)
  useEffect(() => {
    if (timeOfDay === 'dusk' || timeOfDay === 'night') {
      const newFireflies: Firefly[] = [];
      for (let i = 0; i < 15; i++) {
        newFireflies.push({
          id: i,
          position: new THREE.Vector3(
            (Math.random() - 0.5) * 18,
            (Math.random() - 0.5) * 12,
            Math.random() * 4
          ),
          velocity: new THREE.Vector3(0, 0, 0),
          glowIntensity: Math.random(),
          glowPhase: Math.random() * Math.PI * 2
        });
      }
      setFireflies(newFireflies);
    } else {
      setFireflies([]);
    }
  }, [timeOfDay]);

  // Handle mouse/touch movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

      const x = (clientX / size.width) * 2 - 1;
      const y = -(clientY / size.height) * 2 + 1;

      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);

      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      mousePos.current.copy(pos);
    };

    const handleClick = (event: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

      const x = (clientX / size.width) * 2 - 1;
      const y = -(clientY / size.height) * 2 + 1;

      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);

      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      // Create wind burst at click position
      setWindBursts(prev => [...prev, {
        position: pos.clone(),
        strength: 1.5,
        radius: 4,
        lifetime: 1.0
      }]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleClick);
    };
  }, [camera, size]);

  // Animate all particles
  useFrame((state, delta) => {
    // Update wind bursts
    setWindBursts(prev => prev
      .map(burst => ({ ...burst, lifetime: burst.lifetime - delta }))
      .filter(burst => burst.lifetime > 0)
    );

    // Animate leaves with trails
    setLeaves((prevLeaves) =>
      prevLeaves.map((leaf) => {
        // Calculate wind force from mouse position
        const toMouse = mousePos.current.clone().sub(leaf.position);
        const distance = toMouse.length();
        
        if (distance < 5) {
          const force = toMouse.normalize().multiplyScalar(0.2 / (distance + 0.5));
          leaf.velocity.add(force);
        }

        // Wind bursts
        windBursts.forEach(burst => {
          const toBurst = burst.position.clone().sub(leaf.position);
          const burstDist = toBurst.length();
          if (burstDist < burst.radius) {
            const force = leaf.position.clone().sub(burst.position)
              .normalize()
              .multiplyScalar(burst.strength * (1 - burstDist / burst.radius));
            leaf.velocity.add(force);
          }
        });

        // Apply drag
        leaf.velocity.multiplyScalar(0.95);

        // Gentle floating
        const time = Date.now() * 0.001;
        leaf.velocity.y += Math.sin(time + leaf.id) * 0.001;
        leaf.velocity.x += Math.cos(time * 1.5 + leaf.id) * 0.001;

        // Add winter snow falling
        if (season === 'winter') {
          leaf.velocity.y -= 0.005;
          leaf.velocity.x += Math.sin(time + leaf.id) * 0.002;
        }

        // Update position
        leaf.position.add(leaf.velocity);

        // Trail effect (store last few positions)
        if (leaf.velocity.length() > 0.1) {
          if (!leaf.trail) leaf.trail = [];
          leaf.trail.unshift(leaf.position.clone());
          if (leaf.trail.length > 5) leaf.trail.pop();
        }

        // Boundary check - wrap around
        if (leaf.position.x > 12) leaf.position.x = -12;
        if (leaf.position.x < -12) leaf.position.x = 12;
        if (leaf.position.y > 8) leaf.position.y = -8;
        if (leaf.position.y < -8) leaf.position.y = 8;

        return leaf;
      })
    );

    // Animate petals
    setPetals(prevPetals =>
      prevPetals.map(petal => {
        const toMouse = mousePos.current.clone().sub(petal.position);
        const distance = toMouse.length();
        
        if (distance < 4) {
          const force = toMouse.normalize().multiplyScalar(0.15 / (distance + 0.5));
          petal.velocity.add(force);
        }

        petal.velocity.multiplyScalar(0.96);
        petal.velocity.y += Math.sin(Date.now() * 0.002 + petal.id) * 0.0015;
        petal.velocity.y -= 0.003; // Gentle falling
        petal.position.add(petal.velocity);

        if (petal.position.x > 12) petal.position.x = -12;
        if (petal.position.x < -12) petal.position.x = 12;
        if (petal.position.y > 8) petal.position.y = -8;
        if (petal.position.y < -8) petal.position.y = 8;

        return petal;
      })
    );

    // Animate butterflies
    setButterflies(prevButterflies =>
      prevButterflies.map(butterfly => {
        // Update wing phase
        butterfly.wingPhase += delta * 10;

        // Move towards target
        const toTarget = butterfly.targetPosition.clone().sub(butterfly.position);
        if (toTarget.length() < 0.5) {
          // Choose new target
          butterfly.targetPosition = new THREE.Vector3(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10,
            Math.random() * 3
          );
        }

        butterfly.velocity.add(toTarget.normalize().multiplyScalar(0.01));
        butterfly.velocity.multiplyScalar(0.97);
        butterfly.position.add(butterfly.velocity);

        return butterfly;
      })
    );

    // Animate fireflies
    setFireflies(prevFireflies =>
      prevFireflies.map(firefly => {
        // Update glow
        firefly.glowPhase += delta * 2;
        firefly.glowIntensity = (Math.sin(firefly.glowPhase) + 1) * 0.5 + 0.3;

        // Random floating movement
        const time = Date.now() * 0.001;
        firefly.velocity.x = Math.sin(time + firefly.id) * 0.005;
        firefly.velocity.y = Math.cos(time * 1.3 + firefly.id) * 0.005;
        firefly.velocity.z = Math.sin(time * 0.8 + firefly.id) * 0.003;
        
        firefly.position.add(firefly.velocity);

        // Boundary check
        if (Math.abs(firefly.position.x) > 10) firefly.velocity.x *= -1;
        if (Math.abs(firefly.position.y) > 7) firefly.velocity.y *= -1;

        return firefly;
      })
    );
  });

  return (
    <>
      {leaves.map((leaf) => (
        <LeafParticle key={leaf.id} leaf={leaf} />
      ))}
      {butterflies.map((butterfly) => (
        <ButterflyParticle key={butterfly.id} butterfly={butterfly} />
      ))}
      {fireflies.map((firefly) => (
        <FireflyParticle key={firefly.id} firefly={firefly} />
      ))}
      {petals.map((petal) => (
        <FlowerPetal key={petal.id} petal={petal} />
      ))}
    </>
  );
}

function Scene({ season, timeOfDay }: { season: Season; timeOfDay: TimeOfDay }) {
  // Get lighting based on time of day
  const getLighting = () => {
    switch (timeOfDay) {
      case 'dawn':
        return {
          ambient: { intensity: 0.4, color: "#FFE4B5" },
          directional: { intensity: 0.6, color: "#FFB347", position: [-5, 5, 5] },
          background: 'linear-gradient(to bottom, #FF6B6B, #FFA07A, #FFD700)'
        };
      case 'day':
        return {
          ambient: { intensity: 0.7, color: "#ffffff" },
          directional: { intensity: 1.0, color: "#f4e8d0", position: [10, 10, 5] },
          background: 'linear-gradient(to bottom, #87CEEB, #A8C9BC, #C4D9CF)'
        };
      case 'dusk':
        return {
          ambient: { intensity: 0.3, color: "#DDA0DD" },
          directional: { intensity: 0.5, color: "#FF8C00", position: [5, 3, 5] },
          background: 'linear-gradient(to bottom, #4B0082, #8B008B, #FF6347)'
        };
      case 'night':
        return {
          ambient: { intensity: 0.2, color: "#191970" },
          directional: { intensity: 0.3, color: "#4169E1", position: [0, 10, 5] },
          background: 'linear-gradient(to bottom, #000428, #004e92, #1a1a2e)'
        };
    }
  };

  const lighting = getLighting();

  return (
    <>
      {/* Dynamic lighting based on time of day */}
      <ambientLight intensity={lighting.ambient.intensity} color={lighting.ambient.color} />
      <directionalLight 
        position={lighting.directional.position as [number, number, number]} 
        intensity={lighting.directional.intensity} 
        color={lighting.directional.color} 
        castShadow 
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.2} color="#a8dadc" />
      
      {/* Moon for night */}
      {timeOfDay === 'night' && (
        <mesh position={[5, 6, -3]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial 
            color="#F0E68C" 
            emissive="#F0E68C"
            emissiveIntensity={1.5}
          />
        </mesh>
      )}
      
      {/* Stars for night */}
      {timeOfDay === 'night' && (
        <>
          {[...Array(30)].map((_, i) => (
            <mesh 
              key={i}
              position={[
                (Math.random() - 0.5) * 25,
                Math.random() * 10 + 2,
                -4 - Math.random() * 2
              ]}
            >
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial 
                color="#FFFFFF" 
                emissive="#FFFFFF"
                emissiveIntensity={Math.random() * 2 + 1}
              />
            </mesh>
          ))}
        </>
      )}
      
      {/* Soft warm glow from below */}
      <pointLight position={[0, -5, 2]} intensity={0.2} color="#8b7355" />
      
      {/* Wind and nature elements */}
      <WindEffect season={season} timeOfDay={timeOfDay} />

      {/* Subtle background */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[40, 25]} />
        <meshBasicMaterial 
          color={season === 'winter' ? "#e6f3ff" : "#1a3a2e"} 
          transparent 
          opacity={0.2} 
        />
      </mesh>
    </>
  );
}

const CALMING_QUOTES = [
  "Like leaves in the wind, let your thoughts flow freely",
  "Nature does not hurry, yet everything is accomplished",
  "In every walk with nature, one receives far more than sought",
  "The quieter you become, the more you can hear",
  "Be like a tree and let the dead leaves drop",
  "Breathe in peace, breathe out stress",
  "Find stillness in movement, movement in stillness",
  "The present moment is all you need",
  "Let go of what was, embrace what is",
  "Peace comes from within, do not seek it without"
];

export default function WindLeavesGame({ onGameEnd }: WindLeavesGameProps) {
  const [breathingState, setBreathingState] = useState<'inhale' | 'exhale'>('inhale');
  const [showGuide, setShowGuide] = useState(true);
  const [season, setSeason] = useState<Season>('autumn');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showControls, setShowControls] = useState(false);
  // For auto-cycling
  const seasonOrder: Season[] = ['spring', 'summer', 'autumn', 'winter'];
  const timeOrder: TimeOfDay[] = ['dawn', 'day', 'dusk', 'night'];
  const [autoCycleIndex, setAutoCycleIndex] = useState(0);

  // Breathing guide
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathingState((prev) => (prev === 'inhale' ? 'exhale' : 'inhale'));
    }, 4000);

    // Hide guide after 10 seconds
    const timeout = setTimeout(() => setShowGuide(false), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Rotate quotes and auto-cycle day/nature every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % CALMING_QUOTES.length);
      setAutoCycleIndex((prev) => prev + 1);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Change season and timeOfDay in sync every 15 seconds
  useEffect(() => {
    setSeason(seasonOrder[autoCycleIndex % seasonOrder.length]);
    setTimeOfDay(timeOrder[autoCycleIndex % timeOrder.length]);
  }, [autoCycleIndex]);

  // Get background gradient based on time of day
  const getBackgroundStyle = () => {
    switch (timeOfDay) {
      case 'dawn':
        return { background: 'linear-gradient(to bottom, #FF6B6B, #FFA07A, #FFD700)' };
      case 'day':
        return { background: 'linear-gradient(to bottom, #87CEEB, #A8C9BC, #C4D9CF)' };
      case 'dusk':
        return { background: 'linear-gradient(to bottom, #4B0082, #8B008B, #FF6347)' };
      case 'night':
        return { background: 'linear-gradient(to bottom, #000428, #004e92, #1a1a2e)' };
    }
  };

  // Play ambient sounds
  useEffect(() => {
    // Note: Add audio playback here if audio files are available
    // const audio = new Audio('/audio/wind-leaves.mp3');
    // audio.loop = true;
    // audio.volume = 0.3;
    // audio.play();
    // return () => audio.pause();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-amber-50/30 via-green-50/20 to-emerald-100/30">
      {/* Canvas */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={getBackgroundStyle()}
      >
        <Scene season={season} timeOfDay={timeOfDay} />
      </Canvas>

      {/* Instruction overlay */}
      {showGuide && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">🍃 Wind & Leaves</h2>
            <p className="text-white/90 text-lg mb-2">Move your mouse or finger to create wind</p>
            <p className="text-white/70 mb-2">Click or tap to burst wind</p>
            <p className="text-white/60 text-sm mt-4 italic">Just breathe and relax...</p>
          </div>
        </motion.div>
      )}

      {/* Control panel toggle */}
      <div className="absolute top-6 left-6">
        <Button
          onClick={() => setShowControls(!showControls)}
          variant="ghost"
          size="sm"
          className="bg-white/10 backdrop-blur-md border border-white/20"
        >
          {showControls ? '✕ Close' : '⚙️ Controls'}
        </Button>
      </div>

      {/* Control panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="absolute top-20 left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[250px]"
          >
            <h3 className="text-white font-bold mb-4 text-lg">🎨 Customize</h3>
            
            {/* Season selector */}
            <div className="mb-4">
              <p className="text-white/70 text-sm mb-2">Season</p>
              <div className="grid grid-cols-2 gap-2">
                {(['spring', 'summer', 'autumn', 'winter'] as Season[]).map((s) => (
                  <Button
                    key={s}
                    onClick={() => setSeason(s)}
                    variant={season === s ? 'primary' : 'ghost'}
                    size="sm"
                    className="capitalize"
                  >
                    {s === 'spring' && '🌸'} {s === 'summer' && '☀️'} 
                    {s === 'autumn' && '🍂'} {s === 'winter' && '❄️'} {s}
                  </Button>
                ))}
              </div>
            </div>

            {/* Time of day selector */}
            <div>
              <p className="text-white/70 text-sm mb-2">Time of Day</p>
              <div className="grid grid-cols-2 gap-2">
                {(['dawn', 'day', 'dusk', 'night'] as TimeOfDay[]).map((t) => (
                  <Button
                    key={t}
                    onClick={() => setTimeOfDay(t)}
                    variant={timeOfDay === t ? 'primary' : 'ghost'}
                    size="sm"
                    className="capitalize"
                  >
                    {t === 'dawn' && '🌅'} {t === 'day' && '☀️'} 
                    {t === 'dusk' && '🌆'} {t === 'night' && '🌙'} {t}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <p className="text-white/60 text-xs">
                💡 Tip: Click anywhere to create wind bursts!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-6 right-6 flex flex-col gap-4"
      >
        {/* Breathing guide */}
        <motion.div
          animate={{
            scale: breathingState === 'inhale' ? [1, 1.2, 1] : [1, 0.9, 1],
          }}
          transition={{ duration: 4, ease: 'easeInOut' }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center min-w-[200px]"
        >
          <div className="text-4xl mb-2">
            {breathingState === 'inhale' ? '🌬️' : '😌'}
          </div>
          <p className="text-white/90 text-lg font-semibold">
            {breathingState === 'inhale' ? 'Breathe In' : 'Breathe Out'}
          </p>
        </motion.div>

        {/* Rotating mindfulness quotes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center max-w-[250px]"
          >
            <p className="text-white/80 text-sm italic">
              "{CALMING_QUOTES[currentQuote]}"
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Current mode indicators */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-center">
          <span className="text-white/90 text-sm font-semibold capitalize">
            {season === 'spring' && '🌸'} {season === 'summer' && '☀️'} 
            {season === 'autumn' && '🍂'} {season === 'winter' && '❄️'} {season}
          </span>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-center">
          <span className="text-white/90 text-sm font-semibold capitalize">
            {timeOfDay === 'dawn' && '🌅'} {timeOfDay === 'day' && '☀️'} 
            {timeOfDay === 'dusk' && '🌆'} {timeOfDay === 'night' && '🌙'} {timeOfDay}
          </span>
        </div>
      </div>

      {/* Encouragement message */}
      <div className="absolute bottom-6 left-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
          <p className="text-white/70 text-sm">Take your time</p>
          <p className="text-white/90 text-lg font-semibold">No rush 🌸</p>
        </div>
      </div>
    </div>
  );
}
