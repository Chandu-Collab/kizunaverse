'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box } from '@react-three/drei';
import { Mesh, Vector3, Color } from 'three';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

interface Plant {
  id: number;
  position: Vector3;
  growthStage: number; // 0-4: seed, sprouting, small, flowering, blooming
  health: number; // 0-100
  wateredTime: number;
  age: number; // in seconds
  color: string;
  hasButterfly: boolean; // Prevents duplicate butterfly spawning
}

type GameMode = 'menu' | 'guide' | 'playing' | 'results';

const PLANT_COLORS = [
  { name: 'Red', hex: '#FF6B6B', rgb: [1, 0.42, 0.42] },
  { name: 'Pink', hex: '#FF69B4', rgb: [1, 0.41, 0.71] },
  { name: 'Purple', hex: '#DA70D6', rgb: [0.85, 0.44, 0.84] },
  { name: 'Blue', hex: '#4169E1', rgb: [0.25, 0.41, 0.88] },
  { name: 'Yellow', hex: '#FFD700', rgb: [1, 0.84, 0] },
  { name: 'Orange', hex: '#FF8C00', rgb: [1, 0.55, 0] },
];

function SeedMesh({ plant, onClick, isWatered }: { plant: Plant; onClick: () => void; isWatered: boolean }) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y += Math.sin(Date.now() * 0.002) * 0.0005;
      // Glow effect when watered
      if (isWatered && meshRef.current.material) {
        (meshRef.current.material as any).emissiveIntensity = 0.8;
      } else if (meshRef.current.material) {
        (meshRef.current.material as any).emissiveIntensity = 0;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={plant.position}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onClick();
      }}
      castShadow
      receiveShadow
    >
      <Sphere args={[0.15, 16, 16]}>
        <meshStandardMaterial
          color={plant.color}
          emissive={isWatered ? plant.color : '#000000'}
          emissiveIntensity={isWatered ? 0.8 : 0}
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>
    </mesh>
  );
}

function SproutMesh({ plant, onClick, isWatered }: { plant: Plant; onClick: () => void; isWatered: boolean }) {
  const meshRef = useRef<Mesh>(null);
  const leafRefs = useRef<(Mesh | null)[]>([null, null]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(Date.now() * 0.002) * 0.1;
      meshRef.current.scale.y = 0.8 + Math.sin(Date.now() * 0.003) * 0.1;
    }

    leafRefs.current.forEach((leaf, i) => {
      if (leaf) {
        leaf.rotation.z = Math.sin(Date.now() * 0.002 + i) * 0.3;
      }
    });
  });

  return (
    <group position={plant.position} onClick={(e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onClick();
    }}>
      {/* Stem */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <Box args={[0.08, 0.4, 0.08]}>
          <meshStandardMaterial
            color="#2D5016"
            emissive={isWatered ? '#4DAF50' : '#000000'}
            emissiveIntensity={isWatered ? 0.6 : 0}
            roughness={0.6}
          />
        </Box>
      </mesh>
      {/* Leaves */}
      {[0, 1].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) leafRefs.current[i] = el;
          }}
          position={[i === 0 ? -0.1 : 0.1, 0.15, 0]}
          castShadow
          receiveShadow
        >
          <Box args={[0.08, 0.2, 0.04]}>
            <meshStandardMaterial
              color="#4DAF50"
              emissive={isWatered ? '#90EE90' : '#000000'}
              emissiveIntensity={isWatered ? 0.6 : 0}
              roughness={0.5}
            />
          </Box>
        </mesh>
      ))}
    </group>
  );
}

function FlowerMesh({ plant, onClick, isWatered }: { plant: Plant; onClick: () => void; isWatered: boolean }) {
  const petalRefs = useRef<(Mesh | null)[]>([]);
  const colorRgb = PLANT_COLORS.find((c) => c.hex === plant.color)?.rgb || [1, 0.5, 0.5];

  useFrame(() => {
    petalRefs.current.forEach((petal, i) => {
      if (petal) {
        const angle = (i / petalRefs.current.length) * Math.PI * 2;
        petal.rotation.y = Math.sin(Date.now() * 0.002 + i * 0.5) * 0.3;
        petal.position.y = 0.5 + Math.sin(Date.now() * 0.002 + i) * 0.05;
      }
    });
  });

  return (
    <group position={plant.position} onClick={(e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onClick();
    }}>
      {/* Stem */}
      <mesh castShadow receiveShadow>
        <Box args={[0.1, 0.6, 0.1]}>
          <meshStandardMaterial
            color="#2D5016"
            emissive={isWatered ? '#4DAF50' : '#000000'}
            emissiveIntensity={isWatered ? 0.6 : 0}
            roughness={0.6}
          />
        </Box>
      </mesh>
      {/* Petals */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * 0.2;
        const z = Math.sin(angle) * 0.2;

        return (
          <mesh
            key={i}
            ref={(el) => {
              if (el) petalRefs.current[i] = el;
            }}
            position={[x, 0.5, z]}
            castShadow
            receiveShadow
          >
            <Sphere args={[0.12, 16, 16]}>
              <meshStandardMaterial
                color={plant.color}
                emissive={plant.color}
                emissiveIntensity={isWatered ? 0.8 : 0.3}
                roughness={0.4}
              />
            </Sphere>
          </mesh>
        );
      })}
      {/* Center */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <Sphere args={[0.1, 16, 16]}>
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={isWatered ? 1 : 0.5}
          />
        </Sphere>
      </mesh>
    </group>
  );
}

function ButterflyMesh({
  position,
  id,
  speed = 0.02,
}: {
  position: Vector3;
  id: number;
  speed?: number;
}) {
  const groupRef = useRef<any>(null);
  const wingRefs = useRef<(Mesh | null)[]>([null, null]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x += Math.sin(Date.now() * speed) * 0.002;
      groupRef.current.position.y += Math.cos(Date.now() * speed * 0.5) * 0.003;
      groupRef.current.position.z += Math.cos(Date.now() * speed) * 0.002;
    }

    wingRefs.current.forEach((wing, i) => {
      if (wing) {
        wing.rotation.y = Math.sin(Date.now() * 0.01 + id * 0.5) * 0.8 * (i === 0 ? 1 : -1);
      }
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <Box args={[0.05, 0.15, 0.05]}>
          <meshStandardMaterial color="#8B4513" />
        </Box>
      </mesh>
      {/* Wings */}
      {[0, 1].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) wingRefs.current[i] = el;
          }}
          position={[i === 0 ? -0.08 : 0.08, 0.05, 0]}
          castShadow
          receiveShadow
        >
          <Sphere args={[0.08, 12, 12]}>
            <meshStandardMaterial
              color={PLANT_COLORS[i % PLANT_COLORS.length].hex}
              emissive={PLANT_COLORS[i % PLANT_COLORS.length].hex}
              emissiveIntensity={0.4}
              transparent
              opacity={0.8}
            />
          </Sphere>
        </mesh>
      ))}
    </group>
  );
}

function GardenScene({
  plants,
  onPlantClick,
  butterflies,
  recentlyWatered,
  isGameplay = false,
}: {
  plants: Plant[];
  onPlantClick: (id: number) => void;
  butterflies: Array<{ id: number; position: Vector3 }>;
  recentlyWatered: Set<number>;
  isGameplay?: boolean;
}) {
  return (
    <>
      {/* Ground */}
      <mesh position={[0, -1, 0]} receiveShadow>
        <Box args={[20, 0.5, 20]}>
          <meshStandardMaterial color="#8B7355" roughness={0.8} />
        </Box>
      </mesh>

      {/* Plants */}
      {plants.map((plant) => {
        const isWatered = recentlyWatered.has(plant.id);
        if (plant.growthStage === 0) {
          return (
            <SeedMesh
              key={plant.id}
              plant={plant}
              onClick={() => onPlantClick(plant.id)}
              isWatered={isWatered}
            />
          );
        } else if (plant.growthStage <= 2) {
          return (
            <SproutMesh
              key={plant.id}
              plant={plant}
              onClick={() => onPlantClick(plant.id)}
              isWatered={isWatered}
            />
          );
        } else {
          return (
            <FlowerMesh
              key={plant.id}
              plant={plant}
              onClick={() => onPlantClick(plant.id)}
              isWatered={isWatered}
            />
          );
        }
      })}

      {/* Butterflies */}
      {butterflies.map((butterfly) => (
        <ButterflyMesh
          key={butterfly.id}
          position={butterfly.position}
          id={butterfly.id}
          speed={0.01}
        />
      ))}

      {/* Lighting */}
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 10, 5]} intensity={0.8} color="#FFD700" />

      {/* Camera control */}
      <OrbitControls
        autoRotate={!isGameplay}
        autoRotateSpeed={2}
        minDistance={15}
        maxDistance={40}
        enableZoom={true}
      />
    </>
  );
}

function GuideScreen({ onStartGame, onBack }: { onStartGame: () => void; onBack: () => void }) {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "🌱 Getting Started",
      icon: "🌱",
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            Welcome to <span className="text-green-300 font-bold">Garden Grow</span>! 
            This is a peaceful, therapeutic experience where you nurture and grow beautiful flowers.
          </p>
          <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-4">
            <p className="text-green-200 text-sm">
              💭 <span className="font-semibold">No pressure, no time limits.</span> Play at your own pace and enjoy the journey!
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "🌾 How to Plant",
      icon: "🌾",
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            Ready to start your garden? Here's how:
          </p>
          <div className="space-y-3">
            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
              <p className="text-white font-semibold flex items-center gap-2">
                <span className="text-xl">1️⃣</span> Click the <span className="text-green-300">"Plant a Seed"</span> Button
              </p>
              <p className="text-white/70 text-sm mt-1">
                This button is at the bottom center of the garden screen.
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
              <p className="text-white font-semibold flex items-center gap-2">
                <span className="text-xl">2️⃣</span> Seeds Appear Randomly
              </p>
              <p className="text-white/70 text-sm mt-1">
                Your seed will pop up in a random location in the garden! Each seed has its own unique color.
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
              <p className="text-white font-semibold flex items-center gap-2">
                <span className="text-xl">3️⃣</span> Plant Multiple Seeds
              </p>
              <p className="text-white/70 text-sm mt-1">
                Create a whole garden! Plant as many seeds as you like.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "💧 Watering & Care",
      icon: "💧",
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            Your plants need water to grow healthy and strong!
          </p>
          <div className="space-y-3">
            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
              <p className="text-white font-semibold flex items-center gap-2">
                <span className="text-xl">💧</span> Click Plants to Water
              </p>
              <p className="text-white/70 text-sm mt-1">
                Click on any plant in the 3D garden to water it. Each click restores 30% health!
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
              <p className="text-white font-semibold flex items-center gap-2">
                <span className="text-xl">❤️</span> Health Bar Concept
              </p>
              <p className="text-white/70 text-sm mt-1">
                Plants lose 0.5% health per second. Regular watering keeps them healthy and helps them grow faster!
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
              <p className="text-white font-semibold flex items-center gap-2">
                <span className="text-xl">🎯</span> Healthy = Faster Growth
              </p>
              <p className="text-white/70 text-sm mt-1">
                Higher health plants grow faster. Balance caring for multiple plants or focus on a few!
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "🌱 Growth Stages",
      icon: "🌱",
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            Watch your plants transform through these beautiful stages:
          </p>
          <div className="space-y-2">
            <div className="bg-white/10 rounded-lg p-3 border border-amber-400/30">
              <p className="text-amber-200 font-semibold">🥜 Stage 1: Seed</p>
              <p className="text-white/70 text-sm">A small rotating seed. The beginning of life!</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 border border-green-400/30">
              <p className="text-green-200 font-semibold">🌿 Stage 2: Sprout</p>
              <p className="text-white/70 text-sm">A tiny stem appears with small leaves. (Health &gt; 80%, After 3 sec)</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 border border-emerald-400/30">
              <p className="text-emerald-200 font-semibold">🌱 Stage 3: Small Plant</p>
              <p className="text-white/70 text-sm">Growing taller with visible foliage. (Health &gt; 60%, After 6 sec)</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 border border-pink-400/30">
              <p className="text-pink-200 font-semibold">🌺 Stage 4: Flowering</p>
              <p className="text-white/70 text-sm">Beautiful flower with 5 colorful petals! (Health &gt; 40%, After 10 sec)</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 border border-purple-400/30">
              <p className="text-purple-200 font-semibold">🌸 Stage 5: Blooming</p>
              <p className="text-white/70 text-sm">Fully mature! The most beautiful form. (Health &gt; 20%, After 15 sec)</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "🦋 Butterflies & Rewards",
      icon: "🦋",
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            The most magical part of the garden!
          </p>
          <div className="space-y-3">
            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
              <p className="text-white font-semibold flex items-center gap-2">
                <span className="text-xl">🦋</span> Butterflies Visit Flowers
              </p>
              <p className="text-white/70 text-sm mt-1">
                When your flowers bloom (Stage 4+), beautiful butterflies automatically appear above them!
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
              <p className="text-white font-semibold flex items-center gap-2">
                <span className="text-xl">💫</span> Watch Them Dance
              </p>
              <p className="text-white/70 text-sm mt-1">
                Butterflies flutter around gracefully with beautiful wing animations. Pure visual joy!
              </p>
            </div>
            <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-4">
              <p className="text-blue-200 text-sm">
                ✨ <span className="font-semibold">Reward:</span> The more flowers you bloom, the more butterflies you'll see! This is nature's way of saying "thank you" 🌿
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "🎮 Gameplay Features",
      icon: "🎮",
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            Here's what you'll see while playing:
          </p>
          <div className="space-y-3">
            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
              <p className="text-white font-semibold">⏱️ Garden Time Counter</p>
              <p className="text-white/70 text-sm mt-1">
                Top left shows how long your garden has been growing. No time limits—play as long as you like!
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
              <p className="text-white font-semibold">📊 Plants Counter</p>
              <p className="text-white/70 text-sm mt-1">
                Top right shows total plants in your garden. Build your collection!
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
              <p className="text-white font-semibold">🎥 Camera Control</p>
              <p className="text-white/70 text-sm mt-1">
                Use your mouse to pan and zoom. The camera auto-rotates so you can watch from different angles.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "🏆 Achievements",
      icon: "🏆",
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            As you grow more plants, you'll unlock special achievements!
          </p>
          <div className="space-y-2">
            <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">🌱 Gardener</p>
                <p className="text-white/70 text-xs">Your first achievement!</p>
              </div>
              <span className="text-2xl">1+</span>
            </div>
            <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">🌻 Garden Enthusiast</p>
                <p className="text-white/70 text-xs">Getting serious about gardening</p>
              </div>
              <span className="text-2xl">5+</span>
            </div>
            <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">🌸 Flower Master</p>
                <p className="text-white/70 text-xs">You really know your gardening!</p>
              </div>
              <span className="text-2xl">10+</span>
            </div>
            <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">🌺 Garden Wizard</p>
                <p className="text-white/70 text-xs">Magical growing powers!</p>
              </div>
              <span className="text-2xl">15+</span>
            </div>
            <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">🌈 Nature Guardian</p>
                <p className="text-white/70 text-xs">Ultimate green thumb!</p>
              </div>
              <span className="text-2xl">20+</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "💡 Tips & Tricks",
      icon: "💡",
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            Pro tips to become an amazing gardener:
          </p>
          <div className="space-y-2">
            <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-3">
              <p className="text-yellow-200 font-semibold text-sm">✨ Tip 1: Regular Watering Pays Off</p>
              <p className="text-white/70 text-xs mt-1">Water your plants every few seconds for faster growth!</p>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-3">
              <p className="text-yellow-200 font-semibold text-sm">✨ Tip 2: Mix & Match Colors</p>
              <p className="text-white/70 text-xs mt-1">Different colored flowers create a beautiful rainbow garden!</p>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-3">
              <p className="text-yellow-200 font-semibold text-sm">✨ Tip 3: Watch All Growth Stages</p>
              <p className="text-white/70 text-xs mt-1">Each stage is beautiful. Let plants grow at their own pace!</p>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-3">
              <p className="text-yellow-200 font-semibold text-sm">✨ Tip 4: Enjoy the Moment</p>
              <p className="text-white/70 text-xs mt-1">This is meditation. No rush, just breathe and watch growth!</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "🌿 You're Ready!",
      icon: "🌿",
      content: (
        <div className="space-y-4 text-center">
          <p className="text-white/80 text-lg">
            You now know everything about <span className="text-green-300 font-bold">Garden Grow</span>! 
          </p>
          <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-6">
            <p className="text-green-200 font-semibold text-lg mb-2">
              🌻 Ready to Create Your Garden? 🌻
            </p>
            <p className="text-white/80 text-sm">
              Go out there and nurture beautiful flowers. Remember: there's no rush, just enjoy the peaceful journey!
            </p>
          </div>
          <p className="text-white/70 text-sm italic">
            "In every seed lies the potential for beauty. You are the gardener of your own peace." 🌱
          </p>
        </div>
      ),
    },
  ];

  const goNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const page = pages[currentPage];

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full flex items-center justify-center p-6"
      >
        <GlassCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">{page.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-2">{page.title}</h2>
            <p className="text-white/50 text-sm">
              Page {currentPage + 1} of {pages.length}
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 mb-8 text-white/90">
            {page.content}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-1 mb-6">
            <div
              className="bg-gradient-to-r from-green-400 to-emerald-400 h-1 rounded-full transition-all duration-300"
              style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
            />
          </div>

          {/* Navigation */}
          <div className="flex gap-3 justify-between">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                onClick={goPrev}
                variant="secondary"
                size="md"
                disabled={currentPage === 0}
              >
                ← Previous
              </Button>
            </motion.div>

            <div className="flex gap-2">
              {currentPage === pages.length - 1 && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    onClick={onStartGame}
                    variant="primary"
                    size="md"
                  >
                    ✨ Start Gardening
                  </Button>
                </motion.div>
              )}
              {currentPage < pages.length - 1 && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    onClick={goNext}
                    variant="primary"
                    size="md"
                  >
                    Next →
                  </Button>
                </motion.div>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                onClick={onBack}
                variant="ghost"
                size="md"
              >
                Back
              </Button>
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

function MenuScreen({ onStart, onGuide }: { onStart: () => void; onGuide: () => void }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="text-center max-w-lg p-10">
          <div className="text-7xl mb-6">🌱</div>
          <h2 className="text-4xl font-bold text-white mb-3">Garden Grow</h2>
          <p className="text-white/70 text-lg mb-2">A Calm & Therapeutic Experience</p>

          <div className="bg-white/10 rounded-lg p-6 my-6 text-left space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🌾</span>
              <div>
                <p className="text-white font-semibold">Plant & Nurture</p>
                <p className="text-white/70 text-sm">Click to plant seeds in the garden</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💧</span>
              <div>
                <p className="text-white font-semibold">Water & Care</p>
                <p className="text-white/70 text-sm">Click plants to water and help them grow</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🦋</span>
              <div>
                <p className="text-white font-semibold">Watch Beauty Bloom</p>
                <p className="text-white/70 text-sm">See flowers bloom & butterflies dance</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <p className="text-white font-semibold">No Rush, No Stress</p>
                <p className="text-white/70 text-sm">Grow at your own pace, just relax</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-col">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button onClick={onGuide} variant="secondary" size="lg" className="w-full">
                📖 How to Play Guide
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button onClick={onStart} variant="primary" size="lg" className="w-full">
                Start Gardening 🌿
              </Button>
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

function ResultsScreen({
  plantsGrown,
  totalHealth,
  bestPlant,
  onRestart,
}: {
  plantsGrown: number;
  totalHealth: number;
  bestPlant: number;
  onRestart: () => void;
}) {
  const avgHealth = plantsGrown > 0 ? Math.round(totalHealth / plantsGrown) : 0;
  let achievement = '🌱';
  let achievementName = 'Gardener';

  if (plantsGrown >= 5) achievement = '🌻';
  if (plantsGrown >= 10) achievement = '🌸';
  if (plantsGrown >= 15) achievement = '🌺';
  if (plantsGrown >= 20) achievement = '🌈';

  if (plantsGrown >= 5) achievementName = 'Garden Enthusiast';
  if (plantsGrown >= 10) achievementName = 'Flower Master';
  if (plantsGrown >= 15) achievementName = 'Garden Wizard';
  if (plantsGrown >= 20) achievementName = 'Nature Guardian';

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="text-center max-w-md p-8">
          <div className="text-6xl mb-4">{achievement}</div>
          <h2 className="text-4xl font-bold text-white mb-2">{achievementName}</h2>

          <div className="bg-white/10 rounded-lg p-6 my-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Plants Grown:</span>
              <span className="text-3xl font-bold text-green-300">{plantsGrown}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Avg Plant Health:</span>
              <span className="text-2xl font-bold text-emerald-300">{avgHealth}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Healthiest Plant:</span>
              <span className="text-2xl font-bold text-teal-300">{bestPlant}%</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onRestart}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Garden Again 🌿
            </Button>
            <p className="text-white/50 text-sm">
              ✨ Thank you for nurturing the garden with love ✨
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

export default function GardenGrow({ onGameEnd }: { onGameEnd?: () => void }) {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [plants, setPlants] = useState<Plant[]>([]);
  const [plantIdRef, setPlantIdRef] = useState(0);
  const [butterflies, setButterflies] = useState<Array<{ id: number; position: Vector3 }>>([]);
  const [totalHealth, setTotalHealth] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [recentlyWatered, setRecentlyWatered] = useState<Set<number>>(new Set());
  const [lastWateredPlant, setLastWateredPlant] = useState<{ id: number; name: string } | null>(null);

  // Start game
  const startGame = () => {
    setGameMode('playing');
    setPlants([]);
    setPlantIdRef(0);
    setButterflies([]);
    setTotalHealth(0);
    setGameTime(0);
  };

  // Game time tracker
  useEffect(() => {
    if (gameMode !== 'playing') return;

    const timer = setInterval(() => {
      setGameTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameMode]);

  // Grow plants over time
  useEffect(() => {
    if (gameMode !== 'playing') return;

    const growthInterval = setInterval(() => {
      setPlants((prevPlants) => {
        const updatedPlants = prevPlants.map((plant) => {
          // Plants lose 0.5% health per second (every interval)
          let newHealth = Math.max(0, plant.health - 0.5);
          
          let growthStage = plant.growthStage;
          const age = plant.age + 1;

          // Growth progression - only progress to next stage if conditions met
          // Stage 0→1: Health > 80%, After 3 seconds
          if (growthStage === 0 && newHealth > 80 && age >= 3) {
            growthStage = 1;
          }
          // Stage 1→2: Health > 60%, After 6 seconds
          if (growthStage === 1 && newHealth > 60 && age >= 6) {
            growthStage = 2;
          }
          // Stage 2→3: Health > 40%, After 10 seconds
          if (growthStage === 2 && newHealth > 40 && age >= 10) {
            growthStage = 3;
          }
          // Stage 3→4: Health > 20%, After 15 seconds
          if (growthStage === 3 && newHealth > 20 && age >= 15) {
            growthStage = 4;
          }

          return {
            ...plant,
            health: newHealth,
            growthStage,
            age,
          };
        });

        // Spawn butterflies for blooming plants (stage >= 3)
        const bloomingPlants = updatedPlants.filter((p) => p.growthStage >= 3);
        if (bloomingPlants.length > 0) {
          setButterflies((prevButterflies) => {
            const existingButterflyIds = new Set(prevButterflies.map((b) => b.id));
            const newButterflies = bloomingPlants
              .filter((p) => !existingButterflyIds.has(p.id))
              .map((p) => ({
                id: p.id,
                position: p.position.clone().add(new Vector3(0, 2, 0)),
              }));

            return [...prevButterflies, ...newButterflies];
          });
        }

        return updatedPlants;
      });
    }, 1000);

    return () => clearInterval(growthInterval);
  }, [gameMode]);

  const handlePlantClick = (plantId: number) => {
    // Visual feedback - show plant was watered
    setRecentlyWatered((prev) => new Set([...prev, plantId]));
    
    // Get the plant to show feedback
    const plant = plants.find(p => p.id === plantId);
    if (plant) {
      const stageNames = ['Seed', 'Sprout', 'Young Plant', 'Flower', 'Blooming Flower'];
      const stageName = stageNames[plant.growthStage] || 'Plant';
      setLastWateredPlant({ id: plantId, name: stageName });
      
      // Clear notification after 2 seconds
      setTimeout(() => {
        setLastWateredPlant(null);
      }, 2000);
    }
    
    setTimeout(() => {
      setRecentlyWatered((prev) => {
        const newSet = new Set(prev);
        newSet.delete(plantId);
        return newSet;
      });
    }, 600);

    // Actual watering logic
    setPlants((prev) =>
      prev.map((plant) =>
        plant.id === plantId
          ? { ...plant, health: Math.min(100, plant.health + 30), wateredTime: gameTime }
          : plant
      )
    );
  };

  const handlePlantSeed = () => {
    const newPlant: Plant = {
      id: plantIdRef,
      position: new Vector3(
        Math.random() * 8 - 4,
        -0.7,
        Math.random() * 8 - 4
      ),
      growthStage: 0,
      health: 100,
      wateredTime: gameTime,
      age: 0,
      color: PLANT_COLORS[Math.floor(Math.random() * PLANT_COLORS.length)].hex,
      hasButterfly: false,
    };

    setPlants((prev) => [...prev, newPlant]);
    setPlantIdRef((prev) => prev + 1);
  };

  const endGame = () => {
    const healthyPlants = plants.filter((p) => p.health > 0);
    const totalH = plants.reduce((sum, p) => sum + p.health, 0);
    const bestHealth = plants.length > 0 ? Math.round(Math.max(...plants.map((p) => p.health))) : 0;

    setTotalHealth(totalH);
    setGameMode('results');
  };

  // Menu screen
  if (gameMode === 'menu') {
    return (
      <div className="relative w-full h-full">
        <Canvas
          camera={{ position: [0, 15, 20], fov: 60 }}
          style={{ background: 'linear-gradient(to bottom, #87CEEB 0%, #90EE90 100%)' }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 15, 10]} intensity={1.5} />
          <OrbitControls autoRotate autoRotateSpeed={0.5} />
        </Canvas>
        <div className="absolute inset-0 flex items-center justify-center">
          <MenuScreen onStart={startGame} onGuide={() => setGameMode('guide')} />
        </div>
      </div>
    );
  }

  // Guide screen
  if (gameMode === 'guide') {
    return (
      <div className="relative w-full h-full">
        <Canvas
          camera={{ position: [0, 15, 20], fov: 60 }}
          style={{ background: 'linear-gradient(to bottom, #87CEEB 0%, #90EE90 100%)' }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 15, 10]} intensity={1.5} />
          <OrbitControls autoRotate autoRotateSpeed={0.5} />
        </Canvas>
        <div className="absolute inset-0 flex items-center justify-center">
          <GuideScreen
            onStartGame={startGame}
            onBack={() => setGameMode('menu')}
          />
        </div>
      </div>
    );
  }

  // Results screen
  if (gameMode === 'results') {
    return (
      <div className="relative w-full h-full">
        <Canvas
          camera={{ position: [0, 15, 20], fov: 60 }}
          style={{ background: 'linear-gradient(to bottom, #87CEEB 0%, #90EE90 100%)' }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 15, 10]} intensity={1.5} />
          <OrbitControls autoRotate autoRotateSpeed={0.8} />
        </Canvas>
        <div className="absolute inset-0 flex items-center justify-center">
          <ResultsScreen
            plantsGrown={plants.length}
            totalHealth={totalHealth}
            bestPlant={plants.length > 0 ? Math.round(Math.max(...plants.map((p) => p.health), 0)) : 0}
            onRestart={startGame}
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
          camera={{ position: [0, 15, 20], fov: 60 }}
          style={{ background: 'linear-gradient(to bottom, #87CEEB 0%, #90EE90 100%)' }}
        >
          <GardenScene
            plants={plants}
            onPlantClick={handlePlantClick}
            butterflies={butterflies}
            recentlyWatered={recentlyWatered}
            isGameplay={true}
          />
        </Canvas>
      </div>

      {/* Top Center - Watering Feedback */}
      {lastWateredPlant && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-20 left-1/2 -translate-x-1/2 z-30"
        >
          <div className="bg-gradient-to-r from-blue-500/80 to-cyan-500/80 backdrop-blur-md border-2 border-cyan-300 rounded-full px-8 py-4 shadow-lg">
            <p className="text-white font-bold text-lg flex items-center gap-2">
              <span className="text-2xl animate-bounce">💧</span>
              {lastWateredPlant.name} Watered!
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🌱</span>
            </p>
          </div>
        </motion.div>
      )}

      {/* Top Left - Time */}
      <div className="absolute top-6 left-6 z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3"
        >
          <p className="text-white/70 text-sm font-semibold">Garden Time</p>
          <p className="text-2xl font-bold text-green-300">{gameTime}s</p>
        </motion.div>
      </div>

      {/* Top Right - Stats */}
      <div className="absolute top-6 right-6 z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3"
        >
          <p className="text-white/70 text-sm font-semibold">Plants</p>
          <p className="text-2xl font-bold text-emerald-300">{plants.length}</p>
        </motion.div>
      </div>

      {/* Bottom Left - Instructions */}
      <div className="absolute bottom-6 left-6 z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 max-w-xs"
        >
          <p className="text-white/80 text-sm leading-relaxed">
            <span className="font-semibold block mb-2">🎮 How to Play:</span>
            🌾 Click button to plant seeds<br/>
            <span className="text-cyan-200 font-semibold">💧 TAP on plants to water them</span><br/>
            🔄 Drag to rotate camera (if needed)<br/>
            ⏰ Watch growth notifications appear<br/>
            🦋 Butterflies = blooming success
          </p>
        </motion.div>
      </div>

      {/* Bottom Center - Plant Seed Button */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            onClick={handlePlantSeed}
            variant="primary"
            size="lg"
            className="rounded-full px-8"
          >
            🌱 Plant a Seed
          </Button>
        </motion.div>
      </div>

      {/* Bottom Right - End Game */}
      <div className="absolute bottom-6 right-6 z-20">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            onClick={endGame}
            variant="secondary"
            size="lg"
          >
            🏁 End & See Results
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
