import React, {useState, useEffect} from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Linking, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { gql, useMutation, useLazyQuery } from '@apollo/client'

import Constants from '../../env'
import {InputBox, MainButton} from '../components';
import UiTheme from './changetheme';
import {LoginStyles} from '../theme';

import {useAppGlobalState} from '../state/global'

import {  SetUserSession, printAllCookies, setUserID, getUserID } from '../Helpers/apihelper'

const USER_QUERY = gql`
 query { getCurrentUser {
  id
  social_id
  username
  email
 }  
}`

export const LOGIN_USER  = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
      }
    }
  }
`;

export default LoginScreen = ({navigation}) => {

  const glbState = useAppGlobalState();

  const [email, setEmail] = useState(() => '');
  const [password, setPassword] = useState(() => '');
  const [showAlert, setShowAlert] = useState(() => false);
  const [alertMessage, setAlertMessage] = useState(() => '')
  
  const [loginUser] = useMutation(LOGIN_USER,{
    onCompleted: (result) => {
      console.log("login user mutation executed!",  result);
      if (result) {

        setUserID(result.login.user.id);
        moveToHome();  
      }
    }
  });

  const [fetchData, { data, refetch, loading, error }] = useLazyQuery(USER_QUERY);

  useEffect(() => {        
    console.log("on login page")
    Linking.addEventListener('url', handleOpenURL);   
    printAllCookies(); 
    fetchData();
  }, []);

  const handleOpenURL = async ({ url }) => {
    if (url.indexOf("?sig") !== -1) {        
        console.log("redirect succesfull");  
        console.log('navigation ', navigation);
        await SetUserSession(url); // important                  
        moveToHome();   
    }
  };

  const socialStyles = StyleSheet.create({
    body: {
      backgroundColor: glbState.state.themeScheme.primary,
    },
    socialBtn: {
      margin: 30,
      backgroundColor: glbState.state.themeScheme.primary,
      paddingVertical: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const performLogin = async () => {
    console.log("calling mutation with params", email, password);
    try {
      await loginUser({ variables: { email: email, password: password   } });
    } catch (err) {
      console.log("error on login", err)
      setAlertMessage('User does not exist');
      setShowAlert(true);
    }
  };

  const moveToHome = () => navigation.navigate('Home');

  const socialLoginReder = () => {
    if (!data || !data.getCurrentUser){
      return (
        <View>
          <TouchableOpacity style={socialStyles.socialBtn}
            onPress={() => Linking.openURL(`${Constants.SERVER_URL}/auth/google`)}
            >
            <Text style={socialStyles.buttonText}>{ "Connect via Google" }</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      //setTimeout(() => moveToHome(), 500)
      return null;
    }
  }

  return (
    <View>
      <UiTheme></UiTheme>
      <View style={LoginStyles.board}>
        <InputBox label="Email" text={email} setText={text => setEmail(text)} />
        <InputBox
          label="Password"
          text={password}
          setText={text => setPassword(text)}
          secure={true}
        />
      </View>
      <View style={LoginStyles.buttons}>
        <MainButton text="Login" onPress={performLogin} />
        <MainButton text="Sign Up" 
          onPress={() => navigation.navigate('Signup')} // navigate to sigun page
        />              
      </View>
      <View style={LoginStyles.buttons}>
        {
          loading ? <Text>Loading ...</Text> : socialLoginReder()         
        }
        </View>        
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Login"
          message={alertMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={false}
          cancelText="Ok"
          confirmText="Yes, Ok"
          confirmButtonColor={glbState.state.themeScheme.primary}
          cancelButtonColor={glbState.state.themeScheme.error}
          onCancelPressed={() => {
            setShowAlert(false)
            setEmail('')
            setPassword('')
          }}
          onConfirmPressed={() => {
            setShowAlert(false)
            setEmail('')
            setPassword('')
          }}
        />
    </View>
  );
}