import React from 'react';
import {Appbar} from 'react-native-paper';
import {name as appName} from '../../app.json';

const TitleBar = ({props}) => {
  return (
    <Appbar.Header>
      <Appbar.Content title={appName} />
    </Appbar.Header>
  );
}

export default TitleBar