import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// @ts-ignore
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const MODEL_PATH = '/Animated.fbx';

function AnimatedFBXModel() {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    const loader = new FBXLoader();
    let mounted = true;
    loader.load(MODEL_PATH, (fbx: any) => {
      if (!mounted) return;
      modelRef.current = fbx as THREE.Group;
      if (groupRef.current && modelRef.current) {
        groupRef.current.add(modelRef.current);
        setModelLoaded(true);
      }
    });
    return () => {
      mounted = false;
      if (groupRef.current && modelRef.current) {
        groupRef.current.remove(modelRef.current as THREE.Object3D);
      }
    };
  }, []);

  useFrame(() => {
    // No animation mixer for static display
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 6]} scale={[1.2, 1.2, 1.2]}>
      {/* Add a light for better visibility */}
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      {/* Show loading message if model not loaded */}
      {!modelLoaded && (
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[1, 0.2, 1]} />
          <meshStandardMaterial color="#b83280" />
        </mesh>
      )}
    </group>
  );
}

export default AnimatedFBXModel;