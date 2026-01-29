'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Howl } from 'howler';

interface AudioContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  playSound: (sound: string) => void;
  volume: number;
  setVolume: (volume: number) => void;
  ambientEnabled: boolean;
  toggleAmbient: () => void;
  ambientVolume: number;
  setAmbientVolume: (volume: number) => void;
}


const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children, season = 'spring', isNight = false }: { children: ReactNode, season?: string, isNight?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [backgroundMusic, setBackgroundMusic] = useState<Howl | null>(null);
  const [ambientEnabled, setAmbientEnabled] = useState(true);
  const [ambientVolume, setAmbientVolume] = useState(0.5);
  const [ambientHowls, setAmbientHowls] = useState<{ [key: string]: Howl | null }>({ birds: null, water: null, wind: null });

  useEffect(() => {
    // For now, set to null - music toggle will be disabled until audio is added
    setBackgroundMusic(null);
    // Ambient sounds
    const birds = new Howl({
      src: ['/audio/ambient-birds.mp3'],
      loop: true,
      volume: ambientVolume,
      preload: true,
      onloaderror: () => console.log('Birds sound file not found'),
    });
    const water = new Howl({
      src: ['/audio/ambient-water.mp3'],
      loop: true,
      volume: ambientVolume * 0.7,
      preload: true,
      onloaderror: () => console.log('Water sound file not found'),
    });
    const wind = new Howl({
      src: ['/audio/ambient-wind.mp3'],
      loop: true,
      volume: ambientVolume * 0.5,
      preload: true,
      onloaderror: () => console.log('Wind sound file not found'),
    });
    setAmbientHowls({ birds, water, wind });
    return () => {
      birds.unload();
      water.unload();
      wind.unload();
    };
  }, []);

  useEffect(() => {
    if (backgroundMusic) {
      backgroundMusic.volume(volume);
    }
    // Update ambient sound volumes
    Object.entries(ambientHowls).forEach(([key, howl]) => {
      if (howl) {
        if (key === 'birds') howl.volume(ambientVolume);
        if (key === 'water') howl.volume(ambientVolume * 0.7);
        if (key === 'wind') howl.volume(ambientVolume * 0.5);
      }
    });
  }, [volume, backgroundMusic, ambientVolume, ambientHowls]);
  // Auto-adjust ambient sounds based on season and time
  useEffect(() => {
    Object.entries(ambientHowls).forEach(([key, howl]) => {
      if (!howl) return;
      let shouldPlay = false;
      // Spring: birds, water; Summer: birds, water, wind; Autumn: birds, wind; Winter: wind, water; Festival: birds, wind
      if (season === 'spring') shouldPlay = key === 'birds' || key === 'water';
      if (season === 'summer') shouldPlay = key === 'birds' || key === 'water' || key === 'wind';
      if (season === 'autumn') shouldPlay = key === 'birds' || key === 'wind';
      if (season === 'winter') shouldPlay = key === 'wind' || key === 'water';
      if (season === 'festival') shouldPlay = key === 'birds' || key === 'wind';
      // At night, reduce birds, emphasize wind
      if (isNight && key === 'birds') shouldPlay = false;
      if (ambientEnabled && shouldPlay) {
        if (!howl.playing()) howl.play();
      } else {
        howl.stop();
      }
    });
  }, [ambientEnabled, ambientHowls, season, isNight]);

  // Expose toggle and volume for ambient
  const toggleAmbient = () => setAmbientEnabled((v) => !v);

  const toggleMusic = () => {
    if (!backgroundMusic) {
      console.log('No background music file configured. Add an audio file to enable music.');
      return;
    }

    if (isPlaying) {
      backgroundMusic.pause();
    } else {
      backgroundMusic.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playSound = (sound: string) => {
    // Sound effects can be added here
    // For now, just a placeholder
    console.log(`Playing sound: ${sound}`);
  };

  return (
    <AudioContext.Provider value={{
      isPlaying,
      toggleMusic,
      playSound,
      volume,
      setVolume,
      ambientEnabled,
      toggleAmbient,
      ambientVolume,
      setAmbientVolume
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
