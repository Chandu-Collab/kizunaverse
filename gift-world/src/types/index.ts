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

export interface PomodoroState {
  isRunning: boolean;
  timeLeft: number;
  sessionType: 'work' | 'break';
  completedPomodoros: number;
}
