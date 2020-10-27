import Constants from '../../env'

import CookieManager from 'react-native-cookies'
import AsyncStorage from '@react-native-community/async-storage';

const SIG_KEY = '@jobOdyssey:express:sess.sig';
const SESSION_KEY = '@jobOdyssey:express:sess';

const API_URL = `${Constants.SERVER_URL}/api`;


const getParams = (url) => {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    const params = {};
    let match;
    while (match = regex.exec(url)) {
      params[match[1]] = match[2];
    }
    return params;
}


let SetUserSession = async (url) => {
  const params = getParams(url);  
  console.log("params from url", params);
  await AsyncStorage.setItem(SIG_KEY,params.sig);
  await AsyncStorage.setItem(SESSION_KEY,params.session);
}

let GetUserInfo = async () => {
  await CookieManager.clearAll() //clearing cookies stored 
  //natively before each 
  //request
  const sig = await AsyncStorage.getItem(SIG_KEY);
  const sess = await AsyncStorage.getItem(SESSION_KEY);
  
  return fetch(`${API_URL}/user`, {
  headers: {
  'cookie': cookie,
  'Content-Type': 'application/json',
   credentials: 'include',
  }
  }).then(res => res.json());
}

let GetJobApplication = (id) => {
    return fetch(`${API_URL}/jobapplications/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
  }).then(res => res.json());
}

export { GetJobApplication , SetUserSession, GetUserInfo }