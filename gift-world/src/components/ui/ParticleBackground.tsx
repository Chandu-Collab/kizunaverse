'use client';

import { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  weather?: string;
  isNight?: boolean;
}

export default function ParticleBackground({ weather = 'sunny', isNight = false }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
    }> = [];

    // Weather-based particle style
    let particleCount = 50;
    let color = isNight ? '180,200,255' : '255,255,255';
    let minRadius = 1, maxRadius = 4;
    let opacityBase = 0.2, opacityVar = 0.5;
    let vxRange = 0.5, vyRange = 0.5;

    if (weather === 'rainy' || weather === 'monsoon') {
      particleCount = 80;
      color = isNight ? '80,110,180' : '120,130,180'; // bluish raindrops
      minRadius = 0.5; maxRadius = 1.5;
      opacityBase = 0.3; opacityVar = 0.4;
      vxRange = 0.1; vyRange = 1.5;
    } else if (weather === 'cloudy') {
      particleCount = 40;
      color = isNight ? '120,120,160' : '200,200,200'; // grayish
      minRadius = 2; maxRadius = 5;
      opacityBase = 0.15; opacityVar = 0.3;
      vxRange = 0.2; vyRange = 0.2;
    } else if (weather === 'winter') {
      particleCount = 60;
      color = isNight ? '180,200,255' : '220,240,255'; // snow
      minRadius = 1.5; maxRadius = 3.5;
      opacityBase = 0.3; opacityVar = 0.5;
      vxRange = 0.2; vyRange = 0.7;
    } // sunny: default

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * (maxRadius - minRadius) + minRadius,
        vx: (Math.random() - 0.5) * vxRange,
        vy: (Math.random() - 0.5) * vyRange,
        opacity: Math.random() * opacityVar + opacityBase,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [weather]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-30"
      style={{ zIndex: 0 }}
    />
  );
}
