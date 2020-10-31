import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {useAppGlobalState} from '../state/global';

const BusyIndicator = ({props}) => {
  const glbState = useAppGlobalState();
  return (
    <ActivityIndicator
        animating={true}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        color={glbState.state.themeScheme.primary}
      />
  )
}

export default BusyIndicator;

