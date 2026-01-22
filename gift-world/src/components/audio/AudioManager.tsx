'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Howl } from 'howler';

interface AudioContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  playSound: (sound: string) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [backgroundMusic, setBackgroundMusic] = useState<Howl | null>(null);

  useEffect(() => {
    // Initialize background music (you can add an actual audio file later)
    // For now, we'll skip creating Howl if no audio file is provided
    // To add music: place your audio file in public/audio/ and uncomment below
    /*
    const music = new Howl({
      src: ['/audio/background-music.mp3'], // Add your music file path here
      loop: true,
      volume: volume,
      onloaderror: () => {
        console.log('Music file not found');
      },
    });
    setBackgroundMusic(music);
    return () => {
      music.unload();
    };
    */
    
    // For now, set to null - music toggle will be disabled until audio is added
    setBackgroundMusic(null);
  }, []);

  useEffect(() => {
    if (backgroundMusic) {
      backgroundMusic.volume(volume);
    }
  }, [volume, backgroundMusic]);

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
    <AudioContext.Provider value={{ isPlaying, toggleMusic, playSound, volume, setVolume }}>
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
