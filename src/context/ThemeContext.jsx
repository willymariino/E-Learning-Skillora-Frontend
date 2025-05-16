import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    // First try to get from localStorage
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      return JSON.parse(savedTheme);
    }
    
    // Default to dark mode instead of checking system preference
    return true;
  });

  // Force dark mode on by default
  useEffect(() => {
    // Force dark mode on by default
    setDarkMode(true);
  }, []);

  // Update localStorage and apply theme class to body when darkMode changes
  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Apply to body class
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Log for debugging
    console.log('Dark mode state:', darkMode, 'Body classes:', document.body.classList.contains('dark-mode'));
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      console.log('Toggling dark mode from', prevMode, 'to', newMode);
      return newMode;
    });
  };

  // Force apply dark mode (useful for debugging)
  const forceApplyDarkMode = (mode) => {
    if (mode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, forceApplyDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext; 