'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/ui/ParticleBackground';
import Scene from '@/components/3d/Scene';
import StudyHome3D from '@/components/3d/StudyHome3D';

const MOTIVATIONAL_QUOTES = [
  "You're capable of amazing things! 💪",
  "Every step forward is progress! 🌟",
  "Believe in yourself - you've got this! ✨",
  "Small progress is still progress! 🎯",
  "You're doing great! Keep going! 🚀",
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
                currentRoom === 'terrace' ? [0, 5, 8] :
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
        // Traditional Study Tools View
        <div className="content-overlay flex items-center justify-center min-h-screen p-4">
          <div className="max-w-6xl w-full">
            {/* View Toggle */}
            <div className="mb-6 text-center">
              <Button
                onClick={() => { setShowStudyHome(true); setCurrentRoom('exterior'); }}
                variant="secondary"
                size="md"
                className="mb-4"
              >
                🏛️ Explore Beautiful Home
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Pomodoro Timer */}
              <GlassCard className="text-center">
                <h1 className="text-3xl font-bold text-white mb-4">📚 Study Zone</h1>
                
                <div className="mb-6">
                  <div className="text-6xl font-bold text-white mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-xl text-white/80 mb-4">
                    {sessionType === 'work' ? 'Focus Time' : 'Break Time'}
                  </div>
                  <div className="text-lg text-white/70">
                    Completed: {completedPomodoros} pomodoros
                  </div>
                </div>

                <div className="flex gap-3 justify-center mb-6">
                  <Button
                    onClick={() => setIsRunning(!isRunning)}
                    variant="primary"
                    size="lg"
                  >
                    {isRunning ? '⏸ Pause' : '▶ Start'}
                  </Button>
                  <Button onClick={resetTimer} variant="secondary" size="lg">
                    ↻ Reset
                  </Button>
                </div>

                <motion.div
                  key={currentQuote}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 glass rounded-lg"
                >
                  <p className="text-white/90 text-lg">{currentQuote}</p>
                </motion.div>
              </GlassCard>

              {/* Notes Panel */}
              <GlassCard>
                <h2 className="text-2xl font-bold text-white mb-4">📝 Notes</h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your thoughts, goals, or study notes here..."
                  className="w-full h-64 p-4 rounded-lg glass-strong text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-white/30"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                />
                <div className="mt-4 text-sm text-white/70">
                  {notes.length} characters
                </div>
              </GlassCard>

              {/* Study Tools */}
              <GlassCard>
                <h2 className="text-2xl font-bold text-white mb-4">🛠️ Study Tools</h2>
                <div className="space-y-4">
                  <div className="p-4 glass rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">📊 Study Stats</h3>
                    <div className="text-white/80">
                      <p>Session Type: {sessionType === 'work' ? 'Focus' : 'Break'}</p>
                      <p>Completed: {completedPomodoros} sessions</p>
                      <p>Total Notes: {notes.length} chars</p>
                      <p>Study Time Today: {(completedPomodoros * 25)} minutes</p>
                    </div>
                  </div>
                  
                  <div className="p-4 glass rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">🎯 Quick Actions</h3>
                    <div className="space-y-2">
                      <button 
                        className="w-full p-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors text-left"
                        onClick={() => setNotes(notes + '\n\n=== ' + new Date().toLocaleDateString() + ' ===\nStudy Session Goals:\n• \n• \n• \n\nKey Learnings:\n')}
                      >
                        📖 Start Study Template
                      </button>
                      <button 
                        className="w-full p-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors text-left"
                        onClick={() => setNotes(notes + '\n\n--- Break Reflection ---\nProgress made:\nNext steps:\n')}
                      >
                        ☕ Add Break Notes
                      </button>
                      <button 
                        className="w-full p-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors text-left"
                        onClick={() => setNotes('')}
                      >
                        🗑️ Clear Notes
                      </button>
                    </div>
                  </div>

                  <div className="p-4 glass rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">🎨 Study Modes</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                        onClick={() => { setTimeLeft(25 * 60); setSessionType('work'); }}
                      >
                        📚 Focus Mode<br/>
                        <span className="text-xs">25 min</span>
                      </button>
                      <button 
                        className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                        onClick={() => { setTimeLeft(15 * 60); setSessionType('work'); }}
                      >
                        📝 Quick Study<br/>
                        <span className="text-xs">15 min</span>
                      </button>
                      <button 
                        className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                        onClick={() => { setTimeLeft(50 * 60); setSessionType('work'); }}
                      >
                        📖 Deep Focus<br/>
                        <span className="text-xs">50 min</span>
                      </button>
                      <button 
                        className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                        onClick={() => { setTimeLeft(5 * 60); setSessionType('break'); }}
                      >
                        ☕ Break Time<br/>
                        <span className="text-xs">5 min</span>
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Study Progress */}
              <GlassCard>
                <h2 className="text-2xl font-bold text-white mb-4">📈 Progress</h2>
                <div className="space-y-4">
                  <div className="p-4 glass rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Today's Progress</h3>
                    <div className="w-full bg-white/10 rounded-full h-3 mb-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${Math.min((completedPomodoros / 8) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-white/80 text-sm">
                      {completedPomodoros} / 8 sessions completed ({Math.round((completedPomodoros / 8) * 100)}%)
                    </p>
                  </div>

                  <div className="p-4 glass rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">🏆 Achievements</h3>
                    <div className="space-y-2">
                      <div className={`flex items-center p-2 rounded ${completedPomodoros >= 1 ? 'bg-white/20' : 'bg-white/5'}`}>
                        <span className="mr-2">{completedPomodoros >= 1 ? '🏅' : '⭕'}</span>
                        <span className={completedPomodoros >= 1 ? 'text-white' : 'text-white/50'}>
                          First Session
                        </span>
                      </div>
                      <div className={`flex items-center p-2 rounded ${completedPomodoros >= 4 ? 'bg-white/20' : 'bg-white/5'}`}>
                        <span className="mr-2">{completedPomodoros >= 4 ? '🔥' : '⭕'}</span>
                        <span className={completedPomodoros >= 4 ? 'text-white' : 'text-white/50'}>
                          Study Streak
                        </span>
                      </div>
                      <div className={`flex items-center p-2 rounded ${completedPomodoros >= 8 ? 'bg-white/20' : 'bg-white/5'}`}>
                        <span className="mr-2">{completedPomodoros >= 8 ? '🌟' : '⭕'}</span>
                        <span className={completedPomodoros >= 8 ? 'text-white' : 'text-white/50'}>
                          Daily Goal
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 glass rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">💡 Study Tips</h3>
                    <div className="text-white/80 text-sm">
                      <p className="mb-2">• Take regular breaks to maintain focus</p>
                      <p className="mb-2">• Stay hydrated and keep healthy snacks nearby</p>
                      <p className="mb-2">• Use the 3D library for immersive study mood</p>
                      <p>• Review notes after each session</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="mt-6 text-center">
              <Button
                onClick={() => navigateTo('home')}
                variant="ghost"
                size="md"
              >
                ← Back Home
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
