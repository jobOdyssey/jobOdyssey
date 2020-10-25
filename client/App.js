import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

import {AppTheme} from './src/theme';
import {HomeScreen, LoginScreen, SignupScreen, JobApplication} from './src/ui';

// this is a stag of all screens
// the screens will be popped and pushed based on user's actions
const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider theme={AppTheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="JobApplication">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Log In',
              headerStyle: {
                backgroundColor: '#aed581',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              title: 'Sign Up',
              headerStyle: {
                backgroundColor: '#aed581',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Jobs....',
              headerStyle: {
                backgroundColor: '#aed581',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="JobApplication"
            component={JobApplication}
            options={{
              title: 'JobApplication....',
              headerStyle: {
                backgroundColor: '#aed581',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App;
