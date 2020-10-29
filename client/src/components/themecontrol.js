import React from 'react'
import {TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {useAppGlobalState} from '../state/AppContext'


const ThemeControl = props => {
  const glbState = useAppGlobalState

  return (
    <>
      <TouchableOpacity
        {...props}
        style={[props.style]}
        hitSlop={{top: 15, right: 15, bottom: 15, left: 15}}>
        <Icon name={props.icon} color={glbState.theme.text} /> 
      </TouchableOpacity>
    </>
  )
}

export default ThemeControl