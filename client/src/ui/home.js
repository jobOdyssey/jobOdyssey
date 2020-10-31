import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import {FAB} from 'react-native-paper';

import {ApplicationBoard} from '../components';
import {HomeStyles} from '../theme';
import UiTheme from './changetheme';

import {useAppGlobalState} from '../state/global'

export default HomeScreen = ({navigation}) => {
  
  const glbState = useAppGlobalState();

  const [applications, setApplications] = useState(() => []);
  const [busy, setBusy] = useState(() => true);

  const fetchApplications = async () => {
    setBusy(true)
    // return user from State
    // activeJobs
    setBusy(false)
  }


  useEffect(() => {
    // lets return all jobs probably in an adv. Hook setup
    fetchApplications()
  }, []);

  // console.log('HomeScreen Styles :: ', HomeStyles.board)

  return (
    <View style={{flex: 1}}>
      <UiTheme></UiTheme>
      <ApplicationBoard applicationList={applications} />
      <FAB
        style={HomeStyles(glbState.state.themeScheme).board}
        icon="plus"
        color={glbState.state.themeScheme.text}
        onPress={() => navigation.navigate('JobApplication')} // possibly add jobs by user
      />
    </View>
  );

}


