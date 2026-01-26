import { createContext, useContext, useState, ReactNode } from 'react';

export type CharacterType = 'priya' | 'ururu';

interface CharacterContextProps {
  selectedCharacter: CharacterType;
  setSelectedCharacter: (character: CharacterType) => void;
}

const CharacterContext = createContext<CharacterContextProps | undefined>(undefined);

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType>('priya');
  return (
    <CharacterContext.Provider value={{ selectedCharacter, setSelectedCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (!context) throw new Error('useCharacter must be used within CharacterProvider');
  return context;
}
