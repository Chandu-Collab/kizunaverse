'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/ui/ParticleBackground';

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
      
      <div className="content-overlay flex items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <Button
              onClick={() => navigateTo('home')}
              variant="ghost"
              size="md"
              className="mt-4"
            >
              ← Back Home
            </Button>
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
        </div>
      </div>
    </div>
  );
}
