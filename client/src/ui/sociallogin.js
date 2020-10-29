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

// import { GetJobApplication , SetUserSession, GetUserInfo } from '../Helpers/apihelper'

// import Constants from '../../env'

// console.log("SERVER_URL",Constants.SERVER_URL)

// const SocialLogin = ({navigation}) => {    
//   const [userData,setUserData] = useState(null);

//   const lookForUserInfo = () => {    
//     GetUserInfo()
//     .then(user => {
//       console.log("user: ", user);
//       setUserData(user)
//     })
//     .catch(err => { console.log("error when getting the user",err);
//       setUserData(null);
//     });      
//   }

//   const handleOpenURL = ({ url }) => {
//       if (url.indexOf("?sig") !== -1) {        
//           console.log("redirect succesfull");          
//           SetUserSession(url);         
//           lookForUserInfo();
//       }
//   };

//   useEffect(() => {    
//     Linking.addEventListener('url', handleOpenURL);
//     lookForUserInfo();
//   }, []);

//   return (
//      <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//             {
//              userData === null ? null :  <View style={styles.imageContainer}>
//             <Text>Welcome { userData.name.givenName }</Text>   
//             <Image
//              style={{width: 50, height:50}}
//              source={{uri: userData.photos[0].value}}             
//              />            
//              </View>
//             }          
//           <View style={styles.body}>
//             <TouchableOpacity style={styles.socialBtn}
//               onPress={() => Linking.openURL(`${Constants.SERVER_URL}/auth/google`}>
//               <Text style={styles.buttonText} >
//                 {userData === null ? "Connect via Google" : "You are connected !"}</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.body}>
//             <TouchableOpacity style={styles.socialBtn}
//               onPress={() => navigation.navigate('JobApplication', { jobApplicationID: 35})}>
//               <Text style={styles.buttonText} >
//                 {"Move to Edit"}</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// } 

// const styles = StyleSheet.create({
//   body: {
//     backgroundColor: Colors.white,
//   },
//   socialBtn: {
//     margin: 30,
//     backgroundColor: '#1f5c9e',
//     paddingVertical: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center'
//   },
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default SocialLogin

