import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('rchxtype-theme');
    return savedTheme || 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('rchxtype-theme', newTheme);
  };

  const setThemeMode = (mode) => {
    setTheme(mode);
    localStorage.setItem('rchxtype-theme', mode);
  };

  // Update document body class when theme changes
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
    setThemeMode,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
