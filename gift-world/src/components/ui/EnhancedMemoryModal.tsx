"use client";

import { motion } from 'framer-motion';
import EnhancedStoryReader from '@/components/ui/EnhancedStoryReader';
import { january18thStory } from '@/data/january18th-story';

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnhancedMemoryModal({ isOpen, onClose }: MemoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-6">
      {/* Magical entrance animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass rounded-3xl p-8 max-w-4xl w-full h-[88vh] relative flex flex-col overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          backdropFilter: 'blur(25px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Magical sparkles around the modal */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ 
                opacity: 0,
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%'
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        {/* Elegant close button */}
        <motion.button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>
        
        <div className="text-white flex-1 overflow-hidden min-h-0">
          <EnhancedStoryReader 
            story={january18thStory} 
            onClose={onClose} 
          />
        </div>
      </motion.div>
    </div>
  );
}