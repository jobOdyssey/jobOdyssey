import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import {FAB} from 'react-native-paper';

import {ApplicationBoard} from '../components';
import {HomeStyles} from '../theme';

export default HomeScreen = ({navigation}) => {
  
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

  return (
    <View style={{flex: 1}}>
      <ApplicationBoard applicationList={applicationss} />
      <FAB
        style={HomeStyles.board}
        small
        icon="plus"
        onPress={() => navigation.navigate('JobApplication')} // possibly add jobs by user
      />
    </View>
  );

}


