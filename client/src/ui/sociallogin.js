
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  View,
  Text,
  StatusBar,
 } from 'react-native';

 import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { GetJobApplication , SetUserSession, GetUserInfo } from '../Helpers/apihelper'

 import Constants from '../../env'

console.log("SERVER_URL",Constants.SERVER_URL)

const SocialLogin = () => {  
  const [data, setData] = useState("");
  const [userData,setUserData] = useState(null);

  const handleOpenURL = ({ url }) => {
      if (url.indexOf("?sig") !== -1) {        
          console.log("redirect succesfull",url);
          setData(url);
          /*
          SetUserSession(url);
          GetUserInfo()
          .then(user => setUserData(user));
          */
      }
  };

  const queryUserData = async () => {
   
  }


  useEffect(() => {
    // Your code here
    Linking.addEventListener('url', handleOpenURL);
  }, []);

  return (
     <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <Text>
            {data === "" ? null : data}
          </Text>
          <View style={styles.body}>
            <TouchableOpacity style={styles.socialBtn}
              onPress={() => Linking.openURL(`${Constants.SERVER_URL}/auth/google`)}>
              <Text style={styles.buttonText} >
                {data === "" ? "Connect via Google" : "You are connected !"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
} 

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  socialBtn: {
    margin: 30,
    backgroundColor: '#1f5c9e',
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default SocialLogin

