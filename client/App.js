import 'react-native-gesture-handler';
import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native';

import {GlobalProvider, useAppGlobalState} from './src/state/global';
import MainScreen from './src/ui/mainscreen'

const App = () => {
  
  const glbState = useAppGlobalState();

  return (
    <GlobalProvider>
      <StatusBar
          hidden={false}
          backgroundColor={glbState.state ? glbState.state.themeScheme.primary : ''}
          barStyle="light-content"
      />
      <MainScreen />
    </GlobalProvider>
  )
}

export default App;
