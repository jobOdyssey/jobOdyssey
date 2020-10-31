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

import {useAppGlobalState} from '../state/global';

import { gql, useQuery, useLazyQuery } from '@apollo/client'

const USER_QUERY = gql`
 query { getCurrentUser {
  id
  social_id
  username
  email
 }  
}`

console.log("SERVER_URL",Constants.SERVER_URL)


const SocialLogin = ({navigation, moveToHome}) => {    
  // const [userData,setUserData] = useState(null);
  const [fetchData, { data, refetch, loading, error }] = useLazyQuery(USER_QUERY);
  
  console.log("navigation " , navigation);
  const glbState = useAppGlobalState();

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

  
  const styles = StyleSheet.create({
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

  useEffect(() => {        
    console.log("on login page")
    Linking.addEventListener('url', handleOpenURL);   
    printAllCookies(); 
    fetchData();
  }, []);

  if (data && data.getCurrentUser) {
    moveToHome();
    return <></>
  }

  if (loading) {
    return <Text>Loading ...</Text> 
  }

  // if (error) return<Text> { `Error! ${error}` } </Text>;
  console.log("data!!!!", data);
  console.log("error!!! :" , error)

  const renderUserOpt = (usrMthdObj) => {
    console.log('renderUserOpt data :: ', usrMthdObj);
    if (!usrMthdObj || !usrMthdObj.getCurrentUser) {
      return <></>
    }    
    
    return (
      <View style={styles.imageContainer}>
      <Text>Welcome { data.getCurrentUser.username }</Text>
    </View>
    )
    
  }

  return (
     <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>           
          <View>
            <TouchableOpacity style={styles.socialBtn}
              onPress={() => Linking.openURL(`${Constants.SERVER_URL}/auth/google`)}>
              <Text style={styles.buttonText} >
                {!data || !data.getCurrentUser ? "Connect via Google" : "You are connected !"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
} 


export default SocialLogin

