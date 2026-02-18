
// BirthdayZone cleaned up for new implementation


import dynamic from "next/dynamic";
import React, { Suspense, useState } from "react";
const Hospital3D = dynamic(() => import("@/components/3d/Hospital3D"), { ssr: false });
import Scene from "@/components/3d/Scene";
import ParticleBackground from "@/components/ui/ParticleBackground";
import WeatherControls from "@/components/ui/WeatherControls";
import WeatherSystem from "@/components/3d/weather/WeatherSystem";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

export default function BirthdayZone() {
  // Weather state management (pattern from YourSpace)
  const [weather, setWeather] = useState('sunny');
  const [autoWeather, setAutoWeather] = useState(true);
  const { isNight, toggleTheme } = useTheme();
  const [isAutoCycle, setIsAutoCycle] = useState(true);

  // Handler for WeatherControls
  const handleWeatherChange = (newWeather) => {
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

      {/* 3D Scene with weather system, pass isNight for lighting */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Scene cameraPosition={[0, 12, 32]} enableControls enableShadows isNight={isNight}>
          {/* Weather system overlays (rain, clouds, sun, etc.) */}
          <WeatherSystem weatherType={weather} autoChange={autoWeather} />
          <Hospital3D position={[0, 0, 0]} isNight={isNight} />
        </Scene>
      </div>
    </div>
  );
}
