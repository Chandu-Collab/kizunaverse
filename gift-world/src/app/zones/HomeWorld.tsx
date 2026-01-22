'use client';

import { Suspense } from 'react';
import Scene from '@/components/3d/Scene';
import OotyScene from '@/components/3d/OotyScene';
import InteractiveObject from '@/components/3d/InteractiveObject';
import Particles from '@/components/3d/Particles';
import { useNavigation } from '@/hooks/useNavigation';
import { useTheme } from '@/hooks/useTheme';
import GlassCard from '@/components/ui/GlassCard';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { motion } from 'framer-motion';

export default function HomeWorld() {
  const { navigateTo } = useNavigation();
  const { isNight } = useTheme();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ThemeToggle />
      <Scene cameraPosition={[0, 7, 14]} enableControls={true}>
        <Suspense fallback={null}>
          <OotyScene />
          <Particles count={isNight ? 150 : 100} />
          
          {/* Navigation Objects - More spaced and naturally placed */}
          <InteractiveObject
            position={[-8, 2, 2]}
            label="🎂 Birthday"
            onClick={() => navigateTo('birthday')}
            color="#FFB6C1"
            shape="sphere"
          />
          
          <InteractiveObject
            position={[8, 2, 2]}
            label="🎮 Fun"
            onClick={() => navigateTo('fun')}
            color="#87CEEB"
            shape="box"
          />
          
          <InteractiveObject
            position={[0, 2, -10]}
            label="📚 Study"
            onClick={() => navigateTo('study')}
            color="#DDA0DD"
            shape="cylinder"
          />
          
          <InteractiveObject
            position={[-4, 2, 6]}
            label="💌 Your Space"
            onClick={() => navigateTo('space')}
            color="#F0E68C"
            shape="sphere"
          />
        </Suspense>
      </Scene>

      {/* Welcome Message Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="pointer-events-auto"
        >
          <GlassCard className="text-center max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome to Ooty
            </h1>
            <p className="text-white/80 text-lg mb-2">
              {isNight ? 'A peaceful night in the hills' : 'Your peaceful hill station escape'}
            </p>
            <p className="text-white/70 text-sm mb-3">
              Click on the floating objects to explore different zones
            </p>
            <p className="text-white/60 text-xs">
              Use the theme toggle to switch between day and night
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
