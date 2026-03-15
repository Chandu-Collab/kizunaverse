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
import LakeDecoration from '@/components/3d/LakeDecoration';
import PathwayLighting from '@/components/3d/PathwayLighting';
import { Bench, LampPost } from '@/components/3d/BenchLamp';
import PetDog3D from '@/components/3d/PetDog3D';
import ParkedCar3D from '@/components/3d/ParkedCar3D';
import Fountain3D from '@/components/3d/Fountain3D';
import Male3D from '@/components/3d/Male3D';
import Female3D from '@/components/3d/Female3D';
import { Bird, Butterfly } from '@/components/3d/BirdButterfly3D';
import FlockingBirds from '@/components/3d/FlockingBirds';
import BunnyCharacter from '@/components/3d/BunnyCharacter';
import RakshithaCharacter from '@/components/3d/RakshithaCharacter';
import KizunaAnimeGirl from '@/components/3d/KizunaAnimeGirl';
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
import { Html } from '@react-three/drei';

// Ensure the updated CharacterType is imported
import { CharacterType } from '@/hooks/useCharacter';

export default function HomeWorld() {
  const { navigateTo } = useNavigation();
  const { isNight, toggleTheme } = useTheme();
  const { selectedCharacter, setSelectedCharacter } = useCharacter();

  const [showWelcome, setShowWelcome] = useState(true);
  const [season, setSeason] = useState('spring');
  const [isAutoCycle, setIsAutoCycle] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isAutoCycle) {
      return undefined;
    }

    const interval = setInterval(() => {
      toggleTheme();
    }, 30000);

    return () => clearInterval(interval);
  }, [isAutoCycle, toggleTheme]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ThemeToggle />
      {/* Season Selector */}
      <div className="absolute top-4 right-4 z-30 bg-black/40 rounded-lg px-4 py-3 flex flex-col gap-3 shadow">
        <div className="flex items-center gap-2">
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
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">Auto cycle:</span>
          <button
            onClick={() => setIsAutoCycle(prev => !prev)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              isAutoCycle
                ? 'bg-emerald-500/30 text-emerald-100 border-emerald-300/40'
                : 'bg-white/10 text-white/70 border-white/20'
            }`}
          >
            {isAutoCycle ? 'On (30s)' : 'Off'}
          </button>
          <button
            onClick={toggleTheme}
            className="text-xs px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
          >
            {isNight ? 'Switch Day' : 'Switch Night'}
          </button>
        </div>
      </div>
      {/* Character Selection UI */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-6 bg-black/40 rounded-xl px-6 py-3 shadow-lg">
        <button
          className={`flex flex-col items-center focus:outline-none ${selectedCharacter === 'bunny' ? 'ring-2 ring-pink-400' : ''}`}
          onClick={() => setSelectedCharacter('bunny')}
        >
          <img src="/Bunny.glb" alt="Bunny" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          <span className="text-white mt-1">Bunny</span>
        </button>
        <button
          className={`flex flex-col items-center focus:outline-none ${selectedCharacter === 'rakshitha' ? 'ring-2 ring-blue-400' : ''}`}
          onClick={() => setSelectedCharacter('rakshitha')}
        >
          <img src="/Rakshitha.glb" alt="Rakshitha" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          <span className="text-white mt-1">Rakshitha</span>
        </button>
        <button
          className={`flex flex-col items-center focus:outline-none ${selectedCharacter === 'kizuna' ? 'ring-2 ring-purple-400' : ''}`}
          onClick={() => setSelectedCharacter('kizuna')}
        >
          <img src="/Kizuna.glb" alt="Kizuna" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          <span className="text-white mt-1">Kizuna</span>
        </button>
      </div>
      <Scene cameraPosition={[0, 7, 14]} enableControls={true}>
        <Suspense fallback={null}>
          <OotyScene season={season} />
          {/* Add lighting for better visibility in night mode */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[0, 5, 0]} intensity={0.8} />
          <WindingRoad />

          {/* Houses at ends of branch roads */}
          {/* Enhanced Houses with 8 realistic homes */}
          {(() => {
            const housePositions: [number, number, number][] = [
              [-10, 0.01, 8],   // left front
              [10, 0.01, 8],    // right front
              [-10, 0.01, -8],  // left back
              [10, 0.01, -8],   // right back
              [-6, 0.01, 12],   // left far
              [6, 0.01, 12],    // right far
              [-6, 0.01, -12],  // left far back
              [6, 0.01, -12],   // right far back
            ];
            return <>
              {housePositions.map((pos, i) => {
                const houseColors = ['#F5E6C8', '#E8D5B7', '#F0E4D0', '#E6D3A3', '#F2E8D5', '#E9DCC9', '#F7EFDC', '#EDE0D3'];
                const roofColors = ['#B97A56', '#A67C5A', '#C18B63', '#B5835E', '#AD7952', '#C19666', '#B88A5F', '#A87A57'];
                const houseHeight = 0.8 + (i % 3) * 0.15; // Varied heights
                const houseWidth = 1.2 + (i % 2) * 0.3; // Varied widths
                
                return (
                  <group key={`house-${i}`} position={pos}>
                    {/* Main house structure */}
                    <mesh position={[0, houseHeight / 2, 0]}>
                      <boxGeometry args={[houseWidth, houseHeight, 1.2]} />
                      <meshStandardMaterial color={houseColors[i]} roughness={0.7} />
                    </mesh>
                    
                    {/* Roof with varied styles */}
                    {i % 2 === 0 ? (
                      <mesh position={[0, houseHeight + 0.2, 0]}>
                        <coneGeometry args={[houseWidth * 0.8, 0.5, 4]} />
                        <meshStandardMaterial color={roofColors[i]} roughness={0.8} />
                      </mesh>
                    ) : (
                      <mesh position={[0, houseHeight + 0.15, 0]}>
                        <boxGeometry args={[houseWidth + 0.1, 0.3, 1.3]} />
                        <meshStandardMaterial color={roofColors[i]} roughness={0.8} />
                      </mesh>
                    )}
                    
                    {/* Front door */}
                    <mesh position={[0, houseHeight * 0.3, (1.2 / 2) + 0.01]}>
                      <boxGeometry args={[0.25, houseHeight * 0.6, 0.05]} />
                      <meshStandardMaterial color="#8B5C2A" roughness={0.9} />
                    </mesh>
                    
                    {/* Door handle */}
                    <mesh position={[0.08, houseHeight * 0.3, (1.2 / 2) + 0.04]}>
                      <sphereGeometry args={[0.015, 8, 8]} />
                      <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
                    </mesh>
                    
                    {/* Windows with night lighting for ALL houses */}
                    {[-houseWidth * 0.25, houseWidth * 0.25].map((xOffset, winIdx) => (
                      <mesh key={winIdx} position={[xOffset, houseHeight * 0.6, (1.2 / 2) + 0.01]}>
                        <boxGeometry args={[0.2, 0.2, 0.04]} />
                        <meshStandardMaterial 
                          color={isNight && (i + winIdx) % 3 !== 2 ? '#FFE4B5' : '#B0E0E6'}
                          emissive={isNight && (i + winIdx) % 3 !== 2 ? '#FFA500' : '#000000'}
                          emissiveIntensity={isNight ? 0.3 : 0}
                          transparent
                          opacity={0.8} />
                      </mesh>
                    ))}
                    
                    {/* Chimney for some houses */}
                    {i % 3 === 0 && (
                      <mesh position={[houseWidth * 0.25, houseHeight + 0.5, -0.2]}>
                        <cylinderGeometry args={[0.08, 0.1, 0.6, 8]} />
                        <meshStandardMaterial color="#8B4513" roughness={0.8} />
                      </mesh>
                    )}
                    
                    {/* Small garden area */}
                    <mesh position={[0, 0.01, 1.8]}>
                      <boxGeometry args={[houseWidth + 0.5, 0.02, 0.8]} />
                      <meshStandardMaterial color="#90EE90" roughness={0.9} />
                    </mesh>
                    
                    {/* Enhanced porch light system for ALL houses */}
                    {isNight && (
                      <>
                        {/* Main porch light */}
                        <pointLight 
                          position={[0, houseHeight * 0.8, 0.8]} 
                          intensity={0.4} 
                          color="#FFE4B5" 
                          distance={3} 
                          decay={2}
                        />
                        <mesh position={[0, houseHeight * 0.8, 0.7]}>
                          <sphereGeometry args={[0.05, 8, 8]} />
                          <meshStandardMaterial 
                            color="#FFE4B5" 
                            emissive="#FFE4B5" 
                            emissiveIntensity={0.6}
                          />
                        </mesh>
                        
                        {/* Additional house number indicator light */}
                        <mesh position={[0.4, houseHeight * 0.5, 0.65]}>
                          <boxGeometry args={[0.1, 0.1, 0.02]} />
                          <meshStandardMaterial 
                            color="#87CEEB"
                            emissive="#4169E1"
                            emissiveIntensity={0.3}
                          />
                        </mesh>
                      </>
                    )}
                    
                    {/* Street light at house entrance - positioned consistently for each house */}
                    <LampPost position={[
                      pos[0] > 0 ? pos[0] - 2 : pos[0] + 2, 
                      0, 
                      pos[2] > 0 ? pos[2] - 1.5 : pos[2] + 1.5
                    ]} />
                  </group>
                );
              })}
              
              {/* Enhanced road markers for clear house connections */}
              {housePositions.map((pos, i) => {
                const connectionPoints: [number, number, number][] = [
                  [-1.5, 0.01, 6], [1.5, 0.01, 6], [-1.5, 0.01, -6], [1.5, 0.01, -6],
                  [-1, 0.01, 10], [1, 0.01, 10], [-1, 0.01, -10], [1, 0.01, -10]
                ];
                
                return (
                  <group key={`roadmarker-${i}`}>
                    {/* Road connection marker */}
                    <mesh position={connectionPoints[i]}>
                      <cylinderGeometry args={[0.1, 0.1, 0.05, 8]} />
                      <meshStandardMaterial color="#FFD700" emissive={isNight ? "#FFD700" : "#000000"} emissiveIntensity={isNight ? 0.2 : 0} />
                    </mesh>
                  </group>
                );
              })}
              
              {/* Flocking birds above houses */}
              <FlockingBirds housePositions={housePositions as [number, number, number][]} flockSize={7} />
            </>;
          })()}

          {/* GardenDecor repositioned to avoid house overlap */}
          <GardenDecor position={[0, 0, 15]} />
          <GardenDecor position={[0, 0, 4]} />
          
          {/* Enhanced Lake Decoration with atmospheric lighting */}
          <LakeDecoration />
          
          {/* Pathway and ground lighting for better night ambiance */}
          <PathwayLighting />

          {/* 3D Male and Female Models */}
          {/* Male model sitting on bench at [2,0,7], facing left */}
          <Male3D position={[2, 0.28, 7]} scale={0.62} rotationY={Math.PI / 2} />
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
          {/* Enhanced road junction lighting */}\n          <LampPost position={[-2, 0, 8]} />\n          <LampPost position={[2, 0, 8]} />\n          <LampPost position={[-2, 0, -8]} />\n          <LampPost position={[2, 0, -8]} />\n          <LampPost position={[-1, 0, 12]} />\n          <LampPost position={[1, 0, 12]} />\n          <LampPost position={[-1, 0, -12]} />\n          <LampPost position={[1, 0, -12]} />\n          \n          {/* Benches and Lamp Posts repositioned for clean layout */}
          <Bench position={[-1, 0, 2]} />
          <Bench position={[1, 0, 4]} />
          <Bench position={[0, 0, 15]} />
          <LampPost position={[-4, 0, 3]} />
          <LampPost position={[4, 0, 5]} />
          <LampPost position={[0, 0, 16]} />

          {/* Multiple Pets with movement animations - repositioned to avoid house overlap */}
          <PetDog3D position={[1.5, 0, 3]} walkRadius={1.2} walkSpeed={0.25} />
          <PetDog3D position={[-1.5, 0, 5]} scale={0.9} walkRadius={1.5} walkSpeed={0.35} />
          <PetDog3D position={[0, 0, 1]} scale={1.1} walkRadius={1.0} walkSpeed={0.4} />
          
          {/* Additional pets near houses for more liveliness */}
          <PetDog3D position={[-7, 0, 10]} scale={0.8} walkRadius={0.8} walkSpeed={0.3} />
          <PetDog3D position={[7, 0, -10]} scale={1.2} walkRadius={1.3} walkSpeed={0.2} />

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
            const handleBunny = (pos: [number, number, number]) => {
              setGreeting('Hi! I am Bunny, your guide!');
              setGreetPos([pos[0], pos[1] + 2.2, pos[2]]);
              setTimeout(() => setGreeting(null), 2000);
            };
            const handleRakshitha = (pos: [number, number, number]) => {
              setGreeting('Hello! I am Rakshitha, nice to meet you!');
              setGreetPos([pos[0], pos[1] + 2.2, pos[2]]);
              setTimeout(() => setGreeting(null), 2000);
            };
            // Kizuna is a static model, so just show a message at center
            const handleKizuna = (pos: [number, number, number]) => {
              setGreeting('Kizuna: Welcome to the universe!');
              setGreetPos([pos[0], pos[1] + 2.5, pos[2]]);
              setTimeout(() => setGreeting(null), 2000);
            };
            return <>
              {selectedCharacter === 'bunny' && (
                <BunnyCharacter
                  initialPosition={[0, 1, 6]}
                  roamRadius={4}
                  onInteract={(pos) => handleBunny(pos || [0, 1, 6])}
                />
              )}
              {selectedCharacter === 'rakshitha' && (
                <RakshithaCharacter
                  initialPosition={[0, 1, 6]}
                  roamRadius={4}
                  onInteract={(pos) => handleRakshitha(pos || [0, 1, 6])}
                />
              )}
              {selectedCharacter === 'kizuna' && (
                <KizunaAnimeGirl
                  initialPosition={[0, 1, 6]}
                  roamRadius={4}
                  onInteract={(pos) => handleKizuna(pos || [0, 1, 6])}
                />
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