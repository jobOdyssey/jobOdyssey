import React from 'react';
import {DefaultTheme} from 'react-native-paper';
import {Platform, StatusBar} from 'react-native'

import {GlobalTheme} from '../theme';


export const initialGlobalState = {
  themeName: 'light',
  themeScheme: GlobalTheme.light,
  appTheme: {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: GlobalTheme.light.primary,
      accent: GlobalTheme.light.accent,
    },
    dark: false,
  }
}

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'changeAppGlobalTheme':
      let globalTheme;
      let themeScheme;
      Platform.OS === 'ios' && StatusBar.setBarStyle(state.themeName + '-content', true)
      if (state.themeName === 'light') {
        globalTheme = 'dark'
        themeScheme = GlobalTheme.dark
      } else {
        globalTheme = 'light'
        themeScheme = GlobalTheme.light
      }
      return {
        ...state,
        themeName: globalTheme,
        themeScheme,
        appTheme: {
          ...DefaultTheme,
          roundness: 2,
          colors: {
            ...DefaultTheme.colors,
            primary: themeScheme.primary,
            accent: themeScheme.accent,
          },
          dark: false,
        }
      }
    default:
      return {...state};
  }
}

const GlobalStateContext = React.createContext(globalReducer)
const DispatchGlobalContext = React.createContext(() => 0)

export const GlobalProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(globalReducer, initialGlobalState);
  const [user, setUser] = React.useState(() => ({userId: 'mee', userData: 'ok'}));

  const updateUser = (newUserDetails) => {
    setUser(newUserDetails)
  }

  return (
    <DispatchGlobalContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={{state, user, updateUser}}>{children}</GlobalStateContext.Provider>
    </DispatchGlobalContext.Provider>
  )
}

export const useGlobalActionDispatch = () => React.useContext(DispatchGlobalContext)

export const useAppGlobalState = () => {
  return React.useContext(GlobalStateContext)
}