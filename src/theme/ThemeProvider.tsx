import type { ReactNode } from 'react';
import { createContext, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTheme } from '../api/theme';
import type { ThemeSettings } from '../types';

interface ThemeContextValue {
  theme?: ThemeSettings;
  isLoading: boolean;
  refresh: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  isLoading: false,
  refresh: () => undefined,
});

function applyThemeToDocument(theme?: ThemeSettings) {
  if (!theme) return;
  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.primaryColor);
  root.style.setProperty('--color-secondary', theme.secondaryColor);
  root.style.setProperty('--color-accent', theme.accentColor);
  root.style.setProperty('--color-surface', theme.surfaceColor);
  root.style.setProperty('--color-neutral', theme.neutralColor);
  root.dataset.theme = theme.darkMode ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const query = useQuery({ queryKey: ['theme'], queryFn: fetchTheme });

  useEffect(() => {
    applyThemeToDocument(query.data);
  }, [query.data]);

  return (
    <ThemeContext.Provider
      value={{
        theme: query.data,
        isLoading: query.isLoading,
        refresh: () => query.refetch(),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
