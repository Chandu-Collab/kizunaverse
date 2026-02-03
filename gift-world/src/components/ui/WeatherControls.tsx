import { useState } from 'react';

type WeatherType = 'sunny' | 'rainy' | 'cloudy' | 'monsoon' | 'winter';

interface WeatherControlsProps {
  onWeatherChange: (weather: WeatherType) => void;
  currentWeather: WeatherType;
  autoWeather: boolean;
  onToggleAuto: () => void;
}

export default function WeatherControls({
  onWeatherChange,
  currentWeather,
  autoWeather,
  onToggleAuto
}: WeatherControlsProps) {
  const [showControls, setShowControls] = useState(false);

  const weatherOptions: { type: WeatherType; label: string; icon: string; color: string }[] = [
    { type: 'sunny', label: 'Sunny', icon: '☀️', color: '#FFD700' },
    { type: 'cloudy', label: 'Cloudy', icon: '☁️', color: '#708090' },
    { type: 'rainy', label: 'Rainy', icon: '🌧️', color: '#4682B4' },
    { type: 'monsoon', label: 'Monsoon', icon: '⛈️', color: '#2F4F4F' },
    { type: 'winter', label: 'Winter', icon: '❄️', color: '#B0E0E6' }
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-black/80 transition-all duration-300 flex items-center gap-2"
      >
        🌤️ Weather
        <span className="text-xs">{showControls ? '▲' : '▼'}</span>
      </button>

      {/* Weather Controls Panel */}
      {showControls && (
        <div className="mt-2 bg-black/80 backdrop-blur-sm rounded-lg p-4 min-w-[240px] animate-slide-down">
          {/* Auto Weather Toggle */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-600">
            <span className="text-white text-sm font-medium">Auto Weather</span>
            <button
              onClick={onToggleAuto}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                autoWeather ? 'bg-blue-600' : 'bg-gray-400'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  autoWeather ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Weather Type Buttons */}
          <div className="space-y-2">
            <div className="text-white text-xs font-medium mb-2 opacity-75">
              Current: {currentWeather.charAt(0).toUpperCase() + currentWeather.slice(1)}
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              {weatherOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => onWeatherChange(option.type)}
                  disabled={autoWeather}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentWeather === option.type
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  } ${
                    autoWeather ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  style={{
                    borderLeftColor: option.color,
                    borderLeftWidth: currentWeather === option.type ? '3px' : '0px'
                  }}
                >
                  <span className="text-lg">{option.icon}</span>
                  <span>{option.label}</span>
                  {currentWeather === option.type && (
                    <span className="ml-auto text-xs opacity-75">●</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Weather Info */}
          <div className="mt-4 pt-3 border-t border-gray-600">
            <div className="text-gray-400 text-xs">
              {autoWeather ? (
                <p>🔄 Weather changes automatically every 30 seconds</p>
              ) : (
                <p>🎮 Manual weather control active</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}