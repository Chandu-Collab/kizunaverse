
// BirthdayZone cleaned up for new implementation


import dynamic from "next/dynamic";
import React, { Suspense, useState } from "react";
const Hospital3D = dynamic(() => import("@/components/3d/Hospital3D"), { ssr: false });
const HospitalInterior3D = dynamic(() => import("@/components/3d/HospitalInterior3D"), { ssr: false });

import Scene from "@/components/3d/Scene";
import ParticleBackground from "@/components/ui/ParticleBackground";
import WeatherControls from "@/components/ui/WeatherControls";
import WeatherSystem from "@/components/3d/weather/WeatherSystem";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

type WeatherType = 'sunny' | 'rainy' | 'cloudy' | 'monsoon' | 'winter';

export default function BirthdayZone() {
  // Weather state management (pattern from YourSpace)
  const [weather, setWeather] = useState<WeatherType>('sunny');
  const [autoWeather, setAutoWeather] = useState(true);
  const { isNight, toggleTheme } = useTheme();
  const [isAutoCycle, setIsAutoCycle] = useState(true);


  // Hospital view state
  const [viewMode, setViewMode] = useState<'exterior' | 'interior'>('exterior');
  const [currentRoom, setCurrentRoom] = useState<
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
    | 'chapelPrayerRoom'
  >('exterior');

  // Handler for WeatherControls
  const handleWeatherChange = (newWeather: WeatherType) => {
    setWeather(newWeather);
    setAutoWeather(false);
  };
  const handleToggleAuto = () => setAutoWeather((prev) => !prev);

  // Auto day/night cycle every 30s
  React.useEffect(() => {
    if (!isAutoCycle) return;
    const interval = setInterval(() => {
      toggleTheme();
    }, 30000);
    return () => clearInterval(interval);
  }, [isAutoCycle, toggleTheme]);

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

      {/* Particle background for ambiance, responds to weather and night */}
      <ParticleBackground weather={weather} isNight={isNight} />

      {/* Weather controls UI */}
      <WeatherControls
        onWeatherChange={handleWeatherChange}
        currentWeather={weather}
        autoWeather={autoWeather}
        onToggleAuto={handleToggleAuto}
      />

      {/* Hospital 3D View Controls */}
      <div className="absolute top-4 left-4 z-40">
        <div className="bg-black/60 rounded-lg p-4 flex flex-col gap-2 shadow">
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
          </div>
          {viewMode === 'interior' && (
            <div className="grid grid-cols-3 gap-1 text-xs">
                <button onClick={() => setCurrentRoom('cafeteriaCanteen')} className={`p-1 rounded ${currentRoom==='cafeteriaCanteen'?'bg-yellow-500/50 text-white border border-yellow-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Cafeteria/Canteen</button>
                <button onClick={() => setCurrentRoom('administrativeOffices')} className={`p-1 rounded ${currentRoom==='administrativeOffices'?'bg-gray-700/50 text-white border border-gray-400':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Admin Offices</button>
                <button onClick={() => setCurrentRoom('ambulanceBayEntrance')} className={`p-1 rounded ${currentRoom==='ambulanceBayEntrance'?'bg-red-700/50 text-white border border-red-400':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Ambulance Bay</button>
                <button onClick={() => setCurrentRoom('physiotherapyRehab')} className={`p-1 rounded ${currentRoom==='physiotherapyRehab'?'bg-green-700/50 text-white border border-green-400':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Physiotherapy/Rehab</button>
                <button onClick={() => setCurrentRoom('bloodBank')} className={`p-1 rounded ${currentRoom==='bloodBank'?'bg-red-800/50 text-white border border-red-400':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Blood Bank</button>
                <button onClick={() => setCurrentRoom('mortuary')} className={`p-1 rounded ${currentRoom==='mortuary'?'bg-gray-900/50 text-white border border-gray-400':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Mortuary</button>
                <button onClick={() => setCurrentRoom('chapelPrayerRoom')} className={`p-1 rounded ${currentRoom==='chapelPrayerRoom'?'bg-purple-900/50 text-white border border-purple-400':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Chapel/Prayer Room</button>
              <button onClick={() => setCurrentRoom('reception')} className={`p-1 rounded ${currentRoom==='reception'?'bg-blue-500/50 text-white border border-blue-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Reception</button>
              <button onClick={() => setCurrentRoom('waiting')} className={`p-1 rounded ${currentRoom==='waiting'?'bg-indigo-500/50 text-white border border-indigo-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Waiting Area</button>
              <button onClick={() => setCurrentRoom('consultation')} className={`p-1 rounded ${currentRoom==='consultation'?'bg-pink-500/50 text-white border border-pink-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Consultation</button>
              <button onClick={() => setCurrentRoom('ward')} className={`p-1 rounded ${currentRoom==='ward'?'bg-green-500/50 text-white border border-green-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Ward</button>
              <button onClick={() => setCurrentRoom('operation')} className={`p-1 rounded ${currentRoom==='operation'?'bg-purple-500/50 text-white border border-purple-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Operation</button>
              <button onClick={() => setCurrentRoom('icu')} className={`p-1 rounded ${currentRoom==='icu'?'bg-blue-900/50 text-white border border-blue-900':'bg-white/10 text-white/70 hover:bg-white/20'}`}>ICU</button>
              <button onClick={() => setCurrentRoom('recovery')} className={`p-1 rounded ${currentRoom==='recovery'?'bg-green-900/50 text-white border border-green-900':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Recovery</button>
              <button onClick={() => setCurrentRoom('emergency')} className={`p-1 rounded ${currentRoom==='emergency'?'bg-red-500/50 text-white border border-red-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Emergency</button>
              <button onClick={() => setCurrentRoom('pharmacy')} className={`p-1 rounded ${currentRoom==='pharmacy'?'bg-orange-500/50 text-white border border-orange-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Pharmacy</button>
              <button onClick={() => setCurrentRoom('store')} className={`p-1 rounded ${currentRoom==='store'?'bg-cyan-500/50 text-white border border-cyan-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Store</button>
              <button onClick={() => setCurrentRoom('generator')} className={`p-1 rounded ${currentRoom==='generator'?'bg-emerald-500/50 text-white border border-emerald-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Generator</button>
              <button onClick={() => setCurrentRoom('nurseStations')} className={`p-1 rounded ${currentRoom==='nurseStations'?'bg-pink-500/50 text-white border border-pink-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Nurse Station</button>
              <button onClick={() => setCurrentRoom('bathroomRestroom')} className={`p-1 rounded ${currentRoom==='bathroomRestroom'?'bg-gray-500/50 text-white border border-gray-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Bathroom/Restroom</button>
              <button onClick={() => setCurrentRoom('staffRest')} className={`p-1 rounded ${currentRoom==='staffRest'?'bg-yellow-500/50 text-white border border-yellow-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Staff Rest</button>
              <button onClick={() => setCurrentRoom("laboratory")} className={`p-1 rounded ${currentRoom==='laboratory'?'bg-purple-500/50 text-white border border-purple-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Laboratory</button>
              <button onClick={() => setCurrentRoom("radiology")} className={`p-1 rounded ${currentRoom==='radiology'?'bg-blue-500/50 text-white border border-blue-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Radiology</button>
              <button onClick={() => setCurrentRoom("maternity")} className={`p-1 rounded ${currentRoom==='maternity'?'bg-pink-500/50 text-white border border-pink-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Maternity</button>
              <button onClick={() => setCurrentRoom("pediatric")} className={`p-1 rounded ${currentRoom==='pediatric'?'bg-yellow-500/50 text-white border border-yellow-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Pediatric</button>
              <button onClick={() => setCurrentRoom("isolation")} className={`p-1 rounded ${currentRoom==='isolation'?'bg-red-500/50 text-white border border-red-300':'bg-white/10 text-white/70 hover:bg-white/20'}`}>Isolation</button>
            </div>
          )}
        </div>
      </div>

      {/* 3D Scene with weather system, pass isNight for lighting */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Scene cameraPosition={[0, 12, 32]} enableControls enableShadows>
          {/* Weather system overlays (rain, clouds, sun, etc.) */}
          <WeatherSystem weatherType={weather} autoChange={autoWeather} />
          {viewMode === 'exterior' ? (
            <Hospital3D position={[0, 0, 0]} isNight={isNight} />
          ) : (
            <HospitalInterior3D position={[0, 0, 0]} currentRoom={currentRoom} viewMode={viewMode} isNight={isNight} />
          )}
        </Scene>
      </div>
    </div>
  );
}
