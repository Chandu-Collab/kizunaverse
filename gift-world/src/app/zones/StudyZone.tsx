'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/ui/ParticleBackground';
import Scene from '@/components/3d/Scene';
import StudyHome3D from '@/components/3d/StudyHome3D';
import CareerGuidanceSystem from '@/components/ui/CareerGuidanceSystem';

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
                    <Button
                      onClick={() => { setShowStudyHome(true); setCurrentRoom('exterior'); }}
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
