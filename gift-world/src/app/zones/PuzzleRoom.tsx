"use client";

import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { useState } from 'react';

const PUZZLE = {
  question: 'What has keys but can’t open locks?',
  answer: 'piano',
};

export default function PuzzleRoom() {
  const { navigateTo } = useNavigation();
  const [input, setInput] = useState('');
  const [solved, setSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const checkAnswer = () => {
    if (input.trim().toLowerCase() === PUZZLE.answer) {
      setSolved(true);
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-400">
      <GlassCard className="text-center max-w-lg mx-auto p-8">
        <h1 className="text-4xl font-bold text-yellow-900 mb-4">🧩 Puzzle Room</h1>
        <p className="text-yellow-800 text-lg mb-6">
          Solve the riddle to unlock a surprise!
        </p>
        <div className="mb-4">
          <span className="font-semibold">Riddle:</span> {PUZZLE.question}
        </div>
        {!solved ? (
          <>
            <input
              className="p-2 rounded border border-yellow-400 mb-2 text-yellow-900"
              placeholder="Your answer..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && checkAnswer()}
            />
            <div className="flex gap-2 justify-center mb-2">
              <Button onClick={checkAnswer} variant="primary" size="sm">Check</Button>
              <Button onClick={() => setShowHint(true)} variant="secondary" size="sm">Hint</Button>
            </div>
            {showHint && <div className="text-yellow-700 text-sm">It makes music 🎶</div>}
          </>
        ) : (
          <div className="text-green-700 font-bold mb-4">Correct! 🎉</div>
        )}
        <Button onClick={() => navigateTo('home')} variant="ghost" size="md">
          ← Back Home
        </Button>
      </GlassCard>
    </div>
  );
}
