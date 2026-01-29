import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Bird } from './BirdButterfly3D';

type FlockingBirdsProps = {
  housePositions: [number, number, number][];
  flockSize?: number;
};

// Birds will circle above houses, and some will land for a while
export default function FlockingBirds({ housePositions, flockSize = 7 }: FlockingBirdsProps) {
  // Each bird: { mode: 'flying' | 'landing', t: number, houseIdx: number, phase: number }
  const [birds, setBirds] = useState(() => {
    return Array.from({ length: flockSize }, (_, i) => ({
      mode: 'flying',
      t: Math.random(),
      houseIdx: Math.floor(Math.random() * housePositions.length),
      phase: Math.random() * Math.PI * 2,
      color: ['#FFD93D', '#A084E8', '#6BCB77', '#FFB6E1', '#FFD93D', '#A084E8', '#6BCB77'][i % 7],
      timer: 0,
    }));
  });

  // Animate birds: switch between flying and landing
  useFrame((state) => {
    setBirds((prev) =>
      prev.map((bird, i) => {
        let { mode, t, houseIdx, phase, color, timer } = bird;
        let newMode = mode;
        let newT = t;
        let newTimer = timer + state.clock.getDelta();
        // Switch state every 4-8 seconds randomly
        if (newTimer > 4 + (i % 3) * 2 + Math.sin(phase) * 1.5) {
          if (mode === 'flying') {
            newMode = 'landing';
            newT = Math.random();
            houseIdx = Math.floor(Math.random() * housePositions.length);
          } else {
            newMode = 'flying';
            newT = Math.random();
          }
          newTimer = 0;
        }
        return { mode: newMode, t: newT, houseIdx, phase, color, timer: newTimer };
      })
    );
  });

  return (
    <group>
      {birds.map((bird, i) => {
        const { mode, t, houseIdx, phase, color } = bird;
        const house = housePositions[houseIdx];
        let pos: [number, number, number];
        let rotY = 0;
        if (mode === 'flying') {
          // Circle above the house
          const radius = 1.2 + 0.3 * Math.sin(phase + t * Math.PI * 2);
          const angle = t * Math.PI * 2 + phase + i * 0.5;
          pos = [
            house[0] + Math.cos(angle) * radius,
            house[1] + 0.7 + Math.sin(angle * 1.2) * 0.2 + 0.7,
            house[2] + Math.sin(angle) * radius,
          ];
          rotY = angle + Math.PI / 2;
        } else {
          // Landed: sit on roof
          pos = [house[0] + 0.1 * Math.sin(phase), house[1] + 0.55 + 0.18, house[2] + 0.1 * Math.cos(phase)];
          rotY = Math.PI / 2 + Math.sin(phase) * 0.2;
        }
        return (
          <Bird
            key={i}
            position={pos}
            color={color}
            speed={mode === 'flying' ? 1.1 : 0.5}
            phase={phase + i}
            // @ts-ignore
            rotationY={rotY}
            scale={mode === 'flying' ? 1 : 0.92}
          />
        );
      })}
    </group>
  );
}