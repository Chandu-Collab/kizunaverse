'use client';

import { useAudio } from './AudioManager';
import { motion } from 'framer-motion';

export default function MusicToggle() {
  const { isPlaying, toggleMusic } = useAudio();

  // Music toggle button - will log a message if no audio is configured
  // The button will still show but won't do anything until audio is added
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleMusic}
      className="fixed top-6 right-6 z-50 glass rounded-full p-3 text-white hover:bg-white/20 transition-all opacity-50"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      title="Toggle background music (add audio file to /public/audio/ to enable)"
    >
      {isPlaying ? (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </motion.button>
  );
}
