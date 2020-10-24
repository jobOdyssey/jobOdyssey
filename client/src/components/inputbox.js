import React from 'react';
import {TextInput} from 'react-native-paper';

export default InputBox = (props) => {
  // perform some site wide styling
  return (
    <TextInput
      label={props.label}
      value={props.text}
      onChangeText={props.setText}
      style={{margin: 10}}
      secureTextEntry={props.secure}
    />
  );
}