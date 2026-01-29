"use client";

import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { motion } from 'framer-motion';

export default function ZenGarden() {
  const { navigateTo } = useNavigation();
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-green-500">
      <GlassCard className="text-center max-w-lg mx-auto p-8">
        <h1 className="text-4xl font-bold text-green-900 mb-4">🌱 Zen Garden</h1>
        <p className="text-green-800 text-lg mb-6">
          Welcome to your peaceful Zen Garden. Relax, breathe, and enjoy the calm vibes. 🌸
        </p>
        <Button onClick={() => navigateTo('home')} variant="ghost" size="md">
          ← Back Home
        </Button>
      </GlassCard>
    </div>
  );
}
