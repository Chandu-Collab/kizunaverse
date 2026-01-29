export type Zone = 'home' | 'birthday' | 'fun' | 'study' | 'space' | 'ourspace';

export interface NavigationState {
  currentZone: Zone;
  isTransitioning: boolean;
}

export interface GameState {
  score: number;
  isPlaying: boolean;
  gameTime: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: MoodType;
}

export type MoodType = 'happy' | 'calm' | 'excited' | 'thoughtful' | 'grateful' | 'loved';

export interface PomodoroState {
  isRunning: boolean;
  timeLeft: number;
  sessionType: 'work' | 'break';
  completedPomodoros: number;
}
