import React, { createContext, useState, ReactNode } from 'react';

// Defining the type for your context values
type ThemeContextType = {
  theme: string;
  themeHandler: () => void;
};

// Creating the context with an initial value (it can be null)
export const ThemeContext = createContext<ThemeContextType | null>(null);

// Creating a props interface for the provider component
interface ThemeContextProviderProps {
  children: ReactNode;
}

// Creating the provider component
export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const themeHandler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, themeHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};
