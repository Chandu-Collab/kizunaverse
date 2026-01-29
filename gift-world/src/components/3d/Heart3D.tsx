import { useRef } from 'react';
import { Shape, ExtrudeGeometry } from 'three';

export default function Heart3D({ color = '#FF4F8B', scale = 1 }) {
  const meshRef = useRef();
  // Heart shape path
  const heartShape = new Shape();
  heartShape.moveTo(0, 0.25);
  heartShape.bezierCurveTo(0, 0.25, -0.3, 0, 0, -0.35);
  heartShape.bezierCurveTo(0.3, 0, 0, 0.25, 0, 0.25);

  return (
    <mesh ref={meshRef} scale={[scale, scale, scale]} rotation={[Math.PI, 0, 0]} castShadow receiveShadow>
      <extrudeGeometry args={[heartShape, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 2 }]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} emissive={color} emissiveIntensity={0.2} />
    </mesh>
  );
}
