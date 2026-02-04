"use client";

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import { Html } from '@react-three/drei';
import { AutoRickshaw, BMTCBus } from './BangaloreLandmarks';
import BusStop from './transportation/BusStop';
import TwoWheeler from './vehicles/TwoWheeler';
import StreetFoodStall from './food/StreetFoodStall';
import KiranaStore from './buildings/KiranaStore';
import Male3D from './Male3D';
import Female3D from './Female3D';
import PetDog3D from './PetDog3D';
import { Bird, Butterfly } from './BirdButterfly3D';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface SpecialBMSCollegeProps {
  position?: [number, number, number];
  onClick?: () => void;
}

export default function SpecialBMSCollege({ 
  position = [0, 0, 0], 
  onClick 
}: SpecialBMSCollegeProps) {
  const { isNight } = useTheme();
  const collegeRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showMemoryTooltip, setShowMemoryTooltip] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  
  // Auto-hide label after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLabel(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  
  // Gentle floating animation for the special glow
  useFrame(({ clock }) => {
    if (collegeRef.current) {
      collegeRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.02;
      collegeRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <group 
      ref={collegeRef} 
      position={position}
      onPointerOver={() => {
        setIsHovered(true);
        setShowMemoryTooltip(true);
      }}
      onPointerOut={() => {
        setIsHovered(false);
        setShowMemoryTooltip(false);
      }}
      onClick={onClick}
    >
      {/* Special golden glow around the college - where the magic happened! */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[8, 16, 16]} />
        <meshStandardMaterial 
          color="#FFD700" 
          transparent 
          opacity={isHovered ? 0.08 : 0.04}
          emissive="#FFD700"
          emissiveIntensity={isHovered ? 0.15 : 0.08}
        />
      </mesh>
      
      {/* Main BMS College building - consistent with city style */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2.4, 2]} />
        <meshStandardMaterial 
          color="#CD853F" 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Medical college additional floors */}
      <mesh position={[0, 2.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.6, 1.8]} />
        <meshStandardMaterial color="#DEB887" roughness={0.7} />
      </mesh>
      
      {/* BMS College entrance - consistent with city landmarks */}
      <group position={[0, 0, 1.2]}>
        {/* Glass entrance */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[1.5, 1.6, 0.2]} />
          <meshStandardMaterial 
            color="#8B4513" 
            roughness={0.8}
          />
        </mesh>
        
        {/* College name board */}
        <mesh position={[0, 2.5, 0.1]}>
          <boxGeometry args={[2.5, 0.4, 0.1]} />
          <meshStandardMaterial 
            color="#1E3A8A"
            emissive={isNight ? "#1E3A8A" : "#000000"}
            emissiveIntensity={isNight ? 0.3 : 0}
          />
        </mesh>
        
        {/* Medical cross symbol */}
        <mesh position={[0, 1.8, 0.1]}>
          <boxGeometry args={[0.3, 0.8, 0.05]} />
          <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0, 1.8, 0.1]}>
          <boxGeometry args={[0.8, 0.3, 0.05]} />
          <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.2} />
        </mesh>
      </group>
      
      {/* College wings - matching city landmarks style */}
      <mesh position={[-2, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshStandardMaterial color="#DEB887" roughness={0.7} />
      </mesh>
      <mesh position={[2, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshStandardMaterial color="#DEB887" roughness={0.7} />
      </mesh>
      
      {/* Windows - standard city style */}
      {Array.from({ length: 2 }).map((_, floor) => 
        Array.from({ length: 2 }).map((_, window) => (
          <mesh 
            key={`${floor}-${window}`} 
            position={[-0.6 + window * 1.2, 0.8 + floor * 0.6, 1.01]}
          >
            <boxGeometry args={[0.4, 0.4, 0.02]} />
            <meshStandardMaterial 
              color={isNight && (floor + window) % 3 !== 0 ? "#FFD700" : "#87CEEB"} 
              transparent 
              opacity={0.8}
              emissive={isNight && (floor + window) % 3 !== 0 ? "#FFD700" : "#000000"}
              emissiveIntensity={isNight ? 0.3 : 0}
            />
          </mesh>
        ))
      )}
      
      {/* College courtyard - matching city landmarks */}
      <mesh position={[0, 0.05, -1]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[4, 2, 0.1]} />
        <meshStandardMaterial color="#90EE90" roughness={0.9} />
      </mesh>
      
      {/* Small trees around college - city style */}
      {[-2, -1, 1, 2].map((x, i) => (
        <group key={i} position={[x, 0, -1.8]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial color={isNight ? "#2F4F2F" : "#228B22"} roughness={0.8} />
          </mesh>
        </group>
      ))}
      
      {/* Auto rickshaws waiting near college gate - authentic Bengaluru */}
      <AutoRickshaw position={[3, 0, 3]} rotation={-Math.PI / 3} />
      <AutoRickshaw position={[4.5, 0, 2.5]} rotation={-Math.PI / 6} />
      <AutoRickshaw position={[2.5, 0, 4]} rotation={-Math.PI / 2} />
      
      {/* BMTC Bus and Bus Stop - student transportation */}
      <BMTCBus position={[-5, 0, 4]} rotationY={Math.PI / 2} scale={0.8} />
      <BusStop position={[-3, 0, 3.5]} rotation={[0, Math.PI / 4, 0]} scale={0.7} />
      
      {/* Parked two-wheelers - students' vehicles */}
      <TwoWheeler position={[-2.5, 0, -2]} rotationY={Math.PI / 3} type="scooter" scale={0.7} parked />
      <TwoWheeler position={[-1.8, 0, -1.5]} rotationY={-Math.PI / 6} type="motorcycle" scale={0.7} parked />
      <TwoWheeler position={[-3.2, 0, -1.8]} rotationY={Math.PI / 2} type="scooter" scale={0.7} parked />
      <TwoWheeler position={[2.8, 0, -1.5]} rotationY={-Math.PI / 4} type="scooter" scale={0.7} parked />
      <TwoWheeler position={[1.5, 0, -2.2]} rotationY={Math.PI / 6} type="motorcycle" scale={0.7} parked />
      
      {/* Coffee/Tea stall - where students gather */}
      <StreetFoodStall position={[-4, 0, -3]} type="coffee" scale={0.8} />
      
      {/* Animated students and people around college */}
      <Male3D position={[-0.8, 0, -0.5]} scale={0.6} rotationY={Math.PI / 4} walking />
      <Female3D position={[1.2, 0, 0.8]} scale={0.6} rotationY={-Math.PI / 3} walking />
      <Male3D position={[-3.5, 0, -2.8]} scale={0.65} rotationY={Math.PI / 6} /> {/* Near coffee stall */}
      <Female3D position={[-2.8, 0, 3.2]} scale={0.6} rotationY={Math.PI / 2} /> {/* Near bus stop */}
      <Male3D position={[2.2, 0, 2.8]} scale={0.6} rotationY={-Math.PI / 4} /> {/* Near auto rickshaws */}
      
      {/* Medical supplies kirana store - essential near medical college */}
      <KiranaStore position={[-5.5, 0, 1]} storeName="BMS Medical Store" type="medical" scale={0.6} />
      
      {/* Roaming dogs - common in Indian streets */}
      <PetDog3D position={[-1.5, 0, -3.5]} scale={0.8} walkRadius={1} walkSpeed={0.25} />
      <PetDog3D position={[3.5, 0, 1]} scale={0.9} walkRadius={0.8} walkSpeed={0.3} />
      
      {/* Flying birds around college - adds life to the sky */}
      <Bird position={[-2, 4, -1]} color="#FFD93D" speed={1.1} />
      <Bird position={[3, 5, 2]} color="#6BCB77" speed={0.9} phase={1.2} />
      <Butterfly position={[1, 2.5, -2]} color="#FF69B4" speed={0.8} />
      
      {/* Street lighting - consistent with city landmarks */}
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
      
      {/* Special memory steps - where you first talked (repositioned) */}
      <mesh position={[-1, 0.1, 2]}>
        <boxGeometry args={[2, 0.2, 0.6]} />
        <meshStandardMaterial color="#696969" />
      </mesh>
      <mesh position={[-1, 0.2, 2.3]}>
        <boxGeometry args={[1.5, 0.2, 0.6]} />
        <meshStandardMaterial color="#696969" />
      </mesh>
      
      {/* Romantic lighting around the college */}
      <pointLight 
        position={[0, 4, 0]} 
        intensity={0.5} 
        color="#FFD700" 
        distance={8}
      />
      
      {/* Interactive memory tooltip */}
      {(showMemoryTooltip || showLabel) && (
        <Html position={[0, 4, 0]} center>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-gradient-to-r from-pink-500/90 to-purple-600/90 backdrop-blur-md rounded-lg p-4 text-white text-center max-w-xs"
          >
            <h3 className="font-bold text-lg mb-2">🎓 BMS College</h3>
            <p className="text-sm">
              "An important place from January 18th..."
            </p>
            <p className="text-xs mt-2 opacity-75">
              Click to discover more ✨
            </p>
          </motion.div>
        </Html>
      )}
      
      {/* Floating heart particles around the college */}
      {isHovered && (
        <>
          <mesh position={[2, 3, 1]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial 
              color="#FF69B4" 
              emissive="#FF1493"
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
          <mesh position={[-2, 3.5, -1]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial 
              color="#FF69B4" 
              emissive="#FF1493"
              emissiveIntensity={0.8}
              transparent
              opacity={0.6}
            />
          </mesh>
          <mesh position={[1.5, 4, -0.5]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial 
              color="#FF69B4" 
              emissive="#FF1493"
              emissiveIntensity={0.8}
              transparent
              opacity={0.5}
            />
          </mesh>
        </>
      )}
    </group>
  );
}