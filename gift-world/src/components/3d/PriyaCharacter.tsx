import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Html, useGLTF } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';

interface PriyaCharacterProps {
  initialPosition?: [number, number, number];
  roamRadius?: number;
  onInteract?: (pos?: [number, number, number]) => void;
}

export default PriyaCharacter;

// Simple roaming logic: moves Priya in a circle
function PriyaCharacter({
  initialPosition = [0, 1, 6],
  roamRadius = 4,
  onInteract,
}: PriyaCharacterProps) {
  const { isNight } = useTheme();
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const messageTimeout = useRef<NodeJS.Timeout | null>(null);

  // Map bounds (approximate, based on OotyScene and navigation objects)
  const roamBounds = {
    minX: -10,
    maxX: 10,
    minZ: -12,
    maxZ: 8,
  };
  // Roam in a large elliptical path covering most of the map
  const ROAM_SPEED = 0.15;
  const ROAM_SCALE = { normal: 0.48, hovered: 0.62 };
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      const a = (roamBounds.maxX - roamBounds.minX) / 2 - 2;
      const b = (roamBounds.maxZ - roamBounds.minZ) / 2 - 2;
      const centerX = (roamBounds.maxX + roamBounds.minX) / 2;
      const centerZ = (roamBounds.maxZ + roamBounds.minZ) / 2;
      const x = centerX + Math.cos(t * ROAM_SPEED) * a;
      const z = centerZ + Math.sin(t * ROAM_SPEED) * b;
      meshRef.current.position.x = x;
      meshRef.current.position.z = z;
      meshRef.current.rotation.y = Math.sin(t * 0.5);
      meshRef.current.scale.setScalar(hovered ? ROAM_SCALE.hovered : ROAM_SCALE.normal);
    }
  });

  // Load Priya's GLB model
  const gltf = useGLTF('/cute_girl_character.glb');

  // (Removed duplicate useFrame)

  // Helper to show message after 2s
  const triggerMessage = () => {
    if (messageTimeout.current) clearTimeout(messageTimeout.current);
    messageTimeout.current = setTimeout(() => setShowMessage(true), 2000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (messageTimeout.current) clearTimeout(messageTimeout.current);
    };
  }, []);

  return (
    <group>
      {/* Character lighting for better visibility */}
      <ambientLight intensity={isNight ? 0.6 : 0.4} />
      <pointLight 
        position={[2, 3, 2]} 
        intensity={isNight ? 0.8 : 0.3} 
        color={isNight ? "#FFE4B5" : "#FFFFFF"}
        distance={8}
        decay={2}
      />
      
      <primitive
        ref={meshRef}
        object={gltf.scene}
        position={initialPosition}
        onPointerOver={() => {
          setHovered(true);
          triggerMessage();
        }}
        onPointerOut={() => {
          setHovered(false);
          setShowMessage(false);
          if (messageTimeout.current) clearTimeout(messageTimeout.current);
        }}
        onClick={() => {
          triggerMessage();
          if (onInteract && meshRef.current) {
            const pos = [meshRef.current.position.x, meshRef.current.position.y, meshRef.current.position.z] as [number, number, number];
            onInteract(pos);
          }
        }}
        castShadow
        receiveShadow
        scale={hovered ? 0.7 : 0.5} // Smaller size
      />
      {/* Floating name label */}
      <Html center position={[0, 2.2, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 1px 4px #000', fontSize: 18 }}>My</div>
      </Html>
      {/* Message bubble on hover/click, after 2s */}
      {showMessage && (
        <Html center position={[0, 3.2, 0]} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            color: '#b83280',
            borderRadius: 12,
            padding: '8px 16px',
            fontWeight: 500,
            fontSize: 16,
            boxShadow: '0 2px 8px #0002',
            maxWidth: 220,
            textAlign: 'center',
          }}>
            Hi, I’m My! Let me show you around. Click any floating object to explore a zone!
          </div>
        </Html>
      )}
    </group>
  );
}
