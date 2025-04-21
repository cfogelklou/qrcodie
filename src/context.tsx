import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our context
interface CounterContextType {
  count: number;
  increment: () => void;
}

// Create context with a default value
const CounterContext = createContext<CounterContextType | undefined>(undefined);

// Custom hook to use the counter context
export const useCounter = () => {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
};

// Props type for our provider component
interface CounterProviderProps {
  children: ReactNode;
}

// Provider component that wraps parts of our app that need the counter context
export const CounterProvider: React.FC<CounterProviderProps> = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Value object that will be passed to consuming components
  const value = {
    count,
    increment
  };

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
};