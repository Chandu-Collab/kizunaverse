"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Story, StoryChapter } from '@/data/january18th-story';
import { chapterThemes, ChapterTheme } from '@/data/story-themes';
import Button from '@/components/ui/Button';

interface StoryReaderProps {
  story: Story;
  onClose: () => void;
}

// Floating particles component
const FloatingParticles = ({ effect, color }: { effect: string, color: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(effect === 'hearts' ? 8 : 12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            opacity: 0,
            x: Math.random() * 100 + '%',
            y: '100%'
          }}
          animate={{
            opacity: [0, 0.6, 0],
            y: '-10%',
            x: Math.random() * 20 - 10 + '%'
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 8
          }}
          style={{ color }}
        >
          {effect === 'hearts' ? '💕' : effect === 'sparkles' ? '✨' : '🌟'}
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced text component with highlight effects
const EnhancedText = ({ 
  text, 
  highlights, 
  delay, 
  theme 
}: { 
  text: string, 
  highlights?: string[], 
  delay: number,
  theme: ChapterTheme 
}) => {
  const isHighlight = highlights?.some(h => text.toLowerCase().includes(h.toLowerCase()));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.08, duration: 0.6 }}
      className={`${
        text === '' 
          ? 'h-3' 
          : text.length < 50
          ? 'text-lg text-white font-medium leading-relaxed'
          : 'text-base text-white/90 leading-relaxed'
      } ${isHighlight ? 'relative' : ''}`}
    >
      {isHighlight && (
        <motion.div
          className="absolute inset-0 rounded-lg -z-10"
          style={{ 
            background: `linear-gradient(45deg, ${theme.primaryColor}20, ${theme.secondaryColor}20)`,
            boxShadow: `0 0 20px ${theme.primaryColor}30`
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay * 0.08 + 0.5 }}
        />
      )}
      {text}
      {isHighlight && (
        <motion.span
          className="absolute -top-1 -right-1"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay * 0.08 + 0.8 }}
        >
          💖
        </motion.span>
      )}
    </motion.div>
  );
};

export default function EnhancedStoryReader({ story, onClose }: StoryReaderProps) {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [showProgress, setShowProgress] = useState(true);
  const [showNextPreview, setShowNextPreview] = useState(false);

  const chapter = story.chapters[currentChapter];
  const theme = chapterThemes[currentChapter] || chapterThemes[0];
  const isFirstChapter = currentChapter === 0;
  const isLastChapter = currentChapter === story.chapters.length - 1;
  const nextChapter = !isLastChapter ? story.chapters[currentChapter + 1] : null;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isLastChapter) return;
    
    const timer = setTimeout(() => {
      setCurrentChapter(prev => Math.min(prev + 1, story.chapters.length - 1));
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [currentChapter, isAutoPlaying, isLastChapter]);

  const goToNextChapter = () => {
    if (!isLastChapter) {
      setCurrentChapter(prev => prev + 1);
    }
  };

  const goToPreviousChapter = () => {
    if (!isFirstChapter) {
      setCurrentChapter(prev => prev - 1);
    }
  };

  const goToChapter = (index: number) => {
    setCurrentChapter(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Dynamic background with chapter theme */}
      <motion.div
        key={currentChapter}
        className={`absolute inset-0 bg-gradient-to-br ${theme.backgroundGradient} -z-20`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Floating particles */}
      <FloatingParticles effect={theme.particleEffect} color={theme.primaryColor} />

      {/* Custom scrollbar styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: ${theme.primaryColor}60;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: ${theme.primaryColor}80;
          }
        `
      }} />
      
      {/* Story Header with mood indicator */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 flex-shrink-0 relative"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <motion.div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: theme.primaryColor }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity
            }}
          />
          <span className="text-white/70 text-sm capitalize">{theme.mood} moment</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-2 text-white">
          📖 {story.title}
        </h1>
        <p className="text-white/80 text-lg">{story.subtitle}</p>
        <p className="text-white/60 text-sm">{story.date}</p>
      </motion.div>

      {/* Enhanced Progress with reading time */}
      {showProgress && (
        <div className="mb-4 flex-shrink-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/70">
              Chapter {currentChapter + 1} of {story.chapters.length} • {theme.readingTime} read
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/50">
                {Math.round(((currentChapter + 1) / story.chapters.length) * 100)}% complete
              </span>
              <button
                onClick={() => setShowProgress(false)}
                className="text-white/40 hover:text-white/70 text-xs"
              >
                Hide
              </button>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-2 rounded-full"
              style={{ 
                background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.secondaryColor})`
              }}
              initial={{ width: 0 }}
              animate={{ width: `${((currentChapter + 1) / story.chapters.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      {/* Enhanced Chapter Navigation Dots with mood colors */}
      <div className="flex justify-center mb-4 flex-shrink-0">
        <div className="flex gap-2">
          {story.chapters.map((_, index) => {
            const dotTheme = chapterThemes[index] || chapterThemes[0];
            return (
              <button
                key={index}
                onClick={() => goToChapter(index)}
                className="relative group"
                title={`Chapter ${index + 1}: ${dotTheme.mood} (${dotTheme.readingTime})`}
              >
                <motion.div
                  className={`w-3 h-3 rounded-full transition-all duration-300`}
                  style={{
                    backgroundColor: index === currentChapter 
                      ? dotTheme.primaryColor 
                      : index < currentChapter
                      ? dotTheme.primaryColor + '60'
                      : 'rgba(255, 255, 255, 0.25)'
                  }}
                  animate={{
                    scale: index === currentChapter ? 1.3 : 1,
                  }}
                />
                {index === currentChapter && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ 
                      backgroundColor: dotTheme.primaryColor,
                      filter: 'blur(8px)'
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chapter Content with enhanced styling */}
      <div className="flex-1 min-h-0 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-full"
          >
            <div 
              className="backdrop-blur-sm rounded-xl p-6 h-full border relative"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
                borderColor: theme.primaryColor + '30',
                boxShadow: `0 8px 32px ${theme.primaryColor}15`
              }}
            >
              {/* Scrollable content area */}
              <div 
                className="h-full overflow-y-auto pr-2 custom-scrollbar"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: `${theme.primaryColor}60 transparent`
                }}
              >
                {/* Enhanced Chapter Header */}
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    className="text-5xl mb-4"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    {chapter.emoji}
                  </motion.div>
                  <motion.h2 
                    className="text-2xl font-bold text-white mb-2"
                    style={{ textShadow: `0 0 20px ${theme.primaryColor}50` }}
                  >
                    Chapter {chapter.id}
                  </motion.h2>
                  <motion.h3 
                    className="text-xl font-medium"
                    style={{ color: theme.secondaryColor }}
                  >
                    {chapter.title}
                  </motion.h3>
                </motion.div>

                {/* Enhanced Chapter Text with highlights */}
                <div className="space-y-4 text-center max-w-2xl mx-auto pb-8">
                  {chapter.content.map((paragraph, index) => (
                    <EnhancedText
                      key={index}
                      text={paragraph}
                      highlights={theme.emotionalHighlight}
                      delay={index}
                      theme={theme}
                    />
                  ))}
                  
                  {/* Chapter completion celebration */}
                  <motion.div
                    className="pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: chapter.content.length * 0.08 + 1 }}
                  >
                    <div 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        background: `linear-gradient(45deg, ${theme.primaryColor}20, ${theme.secondaryColor}20)`,
                        border: `1px solid ${theme.primaryColor}40`
                      }}
                    >
                      <span>✨</span>
                      <span style={{ color: theme.secondaryColor }}>
                        Chapter {chapter.id} Complete
                      </span>
                      <span>✨</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next Chapter Preview */}
      {!isLastChapter && (
        <motion.div
          className="mt-4 flex-shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setShowNextPreview(!showNextPreview)}
            className="w-full text-center p-3 rounded-lg border border-white/20 hover:border-white/40 transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <div className="text-white/70 text-sm">
              Next: {nextChapter?.title} {nextChapter?.emoji}
            </div>
            {showNextPreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-white/50 text-xs mt-2"
              >
                {nextChapter?.content[0]?.substring(0, 60)}...
              </motion.div>
            )}
          </button>
        </motion.div>
      )}

      {/* Enhanced Navigation Controls */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 space-y-4 flex-shrink-0"
      >
        {/* Chapter Navigation */}
        <div className="flex justify-center gap-3">
          <Button
            onClick={goToPreviousChapter}
            disabled={isFirstChapter}
            variant="ghost"
            size="sm"
            className={`border-white/30 text-white/80 hover:bg-white/10 disabled:opacity-30`}
          >
            ← Previous
          </Button>
          
          <Button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            variant="primary"
            size="sm"
            className={`text-white border-2`}
            style={{
              background: isAutoPlaying 
                ? `linear-gradient(45deg, #ef4444, #f97316)` 
                : `linear-gradient(45deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
              borderColor: theme.primaryColor + '60'
            }}
          >
            {isAutoPlaying ? '⏸️ Pause' : '▶️ Auto Read'}
          </Button>
          
          <Button
            onClick={goToNextChapter}
            disabled={isLastChapter}
            variant="ghost"
            size="sm"
            className={`border-white/30 text-white/80 hover:bg-white/10 disabled:opacity-30`}
          >
            Next →
          </Button>
        </div>

        {/* Additional Controls */}
        <div className="flex justify-center gap-2">
          {!showProgress && (
            <Button
              onClick={() => setShowProgress(true)}
              variant="ghost"
              size="sm"
              className="border-white/20 text-white/60 hover:bg-white/10 text-xs"
            >
              Show Progress
            </Button>
          )}
          
          <Button
            onClick={() => goToChapter(0)}
            variant="ghost"
            size="sm"
            className="border-white/20 text-white/60 hover:bg-white/10 text-xs"
          >
            🏠 Restart Story
          </Button>

          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="border-white/20 text-white/60 hover:bg-white/10 text-xs"
          >
            ✕ Close
          </Button>
        </div>

        {/* Beautiful Story Completion */}
        {isLastChapter && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <div 
              className="rounded-xl p-6 border relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${theme.primaryColor}20, ${theme.secondaryColor}20)`,
                borderColor: theme.primaryColor + '40'
              }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle, ${theme.primaryColor}10, transparent)`
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              />
              <div className="relative z-10">
                <div className="text-2xl mb-2">✨💕✨</div>
                <p className="font-medium text-lg mb-2" style={{ color: theme.secondaryColor }}>
                  And that's how our love story began...
                </p>
                <p className="text-white/70 text-sm">
                  "Sometimes the most beautiful stories start with the most ordinary days."
                </p>
                <motion.div
                  className="mt-4 text-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  💖
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}