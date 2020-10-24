import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

import {AppTheme} from './src/theme';
import {HomeScreen, LoginScreen, SignupScreen} from './src/ui';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider theme={AppTheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
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
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App;
