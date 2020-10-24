import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import {FAB} from 'react-native-paper';

import {HomeStyles} from '../theme';

export default HomeScreen = ({navigation}) => {
  const [activeJobs, setActiveJobs] = useState(() => []);
  const [inActiveJobs, setInactiveJobs] = useState(() => []);
  const [user, setUser] = useState(() => {}); // grab initial user or set a user

  useEffect(() => {
    // lets return all jobs probably in an adv. Hook setup
  }, []);


  return (
    <View style={{flex: 1}}>
      <FAB
        style={HomeStyles.board}
        small
        // icon="plus"
        // onPress={() => navigation.navigate('')} // possibly add jobs by user
      />
    </View>
  );

}


