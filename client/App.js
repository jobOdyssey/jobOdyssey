import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';

import {GlobalProvider, useAppGlobalState} from './src/state/global';

import {GlobalTheme} from './src/theme'
import MainScreen from './src/ui/mainscreen'

import Constants from './env'

import { ApolloClient, InMemoryCache, ApolloProvider  } from '@apollo/client';


// Initialize Apollo Client
const client = new ApolloClient({
  uri: `${Constants.SERVER_URL}/graphql`,
  cache: new InMemoryCache(),
  credentials: 'include',
});


const App = () => {
  
  const glbState = useAppGlobalState();
  const initStatusBar = () => {
    StatusBar.setBarStyle('light-content', true)
  }

  return (
    <GlobalProvider>
      <StatusBar
          hidden={false}
          backgroundColor={glbState.state ? glbState.state.themeScheme.primary : GlobalTheme.light.primary}
      />
      {initStatusBar()}
      <ApolloProvider client={client}>
        <MainScreen />
      </ApolloProvider>
    </GlobalProvider>
  )
}

export default App;
