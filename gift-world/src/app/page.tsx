'use client';

import { AudioProvider } from '@/components/audio/AudioManager';
import { NavigationProvider, useNavigation } from '@/hooks/useNavigation';
import { ThemeProvider } from '@/hooks/useTheme';
import { CharacterProvider } from '@/hooks/useCharacter';
import MusicToggle from '@/components/audio/MusicToggle';
import HomeWorld from './zones/HomeWorld';
import BirthdayZone from './zones/BirthdayZone';
import FunZone from './zones/FunZone';
import StudyZone from './zones/StudyZone';
import YourSpace from './zones/YourSpace';
import { AnimatePresence, motion } from 'framer-motion';
import ParticleBackground from '@/components/ui/ParticleBackground';

function ZoneRenderer() {
  const { currentZone, isTransitioning } = useNavigation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentZone}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-screen"
      >
        {currentZone === 'home' && <HomeWorld />}
        {currentZone === 'birthday' && <BirthdayZone />}
        {currentZone === 'fun' && <FunZone />}
        {currentZone === 'study' && <StudyZone />}
        {currentZone === 'space' && <YourSpace />}
      </motion.div>
    </AnimatePresence>
  );
}

function Home() {
  return (
    <ThemeProvider>
      <CharacterProvider>
        <AudioProvider>
          <NavigationProvider>
            <ParticleBackground />
            <ZoneRenderer />
            <MusicToggle />
          </NavigationProvider>
        </AudioProvider>
      </CharacterProvider>
    </ThemeProvider>
  );
}

export default Home;
