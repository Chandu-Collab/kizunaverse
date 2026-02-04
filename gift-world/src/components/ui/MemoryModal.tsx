"use client";

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemoryModal({ isOpen, onClose }: MemoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="text-center text-white">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              💕 January 18th, 2026
            </h1>
            <h2 className="text-2xl font-semibold text-pink-200">
              BMS College - Where Our Story Began
            </h2>
          </motion.div>

          {/* Story sections */}
          <div className="space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 rounded-xl p-6 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-3 text-pink-200">🎓 The Fateful Day</h3>
              <p className="text-white/90 leading-relaxed">
                You came to BMS College for your exam, never knowing that this ordinary day 
                would become the most extraordinary day of your life. Sometimes the universe 
                has its own plans, and love finds us when we least expect it.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 rounded-xl p-6 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-3 text-pink-200">✨ The First Meeting</h3>
              <p className="text-white/90 leading-relaxed">
                By pure chance, you met her at BMS College. That first conversation, that first smile, 
                that spark of connection - it was magic. She was from Rajajinagar, and you knew you 
                had to spend more time with her, even if it meant a 2km walk.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/10 rounded-xl p-6 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-3 text-pink-200">🚶‍♂️💕 The 2km Walk</h3>
              <p className="text-white/90 leading-relaxed">
                You offered to walk with her to her friend's home - a 2km journey that became the 
                most meaningful walk of your life. Every step, every word, every laugh along the way 
                was building something beautiful. Distance means nothing when you're with the right person.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl p-6 backdrop-blur-sm border border-pink-300/30"
            >
              <h3 className="text-xl font-bold mb-3 text-pink-200">🏠 Creating This World</h3>
              <p className="text-white/90 leading-relaxed mb-4">
                Now you're building this entire virtual world for her, recreating the places that matter 
                to your story. BMS College isn't just a building here - it's a monument to love, 
                a digital shrine to the moment that changed everything.
              </p>
              <div className="bg-pink-500/10 rounded-lg p-4">
                <p className="text-pink-200 font-medium text-center">
                  "For the girl who made Bangalore feel like home, 
                  and made every kilometer worth walking." 💖
                </p>
              </div>
            </motion.div>
          </div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={onClose}
                variant="primary"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                💕 Keep Exploring Our Story
              </Button>
              <Button
                onClick={() => {
                  // Add future functionality here - maybe play music, show more memories, etc.
                  onClose();
                }}
                variant="ghost"
                className="border-pink-300 text-pink-200 hover:bg-pink-500/20"
              >
                ✨ Relive The Walk
              </Button>
            </div>
            <p className="text-xs text-white/60 mt-4">
              "Every great love story has a beginning. This is ours." 💫
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}