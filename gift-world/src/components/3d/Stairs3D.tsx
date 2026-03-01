import React from 'react';
import { Text } from '@react-three/drei';

interface Stairs3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  stairsDirection?: 'left' | 'right';
  floorHeight?: number;
  isNight?: boolean;
}

const Stairs3D: React.FC<Stairs3DProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  stairsDirection = 'left',
  floorHeight = 6,
  isNight = false,
}) => {
  const stepCount = 10; // Reduced for smaller stairs
  const stepWidth = 3; // Much smaller to match building scale
  const stepDepth = 0.6; // Smaller depth for better proportions
  const stepHeight = floorHeight / stepCount;

  // Define materials based on time
  const stairMaterial = isNight 
    ? { color: '#2a3f5f', roughness: 0.7, metalness: 0.1 }
    : { color: '#5a6b7a', roughness: 0.6, metalness: 0.2 };

  const handrailMaterial = isNight
    ? { color: '#1a2332', roughness: 0.3, metalness: 0.4 }
    : { color: '#3a4956', roughness: 0.3, metalness: 0.4 };

  // Generate steps
  const steps = Array.from({ length: stepCount }, (_, i) => {
    const stepY = i * stepHeight;
    const stepZ = i * stepDepth;
    
    return (
      <group key={i} position={[0, stepY, stepZ]}>
        {/* Step surface */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[stepWidth, stepHeight, stepDepth]} />
          <meshStandardMaterial {...stairMaterial} />
        </mesh>
        {/* Step riser */}
        <mesh position={[0, -stepHeight/2, stepDepth/2]} receiveShadow castShadow>
          <boxGeometry args={[stepWidth, stepHeight, 0.1]} />
          <meshStandardMaterial {...stairMaterial} />
        </mesh>
      </group>
    );
  });

  // Handrails - smaller proportions
  const handrailHeight = 0.8; // Reduced from 1
  const handrailLength = stepCount * stepDepth;
  
  return (
    <group position={position} rotation={rotation}>
      {/* Steps */}
      {steps}
      
      {/* Left handrail */}
      <group position={[-stepWidth/2 + 0.1, handrailHeight/2, handrailLength/2]}>
        <mesh castShadow>
          <boxGeometry args={[0.1, handrailHeight, handrailLength]} />
          <meshStandardMaterial {...handrailMaterial} />
        </mesh>
        {/* Handrail top */}
        <mesh position={[0, handrailHeight/2, 0]} castShadow>
          <boxGeometry args={[0.3, 0.1, handrailLength]} />
          <meshStandardMaterial {...handrailMaterial} />
        </mesh>
      </group>
      
      {/* Right handrail */}
      <group position={[stepWidth/2 - 0.1, handrailHeight/2, handrailLength/2]}>
        <mesh castShadow>
          <boxGeometry args={[0.1, handrailHeight, handrailLength]} />
          <meshStandardMaterial {...handrailMaterial} />
        </mesh>
        {/* Handrail top */}
        <mesh position={[0, handrailHeight/2, 0]} castShadow>
          <boxGeometry args={[0.3, 0.1, handrailLength]} />
          <meshStandardMaterial {...handrailMaterial} />
        </mesh>
      </group>

      {/* Support pillars at start and end */}
      <mesh position={[-stepWidth/2 + 0.1, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, handrailHeight]} />
        <meshStandardMaterial {...handrailMaterial} />
      </mesh>
      <mesh position={[stepWidth/2 - 0.1, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, handrailHeight]} />
        <meshStandardMaterial {...handrailMaterial} />
      </mesh>
      <mesh position={[-stepWidth/2 + 0.1, floorHeight, handrailLength]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, handrailHeight]} />
        <meshStandardMaterial {...handrailMaterial} />
      </mesh>
      <mesh position={[stepWidth/2 - 0.1, floorHeight, handrailLength]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, handrailHeight]} />
        <meshStandardMaterial {...handrailMaterial} />
      </mesh>

      {/* Stairs label - smaller for proportional size */}
      <Text
        position={[0, floorHeight + 0.3, handrailLength/2]}
        fontSize={0.3}
        color={isNight ? "#64b5f6" : "#1976d2"}
        anchorX="center"
        anchorY="middle"
      >
        {stairsDirection === 'left' ? 'Stairs (Left)' : 'Stairs (Right)'}
      </Text>

      {/* Base platform - smaller */}
      <mesh position={[0, -0.1, -stepDepth]} receiveShadow>
        <boxGeometry args={[stepWidth + 0.5, 0.2, 1.5]} />
        <meshStandardMaterial color="#4a5960" />
      </mesh>

      {/* Top platform - smaller */}
      <mesh position={[0, floorHeight + 0.1, handrailLength + stepDepth]} receiveShadow>
        <boxGeometry args={[stepWidth + 0.5, 0.2, 1.5]} />
        <meshStandardMaterial color="#4a5960" />
      </mesh>
    </group>
  );
};

export default Stairs3D;