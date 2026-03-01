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

  // Define hospital-grade materials based on time
  const stairMaterial = isNight 
    ? { color: '#b3e5fc', roughness: 0.1, metalness: 0.8 }
    : { color: '#e0e0e0', roughness: 0.2, metalness: 0.6 };

  const handrailMaterial = isNight
    ? { color: '#90caf9', roughness: 0.1, metalness: 0.9 }
    : { color: '#607d8b', roughness: 0.1, metalness: 0.8 };

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

      {/* Hospital-style stairs label */}
      <Text
        position={[0, floorHeight + 0.3, handrailLength/2]}
        fontSize={0.3}
        color={isNight ? "#90caf9" : "#1976d2"}
        anchorX="center"
        anchorY="middle"
      >
        {stairsDirection === 'left' ? 'Stairs (Left)' : 'Stairs (Right)'}
      </Text>

      {/* Emergency lighting */}
      <pointLight
        position={[0, floorHeight + 0.5, handrailLength/2]}
        intensity={isNight ? 0.6 : 0.3}
        color={isNight ? "#b3c6ff" : "#ffffff"}
        distance={4}
      />

      {/* Base platform - hospital grade */}
      <mesh position={[0, -0.1, -stepDepth]} receiveShadow>
        <boxGeometry args={[stepWidth + 0.5, 0.2, 1.5]} />
        <meshStandardMaterial 
          color="#bdbdbd" 
          roughness={0.2} 
          metalness={0.6}
        />
      </mesh>

      {/* Top platform - hospital grade */}
      <mesh position={[0, floorHeight + 0.1, handrailLength + stepDepth]} receiveShadow>
        <boxGeometry args={[stepWidth + 0.5, 0.2, 1.5]} />
        <meshStandardMaterial 
          color="#bdbdbd" 
          roughness={0.2} 
          metalness={0.6}
        />
      </mesh>

      {/* Safety strips on steps */}
      {Array.from({ length: stepCount }, (_, i) => (
        <mesh key={`safety-${i}`} position={[0, i * stepHeight + 0.01, i * stepDepth + stepDepth/2 - 0.05]}>
          <boxGeometry args={[stepWidth, 0.01, 0.1]} />
          <meshStandardMaterial 
            color="#ffeb3b" 
            emissive="#fff59d"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* Hospital signage */}
      <mesh position={[0, floorHeight + 0.6, handrailLength/2]}>
        <boxGeometry args={[1.2, 0.3, 0.05]} />
        <meshStandardMaterial 
          color="#1976d2"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
};

export default Stairs3D;