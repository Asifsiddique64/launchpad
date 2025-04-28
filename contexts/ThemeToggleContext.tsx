import React, { createContext, useContext, useState } from 'react';

interface ThemeToggleContextType {
  showThemeToggle: boolean;
  setShowThemeToggle: (show: boolean) => void;
}

const ThemeToggleContext = createContext<ThemeToggleContextType | undefined>(undefined);

export function ThemeToggleProvider({ children }: { children: React.ReactNode }) {
  const [showThemeToggle, setShowThemeToggle] = useState(false);

  return (
    <ThemeToggleContext.Provider value={{ showThemeToggle, setShowThemeToggle }}>
      {children}
    </ThemeToggleContext.Provider>
  );
}

export function useThemeToggle() {
  const context = useContext(ThemeToggleContext);
  if (context === undefined) {
    throw new Error('useThemeToggle must be used within a ThemeToggleProvider');
  }
  return context;
} 