import React, {useState} from 'react';
import {View} from 'react-native';

import {InputBox, MainButton, ThemeSetting} from '../components';
import {LoginStyles} from '../theme';

import {useGlobalActionDispatch} from '../state/global'

export default LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(() => '');
  const [password, setPassword] = useState(() => '');

  const disPatchAction = useGlobalActionDispatch();

  const changeGlobalThemeState = () => {
    disPatchAction({
      type: 'changeAppGlobalTheme',
    })
  }

  const performLogin = async () => {
    // implement login validation for User/Password

    // later add social login

    // perform a nagivation for now
    navigation.navigate('Home');
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
        <MainButton text="Sign Up" 
          onPress={() => navigation.navigate('Signup')} // navigate to sigun page
        />
        <MainButton text="Login" onPress={performLogin} />
      </View>
    </View>
  );
}