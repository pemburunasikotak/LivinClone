import { createContext, useState, useContext, useEffect } from 'react';

const IndicatorContext = createContext();

export const IndicatorProvider = ({ children }) => {
  const getRandomColor = () => {
    const colors = ['red', '#1D64E1', '#95D629'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const [color, setColor] = useState('#1D64E1');

  const changeToGreen = () => {
    if (color === 'red' || color === '#1D64E1') {
      setColor('#95D629');
    }
  };

  const value = { color, setColor, changeToGreen, getRandomColor };

  return (
    <IndicatorContext.Provider value={value}>
      {children}
    </IndicatorContext.Provider>
  );
};

export const useIndicator = () => useContext(IndicatorContext);
