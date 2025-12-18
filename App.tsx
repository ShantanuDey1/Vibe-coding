
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AppState, TypingStats, Language, TestMode, TimeDuration, WordCount, Theme } from './types';
import { ENGLISH_WORDS, BENGALI_WORDS, CoffeeIllustrations } from './constants';
import Sidebar from './components/Sidebar';
import { RefreshCw, Timer, BookOpen, Settings2, Globe } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [appState, setAppState] = useState<AppState>({
    language: 'english',
    testMode: 'time',
    theme: 'coffee',
    duration: 30,
    wordLimit: 25,
    isActive: false,
    isFinished: false,
  });

  const [words, setWords] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [errorIndex, setErrorIndex] = useState<number | null>(null);
  const [charResults, setCharResults] = useState<(boolean | null)[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const typingAreaRef = useRef<HTMLDivElement>(null);

  // Apply theme to body data-attribute
  useEffect(() => {
    document.body.setAttribute('data-theme', appState.theme);
  }, [appState.theme]);

  // Stats calculation
  const calculateStats = useCallback((): TypingStats => {
    if (!startTime) return { wpm: 0, accuracy: 0, rawWpm: 0, errors: 0, timeElapsed: 0, progress: 0 };
    
    const timeElapsed = (Date.now() - startTime) / 60000; // in minutes
    const totalTyped = userInput.length;
    const correctChars = charResults.filter(r => r === true).length;
    
    const wpm = Math.round((correctChars / 5) / timeElapsed) || 0;
    const rawWpm = Math.round((totalTyped / 5) / timeElapsed) || 0;
    const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;

    const targetText = words.join(' ');
    const progress = Math.min(100, Math.round((userInput.length / targetText.length) * 100));

    return { wpm, accuracy, rawWpm, errors: charResults.filter(r => r === false).length, timeElapsed: timeElapsed * 60, progress };
  }, [userInput, charResults, startTime, words]);

  // Game Logic
  const generateWords = useCallback((lang: Language) => {
    const dictionary = lang === 'english' ? ENGLISH_WORDS : BENGALI_WORDS;
    const shuffled = [...dictionary].sort(() => Math.random() - 0.5);
    const selected = Array.from({ length: 100 }, () => shuffled[Math.floor(Math.random() * shuffled.length)]);
    setWords(selected);
    setCharResults(new Array(selected.join(' ').length).fill(null));
  }, []);

  const resetTest = useCallback(() => {
    setUserInput('');
    setStartTime(null);
    setTimeLeft(appState.testMode === 'time' ? appState.duration : 0);
    setAppState(prev => ({ ...prev, isActive: false, isFinished: false }));
    setErrorIndex(null);
    generateWords(appState.language);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [appState.duration, appState.language, appState.testMode, generateWords]);

  useEffect(() => {
    resetTest();
  }, [appState.duration, appState.language, appState.testMode, resetTest]);

  // Timer loop
  useEffect(() => {
    let interval: any;
    if (appState.isActive && !appState.isFinished) {
      interval = setInterval(() => {
        if (appState.testMode === 'time') {
          setTimeLeft(prev => {
            if (prev <= 1) {
              setAppState(s => ({ ...s, isActive: false, isFinished: true }));
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        } else {
          setTimeLeft(prev => prev + 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [appState.isActive, appState.isFinished, appState.testMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const targetText = words.join(' ');

    if (!appState.isActive && !appState.isFinished) {
      setAppState(prev => ({ ...prev, isActive: true }));
      setStartTime(Date.now());
    }

    if (value.length > targetText.length) return;

    const newResults = [...charResults];
    const index = value.length - 1;
    if (index >= 0) {
      const isCorrect = value[index] === targetText[index];
      newResults[index] = isCorrect;
      if (!isCorrect) {
        setErrorIndex(index);
        setTimeout(() => setErrorIndex(null), 200);
      }
    }
    setCharResults(newResults);
    setUserInput(value);

    if (appState.testMode === 'words') {
       const currentWordCount = value.trim().split(/\s+/).length;
       if (currentWordCount >= appState.wordLimit && value.endsWith(' ')) {
         setAppState(prev => ({ ...prev, isActive: false, isFinished: true }));
       }
    }
    
    if (value.length === targetText.length) {
      setAppState(prev => ({ ...prev, isActive: false, isFinished: true }));
    }
  };

  const handleThemeChange = (theme: Theme) => {
    setAppState(prev => ({ ...prev, theme }));
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 md:p-8">
      <CoffeeIllustrations />
      <Sidebar currentTheme={appState.theme} onThemeChange={handleThemeChange} />

      {/* Header Controls */}
      <header className="w-full max-w-4xl flex flex-wrap items-center justify-between mb-12 coffee-glass p-4 rounded-2xl shadow-lg animate-in fade-in duration-700">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm font-bold uppercase tracking-wider">
            <Timer size={18} className="text-[var(--accent)]" />
            <div className="flex bg-[var(--glass-bg)] rounded-lg p-1">
              {[15, 30, 60].map(d => (
                <button
                  key={d}
                  onClick={() => setAppState(s => ({ ...s, testMode: 'time', duration: d as TimeDuration }))}
                  className={`px-3 py-1 rounded-md transition-all ${appState.testMode === 'time' && appState.duration === d ? 'bg-[var(--accent)] text-white shadow-sm' : 'hover:bg-[var(--glass-border)]'}`}
                >
                  {d}s
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm font-bold uppercase tracking-wider border-l border-[var(--glass-border)] pl-6">
            <BookOpen size={18} className="text-[var(--accent)]" />
            <div className="flex bg-[var(--glass-bg)] rounded-lg p-1">
              {[25, 50, 100].map(w => (
                <button
                  key={w}
                  onClick={() => setAppState(s => ({ ...s, testMode: 'words', wordLimit: w as WordCount }))}
                  className={`px-3 py-1 rounded-md transition-all ${appState.testMode === 'words' && appState.wordLimit === w ? 'bg-[var(--accent)] text-white shadow-sm' : 'hover:bg-[var(--glass-border)]'}`}
                >
                  {w}w
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <button
            onClick={() => setAppState(s => ({ ...s, language: s.language === 'english' ? 'bengali' : 'english' }))}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-white hover:opacity-90 transition-all font-bold shadow-md"
          >
            <Globe size={18} />
            {appState.language === 'english' ? 'English' : 'বাংলা'}
          </button>
          <button 
            onClick={resetTest}
            className="p-2 rounded-xl bg-[var(--glass-bg)] text-[var(--text-main)] hover:bg-[var(--glass-border)] transition-all shadow-sm"
          >
            <RefreshCw size={22} className={appState.isActive ? 'animate-spin-slow' : ''} />
          </button>
        </div>
      </header>

      {/* Main Typing Area */}
      <main className="w-full max-w-5xl flex flex-col gap-8 relative">
        {!appState.isFinished ? (
          <>
            <div 
              className={`relative coffee-glass p-10 rounded-[2rem] shadow-2xl min-h-[300px] flex flex-col items-center justify-center cursor-text select-none group transition-all duration-500 ${errorIndex !== null ? 'animate-shake' : ''}`}
              onClick={() => inputRef.current?.focus()}
            >
              <div 
                className={`text-2xl md:text-3xl leading-relaxed text-center no-scrollbar max-h-[400px] overflow-y-auto ${appState.language === 'bengali' ? 'font-bengali' : 'font-mono'}`}
                ref={typingAreaRef}
              >
                {words.join(' ').split('').map((char, i) => {
                  let colorClass = 'text-[var(--text-muted)]';
                  if (i < userInput.length) {
                    colorClass = charResults[i] ? 'text-[var(--text-main)]' : 'text-red-500 font-bold';
                  }
                  
                  return (
                    <span 
                      key={i} 
                      className={`relative transition-colors duration-150 ${colorClass} ${i === userInput.length ? 'border-b-2 border-[var(--accent)]' : ''}`}
                    >
                      {char}
                      {i === userInput.length && (
                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[var(--accent)] cursor-blink"></span>
                      )}
                    </span>
                  );
                })}
              </div>
              
              <input
                ref={inputRef}
                type="text"
                className="absolute opacity-0 pointer-events-none"
                value={userInput}
                onChange={handleInputChange}
                autoFocus
              />
            </div>

            {/* Live Stats Floating Below */}
            <div className="flex justify-center gap-12 text-[var(--text-muted)] font-bold uppercase tracking-[0.2em] animate-pulse">
              <div className="flex flex-col items-center">
                <span className="text-4xl text-[var(--text-main)]">{stats.wpm}</span>
                <span className="text-xs">WPM</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl text-[var(--text-main)]">{appState.testMode === 'time' ? timeLeft : stats.progress + '%'}</span>
                <span className="text-xs">{appState.testMode === 'time' ? 'Time' : 'Progress'}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl text-[var(--text-main)]">{stats.accuracy}%</span>
                <span className="text-xs">Accuracy</span>
              </div>
            </div>
          </>
        ) : (
          <div className="coffee-glass p-12 rounded-[2rem] shadow-2xl flex flex-col items-center gap-8 animate-in zoom-in duration-500">
            <h2 className="text-5xl font-serif text-[var(--text-main)]">Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
              <div className="bg-[var(--glass-bg)] p-6 rounded-2xl flex flex-col items-center">
                <span className="text-5xl font-bold text-[var(--accent)]">{stats.wpm}</span>
                <span className="text-sm uppercase tracking-wider text-[var(--text-muted)]">WPM</span>
              </div>
              <div className="bg-[var(--glass-bg)] p-6 rounded-2xl flex flex-col items-center">
                <span className="text-5xl font-bold text-[var(--accent)]">{stats.accuracy}%</span>
                <span className="text-sm uppercase tracking-wider text-[var(--text-muted)]">Accuracy</span>
              </div>
              <div className="bg-[var(--glass-bg)] p-6 rounded-2xl flex flex-col items-center">
                <span className="text-5xl font-bold text-[var(--accent)]">{stats.rawWpm}</span>
                <span className="text-sm uppercase tracking-wider text-[var(--text-muted)]">Raw</span>
              </div>
              <div className="bg-[var(--glass-bg)] p-6 rounded-2xl flex flex-col items-center">
                <span className="text-5xl font-bold text-[var(--accent)]">{charResults.filter(r => r === false).length}</span>
                <span className="text-sm uppercase tracking-wider text-[var(--text-muted)]">Errors</span>
              </div>
            </div>
            <button 
              onClick={resetTest}
              className="mt-4 px-12 py-4 bg-[var(--accent)] text-white rounded-2xl text-xl font-bold hover:opacity-90 transition-all shadow-xl hover:scale-105"
            >
              Restart Session
            </button>
          </div>
        )}
      </main>

      {/* Footer Bar */}
      <footer className="fixed bottom-0 left-0 w-full p-4 flex justify-center pointer-events-none">
        <div className="w-full max-w-2xl coffee-glass py-2 px-6 rounded-t-2xl shadow-2xl flex items-center justify-between text-[var(--text-muted)] text-xs font-bold pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="w-32 h-1.5 bg-[var(--glass-border)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--accent)] transition-all duration-300" 
                style={{ width: `${stats.progress}%` }}
              ></div>
            </div>
            <span>{stats.progress}%</span>
          </div>
          <div className="flex gap-4 italic font-serif">
            <span>ZenType Engine v1.2</span>
            <span>·</span>
            <span>{appState.theme.charAt(0).toUpperCase() + appState.theme.slice(1)} Mode</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
