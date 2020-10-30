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
  Image,
 } from 'react-native';

 import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { GetJobApplication , SetUserSession, GetUserInfo, clearCookies, printAllCookies } from '../Helpers/apihelper'

 import Constants from '../../env'

 import { gql, useQuery, useLazyQuery } from '@apollo/client'

 const USER_QUERY = gql`
 query { getCurrentUser {
  id
  social_id
  username
  email
 }  }`

console.log("SERVER_URL",Constants.SERVER_URL)

const SocialLogin = ({navigation}) => {    
  // const [userData,setUserData] = useState(null);
  const [fetchData, { data, refetch, loading, error }] = useLazyQuery(USER_QUERY);

  console.log('refetch function', refetch);

  const lookForUserInfo = () => {    
    GetUserInfo()
    .then(user => {
      console.log("user: ", user);
      setUserData(user)
    })
    .catch(err => { console.log("error when getting the user",err);
      setUserData(null);
    });      
  }
    const handleOpenURL = async ({ url }) => {
      if (url.indexOf("?sig") !== -1) {        
          console.log("redirect succesfull");  
          console.log('navigation ', navigation);
          await SetUserSession(url); // important
          //GetUserInfo().then( user => console.log("getting user", user)).catch(err => console.log("error getting user", err));
          //navigation.navigate('UserProfile');              
          navigation.navigate('Home');    
      }
  };

  useEffect(() => {        
    console.log("on login page")
    Linking.addEventListener('url', handleOpenURL);   
    printAllCookies(); 
    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading ...</Text> 
  }

  // if (error) return<Text> { `Error! ${error}` } </Text>;
  console.log("data!!!!", data);
  console.log("error!!! :" , error)

  return (
     <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            {
             !data ? null :  <View style={styles.imageContainer}>
            <Text>Welcome { data.getCurrentUser.username }</Text>           
             </View>
            }          
          <View style={styles.body}>
            <TouchableOpacity style={styles.socialBtn}
              onPress={() => Linking.openURL(`${Constants.SERVER_URL}/auth/google`)}>
              <Text style={styles.buttonText} >
                {!data ? "Connect via Google" : "You are connected !"}</Text>
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SocialLogin

