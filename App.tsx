import React from 'react';
import {SafeAreaView} from 'react-native';

import Navigation from './src/routes/Navigation';
import AppProviders from './src/contexts/AppProviders';

function App(): React.JSX.Element {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:'#FFF'
      }}>
      <AppProviders>
        <Navigation />
      </AppProviders>
    </SafeAreaView>
  );
}

export default App;
