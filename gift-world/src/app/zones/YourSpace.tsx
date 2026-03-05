import { useState, useEffect, Suspense } from 'react';
import Button from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { motion } from 'framer-motion';
import Scene from '@/components/3d/Scene';
import GoaBeachScene from '@/components/3d/GoaBeachScene';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useWeatherSystem } from '@/components/3d/weather/WeatherSystem';
import { useCharacter } from '@/hooks/useCharacter';
import { useTheme } from '@/hooks/useTheme';

export default function YourSpace() {
  const { navigateTo } = useNavigation();
  const { selectedCharacter, setSelectedCharacter } = useCharacter();
  const { isNight } = useTheme();
  const { weather, changeWeather } = useWeatherSystem();
  const [season, setSeason] = useState('summer'); // Beach default to summer
  const [isAutoEnvironmentEnabled, setIsAutoEnvironmentEnabled] = useState(true);
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(true);
  
  // Automatic Season and Weather Cycling (Every 30 seconds)
  useEffect(() => {
    if (!isAutoEnvironmentEnabled) return;
    
    const seasons = ['spring', 'summer', 'autumn', 'winter'];
    const weathers = ['sunny', 'cloudy', 'rainy', 'monsoon', 'winter'];
    
    const seasonTimer = setInterval(() => {
      const currentSeasonIndex = seasons.indexOf(season);
      const nextSeasonIndex = (currentSeasonIndex + 1) % seasons.length;
      setSeason(seasons[nextSeasonIndex]);
    }, 30000); // 30 seconds
    
    const weatherTimer = setInterval(() => {
      const currentWeatherIndex = weathers.indexOf(weather);
      const nextWeatherIndex = (currentWeatherIndex + 1) % weathers.length;
      changeWeather(weathers[nextWeatherIndex] as any);
    }, 30000); // 30 seconds
    
    return () => {
      clearInterval(seasonTimer);
      clearInterval(weatherTimer);
    };
  }, [season, weather, isAutoEnvironmentEnabled, changeWeather]);

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-all duration-1000 ${
      isNight 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50'
    }`}>
      <ThemeToggle />
      
      {/* Enhanced Day/Night Atmospheric Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isNight
            ? 'radial-gradient(circle at center, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)'
            : 'radial-gradient(circle at center, rgba(147, 197, 253, 0.3) 0%, rgba(219, 234, 254, 0.6) 100%)',
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative h-full">
        <Suspense fallback={
          <div className="h-full flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading beautiful Goa...</p>
            </div>
          </div>
        }>
          <div className="h-full">
            <Scene cameraPosition={[0, 5, 10]}>
              <GoaBeachScene 
                season={season} 
                weather={weather} 
                character={selectedCharacter}
              />
            </Scene>
          </div>
        </Suspense>
        
        {/* Enhanced Beach Overlay with Character & Environment Controls */}
        {showWelcomeOverlay && (
          <div className="absolute top-20 left-4 max-w-md">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-lg p-4 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowWelcomeOverlay(false)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1.5 text-sm font-bold transition-all duration-200 hover:scale-110 shadow-md z-50"
                title="Close welcome overlay"
              >
                ✕ Close
              </button>
              
              <h1 className="text-2xl font-bold text-white mb-2">
                🏖️ Welcome to Goa {isNight ? '🌙' : '☀️'}
              </h1>
              <p className="text-white/90 text-sm mb-4">
                Experience the {isNight ? 'moonlit beaches' : 'sun-kissed shores'} of Goa - a dream destination filled with palm trees, 
                gentle waves, and peaceful vibes. This special place represents achievements and 
                beautiful memories {isNight ? 'under the stars' : 'in golden sunlight'}.
              </p>
              
              {/* Character Selection */}
              <div className="mb-4">
                <label className="text-white/80 text-sm mb-2 block">Choose Your Avatar:</label>
                <div className="flex gap-3">
                  {[{id: 'priya', name: 'Priya', emoji: '👩'}, {id: 'ururu', name: 'Ururu', emoji: '👨'}, {id: 'galaxia', name: 'Galaxia', emoji: '👸'}].map((char) => (
                    <motion.button
                      key={char.id}
                      onClick={() => setSelectedCharacter(char.id as any)}
                      className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                        selectedCharacter === char.id 
                          ? 'bg-white/30 shadow-lg scale-105 border-2 border-white/50'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-2xl">{char.emoji}</span>
                      <span className="text-white text-xs mt-1">{char.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Auto Environment Toggle */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Auto Environment:</span>
                  <motion.button
                    onClick={() => setIsAutoEnvironmentEnabled(!isAutoEnvironmentEnabled)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                      isAutoEnvironmentEnabled 
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                        : 'bg-gray-500 text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isAutoEnvironmentEnabled ? '✓ ON (30s)' : '✗ OFF'}
                  </motion.button>
                </div>
                <p className="text-white/60 text-xs mt-1">
                  {isAutoEnvironmentEnabled ? 'Season & weather change every 30 seconds' : 'Manual control enabled'}
                </p>
              </div>
              
              {/* Environment Status Display */}
              <motion.div
                className={`backdrop-blur-sm rounded-lg p-3 mb-4 transition-all duration-700 ${
                  isNight 
                    ? 'bg-slate-800/40 border border-purple-400/40'
                    : 'bg-white/20 border border-white/30'
                }`}
                animate={{
                  boxShadow: isNight 
                    ? ['0 0 10px rgba(147, 51, 234, 0.4)', '0 0 25px rgba(147, 51, 234, 0.6)', '0 0 10px rgba(147, 51, 234, 0.4)']
                    : ['0 0 10px rgba(255,255,255,0.3)', '0 0 20px rgba(255,255,255,0.5)', '0 0 10px rgba(255,255,255,0.3)'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="grid grid-cols-2 gap-3 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌡️</span>
                    <div>
                      <div className="font-semibold">Season {isAutoEnvironmentEnabled && '🔄'}</div>
                      <div className="text-xs opacity-80 capitalize">{season}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {weather === 'sunny' && '☀️'}
                      {weather === 'rainy' && '🌧️'}
                      {weather === 'cloudy' && '☁️'}
                      {weather === 'monsoon' && '⛈️'}
                      {weather === 'winter' && '❄️'}
                    </span>
                    <div>
                      <div className="font-semibold">Weather {isAutoEnvironmentEnabled && '🔄'}</div>
                      <div className="text-xs opacity-80 capitalize">{weather}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{isNight ? '🌙' : '☀️'}</span>
                    <div>
                      <div className="font-semibold">Time</div>
                      <div className="text-xs opacity-80">{isNight ? 'Night' : 'Day'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {selectedCharacter === 'priya' && '👩'}
                      {selectedCharacter === 'ururu' && '👨'}
                      {selectedCharacter === 'galaxia' && '👸'}
                    </span>
                    <div>
                      <div className="font-semibold">Avatar</div>
                      <div className="text-xs opacity-80 capitalize">{selectedCharacter}</div>
                    </div>
                  </div>
                </div>
                
                {/* Next Change Timer (only when auto is enabled) */}
                {isAutoEnvironmentEnabled && (
                  <div className="mt-2 pt-2 border-t border-white/20">
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <span>🕐</span>
                      <span>Changes every 30 seconds</span>
                    </div>
                  </div>
                )}
                
                <div className="mt-3 pt-3 border-t border-white/20">
                  <div className="text-white/80 text-xs text-center">
                    💡 <strong>Tip:</strong> Use controls in the top corners to change season, weather, and time!
                  </div>
                </div>
              </motion.div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => navigateTo('home')} 
                  variant="secondary" 
                  size="sm"
                >
                  ← Home
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}