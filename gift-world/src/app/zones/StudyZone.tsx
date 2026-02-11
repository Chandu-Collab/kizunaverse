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

export default function StudyZone() {
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
            <div className="content-overlay p-6">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h1 className="text-4xl font-bold text-white mb-2">🎯 Career Discovery Journey</h1>
                      <p className="text-white/70">Find your perfect path between Full Stack and Python AI</p>
                    </div>
                    <div className="flex gap-3">
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
                </motion.div>
                <CareerGuidanceSystem />
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
                </motion.div>)

                {/* Hero Career Guidance Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  {/* Main Career Guidance Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2"
                  >
                    <GlassCard className="p-8 h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-300/30">
                      <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-white mb-3">🎯 Career Path Discovery</h2>
                        <p className="text-lg text-white/80 leading-relaxed">
                          Confused between Full Stack Development and Python AI/Automation? 
                          Let's explore both paths with guided decision-making tools.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-6 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl border border-blue-300/30"
                        >
                          <div className="text-center">
                            <div className="text-4xl mb-3">🌐</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Full Stack Development</h3>
                            <p className="text-white/70 text-sm mb-4">Build complete web applications from frontend to backend</p>
                            <div className="space-y-1 text-xs text-white/60">
                              <div>• React, Next.js, Vue</div>
                              <div>• Node.js, Express, APIs</div>
                              <div>• Databases & DevOps</div>
                            </div>
                          </div>
                        </motion.div>
                        
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-6 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl border border-green-300/30"
                        >
                          <div className="text-center">
                            <div className="text-4xl mb-3">🤖</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Python AI & Automation</h3>
                            <p className="text-white/70 text-sm mb-4">Create intelligent systems and automated solutions</p>
                            <div className="space-y-1 text-xs text-white/60">
                              <div>• Machine Learning & AI</div>
                              <div>• Automation Scripts</div>
                              <div>• Agent Development</div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      <div className="text-center">
                        <Button
                          onClick={() => setShowCareerGuidance(true)}
                          variant="primary"
                          size="lg"
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-4"
                        >
                          🚀 Start Your Career Discovery Journey
                        </Button>
                        <p className="text-white/60 text-sm mt-3">
                          Interactive guidance system with market insights & project ideas
                        </p>
                      </div>
                    </GlassCard>
                  </motion.div>

                  {/* Compact Study Tools Sidebar */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <GlassCard className="p-6 h-full">
                      <h3 className="text-2xl font-bold text-white mb-4 text-center">⏱️ Focus Timer</h3>
                      
                      <div className="text-center mb-6">
                        <div className="text-4xl font-bold text-white mb-2">
                          {formatTime(timeLeft)}
                        </div>
                        <div className="text-sm text-white/80 mb-3">
                          {sessionType === 'work' ? '🔥 Focus Time' : '☕ Break Time'}
                        </div>
                        <div className="text-xs text-white/60">
                          Sessions completed: {completedPomodoros}
                        </div>
                      </div>

                      <div className="flex gap-2 justify-center mb-6">
                        <Button
                          onClick={() => setIsRunning(!isRunning)}
                          variant="primary"
                          size="sm"
                          className="px-4"
                        >
                          {isRunning ? '⏸' : '▶'}
                        </Button>
                        <Button onClick={resetTimer} variant="secondary" size="sm" className="px-4">
                          ↻
                        </Button>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${Math.min((completedPomodoros / 8) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-white/70 text-xs text-center mt-1">
                          {completedPomodoros}/8 daily goal
                        </p>
                      </div>

                      {/* Quick Study Modes */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-white mb-2">Quick Modes:</h4>
                        <button 
                          className="w-full p-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                          onClick={() => { setTimeLeft(25 * 60); setSessionType('work'); }}
                        >
                          📚 25min Focus
                        </button>
                        <button 
                          className="w-full p-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                          onClick={() => { setTimeLeft(5 * 60); setSessionType('break'); }}
                        >
                          ☕ 5min Break
                        </button>
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>)

                {/* Optional Expandable Study Tools */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <details className="group">
                    <summary className="cursor-pointer list-none">
                      <GlassCard className="p-4 text-center hover:bg-white/5 transition-colors">
                        <h3 className="text-lg font-semibold text-white group-open:hidden">📝 Additional Study Tools ▼</h3>
                        <h3 className="text-lg font-semibold text-white hidden group-open:block">📝 Additional Study Tools ▲</h3>
                        <p className="text-white/60 text-sm group-open:hidden">Click to expand notes, achievements, and more tools</p>
                      </GlassCard>
                    </summary>
                    
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {/* Compact Notes */}
                      <GlassCard>
                        <h4 className="text-xl font-bold text-white mb-3">📝 Quick Notes</h4>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Jot down your thoughts..."
                          className="w-full h-32 p-3 rounded-lg glass-strong text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                        />
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs text-white/60">{notes.length} characters</span>
                          <Button onClick={() => setNotes('')} variant="ghost" size="sm" className="text-xs">
                            Clear
                          </Button>
                        </div>
                      </GlassCard>

                      {/* Achievements */}
                      <GlassCard>
                        <h4 className="text-xl font-bold text-white mb-3">🏆 Today's Progress</h4>
                        <div className="space-y-3">
                          <div className={`flex items-center p-2 rounded ${completedPomodoros >= 1 ? 'bg-white/20' : 'bg-white/5'}`}>
                            <span className="mr-2 text-lg">{completedPomodoros >= 1 ? '🏅' : '⭕'}</span>
                            <span className="text-sm text-white">First Session</span>
                          </div>
                          <div className={`flex items-center p-2 rounded ${completedPomodoros >= 4 ? 'bg-white/20' : 'bg-white/5'}`}>
                            <span className="mr-2 text-lg">{completedPomodoros >= 4 ? '🔥' : '⭕'}</span>
                            <span className="text-sm text-white">Study Streak</span>
                          </div>
                          <div className={`flex items-center p-2 rounded ${completedPomodoros >= 8 ? 'bg-white/20' : 'bg-white/5'}`}>
                            <span className="mr-2 text-lg">{completedPomodoros >= 8 ? '🌟' : '⭕'}</span>
                            <span className="text-sm text-white">Daily Goal</span>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  </details>
                </motion.div>)

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
