'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Html, Sky } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/hooks/useTheme';

type Vec3 = [number, number, number];
type WeatherType = 'sunny' | 'rainy' | 'cloudy' | 'monsoon' | 'winter';

type BotanicalGardenProps = {
  weatherType?: WeatherType;
};

type TreeProps = {
  position: Vec3;
  trunkHeight?: number;
  canopyScale?: number;
  windStrength?: number;
};

function GardenTree({ position, trunkHeight = 2.2, canopyScale = 1, windStrength = 1 }: TreeProps) {
  const canopyRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!canopyRef.current) {
      return;
    }

    const t = clock.getElapsedTime();
    canopyRef.current.rotation.z = Math.sin(t * (0.35 + windStrength * 0.08) + position[0] * 0.3) * (0.02 + windStrength * 0.018);
    canopyRef.current.rotation.x = Math.cos(t * (0.28 + windStrength * 0.06) + position[2] * 0.25) * (0.015 + windStrength * 0.012);
  });

  return (
    <group position={position}>
      <mesh position={[0, trunkHeight * 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.14, 0.2, trunkHeight, 10]} />
        <meshStandardMaterial color="#6e4f34" roughness={0.75} />
      </mesh>

      <group ref={canopyRef}>
        <mesh position={[0, trunkHeight + 0.35, 0]} castShadow>
          <sphereGeometry args={[0.75 * canopyScale, 12, 12]} />
          <meshStandardMaterial color="#3f7f3a" roughness={0.85} />
        </mesh>
        <mesh position={[0.45, trunkHeight + 0.2, 0.1]} castShadow>
          <sphereGeometry args={[0.52 * canopyScale, 12, 12]} />
          <meshStandardMaterial color="#4f9446" roughness={0.82} />
        </mesh>
        <mesh position={[-0.42, trunkHeight + 0.22, -0.14]} castShadow>
          <sphereGeometry args={[0.48 * canopyScale, 12, 12]} />
          <meshStandardMaterial color="#3a7335" roughness={0.86} />
        </mesh>
      </group>
    </group>
  );
}

type FlowerPatchProps = {
  position: Vec3;
  colors: string[];
  windStrength?: number;
};

function FlowerPatch({ position, colors, windStrength = 1 }: FlowerPatchProps) {
  const patchRef = useRef<THREE.Group>(null);
  const offsets = useMemo(
    () => [
      [-0.24, 0, -0.16],
      [-0.1, 0, 0.08],
      [0.02, 0, -0.05],
      [0.15, 0, 0.15],
      [0.26, 0, -0.12],
      [0.11, 0, 0.26],
    ] as Vec3[],
    []
  );

  useFrame(({ clock }) => {
    if (!patchRef.current) {
      return;
    }

    const t = clock.getElapsedTime();
    patchRef.current.children.forEach((child, idx) => {
      const item = child as THREE.Group;
      item.rotation.z = Math.sin(t * (1.1 + windStrength * 0.25) + idx * 0.65 + position[0]) * (0.04 + windStrength * 0.03);
      item.rotation.x = Math.cos(t * (0.8 + windStrength * 0.2) + idx * 0.5 + position[2]) * (0.02 + windStrength * 0.016);
    });
  });

  return (
    <group ref={patchRef} position={position}>
      {offsets.map((offset, idx) => {
        const flowerHeight = 0.2 + (idx % 3) * 0.05;
        return (
          <group key={`flower-${idx}`} position={offset}>
            <mesh position={[0, flowerHeight * 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.012, 0.018, flowerHeight, 6]} />
              <meshStandardMaterial color="#4f8a42" roughness={0.8} />
            </mesh>
            <mesh position={[0, flowerHeight + 0.05, 0]} castShadow>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial color={colors[idx % colors.length]} roughness={0.45} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function FountainWater({ isNight, wetWeather }: { isNight: boolean; wetWeather: boolean }) {
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!waterRef.current) {
      return;
    }

    const t = clock.getElapsedTime();
    const material = waterRef.current.material as THREE.MeshStandardMaterial;
    const weatherBoost = wetWeather ? 0.05 : 0;
    material.emissiveIntensity = (isNight ? 0.16 : 0.1) + weatherBoost + Math.sin(t * 1.6) * (isNight ? 0.06 : 0.04);
    waterRef.current.scale.setScalar(1 + Math.sin(t * 2.1) * 0.015);
  });

  return (
    <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.43, 0]} receiveShadow>
      <circleGeometry args={[0.55, 32]} />
      <meshStandardMaterial
        color={isNight ? '#6aa8cc' : '#7ec9d6'}
        roughness={0.22}
        metalness={0.15}
        emissive={isNight ? '#9ad9ff' : '#8dcfdd'}
        emissiveIntensity={isNight ? 0.16 : 0.1}
      />
    </mesh>
  );
}

function FountainJets({ isNight, wetWeather }: { isNight: boolean; wetWeather: boolean }) {
  const centralJetRef = useRef<THREE.Mesh>(null);
  const arcRefs = useRef<Array<THREE.Mesh | null>>([]);
  const splashRefs = useRef<Array<THREE.Mesh | null>>([]);
  const arcCurveData = useMemo(() => {
    const data: Array<{ curve: THREE.QuadraticBezierCurve3; geometry: THREE.TubeGeometry }> = [];

    [0, 60, 120, 180, 240, 300].forEach((deg) => {
      const rad = (deg * Math.PI) / 180;
      const start = new THREE.Vector3(Math.cos(rad) * 0.07, 0.9, Math.sin(rad) * 0.07);
      const control = new THREE.Vector3(Math.cos(rad) * 0.28, 1.2, Math.sin(rad) * 0.28);
      const end = new THREE.Vector3(Math.cos(rad) * 0.52, 0.47, Math.sin(rad) * 0.52);
      const curve = new THREE.QuadraticBezierCurve3(start, control, end);
      data.push({ curve, geometry: new THREE.TubeGeometry(curve, 24, 0.013, 8, false) });
    });

    return data;
  }, []);

  const dropletRefs = useRef<Array<THREE.Mesh | null>>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (centralJetRef.current) {
      const pulse = 1 + Math.sin(t * 5.2) * 0.08;
      centralJetRef.current.scale.set(1, pulse, 1);
      const mat = centralJetRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = (isNight ? 0.58 : 0.52) + Math.sin(t * 4.6) * 0.07;
      mat.emissiveIntensity = (isNight ? 0.32 : 0.22) + Math.sin(t * 2.4) * 0.05;
    }

    arcRefs.current.forEach((mesh, idx) => {
      if (!mesh) {
        return;
      }

      const turbulence = wetWeather ? 1.45 : 1;
      mesh.rotation.y = Math.sin(t * 0.9 * turbulence + idx * 0.8) * 0.03;
      mesh.rotation.x = Math.cos(t * 1.1 * turbulence + idx * 0.55) * 0.015;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = (isNight ? 0.48 : 0.4) + Math.sin(t * 3.5 + idx) * 0.04;
    });

    splashRefs.current.forEach((mesh, idx) => {
      if (!mesh) {
        return;
      }

      const phase = t * (wetWeather ? 2.35 : 1.9) + idx * 0.5;
      const pulse = 0.8 + ((Math.sin(phase) + 1) / 2) * 0.9;
      mesh.scale.set(pulse, pulse, 1);
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = (isNight ? 0.22 : 0.16) + Math.sin(phase) * 0.05;
    });

    dropletRefs.current.forEach((mesh, idx) => {
      if (!mesh) {
        return;
      }

      const curveData = arcCurveData[idx % arcCurveData.length];
      const speed = (0.42 + (idx % 4) * 0.08) * (wetWeather ? 1.25 : 1);
      const u = (t * speed + idx * 0.17) % 1;
      const point = curveData.curve.getPointAt(u);
      mesh.position.set(point.x, point.y, point.z);

      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.45 + Math.sin(t * 7 + idx) * 0.12;
    });
  });

  return (
    <group>
      <mesh ref={centralJetRef} position={[0, 1.06, 0]}>
        <cylinderGeometry args={[0.022, 0.038, 0.64, 10]} />
        <meshStandardMaterial
          color="#bfefff"
          emissive="#8ad9f2"
          emissiveIntensity={0.22}
          transparent
          opacity={0.52}
          roughness={0.12}
          metalness={0.03}
          depthWrite={false}
        />
      </mesh>

      {arcCurveData.map((item, idx) => (
        <mesh
          key={`arc-stream-${idx}`}
          geometry={item.geometry}
          ref={(node) => {
            arcRefs.current[idx] = node;
          }}
        >
          <meshStandardMaterial
            color="#a7e8ff"
            emissive="#7bcdeb"
            emissiveIntensity={isNight ? 0.22 : 0.15}
            transparent
            opacity={isNight ? 0.48 : 0.4}
            roughness={0.1}
            metalness={0.02}
            depthWrite={false}
          />
        </mesh>
      ))}

      {arcCurveData.map((item, idx) => {
        const end = item.curve.getPoint(1);
        return (
          <mesh
            key={`splash-ring-${idx}`}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[end.x, end.y + 0.005, end.z]}
            ref={(node) => {
              splashRefs.current[idx] = node;
            }}
          >
            <ringGeometry args={[0.04, 0.08, 20]} />
            <meshStandardMaterial
              color="#d7f5ff"
              emissive="#a0e0ff"
              emissiveIntensity={isNight ? 0.34 : 0.2}
              transparent
              opacity={isNight ? 0.22 : 0.16}
              depthWrite={false}
            />
          </mesh>
        );
      })}

      {Array.from({ length: arcCurveData.length * 4 }).map((_, idx) => (
        <mesh
          key={`droplet-${idx}`}
          ref={(node) => {
            dropletRefs.current[idx] = node;
          }}
          position={[0, 0.9, 0]}
        >
          <sphereGeometry args={[0.014, 8, 8]} />
          <meshStandardMaterial color="#ddf6ff" emissive="#a8e6ff" emissiveIntensity={0.24} transparent opacity={0.5} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function FountainMist({ isNight, wetWeather }: { isNight: boolean; wetWeather: boolean }) {
  const mistRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!mistRef.current) {
      return;
    }

    const t = clock.getElapsedTime();
    mistRef.current.children.forEach((child, idx) => {
      const puff = child as THREE.Mesh;
      const phase = idx * 0.6;
      puff.position.y = 0.55 + (idx % 3) * 0.08 + Math.sin(t * 1.2 + phase) * 0.05;
      const mat = puff.material as THREE.MeshStandardMaterial;
      mat.opacity = (isNight ? 0.27 : 0.22) + (wetWeather ? 0.04 : 0) + Math.sin(t * 1.8 + phase) * 0.05;
    });
  });

  return (
    <group ref={mistRef} position={[0, 0, 0]}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <mesh key={`mist-${deg}`} position={[Math.cos(rad) * 0.16, 0.6, Math.sin(rad) * 0.16]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color="#dbf5ff" transparent opacity={isNight ? 0.27 : 0.22} roughness={1} depthWrite={false} />
          </mesh>
        );
      })}
    </group>
  );
}

function ButterflySwarm() {
  const swarmRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!swarmRef.current) {
      return;
    }

    const t = clock.getElapsedTime();
    swarmRef.current.children.forEach((child, idx) => {
      const mesh = child as THREE.Mesh;
      const phase = idx * 1.2;
      mesh.position.x = Math.cos(t * 0.9 + phase) * (1.2 + idx * 0.1);
      mesh.position.y = 1.8 + Math.sin(t * 1.8 + phase) * 0.28;
      mesh.position.z = Math.sin(t * 0.7 + phase) * (0.8 + idx * 0.15);
    });
  });

  return (
    <group ref={swarmRef} position={[0, 0, -0.1]}>
      {['#f6b26b', '#ffd966', '#f4cccc', '#cfe2f3'].map((color, idx) => (
        <mesh key={`butterfly-${idx}`} castShadow>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} roughness={0.45} />
        </mesh>
      ))}
    </group>
  );
}

function DragonflySwarm() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, idx) => {
      const mesh = child as THREE.Mesh;
      const phase = idx * 0.92;
      mesh.position.x = Math.cos(t * 1.45 + phase) * (1 + idx * 0.08) + 1.4;
      mesh.position.y = 1.55 + Math.sin(t * 2.5 + phase) * 0.2;
      mesh.position.z = Math.sin(t * 1.25 + phase) * (0.7 + idx * 0.1) - 0.5;
      mesh.rotation.y = t * 1.6 + phase;
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <mesh key={`dragonfly-${idx}`}>
          <capsuleGeometry args={[0.015, 0.08, 4, 8]} />
          <meshStandardMaterial color="#85c6da" emissive="#9cd7eb" emissiveIntensity={0.2} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

function BirdFlock() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, idx) => {
      const bird = child as THREE.Group;
      const phase = idx * 0.7;
      bird.position.x = Math.cos(t * 0.28 + phase) * (5.2 + idx * 0.35);
      bird.position.y = 4.2 + Math.sin(t * 0.8 + phase) * 0.35;
      bird.position.z = -2.8 + Math.sin(t * 0.33 + phase) * 1.2;
      bird.rotation.y = Math.PI + t * 0.2;
      bird.rotation.z = Math.sin(t * 6 + phase) * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 4 }).map((_, idx) => (
        <group key={`bird-${idx}`}>
          <mesh>
            <coneGeometry args={[0.05, 0.16, 3]} />
            <meshStandardMaterial color="#2f3b4a" roughness={0.7} />
          </mesh>
          <mesh position={[-0.06, 0.01, 0]} rotation={[0, 0, Math.PI / 7]}>
            <boxGeometry args={[0.1, 0.01, 0.04]} />
            <meshStandardMaterial color="#3b4552" roughness={0.7} />
          </mesh>
          <mesh position={[0.06, 0.01, 0]} rotation={[0, 0, -Math.PI / 7]}>
            <boxGeometry args={[0.1, 0.01, 0.04]} />
            <meshStandardMaterial color="#3b4552" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function PathEdgePebbles() {
  const stones = useMemo(() => {
    const values: Array<{ position: Vec3; scale: number; tone: string }> = [];

    for (let i = 0; i < 26; i += 1) {
      const z = 1.8 - i * 0.23;
      const curve = Math.sin(i * 0.45) * 0.75;
      const side = i % 2 === 0 ? 1 : -1;
      const x = curve + side * 0.9;
      const scale = 0.06 + (i % 5) * 0.012;
      const tone = i % 3 === 0 ? '#a7aa9e' : i % 3 === 1 ? '#8f938a' : '#b1b4ab';

      values.push({ position: [x, 0.02, z], scale, tone });
    }

    return values;
  }, []);

  return (
    <group>
      {stones.map((stone, idx) => (
        <mesh key={`edge-stone-${idx}`} position={stone.position} castShadow receiveShadow>
          <sphereGeometry args={[stone.scale, 10, 10]} />
          <meshStandardMaterial color={stone.tone} roughness={0.92} />
        </mesh>
      ))}
    </group>
  );
}

function PathWearDecals() {
  return (
    <group>
      {[-2.8, -1.85, -0.88, 0.1, 1.08, 2.1].map((x, idx) => (
        <mesh key={`wear-${idx}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.012, 1.58 - idx * 0.58]} receiveShadow>
          <circleGeometry args={[0.34, 20]} />
          <meshStandardMaterial color="#7f725f" roughness={0.97} transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function GardenLamp({ position, isNight }: { position: Vec3; isNight: boolean }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.03, 0.04, 1.4, 10]} />
        <meshStandardMaterial color="#4f5359" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.48, 0]} castShadow>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshStandardMaterial color={isNight ? '#ffe8a8' : '#dce4ea'} emissive={isNight ? '#ffd35e' : '#000000'} emissiveIntensity={isNight ? 0.8 : 0} roughness={0.25} />
      </mesh>
      {isNight && <pointLight position={[0, 1.48, 0]} intensity={0.4} color="#ffe8a8" distance={4.5} />}
    </group>
  );
}

function GardenSign() {
  return (
    <group position={[-3.9, 0, 2.9]}>
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.7, 0.06]} />
        <meshStandardMaterial color="#c89f6a" roughness={0.68} />
      </mesh>
      <mesh position={[-0.42, 0.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.64, 0.08]} />
        <meshStandardMaterial color="#6d5238" roughness={0.76} />
      </mesh>
      <mesh position={[0.42, 0.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.64, 0.08]} />
        <meshStandardMaterial color="#6d5238" roughness={0.76} />
      </mesh>
      <Html position={[0, 0.75, 0.05]} center transform occlude>
        <div style={{ color: '#243018', fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em', background: 'rgba(245, 236, 218, 0.86)', padding: '4px 6px', borderRadius: '6px', border: '1px solid rgba(90, 70, 42, 0.35)' }}>
          BOTANICAL WALK
        </div>
      </Html>
    </group>
  );
}

function GardenTools() {
  return (
    <group position={[2.9, 0, -2.65]}>
      <mesh position={[0, 0.16, 0]} rotation={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.09, 0.13, 0.18, 12]} />
        <meshStandardMaterial color="#87a6b6" roughness={0.45} />
      </mesh>
      <mesh position={[0.32, 0.22, -0.04]} rotation={[0, -0.2, Math.PI / 2.8]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.55, 8]} />
        <meshStandardMaterial color="#8f6f46" roughness={0.74} />
      </mesh>
      <mesh position={[0.52, 0.09, -0.04]} rotation={[0, 0, Math.PI / 2.8]} castShadow>
        <boxGeometry args={[0.12, 0.04, 0.1]} />
        <meshStandardMaterial color="#7f8288" roughness={0.6} />
      </mesh>
    </group>
  );
}

function DistantBoundaryTrees() {
  return (
    <group>
      {[-4.8, -3.1, -1.2, 1.0, 3.0, 4.7].map((x, idx) => (
        <group key={`distant-tree-${idx}`} position={[x, 0, -4.9]}>
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 1.4, 8]} />
            <meshStandardMaterial color="#5c442e" roughness={0.82} />
          </mesh>
          <mesh position={[0, 1.55, 0]}>
            <sphereGeometry args={[0.42 + (idx % 2) * 0.08, 10, 10]} />
            <meshStandardMaterial color="#355f33" roughness={0.9} transparent opacity={0.88} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Fireflies({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || !active) {
      return;
    }

    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, idx) => {
      const light = child as THREE.Mesh;
      const phase = idx * 0.8;
      light.position.x = Math.cos(t * 0.55 + phase) * (2 + (idx % 4) * 0.25);
      light.position.z = Math.sin(t * 0.5 + phase) * (1.5 + (idx % 3) * 0.2);
      light.position.y = 1.1 + Math.sin(t * 1.6 + phase) * 0.35;

      const mat = light.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.7 + Math.sin(t * 2.3 + phase) * 0.25;
    });
  });

  if (!active) {
    return null;
  }

  return (
    <group ref={groupRef}>
      {Array.from({ length: 14 }).map((_, idx) => (
        <mesh key={`firefly-${idx}`} position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#ffe680" emissive="#ffd447" emissiveIntensity={0.85} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function GardenSoundscape({ isNight, weatherType }: { isNight: boolean; weatherType: WeatherType }) {
  useEffect(() => {
    const birds = new Audio('/audio/ambient-birds.mp3');
    const water = new Audio('/audio/ambient-water.mp3');
    const wind = new Audio('/audio/ambient-wind.mp3');

    birds.loop = true;
    water.loop = true;
    wind.loop = true;

    const isWet = weatherType === 'rainy' || weatherType === 'monsoon';
    birds.volume = isNight ? 0.04 : 0.12;
    water.volume = isNight ? 0.15 : 0.1;
    wind.volume = isWet ? 0.12 : 0.06;

    const tryPlay = (audio: HTMLAudioElement) => {
      audio.play().catch(() => {
        // Browser may block autoplay until first user interaction.
      });
    };

    tryPlay(birds);
    tryPlay(water);
    tryPlay(wind);

    return () => {
      [birds, water, wind].forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, [isNight, weatherType]);

  return null;
}

export function BotanicalGarden({ weatherType = 'sunny' }: BotanicalGardenProps) {
  const groupRef = useRef<THREE.Group>(null);
  const flowerPaletteA = ['#d96c7a', '#f3a33d', '#f4d35e', '#e27d60'];
  const flowerPaletteB = ['#a1c181', '#619b8a', '#f07167', '#ffca3a'];
  const { isNight } = useTheme();
  const [selectedHotspot, setSelectedHotspot] = useState<'fountain' | 'bench' | 'flowers' | null>(null);

  const wetWeather = weatherType === 'rainy' || weatherType === 'monsoon';
  const windyWeather = weatherType === 'cloudy' || weatherType === 'monsoon' ? 1.3 : weatherType === 'winter' ? 1.15 : 1;

  const fogColor = isNight ? '#202836' : wetWeather ? '#b7c9be' : '#d9efd0';
  const fogNear = wetWeather ? 8 : 10;
  const fogFar = wetWeather ? 24 : 34;

  return (
    <group ref={groupRef}>
      <GardenSoundscape isNight={isNight} weatherType={weatherType} />

      <Sky
        azimuth={0.22}
        inclination={isNight ? 0.12 : weatherType === 'cloudy' || wetWeather ? 0.48 : 0.58}
        distance={900}
        mieCoefficient={0.006}
        rayleigh={isNight ? 0.2 : wetWeather ? 0.42 : 0.6}
      />
      <Environment preset="park" background={false} />

      <ambientLight intensity={isNight ? 0.24 : wetWeather ? 0.31 : 0.38} />
      <hemisphereLight args={[isNight ? '#1f2d45' : '#d9f4ff', isNight ? '#344026' : '#5d6b42', isNight ? 0.36 : wetWeather ? 0.46 : 0.58]} />
      <directionalLight
        position={[6, 9, 3]}
        intensity={isNight ? 0.45 : wetWeather ? 0.7 : 0.95}
        color={isNight ? '#bfd3ff' : '#fff9ef'}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <fog attach="fog" args={[fogColor, fogNear, fogFar]} />

      {/* Main lawn with subtle variation layers */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[12, 8, 1, 1]} />
        <meshStandardMaterial color="#6f9c57" roughness={0.92} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0.16, 0]} position={[-2.6, -0.016, 0.7]} receiveShadow>
        <circleGeometry args={[2.7, 24]} />
        <meshStandardMaterial color="#628a50" roughness={0.96} transparent opacity={0.34} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, -0.08, 0]} position={[2.5, -0.015, -0.2]} receiveShadow>
        <circleGeometry args={[2.4, 24]} />
        <meshStandardMaterial color="#577f49" roughness={0.96} transparent opacity={0.3} />
      </mesh>

      {/* Curved stepping-stone path */}
      {[-2.8, -1.8, -0.8, 0.2, 1.15, 2.2].map((x, idx) => (
        <mesh key={`stone-${idx}`} position={[x, 0.03, 1.6 - idx * 0.58]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[0.42 - (idx % 2) * 0.05, 18]} />
          <meshStandardMaterial color="#9ea39f" roughness={0.88} />
        </mesh>
      ))}
      <PathWearDecals />

      {/* Soil bands near planting beds */}
      <mesh rotation={[-Math.PI / 2, 0.08, 0]} position={[-2.15, 0.01, 2.3]} receiveShadow>
        <circleGeometry args={[2.05, 30]} />
        <meshStandardMaterial color="#7d5d3f" roughness={0.94} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, -0.06, 0]} position={[2.4, 0.01, 2.2]} receiveShadow>
        <circleGeometry args={[1.95, 30]} />
        <meshStandardMaterial color="#7d5d3f" roughness={0.94} />
      </mesh>
      <PathEdgePebbles />

      {/* Small puddles during wet weather */}
      {wetWeather && (
        <group>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.2, 0.013, 0.5]}>
            <circleGeometry args={[0.28, 16]} />
            <meshStandardMaterial color="#89afbe" transparent opacity={0.35} roughness={0.15} metalness={0.12} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0.2, 0]} position={[1.45, 0.013, -1.2]}>
            <circleGeometry args={[0.34, 16]} />
            <meshStandardMaterial color="#89afbe" transparent opacity={0.35} roughness={0.15} metalness={0.12} />
          </mesh>
        </group>
      )}

      {/* Perimeter hedges and depth boundary */}
      {[-5.35, 5.35].map((x, idx) => (
        <mesh key={`hedge-side-${idx}`} position={[x, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.8, 7.2]} />
          <meshStandardMaterial color="#3c6d31" roughness={0.83} />
        </mesh>
      ))}
      <mesh position={[0, 0.42, -3.45]} castShadow receiveShadow>
        <boxGeometry args={[10.6, 0.84, 0.55]} />
        <meshStandardMaterial color="#3c6d31" roughness={0.83} />
      </mesh>
      <DistantBoundaryTrees />

      {/* Human scale cues */}
      <GardenLamp position={[-2.1, 0, 1.95]} isNight={isNight} />
      <GardenLamp position={[2.1, 0, -1.45]} isNight={isNight} />
      <GardenSign />
      <GardenTools />

      {/* Central stone fountain */}
      <group position={[0, 0, -0.2]}>
        <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.05, 1.12, 0.34, 30]} />
          <meshStandardMaterial color="#8f918a" roughness={0.62} />
        </mesh>
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.75, 0.82, 0.12, 30]} />
          <meshStandardMaterial color="#a6a8a0" roughness={0.58} />
        </mesh>
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.07, 0.1, 0.5, 10]} />
          <meshStandardMaterial color="#969890" roughness={0.55} />
        </mesh>
        <FountainJets isNight={isNight} wetWeather={wetWeather} />
        <FountainWater isNight={isNight} wetWeather={wetWeather} />
        <FountainMist isNight={isNight} wetWeather={wetWeather} />

        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh key={`rock-${deg}`} position={[Math.cos(rad) * 1.2, 0.1, Math.sin(rad) * 1.2]} castShadow receiveShadow>
              <sphereGeometry args={[0.1, 10, 10]} />
              <meshStandardMaterial color="#84867f" roughness={0.9} />
            </mesh>
          );
        })}
      </group>

      {/* Trees and taller planting */}
      <GardenTree position={[-3.9, 0, -2.2]} trunkHeight={2.4} canopyScale={1.05} windStrength={windyWeather} />
      <GardenTree position={[3.8, 0, -2.05]} trunkHeight={2.3} canopyScale={1} windStrength={windyWeather} />
      <GardenTree position={[-4.2, 0, 2.2]} trunkHeight={2.1} canopyScale={0.9} windStrength={windyWeather} />
      <GardenTree position={[4.2, 0, 2.15]} trunkHeight={2.15} canopyScale={0.92} windStrength={windyWeather} />

      {/* Low flower beds with color variation */}
      <FlowerPatch position={[-2.6, 0, 2.3]} colors={flowerPaletteA} windStrength={windyWeather} />
      <FlowerPatch position={[-0.7, 0, 2.55]} colors={flowerPaletteB} windStrength={windyWeather} />
      <FlowerPatch position={[1.3, 0, 2.45]} colors={flowerPaletteA} windStrength={windyWeather} />
      <FlowerPatch position={[3.1, 0, 2.2]} colors={flowerPaletteB} windStrength={windyWeather} />
      <FlowerPatch position={[-3.3, 0, -0.9]} colors={flowerPaletteB} windStrength={windyWeather} />
      <FlowerPatch position={[2.9, 0, -1.15]} colors={flowerPaletteA} windStrength={windyWeather} />

      {/* Wooden seating area under pergola */}
      <group position={[0, 0, -2.8]}>
        <mesh position={[0, 1.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.3, 0.14, 1.5]} />
          <meshStandardMaterial color="#7a5a3d" roughness={0.74} />
        </mesh>
        {[-1.5, 1.5].map((x, idx) => (
          <mesh key={`post-front-${idx}`} position={[x, 0.85, 0.65]} castShadow receiveShadow>
            <boxGeometry args={[0.14, 1.7, 0.14]} />
            <meshStandardMaterial color="#6b4f35" roughness={0.76} />
          </mesh>
        ))}
        {[-1.5, 1.5].map((x, idx) => (
          <mesh key={`post-back-${idx}`} position={[x, 0.85, -0.65]} castShadow receiveShadow>
            <boxGeometry args={[0.14, 1.7, 0.14]} />
            <meshStandardMaterial color="#6b4f35" roughness={0.76} />
          </mesh>
        ))}

        <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.16, 0.42]} />
          <meshStandardMaterial color="#7f5d3e" roughness={0.68} />
        </mesh>
      </group>

      {/* Interaction hotspots */}
      <mesh position={[0, 0.62, -0.2]} onClick={() => setSelectedHotspot('fountain')}>
        <sphereGeometry args={[0.13, 12, 12]} />
        <meshStandardMaterial transparent opacity={0.18} color="#89d4ff" emissive="#89d4ff" emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[0, 0.46, -2.78]} onClick={() => setSelectedHotspot('bench')}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial transparent opacity={0.15} color="#ffda8c" emissive="#ffda8c" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-2.4, 0.36, 2.28]} onClick={() => setSelectedHotspot('flowers')}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial transparent opacity={0.15} color="#ffd0da" emissive="#ffd0da" emissiveIntensity={0.2} />
      </mesh>

      {selectedHotspot && (
        <Html position={[0, 2.25, 2.55]} center>
          <div
            style={{
              width: '220px',
              background: 'rgba(16, 32, 22, 0.82)',
              border: '1px solid rgba(168, 219, 176, 0.45)',
              color: '#f3fff2',
              borderRadius: '12px',
              padding: '10px 12px',
              fontSize: '12px',
              lineHeight: 1.4,
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: '6px', letterSpacing: '0.04em' }}>
              {selectedHotspot === 'fountain' ? 'Fountain Core' : selectedHotspot === 'bench' ? 'Resting Bench' : 'Seasonal Flower Bed'}
            </div>
            <div style={{ opacity: 0.92 }}>
              {selectedHotspot === 'fountain'
                ? 'Water flow reacts to weather and time-of-day for a calmer or more lively fountain mood.'
                : selectedHotspot === 'bench'
                ? 'A quiet seating point under pergola shade, placed at natural conversational distance from the fountain.'
                : 'Flower clusters sway with weather intensity and use layered planting to avoid flat rows.'}
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              style={{
                marginTop: '8px',
                border: '1px solid rgba(190, 239, 195, 0.45)',
                background: 'rgba(68, 108, 73, 0.75)',
                color: '#efffee',
                borderRadius: '8px',
                padding: '4px 8px',
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              Close
            </button>
          </div>
        </Html>
      )}

      <ButterflySwarm />
      <DragonflySwarm />
      <BirdFlock />
      <Fireflies active={isNight} />

      {/* Gentle warm fill to avoid harsh shadows under foliage */}
      <pointLight position={[0, 2.8, 1.3]} intensity={isNight ? 0.2 : 0.4} color={isNight ? '#c2ddff' : '#fff1d6'} distance={8} />
    </group>
  );
}
