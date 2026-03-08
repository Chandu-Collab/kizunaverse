import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color } from 'three';

type Vec3 = [number, number, number];

interface Fountain3DProps {
  position?: Vec3;
  scale?: number;
}

export default function Fountain3D({ position = [3, 0, -2], scale = 1 }: Fountain3DProps) {
  const waterRef = useRef<any>(null);
  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.12, 32]} />
        <meshStandardMaterial color="#B0C4DE" />
      </mesh>
      {/* Water with animated ripples */}
      <mesh ref={waterRef} position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.06, 32]} />
        <shaderMaterial
          attach="material"
          args={[{
            uniforms: {
              uTime: { value: 0 },
              uColor: { value: new Color('#87CEEB') },
              uOpacity: { value: 0.7 },
            },
            vertexShader: `
              uniform float uTime;
              varying vec2 vUv;
              void main() {
                vUv = uv;
                vec3 pos = position;
                float freq = 4.0;
                float amp = 0.03;
                pos.x += sin((pos.y + uTime * 1.2) * freq) * amp;
                pos.y += sin((pos.x + uTime * 0.8) * freq * 1.1) * amp;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
              }
            `,
            fragmentShader: `
              uniform vec3 uColor;
              uniform float uOpacity;
              varying vec2 vUv;
              void main() {
                float ripple = 0.5 + 0.5 * sin((vUv.x + vUv.y) * 40.0);
                gl_FragColor = vec4(uColor * (0.85 + 0.15 * ripple), uOpacity);
              }
            `,
            transparent: true,
          }]} />
      </mesh>
      {/* Center column */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.22, 16]} />
        <meshStandardMaterial color="#B0C4DE" />
      </mesh>
      {/* Water spout */}
      <mesh position={[0, 0.32, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}
