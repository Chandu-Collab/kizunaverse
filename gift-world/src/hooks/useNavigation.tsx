'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Zone } from '@/types';

interface NavigationContextType {
  currentZone: Zone;
  navigateTo: (zone: Zone) => void;
  isTransitioning: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentZone, setCurrentZone] = useState<Zone>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateTo = (zone: Zone) => {
    if (zone === currentZone) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentZone(zone);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <NavigationContext.Provider value={{ currentZone, navigateTo, isTransitioning }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
