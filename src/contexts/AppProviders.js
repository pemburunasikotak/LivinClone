import React from 'react';
import { AuthProvider } from './AuthContext';
import { IndicatorProvider } from './IndicatorContext';

const AppProviders = ({ children }) => {
  return (
    <IndicatorProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </IndicatorProvider>
  );
};

export default AppProviders;
