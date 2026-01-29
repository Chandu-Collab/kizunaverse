'use client';

import { Suspense, useEffect, useState } from 'react';
import Heart3D from '@/components/3d/Heart3D';
import Moon3D from '@/components/3d/Moon3D';
import Gamepad3D from '@/components/3d/Gamepad3D';
import GiftBox3D from '@/components/3d/GiftBox3D';
import Book3D from '@/components/3d/Book3D';
import WindingRoad from '@/components/3d/WindingRoad';
import { getMainRoadCurve, getBranchRoadCurves, getRoadPointAndTangent } from '@/components/3d/roadUtils';
import GardenDecor from '@/components/3d/GardenDecor';
import { Bench, LampPost } from '@/components/3d/BenchLamp';
import PetDog3D from '@/components/3d/PetDog3D';
import ParkedCar3D from '@/components/3d/ParkedCar3D';
import Fountain3D from '@/components/3d/Fountain3D';
import Male3D from '@/components/3d/Male3D';
import Female3D from '@/components/3d/Female3D';
import { Bird, Butterfly } from '@/components/3d/BirdButterfly3D';
import FlockingBirds from '@/components/3d/FlockingBirds';
import PriyaCharacter from '@/components/3d/PriyaCharacter';
import UruruCharacter from '@/components/3d/UruruCharacter';
import GalaxiaAnimeGirl from '@/components/3d/GalaxiaAnimeGirl';
import AnimatedGLBModel from '@/components/3d/AnimatedGLBModel';
import { useCharacter } from '@/hooks/useCharacter';
import Scene from '@/components/3d/Scene';
import OotyScene from '@/components/3d/OotyScene';
import InteractiveObject from '@/components/3d/InteractiveObject';
import Particles from '@/components/3d/Particles';
import { useNavigation } from '@/hooks/useNavigation';
import { useTheme } from '@/hooks/useTheme';
import GlassCard from '@/components/ui/GlassCard';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { motion } from 'framer-motion';

export default function HomeWorld() {
  const { navigateTo } = useNavigation();
  const { isNight } = useTheme();
  const { selectedCharacter, setSelectedCharacter } = useCharacter();

  const [showWelcome, setShowWelcome] = useState(true);
  const [season, setSeason] = useState('spring');
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ThemeToggle />
      {/* Season Selector */}
      <div className="absolute top-4 right-4 z-30 bg-black/40 rounded-lg px-4 py-2 flex items-center gap-2 shadow">
        <label htmlFor="season-select" className="text-white text-sm">Season:</label>
        <select
          id="season-select"
          value={season}
          onChange={e => setSeason(e.target.value)}
          className="bg-white/80 text-black rounded px-2 py-1 text-sm focus:outline-none"
        >
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="autumn">Autumn</option>
          <option value="winter">Winter</option>
          <option value="festival">Festival</option>
        </select>
      </div>
      {/* Character Selection UI */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-6 bg-black/40 rounded-xl px-6 py-3 shadow-lg">
        <button
          className={`flex flex-col items-center focus:outline-none ${selectedCharacter === 'priya' ? 'ring-2 ring-pink-400' : ''}`}
          onClick={() => setSelectedCharacter('priya')}
        >
          <img src="/cute_girl_character.glb" alt="Priya" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          <span className="text-white mt-1">Priya</span>
        </button>
        <button
          className={`flex flex-col items-center focus:outline-none ${selectedCharacter === 'ururu' ? 'ring-2 ring-blue-400' : ''}`}
          onClick={() => setSelectedCharacter('ururu')}
        >
          <img src="/ururu.glb" alt="Ururu" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          <span className="text-white mt-1">Ururu</span>
        </button>
        <button
          className={`flex flex-col items-center focus:outline-none ${selectedCharacter === 'galaxia' ? 'ring-2 ring-purple-400' : ''}`}
          onClick={() => setSelectedCharacter('galaxia')}
        >
          <img src="/galaxia-anime-girl/preview.png" alt="Galaxia" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          <span className="text-white mt-1">Galaxia</span>
        </button>
      </div>
      <Scene cameraPosition={[0, 7, 14]} enableControls={true}>
        <Suspense fallback={null}>
          <OotyScene season={season} />
          {/* Realistic enhancements */}
          <WindingRoad />

          {/* Houses at ends of branch roads */}
          {/* Houses at ends of branch roads (match roadUtils) */}
          {(() => {
            const housePositions = [
              [-8, 0.01, 6],   // left front
              [8, 0.01, 6],    // right front
              [-8, 0.01, -6],  // left back
              [8, 0.01, -6],   // right back
            ];
            return <>
              {housePositions.map((pos, i) => (
                <group key={`house-${i}`} position={pos}>
                  {/* Simple house model */}
                  <mesh position={[0, 0.25, 0]}>
                    <boxGeometry args={[1, 0.5, 1]} />
                    <meshStandardMaterial color="#F5E6C8" />
                  </mesh>
                  <mesh position={[0, 0.55, 0]}>
                    <coneGeometry args={[0.7, 0.4, 4]} />
                    <meshStandardMaterial color="#B97A56" />
                  </mesh>
                  {/* Door */}
                  <mesh position={[0, 0.15, 0.51]}>
                    <boxGeometry args={[0.18, 0.22, 0.04]} />
                    <meshStandardMaterial color="#8B5C2A" />
                  </mesh>
                  {/* Windows */}
                  <mesh position={[-0.28, 0.32, 0.51]}>
                    <boxGeometry args={[0.12, 0.12, 0.03]} />
                    <meshStandardMaterial color="#FFF9E3" />
                  </mesh>
                  <mesh position={[0.28, 0.32, 0.51]}>
                    <boxGeometry args={[0.12, 0.12, 0.03]} />
                    <meshStandardMaterial color="#FFF9E3" />
                  </mesh>
                </group>
              ))}
              {/* Flocking birds above houses */}
              <FlockingBirds housePositions={housePositions} flockSize={7} />
            </>;
          })()}

          {/* GardenDecor at lake center and in front of lake */}
          <GardenDecor position={[0, 0, 12]} />
          <GardenDecor position={[0, 0, 8]} />

          {/* 3D Male and Female Models */}
          {/* Male model sitting on bench at [2,0,7], facing left */}
          <Male3D position={[2, 0.28, 7]} scale={0.62} rotationY={Math.PI / 2} />
          {/* Female model standing near left house, facing toward center */}
          <Female3D position={[-8.7, 0, 6]} scale={0.62} rotationY={Math.PI / 4} />
          {/* Male and Female models walking and roaming along the main road */}
          {(() => {
            // Animate two walkers along the main road curve
            const mainCurve = getMainRoadCurve();
            // t offsets for two walkers, spaced apart
            const walkerTs = [0.18, 0.32];
            // Use React state to force re-render for animation
            const [tick, setTick] = useState(0);
            const [greeting, setGreeting] = useState<string | null>(null);
            const [greetPos, setGreetPos] = useState<[number, number, number] | null>(null);
            useEffect(() => {
              let frame: number;
              const animate = () => {
                setTick(t => t + 1);
                frame = requestAnimationFrame(animate);
              };
              animate();
              return () => cancelAnimationFrame(frame);
            }, []);
            const now = performance.now() / 1000;
            // Slower speed of walking (t per second)
            const speed = 0.018;
            return [0, 1].map(i => {
              const baseT = walkerTs[i];
              const t = (baseT + (now * speed) + (i * 0.5)) % 1;
              const { point, tangent } = getRoadPointAndTangent(mainCurve, t);
              const rotationY = Math.atan2(tangent.x, tangent.z);
              const handleClick = () => {
                setGreeting(i === 0 ? 'Hi! I am your friendly guide.' : 'Hello! Let’s enjoy a walk together!');
                setGreetPos([point.x, point.y + 0.7, point.z]);
                setTimeout(() => setGreeting(null), 2000);
              };
              const Model = i === 0 ? Male3D : Female3D;
              return (
                <group key={i}>
                  <Model
                    position={[point.x, point.y + 0.01, point.z]}
                    scale={0.62}
                    rotationY={rotationY}
                    walking
                    onClick={handleClick}
                  />
                  {greeting && greetPos && greetPos[0] === point.x && (
                    <Html position={greetPos} center style={{ pointerEvents: 'none' }}>
                      <div style={{
                        background: 'rgba(255,255,255,0.95)',
                        color: '#b83280',
                        borderRadius: 12,
                        padding: '8px 16px',
                        fontWeight: 500,
                        fontSize: 16,
                        boxShadow: '0 2px 8px #0002',
                        maxWidth: 220,
                        textAlign: 'center',
                      }}>{greeting}</div>
                    </Html>
                  )}
                </group>
              );
            });
          })()}
          {/* Benches and Lamp Posts */}
          <Bench position={[-2, 0, 3]} />
          <Bench position={[2, 0, 7]} />
          <Bench position={[0, 0, 10]} />
          <LampPost position={[-3, 0, 5]} />
          <LampPost position={[3, 0, 9]} />
          <LampPost position={[0, 0, 12]} />

          {/* Multiple Pets (Dogs) */}
          <PetDog3D position={[2, 0, 5]} />
          <PetDog3D position={[-2, 0, 7]} scale={0.9} />
          <PetDog3D position={[0, 0, 9]} scale={1.1} />

          {/* Multiple Cars on the Main Road, aligned to road direction */}
          {(() => {
            const mainCurve = getMainRoadCurve();
            const carTs = [0.18, 0.5, 0.82]; // t values along the main road
            return carTs.map((t, i) => {
              const { point, tangent } = getRoadPointAndTangent(mainCurve, t);
              const rotationY = Math.atan2(tangent.x, tangent.z);
              return (
                <ParkedCar3D
                  key={`main-car-${i}`}
                  position={[point.x, point.y + 0.01, point.z]}
                  rotationY={rotationY}
                  scale={1 - 0.08 * i}
                />
              );
            });
          })()}

          {/* Cars on Branch Roads, facing outwards */}
          {(() => {
            const branchCurves = getBranchRoadCurves();
            return branchCurves.map((curve, i) => {
              const { point, tangent } = getRoadPointAndTangent(curve, 0.7);
              const rotationY = Math.atan2(tangent.x, tangent.z);
              return (
                <ParkedCar3D
                  key={`branch-car-${i}`}
                  position={[point.x, point.y + 0.01, point.z]}
                  rotationY={rotationY}
                  scale={0.92}
                />
              );
            });
          })()}

          {/* Fountain */}
          <Fountain3D position={[3, 0, -2]} />

          {/* Birds and Butterflies */}
          <Bird position={[0, 4, -4]} color="#FFD93D" />
          <Bird position={[2, 4.2, 2]} color="#A084E8" speed={0.8} phase={1} />
          <Bird position={[-3, 4.1, 7]} color="#6BCB77" speed={1.1} phase={2} />
          <Butterfly position={[-1, 2, 6]} color="#FFB6E1" />
          <Butterfly position={[1, 2.2, 8]} color="#FFD93D" speed={1.2} phase={2} />
          <Butterfly position={[0, 2.1, 4]} color="#A084E8" speed={0.9} phase={3} />
          {/* Glowing butterflies and fireflies at night */}
          {isNight && <>
            {/* Glowing Butterflies */}
            <Butterfly position={[-2.5, 2.5, 7]} color="#FFD700" speed={1.1} phase={1.5} />
            <Butterfly position={[2.5, 2.7, 9]} color="#B6FFFA" speed={1.3} phase={2.2} />
            {/* Fireflies as glowing particles */}
            {Array.from({ length: 18 }).map((_, i) => {
              const angle = Math.random() * Math.PI * 2;
              const radius = 4.5 + Math.random() * 7;
              const y = 1.2 + Math.random() * 2.2;
              return (
                <mesh key={i} position={[
                  Math.cos(angle) * radius,
                  y,
                  Math.sin(angle) * radius + 6 * Math.sin(angle * 0.7)
                ]}>
                  <sphereGeometry args={[0.045 + Math.random() * 0.025, 8, 8]} />
                  <meshStandardMaterial color="#B6FF00" emissive="#B6FF00" emissiveIntensity={0.85 + Math.random() * 0.4} transparent opacity={0.85} />
                </mesh>
              );
            })}
          </>}
          <Particles count={isNight ? 150 : 100} />
          {/* Render selected character */}
          {/* Character greeting state */}
          {(() => {
            const [greeting, setGreeting] = useState<string | null>(null);
            const [greetPos, setGreetPos] = useState<[number, number, number] | null>(null);
            const handlePriya = (pos: [number, number, number]) => {
              setGreeting('Hi! I am Priya, your guide!');
              setGreetPos([pos[0], pos[1] + 2.2, pos[2]]);
              setTimeout(() => setGreeting(null), 2000);
            };
            const handleUruru = (pos: [number, number, number]) => {
              setGreeting('Hello! I am Ururu, nice to meet you!');
              setGreetPos([pos[0], pos[1] + 2.2, pos[2]]);
              setTimeout(() => setGreeting(null), 2000);
            };
            // Galaxia is a static model, so just show a message at center
            const handleGalaxia = () => {
              setGreeting('Galaxia: Welcome to the universe!');
              setGreetPos([0, 2.5, 6]);
              setTimeout(() => setGreeting(null), 2000);
            };
            return <>
              {selectedCharacter === 'priya' && (
                <PriyaCharacter
                  initialPosition={[0, 1, 6]}
                  roamRadius={4}
                  onInteract={pos => handlePriya(pos || [0, 1, 6])}
                />
              )}
              {selectedCharacter === 'ururu' && (
                <UruruCharacter
                  initialPosition={[0, 1, 6]}
                  roamRadius={4}
                  onInteract={pos => handleUruru(pos || [0, 1, 6])}
                />
              )}
              {selectedCharacter === 'galaxia' && (
                <Suspense fallback={null}>
                  <group onClick={handleGalaxia}>
                    <AnimatedGLBModel />
                  </group>
                </Suspense>
              )}
              {greeting && greetPos && (
                <Html position={greetPos} center style={{ pointerEvents: 'none' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.95)',
                    color: '#b83280',
                    borderRadius: 12,
                    padding: '8px 16px',
                    fontWeight: 500,
                    fontSize: 16,
                    boxShadow: '0 2px 8px #0002',
                    maxWidth: 220,
                    textAlign: 'center',
                  }}>{greeting}</div>
                </Html>
              )}
            </>;
          })()}
          {/* Navigation Objects - evenly spaced */}
          <InteractiveObject
            position={[10, 4, 0]}
            label="Our Space"
            onClick={() => navigateTo('ourspace')}
            color="#FFB7C5"
            shape="heart"
          >
            <Heart3D scale={1.2} />
          </InteractiveObject>
          <InteractiveObject
            position={[-5, 4, 6]}
            label="Your Space"
            onClick={() => navigateTo('space')}
            color="#F0E68C"
            shape="octahedron"
          >
            <Moon3D scale={1.1} />
          </InteractiveObject>
          <InteractiveObject
            position={[0, 4, 10]}
            label="Fun Zone"
            onClick={() => navigateTo('fun')}
            color="#87CEEB"
            shape="star"
          >
            <Gamepad3D scale={1.1} />
          </InteractiveObject>
          <InteractiveObject
            position={[-10, 4, 0]}
            label="Birthday Zone"
            onClick={() => navigateTo('birthday')}
            color="#FFB6C1"
            shape="torus"
          >
            <GiftBox3D scale={1.1} />
          </InteractiveObject>
          <InteractiveObject
            position={[5, 4, 6]}
            label="Study Zone"
            onClick={() => navigateTo('study')}
            color="#DDA0DD"
            shape="cylinder"
          >
            <Book3D scale={1.1} />
          </InteractiveObject>
        </Suspense>
      </Scene>

      {/* Welcome Message Overlay (disappears after 2s) */}
      {showWelcome && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pointer-events-auto"
          >
            <GlassCard className="text-center max-w-md mx-auto">
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome to Your World!
              </h1>
              <p className="text-white/80 text-lg mb-2">
                {isNight ? 'Enjoy a peaceful night in the hills.' : 'Enjoy your peaceful hill station escape!'}
              </p>
              <p className="text-white/70 text-sm mb-3">
                You are a special guest here. Explore all the amazing zones—just click on the floating objects or say hi to your character as they roam around!
              </p>
              <p className="text-white/60 text-xs">
                Use the theme toggle to switch between day and night
              </p>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </div>
  );
}
