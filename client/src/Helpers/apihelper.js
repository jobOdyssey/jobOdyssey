import Constants from '../../env'

import CookieManager from '@react-native-community/cookies';
import AsyncStorage from '@react-native-community/async-storage';

const API_URL = `${Constants.SERVER_URL}/api`;
console.log("SERVER_URL",Constants.SERVER_URL)

const printAllCookies = async () => {
  const ds = await CookieManager.get(Constants.SERVER_URL)
  .then(async (cookies) => {
    console.log('CookieManager.get =>', cookies);
    const cookieSession = cookies['express:sess']
    if (cookieSession['expires']) {
      if (new Date().getTime() < new Date(cookieSession['expires']).getTime()) {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({
            value: cookies['express:sess']['value'],
            pssprt: cookies['express:sess:sig']
          })
        );
        return true;
      } else {
        // clearCookies();  
      }
    }
    return false;
  }).catch((err) => false);
  return ds;
}

const clearCookies = () => {
  console.log("clearing cookies");
  CookieManager.clearAll();  
}

const getParams = (url) => {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    const params = {};
    let match;
    while (match = regex.exec(url)) {
      params[match[1]] = match[2];
    }
    return params;
}

const GetHeadersFromSession = () => {
  var headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('credentials', 'include');  
  return headers;
}


const SetUserSession = async (url) => {
  const params = getParams(url);    

  CookieManager.set(Constants.SERVER_URL, {
    name: 'express:sess.sig',
    value: params.sig,
    path: '/'        
  }).then((done) => {
    console.log('CookieManager.set express:sess.sig=>', done);
  }).catch(err=> console.log("CookieManager.set express:sess.sig error",err));

  CookieManager.set(Constants.SERVER_URL, {
    name: 'express:sess',
    value: params.session,
    path: '/'        
  }).then((done) => {
    console.log('CookieManager.set express:sess=>', done);
  }).catch(err=> console.log("CookieManager.set express:sess error",err));

  await AsyncStorage.setItem(
    'user',
    JSON.stringify({
      value: params.session.value,
      pssprt: params.sig,
    })
  );

  console.log("Session Stored!")
}



const GetUserInfo = async () => {        
    const headers = GetHeadersFromSession();  
    return fetch(`${API_URL}/user`, {
      headers: headers
    }).then(res => { 
      console.log("response",res.ok, res.status)
      if (!res.ok) {
        throw new Error("HTTP status " + res.status);
      } else {        
        return res.json();
      }          
    });  
}

const GetJobApplication = (id) => {
    const headers = GetHeadersFromSession();    

    return fetch(`${API_URL}/jobapplication/${id}`, {
        method: 'GET',
        headers: headers
  }).then(res => res.json());
}

const GetJobApplications = () => {
  const headers = GetHeadersFromSession();    

  return fetch(`${API_URL}/jobapplication`, {
      method: 'GET',
      headers: headers
  }).then(res => res.json());
}

export { SetUserSession, GetUserInfo, GetJobApplication , GetJobApplications, clearCookies, printAllCookies }