import { useState, useEffect, useCallback } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';

function getAutoTheme(): 'light' | 'dark' {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? 'light' : 'dark';
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'auto';
    return (localStorage.getItem('theme-mode') as ThemeMode) || 'auto';
  });

  const resolvedTheme = mode === 'auto' ? getAutoTheme() : mode;

  const applyTheme = useCallback((theme: 'light' | 'dark') => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme, applyTheme]);

  // Re-check every minute when in auto mode
  useEffect(() => {
    if (mode !== 'auto') return;
    const interval = setInterval(() => {
      applyTheme(getAutoTheme());
    }, 60_000);
    return () => clearInterval(interval);
  }, [mode, applyTheme]);

  const setTheme = useCallback((newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  }, []);

  return { mode, resolvedTheme, setTheme };
}