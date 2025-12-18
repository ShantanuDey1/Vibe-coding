
import React from 'react';
import { Keyboard, User, Trophy, Settings, Coffee, Palette, Moon, Sun } from 'lucide-react';
import { Theme } from '../types';

interface SidebarProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTheme, onThemeChange }) => {
  const navItems = [
    { icon: Keyboard, label: 'Practice', active: true },
    { icon: Trophy, label: 'Leaderboard' },
    { icon: User, label: 'Profile' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-50">
      {/* Navigation Section */}
      <div className="flex flex-col gap-4 coffee-glass p-3 rounded-3xl shadow-xl">
        {navItems.map((item, idx) => (
          <button
            key={idx}
            className={`p-3 rounded-2xl transition-all duration-300 group relative ${
              item.active 
                ? 'bg-[var(--accent)] text-white shadow-md' 
                : 'text-[var(--text-muted)] hover:bg-[var(--glass-bg)] hover:text-[var(--text-main)]'
            }`}
          >
            <item.icon size={22} strokeWidth={1.5} />
            <span className="absolute right-full mr-4 bg-[var(--accent)] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Theme Selection Section */}
      <div className="flex flex-col gap-4 coffee-glass p-3 rounded-3xl shadow-xl border-t-2 border-[var(--glass-border)] pt-4">
        <div className="flex flex-col items-center gap-2 mb-1">
          <Palette size={16} className="text-[var(--text-muted)]" />
          <div className="h-[1px] w-4 bg-[var(--glass-border)]" />
        </div>
        
        <button
          onClick={() => onThemeChange('coffee')}
          className={`p-3 rounded-2xl transition-all duration-300 group relative ${
            currentTheme === 'coffee' 
              ? 'bg-[#F5E6D3] text-[#7c2d12] border border-[#7c2d12]/20 shadow-sm' 
              : 'text-[var(--text-muted)] hover:bg-[var(--glass-bg)] hover:text-[var(--text-main)]'
          }`}
        >
          <Coffee size={22} strokeWidth={1.5} />
          <span className="absolute right-full mr-4 bg-[#7c2d12] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Coffee Theme
          </span>
        </button>

        <button
          onClick={() => onThemeChange('midnight')}
          className={`p-3 rounded-2xl transition-all duration-300 group relative ${
            currentTheme === 'midnight' 
              ? 'bg-[#0c0a20] text-[#38bdf8] border border-[#38bdf8]/20 shadow-sm' 
              : 'text-[var(--text-muted)] hover:bg-[var(--glass-bg)] hover:text-[var(--text-main)]'
          }`}
        >
          <Moon size={22} strokeWidth={1.5} />
          <span className="absolute right-full mr-4 bg-[#0c0a20] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Midnight Theme
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
