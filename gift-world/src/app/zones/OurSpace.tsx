"use client";

import { Suspense, useState } from 'react';
import Scene from '@/components/3d/Scene';
import BangaloreCityscape from '@/components/3d/BangaloreCityscape';
import SpecialBMSCollege from '@/components/3d/SpecialBMSCollege';
import MemoryWalkingPath from '@/components/3d/MemoryWalkingPath';
import EnhancedMemoryModal from '@/components/ui/EnhancedMemoryModal';
import { useNavigation } from '@/hooks/useNavigation';
import { useTheme } from '@/hooks/useTheme';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';
import WeatherControls from '@/components/ui/WeatherControls';
import { useWeatherSystem } from '@/components/3d/weather/WeatherSystem';
import { motion } from 'framer-motion';

export default function OurSpace() {
  const { navigateTo } = useNavigation();
  const { isNight } = useTheme();
  const [showInfo, setShowInfo] = useState(true);
  const [showCityInfo, setShowCityInfo] = useState(true);
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const [showStoryLockPrompt, setShowStoryLockPrompt] = useState(false);
  const [storyUnlockAnswer, setStoryUnlockAnswer] = useState('');
  const [isStoryUnlocked, setIsStoryUnlocked] = useState(false);
  const [storyUnlockError, setStoryUnlockError] = useState('');
  const { weather, autoWeather, changeWeather, enableAutoWeather } = useWeatherSystem();

  const requestStoryAccess = () => {
    if (isStoryUnlocked) {
      setShowMemoryModal(true);
      return;
    }

    setShowStoryLockPrompt(true);
  };

  const handleStoryUnlock = () => {
    const normalizedAnswer = storyUnlockAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
    if (normalizedAnswer === '10 days' || normalizedAnswer === '10 day') {
      setIsStoryUnlocked(true);
      setStoryUnlockError('');
      setShowStoryLockPrompt(false);
      setShowMemoryModal(true);
      return;
    }

    setStoryUnlockError('Incorrect answer. Story is private.');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ThemeToggle />
      
      {/* Welcome overlay */}
      {showInfo && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="pointer-events-auto"
          >
            <GlassCard className="text-center max-w-md mx-auto">
              <h1 className="text-4xl font-bold text-white mb-2">
                🏙️ Bengaluru Exploration
              </h1>
              <p className="text-white/80 text-lg mb-2">
                {isNight ? 'Discover special places under the stars!' : 'Welcome to our Bengaluru journey!'}
              </p>
              <p className="text-white/70 text-sm mb-4">
                Explore meaningful locations around the city. 
                Click on the glowing college to discover more! ✨
              </p>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowInfo(false)} 
                  variant="primary" 
                  size="sm"
                >
                  🎓 Explore Journey
                </Button>
                <Button 
                  onClick={requestStoryAccess} 
                  variant="ghost" 
                  size="sm"
                >
                  📖 Read Our Story
                </Button>
              </div>
              <div className="mt-3">
                <Button 
                  onClick={() => navigateTo('home')} 
                  variant="ghost" 
                  size="sm"
                >
                  ← Back Home
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}

      {/* City Information Panel */}
      {showCityInfo && (
        <div className="absolute top-20 left-4 z-20">
          <GlassCard className="p-4 max-w-xs">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-white">�️ City Guide</h3>
              <button 
                onClick={() => setShowCityInfo(false)}
                className="text-white/60 hover:text-white transition-colors"
                title="Hide city info"
              >
                ✕
              </button>
            </div>
            <ul className="text-sm text-white/80 space-y-1 mb-4">
              <li>🎓 BMS College - Important Meeting Place</li>
              <li>🚶‍♂️ The 2km Walking Path</li>
              <li>🏠 Friend's Home in Rajajinagar</li>
              <li>🏛️ Vidhana Soudha - Government HQ</li>
              <li>🏰 Bangalore Palace - Royal Heritage</li>
              <li>🛕 ISKCON Temple - Spiritual Center</li>
              <li>🏢 Electronic City - IT Hub</li>
              <li>💼 Koramangala IT Hub - Tech District</li>
              <li>🛍️ Brigade Road - Shopping Street</li>
              <li>🌺 Lalbagh Garden - Botanical Beauty</li>
              <li>🌳 Cubbon Park - Green Lung</li>
              <li>🚇 Namma Metro - Rail Network</li>
            </ul>
            <div className="border-t border-white/20 pt-2">
              <Button 
                onClick={requestStoryAccess} 
                variant="primary" 
                size="sm"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
              >
                📖 Read January 18th Story
              </Button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* 3D Bangalore Cityscape */}
      <Scene cameraPosition={[0, 25, 35]} enableControls={true}>
        <Suspense fallback={null}>
          {/* Enhanced lighting for city atmosphere */}
          <ambientLight intensity={isNight ? 0.2 : 0.6} color={isNight ? "#E6E6FA" : "#FFFFFF"} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={isNight ? 0.3 : 0.8} 
            color={isNight ? "#FFB347" : "#FFFFFF"}
            castShadow
          />
          
          {/* The main Bangalore cityscape */}
          <BangaloreCityscape />
          
          {/* Our special BMS College - positioned in front center */}
          <SpecialBMSCollege 
            position={[0, 0, 30]} 
            onClick={() => setShowMemoryModal(true)} 
          />
          
          {/* The memory walking path with proper road */}
          <MemoryWalkingPath 
            startPosition={[0, 0, 30]} 
            endPosition={[0, 0, -30]} 
          />
          
          {/* Additional atmospheric effects for night */}
          {isNight && (
            <>
              <pointLight position={[0, 15, 0]} intensity={0.3} color="#E6E6FA" distance={30} />
              <pointLight position={[-10, 5, -10]} intensity={0.2} color="#FF6B6B" distance={15} />
              <pointLight position={[10, 5, 10]} intensity={0.2} color="#4ECDC4" distance={15} />
            </>
          )}
          
          {/* Expanded ground plane for maximum space usage */}
          <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[120, 80]} />
            <meshStandardMaterial 
              color={isNight ? "#1A1A2E" : "#7D8471"} 
              roughness={0.8} 
            />
          </mesh>
        </Suspense>
      </Scene>

      {/* Quick navigation if info is hidden */}
      {(!showInfo || !showCityInfo) && (
        <div className="absolute bottom-4 left-4 z-20">
          <div className="flex flex-col gap-2">
            {!showInfo && (
              <Button 
                onClick={() => setShowInfo(true)} 
                variant="primary" 
                size="sm"
              >
                📍 Show Welcome Info
              </Button>
            )}
            {!showCityInfo && (
              <Button 
                onClick={() => setShowCityInfo(true)} 
                variant="primary" 
                size="sm"
              >
                �️ Show City Guide
              </Button>
            )}
            <Button 
              onClick={requestStoryAccess} 
              variant="primary" 
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-600"
            >
              📖 Our Love Story
            </Button>
            <Button 
              onClick={() => navigateTo('home')} 
              variant="ghost" 
              size="sm"
            >
              ← Back Home
            </Button>
          </div>
        </div>
      )}
      
      {/* Toggle info panel */}
      <div className="absolute bottom-4 right-4 z-20">
        <Button 
          onClick={() => setShowInfo(!showInfo)} 
          variant="primary" 
          size="sm"
        >
          {showInfo ? 'Hide Info' : 'Show Info'}
        </Button>
      </div>

      {/* Weather Controls */}
      <WeatherControls 
        currentWeather={weather}
        autoWeather={autoWeather}
        onWeatherChange={changeWeather}
        onToggleAuto={enableAutoWeather}
      />

      {/* Story Lock Prompt */}
      {showStoryLockPrompt && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 px-4">
          <GlassCard className="w-full max-w-md p-5">
            <h2 className="text-xl font-bold text-white mb-2">🔒 Private Story Access</h2>
            <p className="text-white/90 text-sm mb-3">How many days late i was from ur bday to meet u..!</p>
            <input
              value={storyUnlockAnswer}
              onChange={(event) => {
                setStoryUnlockAnswer(event.target.value);
                if (storyUnlockError) setStoryUnlockError('');
              }}
              placeholder="Type answer"
              className="w-full rounded-md bg-black/30 border border-white/30 text-white text-sm px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300/60"
            />
            {storyUnlockError && <p className="text-red-200 text-xs mb-3">{storyUnlockError}</p>}
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" className="w-full" onClick={() => setShowStoryLockPrompt(false)}>
                Cancel
              </Button>
              <Button size="sm" className="w-full" onClick={handleStoryUnlock}>
                Unlock Story
              </Button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Memory Modal - Our enhanced love story */}
      <EnhancedMemoryModal 
        isOpen={showMemoryModal} 
        onClose={() => setShowMemoryModal(false)} 
      />
    </div>
  );
}