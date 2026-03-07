import { useState, useEffect, Suspense } from 'react';
import Button from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { motion, AnimatePresence } from 'framer-motion';
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
import { goaYourSpaceStory } from '@/data/goa-your-space-story';

export default function YourSpace() {
  const { navigateTo } = useNavigation();
  const { selectedCharacter, setSelectedCharacter } = useCharacter();
  const { isNight } = useTheme();
  const { weather, changeWeather } = useWeatherSystem();
  const [season, setSeason] = useState('summer'); // Beach default to summer
  const [isAutoEnvironmentEnabled, setIsAutoEnvironmentEnabled] = useState(true);
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false);
  const [showResort, setShowResort] = useState(false);
  const [showInterior, setShowInterior] = useState(false);
  const [currentResortArea, setCurrentResortArea] = useState<'main-lobby' | 'concierge-desk' | 'pool-area' | 'oceanview-restaurant' | 'spa-wellness' | 'fitness-center' | 'conference-rooms' | 'guest-suites' | 'business-lounge' | 'art-gallery' | 'kids-play' | 'library-study' | 'movie-theater' | 'outdoor-market' | 'adventure-zone' | 'music-studio' | 'botanical-garden' | 'meditation-temple' | 'arcade-gaming' | 'premium-lounge' | 'exterior'>('exterior');
  const [viewMode, setViewMode] = useState<'exterior' | 'interior'>('exterior');
  const [isStoryMode, setIsStoryMode] = useState(true);
  const [isStoryFinished, setIsStoryFinished] = useState(false);
  const [storySceneIndex, setStorySceneIndex] = useState(0);
  const [storyLineIndex, setStoryLineIndex] = useState(0);

  const activeScene = goaYourSpaceStory.scenes[storySceneIndex];
  const activeLine = activeScene?.lines[storyLineIndex] ?? '';

  const startStoryMode = () => {
    setIsAutoEnvironmentEnabled(false);
    setSeason('summer');
    changeWeather('sunny' as any);
    setShowWelcomeOverlay(false);
    setShowResort(false);
    setCurrentResortArea('exterior');
    setViewMode('exterior');
    setStorySceneIndex(0);
    setStoryLineIndex(0);
    setIsStoryFinished(false);
    setIsStoryMode(true);
  };

  const skipStoryMode = () => {
    setIsAutoEnvironmentEnabled(true);
    setIsStoryMode(false);
    setIsStoryFinished(true);
    setStorySceneIndex(0);
    setStoryLineIndex(0);
    setShowWelcomeOverlay(true);
  };

  const goToPreviousStoryStep = () => {
    if (!activeScene) return;

    if (storyLineIndex > 0) {
      setStoryLineIndex((prev) => prev - 1);
      return;
    }

    if (storySceneIndex > 0) {
      const previousSceneIndex = storySceneIndex - 1;
      const previousScene = goaYourSpaceStory.scenes[previousSceneIndex];
      setStorySceneIndex(previousSceneIndex);
      setStoryLineIndex(previousScene.lines.length - 1);
    }
  };

  const goToNextStoryStep = () => {
    if (!activeScene) return;

    const isLastLineInScene = storyLineIndex === activeScene.lines.length - 1;
    const isLastScene = storySceneIndex === goaYourSpaceStory.scenes.length - 1;

    if (!isLastLineInScene) {
      setStoryLineIndex((prev) => prev + 1);
      return;
    }

    if (!isLastScene) {
      setStorySceneIndex((prev) => prev + 1);
      setStoryLineIndex(0);
      return;
    }

    setIsStoryFinished(true);
    setIsStoryMode(false);
    setIsAutoEnvironmentEnabled(true);
    setShowWelcomeOverlay(true);
  };
  
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

  useEffect(() => {
    if (!isStoryMode || !activeScene) return;

    // Sync world state to each story scene for cinematic flow.
    if (activeScene.key === 'memory' || activeScene.key === 'thought' || activeScene.key === 'idea' || activeScene.key === 'goa-world') {
      if (showResort) {
        setShowResort(false);
      }
      if (showWelcomeOverlay) {
        setShowWelcomeOverlay(false);
      }

      if (activeScene.key === 'memory') {
        setSeason('monsoon');
        changeWeather('cloudy' as any);
      }

      if (activeScene.key === 'thought') {
        setSeason('summer');
        changeWeather('sunny' as any);
      }

      if (activeScene.key === 'idea' || activeScene.key === 'goa-world') {
        setSeason('summer');
        changeWeather('sunny' as any);
      }
    }

    if (activeScene.key === 'resort-discovery') {
      if (!showResort) {
        setShowResort(true);
      }
      if (currentResortArea !== 'exterior') {
        setCurrentResortArea('exterior');
      }
      if (viewMode !== 'exterior') {
        setViewMode('exterior');
      }
      setSeason('summer');
      changeWeather('sunny' as any);
    }

    if (activeScene.key === 'meaning') {
      if (!showResort) {
        setShowResort(true);
      }
      if (currentResortArea !== 'botanical-garden') {
        setCurrentResortArea('botanical-garden');
      }
      setSeason('spring');
      changeWeather('cloudy' as any);
    }
  }, [
    isStoryMode,
    activeScene,
    showResort,
    showWelcomeOverlay,
    currentResortArea,
    viewMode,
    changeWeather,
  ]);


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
                  currentResortArea === 'business-lounge' ? [0, 3.2, 6.5] :
                  currentResortArea === 'art-gallery' ? [0, 2.5, 5] :
                  currentResortArea === 'kids-play' ? [0, 3, 5] :
                  currentResortArea === 'library-study' ? [0, 2.5, 5] :
                  currentResortArea === 'movie-theater' ? [0, 2, 5] :
                  currentResortArea === 'outdoor-market' ? [0, 2.5, 5] :
                  currentResortArea === 'adventure-zone' ? [0, 2.5, 5] :
                  currentResortArea === 'music-studio' ? [0, 2.5, 5] :
                  currentResortArea === 'botanical-garden' ? [1.2, 3.2, 6.4] :
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
                  <BotanicalGarden weatherType={weather} />
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

        {/* Cinematic Story Overlay */}
        {isStoryMode && activeScene && (
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  activeScene.key === 'memory'
                    ? 'radial-gradient(circle at center, rgba(0,0,0,0.9) 0%, rgba(8,15,31,0.8) 50%, rgba(0,0,0,0.95) 100%)'
                    : activeScene.key === 'meaning'
                    ? 'radial-gradient(circle at center, rgba(18,42,66,0.35) 0%, rgba(8,15,31,0.74) 65%, rgba(0,0,0,0.86) 100%)'
                    : 'radial-gradient(circle at center, rgba(4,20,40,0.42) 0%, rgba(7,26,58,0.62) 50%, rgba(0,0,0,0.8) 100%)',
              }}
              animate={{ opacity: [0.55, 0.82, 0.55] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white text-sm tracking-wide">
              {goaYourSpaceStory.title} • {activeScene.title}
            </div>

            <div className="absolute inset-0 flex items-center justify-center px-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeScene.id}-${storyLineIndex}`}
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="max-w-4xl text-center"
                >
                  <p className="text-2xl md:text-4xl font-semibold text-white leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                    {activeLine}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[94%] max-w-4xl rounded-2xl border border-white/20 bg-black/35 backdrop-blur-xl p-4 pointer-events-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-white/70 text-xs mb-2">{activeScene.visualCue}</div>

              <div className="grid grid-cols-6 gap-2 mb-4">
                {goaYourSpaceStory.scenes.map((scene, index) => (
                  <div
                    key={scene.id}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index < storySceneIndex
                        ? 'bg-emerald-300'
                        : index === storySceneIndex
                        ? 'bg-white shadow-[0_0_14px_rgba(255,255,255,0.75)]'
                        : 'bg-white/25'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="text-white text-sm md:text-base">
                  Scene {storySceneIndex + 1} / {goaYourSpaceStory.scenes.length} • Line {storyLineIndex + 1} / {activeScene.lines.length}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={goToPreviousStoryStep}
                    className="text-xs"
                    disabled={storySceneIndex === 0 && storyLineIndex === 0}
                  >
                    ← Previous
                  </Button>
                  <Button
                    size="sm"
                    onClick={goToNextStoryStep}
                    className="text-xs"
                  >
                    {storySceneIndex === goaYourSpaceStory.scenes.length - 1 && storyLineIndex === activeScene.lines.length - 1
                      ? 'Finish Story'
                      : 'Next →'}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={skipStoryMode}
                    className="text-xs"
                  >
                    ⏭ Skip Story
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Final Story Message */}
        {!isStoryMode && isStoryFinished && (
          <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl w-full rounded-2xl border border-amber-200/40 bg-gradient-to-r from-amber-500/20 via-orange-400/15 to-sky-400/20 backdrop-blur-lg p-5 text-center pointer-events-auto"
            >
              <p className="text-base md:text-2xl text-white font-semibold mb-4 leading-relaxed">
                {goaYourSpaceStory.finalLine}
              </p>
              <div className="flex gap-3 justify-center">
                <Button size="sm" onClick={startStoryMode}>
                  🎬 Replay Story
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setShowResort(true)}>
                  🏨 Continue Exploring
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}