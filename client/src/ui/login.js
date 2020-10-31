import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Linking} from 'react-native';

import {InputBox, MainButton, ThemeSetting} from '../components';
import {LoginStyles} from '../theme';

import {useGlobalActionDispatch} from '../state/global'

import { gql, useMutation, useLazyQuery } from '@apollo/client'

import SocialLogin from './sociallogin';

import {  SetUserSession, printAllCookies } from '../Helpers/apihelper'
/*
export const LOGIN_USER  = gql`
mutation Login($username: String, $password: String)	{
  login(loginInfo: { username: $username, password: $password }) {
     errors
     user { id }
  }
}`
*/

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
  const [email, setEmail] = useState(() => '');
  const [password, setPassword] = useState(() => '');
  const [loginUser] = useMutation(LOGIN_USER,{
    onCompleted(user) {
      console.log("mutation executed!",  user);
      if (user) {
        moveToHome();  
      }
    }
  });

  const [fetchData, { data, refetch, loading, error }] = useLazyQuery(USER_QUERY);

  const disPatchAction = useGlobalActionDispatch();

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

  const changeGlobalThemeState = () => {
    disPatchAction({
      type: 'changeAppGlobalTheme',
    })
  }

  const performLogin = async () => {
    console.log("calling mutation with params", email, password);
    loginUser({ variables: { email: email, password: password   } });
  };

  const moveToHome = () => navigation.navigate('Home');

  const socialLoginReder = () => {
    if (!data || !data.getCurrentUser){
      return <View><TouchableOpacity style={LoginStyles.buttons}
          onPress={() => Linking.openURL(`${Constants.SERVER_URL}/auth/google`)}>
          <Text >{ "Connect via Google" }</Text>
        </TouchableOpacity>
        </View>
    } else {
      setTimeout(() => moveToHome(), 500)
      return null;
    }
  }

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <ThemeSetting onPress={changeGlobalThemeState} icon={'brightness-4'}/>
      </View>
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
  
    </View>
  );
}