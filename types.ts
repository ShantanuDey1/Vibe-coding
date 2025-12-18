
export type Language = 'english' | 'bengali';

export type TestMode = 'time' | 'words';

export type Theme = 'coffee' | 'midnight';

export type TimeDuration = 15 | 30 | 60;
export type WordCount = 25 | 50 | 100;

export interface TypingStats {
  wpm: number;
  accuracy: number;
  rawWpm: number;
  errors: number;
  timeElapsed: number;
  progress: number;
}

export interface AppState {
  language: Language;
  testMode: TestMode;
  theme: Theme;
  duration: TimeDuration;
  wordLimit: WordCount;
  isActive: boolean;
  isFinished: boolean;
}
