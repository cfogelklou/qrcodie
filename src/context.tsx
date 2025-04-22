import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our context
interface ContextType {
  count: number;
  increment: () => void;
}

// Create context with a default value
const AppContext = createContext<ContextType | undefined>(undefined);

// Custom hook to use the counter context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
};

// Props type for our provider component
interface AppContextProviderProps {
  children: ReactNode;
}

// Provider component that wraps parts of our app that need the counter context
export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Value object that will be passed to consuming components
  const value = {
    count,
    increment,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
