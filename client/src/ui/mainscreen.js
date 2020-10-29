import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

import {AppTheme} from '../theme';
import {HomeScreen, LoginScreen, SignupScreen} from '.'; //, JobApplication , SocialLogin

import {useAppGlobalState} from '../state/global';

// console.log("LoginScreen",LoginScreen)
// console.log("SocialLoginScreen",SocialLogin)

// this is a stag of all screens
// the screens will be popped and pushed based on user's actions
const Stack = createStackNavigator();

const MainScreen = () => {

  const glbState = useAppGlobalState();

  return (
    <PaperProvider theme={AppTheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SocialLogin">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Log In',
              headerStyle: {
                backgroundColor: glbState.state.themeScheme.primary//,'#aed581',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          {/* <Stack.Screen
            name="SocialLogin"
            component={SocialLogin}
            options={{
              title: 'Log In',
              headerStyle: {
                backgroundColor: glbState.state.themeScheme.primary//,'#aed581', 
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />                         */}
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              title: 'Sign Up',
              headerStyle: {
                backgroundColor: glbState.state.themeScheme.primary//,'#aed581', 
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
                backgroundColor: glbState.state.themeScheme.primary//,'#aed581', 
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          {/* <Stack.Screen
            name="JobApplication"
            component={JobApplication}
            options={{
              title: 'JobApplication....',
              headerStyle: {
                backgroundColor: glbState.state.themeScheme.primary//,'#aed581', 
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}


export default MainScreen