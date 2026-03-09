// BirthdayZone cleaned up for new implementation


import dynamic from "next/dynamic";
import React, { Suspense, useState, useEffect } from "react";
const Hospital3D = dynamic(() => import("@/components/3d/Hospital3D"), { ssr: false });
const HospitalInterior3D = dynamic(() => import("@/components/3d/HospitalInterior3D"), { ssr: false });
const Stairs3D = dynamic(() => import("@/components/3d/Stairs3D"), { ssr: false });
const Lift3D = dynamic(() => import("@/components/3d/Lift3D"), { ssr: false });

import Scene from "@/components/3d/Scene";
import ParticleBackground from "@/components/ui/ParticleBackground";
import WeatherControls from "@/components/ui/WeatherControls";
import WeatherSystem from "@/components/3d/weather/WeatherSystem";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import { useNavigation } from "@/hooks/useNavigation";
import { hospitalRoomMeanings } from "@/data/hospital-room-meanings";
import { birthdayStory } from "@/data/birthday-story";
import { Text } from '@react-three/drei';

type WeatherType = 'sunny' | 'rainy' | 'cloudy' | 'monsoon' | 'winter';
type HospitalRoomKey =
  | 'reception'
  | 'waiting'
  | 'consultation'
  | 'ward'
  | 'operation'
  | 'pharmacy'
  | 'store'
  | 'generator'
  | 'staffRest'
  | 'exterior'
  | 'icu'
  | 'recovery'
  | 'emergency'
  | 'laboratory'
  | 'radiology'
  | 'maternity'
  | 'pediatric'
  | 'isolation'
  | 'nurseStations'
  | 'bathroomRestroom'
  | 'cafeteriaCanteen'
  | 'administrativeOffices'
  | 'ambulanceBayEntrance'
  | 'physiotherapyRehab'
  | 'bloodBank'
  | 'mortuary'
  | 'chapelPrayerRoom';

const roomMeaningKeyMap: Record<HospitalRoomKey, keyof typeof hospitalRoomMeanings> = {
  exterior: 'exterior',
  reception: 'reception',
  waiting: 'waitingArea',
  consultation: 'consultation',
  ward: 'ward',
  operation: 'operationTheatre',
  pharmacy: 'pharmacy',
  store: 'storeRoom',
  generator: 'generatorRoom',
  staffRest: 'restroom',
  icu: 'icu',
  recovery: 'recoveryRoom',
  emergency: 'emergency',
  laboratory: 'laboratory',
  radiology: 'radiology',
  maternity: 'ward',
  pediatric: 'pediatric',
  isolation: 'isolationRoom',
  nurseStations: 'nurseStation',
  bathroomRestroom: 'restroom',
  cafeteriaCanteen: 'cafeteria',
  administrativeOffices: 'adminOffice',
  ambulanceBayEntrance: 'ambulanceBay',
  physiotherapyRehab: 'physiotherapy',
  bloodBank: 'bloodBank',
  mortuary: 'mortuary',
  chapelPrayerRoom: 'chapel',
};

const roomLabels: Record<HospitalRoomKey, string> = {
  reception: 'Reception',
  waiting: 'Waiting Area',
  consultation: 'Consultation',
  ward: 'Ward',
  operation: 'Operation',
  pharmacy: 'Pharmacy',
  store: 'Store',
  generator: 'Generator',
  staffRest: 'Staff Rest',
  exterior: 'Exterior',
  icu: 'ICU',
  recovery: 'Recovery',
  emergency: 'Emergency',
  laboratory: 'Laboratory',
  radiology: 'Radiology',
  maternity: 'Maternity',
  pediatric: 'Pediatric',
  isolation: 'Isolation',
  nurseStations: 'Nurse Station',
  bathroomRestroom: 'Bathroom/Restroom',
  cafeteriaCanteen: 'Cafeteria/Canteen',
  administrativeOffices: 'Admin Offices',
  ambulanceBayEntrance: 'Ambulance Bay',
  physiotherapyRehab: 'Physiotherapy/Rehab',
  bloodBank: 'Blood Bank',
  mortuary: 'Mortuary',
  chapelPrayerRoom: 'Chapel/Prayer Room',
};

const interiorRooms: Array<{ key: HospitalRoomKey; label: string }> = [
  { key: 'reception', label: 'Reception' },
  { key: 'waiting', label: 'Waiting Area' },
  { key: 'consultation', label: 'Consultation' },
  { key: 'ward', label: 'Ward' },
  { key: 'operation', label: 'Operation' },
  { key: 'pharmacy', label: 'Pharmacy' },
  { key: 'store', label: 'Store' },
  { key: 'generator', label: 'Generator' },
  { key: 'staffRest', label: 'Staff Rest' },
  { key: 'icu', label: 'ICU' },
  { key: 'recovery', label: 'Recovery' },
  { key: 'emergency', label: 'Emergency' },
  { key: 'laboratory', label: 'Laboratory' },
  { key: 'radiology', label: 'Radiology' },
  { key: 'maternity', label: 'Maternity' },
  { key: 'pediatric', label: 'Pediatric' },
  { key: 'isolation', label: 'Isolation' },
  { key: 'nurseStations', label: 'Nurse Station' },
  { key: 'bathroomRestroom', label: 'Bathroom/Restroom' },
  { key: 'cafeteriaCanteen', label: 'Cafeteria/Canteen' },
  { key: 'administrativeOffices', label: 'Admin Offices' },
  { key: 'ambulanceBayEntrance', label: 'Ambulance Bay' },
  { key: 'physiotherapyRehab', label: 'Physiotherapy/Rehab' },
  { key: 'bloodBank', label: 'Blood Bank' },
  { key: 'mortuary', label: 'Mortuary' },
  { key: 'chapelPrayerRoom', label: 'Chapel/Prayer Room' },
];

export default function BirthdayZone() {
  // Weather state management (pattern from YourSpace)
  const [weather, setWeather] = useState<WeatherType>('sunny');
  const [autoWeather, setAutoWeather] = useState(true);
  const { isNight, toggleTheme } = useTheme();
  const { navigateTo } = useNavigation();
  const [isAutoCycle, setIsAutoCycle] = useState(true);

  // Hospital view state
  const [viewMode, setViewMode] = useState<'exterior' | 'interior' | 'hospitalSection' | 'leftWing' | 'rightWing'>('exterior');
  const [currentRoom, setCurrentRoom] = useState<HospitalRoomKey>('exterior');

  // Handler for WeatherControls
  const handleWeatherChange = (newWeather: WeatherType) => {
    setWeather(newWeather);
    setAutoWeather(false);
  };
  const handleToggleAuto = () => setAutoWeather((prev) => !prev);

  // Floor state for hospital section
  const [sectionFloor, setSectionFloor] = useState<'ground' | 'first' | 'second'>('ground');
  
  // Birthday Story state management
  const [showStory, setShowStory] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [storyAnimationPhase, setStoryAnimationPhase] = useState<'fade-in' | 'display' | 'fade-out'>('fade-in');
  const [showEffects, setShowEffects] = useState({
    whiteLilies: false,
    cat: false,
    parrot: false,
    finalReveal: false
  });
  
  // Quiz/Authentication state
  const [showQuiz, setShowQuiz] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({
    animal: '',
    bird: '', 
    flower: ''
  });
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [showQuizError, setShowQuizError] = useState(false);
  
  // Correct answers for the quiz
  const correctAnswers = {
    animal: 'cat',
    bird: 'african grey parrot',
    flower: 'white lily'
  };
  
  // Real-time updates for lift status (refresh every second)
  const [liftUpdateTrigger, setLiftUpdateTrigger] = useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLiftUpdateTrigger(prev => prev + 1);
    }, 1000); // Update every second for real-time effect
    return () => clearInterval(interval);
  }, []);

  const selectedRoomMeaning = hospitalRoomMeanings[roomMeaningKeyMap[currentRoom]];
  const selectedRoomLabel = roomLabels[currentRoom];

  // Auto day/night cycle every 30s
  React.useEffect(() => {
    if (!isAutoCycle) return;
    const interval = setInterval(() => {
      toggleTheme();
    }, 30000);
    return () => clearInterval(interval);
  }, [isAutoCycle, toggleTheme]);

  // Story progression functions
  const startBirthdayStory = () => {
    if (!isAuthenticated) {
      setShowQuiz(true);
      return;
    }
    
    setShowStory(true);
    setCurrentStoryIndex(0);
    setStoryAnimationPhase('fade-in');
    setShowEffects({
      whiteLilies: false,
      cat: false,
      parrot: false,
      finalReveal: false
    });
  };

  // Quiz functions
  const handleQuizSubmit = () => {
    const isCorrect = 
      quizAnswers.animal.toLowerCase().trim() === correctAnswers.animal &&
      quizAnswers.bird.toLowerCase().trim() === correctAnswers.bird &&
      quizAnswers.flower.toLowerCase().trim() === correctAnswers.flower;

    if (isCorrect) {
      setIsAuthenticated(true);
      setShowQuiz(false);
      setShowQuizError(false);
      // Automatically start story after successful authentication
      setTimeout(() => {
        setShowStory(true);
        setCurrentStoryIndex(0);
        setStoryAnimationPhase('fade-in');
      }, 500);
    } else {
      setQuizAttempts(prev => prev + 1);
      setShowQuizError(true);
      // Clear error after 3 seconds
      setTimeout(() => setShowQuizError(false), 3000);
    }
  };

  const handleQuizAnswerChange = (question: string, answer: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [question]: answer
    }));
  };

  const closeQuiz = () => {
    setShowQuiz(false);
    setQuizAnswers({ animal: '', bird: '', flower: '' });
    setShowQuizError(false);
  };

  const nextStorySegment = () => {
    if (currentStoryIndex < birthdayStory.length - 1) {
      setStoryAnimationPhase('fade-out');
      setTimeout(() => {
        setCurrentStoryIndex(prev => prev + 1);
        setStoryAnimationPhase('fade-in');
      }, 500);
    } else {
      // End of story
      setStoryAnimationPhase('fade-out');
      setTimeout(() => {
        setShowStory(false);
        setCurrentStoryIndex(0);
      }, 1000);
    }
  };

  const closeBirthdayStory = () => {
    setStoryAnimationPhase('fade-out');
    setTimeout(() => {
      setShowStory(false);
      setCurrentStoryIndex(0);
    }, 500);
  };

  // Trigger visual effects based on story content
  useEffect(() => {
    if (!showStory) return;
    
    const currentText = birthdayStory[currentStoryIndex];
    
    // Show white lilies effect
    if (currentText.includes('🤍') || currentText.includes('white lily') || currentText.includes('white lilies')) {
      setShowEffects(prev => ({ ...prev, whiteLilies: true }));
    }
    
    // Show cat effect
    if (currentText.includes('🐱') || currentText.includes('🐾') || currentText.includes('cat')) {
      setShowEffects(prev => ({ ...prev, cat: true }));
    }
    
    // Show parrot effect
    if (currentText.includes('🦜') || currentText.includes('African grey parrot') || currentText.includes('parrot')) {
      setShowEffects(prev => ({ ...prev, parrot: true }));
    }
    
    // Final reveal with all effects
    if (currentText.includes('Final Secret Room') || currentStoryIndex === birthdayStory.length - 1) {
      setShowEffects(prev => ({ 
        ...prev, 
        whiteLilies: true, 
        cat: true, 
        parrot: true, 
        finalReveal: true 
      }));
    }
  }, [showStory, currentStoryIndex]);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Theme toggle button */}
      <ThemeToggle />

      {/* Day/Night auto-cycle toggle */}
      <div className="absolute top-4 left-24 z-40 bg-black/40 rounded-lg px-4 py-2 flex items-center gap-3 shadow">
        <span className="text-white text-sm">Auto day/night:</span>
        <button
          onClick={() => setIsAutoCycle((prev) => !prev)}
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${
            isAutoCycle
              ? 'bg-emerald-500/30 text-emerald-100 border-emerald-300/40'
              : 'bg-white/10 text-white/70 border-white/20'
          }`}
        >
          {isAutoCycle ? 'On (30s)' : 'Off'}
        </button>
      </div>

      {/* Particle background for ambiance - responds to weather and night, reduced for indoor scenes */}
      <ParticleBackground 
        weather={viewMode === 'exterior' ? weather : 'sunny'} 
        isNight={isNight} 
      />

      {/* Weather controls UI - only visible in exterior view */}
      {viewMode === 'exterior' && (
        <WeatherControls
          onWeatherChange={handleWeatherChange}
          currentWeather={weather}
          autoWeather={autoWeather}
          onToggleAuto={handleToggleAuto}
        />
      )}

      {/* Hospital 3D View Controls */}
      <div className="absolute top-4 left-4 z-40">
        <div className="bg-black/60 rounded-lg p-4 flex flex-col gap-2 shadow">
          <button
            onClick={() => navigateTo('home')}
            className="px-3 py-1 rounded text-xs border bg-white/10 text-white/90 hover:bg-white/20 transition-colors self-start"
          >
            ← Back To Home
          </button>
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => {
                setViewMode('exterior');
                setCurrentRoom('exterior');
              }}
              className={`px-3 py-1 rounded text-xs border transition-colors ${
                viewMode === 'exterior'
                  ? 'bg-white/30 text-white border-white/50'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              🏥 Exterior View
            </button>
            <button
              onClick={() => {
                setViewMode('interior');
                setCurrentRoom('reception');
              }}
              className={`px-3 py-1 rounded text-xs border transition-colors ${
                viewMode === 'interior'
                  ? 'bg-white/30 text-white border-white/50'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              🏛️ Interior View
            </button>
            <button
              onClick={() => {
                setViewMode('hospitalSection');
              }}
              className={`px-3 py-1 rounded text-xs border transition-colors ${
                viewMode === 'hospitalSection'
                  ? 'bg-emerald-500/30 text-white border-emerald-300/40'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              🏢 Central Wing
            </button>
            <button
              onClick={() => {
                setViewMode('leftWing');
              }}
              className={`px-3 py-1 rounded text-xs border transition-colors ${
                viewMode === 'leftWing'
                  ? 'bg-purple-500/30 text-white border-purple-300/40'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              🏥 Left Wing
            </button>
            <button
              onClick={() => {
                setViewMode('rightWing');
              }}
              className={`px-3 py-1 rounded text-xs border transition-colors ${
                viewMode === 'rightWing'
                  ? 'bg-orange-500/30 text-white border-orange-300/40'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              🏥 Right Wing
            </button>
          </div>
          
          {/* Birthday Story Button - Special surprise feature */}
          <div className="flex gap-2 mb-2 border-t border-white/20 pt-2">
            <button
              onClick={startBirthdayStory}
              disabled={showStory || showQuiz}
              className={`px-3 py-2 rounded text-sm border transition-all duration-300 ${
                showStory || showQuiz
                  ? 'bg-gray-500/30 text-gray-400 border-gray-600/40 cursor-not-allowed'
                  : isAuthenticated
                  ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-white border-emerald-300/40 hover:from-green-500/50 hover:to-emerald-500/50 hover:border-emerald-300/60 shadow-lg'
                  : 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-white border-pink-300/40 hover:from-pink-500/50 hover:to-purple-500/50 hover:border-pink-300/60 shadow-lg'
              }`}
            >
              {isAuthenticated ? '🎁 ✓ Birthday Story' : '🔒 Birthday Story Surprise'}
            </button>
            {isAuthenticated && (
              <span className="text-green-400 text-xs self-center">✓ Unlocked</span>
            )}
          </div>
          
          {/* Floor selector for hospital wings */}
          {(viewMode === 'hospitalSection' || viewMode === 'leftWing' || viewMode === 'rightWing') && (
            <div className="flex gap-2 mb-2">
              <span className="text-white text-xs">Floor:</span>
              <button
                onClick={() => setSectionFloor('ground')}
                className={`px-2 py-1 rounded text-xs border transition-colors ${sectionFloor === 'ground' ? 'bg-blue-500/40 text-white border-blue-300' : 'bg-white/10 text-white/70 border-white/20'}`}
              >
                Ground
              </button>
              <button
                onClick={() => setSectionFloor('first')}
                className={`px-2 py-1 rounded text-xs border transition-colors ${sectionFloor === 'first' ? 'bg-blue-500/40 text-white border-blue-300' : 'bg-white/10 text-white/70 border-white/20'}`}
              >
                First
              </button>
              <button
                onClick={() => setSectionFloor('second')}
                className={`px-2 py-1 rounded text-xs border transition-colors ${sectionFloor === 'second' ? 'bg-blue-500/40 text-white border-blue-300' : 'bg-white/10 text-white/70 border-white/20'}`}
              >
                Second
              </button>
            </div>
          )}
          {viewMode === 'interior' && (
            <div className="grid grid-cols-3 gap-1 text-xs">
              {interiorRooms.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCurrentRoom(key)}
                  className={`p-1 rounded ${currentRoom === key ? 'bg-blue-500/50 text-white border border-blue-300' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {viewMode === 'interior' && (
        <div className="room-meaning-wrap absolute top-28 right-4 z-40 max-w-sm">
          <div key={currentRoom} className="room-meaning-card relative p-4">
            
            {/* Personal touches based on room */}
            <div className="absolute top-2 right-2 text-2xl opacity-60">
              {(selectedRoomMeaning.includes('🐱') || selectedRoomMeaning.includes('cat')) && '🐱'}
              {selectedRoomMeaning.includes('🤍') && '🤍'}
              {selectedRoomMeaning.includes('🦜') && '🦜'}
            </div>
            
            <div className="room-meaning-title text-[11px] mb-1">
              Personal Meaning
              <span className="ml-2 text-pink-300 opacity-70">✨</span>
            </div>
            <div className="room-meaning-room text-sm font-semibold mb-2">{selectedRoomLabel}</div>
            <p className="room-meaning-text text-sm">
              {selectedRoomMeaning.split('\n').map((line, index) => (
                <span
                  key={`${currentRoom}-line-${index}`}
                  className="room-meaning-line"
                  style={{ animationDelay: `${180 + index * 90}ms` }}
                >
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      )}

      {/* Quiz Authentication Overlay */}
      {showQuiz && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-pink-900/95">
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
            <div className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              
              {/* Quiz Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">🔒 Special Access Required</h2>
                <p className="text-white/80 text-sm">Answer these questions to unlock your surprise</p>
                {quizAttempts > 0 && (
                  <p className="text-yellow-400 text-xs mt-2">Attempts: {quizAttempts}</p>
                )}
              </div>

              {/* Quiz Questions */}
              <div className="space-y-4 mb-6">
                {/* Question 1: Favorite Animal */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    🐾 What is your favorite animal?
                  </label>
                  <input
                    type="text"
                    value={quizAnswers.animal}
                    onChange={(e) => handleQuizAnswerChange('animal', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 quiz-input transition-all duration-200"
                    placeholder="Enter your favorite animal..."
                  />
                </div>

                {/* Question 2: Favorite Bird */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    🦜 What is your favorite bird?
                  </label>
                  <input
                    type="text"
                    value={quizAnswers.bird}
                    onChange={(e) => handleQuizAnswerChange('bird', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 quiz-input transition-all duration-200"
                    placeholder="Enter your favorite bird..."
                  />
                </div>

                {/* Question 3: Favorite Flower */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    🌸 What is your favorite flower?
                  </label>
                  <input
                    type="text"
                    value={quizAnswers.flower}
                    onChange={(e) => handleQuizAnswerChange('flower', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 quiz-input transition-all duration-200"
                    placeholder="Enter your favorite flower..."
                  />
                </div>
              </div>

              {/* Error Message */}
              {showQuizError && (
                <div className={`bg-red-500/20 border border-red-400/40 rounded-lg p-3 mb-4 quiz-error`}>
                  <p className="text-red-200 text-sm text-center">
                    ❌ Hmm, that's not quite right. Try again! 
                    {quizAttempts >= 3 && (
                      <span className="block mt-1 text-xs">
                        💡 Think about the things mentioned in our conversations...
                      </span>
                    )}
                  </p>
                </div>
              )}

              {/* Quiz Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleQuizSubmit}
                  disabled={!quizAnswers.animal || !quizAnswers.bird || !quizAnswers.flower}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                    !quizAnswers.animal || !quizAnswers.bird || !quizAnswers.flower
                      ? 'bg-gray-500/30 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 shadow-lg'
                  }`}
                >
                  🔓 Unlock Surprise
                </button>
                <button
                  onClick={closeQuiz}
                  className="px-4 py-3 bg-white/10 text-white/70 rounded-lg border border-white/20 hover:bg-white/20 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Birthday Story Overlay */}
      {showStory && (
        <div className={`fixed inset-0 z-50 transition-opacity duration-500 ${
          storyAnimationPhase === 'fade-in' ? 'opacity-100' : 
          storyAnimationPhase === 'fade-out' ? 'opacity-0' : 'opacity-100'
        }`}>
          {/* Background with animated effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-pink-900/95">
            {/* Floating white lilies effect */}
            {showEffects.whiteLilies && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`lily-${i}`}
                    className="absolute animate-float"
                    style={{
                      left: `${10 + i * 12}%`,
                      top: `${20 + (i % 3) * 25}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '4s'
                    }}
                  >
                    <div className="relative w-12 h-12">
                      {/* White lily with 6 petals */}
                      <div className="absolute inset-0 transform rotate-0">
                        {/* 6 lily petals arranged in a circle */}
                        {[0, 60, 120, 180, 240, 300].map((rotation, petalIndex) => (
                          <div
                            key={petalIndex}
                            className="absolute w-3 h-8 bg-gradient-to-t from-white via-white to-gray-50 rounded-full origin-bottom"
                            style={{
                              transform: `rotate(${rotation}deg) translateY(-50%)`,
                              left: '50%',
                              top: '50%',
                              transformOrigin: '50% 100%',
                              marginLeft: '-6px',
                              boxShadow: `0 0 8px rgba(255,255,255,0.8), inset 0 1px 2px rgba(0,0,0,0.1)`
                            }}
                          />
                        ))}
                        {/* Center stamens */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-2 h-2 bg-yellow-200 rounded-full relative">
                            {/* Orange/brown anthers */}
                            {[0, 45, 90, 135, 180, 225].map((angle, stamenIndex) => (
                              <div
                                key={stamenIndex}
                                className="absolute w-1 h-1 bg-orange-400 rounded-full"
                                style={{
                                  transform: `rotate(${angle}deg) translateY(-4px)`,
                                  left: '50%',
                                  top: '50%',
                                  transformOrigin: '50% 50%',
                                  marginLeft: '-2px',
                                  marginTop: '-2px'
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Cat animation */}
            {showEffects.cat && (
              <div className="absolute bottom-10 left-10 animate-walk-right">
                <div className="text-6xl">🐱</div>
              </div>
            )}
            
            {/* Parrot animation */}
            {showEffects.parrot && (
              <div className="absolute top-20 right-20 animate-sway">
                <div className="text-5xl">🦜</div>
              </div>
            )}
          </div>

          {/* Story content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
            <div className={`w-full max-w-4xl mx-auto transition-all duration-700 ${
              storyAnimationPhase === 'fade-in' ? 'transform translate-y-0 opacity-100' :
              storyAnimationPhase === 'fade-out' ? 'transform translate-y-4 opacity-0' :
              'transform translate-y-0 opacity-100'
            }`}>
              
              {/* Story text with proper scrolling */}
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-2xl h-96 overflow-hidden flex flex-col">
                <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar text-center">
                  <pre className="whitespace-pre-wrap text-white text-base leading-relaxed font-medium">
                    {birthdayStory[currentStoryIndex]}
                  </pre>
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex justify-center gap-4 mb-4">
                {currentStoryIndex > 0 && (
                  <button
                    onClick={() => setCurrentStoryIndex(prev => Math.max(0, prev - 1))}
                    className="px-6 py-3 bg-white/20 text-white rounded-lg border border-white/30 hover:bg-white/30 transition-colors"
                  >
                    ← Previous
                  </button>
                )}
                <button
                  onClick={nextStorySegment}
                  className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg border border-white/30 hover:from-pink-700 hover:to-purple-700 transition-colors shadow-lg"
                >
                  {currentStoryIndex < birthdayStory.length - 1 ? 'Continue →' : '🌟 Complete Story'}
                </button>
                <button
                  onClick={closeBirthdayStory}
                  className="px-6 py-3 bg-white/10 text-white/70 rounded-lg border border-white/20 hover:bg-white/20 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>

              {/* Progress indicator */}
              <div className="flex justify-center">
                <div className="flex gap-2">
                  {birthdayStory.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index <= currentStoryIndex 
                          ? 'bg-pink-400' 
                          : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3D Scene with conditional weather system - only for exterior view */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Scene cameraPosition={[0, 12, 32]} enableControls enableShadows>
          {/* Weather system only for exterior view (not inside hospital) */}
          {viewMode === 'exterior' && (
            <WeatherSystem weatherType={weather} autoChange={autoWeather} />
          )}
          
          {/* Birthday Story 3D Effects */}
          {showStory && (
            <>
              {/* White Lilies floating around */}
              {showEffects.whiteLilies && (
                <>
                  {/* First realistic white lily */}
                  <group position={[-8, 2, 5]} rotation={[0, 0, 0.3]}>
                    {/* Green stem */}
                    <mesh position={[0, -0.5, 0]}>
                      <cylinderGeometry args={[0.02, 0.03, 1, 8]} />
                      <meshStandardMaterial color="#228B22" />
                    </mesh>
                    {/* 6 lily petals */}
                    {[0, 60, 120, 180, 240, 300].map((rotation, petalIndex) => (
                      <mesh
                        key={petalIndex}
                        position={[
                          Math.cos((rotation * Math.PI) / 180) * 0.2,
                          0.1,
                          Math.sin((rotation * Math.PI) / 180) * 0.2
                        ]}
                        rotation={[0.3, (rotation * Math.PI) / 180, 0]}
                      >
                        <boxGeometry args={[0.15, 0.4, 0.02]} />
                        <meshStandardMaterial color="#ffffff" side={2} />
                      </mesh>
                    ))}
                    {/* Center with stamens */}
                    <mesh position={[0, 0.15, 0]}>
                      <sphereGeometry args={[0.05]} />
                      <meshStandardMaterial color="#ffff99" />
                    </mesh>
                    {/* Orange anthers */}
                    {[0, 60, 120, 180, 240, 300].map((rotation, stamenIndex) => (
                      <mesh
                        key={stamenIndex}
                        position={[
                          Math.cos((rotation * Math.PI) / 180) * 0.08,
                          0.18,
                          Math.sin((rotation * Math.PI) / 180) * 0.08
                        ]}
                      >
                        <sphereGeometry args={[0.02]} />
                        <meshStandardMaterial color="#ff8c00" />
                      </mesh>
                    ))}
                  </group>

                  {/* Second realistic white lily */}
                  <group position={[8, 3, -4]} rotation={[0, 0, -0.2]}>
                    <mesh position={[0, -0.6, 0]}>
                      <cylinderGeometry args={[0.025, 0.035, 1.2, 8]} />
                      <meshStandardMaterial color="#228B22" />
                    </mesh>
                    {[0, 60, 120, 180, 240, 300].map((rotation, petalIndex) => (
                      <mesh
                        key={petalIndex}
                        position={[
                          Math.cos((rotation * Math.PI) / 180) * 0.25,
                          0.12,
                          Math.sin((rotation * Math.PI) / 180) * 0.25
                        ]}
                        rotation={[0.2, (rotation * Math.PI) / 180, 0]}
                      >
                        <boxGeometry args={[0.18, 0.5, 0.02]} />
                        <meshStandardMaterial color="#ffffff" side={2} />
                      </mesh>
                    ))}
                    <mesh position={[0, 0.18, 0]}>
                      <sphereGeometry args={[0.06]} />
                      <meshStandardMaterial color="#ffff99" />
                    </mesh>
                    {[0, 60, 120, 180, 240, 300].map((rotation, stamenIndex) => (
                      <mesh
                        key={stamenIndex}
                        position={[
                          Math.cos((rotation * Math.PI) / 180) * 0.09,
                          0.22,
                          Math.sin((rotation * Math.PI) / 180) * 0.09
                        ]}
                      >
                        <sphereGeometry args={[0.025]} />
                        <meshStandardMaterial color="#ff8c00" />
                      </mesh>
                    ))}
                  </group>

                  {/* Third realistic white lily */}
                  <group position={[-4, 4, -8]} rotation={[0, 0, 0.1]}>
                    <mesh position={[0, -0.55, 0]}>
                      <cylinderGeometry args={[0.022, 0.032, 1.1, 8]} />
                      <meshStandardMaterial color="#228B22" />
                    </mesh>
                    {[0, 60, 120, 180, 240, 300].map((rotation, petalIndex) => (
                      <mesh
                        key={petalIndex}
                        position={[
                          Math.cos((rotation * Math.PI) / 180) * 0.22,
                          0.11,
                          Math.sin((rotation * Math.PI) / 180) * 0.22
                        ]}
                        rotation={[0.25, (rotation * Math.PI) / 180, 0]}
                      >
                        <boxGeometry args={[0.16, 0.45, 0.02]} />
                        <meshStandardMaterial color="#ffffff" side={2} />
                      </mesh>
                    ))}
                    <mesh position={[0, 0.16, 0]}>
                      <sphereGeometry args={[0.055]} />
                      <meshStandardMaterial color="#ffff99" />
                    </mesh>
                    {[0, 60, 120, 180, 240, 300].map((rotation, stamenIndex) => (
                      <mesh
                        key={stamenIndex}
                        position={[
                          Math.cos((rotation * Math.PI) / 180) * 0.085,
                          0.20,
                          Math.sin((rotation * Math.PI) / 180) * 0.085
                        ]}
                      >
                        <sphereGeometry args={[0.022]} />
                        <meshStandardMaterial color="#ff8c00" />
                      </mesh>
                    ))}
                  </group>
                </>
              )}
              
              {/* Cat quietly wandering */}
              {showEffects.cat && (
                <group position={[6, 0.5, 8]}>
                  {/* Simple cat shape */}
                  <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1, 0.5, 0.4]} />
                    <meshStandardMaterial color="#808080" />
                  </mesh>
                  <mesh position={[0.4, 0.1, 0]}>
                    <sphereGeometry args={[0.3]} />
                    <meshStandardMaterial color="#808080" />
                  </mesh>
                  {/* Ears */}
                  <mesh position={[0.5, 0.3, -0.1]}>
                    <coneGeometry args={[0.1, 0.2, 3]} />
                    <meshStandardMaterial color="#606060" />
                  </mesh>
                  <mesh position={[0.5, 0.3, 0.1]}>
                    <coneGeometry args={[0.1, 0.2, 3]} />
                    <meshStandardMaterial color="#606060" />
                  </mesh>
                  {/* Tail */}
                  <mesh position={[-0.4, 0.1, 0]} rotation={[0, 0, 0.3]}>
                    <cylinderGeometry args={[0.05, 0.1, 0.6]} />
                    <meshStandardMaterial color="#707070" />
                  </mesh>
                </group>
              )}
              
              {/* African Grey Parrot perched */}
              {showEffects.parrot && (
                <group position={[-6, 8, -6]}>
                  {/* Parrot body - light grey */}
                  <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.4]} />
                    <meshStandardMaterial color="#a8a8a8" />
                  </mesh>
                  {/* Parrot head - lighter grey */}
                  <mesh position={[0, 0.3, 0.2]}>
                    <sphereGeometry args={[0.25]} />
                    <meshStandardMaterial color="#c0c0c0" />
                  </mesh>
                  {/* Beak - black */}
                  <mesh position={[0, 0.35, 0.4]} rotation={[0.3, 0, 0]}>
                    <coneGeometry args={[0.08, 0.15, 6]} />
                    <meshStandardMaterial color="#000000" />
                  </mesh>
                  {/* Wings - dark grey */}
                  <mesh position={[-0.3, 0, -0.1]} rotation={[0, 0, 0.5]}>
                    <boxGeometry args={[0.6, 0.1, 0.3]} />
                    <meshStandardMaterial color="#808080" />
                  </mesh>
                  <mesh position={[0.3, 0, -0.1]} rotation={[0, 0, -0.5]}>
                    <boxGeometry args={[0.6, 0.1, 0.3]} />
                    <meshStandardMaterial color="#808080" />
                  </mesh>
                  {/* Tail - bright red (characteristic of African Grey) */}
                  <mesh position={[0, -0.2, -0.4]} rotation={[0.3, 0, 0]}>
                    <boxGeometry args={[0.4, 0.1, 0.6]} />
                    <meshStandardMaterial color="#cc0000" />
                  </mesh>
                  {/* Eyes - small black dots */}
                  <mesh position={[-0.1, 0.4, 0.35]}>
                    <sphereGeometry args={[0.03]} />
                    <meshStandardMaterial color="#000000" />
                  </mesh>
                  <mesh position={[0.1, 0.4, 0.35]}>
                    <sphereGeometry args={[0.03]} />
                    <meshStandardMaterial color="#000000" />
                  </mesh>
                </group>
              )}
              
              {/* Special lighting for story mode */}
              <ambientLight intensity={0.8} color="#fff8dc" />
              <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffd700" />
            </>
          )}
          
          {viewMode === 'exterior' ? (
            <Hospital3D position={[0, 0, 0]} isNight={isNight} />
          ) : viewMode === 'interior' ? (
            <HospitalInterior3D position={[0, 0, 0]} currentRoom={currentRoom} viewMode={viewMode} isNight={isNight} />
          ) : viewMode === 'hospitalSection' ? (
            <HospitalSectionLayout isNight={isNight} floor={sectionFloor} liftUpdateTrigger={liftUpdateTrigger} />
          ) : viewMode === 'leftWing' ? (
            <LeftWingLayout isNight={isNight} floor={sectionFloor} liftUpdateTrigger={liftUpdateTrigger} />
          ) : viewMode === 'rightWing' ? (
            <RightWingLayout isNight={isNight} floor={sectionFloor} liftUpdateTrigger={liftUpdateTrigger} />
          ) : null}
        </Scene>
      </div>
    </div>
  );
}

// Hospital Section Layout: map ground and first floor rooms
function HospitalSectionLayout({ isNight, floor = 'ground', liftUpdateTrigger }: { isNight?: boolean; floor?: 'ground' | 'first' | 'second'; liftUpdateTrigger?: number }) {
  // Real-time lift simulation based on current time and floor
  const currentTime = new Date();
  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes();
  
  // Simulate dynamic lift behavior
  const isMoving = seconds % 15 < 3; // Moving for 3 seconds every 15 seconds
  const direction = minutes % 2 === 0 ? 'up' : (minutes % 3 === 0 ? 'down' : 'stopped');
  
  // Simulate occupancy based on time of day and floor
  const getOccupancy = () => {
    const hour = currentTime.getHours();
    if (hour >= 8 && hour <= 17) { // Peak hours
      return ['moderate', 'full', 'light'][floor === 'ground' ? 1 : floor === 'first' ? 0 : 2] as 'empty' | 'light' | 'moderate' | 'full';
    } else if (hour >= 6 && hour <= 22) { // Regular hours
      return ['light', 'moderate', 'empty'][seconds % 3] as 'empty' | 'light' | 'moderate' | 'full';
    }
    return 'empty'; // Night time
  };
  
  // Simulate door status
  const getDoorStatus = () => {
    if (isMoving) return 'closed';
    const cycle = seconds % 12;
    if (cycle < 2) return 'opening';
    if (cycle < 8) return 'open';
    if (cycle < 10) return 'closing';
    return 'closed';
  };
  
  // Simulate waiting queue (more during peak hours)
  const getWaitingQueue = () => {
    const hour = currentTime.getHours();
    if (hour >= 8 && hour <= 17) {
      return Math.floor((seconds % 5) + (floor === 'ground' ? 2 : 0)); // Ground floor busier
    }
    return Math.floor(seconds % 3);
  };
  
  // Simulate estimated arrival time
  const getEstimatedArrival = () => {
    if (!isMoving && floor === getDirectFloor()) return 0;
    return Math.max(5, 15 - (seconds % 15)); // 5-15 seconds
  };
  
  // Get the floor the lift is currently heading to
  const getDirectFloor = (): 'ground' | 'first' | 'second' => {
    const floorCycle = Math.floor(seconds / 15) % 3;
    return ['ground', 'first', 'second'][floorCycle] as 'ground' | 'first' | 'second';
  };
  
  // Check for maintenance mode (rarely, for demo purposes)
  const maintenanceMode = minutes === 0 && seconds < 30; // First 30 seconds of every hour
  type Vec3 = [number, number, number];
  type RoomDef = { name: string; room: HospitalRoomKey; position: Vec3; rotation: Vec3 };

  // Define rooms for each floor
  const ROOM_SPACING = 18;
  const ROOM_DEPTH = 18;
  const FLOOR_HEIGHT = 6;
  const CORRIDOR_WIDTH = 6;
  const ROOM_WIDTH = 8;

  // Floor Y positions
  const groundY = 0;
  const firstY = FLOOR_HEIGHT;
  const secondY = FLOOR_HEIGHT * 2;

  // Room definitions
  const groundFloorRooms: RoomDef[] = [
    { name: 'Reception', room: 'reception', position: [0, groundY, 0], rotation: [0, 0, 0] },
    { name: 'Waiting Area', room: 'waiting', position: [ROOM_SPACING, groundY, 0], rotation: [0, 0, 0] },
    { name: 'Emergency', room: 'emergency', position: [-ROOM_SPACING, groundY, 0], rotation: [0, 0, 0] },
    { name: 'Admin Offices', room: 'administrativeOffices', position: [-ROOM_SPACING, groundY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Back Exit', room: 'emergency', position: [0, groundY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Cafeteria', room: 'cafeteriaCanteen', position: [ROOM_SPACING, groundY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
  ];
  const firstFloorRooms: RoomDef[] = [
    { name: 'ICU', room: 'icu', position: [0, firstY, 0], rotation: [0, 0, 0] },
    { name: 'Operation', room: 'operation', position: [ROOM_SPACING, firstY, 0], rotation: [0, 0, 0] },
    { name: 'Ward', room: 'ward', position: [-ROOM_SPACING, firstY, 0], rotation: [0, 0, 0] },
    { name: 'Maternity', room: 'maternity', position: [0, firstY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Pediatric', room: 'pediatric', position: [ROOM_SPACING, firstY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Isolation', room: 'isolation', position: [-ROOM_SPACING, firstY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
  ];
  // Second floor: example rooms, adjust as needed
  const secondFloorRooms: RoomDef[] = [
    { name: 'Radiology', room: 'radiology', position: [0, secondY, 0], rotation: [0, 0, 0] },
    { name: 'Laboratory', room: 'laboratory', position: [ROOM_SPACING, secondY, 0], rotation: [0, 0, 0] },
    { name: 'Blood Bank', room: 'bloodBank', position: [-ROOM_SPACING, secondY, 0], rotation: [0, 0, 0] },
    { name: 'Physiotherapy', room: 'physiotherapyRehab', position: [0, secondY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Staff Rest', room: 'staffRest', position: [ROOM_SPACING, secondY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Mortuary', room: 'mortuary', position: [-ROOM_SPACING, secondY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
  ];

  let rooms: typeof groundFloorRooms = groundFloorRooms;
  if (floor === 'first') rooms = firstFloorRooms;
  if (floor === 'second') rooms = secondFloorRooms;

  const minZ = Math.min(...rooms.map(r => r.position[2]));
  const maxZ = Math.max(...rooms.map(r => r.position[2]));
  const corridorY = floor === 'ground' ? groundY : floor === 'first' ? firstY : secondY;
  const corridorFrontZ = maxZ + ROOM_DEPTH / 2 - CORRIDOR_WIDTH / 2;
  const corridorBackZ = minZ - ROOM_DEPTH / 2 + CORRIDOR_WIDTH / 2;
  const minX = Math.min(...rooms.map(r => r.position[0]));
  const maxX = Math.max(...rooms.map(r => r.position[0]));
  const corridorWidth = Math.abs(maxX - minX) + ROOM_WIDTH;

  function Corridor({ from, to, y = 0 }: { from: Vec3; to: Vec3; y?: number }) {
    const mid: Vec3 = [(from[0] + to[0]) / 2, y, (from[2] + to[2]) / 2];
    const dx = Math.abs(from[0] - to[0]);
    const dz = Math.abs(from[2] - to[2]);
    const corridorScale: Vec3 = [dx > dz ? dx : CORRIDOR_WIDTH, 0.1, dz > dx ? dz : CORRIDOR_WIDTH];
    return (
      <mesh position={mid} scale={corridorScale} visible={true}>
        <boxGeometry />
        <meshStandardMaterial color="#e0e0e0" opacity={0.3} transparent />
      </mesh>
    );
  }

  const ambulanceBay: { name: string; room: HospitalRoomKey; position: Vec3 } = {
    name: 'Ambulance Bay',
    room: 'ambulanceBayEntrance',
    position: [0, groundY, ROOM_SPACING + 4],
  };

  // Stairs positions beside the rooms (left and right sides of the layout)
  const STAIRS_OFFSET = 28; // Position beside the outermost rooms
  const STAIRS_Z_OFFSET = -9; // Middle of room layout (between front and back rooms)
  const leftStairsPosition: Vec3 = [-STAIRS_OFFSET, groundY, STAIRS_Z_OFFSET];
  const rightStairsPosition: Vec3 = [STAIRS_OFFSET, groundY, STAIRS_Z_OFFSET];

  return (
    <group>
      {/* Ambulance Bay at the very front (only on ground floor view) */}
      {floor === 'ground' && (
        <group position={ambulanceBay.position}>
          <HospitalInterior3D currentRoom={ambulanceBay.room} isNight={isNight} position={[0, 0, 0]} />
          <Text
            position={[0, 2.5, 0]}
            fontSize={0.7}
            color="#1976d2"
            anchorX="center"
            anchorY="middle"
          >
            {ambulanceBay.name}
          </Text>
        </group>
      )}
      {/* Corridors between all adjacent rooms */}
      {rooms.map((roomA, i, arr) =>
        arr.slice(i + 1).map((roomB, j) => {
          const isAdjacent = (roomA.position[0] === roomB.position[0] && Math.abs(roomA.position[2] - roomB.position[2]) === ROOM_DEPTH)
            || (roomA.position[2] === roomB.position[2] && Math.abs(roomA.position[0] - roomB.position[0]) === ROOM_SPACING);
          if (!isAdjacent) return null;
          return <Corridor key={roomA.name + '-' + roomB.name} from={roomA.position} to={roomB.position} y={roomA.position[1]} />;
        })
      )}
      {/* Front corridor */}
      <mesh position={[0, corridorY, corridorFrontZ]} scale={[corridorWidth, 0.1, CORRIDOR_WIDTH]} visible={true}>
        <boxGeometry />
        <meshStandardMaterial color="#e0e0e0" opacity={0.3} transparent />
      </mesh>
      {/* Back corridor */}
      <mesh position={[0, corridorY, corridorBackZ]} scale={[corridorWidth, 0.1, CORRIDOR_WIDTH]} visible={true}>
        <boxGeometry />
        <meshStandardMaterial color="#e0e0e0" opacity={0.3} transparent />
      </mesh>
      {/* Render rooms for selected floor */}
      <group>
        {rooms.map(({ name, room, position, rotation }) => (
          <group key={room + name} position={position} rotation={rotation}>
            <HospitalInterior3D currentRoom={room} isNight={isNight} position={[0, 0, 0]} />
            <Text
              position={[0, 2.5, 0]}
              fontSize={0.7}
              color="#1976d2"
              anchorX="center"
              anchorY="middle"
            >
              {name}
            </Text>
          </group>
        ))}
      </group>

      {/* Stairs - Left and Right sides beside the rooms - Conditional based on floor */}
      
      {/* Ground Floor View: Show only ground to first floor stairs */}
      {floor === 'ground' && (
        <>
          {/* Visual markers for stairs areas */}
          <Text
            position={[-STAIRS_OFFSET, groundY + 4, STAIRS_Z_OFFSET]}
            fontSize={0.5}
            color={isNight ? "#64b5f6" : "#1976d2"}
            anchorX="center"
            anchorY="middle"
          >
            LEFT STAIRS ↑
          </Text>
          <Text
            position={[STAIRS_OFFSET, groundY + 4, STAIRS_Z_OFFSET]}
            fontSize={0.5}
            color={isNight ? "#64b5f6" : "#1976d2"}
            anchorX="center"
            anchorY="middle"
          >
            RIGHT STAIRS ↑
          </Text>
          
          {/* Ground to First Floor - Left Stairs */}
          <Stairs3D
            position={leftStairsPosition}
            rotation={[0, Math.PI / 2, 0]}
            stairsDirection="left"
            floorHeight={FLOOR_HEIGHT}
            isNight={isNight}
          />
          
          {/* Ground to First Floor - Right Stairs */}
          <Stairs3D
            position={rightStairsPosition}
            rotation={[0, -Math.PI / 2, 0]}
            stairsDirection="right"
            floorHeight={FLOOR_HEIGHT}
            isNight={isNight}
          />
        </>
      )}

      {/* First Floor View: Show stairs from ground and to second floor */}
      {floor === 'first' && (
        <>
          {/* Visual markers */}
          <Text
            position={[-STAIRS_OFFSET, firstY + 4, STAIRS_Z_OFFSET]}
            fontSize={0.5}
            color={isNight ? "#64b5f6" : "#1976d2"}
            anchorX="center"
            anchorY="middle"
          >
            LEFT STAIRS ↑↓
          </Text>
          <Text
            position={[STAIRS_OFFSET, firstY + 4, STAIRS_Z_OFFSET]}
            fontSize={0.5}
            color={isNight ? "#64b5f6" : "#1976d2"}
            anchorX="center"
            anchorY="middle"
          >
            RIGHT STAIRS ↑↓
          </Text>

          {/* Show stairs coming up from ground */}
          <Stairs3D
            position={leftStairsPosition}
            rotation={[0, Math.PI / 2, 0]}
            stairsDirection="left"
            floorHeight={FLOOR_HEIGHT}
            isNight={isNight}
          />
          <Stairs3D
            position={rightStairsPosition}
            rotation={[0, -Math.PI / 2, 0]}
            stairsDirection="right"
            floorHeight={FLOOR_HEIGHT}
            isNight={isNight}
          />
          
          {/* Show stairs going to second floor */}
          <Stairs3D
            position={[leftStairsPosition[0], firstY, leftStairsPosition[2]]}
            rotation={[0, Math.PI / 2, 0]}
            stairsDirection="left"
            floorHeight={FLOOR_HEIGHT}
            isNight={isNight}
          />
          <Stairs3D
            position={[rightStairsPosition[0], firstY, rightStairsPosition[2]]}
            rotation={[0, -Math.PI / 2, 0]}
            stairsDirection="right"
            floorHeight={FLOOR_HEIGHT}
            isNight={isNight}
          />
        </>
      )}

      {/* Second Floor View: Show only stairs coming up from first floor */}
      {floor === 'second' && (
        <>
          {/* Visual markers */}
          <Text
            position={[-STAIRS_OFFSET, secondY + 4, STAIRS_Z_OFFSET]}
            fontSize={0.5}
            color={isNight ? "#64b5f6" : "#1976d2"}
            anchorX="center"
            anchorY="middle"
          >
            LEFT STAIRS ↓
          </Text>
          <Text
            position={[STAIRS_OFFSET, secondY + 4, STAIRS_Z_OFFSET]}
            fontSize={0.5}
            color={isNight ? "#64b5f6" : "#1976d2"}
            anchorX="center"
            anchorY="middle"
          >
            RIGHT STAIRS ↓
          </Text>

          {/* Show only stairs coming up from first floor */}
          <Stairs3D
            position={[leftStairsPosition[0], firstY, leftStairsPosition[2]]}
            rotation={[0, Math.PI / 2, 0]}
            stairsDirection="left"
            floorHeight={FLOOR_HEIGHT}
            isNight={isNight}
          />
          <Stairs3D
            position={[rightStairsPosition[0], firstY, rightStairsPosition[2]]}
            rotation={[0, -Math.PI / 2, 0]}
            stairsDirection="right"
            floorHeight={FLOOR_HEIGHT}
            isNight={isNight}
          />
        </>
      )}

      {/* Stair platforms for better connection between floors - Conditional based on floor */}
      
      {/* Ground Floor: Show ground level platforms and first floor landing */}
      {floor === 'ground' && (
        <>
          <mesh position={[leftStairsPosition[0], groundY + 0.1, leftStairsPosition[2]]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          <mesh position={[rightStairsPosition[0], groundY + 0.1, rightStairsPosition[2]]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
        </>
      )}
      
      {/* First Floor: Show ground, first, and second floor platforms */}
      {floor === 'first' && (
        <>
          {/* Ground floor platforms */}
          <mesh position={[leftStairsPosition[0], groundY + 0.1, leftStairsPosition[2]]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          <mesh position={[rightStairsPosition[0], groundY + 0.1, rightStairsPosition[2]]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          
          {/* First floor platforms */}
          <mesh position={[leftStairsPosition[0], firstY + 0.1, leftStairsPosition[2]]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          <mesh position={[rightStairsPosition[0], firstY + 0.1, rightStairsPosition[2]]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
        </>
      )}
      
      {/* Second Floor: Show first and second floor platforms */}
      {floor === 'second' && (
        <>
          {/* First floor platforms (base of stairs) */}
          <mesh position={[leftStairsPosition[0], firstY + 0.1, leftStairsPosition[2]]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          <mesh position={[rightStairsPosition[0], firstY + 0.1, rightStairsPosition[2]]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          
          {/* Second floor platforms */}
          <mesh position={[leftStairsPosition[0], secondY + 0.1, leftStairsPosition[2]]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          <mesh position={[rightStairsPosition[0], secondY + 0.1, rightStairsPosition[2]]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
        </>
      )}

      {/* Central Hospital Lift with Real-time Usage Data */}
      <Lift3D
        position={[0, groundY, -ROOM_DEPTH / 2]} // Center between front (Z=0) and back (Z=-18) rooms
        currentFloor={floor}
        totalFloors={3}
        isNight={isNight}
        isMoving={isMoving}
        direction={isMoving ? direction : 'stopped'}
        occupancy={getOccupancy()}
        doorStatus={getDoorStatus()}
        waitingQueue={getWaitingQueue()}
        maintenanceMode={maintenanceMode}
        estimatedArrival={getEstimatedArrival()}
      />

      {/* Lift access corridors connecting to main corridors */}
      
      {/* Ground floor lift corridor */}
      <mesh position={[0, groundY, (corridorFrontZ + (-ROOM_DEPTH / 2)) / 2]} scale={[6, 0.1, Math.abs(corridorFrontZ - (-ROOM_DEPTH / 2))]} visible={true}>
        <boxGeometry />
        <meshStandardMaterial color="#e8e8e8" opacity={0.4} transparent />
      </mesh>
      
      {/* First floor lift corridor */}
      <mesh position={[0, firstY, (corridorFrontZ + (-ROOM_DEPTH / 2)) / 2]} scale={[6, 0.1, Math.abs(corridorFrontZ - (-ROOM_DEPTH / 2))]} visible={true}>
        <boxGeometry />
        <meshStandardMaterial color="#e8e8e8" opacity={0.4} transparent />
      </mesh>
      
      {/* Second floor lift corridor */}
      <mesh position={[0, secondY, (corridorFrontZ + (-ROOM_DEPTH / 2)) / 2]} scale={[6, 0.1, Math.abs(corridorFrontZ - (-ROOM_DEPTH / 2))]} visible={true}>
        <boxGeometry />
        <meshStandardMaterial color="#e8e8e8" opacity={0.4} transparent />
      </mesh>

      {/* Lift area markers for each floor */}
      {floor === 'ground' && (
        <Text
          position={[0, groundY + 3, -ROOM_DEPTH / 2]}
          fontSize={0.6}
          color={isNight ? "#81c784" : "#4caf50"}
          anchorX="center"
          anchorY="middle"
        >
          🛗 CENTRAL LIFT
        </Text>
      )}
      
      {floor === 'first' && (
        <Text
          position={[0, firstY + 3, -ROOM_DEPTH / 2]}
          fontSize={0.6}
          color={isNight ? "#81c784" : "#4caf50"}
          anchorX="center"
          anchorY="middle"
        >
          🛗 CENTRAL LIFT
        </Text>
      )}
      
      {floor === 'second' && (
        <Text
          position={[0, secondY + 3, -ROOM_DEPTH / 2]}
          fontSize={0.6}
          color={isNight ? "#81c784" : "#4caf50"}
          anchorX="center"
          anchorY="middle"
        >
          🛗 CENTRAL LIFT
        </Text>
      )}
    </group>
  );
}

// Left Wing Layout: Floor-based with 2 rooms per floor (like Central Wing)
function LeftWingLayout({ isNight, floor = 'ground', liftUpdateTrigger }: { isNight?: boolean; floor?: 'ground' | 'first' | 'second'; liftUpdateTrigger?: number }) {
  type Vec3 = [number, number, number];
  type RoomDef = { name: string; room: HospitalRoomKey; position: Vec3; rotation: Vec3 };

  // Center the wing layout on screen (no offset)
  const CENTER_X = 0;
  const CENTER_Z = 0;
  
  // Wing layout constants
  const ROOM_SPACING = 16;
  const ROOM_DEPTH = 16;
  const FLOOR_HEIGHT = 6;
  const CORRIDOR_WIDTH = 5;

  // Floor Y positions
  const groundY = 0;
  const firstY = FLOOR_HEIGHT;
  const secondY = FLOOR_HEIGHT * 2;

  // Left Wing Room Configurations (2 rooms per floor - front and back)
  const leftWingGroundRooms: RoomDef[] = [
    { name: 'Main Pharmacy', room: 'pharmacy', position: [CENTER_X, groundY, CENTER_Z + 8], rotation: [0, 0, 0] }, // Front
    { name: 'Medical Storage', room: 'store', position: [CENTER_X, groundY, CENTER_Z - 8], rotation: [0, Math.PI, 0] }, // Back
  ];

  const leftWingFirstRooms: RoomDef[] = [
    { name: 'Generator Room', room: 'generator', position: [CENTER_X, firstY, CENTER_Z + 8], rotation: [0, 0, 0] }, // Front
    { name: 'Consultation A', room: 'consultation', position: [CENTER_X, firstY, CENTER_Z - 8], rotation: [0, Math.PI, 0] }, // Back
  ];

  const leftWingSecondRooms: RoomDef[] = [
    { name: 'Nurse Station', room: 'nurseStations', position: [CENTER_X, secondY, CENTER_Z + 8], rotation: [0, 0, 0] }, // Front
    { name: 'Chapel & Prayer', room: 'chapelPrayerRoom', position: [CENTER_X, secondY, CENTER_Z - 8], rotation: [0, Math.PI, 0] }, // Back
  ];

  let rooms: typeof leftWingGroundRooms = leftWingGroundRooms;
  if (floor === 'first') rooms = leftWingFirstRooms;
  if (floor === 'second') rooms = leftWingSecondRooms;

  const corridorY = floor === 'ground' ? groundY : floor === 'first' ? firstY : secondY;

  function Corridor({ from, to, y = 0 }: { from: Vec3; to: Vec3; y?: number }) {
    const mid: Vec3 = [(from[0] + to[0]) / 2, y, (from[2] + to[2]) / 2];
    const dx = Math.abs(from[0] - to[0]);
    const dz = Math.abs(from[2] - to[2]);
    const corridorScale: Vec3 = [dx > dz ? dx : CORRIDOR_WIDTH, 0.1, dz > dx ? dz : CORRIDOR_WIDTH];
    return (
      <mesh position={mid} scale={corridorScale} visible={true}>
        <boxGeometry />
        <meshStandardMaterial color="#e8f5e8" opacity={0.4} transparent />
      </mesh>
    );
  }

  return (
    <group>
      {/* Wing identifier */}
      <Text
        position={[CENTER_X, corridorY + 4, CENTER_Z]}
        fontSize={1.0}
        color={isNight ? "#a5d6a7" : "#388e3c"}
        anchorX="center"
        anchorY="middle"
      >
        💊 PHARMACY & SUPPORT SERVICES WING
      </Text>

      {/* Rooms */}
      {rooms.map((roomDef) => (
        <group key={roomDef.name} position={roomDef.position} rotation={roomDef.rotation}>
          <HospitalInterior3D currentRoom={roomDef.room} isNight={isNight} position={[0, 0, 0]} />
          <Text
            position={[0, 2.5, 0]}
            fontSize={0.5}
            color={isNight ? "#a5d6a7" : "#2e7d32"}
            anchorX="center"
            anchorY="middle"
          >
            {roomDef.name}
          </Text>
        </group>
      ))}

      {/* Corridor connecting front and back rooms */}
      {rooms.length === 2 && (
        <Corridor from={rooms[0].position} to={rooms[1].position} y={corridorY} />
      )}

      {/* Front corridor (in front of front room) */}
      <mesh position={[CENTER_X, corridorY, CENTER_Z + 14]} scale={[12, 0.1, 4]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#e8f5e8" opacity={0.4} transparent />
      </mesh>

      {/* Back corridor (behind back room) */}
      <mesh position={[CENTER_X, corridorY, CENTER_Z - 14]} scale={[12, 0.1, 4]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#e8f5e8" opacity={0.4} transparent />
      </mesh>

      {/* Side corridors connecting to stairs and lift */}
      {/* Left side corridor to stairs */}
      <mesh position={[CENTER_X - 6, corridorY, CENTER_Z]} scale={[8, 0.1, 4]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#e8f5e8" opacity={0.4} transparent />
      </mesh>

      {/* Right side corridor (opposite side for balance) */}
      <mesh position={[CENTER_X + 6, corridorY, CENTER_Z]} scale={[8, 0.1, 4]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#e8f5e8" opacity={0.4} transparent />
      </mesh>

      {/* Walking path connections to stairs - floor specific - aligned with extended platforms */}
      {/* Ground floor stair connection - extended to meet stair platform edge */}
      {(floor === 'ground' || floor === 'first') && (
        <mesh position={[CENTER_X - 8, groundY + 0.05, CENTER_Z]} scale={[8, 0.1, 4]} receiveShadow>
          <boxGeometry />
          <meshStandardMaterial color="#e8f5e8" opacity={0.5} transparent />
        </mesh>
      )}
      
      {/* First floor stair connection - extended to meet stair platform edge */}
      {(floor === 'first' || floor === 'second') && (
        <mesh position={[CENTER_X - 8, firstY + 0.05, CENTER_Z]} scale={[8, 0.1, 4]} receiveShadow>
          <boxGeometry />
          <meshStandardMaterial color="#e8f5e8" opacity={0.5} transparent />
        </mesh>
      )}
      
      {/* Second floor stair connection - extended to meet stair platform edge */}
      {floor === 'second' && (
        <mesh position={[CENTER_X - 8, secondY + 0.05, CENTER_Z]} scale={[8, 0.1, 4]} receiveShadow>
          <boxGeometry />
          <meshStandardMaterial color="#e8f5e8" opacity={0.5} transparent />
        </mesh>
      )}

      {/* Lift access corridor */}
      <mesh position={[CENTER_X, corridorY, CENTER_Z]} scale={[4, 0.1, 4]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#f0f8f0" opacity={0.5} transparent />
      </mesh>

      {/* Lift area markers for each floor */}
      {floor === 'ground' && (
        <Text
          position={[CENTER_X, groundY + 3, CENTER_Z]}
          fontSize={0.6}
          color={isNight ? "#81c784" : "#4caf50"}
          anchorX="center"
          anchorY="middle"
        >
          🛗 LEFT WING LIFT
        </Text>
      )}
      
      {floor === 'first' && (
        <Text
          position={[CENTER_X, firstY + 3, CENTER_Z]}
          fontSize={0.6}
          color={isNight ? "#81c784" : "#4caf50"}
          anchorX="center"
          anchorY="middle"
        >
          🛗 LEFT WING LIFT
        </Text>
      )}
      
      {floor === 'second' && (
        <Text
          position={[CENTER_X, secondY + 3, CENTER_Z]}
          fontSize={0.6}
          color={isNight ? "#81c784" : "#4caf50"}
          anchorX="center"
          anchorY="middle"
        >
          🛗 LEFT WING LIFT
        </Text>
      )}

      {/* Wing lift system - centered between front and back rooms */}
      <Lift3D
        position={[CENTER_X, groundY, CENTER_Z]}
        currentFloor={floor}
        totalFloors={3}
        isNight={isNight}
        isMoving={false}
        direction="stopped"
        occupancy="light"
        doorStatus="closed"
        waitingQueue={1}
        maintenanceMode={false}
        estimatedArrival={0}
      />

      {/* Wing stairs - conditional based on floor like central wing */}
      
      {/* Ground Floor View: Show only ground to first floor stairs */}
      {floor === 'ground' && (
        <>
          <Stairs3D
            position={[CENTER_X - 12, groundY, CENTER_Z]}
            rotation={[0, 0, 0]}
            stairsDirection="left"
            floorHeight={FLOOR_HEIGHT}
            isNight={isNight}
          />
          <Text
            position={[CENTER_X - 12, groundY + 4, CENTER_Z]}
            fontSize={0.5}
            color={isNight ? "#64b5f6" : "#1976d2"}
            anchorX="center"
            anchorY="middle"
          >
            STAIRS ↑
          </Text>
          
          {/* Ground floor platform - positioned to connect with walking path */}
          <mesh position={[CENTER_X - 12, groundY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          
          {/* Extended walking platform connecting to stairs */}
          <mesh position={[CENTER_X - 10, groundY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
        </>
      )}
      
      {/* First Floor View: Show stairs from ground and to second floor */}
      {floor === 'first' && (
        <>
          {/* Show stairs coming up from ground */}
          <Stairs3D
            position={[CENTER_X - 12, groundY, CENTER_Z]}
            rotation={[0, 0, 0]}
            stairsDirection="left"
            floorHeight={FLOOR_HEIGHT}
            isNight={isNight}
          />
          
          {/* Show stairs going to second floor */}
          <Stairs3D
            position={[CENTER_X - 12, firstY, CENTER_Z]}
            rotation={[0, 0, 0]}
            stairsDirection="left"
            floorHeight={FLOOR_HEIGHT}
            isNight={isNight}
          />
          
          <Text
            position={[CENTER_X - 12, firstY + 4, CENTER_Z]}
            fontSize={0.5}
            color={isNight ? "#64b5f6" : "#1976d2"}
            anchorX="center"
            anchorY="middle"
          >
            STAIRS ↑↓
          </Text>
          
          {/* Ground and first floor platforms - positioned to connect seamlessly */}
          <mesh position={[CENTER_X - 12, groundY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          <mesh position={[CENTER_X - 12, firstY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          
          {/* Extended walking platforms connecting to stairs */}
          <mesh position={[CENTER_X - 10, groundY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          <mesh position={[CENTER_X - 10, firstY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
        </>
      )}
      
      {/* Second Floor View: Show stairs coming up from first floor */}
      {floor === 'second' && (
        <>
          {/* Show stairs coming up from first floor (positioned at first floor level) */}
          <Stairs3D
            position={[CENTER_X - 12, firstY, CENTER_Z]}
            rotation={[0, 0, 0]}
            stairsDirection="left"
            floorHeight={FLOOR_HEIGHT}
            isNight={isNight}
          />
          
          <Text
            position={[CENTER_X - 12, secondY + 4, CENTER_Z]}
            fontSize={0.5}
            color={isNight ? "#64b5f6" : "#1976d2"}
            anchorX="center"
            anchorY="middle"
          >
            STAIRS ↓
          </Text>
          
          {/* First and second floor platforms - positioned to connect seamlessly */}
          <mesh position={[CENTER_X - 12, firstY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          <mesh position={[CENTER_X - 12, secondY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          
          {/* Extended walking platforms connecting to stairs */}
          <mesh position={[CENTER_X - 10, firstY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          <mesh position={[CENTER_X - 10, secondY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
        </>
      )}
    </group>
  );
}

// Original Left Wing 3D Layout (not used anymore, keeping for reference)
function LeftWingLayout3D({ isNight, floor = 'ground', liftUpdateTrigger }: { isNight?: boolean; floor?: 'ground' | 'first' | 'second'; liftUpdateTrigger?: number }) {
  type Vec3 = [number, number, number];
  type RoomDef = { name: string; room: HospitalRoomKey; position: Vec3; rotation: Vec3 };

  // Wing positioning - offset to the left of main building
  const WING_OFFSET_X = -45;
  const WING_OFFSET_Z = 0;
  
  // Wing layout constants
  const ROOM_SPACING = 16;
  const ROOM_DEPTH = 16;
  const FLOOR_HEIGHT = 6;
  const CORRIDOR_WIDTH = 5;

  // Floor Y positions
  const groundY = 0;
  const firstY = FLOOR_HEIGHT;
  const secondY = FLOOR_HEIGHT * 2;

  // Left Wing Room Configurations (Support Services Focus - NO DUPLICATES)
  const leftWingGroundRooms: RoomDef[] = [
    { name: 'Main Pharmacy', room: 'pharmacy', position: [WING_OFFSET_X, groundY, WING_OFFSET_Z], rotation: [0, 0, 0] },
    { name: 'Medical Storage', room: 'store', position: [WING_OFFSET_X + ROOM_SPACING, groundY, WING_OFFSET_Z], rotation: [0, 0, 0] },
    { name: 'Generator Room', room: 'generator', position: [WING_OFFSET_X - ROOM_SPACING, groundY, WING_OFFSET_Z], rotation: [0, 0, 0] },
    { name: 'Consultation Room A', room: 'consultation', position: [WING_OFFSET_X, groundY, WING_OFFSET_Z - ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Consultation Room B', room: 'consultation', position: [WING_OFFSET_X + ROOM_SPACING, groundY, WING_OFFSET_Z - ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Equipment Storage', room: 'store', position: [WING_OFFSET_X - ROOM_SPACING, groundY, WING_OFFSET_Z - ROOM_DEPTH], rotation: [0, Math.PI, 0] },
  ];

  const leftWingFirstRooms: RoomDef[] = [
    { name: 'Pharmacy Lab', room: 'pharmacy', position: [WING_OFFSET_X, firstY, WING_OFFSET_Z], rotation: [0, 0, 0] },
    { name: 'Recovery Room A', room: 'recovery', position: [WING_OFFSET_X + ROOM_SPACING, firstY, WING_OFFSET_Z], rotation: [0, 0, 0] },
    { name: 'Recovery Room B', room: 'recovery', position: [WING_OFFSET_X - ROOM_SPACING, firstY, WING_OFFSET_Z], rotation: [0, 0, 0] },
    { name: 'Nurse Station 1', room: 'nurseStations', position: [WING_OFFSET_X, firstY, WING_OFFSET_Z - ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Consultation Room C', room: 'consultation', position: [WING_OFFSET_X + ROOM_SPACING, firstY, WING_OFFSET_Z - ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Consultation Room D', room: 'consultation', position: [WING_OFFSET_X - ROOM_SPACING, firstY, WING_OFFSET_Z - ROOM_DEPTH], rotation: [0, Math.PI, 0] },
  ];

  const leftWingSecondRooms: RoomDef[] = [
    { name: 'Pharmacy Storage', room: 'store', position: [WING_OFFSET_X, secondY, WING_OFFSET_Z], rotation: [0, 0, 0] },
    { name: 'Recovery Suite', room: 'recovery', position: [WING_OFFSET_X + ROOM_SPACING, secondY, WING_OFFSET_Z], rotation: [0, 0, 0] },
    { name: 'Nurse Station 2', room: 'nurseStations', position: [WING_OFFSET_X - ROOM_SPACING, secondY, WING_OFFSET_Z], rotation: [0, 0, 0] },
    { name: 'Consultation Suite', room: 'consultation', position: [WING_OFFSET_X, secondY, WING_OFFSET_Z - ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Chapel & Prayer', room: 'chapelPrayerRoom', position: [WING_OFFSET_X + ROOM_SPACING, secondY, WING_OFFSET_Z - ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Supply Storage', room: 'store', position: [WING_OFFSET_X - ROOM_SPACING, secondY, WING_OFFSET_Z - ROOM_DEPTH], rotation: [0, Math.PI, 0] },
  ];

  let rooms: typeof leftWingGroundRooms = leftWingGroundRooms;
  if (floor === 'first') rooms = leftWingFirstRooms;
  if (floor === 'second') rooms = leftWingSecondRooms;

  const corridorY = floor === 'ground' ? groundY : floor === 'first' ? firstY : secondY;

  function Corridor({ from, to, y = 0 }: { from: Vec3; to: Vec3; y?: number }) {
    const mid: Vec3 = [(from[0] + to[0]) / 2, y, (from[2] + to[2]) / 2];
    const dx = Math.abs(from[0] - to[0]);
    const dz = Math.abs(from[2] - to[2]);
    const corridorScale: Vec3 = [dx > dz ? dx : CORRIDOR_WIDTH, 0.1, dz > dx ? dz : CORRIDOR_WIDTH];
    return (
      <mesh position={mid} scale={corridorScale} visible={true}>
        <boxGeometry />
        <meshStandardMaterial color="#e8f5e8" opacity={0.4} transparent />
      </mesh>
    );
  }

  return (
    <group>
      {/* Wing identifier */}
      <Text
        position={[WING_OFFSET_X, corridorY + 4, WING_OFFSET_Z - ROOM_DEPTH / 2]}
        fontSize={1.0}
        color={isNight ? "#a5d6a7" : "#388e3c"}
        anchorX="center"
        anchorY="middle"
      >
        💊 PHARMACY & SUPPORT SERVICES WING
      </Text>

      {/* Rooms */}
      {rooms.map((roomDef) => (
        <group key={roomDef.name} position={roomDef.position} rotation={roomDef.rotation}>
          <HospitalInterior3D currentRoom={roomDef.room} isNight={isNight} position={[0, 0, 0]} />
          <Text
            position={[0, 2.5, 0]}
            fontSize={0.5}
            color={isNight ? "#a5d6a7" : "#2e7d32"}
            anchorX="center"
            anchorY="middle"
          >
            {roomDef.name}
          </Text>
        </group>
      ))}

      {/* Corridors connecting rooms */}
      {rooms.map((roomA, i, arr) =>
        arr.slice(i + 1).map((roomB, j) => {
          const isAdjacent = (roomA.position[0] === roomB.position[0] && Math.abs(roomA.position[2] - roomB.position[2]) === ROOM_DEPTH)
            || (roomA.position[2] === roomB.position[2] && Math.abs(roomA.position[0] - roomB.position[0]) === ROOM_SPACING);
          if (!isAdjacent) return null;
          return <Corridor key={roomA.name + '-' + roomB.name} from={roomA.position} to={roomB.position} y={roomA.position[1]} />;
        })
      )}

      {/* Wing lift system */}
      <Lift3D
        position={[WING_OFFSET_X, groundY, WING_OFFSET_Z - ROOM_DEPTH / 2]}
        currentFloor={floor}
        totalFloors={3}
        isNight={isNight}
        isMoving={false}
        direction="stopped"
        occupancy="light"
        doorStatus="closed"
        waitingQueue={1}
        maintenanceMode={false}
        estimatedArrival={0}
      />

      {/* Wing stairs */}
      <Stairs3D
        position={[WING_OFFSET_X - 22, groundY, WING_OFFSET_Z - ROOM_DEPTH / 2]}
        rotation={[0, 0, 0]}
        stairsDirection="left"
        floorHeight={FLOOR_HEIGHT}
        isNight={isNight}
      />
    </group>
  );
}

// Right Wing Layout: Floor-based with 2 rooms per floor (like Central Wing)
function RightWingLayout({ isNight, floor = 'ground', liftUpdateTrigger }: { isNight?: boolean; floor?: 'ground' | 'first' | 'second'; liftUpdateTrigger?: number }) {
  type Vec3 = [number, number, number];
  type RoomDef = { name: string; room: HospitalRoomKey; position: Vec3; rotation: Vec3 };

  // Center the wing layout on screen (no offset)
  const CENTER_X = 0;
  const CENTER_Z = 0;
  
  // Wing layout constants
  const ROOM_SPACING = 16;
  const ROOM_DEPTH = 16;
  const FLOOR_HEIGHT = 6;
  const CORRIDOR_WIDTH = 5;

  // Floor Y positions
  const groundY = 0;
  const firstY = FLOOR_HEIGHT;
  const secondY = FLOOR_HEIGHT * 2;

  // Right Wing Room Configurations (Patient Care Support - NO DUPLICATES)
  const rightWingGroundRooms: RoomDef[] = [
    { name: 'Consultation Hub', room: 'consultation', position: [CENTER_X, groundY, CENTER_Z + 8], rotation: [0, 0, 0] }, // Front
    { name: 'Public Bathrooms', room: 'bathroomRestroom', position: [CENTER_X + ROOM_SPACING, groundY, CENTER_Z + 8], rotation: [0, 0, 0] }, // Back
    { name: 'Recovery Center', room: 'recovery', position: [CENTER_X - ROOM_SPACING, groundY, CENTER_Z + 8], rotation: [0, 0, 0] }, // Back
    { name: 'Nurse Station', room: 'nurseStations', position: [CENTER_X, groundY, CENTER_Z - 8], rotation: [0, Math.PI, 0] }, // Back
    { name: 'Family Bathrooms', room: 'bathroomRestroom', position: [CENTER_X + ROOM_SPACING, groundY, CENTER_Z - 8], rotation: [0, Math.PI, 0] }, // Back
    { name: 'Linen Storage', room: 'store', position: [CENTER_X - ROOM_SPACING, groundY, CENTER_Z - 8], rotation: [0, Math.PI, 0] }, // Back
  ];

  const rightWingFirstRooms: RoomDef[] = [
    { name: 'Recovery Ward A', room: 'recovery', position: [CENTER_X, firstY, CENTER_Z + 8], rotation: [0, 0, 0] }, // Front
    { name: 'Recovery Ward B', room: 'recovery', position: [CENTER_X + ROOM_SPACING, firstY, CENTER_Z + 8], rotation: [0, 0, 0] }, // Back
    { name: 'Patient Bathrooms', room: 'bathroomRestroom', position: [CENTER_X - ROOM_SPACING, firstY, CENTER_Z + 8], rotation: [0, 0, 0] }, // Back
    { name: 'Nurse Station 3', room: 'nurseStations', position: [CENTER_X, firstY, CENTER_Z - 8], rotation: [0, Math.PI, 0] }, // Back
    { name: 'Spiritual Care', room: 'chapelPrayerRoom', position: [CENTER_X + ROOM_SPACING, firstY, CENTER_Z - 8], rotation: [0, Math.PI, 0] }, // Back
    { name: 'Consultation Room E', room: 'consultation', position: [CENTER_X - ROOM_SPACING, firstY, CENTER_Z - 8], rotation: [0, Math.PI, 0] }, // Back
  ];

  const rightWingSecondRooms: RoomDef[] = [
    { name: 'Recovery Suites', room: 'recovery', position: [CENTER_X, secondY, CENTER_Z + 8], rotation: [0, 0, 0] }, // Front
    { name: 'Private Bathrooms', room: 'bathroomRestroom', position: [CENTER_X + ROOM_SPACING, secondY, CENTER_Z + 8], rotation: [0, 0, 0] }, // Back
    { name: 'Nurse Station 4', room: 'nurseStations', position: [CENTER_X - ROOM_SPACING, secondY, CENTER_Z + 8], rotation: [0, 0, 0] }, // Back
    { name: 'Specialty Consultation', room: 'consultation', position: [CENTER_X, secondY, CENTER_Z - 8], rotation: [0, Math.PI, 0] }, // Back
    { name: 'Meditation Room', room: 'chapelPrayerRoom', position: [CENTER_X + ROOM_SPACING, secondY, CENTER_Z - 8], rotation: [0, Math.PI, 0] }, // Back
    { name: 'Patient Storage', room: 'store', position: [CENTER_X - ROOM_SPACING, secondY, CENTER_Z - 8], rotation: [0, Math.PI, 0] }, // Back
  ];

  let rooms: typeof rightWingGroundRooms = rightWingGroundRooms;
  if (floor === 'first') rooms = rightWingFirstRooms;
  if (floor === 'second') rooms = rightWingSecondRooms;

  const corridorY = floor === 'ground' ? groundY : floor === 'first' ? firstY : secondY;

  function Corridor({ from, to, y = 0 }: { from: Vec3; to: Vec3; y?: number }) {
    const mid: Vec3 = [(from[0] + to[0]) / 2, y, (from[2] + to[2]) / 2];
    const dx = Math.abs(from[0] - to[0]);
    const dz = Math.abs(from[2] - to[2]);
    const corridorScale: Vec3 = [dx > dz ? dx : CORRIDOR_WIDTH, 0.1, dz > dx ? dz : CORRIDOR_WIDTH];
    return (
      <mesh position={mid} scale={corridorScale} visible={true}>
        <boxGeometry />
        <meshStandardMaterial color="#fff3e0" opacity={0.4} transparent />
      </mesh>
    );
  }

  return (
    <group>
      {/* Wing identifier */}
      <Text
        position={[CENTER_X, corridorY + 4, CENTER_Z]}
        fontSize={1.0}
        color={isNight ? "#ffcc80" : "#e65100"}
        anchorX="center"
        anchorY="middle"
      >
        🏥 PATIENT CARE & RECOVERY WING
      </Text>

      {/* Rooms */}
      {rooms.map((roomDef) => (
        <group key={roomDef.name} position={roomDef.position} rotation={roomDef.rotation}>
          <HospitalInterior3D currentRoom={roomDef.room} isNight={isNight} position={[0, 0, 0]} />
          <Text
            position={[0, 2.5, 0]}
            fontSize={0.5}
            color={isNight ? "#ffcc80" : "#bf360c"}
            anchorX="center"
            anchorY="middle"
          >
            {roomDef.name}
          </Text>
        </group>
      ))}

      {/* Corridor connecting front and back rooms */}
      {rooms.length === 2 && (
        <Corridor from={rooms[0].position} to={rooms[1].position} y={corridorY} />
      )}

      {/* Front corridor (in front of front room) */}
      <mesh position={[CENTER_X, corridorY, CENTER_Z + 14]} scale={[12, 0.1, 4]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#fff3e0" opacity={0.4} transparent />
      </mesh>

      {/* Back corridor (behind back room) */}
      <mesh position={[CENTER_X, corridorY, CENTER_Z - 14]} scale={[12, 0.1, 4]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#fff3e0" opacity={0.4} transparent />
      </mesh>

      {/* Side corridors connecting to stairs and lift */}
      {/* Right side corridor to stairs */}
      <mesh position={[CENTER_X + 6, corridorY, CENTER_Z]} scale={[8, 0.1, 4]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#fff3e0" opacity={0.4} transparent />
      </mesh>

      {/* Left side corridor (opposite side for balance) */}
      <mesh position={[CENTER_X - 6, corridorY, CENTER_Z]} scale={[8, 0.1, 4]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#fff3e0" opacity={0.4} transparent />
      </mesh>

      {/* Walking path connections to stairs - floor specific - aligned with extended platforms */}
      {/* Ground floor stair connection - extended to meet stair platform edge */}
      {(floor === 'ground' || floor === 'first') && (
        <mesh position={[CENTER_X + 8, groundY + 0.05, CENTER_Z]} scale={[8, 0.1, 4]} receiveShadow>
          <boxGeometry />
          <meshStandardMaterial color="#fff3e0" opacity={0.5} transparent />
        </mesh>
      )}
      
      {/* First floor stair connection - extended to meet stair platform edge */}
      {(floor === 'first' || floor === 'second') && (
        <mesh position={[CENTER_X + 8, firstY + 0.05, CENTER_Z]} scale={[8, 0.1, 4]} receiveShadow>
          <boxGeometry />
          <meshStandardMaterial color="#fff3e0" opacity={0.5} transparent />
        </mesh>
      )}
      
      {/* Second floor stair connection - extended to meet stair platform edge */}
      {floor === 'second' && (
        <mesh position={[CENTER_X + 8, secondY + 0.05, CENTER_Z]} scale={[8, 0.1, 4]} receiveShadow>
          <boxGeometry />
          <meshStandardMaterial color="#fff3e0" opacity={0.5} transparent />
        </mesh>
      )}

      {/* Lift access corridor */}
      <mesh position={[CENTER_X, corridorY, CENTER_Z]} scale={[4, 0.1, 4]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="#fff8f0" opacity={0.5} transparent />
      </mesh>

      {/* Lift area markers for each floor */}
      {floor === 'ground' && (
        <Text
          position={[CENTER_X, groundY + 3, CENTER_Z]}
          fontSize={0.6}
          color={isNight ? "#81c784" : "#4caf50"}
          anchorX="center"
          anchorY="middle"
        >
          🛗 RIGHT WING LIFT
        </Text>
      )}
      
      {floor === 'first' && (
        <Text
          position={[CENTER_X, firstY + 3, CENTER_Z]}
          fontSize={0.6}
          color={isNight ? "#81c784" : "#4caf50"}
          anchorX="center"
          anchorY="middle"
        >
          🛗 RIGHT WING LIFT
        </Text>
      )}
      
      {floor === 'second' && (
        <Text
          position={[CENTER_X, secondY + 3, CENTER_Z]}
          fontSize={0.6}
          color={isNight ? "#81c784" : "#4caf50"}
          anchorX="center"
          anchorY="middle"
        >
          🛗 RIGHT WING LIFT
        </Text>
      )}

      {/* Wing lift system - centered between front and back rooms */}
      <Lift3D
        position={[CENTER_X, groundY, CENTER_Z]}
        currentFloor={floor}
        totalFloors={3}
        isNight={isNight}
        isMoving={false}
        direction="stopped"
        occupancy="moderate"
        doorStatus="open"
        waitingQueue={2}
        maintenanceMode={false}
        estimatedArrival={0}
      />

      {/* Wing stairs - conditional based on floor like central wing */}
      
      {/* Ground Floor View: Show only ground to first floor stairs */}
      {floor === 'ground' && (
        <>
          <Stairs3D
            position={[CENTER_X + 12, groundY, CENTER_Z]}
            rotation={[0, 0, 0]}
            stairsDirection="right"
            floorHeight={FLOOR_HEIGHT}
            isNight={isNight}
          />
          <Text
            position={[CENTER_X + 12, groundY + 4, CENTER_Z]}
            fontSize={0.5}
            color={isNight ? "#64b5f6" : "#1976d2"}
            anchorX="center"
            anchorY="middle"
          >
            STAIRS ↑
          </Text>
          
          {/* Ground floor platform - positioned to connect with walking path */}
          <mesh position={[CENTER_X + 12, groundY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          
          {/* Extended walking platform connecting to stairs */}
          <mesh position={[CENTER_X + 10, groundY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
        </>
      )}
      
      {/* First Floor View: Show stairs from ground and to second floor */}
      {floor === 'first' && (
        <>
          {/* Show stairs coming up from ground */}
          <Stairs3D
            position={[CENTER_X + 12, groundY, CENTER_Z]}
            rotation={[0, 0, 0]}
            stairsDirection="right"
            floorHeight={FLOOR_HEIGHT}
            isNight={isNight}
          />
          
          {/* Show stairs going to second floor */}
          <Stairs3D
            position={[CENTER_X + 12, firstY, CENTER_Z]}
            rotation={[0, 0, 0]}
            stairsDirection="right"
            floorHeight={FLOOR_HEIGHT}
            isNight={isNight}
          />
          
          <Text
            position={[CENTER_X + 12, firstY + 4, CENTER_Z]}
            fontSize={0.5}
            color={isNight ? "#64b5f6" : "#1976d2"}
            anchorX="center"
            anchorY="middle"
          >
            STAIRS ↑↓
          </Text>
          
          {/* Ground and first floor platforms - positioned to connect seamlessly */}
          <mesh position={[CENTER_X + 12, groundY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          <mesh position={[CENTER_X + 12, firstY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          
          {/* Extended walking platforms connecting to stairs */}
          <mesh position={[CENTER_X + 10, groundY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          <mesh position={[CENTER_X + 10, firstY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
        </>
      )}
      
      {/* Second Floor View: Show stairs coming up from first floor */}
      {floor === 'second' && (
        <>
          {/* Show stairs coming up from first floor (positioned at first floor level) */}
          <Stairs3D
            position={[CENTER_X + 12, firstY, CENTER_Z]}
            rotation={[0, 0, 0]}
            stairsDirection="right"
            floorHeight={FLOOR_HEIGHT}
            isNight={isNight}
          />
          
          <Text
            position={[CENTER_X + 12, secondY + 4, CENTER_Z]}
            fontSize={0.5}
            color={isNight ? "#64b5f6" : "#1976d2"}
            anchorX="center"
            anchorY="middle"
          >
            STAIRS ↓
          </Text>
          
          {/* First and second floor platforms - positioned to connect seamlessly */}
          <mesh position={[CENTER_X + 12, firstY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          <mesh position={[CENTER_X + 12, secondY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          
          {/* Extended walking platforms connecting to stairs */}
          <mesh position={[CENTER_X + 10, firstY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
          <mesh position={[CENTER_X + 10, secondY + 0.1, CENTER_Z]} receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial color="#6a7c89" />
          </mesh>
        </>
      )}
    </group>
  );
}

// Original Right Wing 3D Layout (not used anymore, keeping for reference) 
function RightWingLayout3D({ isNight, floor = 'ground', liftUpdateTrigger }: { isNight?: boolean; floor?: 'ground' | 'first' | 'second'; liftUpdateTrigger?: number }) {
  type Vec3 = [number, number, number];
  type RoomDef = { name: string; room: HospitalRoomKey; position: Vec3; rotation: Vec3 };

  // Wing positioning - offset to the right of main building
  const WING_OFFSET_X = 45;
  const WING_OFFSET_Z = 0;
  
  // Wing layout constants
  const ROOM_SPACING = 16;
  const ROOM_DEPTH = 16;
  const FLOOR_HEIGHT = 6;
  const CORRIDOR_WIDTH = 5;

  // Floor Y positions
  const groundY = 0;
  const firstY = FLOOR_HEIGHT;
  const secondY = FLOOR_HEIGHT * 2;

  // Right Wing Room Configurations (Patient Care Support - NO DUPLICATES)
  const rightWingGroundRooms: RoomDef[] = [
    { name: 'Consultation Hub', room: 'consultation', position: [WING_OFFSET_X, groundY, WING_OFFSET_Z], rotation: [0, 0, 0] },
    { name: 'Public Bathrooms', room: 'bathroomRestroom', position: [WING_OFFSET_X + ROOM_SPACING, groundY, WING_OFFSET_Z], rotation: [0, 0, 0] },
    { name: 'Recovery Center', room: 'recovery', position: [WING_OFFSET_X - ROOM_SPACING, groundY, WING_OFFSET_Z], rotation: [0, 0, 0] },
    { name: 'Nurse Station', room: 'nurseStations', position: [WING_OFFSET_X, groundY, WING_OFFSET_Z - ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Family Bathrooms', room: 'bathroomRestroom', position: [WING_OFFSET_X + ROOM_SPACING, groundY, WING_OFFSET_Z - ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Linen Storage', room: 'store', position: [WING_OFFSET_X - ROOM_SPACING, groundY, WING_OFFSET_Z - ROOM_DEPTH], rotation: [0, Math.PI, 0] },
  ];

  const rightWingFirstRooms: RoomDef[] = [
    { name: 'Recovery Ward A', room: 'recovery', position: [WING_OFFSET_X, firstY, WING_OFFSET_Z + 8], rotation: [0, 0, 0] },
    { name: 'Recovery Ward B', room: 'recovery', position: [WING_OFFSET_X + ROOM_SPACING, firstY, WING_OFFSET_Z + 8], rotation: [0, 0, 0] },
    { name: 'Patient Bathrooms', room: 'bathroomRestroom', position: [WING_OFFSET_X - ROOM_SPACING, firstY, WING_OFFSET_Z + 8], rotation: [0, 0, 0] },
    { name: 'Nurse Station 3', room: 'nurseStations', position: [WING_OFFSET_X, firstY, WING_OFFSET_Z - 8], rotation: [0, Math.PI, 0] },
    { name: 'Spiritual Care', room: 'chapelPrayerRoom', position: [WING_OFFSET_X + ROOM_SPACING, firstY, WING_OFFSET_Z - 8], rotation: [0, Math.PI, 0] },
    { name: 'Consultation Room E', room: 'consultation', position: [WING_OFFSET_X - ROOM_SPACING, firstY, WING_OFFSET_Z - 8], rotation: [0, Math.PI, 0] },
  ];

  const rightWingSecondRooms: RoomDef[] = [
    { name: 'Recovery Suites', room: 'recovery', position: [WING_OFFSET_X, secondY, WING_OFFSET_Z + 8], rotation: [0, 0, 0] },
    { name: 'Private Bathrooms', room: 'bathroomRestroom', position: [WING_OFFSET_X + ROOM_SPACING, secondY, WING_OFFSET_Z + 8], rotation: [0, 0, 0] },
    { name: 'Nurse Station 4', room: 'nurseStations', position: [WING_OFFSET_X - ROOM_SPACING, secondY, WING_OFFSET_Z + 8], rotation: [0, 0, 0] },
    { name: 'Specialty Consultation', room: 'consultation', position: [WING_OFFSET_X, secondY, WING_OFFSET_Z - 8], rotation: [0, Math.PI, 0] },
    { name: 'Meditation Room', room: 'chapelPrayerRoom', position: [WING_OFFSET_X + ROOM_SPACING, secondY, WING_OFFSET_Z - 8], rotation: [0, Math.PI, 0] },
    { name: 'Patient Storage', room: 'store', position: [WING_OFFSET_X - ROOM_SPACING, secondY, WING_OFFSET_Z - 8], rotation: [0, Math.PI, 0] },
  ];

  let rooms: typeof rightWingGroundRooms = rightWingGroundRooms;
  if (floor === 'first') rooms = rightWingFirstRooms;
  if (floor === 'second') rooms = rightWingSecondRooms;

  const corridorY = floor === 'ground' ? groundY : floor === 'first' ? firstY : secondY;

  function Corridor({ from, to, y = 0 }: { from: Vec3; to: Vec3; y?: number }) {
    const mid: Vec3 = [(from[0] + to[0]) / 2, y, (from[2] + to[2]) / 2];
    const dx = Math.abs(from[0] - to[0]);
    const dz = Math.abs(from[2] - to[2]);
    const corridorScale: Vec3 = [dx > dz ? dx : CORRIDOR_WIDTH, 0.1, dz > dx ? dz : CORRIDOR_WIDTH];
    return (
      <mesh position={mid} scale={corridorScale} visible={true}>
        <boxGeometry />
        <meshStandardMaterial color="#fff3e0" opacity={0.4} transparent />
      </mesh>
    );
  }

  return (
    <group>
      {/* Wing identifier */}
      <Text
        position={[WING_OFFSET_X, corridorY + 4, WING_OFFSET_Z - ROOM_DEPTH / 2]}
        fontSize={1.0}
        color={isNight ? "#ffcc80" : "#e65100"}
        anchorX="center"
        anchorY="middle"
      >
        🏥 PATIENT CARE & RECOVERY WING
      </Text>

      {/* Rooms */}
      {rooms.map((roomDef) => (
        <group key={roomDef.name} position={roomDef.position} rotation={roomDef.rotation}>
          <HospitalInterior3D currentRoom={roomDef.room} isNight={isNight} position={[0, 0, 0]} />
          <Text
            position={[0, 2.5, 0]}
            fontSize={0.5}
            color={isNight ? "#ffcc80" : "#bf360c"}
            anchorX="center"
            anchorY="middle"
          >
            {roomDef.name}
          </Text>
        </group>
      ))}

      {/* Corridors connecting rooms */}
      {rooms.map((roomA, i, arr) =>
        arr.slice(i + 1).map((roomB, j) => {
          const isAdjacent = (roomA.position[0] === roomB.position[0] && Math.abs(roomA.position[2] - roomB.position[2]) === ROOM_DEPTH)
            || (roomA.position[2] === roomB.position[2] && Math.abs(roomA.position[0] - roomB.position[0]) === ROOM_SPACING);
          if (!isAdjacent) return null;
          return <Corridor key={roomA.name + '-' + roomB.name} from={roomA.position} to={roomB.position} y={roomA.position[1]} />;
        })
      )}

      {/* Wing lift system */}
      <Lift3D
        position={[WING_OFFSET_X, groundY, WING_OFFSET_Z - ROOM_DEPTH / 2]}
        currentFloor={floor}
        totalFloors={3}
        isNight={isNight}
        isMoving={false}
        direction="stopped"
        occupancy="moderate"
        doorStatus="open"
        waitingQueue={2}
        maintenanceMode={false}
        estimatedArrival={0}
      />

      {/* Wing stairs */}
      <Stairs3D
        position={[WING_OFFSET_X + 22, groundY, WING_OFFSET_Z - ROOM_DEPTH / 2]}
        rotation={[0, 0, 0]}
        stairsDirection="right"
        floorHeight={FLOOR_HEIGHT}
        isNight={isNight}
      />
    </group>
  );
}