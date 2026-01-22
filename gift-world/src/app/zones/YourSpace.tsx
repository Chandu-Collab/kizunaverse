'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { MoodType, JournalEntry } from '@/types';

const MOODS: { type: MoodType; emoji: string; label: string; color: string }[] = [
  { type: 'happy', emoji: '😊', label: 'Happy', color: '#FFD700' },
  { type: 'calm', emoji: '😌', label: 'Calm', color: '#87CEEB' },
  { type: 'excited', emoji: '🤩', label: 'Excited', color: '#FF69B4' },
  { type: 'thoughtful', emoji: '🤔', label: 'Thoughtful', color: '#9370DB' },
  { type: 'grateful', emoji: '🙏', label: 'Grateful', color: '#FFA500' },
  { type: 'loved', emoji: '💕', label: 'Loved', color: '#FF1493' },
];

export default function YourSpace() {
  const { navigateTo } = useNavigation();
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodType>('happy');
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Load from localStorage
    const savedEntries = localStorage.getItem('journalEntries');
    const savedMessages = localStorage.getItem('messages');
    
    if (savedEntries) {
      setJournalEntries(JSON.parse(savedEntries));
    }
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const saveJournalEntry = () => {
    if (!currentEntry.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content: currentEntry,
      mood: selectedMood,
    };

    const updatedEntries = [entry, ...journalEntries].slice(0, 10); // Keep last 10
    setJournalEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    setCurrentEntry('');
  };

  const addMessage = () => {
    if (!newMessage.trim()) return;
    const updatedMessages = [newMessage, ...messages].slice(0, 5); // Keep last 5
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    setNewMessage('');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ParticleBackground />
      
      <div className="content-overlay flex items-center justify-center min-h-screen p-4 overflow-y-auto">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 py-8">
          {/* Journal Section */}
          <GlassCard>
            <h1 className="text-3xl font-bold text-white mb-4">💌 Your Space</h1>
            
            <div className="mb-4">
              <label className="block text-white/90 mb-2">How are you feeling?</label>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((mood) => (
                  <motion.button
                    key={mood.type}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedMood(mood.type)}
                    className={`p-3 rounded-lg glass transition-all ${
                      selectedMood === mood.type
                        ? 'ring-2 ring-white scale-110'
                        : 'opacity-70'
                    }`}
                    style={{
                      background: selectedMood === mood.type ? mood.color : 'rgba(255,255,255,0.1)',
                    }}
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                    <div className="text-xs text-white mt-1">{mood.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-white/90 mb-2">Journal Entry</label>
              <textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder="Write your thoughts, dreams, or anything on your mind..."
                className="w-full h-40 p-4 rounded-lg glass-strong text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-white/30"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              />
            </div>

            <Button onClick={saveJournalEntry} variant="primary" size="md" className="w-full mb-4">
              Save Entry
            </Button>

            {/* Recent Entries */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-white mb-3">Recent Entries</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {journalEntries.length === 0 ? (
                  <p className="text-white/60 text-sm">No entries yet. Start writing!</p>
                ) : (
                  journalEntries.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 glass rounded-lg"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">
                          {MOODS.find((m) => m.type === entry.mood)?.emoji}
                        </span>
                        <span className="text-white/70 text-xs">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-white/90 text-sm">{entry.content}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </GlassCard>

          {/* Message Board */}
          <GlassCard>
            <h2 className="text-2xl font-bold text-white mb-4">💬 Message Board</h2>
            
            <div className="mb-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addMessage()}
                placeholder="Leave a message for yourself..."
                className="w-full p-3 rounded-lg glass-strong text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              />
            </div>

            <Button onClick={addMessage} variant="secondary" size="md" className="w-full mb-4">
              Add Message
            </Button>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-white/60 text-sm">No messages yet. Add one!</p>
              ) : (
                messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 glass rounded-lg"
                  >
                    <p className="text-white/90">{msg}</p>
                  </motion.div>
                ))
              )}
            </div>

            <Button
              onClick={() => navigateTo('home')}
              variant="ghost"
              size="md"
              className="w-full mt-6"
            >
              ← Back Home
            </Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
