'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sparkles } from '@react-three/drei';
import { Mesh, MeshStandardMaterial } from 'three';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

interface Card {
  id: number;
  symbol: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
  position: [number, number, number];
}

type GameMode = 'playing' | 'completed';

const SYMBOLS = ['🌟', '🎨', '🎭', '🎪', '🎬', '🎯', '🎲', '🎸'];
const ENCOURAGING_MESSAGES = [
  'Great memory! 🌟',
  'You\'re doing awesome! 💫',
  'Keep it up! 👏',
  'Wonderful match! ✨',
  'Nice work! 🎉',
  'You got it! 🎊',
  'Excellent! 🌈',
  'Perfect! 💖',
];

function FlipCard({
  card,
  onClick,
}: {
  card: Card;
  onClick: () => void;
}) {
  const meshRef = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = isHovered
        ? card.isMatched
          ? 1
          : 1.15
        : card.isMatched
        ? 0.95
        : 1;

      meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1;
      meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.1;
      meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.1;

      const targetRotation = card.isFlipped ? Math.PI : 0;
      const diff = targetRotation - meshRef.current.rotation.y;
      meshRef.current.rotation.y += diff * 0.1;
      
      // Add subtle bobbing for matched cards
      if (card.isMatched) {
        meshRef.current.position.z += Math.sin(Date.now() / 300) * 0.02;
      }
    }
  });

  const handleClick = () => {
    if (!card.isMatched && !card.isFlipped) {
      onClick();
    }
  };

  const baseColor = card.isMatched ? '#22c55e' : '#3b82f6';
  const emissiveColor = card.isMatched ? '#16a34a' : isHovered ? '#60a5fa' : '#000000';

  return (
    <group position={card.position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerEnter={() => !card.isMatched && setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <boxGeometry args={[0.9, 0.9, 0.1]} />
        <meshStandardMaterial
          color={baseColor}
          metalness={card.isMatched ? 0.6 : 0.4}
          roughness={card.isMatched ? 0.2 : 0.3}
          emissive={emissiveColor}
          emissiveIntensity={isHovered || card.isMatched ? 0.6 : 0}
          envMapIntensity={1}
        />
      </mesh>

      {/* Glow ring for matched cards */}
      {card.isMatched && (
        <mesh position={[0, 0, 0.08]}>
          <ringGeometry args={[0.5, 0.65, 32]} />
          <meshStandardMaterial
            color="#22c55e"
            emissive="#16a34a"
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
      )}

      {/* Front face (visible when flipped or matched) */}
      <Text
        position={[0, 0, 0.07]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {!card.isFlipped ? '?' : card.symbol}
      </Text>

      {/* Sparkle effect for matched cards */}
      {card.isMatched && (
        <Text
          position={[0.35, 0.35, 0.08]}
          fontSize={0.25}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
        >
          ✨
        </Text>
      )}
    </group>
  );
}

function GameCanvas({ cards, handleCardClick }: { cards: Card[]; handleCardClick: (id: number) => void }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 50 }}
      className="w-full h-full"
      gl={{ antialias: true, alpha: true }}
    >
      {/* Advanced Lighting Setup */}
      <ambientLight intensity={0.7} />
      <pointLight position={[15, 15, 15]} intensity={1} color="#ffffff" />
      <pointLight position={[-15, 10, 10]} intensity={0.8} color="#60a5fa" />
      <pointLight position={[0, -10, 10]} intensity={0.6} color="#a78bfa" />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />

      {/* Particle effects */}
      <Sparkles
        count={100}
        scale={20}
        size={3}
        speed={0.5}
        color="#60a5fa"
      />

      {cards.map((card) => (
        <FlipCard
          key={card.id}
          card={card}
          onClick={() => handleCardClick(card.id)}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={false}
      />
    </Canvas>
  );
}

export default function MemoryTilesGame({ onGameEnd }: { onGameEnd?: () => void }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [gameMode, setGameMode] = useState<GameMode>('playing');
  const [message, setMessage] = useState('');
  const [moves, setMoves] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const cardArray: Card[] = [];
    const positions: [number, number, number][] = [
      [-2.5, 2.5, 0],
      [-1.2, 2.5, 0],
      [0.1, 2.5, 0],
      [1.4, 2.5, 0],
      [-2.5, 1, 0],
      [-1.2, 1, 0],
      [0.1, 1, 0],
      [1.4, 1, 0],
      [-2.5, -0.5, 0],
      [-1.2, -0.5, 0],
      [0.1, -0.5, 0],
      [1.4, -0.5, 0],
      [-2.5, -2, 0],
      [-1.2, -2, 0],
      [0.1, -2, 0],
      [1.4, -2, 0],
    ];

    // Create 8 pairs - each of the 8 symbols appears exactly TWICE
    const symbolPairs: Array<{ symbol: string; pairId: number }> = [];
    SYMBOLS.forEach((symbol, index) => {
      // Add symbol twice for a pair
      symbolPairs.push({ symbol, pairId: index });
      symbolPairs.push({ symbol, pairId: index });
    });
    
    shuffleArray(symbolPairs);

    for (let i = 0; i < 16; i++) {
      cardArray.push({
        id: i,
        symbol: symbolPairs[i].symbol,
        pairId: symbolPairs[i].pairId,
        isFlipped: false,
        isMatched: false,
        position: positions[i],
      });
    }

    setCards(cardArray);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setMessage('');
    setGameMode('playing');
  };

  const shuffleArray = (array: Array<{ symbol: string; pairId: number }>) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleCardClick = useCallback(
    (cardId: number) => {
      setFlipped((prevFlipped) => {
        if (prevFlipped.includes(cardId) || matched.includes(cardId)) return prevFlipped;
        if (prevFlipped.length === 2) return prevFlipped;

        const newFlipped = [...prevFlipped, cardId];

        if (newFlipped.length === 2) {
          const card1 = cards[newFlipped[0]];
          const card2 = cards[newFlipped[1]];

          setTimeout(() => {
            if (card1.symbol === card2.symbol) {
              // Match found - only if symbols are identical!
              setMatched((prev) => [...prev, newFlipped[0], newFlipped[1]]);
              setMessage(ENCOURAGING_MESSAGES[Math.floor(Math.random() * ENCOURAGING_MESSAGES.length)]);
              setMoves((prev) => prev + 1);
              setFlipped([]);

              // Check if game completed (8 pairs = 16 cards)
              if (matched.length + 2 === 16) {
                setTimeout(() => setGameMode('completed'), 600);
              }
            } else {
              // No match
              setFlipped([]);
            }
          }, 800);
        }

        return newFlipped;
      });
    },
    [cards, matched]
  );

  const handlePlayAgain = () => {
    initializeGame();
  };

  // Help content component
  const HelpModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowHelp(false)}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 rounded-2xl p-8 max-w-2xl max-h-96 overflow-y-auto border border-blue-400/30"
      >
        <h2 className="text-3xl font-bold text-white mb-4">🧠 How to Play Memory Tiles</h2>
        
        <div className="space-y-4 text-white/90">
          <div>
            <h3 className="text-xl font-bold text-blue-300 mb-2">Objective</h3>
            <p>Match all pairs of cards by finding two cards with the same symbol. No time pressure - play at your own pace!</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-blue-300 mb-2">How It Works</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Click on any card to flip it and reveal the symbol</li>
              <li>Click another card to try to find its matching pair</li>
              <li>Matching pairs turn green and stay revealed</li>
              <li>Non-matching cards flip back after a moment</li>
              <li>Repeat until all 8 pairs are matched!</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-blue-300 mb-2">Why It's Great</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>✅ No countdown - play at your pace</li>
              <li>✅ No punishment - relax and enjoy</li>
              <li>✅ Encouraging messages when you match</li>
              <li>✅ Keeps your mind active & sharp</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-blue-300 mb-2">Game Symbols (8 Pairs)</h3>
            <p className="text-sm leading-relaxed">
              🌟 🎨 🎭 🎪 🎬 🎯 🎲 🎸
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-blue-300 mb-2">Tracked Stats</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><span className="text-blue-400">Moves:</span> Number of pair-matching attempts</li>
              <li><span className="text-green-400">Matched:</span> Your progress (e.g., 3/8 pairs)</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 mt-6 justify-end">
          <Button
            onClick={() => setShowHelp(false)}
            variant="primary"
            size="lg"
          >
            Got it! Let's Play
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );

  if (gameMode === 'completed') {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 p-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <GlassCard className="p-8 md:p-12 max-w-md">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-4">You Won!</h2>
            <p className="text-white/70 text-lg mb-2">
              Completed in {moves} moves
            </p>
            <p className="text-white/70 text-sm mb-8">
              Amazing memory skills! You matched all pairs perfectly!
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handlePlayAgain}
                variant="primary"
                size="lg"
              >
                Play Again
              </Button>
              <Button
                onClick={onGameEnd}
                variant="ghost"
                size="lg"
              >
                Back
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20">
      {/* Help Modal */}
      {showHelp && <HelpModal />}
      {/* Header */}
      <div className="flex justify-between items-center p-6 z-10 relative">
        <div>
          <h1 className="text-3xl font-bold text-white">🧠 Memory Tiles</h1>
          <p className="text-white/70">Find all matching pairs!</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-white text-sm">Moves: <span className="text-2xl font-bold text-blue-400">{moves}</span></p>
            <p className="text-white text-sm">Matched: <span className="text-2xl font-bold text-green-400">{Math.floor(matched.length / 2)}/8</span></p>
          </div>
          <Button
            onClick={() => setShowHelp(true)}
            variant="ghost"
            size="lg"
            className="text-xl"
          >
            ❓
          </Button>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="flex-1 relative">
        {cards.length > 0 && (
          <GameCanvas
            cards={cards.map((card) => ({
              ...card,
              isFlipped: flipped.includes(card.id),
              isMatched: matched.includes(card.id),
            }))}
            handleCardClick={handleCardClick}
          />
        )}
      </div>

      {/* Encouraging Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20"
        >
          <GlassCard className="px-6 py-3">
            <p className="text-white text-lg font-semibold">{message}</p>
          </GlassCard>
        </motion.div>
      )}

      {/* Back Button */}
      <div className="p-6 z-10 relative">
        <Button
          onClick={onGameEnd}
          variant="ghost"
          size="lg"
        >
          ← Back to Games
        </Button>
      </div>
    </div>
  );
}
