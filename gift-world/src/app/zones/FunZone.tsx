'use client';

import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { motion } from 'framer-motion';
import FloatingBubblesGame from '@/components/3d/FloatingBubblesGame';
import GardenGrow from '@/components/3d/GardenGrow';
import MemoryTilesGame from '@/components/3d/MemoryTilesGame';
import ColorFlowGame from '@/components/3d/ColorFlowGame';
import WindLeavesGame from '@/components/3d/WindLeavesGame';

interface Game {
  id: number;
  name: string;
  emoji: string;
  description: string;
  component?: React.ComponentType<{ onGameEnd?: () => void }>;
}

const GAMES: Game[] = [
  { 
    id: 1, 
    name: 'Floating Bubbles', 
    emoji: '🫧', 
    description: 'Pop colorful bubbles - pure relaxation',
    component: FloatingBubblesGame
  },
  { 
    id: 2, 
    name: 'Garden Grow', 
    emoji: '🌱', 
    description: 'Nurture & grow flowers - calm & therapeutic',
    component: GardenGrow
  },
  { 
    id: 3, 
    name: 'Memory Tiles', 
    emoji: '🧠', 
    description: 'Match pairs - keeps mind active without stress',
    component: MemoryTilesGame
  },
  { 
    id: 4, 
    name: 'Color Flow', 
    emoji: '🌈', 
    description: 'Connect colors like flowing liquid - pure art',
    component: ColorFlowGame
  },
  { 
    id: 5, 
    name: 'Wind & Leaves', 
    emoji: '🍃', 
    description: 'Move and watch leaves dance - pure meditation',
    component: WindLeavesGame
  },
  { id: 6, name: 'Word Builder', emoji: '📝', description: 'Create words from letters' },
  { id: 7, name: 'Pattern Play', emoji: '🔷', description: 'Complete visual patterns' },
  { id: 8, name: 'Speed Racer', emoji: '🏁', description: 'Race against the clock' },
  { id: 9, name: 'Block Breaker', emoji: '🧱', description: 'Break through blocks' },
  { id: 10, name: 'Quest Adventure', emoji: '⚔️', description: 'Embark on an adventure' },
];

export default function FunZone() {
  const { navigateTo } = useNavigation();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayGame = (game: Game) => {
    setSelectedGame(game);
    setIsPlaying(true);
  };

  const handleGameEnd = () => {
    setIsPlaying(false);
    setSelectedGame(null);
  };

  // If game is being played, show full screen game
  if (isPlaying && selectedGame?.component) {
    const GameComponent = selectedGame.component;
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <GameComponent onGameEnd={handleGameEnd} />
        <Button
          onClick={handleGameEnd}
          variant="ghost"
          size="lg"
          className="absolute top-6 left-6 z-20"
        >
          ← Back to Games
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full p-6 md:p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">🎮 Fun Zone</h1>
            <p className="text-white/70 text-lg">Choose a game and have fun!</p>
          </div>
          <Button
            onClick={() => navigateTo('home')}
            variant="ghost"
            size="lg"
          >
            ← Back
          </Button>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {GAMES.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="cursor-pointer"
            >
              <GlassCard className="h-full flex flex-col justify-between p-6 text-center hover:border-blue-400/50 transition-all">
                <div>
                  <div className="text-5xl mb-3">{game.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
                  <p className="text-white/70 text-sm mb-4">{game.description}</p>
                </div>
                <Button
                  onClick={() => handlePlayGame(game)}
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  Play
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
