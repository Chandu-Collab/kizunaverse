'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '@/components/ui/ParticleBackground';
import Scene from '@/components/3d/Scene';
import StudyHome3D from '@/components/3d/StudyHome3D';
import CareerGuidanceSystem from '@/components/ui/CareerGuidanceSystem';
import { homeTerraceStory } from '@/data/home-terrace-story';

const MOTIVATIONAL_QUOTES = [
  "🎯 Your career path is unique - trust the process of discovery",
  "💡 Every expert was once a beginner who refused to give up",
  "🚀 The best time to start is now - your future self will thank you",
  "⚡ Focus creates clarity, action creates momentum", 
  "🌟 Skills are built through practice, confidence through experience",
  "🔥 Choose growth over comfort - magic happens outside your comfort zone",
  "💼 Your journey matters more than the destination",
  "🧠 Learning is the only investment that always pays dividends",
  "✨ Consistent small steps lead to extraordinary results",
  "🌅 Every day is a new opportunity to become better"
];

// ...existing code...

export default function StudyZone() {
    // Listen for exitCareerJourney event to close the journey
    useEffect(() => {
      const handler = () => setShowCareerGuidance(false);
      if (typeof window !== 'undefined') {
        window.addEventListener('exitCareerJourney', handler);
      }
      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('exitCareerJourney', handler);
        }
      };
    }, []);
  const { navigateTo } = useNavigation();
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [notes, setNotes] = useState('');
  const [currentQuote, setCurrentQuote] = useState(MOTIVATIONAL_QUOTES[0]);
  const [showStudyHome, setShowStudyHome] = useState(false);
  const [showInterior, setShowInterior] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<'library' | 'bedroom' | 'kitchen' | 'washroom' | 'hall' | 'terrace' | 'exterior'>('exterior');
  const [viewMode, setViewMode] = useState<'exterior' | 'interior'>('exterior');
  const [showCareerGuidance, setShowCareerGuidance] = useState(false);
  
  // Story mode states
  const [isStoryMode, setIsStoryMode] = useState(false);
  const [isStoryFinished, setIsStoryFinished] = useState(false);
  const [storySceneIndex, setStorySceneIndex] = useState(0);
  const [storyLineIndex, setStoryLineIndex] = useState(0);
  const [storyUnlockAnswer, setStoryUnlockAnswer] = useState('');
  const [isStoryUnlocked, setIsStoryUnlocked] = useState(false);
  const [storyUnlockError, setStoryUnlockError] = useState('');

  const activeScene = homeTerraceStory.scenes[storySceneIndex];
  const activeLine = activeScene?.lines[storyLineIndex] ?? '';

  const handleStoryUnlock = () => {
    const normalizedAnswer = storyUnlockAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
    if (normalizedAnswer === '08 jan' || normalizedAnswer === '8 jan') {
      setIsStoryUnlocked(true);
      setStoryUnlockError('');
      return;
    }

    setStoryUnlockError('Incorrect answer. Story access is private.');
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (sessionType === 'work') {
        setCompletedPomodoros((prev) => prev + 1);
        setSessionType('break');
        setTimeLeft(5 * 60); // 5 minute break
      } else {
        setSessionType('work');
        setTimeLeft(25 * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, sessionType]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(
        MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(sessionType === 'work' ? 25 * 60 : 5 * 60);
  };

  // Story mode handlers
  const startStoryMode = () => {
    if (!isStoryUnlocked) {
      setStoryUnlockError('Answer the birthday question to unlock story.');
      return;
    }

    setShowStudyHome(true);
    setViewMode('exterior');
    setCurrentRoom('exterior');
    setStorySceneIndex(0);
    setStoryLineIndex(0);
    setIsStoryFinished(false);
    setIsStoryMode(true);
  };

  const skipStoryMode = () => {
    setIsStoryMode(false);
    setIsStoryFinished(true);
    setStorySceneIndex(0);
    setStoryLineIndex(0);
  };

  const goToPreviousStoryStep = () => {
    if (!activeScene) return;

    if (storyLineIndex > 0) {
      setStoryLineIndex((prev) => prev - 1);
      return;
    }

    if (storySceneIndex > 0) {
      const previousSceneIndex = storySceneIndex - 1;
      const previousScene = homeTerraceStory.scenes[previousSceneIndex];
      setStorySceneIndex(previousSceneIndex);
      setStoryLineIndex(previousScene.lines.length - 1);
    }
  };

  const goToNextStoryStep = () => {
    if (!activeScene) return;

    const isLastLineInScene = storyLineIndex === activeScene.lines.length - 1;
    const isLastScene = storySceneIndex === homeTerraceStory.scenes.length - 1;

    if (!isLastLineInScene) {
      setStoryLineIndex((prev) => prev + 1);
      return;
    }

    if (!isLastScene) {
      setStorySceneIndex((prev) => prev + 1);
      setStoryLineIndex(0);
      return;
    }

    setIsStoryFinished(true);
    setIsStoryMode(false);
  };

  // Sync story scenes with room changes
  useEffect(() => {
    if (!isStoryMode || !activeScene) return;

    if (activeScene.key === 'observation') {
      if (viewMode !== 'exterior') setViewMode('exterior');
      if (currentRoom !== 'exterior') setCurrentRoom('exterior');
    }

    if (activeScene.key === 'terrace') {
      if (viewMode !== 'exterior') setViewMode('exterior');
      if (currentRoom !== 'terrace') setCurrentRoom('terrace');
    }

    if (activeScene.key === 'idea') {
      if (viewMode !== 'exterior') setViewMode('exterior');
      if (currentRoom !== 'exterior') setCurrentRoom('exterior');
    }

    if (activeScene.key === 'home') {
      if (viewMode !== 'interior') setViewMode('interior');
      if (currentRoom !== 'hall') setCurrentRoom('hall');
    }

    if (activeScene.key === 'meaning') {
      if (viewMode !== 'interior') setViewMode('interior');
      // Cycle through rooms
      const rooms: ('library' | 'bedroom' | 'kitchen' | 'hall')[] = ['library', 'bedroom', 'kitchen', 'hall'];
      const roomIndex = Math.floor(storyLineIndex / activeScene.lines.length * rooms.length);
      if (currentRoom !== rooms[roomIndex]) setCurrentRoom(rooms[roomIndex]);
    }

    if (activeScene.key === 'terrace-final') {
      if (viewMode !== 'exterior') setViewMode('exterior');
      if (currentRoom !== 'terrace') setCurrentRoom('terrace');
    }
  }, [isStoryMode, activeScene, storyLineIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ParticleBackground />
      
      {showStudyHome ? (
        // 3D Study Home View
        <div className="relative w-full h-screen">
          <Scene 
            cameraPosition={
              viewMode === 'exterior' ? (
                currentRoom === 'exterior' ? [12, 8, 15] : 
                // Exterior mode: Close-up views of individual rooms
                currentRoom === 'hall' ? [0, 3, 6] :
                currentRoom === 'library' ? [0, 3, 6] :
                currentRoom === 'bedroom' ? [0, 3, 6] :
                currentRoom === 'kitchen' ? [0, 3, 6] :
                currentRoom === 'washroom' ? [0, 3, 6] :
                currentRoom === 'terrace' ? [0, 8, 14] :
                [0, 3, 6]
              ) : (
                // Interior mode: Overview position to see entire 2-floor layout with proper separation
                [-5, 10, 25] // Better angle to see both floors and all rooms
              )
            } 
            enableControls={true}
            enableShadows={true}
          >
            <StudyHome3D 
              showStudyRoom={showInterior} 
              currentRoom={currentRoom}
              viewMode={viewMode}
            />
          </Scene>
          
          {/* 3D View Controls */}
          <div className="absolute top-4 left-4 z-10">
            <GlassCard className="p-4 max-w-sm">
              <h2 className="text-xl font-bold text-white mb-3">� Beautiful Connected Home</h2>
              <div className="text-sm text-white/80 mb-3">
                {currentRoom === 'exterior' ? 'Explore the beautiful Victorian-style home exterior' :
                 currentRoom === 'hall' ? 'Central hallway connecting all rooms with elegant decor' :
                 currentRoom === 'library' ? 'Cozy library with extensive bookshelves and reading area' :
                 currentRoom === 'bedroom' ? 'Comfortable bedroom with modern furnishing' :
                 currentRoom === 'kitchen' ? 'Fully equipped modern kitchen with dining area' :
                 currentRoom === 'washroom' ? 'Clean and well-appointed bathroom' :
                 currentRoom === 'terrace' ? 'Beautiful outdoor terrace with city/mountain views' : 'Unknown room'}
              </div>
              
              {/* Home Layout Map */}
              <div className="mb-4">
                <div className="text-xs text-white/60 mb-2">Connected Home Layout:</div>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  {/* Top Row */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentRoom('library')}
                    className={`p-1 rounded transition-colors ${
                      currentRoom === 'library' 
                        ? 'bg-blue-500/50 text-white border border-blue-300' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    📚 LIB
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentRoom('hall')}
                    className={`p-1 rounded transition-colors ${
                      currentRoom === 'hall' 
                        ? 'bg-green-500/50 text-white border border-green-300' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    🛋️ HALL
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentRoom('bedroom')}
                    className={`p-1 rounded transition-colors ${
                      currentRoom === 'bedroom' 
                        ? 'bg-purple-500/50 text-white border border-purple-300' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    🛏️ BED
                  </motion.button>
                  
                  {/* Middle Row */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentRoom('kitchen')}
                    className={`p-1 rounded transition-colors ${
                      currentRoom === 'kitchen' 
                        ? 'bg-orange-500/50 text-white border border-orange-300' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    🍳 KITCH
                  </motion.button>
                  <div className="p-1 text-center text-white/40 text-xs">
                    ↕️ CONNECT
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentRoom('washroom')}
                    className={`p-1 rounded transition-colors ${
                      currentRoom === 'washroom' 
                        ? 'bg-cyan-500/50 text-white border border-cyan-300' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    🚿 WASH
                  </motion.button>
                  
                  {/* Bottom Row */}
                  <div></div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentRoom('terrace')}
                    className={`p-1 rounded transition-colors ${
                      currentRoom === 'terrace' 
                        ? 'bg-emerald-500/50 text-white border border-emerald-300' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    🌿 TERRACE
                  </motion.button>
                  <div></div>
                </div>
              </div>
              
              {/* Exterior/Interior Toggle */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setViewMode('exterior');
                    setCurrentRoom('exterior');
                  }}
                  className={`p-2 rounded text-xs transition-colors ${
                    viewMode === 'exterior' 
                      ? 'bg-white/30 text-white border border-white/50' 
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  🏠 Exterior View
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setViewMode('interior');
                    setCurrentRoom('hall');
                  }}
                  className={`p-2 rounded text-xs transition-colors ${
                    viewMode === 'interior' 
                      ? 'bg-white/30 text-white border border-white/50' 
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  🏛️ Interior View
                </motion.button>
              </div>
              
              <div className="space-y-2">
                <div className="rounded-lg border border-amber-300/40 bg-amber-100/10 p-3">
                  <p className="text-white text-xs mb-2">🔒 Private Story Access</p>
                  {!isStoryUnlocked ? (
                    <>
                      <label className="text-white/90 text-xs block mb-2">When is ur bday</label>
                      <input
                        value={storyUnlockAnswer}
                        onChange={(event) => {
                          setStoryUnlockAnswer(event.target.value);
                          if (storyUnlockError) setStoryUnlockError('');
                        }}
                        placeholder="Type answer"
                        className="w-full rounded-md bg-black/30 border border-white/30 text-white text-xs px-2 py-1.5 mb-2 focus:outline-none focus:ring-2 focus:ring-amber-300/60"
                      />
                      {storyUnlockError && (
                        <p className="text-red-200 text-[11px] mb-2">{storyUnlockError}</p>
                      )}
                      <Button size="sm" className="w-full text-xs" onClick={handleStoryUnlock}>
                        Unlock Story
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-emerald-200 text-[11px]">Access granted. Story is only for her.</p>
                      <Button
                        onClick={startStoryMode}
                        variant="primary"
                        size="sm"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-600"
                      >
                        ✨ Watch Story
                      </Button>
                    </div>
                  )}
                </div>
                <Button
                  onClick={() => setShowStudyHome(false)}
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  📋 Study Tools
                </Button>
              </div>
            </GlassCard>
          </div>

          {/* Quick Timer Display */}
          <div className="absolute top-4 right-4 z-10">
            <GlassCard className="p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-white/80">
                  {sessionType === 'work' ? 'Focus Time' : 'Break Time'}
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={() => setIsRunning(!isRunning)}
                    variant="primary"
                    size="sm"
                  >
                    {isRunning ? '⏸' : '▶'}
                  </Button>
                  <Button onClick={resetTimer} variant="secondary" size="sm">
                    ↻
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Room Info Panel */}
          <div className="absolute bottom-4 right-4 z-10">
            <GlassCard className="p-4 max-w-xs">
              <h3 className="text-lg font-semibold text-white mb-2">
                {currentRoom === 'exterior' ? '🏠 Home Exterior' :
                 currentRoom === 'library' ? '📚 Study Library' :
                 currentRoom === 'bedroom' ? '🛏️ Master Bedroom' :
                 currentRoom === 'kitchen' ? '🍳 Modern Kitchen' :
                 currentRoom === 'washroom' ? '🚿 Bathroom' :
                 currentRoom === 'hall' ? '🛋️ Living Room' :
                 currentRoom === 'terrace' ? '🌿 Garden Terrace' : 'Room'}
              </h3>
              <div className="text-sm text-white/80 mb-3">
                {currentRoom === 'exterior' && 'Beautiful Victorian architecture with garden landscaping'}
                {currentRoom === 'library' && 'Perfect study space with student reading at desk'}
                {currentRoom === 'bedroom' && 'Cozy bedroom with double bed and wardrobe'}
                {currentRoom === 'kitchen' && 'Fully equipped kitchen with dining area'}
                {currentRoom === 'washroom' && 'Modern bathroom with all amenities'}
                {currentRoom === 'hall' && 'Spacious living area with entertainment center'}
                {currentRoom === 'terrace' && 'Outdoor space with city view and plants'}
              </div>
              
              {/* Quick Room Access */}
              <div className="text-xs text-white/70">
                🏠 Use mouse to look around • Scroll to zoom
              </div>
            </GlassCard>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-4 left-4 z-10">
            <Button
              onClick={() => navigateTo('home')}
              variant="ghost"
              size="md"
            >
              ← Back Home
            </Button>
          </div>

          {/* ========== CINEMATIC STORY OVERLAY ========== */}
          <AnimatePresence>
            {isStoryMode && activeScene && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 z-50 pointer-events-none"
              >
                {/* Atmospheric Background Gradient */}
                <div className={`absolute inset-0 transition-all duration-1000 ${
                  activeScene.key === 'observation' ? 'bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/60' :
                  activeScene.key === 'terrace' ? 'bg-gradient-to-b from-emerald-900/50 via-transparent to-emerald-900/50' :
                  activeScene.key === 'idea' ? 'bg-gradient-to-b from-blue-900/50 via-transparent to-blue-900/50' :
                  activeScene.key === 'home' ? 'bg-gradient-to-b from-purple-900/50 via-transparent to-purple-900/50' :
                  activeScene.key === 'meaning' ? 'bg-gradient-to-b from-amber-900/50 via-transparent to-amber-900/50' :
                  activeScene.key === 'terrace-final' ? 'bg-gradient-to-b from-pink-900/50 via-transparent to-pink-900/50' :
                  'bg-gradient-to-b from-black/60 via-transparent to-black/60'
                }`} />

                {/* Story Title Badge - Top Center */}
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-auto"
                >
                  <div className="bg-gradient-to-r from-purple-900/90 via-pink-900/90 to-purple-900/90 backdrop-blur-md px-8 py-3 rounded-full border border-white/30 shadow-2xl">
                    <h2 className="text-lg md:text-xl font-semibold text-white text-center tracking-wide">
                      {homeTerraceStory.title} • {activeScene.title}
                    </h2>
                  </div>
                </motion.div>

                {/* Main Story Text - Center */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
                  <motion.div
                    key={`${storySceneIndex}-${storyLineIndex}`}
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="max-w-4xl"
                  >
                    <p className="text-2xl md:text-4xl lg:text-5xl font-light text-white text-center leading-relaxed drop-shadow-2xl px-6 py-4">
                      {activeLine}
                    </p>
                  </motion.div>
                </div>

                {/* Progress Indicators - Scene Progress Bar */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none"
                >
                  {homeTerraceStory.scenes.map((scene, idx) => (
                    <div
                      key={scene.id}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        idx < storySceneIndex
                          ? 'w-12 bg-green-400 shadow-lg shadow-green-400/50'
                          : idx === storySceneIndex
                          ? 'w-16 bg-white shadow-lg shadow-white/50 animate-pulse'
                          : 'w-8 bg-white/30'
                      }`}
                    />
                  ))}
                </motion.div>

                {/* Story Controls - Bottom Center */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto"
                >
                  <div className="bg-black/60 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/20 shadow-2xl">
                    {/* Scene/Line Counter */}
                    <div className="text-center mb-3">
                      <span className="text-sm text-white/80 font-medium">
                        Scene {storySceneIndex + 1} / {homeTerraceStory.scenes.length} • Line {storyLineIndex + 1} / {activeScene.lines.length}
                      </span>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 items-center justify-center">
                      <Button
                        onClick={goToPreviousStoryStep}
                        variant="secondary"
                        size="sm"
                        disabled={storySceneIndex === 0 && storyLineIndex === 0}
                        className="disabled:opacity-30"
                      >
                        ← Previous
                      </Button>

                      <Button
                        onClick={goToNextStoryStep}
                        variant="primary"
                        size="sm"
                      >
                        {storySceneIndex === homeTerraceStory.scenes.length - 1 && 
                         storyLineIndex === activeScene.lines.length - 1
                          ? 'Finish ✨'
                          : 'Next →'}
                      </Button>

                      <Button
                        onClick={skipStoryMode}
                        variant="ghost"
                        size="sm"
                        className="text-white/70 hover:text-white"
                      >
                        Skip Story
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Story Finished - Final Message */}
            {isStoryFinished && !isStoryMode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg pointer-events-auto"
              >
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="max-w-2xl mx-4 bg-gradient-to-br from-purple-900/90 via-pink-900/90 to-purple-900/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/30 shadow-2xl text-center"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    {homeTerraceStory.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 italic">
                    "{homeTerraceStory.finalLine}"
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={startStoryMode}
                      variant="secondary"
                      size="lg"
                      className="bg-white/20 hover:bg-white/30"
                    >
                      🔄 Replay Story
                    </Button>
                    <Button
                      onClick={() => {
                        setIsStoryFinished(false);
                        setViewMode('interior');
                        setCurrentRoom('hall');
                      }}
                      variant="primary"
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-purple-600"
                    >
                      ✨ Explore The Home
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        // Enhanced Study Zone with Career Focus
        <div className="relative min-h-screen">
          {/* Career Guidance System - Main Focus */}
          {showCareerGuidance ? (
            <div className="w-full min-h-[calc(100vh-120px)] flex flex-col items-center justify-center px-2 md:px-8 py-8">
              <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
                <CareerGuidanceSystem />
                <div className="flex gap-3 justify-center mt-8">
                  <Button
                    onClick={() => { setShowStudyHome(true); setCurrentRoom('exterior'); }}
                    variant="secondary"
                    size="md"
                  >
                    🏛️ 3D Home
                  </Button>
                  <Button
                    onClick={() => setShowCareerGuidance(false)}
                    variant="ghost"
                    size="md"
                  >
                    ← Study Tools
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Main Study Interface with Career Focus
            <div className="content-overlay p-6">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 text-center"
                >
                  <h1 className="text-5xl font-bold text-white mb-3">📚 Study Zone</h1>
                  <p className="text-xl text-white/70 mb-6">Your personal career guidance and study companion</p>
                  
                  <div className="flex justify-center gap-4 mb-8">
                    {!isStoryUnlocked ? (
                      <div className="w-full max-w-md bg-amber-100/10 border border-amber-300/40 rounded-xl p-4">
                        <p className="text-white text-sm mb-2">🔒 Private Story Access</p>
                        <label className="text-white/90 text-sm block mb-2">When is ur bday</label>
                        <input
                          value={storyUnlockAnswer}
                          onChange={(event) => {
                            setStoryUnlockAnswer(event.target.value);
                            if (storyUnlockError) setStoryUnlockError('');
                          }}
                          placeholder="Type answer"
                          className="w-full rounded-md bg-black/30 border border-white/30 text-white text-sm px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-amber-300/60"
                        />
                        {storyUnlockError && <p className="text-red-200 text-xs mb-2">{storyUnlockError}</p>}
                        <Button onClick={handleStoryUnlock} variant="primary" size="md" className="w-full">
                          Unlock Story
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={startStoryMode}
                        variant="primary"
                        size="lg"
                        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                      >
                        ✨ Watch Story: A Place That Feels Like Yours
                      </Button>
                    )}
                    <Button
                      onClick={() => { setShowStudyHome(true); setCurrentRoom('exterior'); setIsStoryMode(false); }}
                      variant="secondary"
                      size="lg"
                      className="bg-white/10 hover:bg-white/20"
                    >
                      🏛️ Explore 3D Study Home
                    </Button>
                  </div>
                </motion.div>

                {/* Hero Career Guidance Section removed to prevent duplication */}

                  {/* Only Career Path Discovery is shown, centered */}
                  <div className="w-full min-h-[calc(100vh-120px)] flex flex-col items-center justify-center px-2 md:px-8 py-8">
                    <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center">
                      <h2 className="text-5xl font-extrabold text-white mb-4 text-center drop-shadow-lg">🎯 Career Path Discovery</h2>
                      <p className="text-2xl text-white/90 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
                        Unsure about your next step? Let’s make your career journey exciting and meaningful! Explore real-world paths, discover your strengths, and get inspired by what’s possible.
                      </p>
                      <div className="w-full flex flex-col md:flex-row gap-10 items-stretch justify-center">
                        <div className="flex-1 flex flex-col items-center justify-between bg-blue-900/30 hover:bg-blue-800/40 transition rounded-3xl shadow-xl p-8 min-w-[260px] max-w-md mx-auto border border-blue-400/30">
                          <div className="text-6xl mb-4">🌐</div>
                          <h3 className="text-2xl font-bold text-white mb-3">Full Stack Development</h3>
                          <ul className="text-white/90 text-lg mb-6 list-disc list-inside text-left w-full pl-4">
                            <li>Build modern web & mobile apps</li>
                            <li>Master React, Next.js, Node.js</li>
                            <li>Work on real projects & portfolios</li>
                            <li>Collaborate in teams, learn DevOps</li>
                          </ul>
                          <span className="inline-block bg-blue-700/90 text-white text-xs px-4 py-2 rounded-full mb-2">In-demand Career</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-between bg-green-900/30 hover:bg-green-800/40 transition rounded-3xl shadow-xl p-8 min-w-[260px] max-w-md mx-auto border border-green-400/30">
                          <div className="text-6xl mb-4">🤖</div>
                          <h3 className="text-2xl font-bold text-white mb-3">Python AI & Automation</h3>
                          <ul className="text-white/90 text-lg mb-6 list-disc list-inside text-left w-full pl-4">
                            <li>Build smart AI & automation tools</li>
                            <li>Learn Python, ML, and data skills</li>
                            <li>Automate boring tasks, solve real problems</li>
                            <li>Innovate with agents & chatbots</li>
                          </ul>
                          <span className="inline-block bg-green-700/90 text-white text-xs px-4 py-2 rounded-full mb-2">Future-Proof Skills</span>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8 mt-8">
                        <Button
                          onClick={() => setShowCareerGuidance(true)}
                          variant="primary"
                          size="lg"
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-10 py-5 shadow-lg"
                        >
                          🚀 Start Your Career Discovery Journey
                        </Button>
                      </div>
                      <div className="mt-6 text-center w-full">
                        <div className="text-2xl text-white/80 italic animate-pulse mb-2">{currentQuote}</div>
                        <p className="text-white/70 text-lg mt-2">You are not alone—millions have found their path. Let’s find yours together!</p>
                      </div>
                    </div>
                  </div>
                {/* Removed Additional Study Tools section */}

                {/* Navigation */}
                <div className="text-center">
                  <Button
                    onClick={() => navigateTo('home')}
                    variant="ghost"
                    size="lg"
                  >
                    ← Back to Home
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
