'use client';

import { Suspense, useState, useEffect } from 'react';
import Scene from '@/components/3d/Scene';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mesh } from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

function BirthdayCake() {
  const cakeRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      cakeRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={cakeRef} position={[0, 0, 0]}>
      {/* Cake base */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 1, 32]} />
        <meshStandardMaterial color="#FFB6C1" roughness={0.7} />
      </mesh>
      
      {/* Middle layer */}
      <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.8, 32]} />
        <meshStandardMaterial color="#FF69B4" roughness={0.7} />
      </mesh>
      
      {/* Top layer */}
      <mesh castShadow receiveShadow position={[0, 1.2, 0]}>
        <cylinderGeometry args={[1, 1, 0.6, 32]} />
        <meshStandardMaterial color="#FF1493" roughness={0.7} />
      </mesh>
      
      {/* Candle */}
      <mesh castShadow position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
        <meshStandardMaterial color="#FFFF00" emissive="#FFFF00" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Flame */}
      <mesh position={[0, 1.8, 0]}>
        <coneGeometry args={[0.1, 0.2, 8]} />
        <meshStandardMaterial color="#FF4500" emissive="#FF4500" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function Confetti() {
  const confettiRef = useRef<Mesh>(null);
  const particles = Array.from({ length: 50 }, () => ({
    x: (Math.random() - 0.5) * 10,
    y: Math.random() * 5 + 5,
    z: (Math.random() - 0.5) * 10,
    color: ['#FF6B9D', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181'][Math.floor(Math.random() * 5)],
    rotation: Math.random() * Math.PI * 2,
  }));

  useFrame((state) => {
    if (confettiRef.current) {
      particles.forEach((p, i) => {
        p.y -= 0.05;
        p.rotation += 0.1;
        if (p.y < -5) p.y = 10;
      });
    }
  });

  return (
    <group ref={confettiRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]} rotation={[p.rotation, p.rotation, p.rotation]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color={p.color} />
        </mesh>
      ))}
    </group>
  );
}

export default function BirthdayZone() {
  const { navigateTo } = useNavigation();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Scene cameraPosition={[0, 3, 8]} enableControls={true}>
        <Suspense fallback={null}>
          <BirthdayCake />
          {showConfetti && <Confetti />}
        </Suspense>
      </Scene>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto max-w-2xl w-full px-4">
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <GlassCard className="text-center">
                  <h1 className="text-5xl font-bold text-white mb-4">
                    🎂 Happy Birthday! 🎉
                  </h1>
                  <p className="text-white/90 text-xl mb-6">
                    This special day is all about you! 
                    <br />
                    May your year be filled with joy, laughter, and wonderful memories.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => {
                        setShowConfetti(true);
                        setShowMessage(false);
                      }}
                      variant="primary"
                      size="lg"
                    >
                      🎊 Celebrate!
                    </Button>
                    <Button
                      onClick={() => navigateTo('home')}
                      variant="ghost"
                      size="lg"
                    >
                      ← Back Home
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
