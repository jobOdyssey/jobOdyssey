import * as React from 'react';
import {Button} from 'react-native-paper';

export default MainButton = (props) => {
  // perform some site wide styling
  return (
    <Button icon={props.icon} mode="contained" onPress={props.onPress}>
      {props.text}
    </Button>
  );
};

// need to add props