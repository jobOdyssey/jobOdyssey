import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';

import {GlobalTheme} from './src/theme'
import {GlobalProvider, useAppGlobalState} from './src/state/global';
import MainScreen from './src/ui/mainscreen'

const App = () => {
  
  const glbState = useAppGlobalState();

  return (
    <GlobalProvider>
      <StatusBar
          hidden={false}
          backgroundColor={glbState.state ? glbState.state.themeScheme.primary : GlobalTheme.light.primary}
          barStyle="light-content"
      />
      <MainScreen />
    </GlobalProvider>
  )
}

export default App;
