'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { Sphere, OrbitControls, Text } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

interface Bubble {
  id: number;
  position: Vector3;
  velocity: Vector3;
  radius: number;
  color: string;
  isPopping: boolean;
}

interface Projectile {
  id: number;
  position: Vector3;
  direction: Vector3;
  speed: number;
  lifetime: number;
  age: number;
}

type GameMode = 'menu' | 'zen' | 'challenge' | 'results';

const BUBBLE_COLORS = [
  '#FF6B9D', // Pink
  '#C44569', // Rose
  '#FFA502', // Orange
  '#FFD500', // Yellow
  '#00D4FF', // Cyan
  '#0099FF', // Blue
  '#9D4EDD', // Purple
  '#3A86FF', // Royal Blue
  '#FF006E', // Hot Pink
  '#FB5607', // Orange Red
];

const TARGET_SCORE = 100;
const CHALLENGE_DURATION = 30;

function BubbleObject({
  bubble,
  onBubbleClick,
}: {
  bubble: Bubble;
  onBubbleClick: (id: number) => void;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current && !bubble.isPopping) {
      meshRef.current.position.add(bubble.velocity);
      meshRef.current.position.y += Math.sin(Date.now() * 0.001 + bubble.id) * 0.003;
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;

      const bounds = 8;
      if (Math.abs(meshRef.current.position.x) > bounds) {
        bubble.velocity.x *= -1;
        meshRef.current.position.x = Math.sign(meshRef.current.position.x) * bounds;
      }
      if (Math.abs(meshRef.current.position.y) > bounds) {
        bubble.velocity.y *= -1;
        meshRef.current.position.y = Math.sign(meshRef.current.position.y) * bounds;
      }
      if (Math.abs(meshRef.current.position.z) > bounds) {
        bubble.velocity.z *= -1;
        meshRef.current.position.z = Math.sign(meshRef.current.position.z) * bounds;
      }

      bubble.velocity.multiplyScalar(0.995);
    }
  });

  if (bubble.isPopping) return null;

  return (
    <mesh
      ref={meshRef}
      position={bubble.position}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onBubbleClick(bubble.id);
      }}
      castShadow
      receiveShadow
    >
      <Sphere args={[bubble.radius, 32, 32]}>
        <meshPhongMaterial
          color={bubble.color}
          emissive={bubble.color}
          emissiveIntensity={0.6}
          shininess={100}
          wireframe={false}
          opacity={0.85}
          transparent
        />
      </Sphere>
    </mesh>
  );
}

function ParticleEffect({
  position,
  color,
  duration = 800,
}: {
  position: Vector3;
  color: string;
  duration?: number;
}) {
  const [particles, setParticles] = useState<
    Array<{ id: number; pos: Vector3; vel: Vector3 }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      pos: position.clone(),
      vel: new Vector3(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3
      ),
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), duration);
    return () => clearTimeout(timer);
  }, [position, duration]);

  return (
    <>
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          position={particle.pos}
          velocity={particle.vel}
          color={color}
          duration={duration}
        />
      ))}
    </>
  );
}

function Particle({
  position,
  velocity,
  color,
  duration,
}: {
  position: Vector3;
  velocity: Vector3;
  color: string;
  duration: number;
}) {
  const meshRef = useRef<Mesh>(null);
  const startTime = useRef(Date.now());

  useFrame(() => {
    if (meshRef.current) {
      const elapsed = Date.now() - startTime.current;
      const progress = elapsed / duration;

      meshRef.current.position.addScaledVector(velocity, 0.01);
      velocity.multiplyScalar(0.95);

      meshRef.current.scale.setScalar(Math.max(0, 1 - progress));
      (meshRef.current.material as any).opacity = 1 - progress;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <Sphere args={[0.15, 8, 8]}>
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={1}
        />
      </Sphere>
    </mesh>
  );
}

function BubbleScene({
  bubbles,
  onBubbleClick,
  particles,
  combo,
}: {
  bubbles: Bubble[];
  onBubbleClick: (id: number) => void;
  particles: Array<{ position: Vector3; color: string; key: string }>;
  combo: number;
}) {
  return (
    <>
      {bubbles.map((bubble) => (
        <BubbleObject
          key={bubble.id}
          bubble={bubble}
          onBubbleClick={onBubbleClick}
        />
      ))}
      {particles.map((particle) => (
        <ParticleEffect
          key={particle.key}
          position={particle.position}
          color={particle.color}
          duration={800}
        />
      ))}
      {combo > 1 && (
        <Text
          position={[0, 5, 0]}
          fontSize={0.8}
          color="#FFD500"
          anchorX="center"
          anchorY="middle"
        >
          COMBO x{combo}!
        </Text>
      )}
      <ambientLight intensity={1.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
      <pointLight position={[-10, -10, 10]} intensity={0.8} color="#00D4FF" />
      <OrbitControls autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

function MenuScreen({ onMode }: { onMode: (mode: 'zen' | 'challenge') => void }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-pink-900/40">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="text-center max-w-md p-8">
          <div className="text-6xl mb-6">🫧</div>
          <h2 className="text-4xl font-bold text-white mb-2">Floating Bubbles</h2>
          <p className="text-white/70 text-lg mb-8">Choose your mode</p>

          <div className="space-y-3">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                onClick={() => onMode('zen')}
                variant="primary"
                size="lg"
                className="w-full"
              >
                🧘 Zen Mode
              </Button>
              <p className="text-white/50 text-sm mt-2">Relaxing, infinite popping</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                onClick={() => onMode('challenge')}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                ⚡ Challenge Mode
              </Button>
              <p className="text-white/50 text-sm mt-2">
                30s • Target: {TARGET_SCORE} points
              </p>
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

function ResultsScreen({
  score,
  poppedCount,
  targetReached,
  bestCombo,
  onRestart,
}: {
  score: number;
  poppedCount: number;
  targetReached: boolean;
  bestCombo: number;
  onRestart: () => void;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-pink-900/40">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="text-center max-w-md p-8">
          <div className="text-6xl mb-4">
            {targetReached ? '🏆' : '🎮'}
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">
            {targetReached ? 'Challenge Complete!' : 'Time\'s Up!'}
          </h2>

          <div className="bg-white/10 rounded-lg p-6 my-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Final Score:</span>
              <span className="text-3xl font-bold text-cyan-300">{score}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Bubbles Popped:</span>
              <span className="text-2xl font-bold text-pink-300">{poppedCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Best Combo:</span>
              <span className="text-2xl font-bold text-yellow-300">x{bestCombo}</span>
            </div>
            {targetReached && (
              <div className="text-green-300 font-semibold mt-4">
                ✨ Target Reached! ✨
              </div>
            )}
          </div>

          <Button
            onClick={onRestart}
            variant="primary"
            size="lg"
            className="w-full"
          >
            Play Again
          </Button>
        </GlassCard>
      </motion.div>
    </div>
  );
}

export default function FloatingBubblesGame({
  onGameEnd,
}: {
  onGameEnd?: () => void;
}) {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [particles, setParticles] = useState<
    Array<{ position: Vector3; color: string; key: string }>
  >([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_DURATION);
  const bubbleIdRef = useRef(0);
  const comboTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Initialize bubbles
  const initializeBubbles = (count: number = 15) => {
    const initialBubbles: Bubble[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      position: new Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ),
      velocity: new Vector3(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05
      ),
      radius: Math.random() * 0.6 + 0.4,
      color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
      isPopping: false,
    }));
    setBubbles(initialBubbles);
    bubbleIdRef.current = initialBubbles.length;
  };

  // Start game mode
  const startGame = (mode: 'zen' | 'challenge') => {
    setGameMode(mode);
    setPoppedCount(0);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setTimeLeft(CHALLENGE_DURATION);
    initializeBubbles(mode === 'challenge' ? 12 : 15);
  };

  // Challenge mode timer
  useEffect(() => {
    if (gameMode !== 'challenge') return;

    if (timeLeft <= 0) {
      setGameMode('results');
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [gameMode, timeLeft]);

  // Spawn bubbles based on difficulty
  useEffect(() => {
    if (gameMode === 'menu' || gameMode === 'results') return;

    const spawnRate = gameMode === 'zen' ? 1500 : Math.max(800, 1500 - score * 10);

    const interval = setInterval(() => {
      const newBubble: Bubble = {
        id: bubbleIdRef.current++,
        position: new Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ),
        velocity: new Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05
        ),
        radius: Math.random() * 0.6 + 0.4,
        color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
        isPopping: false,
      };
      setBubbles((prev) => [...prev, newBubble]);
    }, spawnRate);

    return () => clearInterval(interval);
  }, [gameMode, score]);

  const handleBubbleClick = (id: number) => {
    const bubble = bubbles.find((b) => b.id === id);
    if (bubble) {
      playPopSound();

      setParticles((prev) => [
        ...prev,
        {
          position: bubble.position.clone(),
          color: bubble.color,
          key: `${Date.now()}-${id}`,
        },
      ]);

      setBubbles((prev) =>
        prev.map((b) => (b.id === id ? { ...b, isPopping: true } : b))
      );

      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== id));
      }, 100);

      // Score and combo calculation
      if (gameMode === 'challenge') {
        const newCombo = combo + 1;
        setCombo(newCombo);
        setBestCombo((prev) => Math.max(prev, newCombo));

        const comboMultiplier = Math.floor(newCombo / 3) + 1;
        const points = 10 * comboMultiplier;
        setScore((prev) => prev + points);

        if (comboTimeoutRef.current) {
          clearTimeout(comboTimeoutRef.current);
        }
        comboTimeoutRef.current = setTimeout(() => {
          setCombo(0);
        }, 2000);
      } else {
        setScore((prev) => prev + 10);
      }

      setPoppedCount((prev) => prev + 1);
    }
  };

  const playPopSound = () => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        400,
        audioContext.currentTime + 0.1
      );

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Web Audio API not available
    }
  };

  // Menu screen
  if (gameMode === 'menu') {
    return (
      <div className="relative w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          style={{ background: 'radial-gradient(circle, #1a0033 0%, #0d0015 100%)' }}
        >
          <ambientLight intensity={1.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <OrbitControls autoRotate autoRotateSpeed={0.3} />
        </Canvas>
        <div className="absolute inset-0 flex items-center justify-center">
          <MenuScreen onMode={startGame} />
        </div>
      </div>
    );
  }

  // Results screen
  if (gameMode === 'results') {
    return (
      <div className="relative w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          style={{ background: 'radial-gradient(circle, #1a0033 0%, #0d0015 100%)' }}
        >
          <ambientLight intensity={1.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <OrbitControls autoRotate autoRotateSpeed={0.5} />
        </Canvas>
        <div className="absolute inset-0 flex items-center justify-center">
          <ResultsScreen
            score={score}
            poppedCount={poppedCount}
            targetReached={score >= TARGET_SCORE}
            bestCombo={bestCombo}
            onRestart={() => setGameMode('menu')}
          />
        </div>
      </div>
    );
  }

  // Gameplay screen
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="flex-1 relative">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          style={{ background: 'radial-gradient(circle, #1a0033 0%, #0d0015 100%)' }}
        >
          <BubbleScene
            bubbles={bubbles}
            onBubbleClick={handleBubbleClick}
            particles={particles}
            combo={combo}
          />
        </Canvas>
      </div>

      {/* Zen Mode UI */}
      {gameMode === 'zen' && (
        <div className="absolute top-6 right-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3"
          >
            <p className="text-white text-lg font-semibold">
              Popped: <span className="text-cyan-300">{poppedCount}</span>
            </p>
          </motion.div>
        </div>
      )}

      {/* Challenge Mode UI */}
      {gameMode === 'challenge' && (
        <>
          <div className="absolute top-6 left-6 z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3"
            >
              <p className="text-white text-sm font-semibold mb-1">Time</p>
              <p className="text-3xl font-bold text-cyan-300">{timeLeft}s</p>
            </motion.div>
          </div>

          <div className="absolute top-6 right-6 z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-right"
            >
              <p className="text-white text-sm font-semibold mb-1">Score</p>
              <p className="text-3xl font-bold text-yellow-300">{score}</p>
              <p className="text-xs text-white/50 mt-1">Target: {TARGET_SCORE}</p>
            </motion.div>
          </div>

          {combo > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
              <motion.div
                key={combo}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-yellow-400/20 backdrop-blur-md border border-yellow-400/50 rounded-full px-6 py-3"
              >
                <p className="text-yellow-300 text-xl font-bold">COMBO x{combo}!</p>
              </motion.div>
            </div>
          )}
        </>
      )}

      {/* Instructions */}
      <div className="absolute bottom-6 left-6 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 max-w-xs"
        >
          <p className="text-white/80 text-sm">
            💭 Tap bubbles to pop them
            {gameMode === 'challenge' && ' • Build combos for bonus points!'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
