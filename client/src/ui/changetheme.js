import React from 'react';
import {View} from 'react-native';

import {ThemeSetting} from '../components';
import {useGlobalActionDispatch} from '../state/global'

const UiTheme = () => {

  const disPatchAction = useGlobalActionDispatch();

  const changeGlobalThemeState = () => {
    disPatchAction({
      type: 'changeAppGlobalTheme',
    })
  }

  return (
    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <ThemeSetting onPress={changeGlobalThemeState} icon={'brightness-4'}/>
    </View>
  )
}

export default UiTheme;