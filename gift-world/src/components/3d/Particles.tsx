'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, BufferGeometry, Float32BufferAttribute } from 'three';

export default function Particles({ count = 100 }: { count?: number }) {
  const pointsRef = useRef<Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  const geometry = useMemo(() => {
    const geom = new BufferGeometry();
    geom.setAttribute('position', new Float32BufferAttribute(particles, 3));
    return geom;
  }, [particles]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.1}
        color="#FFFFFF"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}
