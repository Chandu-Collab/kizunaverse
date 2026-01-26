'use client';

import { Suspense } from 'react';
import PriyaCharacter from '@/components/3d/PriyaCharacter';
import UruruCharacter from '@/components/3d/UruruCharacter';
import { useCharacter } from '@/hooks/useCharacter';
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
  const { selectedCharacter, setSelectedCharacter } = useCharacter();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ThemeToggle />
      {/* Character Selection UI */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-6 bg-black/40 rounded-xl px-6 py-3 shadow-lg">
        <button
          className={`flex flex-col items-center focus:outline-none ${selectedCharacter === 'priya' ? 'ring-2 ring-pink-400' : ''}`}
          onClick={() => setSelectedCharacter('priya')}
        >
          <img src="/cute_girl_character.glb" alt="Priya" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          <span className="text-white mt-1">Priya</span>
        </button>
        <button
          className={`flex flex-col items-center focus:outline-none ${selectedCharacter === 'ururu' ? 'ring-2 ring-blue-400' : ''}`}
          onClick={() => setSelectedCharacter('ururu')}
        >
          <img src="/ururu.glb" alt="Ururu" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          <span className="text-white mt-1">Ururu</span>
        </button>
      </div>
      <Scene cameraPosition={[0, 7, 14]} enableControls={true}>
        <Suspense fallback={null}>
          <OotyScene />
          <Particles count={isNight ? 150 : 100} />
          {/* Render selected character */}
          {selectedCharacter === 'priya' ? (
            <PriyaCharacter
              initialPosition={[0, 1, 6]}
              roamRadius={4}
              onInteract={() => {}}
            />
          ) : (
            <UruruCharacter
              initialPosition={[0, 1, 6]}
              roamRadius={4}
              onInteract={() => {}}
            />
          )}
          {/* Navigation Objects */}
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
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="pointer-events-auto"
        >
          <GlassCard className="text-center max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome to Your World!
            </h1>
            <p className="text-white/80 text-lg mb-2">
              {isNight ? 'Enjoy a peaceful night in the hills.' : 'Enjoy your peaceful hill station escape!'}
            </p>
            <p className="text-white/70 text-sm mb-3">
              You are a special guest here. Explore all the amazing zones—just click on the floating objects or say hi to your character as they roam around!
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
