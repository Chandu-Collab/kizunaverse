import { useState, useEffect, Suspense } from 'react';
import Button from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { motion } from 'framer-motion';
import Scene from '@/components/3d/Scene';
import GoaBeachScene from '@/components/3d/GoaBeachScene';
import GoaResort3D from '@/components/3d/GoaResort3D';
import ResortLobby from '@/components/3d/ResortLobby';
import ConciergeDesk from '@/components/3d/ConciergeDesk';
import LuxuryPoolArea from '@/components/3d/LuxuryPoolArea';
import OceanviewRestaurant from '@/components/3d/OceanviewRestaurant';
import SpaWellnessCenter from '@/components/3d/SpaWellnessCenter';
import FitnessCenter from '@/components/3d/FitnessCenter';
import ConferenceRooms from '@/components/3d/ConferenceRooms';
import { GuestSuitesDeluxe } from '@/components/3d/GuestSuitesDeluxe';
import { BusinessLounge } from '@/components/3d/BusinessLounge';
import { ArtGallery } from '@/components/3d/ArtGallery';
import { KidsPlayArea } from '@/components/3d/KidsPlayArea';
import { LibraryStudyLounge } from '@/components/3d/LibraryStudyLounge';
import { MovieTheater } from '@/components/3d/MovieTheater';
import { OutdoorMarket } from '@/components/3d/OutdoorMarket';
import { AdventureZone } from '@/components/3d/AdventureZone';
import { MusicRecordingStudio } from '@/components/3d/MusicRecordingStudio';
import { BotanicalGarden } from '@/components/3d/BotanicalGarden';
import { MeditationTemple } from '@/components/3d/MeditationTemple';
import { ArcadeGamingZone } from '@/components/3d/ArcadeGamingZone';
import { PremiumLoungeVIP } from '@/components/3d/PremiumLoungeVIP';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useWeatherSystem } from '@/components/3d/weather/WeatherSystem';
import { useCharacter } from '@/hooks/useCharacter';
import { useTheme } from '@/hooks/useTheme';
import GlassCard from '@/components/ui/GlassCard';

export default function YourSpace() {
  const { navigateTo } = useNavigation();
  const { selectedCharacter, setSelectedCharacter } = useCharacter();
  const { isNight } = useTheme();
  const { weather, changeWeather } = useWeatherSystem();
  const [season, setSeason] = useState('summer'); // Beach default to summer
  const [isAutoEnvironmentEnabled, setIsAutoEnvironmentEnabled] = useState(true);
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(true);
  const [showResort, setShowResort] = useState(false);
  const [showInterior, setShowInterior] = useState(false);
  const [currentResortArea, setCurrentResortArea] = useState<'main-lobby' | 'concierge-desk' | 'pool-area' | 'oceanview-restaurant' | 'spa-wellness' | 'fitness-center' | 'conference-rooms' | 'guest-suites' | 'business-lounge' | 'art-gallery' | 'kids-play' | 'library-study' | 'movie-theater' | 'outdoor-market' | 'adventure-zone' | 'music-studio' | 'botanical-garden' | 'meditation-temple' | 'arcade-gaming' | 'premium-lounge' | 'exterior'>('exterior');
  const [viewMode, setViewMode] = useState<'exterior' | 'interior'>('exterior');
  
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
          {showResort ? (
            // 3D Resort View
            <div className="relative w-full h-screen">
              <Scene 
                cameraPosition={
                  currentResortArea === 'main-lobby' ? [0, 3, 4] :
                  currentResortArea === 'concierge-desk' ? [0, 3, 6] :
                  currentResortArea === 'pool-area' ? [0, 6, 12] :
                  currentResortArea === 'oceanview-restaurant' ? [0, 3.2, 6] :
                  currentResortArea === 'spa-wellness' ? [0, 3.5, 5.5] :
                  currentResortArea === 'fitness-center' ? [5, 4, 5] :
                  currentResortArea === 'conference-rooms' ? [5, 4, 5] :
                  currentResortArea === 'guest-suites' ? [5, 3, 4] :
                  currentResortArea === 'business-lounge' ? [0, 3, 5] :
                  currentResortArea === 'art-gallery' ? [0, 2.5, 5] :
                  currentResortArea === 'kids-play' ? [0, 3, 5] :
                  currentResortArea === 'library-study' ? [0, 2.5, 5] :
                  currentResortArea === 'movie-theater' ? [0, 2, 5] :
                  currentResortArea === 'outdoor-market' ? [0, 2.5, 5] :
                  currentResortArea === 'adventure-zone' ? [0, 2.5, 5] :
                  currentResortArea === 'music-studio' ? [0, 2.5, 5] :
                  currentResortArea === 'botanical-garden' ? [0, 3.5, 5] :
                  currentResortArea === 'meditation-temple' ? [0, 2.5, 5] :
                  currentResortArea === 'arcade-gaming' ? [0, 2.5, 5] :
                  currentResortArea === 'premium-lounge' ? [0, 2.5, 5] :
                  currentResortArea === 'exterior' ? [12, 8, 15] : 
                  [0, 3, 6]
                } 
                enableControls={true}
                enableShadows={true}
              >
                {currentResortArea === 'main-lobby' ? (
                  // Show dedicated lobby interior
                  <ResortLobby />
                ) : currentResortArea === 'concierge-desk' ? (
                  // Show concierge & travel desk area
                  <ConciergeDesk />
                ) : currentResortArea === 'pool-area' ? (
                  // Show luxury pool area
                  <LuxuryPoolArea />
                ) : currentResortArea === 'oceanview-restaurant' ? (
                  // Show oceanview restaurant
                  <OceanviewRestaurant />
                ) : currentResortArea === 'spa-wellness' ? (
                  // Show spa wellness center
                  <SpaWellnessCenter />
                ) : currentResortArea === 'fitness-center' ? (
                  // Show fitness center
                  <FitnessCenter />
                ) : currentResortArea === 'conference-rooms' ? (
                  // Show conference rooms
                  <ConferenceRooms />
                ) : currentResortArea === 'guest-suites' ? (
                  // Show guest suites deluxe
                  <GuestSuitesDeluxe />
                ) : currentResortArea === 'business-lounge' ? (
                  // Show business lounge
                  <BusinessLounge />
                ) : currentResortArea === 'art-gallery' ? (
                  // Show art gallery
                  <ArtGallery />
                ) : currentResortArea === 'kids-play' ? (
                  // Show kids play area
                  <KidsPlayArea />
                ) : currentResortArea === 'library-study' ? (
                  // Show library study lounge
                  <LibraryStudyLounge />
                ) : currentResortArea === 'movie-theater' ? (
                  // Show movie theater
                  <MovieTheater />
                ) : currentResortArea === 'outdoor-market' ? (
                  // Show outdoor market
                  <OutdoorMarket />
                ) : currentResortArea === 'adventure-zone' ? (
                  // Show adventure zone
                  <AdventureZone />
                ) : currentResortArea === 'music-studio' ? (
                  // Show music recording studio
                  <MusicRecordingStudio />
                ) : currentResortArea === 'botanical-garden' ? (
                  // Show botanical garden
                  <BotanicalGarden />
                ) : currentResortArea === 'meditation-temple' ? (
                  // Show meditation temple
                  <MeditationTemple />
                ) : currentResortArea === 'arcade-gaming' ? (
                  // Show arcade gaming zone
                  <ArcadeGamingZone />
                ) : currentResortArea === 'premium-lounge' ? (
                  // Show premium lounge VIP
                  <PremiumLoungeVIP />
                ) : (
                  // Show resort exterior or other areas when implemented
                  <GoaResort3D 
                    showResort={showInterior} 
                    currentArea={currentResortArea as any}
                    viewMode={viewMode}
                  />
                )}
              </Scene>
              
              {/* 3D Resort Controls */}
              <div className="absolute top-4 right-4 z-10">
                <GlassCard className="p-4 max-w-sm">
                  <h3 className="font-semibold text-lg mb-3">🏨 Resort Areas</h3>
                  
                  {(currentResortArea === 'main-lobby' || currentResortArea === 'concierge-desk' || currentResortArea === 'pool-area' || currentResortArea === 'oceanview-restaurant' || currentResortArea === 'spa-wellness' || currentResortArea === 'fitness-center' || currentResortArea === 'conference-rooms' || currentResortArea === 'guest-suites' || currentResortArea === 'business-lounge' || currentResortArea === 'art-gallery' || currentResortArea === 'kids-play' || currentResortArea === 'library-study' || currentResortArea === 'movie-theater' || currentResortArea === 'outdoor-market' || currentResortArea === 'adventure-zone' || currentResortArea === 'music-studio' || currentResortArea === 'botanical-garden' || currentResortArea === 'meditation-temple' || currentResortArea === 'arcade-gaming' || currentResortArea === 'premium-lounge') && (
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-2 mb-3">
                      <div className="text-green-300 text-xs font-semibold">✅ INTERIOR VIEW</div>
                      <div className="text-white text-xs">
                        {currentResortArea === 'main-lobby' 
                          ? 'Showing realistic lobby interior with detailed furniture and decor'
                          : currentResortArea === 'concierge-desk'
                          ? 'Showing concierge & travel desk with professional consultation areas'
                          : currentResortArea === 'oceanview-restaurant'
                          ? 'Showing oceanview restaurant with host desk, dining layout and sea-facing ambiance'
                          : currentResortArea === 'spa-wellness'
                          ? 'Showing spa wellness center with massage rooms, sauna, steam room & relaxation lounge'
                          : currentResortArea === 'fitness-center'
                          ? 'Showing fitness center with cardio zone, strength training, yoga area & locker rooms'
                          : currentResortArea === 'conference-rooms'
                          ? 'Showing conference rooms with boardroom, meeting spaces, AV equipment & video conferencing'
                          : currentResortArea === 'guest-suites'
                          ? 'Showing luxurious guest suite with king bed, spa bathroom, lounge & work desk'
                          : currentResortArea === 'business-lounge'
                          ? 'Showing sophisticated business lounge with bar, seating, AV displays & meeting area'
                          : currentResortArea === 'art-gallery'
                          ? 'Showing premier art gallery with sculptures, framed paintings & exhibition lighting'
                          : currentResortArea === 'kids-play'
                          ? 'Showing colorful kids play area with slides, swings, climbing frames & soft play'
                          : currentResortArea === 'library-study'
                          ? 'Showing peaceful library lounge with bookshelves, study tables, fireplace & reading chairs'
                          : currentResortArea === 'movie-theater'
                          ? 'Showing cinema movie theater with reclining seats, big screen, popcorn stand & neon signs'
                          : currentResortArea === 'outdoor-market'
                          ? 'Showing open-air marketplace with vendor stalls, colorful decorations & lanterns'
                          : currentResortArea === 'adventure-zone'
                          ? 'Showing adventure zone with rock climbing wall, zip line, rope course & challenging activities'
                          : currentResortArea === 'music-studio'
                          ? 'Showing professional music recording studio with booth, control room & mixing equipment'
                          : currentResortArea === 'botanical-garden'
                          ? 'Showing lush botanical garden with tropical plants, fountain & meditation benches'
                          : currentResortArea === 'meditation-temple'
                          ? 'Showing serene meditation temple with altar, prayer beads, candles & calm ambiance'
                          : currentResortArea === 'arcade-gaming'
                          ? 'Showing arcade gaming zone with cabinets, VR station, racing sim & neon lights'
                          : currentResortArea === 'premium-lounge'
                          ? 'Showing exclusive VIP lounge with luxury seating, bar, chandelier & gold accents'
                          : 'Showing luxury pool complex with hot tubs, slides & cabanas'
                        }
                      </div>
                    </div>
                  )}
                  
                  {/* Resort Area Selection - Implemented Areas */}
                  <div className="grid grid-cols-1 gap-2 mb-4">
                    <Button
                      variant={currentResortArea === 'main-lobby' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('main-lobby')}
                      className="text-xs"
                    >
                      ✅ 🏨 Main Lobby & Reception
                    </Button>
                    
                    <Button
                      variant={currentResortArea === 'concierge-desk' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('concierge-desk')}
                      className="text-xs"
                    >
                      ✅ 🗺️ Concierge & Travel Desk
                    </Button>
                    
                    <Button
                      variant={currentResortArea === 'pool-area' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('pool-area')}
                      className="text-xs"
                    >
                      ✅ 🏊 Luxury Pool Area
                    </Button>

                    <Button
                      variant={currentResortArea === 'oceanview-restaurant' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('oceanview-restaurant')}
                      className="text-xs"
                    >
                      ✅ 🍽️ Oceanview Restaurant
                    </Button>

                    <Button
                      variant={currentResortArea === 'spa-wellness' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('spa-wellness')}
                      className="text-xs"
                    >
                      ✅ 🧖 Spa & Wellness Center
                    </Button>

                    <Button
                      variant={currentResortArea === 'fitness-center' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('fitness-center')}
                      className="text-xs"
                    >
                      🚧 💪 Fitness Center
                    </Button>

                    <Button
                      variant={currentResortArea === 'conference-rooms' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('conference-rooms')}
                      className="text-xs"
                    >
                      📊 📋 Conference Rooms
                    </Button>

                    <Button
                      variant={currentResortArea === 'guest-suites' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('guest-suites')}
                      className="text-xs"
                    >
                      ✅ 🛏️ Guest Suites (Deluxe)
                    </Button>

                    <Button
                      variant={currentResortArea === 'business-lounge' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('business-lounge')}
                      className="text-xs"
                    >
                      ✅ 🍸 Business Lounge
                    </Button>

                    <Button
                      variant={currentResortArea === 'art-gallery' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('art-gallery')}
                      className="text-xs"
                    >
                      ✅ 🎨 Art Gallery
                    </Button>

                    <Button
                      variant={currentResortArea === 'kids-play' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('kids-play')}
                      className="text-xs"
                    >
                      ✅ 🎪 Kids Play Area
                    </Button>

                    <Button
                      variant={currentResortArea === 'library-study' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('library-study')}
                      className="text-xs"
                    >
                      ✅ 📚 Library Study Lounge
                    </Button>

                    <Button
                      variant={currentResortArea === 'movie-theater' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('movie-theater')}
                      className="text-xs"
                    >
                      ✅ 🎦 Movie Theater
                    </Button>

                    <Button
                      variant={currentResortArea === 'outdoor-market' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('outdoor-market')}
                      className="text-xs"
                    >
                      ✅ 🎪 Outdoor Market
                    </Button>

                    <Button
                      variant={currentResortArea === 'adventure-zone' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('adventure-zone')}
                      className="text-xs"
                    >
                      ✅ 🏔️ Adventure Zone
                    </Button>

                    <Button
                      variant={currentResortArea === 'music-studio' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('music-studio')}
                      className="text-xs"
                    >
                      ✅ 🎵 Music Recording Studio
                    </Button>

                    <Button
                      variant={currentResortArea === 'botanical-garden' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('botanical-garden')}
                      className="text-xs"
                    >
                      ✅ 🌿 Botanical Garden
                    </Button>

                    <Button
                      variant={currentResortArea === 'meditation-temple' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('meditation-temple')}
                      className="text-xs"
                    >
                      ✅ 🕉️ Meditation Temple
                    </Button>

                    <Button
                      variant={currentResortArea === 'arcade-gaming' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('arcade-gaming')}
                      className="text-xs"
                    >
                      ✅ 🎮 Arcade Gaming Zone
                    </Button>

                    <Button
                      variant={currentResortArea === 'premium-lounge' ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCurrentResortArea('premium-lounge')}
                      className="text-xs"
                    >
                      ✅ 👑 Premium Lounge VIP
                    </Button>
                  </div>
                  
                  {/* View Mode Toggle - Only for exterior */}
                  {currentResortArea === 'exterior' && (
                    <div className="mb-4">
                      <Button
                        variant={viewMode === 'exterior' ? "primary" : "secondary"}
                        size="sm"
                        onClick={() => setViewMode(viewMode === 'exterior' ? 'interior' : 'exterior')}
                        className="w-full"
                      >
                        {viewMode === 'exterior' ? '🏢 Exterior View' : '🏠 Interior View'}
                      </Button>
                    </div>
                  )}
                  
                  {/* Back to Beach Button */}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowResort(false)}
                    className="w-full"
                  >
                    🏖️ Back to Beach
                  </Button>
                </GlassCard>
              </div>
            </div>
          ) : (
            // Beach Scene
            <div className="h-full">
              <Scene cameraPosition={[0, 5, 10]}>
                <GoaBeachScene 
                  season={season} 
                  weather={weather} 
                  character={selectedCharacter}
                />
              </Scene>
            </div>
          )}
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
                � Goa Luxury Resort {isNight ? '🌙' : '☀️'}
              </h1>
              <p className="text-white/90 text-sm mb-4">
                Experience an exclusive {isNight ? 'moonlit' : 'sun-kissed'} 5-star resort in Goa with stunning ocean views, 
                luxurious amenities, and world-class hospitality. From beachfront suites to infinity pools, 
                every moment here is designed to create {isNight ? 'magical memories under the stars' : 'unforgettable golden memories'}.
              </p>
              
              {/* Resort Area Selection */}
              {/* Enter Resort Button */}
              <div className="mb-4">
                <motion.button
                  onClick={() => { setShowResort(true); setCurrentResortArea('exterior'); }}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  🏨 Enter Luxury Resort
                </motion.button>
              </div>
              
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
                    <span className="text-lg">�</span>
                    <div>
                      <div className="font-semibold">Current Area</div>
                      <div className="text-xs opacity-80 capitalize">
                        {currentResortArea === 'main-lobby' ? 'Main Lobby & Reception' : 
                         currentResortArea === 'concierge-desk' ? 'Concierge & Travel Desk' :
                         currentResortArea === 'pool-area' ? 'Luxury Pool Area' :
                         currentResortArea === 'oceanview-restaurant' ? 'Oceanview Restaurant' :
                         currentResortArea === 'spa-wellness' ? 'Spa & Wellness Center' :
                         currentResortArea === 'exterior' ? 'Resort Exterior' : 
                         currentResortArea}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{viewMode === 'interior' ? '🏨' : '🌅'}</span>
                    <div>
                      <div className="font-semibold">View Mode</div>
                      <div className="text-xs opacity-80 capitalize">
                        {currentResortArea === 'main-lobby' ? 'Interior' : viewMode}
                      </div>
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
                    💡 <strong>Tip:</strong> Explore different resort areas and switch between interior/exterior views for the full luxury experience!
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