"use client";

import { Suspense, useState } from 'react';
import Scene from '@/components/3d/Scene';
import BangaloreCityscape from '@/components/3d/BangaloreCityscape';
import { useNavigation } from '@/hooks/useNavigation';
import { useTheme } from '@/hooks/useTheme';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { motion } from 'framer-motion';

export default function OurSpace() {
  const { navigateTo } = useNavigation();
  const { isNight } = useTheme();
  const [showInfo, setShowInfo] = useState(true);

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
                🏙️ Bengaluru & Rajajinagar
              </h1>
              <p className="text-white/80 text-lg mb-2">
                {isNight ? 'Experience the vibrant city-town contrast at night!' : 'Welcome to Bengaluru City & Rajajinagar Town!'}
              </p>
              <p className="text-white/70 text-sm mb-4">
                Explore the bustling Bengaluru metropolis on the left and the peaceful 
                Rajajinagar town on the right. Click landmarks to discover more!
              </p>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowInfo(false)} 
                  variant="primary" 
                  size="sm"
                >
                  Explore City
                </Button>
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
      <div className="absolute top-20 left-4 z-20">
        <GlassCard className="p-4 max-w-xs">
          <h3 className="text-lg font-bold text-white mb-3">🏙️ Bengaluru Metropolis (Left)</h3>
          <ul className="text-sm text-white/80 space-y-1 mb-4">
            <li>🏛️ Vidhana Soudha - Government HQ</li>
            <li>🏰 Bangalore Palace - Royal Heritage</li>
            <li>🛕 ISKCON Temple - Spiritual Center</li>
            <li>🏥 BMS College - Medical Institution</li>
            <li>🏢 Electronic City - IT Hub</li>
            <li>💼 Koramangala IT Hub - Tech District</li>
            <li>🛍️ Brigade Road - Shopping Street</li>
            <li>🌺 Lalbagh Garden - Botanical Beauty</li>
            <li>🌳 Cubbon Park - Green Lung</li>
            <li>🚇 Namma Metro - Rail Network</li>
            <li>🛺 Auto-rickshaws - City Transport</li>
          </ul>
          <h3 className="text-lg font-bold text-white mb-2">🏘️ Rajajinagar Region (Right)</h3>
          <ul className="text-sm text-white/80 space-y-1">
            <li>🏠 Main Rajajinagar - Town Center</li>
            <li>🏘️ Extension Area - New Development</li>
            <li>🛒 Traditional Market - Local Commerce</li>
            <li>🌳 Village Grove - Natural Beauty</li>
            <li>🏛️ Community Temples</li>
            <li>🏡 Residential Neighborhoods</li>
            <li>💡 Traditional Street Lighting</li>
          </ul>
        </GlassCard>
      </div>

      {/* 3D Bangalore Cityscape */}
      <Scene cameraPosition={[0, 8, 12]} enableControls={true}>
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
            <planeGeometry args={[80, 40]} />
            <meshStandardMaterial 
              color={isNight ? "#1A1A2E" : "#7D8471"} 
              roughness={0.8} 
            />
          </mesh>
        </Suspense>
      </Scene>

      {/* Quick navigation if info is hidden */}
      {!showInfo && (
        <div className="absolute bottom-4 left-4 z-20">
          <Button 
            onClick={() => navigateTo('home')} 
            variant="ghost" 
            size="sm"
          >
            ← Back Home
          </Button>
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
    </div>
  );
}