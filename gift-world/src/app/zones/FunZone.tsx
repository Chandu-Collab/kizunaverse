'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import Scene from '@/components/3d/Scene';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { motion } from 'framer-motion';
import { Mesh, Vector3 } from 'three';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Text } from '@react-three/drei';

interface Collectible {
  id: number;
  position: Vector3;
  collected: boolean;
}

function CollectibleObject({
  position,
  onCollect,
  collected,
}: {
  position: Vector3;
  onCollect: () => void;
  collected: boolean;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && !collected) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  if (collected) return null;

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onCollect();
      }}
      castShadow
    >
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial
        color="#FFD700"
        emissive="#FFD700"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function GameScene({ score, onCollect, collectibles }: {
  score: number;
  onCollect: () => void;
  collectibles: Collectible[];
}) {
  return (
    <>
      {collectibles.map((item) => (
        <CollectibleObject
          key={item.id}
          position={item.position}
          onCollect={onCollect}
          collected={item.collected}
        />
      ))}
      <Text
        position={[0, 4, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Score: {score}
      </Text>
    </>
  );
}

export default function FunZone() {
  const { navigateTo } = useNavigation();
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    
    // Generate collectibles
    const newCollectibles: Collectible[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      position: new Vector3(
        (Math.random() - 0.5) * 8,
        Math.random() * 3 + 1,
        (Math.random() - 0.5) * 8
      ),
      collected: false,
    }));
    setCollectibles(newCollectibles);
  };

  const handleCollect = () => {
    const nextUncollected = collectibles.findIndex((c) => !c.collected);
    if (nextUncollected !== -1) {
      setScore(score + 10);
      setCollectibles((prev) =>
        prev.map((item, idx) =>
          idx === nextUncollected ? { ...item, collected: true } : item
        )
      );
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Scene cameraPosition={[0, 3, 8]} enableControls={!isPlaying}>
        <Suspense fallback={null}>
          {isPlaying ? (
            <GameScene
              score={score}
              onCollect={handleCollect}
              collectibles={collectibles}
            />
          ) : (
            <Text
              position={[0, 0, 0]}
              fontSize={0.8}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              Click Start to Play!
            </Text>
          )}
        </Suspense>
      </Scene>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto max-w-md w-full px-4">
          {!isPlaying ? (
            <GlassCard className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">🎮 Fun Zone</h1>
              <p className="text-white/90 text-lg mb-6">
                Collect the golden stars before time runs out!
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={startGame} variant="primary" size="lg">
                  Start Game
                </Button>
                <Button
                  onClick={() => navigateTo('home')}
                  variant="ghost"
                  size="lg"
                >
                  ← Back
                </Button>
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Time: {timeLeft}s</h2>
              <h3 className="text-2xl font-bold text-white mb-4">Score: {score}</h3>
              <Button
                onClick={() => setIsPlaying(false)}
                variant="secondary"
                size="md"
              >
                Pause
              </Button>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
