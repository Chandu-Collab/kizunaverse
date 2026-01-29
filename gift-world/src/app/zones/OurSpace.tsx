"use client";

import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { useState } from 'react';

const MEMORIES = [
  { date: '2024-02-14', text: 'Our first Valentine’s Day together 💖' },
  { date: '2024-05-01', text: 'Graduation day, we cheered for each other 🎓' },
  { date: '2025-01-01', text: 'New Year’s Eve fireworks and promises 🎆' },
  // Add more memories here
];

export default function OurSpace() {
  const { navigateTo } = useNavigation();
  const [memories, setMemories] = useState(MEMORIES);
  const [newMemory, setNewMemory] = useState('');

  const addMemory = () => {
    if (!newMemory.trim()) return;
    setMemories([
      ...memories,
      { date: new Date().toISOString().slice(0, 10), text: newMemory },
    ]);
    setNewMemory('');
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-300">
      <GlassCard className="text-center max-w-lg mx-auto p-8">
        <h1 className="text-4xl font-bold text-pink-900 mb-4">💑 Our Space</h1>
        <p className="text-pink-800 text-lg mb-6">
          Sweet memories of us, together. Add your own below!
        </p>
        <div className="mb-4 max-h-60 overflow-y-auto space-y-2">
          {memories.map((m, i) => (
            <div key={i} className="bg-white/60 rounded p-2 text-pink-900 text-left">
              <span className="font-semibold mr-2">{m.date}:</span>{m.text}
            </div>
          ))}
        </div>
        <input
          className="p-2 rounded border border-pink-400 mb-2 text-pink-900 w-full"
          placeholder="Add a new memory..."
          value={newMemory}
          onChange={e => setNewMemory(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addMemory()}
        />
        <Button onClick={addMemory} variant="primary" size="sm" className="mb-4 w-full">Add Memory</Button>
        <Button onClick={() => navigateTo('home')} variant="ghost" size="md">
          ← Back Home
        </Button>
      </GlassCard>
    </div>
  );
}
