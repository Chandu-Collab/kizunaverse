import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Vector3 } from 'three';
import Button from '@/components/ui/Button';

const positiveWords = [
  'Joy', 'Love', 'Hope', 'Peace', 'Kindness', 'Happiness', 'Gratitude', 'Courage', 'Strength', 'Inspiration'
];

function ParticleEffect({ position, color }: { position: Vector3; color: string }) {
  const [particles, setParticles] = useState(
    Array.from({ length: 12 }, () => ({
      id: Math.random(),
      pos: position.clone(),
      vel: new Vector3(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3
      )
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          pos: p.pos.add(p.vel),
          vel: p.vel.multiplyScalar(0.95)
        }))
      );
    }, 50);

    const timeout = setTimeout(() => setParticles([]), 800);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            top: `${p.pos.y}%`,
            left: `${p.pos.x}%`,
            backgroundColor: color,
            width: '5px',
            height: '5px',
            borderRadius: '50%'
          }}
        />
      ))}
    </>
  );
}

const StarCollectGame: React.FC<{ onGameEnd?: () => void }> = ({ onGameEnd }) => {
  const [stars, setStars] = useState<{ id: number; word: string; x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [particles, setParticles] = useState<{ id: number; position: Vector3; color: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const word = positiveWords[Math.floor(Math.random() * positiveWords.length)];
      const x = Math.random() * 90 + 5; // Random position between 5% and 95%
      const y = Math.random() * 70 + 10; // Random position between 10% and 80%
      console.log(`Adding star: id=${id}, word=${word}, x=${x}, y=${y}`);
      setStars((prev) => [...prev, { id, word, x, y }]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const collectStar = (id: number, x: number, y: number) => {
    console.log(`Collecting star: id=${id}, x=${x}, y=${y}`);
    setStars((prev) => prev.filter((star) => star.id !== id));
    setScore((prev) => prev + 1);
    setParticles((prev) => [
      ...prev,
      { id, position: new Vector3(x, y, 0), color: 'yellow' }
    ]);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 overflow-hidden">
      <div className="absolute top-4 left-4 text-white text-2xl font-bold">Score: {score}</div>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="absolute text-white text-lg font-bold cursor-pointer"
          style={{ top: `${star.y}%`, left: `${star.x}%` }}
          onClick={() => collectStar(star.id, star.x, star.y)}
        >
          ⭐ {star.word}
        </motion.div>
      ))}
      {particles.map((particle) => (
        <ParticleEffect
          key={particle.id}
          position={particle.position}
          color={particle.color}
        />
      ))}
      <Button
        onClick={onGameEnd}
        variant="ghost"
        size="lg"
        className="absolute bottom-4 right-4"
      >
        End Game
      </Button>
    </div>
  );
};

export default StarCollectGame;