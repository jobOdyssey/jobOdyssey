import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, StatusBar} from 'react-native';

import {InputBox, MainButton} from '../components';
import {SignupStyles} from '../theme';

export default SignupScreen = ({navigation}) => {
  const [username, setUserName] = useState(() => '');
  const [useremail, setUserEmail] = useState(() => '');
  const [upassword, setUPassword] = useState(() => '');
  const [xpassword, setXPassword] = useState(() => '');
  
  const performSignup = async () => {
    // implement signup 

    // navigate for now
    navigation.navigate('Home');
  }
  return (
    <View>
      <View style={SignupStyles.board}>
        <InputBox label="Name" text={username} setText={text => setUserName(text)} />
        <InputBox label="Email" text={useremail} setText={text => setUserEmail(text)} />
        <InputBox
          label="Password"
          text={upassword}
          setText={text => setUPassword(text)}
        />
        <InputBox
          label="Confirm Password"
          text={xpassword}
          setText={text => setXPassword(text)}
        />
      </View>
      <View style={SignupStyles.buttons}>
        <MainButton text="Sign Up" onPress={performSignup} />
        <MainButton text="Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}