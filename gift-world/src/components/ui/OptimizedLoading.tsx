import React, { useState, useEffect } from 'react';

interface OptimizedLoadingProps {
  stage: string;
  progress?: number;
}

export default function OptimizedLoading({ stage, progress = 0 }: OptimizedLoadingProps) {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center z-50">
      <div className="text-center p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl max-w-md">
        {/* Loading Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-blue-200 dark:border-gray-600 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Loading Namma Bengaluru{dots}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {stage}
        </p>
        
        {/* Progress Bar */}
        {progress > 0 && (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        
        {/* Tips */}
        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
          <p>💡 Loading optimized 3D cityscape</p>
          <p>🏗️ Preparing Rajajinagar components</p>
          <p>🌟 Setting up weather effects</p>
        </div>
      </div>
    </div>
  );
}

// Loading stages for different components
export const LOADING_STAGES = {
  INITIALIZING: "Initializing scene...",
  LOADING_BUILDINGS: "Loading buildings and structures...", 
  LOADING_CHARACTERS: "Adding people and vehicles...",
  LOADING_EFFECTS: "Setting up weather and particles...",
  FINALIZING: "Finalizing cityscape...",
  COMPLETE: "Welcome to Bengaluru!"
};