import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Html, useGLTF } from '@react-three/drei';

interface UruruCharacterProps {
  initialPosition?: [number, number, number];
  roamRadius?: number;
  onInteract?: (pos?: [number, number, number]) => void;
}

export default UruruCharacter;

function UruruCharacter({
  initialPosition = [0, 1, 6],
  roamRadius = 4,
  onInteract,
}: UruruCharacterProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Map bounds (approximate, based on OotyScene and navigation objects)
  const roamBounds = {
    minX: -10,
    maxX: 10,
    minZ: -12,
    maxZ: 8,
  };
  // Roam in a large elliptical path covering most of the map
  const ROAM_SPEED = 0.15;
  const ROAM_SCALE = { normal: 1.5, hovered: 2.0 };
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

  // Load Ururu's GLB model
  const gltf = useGLTF('/ururu.glb');

  return (
    <group>
      <primitive
        ref={meshRef}
        object={gltf.scene}
        position={initialPosition}
        onPointerOver={() => {
          setHovered(true);
          setShowMessage(true);
        }}
        onPointerOut={() => {
          setHovered(false);
          setShowMessage(false);
        }}
        onClick={() => {
          setShowMessage(true);
          if (onInteract && meshRef.current) {
            const pos = [meshRef.current.position.x, meshRef.current.position.y, meshRef.current.position.z] as [number, number, number];
            onInteract(pos);
          }
        }}
        castShadow
        receiveShadow
        scale={hovered ? 1.2 : 1}
      />
      {/* Floating name label */}
      <Html center position={[0, 2.2, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 1px 4px #000', fontSize: 18 }}>Ururu</div>
      </Html>
      {/* Message bubble on hover/click */}
      {showMessage && (
        <Html center position={[0, 3.2, 0]} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            color: '#1e90ff',
            borderRadius: 12,
            padding: '8px 16px',
            fontWeight: 500,
            fontSize: 16,
            boxShadow: '0 2px 8px #0002',
            maxWidth: 220,
            textAlign: 'center',
          }}>
            Hi, I’m Ururu! Ready to explore the world with you!
          </div>
        </Html>
      )}
    </group>
  );
}
