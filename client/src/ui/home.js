import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';

import {FAB} from 'react-native-paper';

import {ApplicationBoard} from '../components';
import {HomeStyles} from '../theme';
import UiTheme from './changetheme';

import {useAppGlobalState} from '../state/global'

import { gql, useQuery, useLazyQuery } from '@apollo/client'


import {  getUserID } from '../Helpers/apihelper'

const GET_APPLICATIONS_QUERY = gql`
query GetUserApplications($userId: ID!) { 
  getUserApplications(userId: $userId) {
    id
    user_id
    company
    position
    url
    created_at
    recent_activity
    status
    notes
    archive
 }  
}`


export default HomeScreen = ({route,navigation}) => {
  
  const glbState = useAppGlobalState();

  const [fetchApplicationsData, { data, refetch, loading, error }] = useLazyQuery(GET_APPLICATIONS_QUERY);
  const [busy, setBusy] = useState(() => true);

  console.log("error home page", error)
  console.log("application data", data);
  console.log("route", route);

  const refresh = () => {
    console.log('refresh called!')
    refetch();
  }

  if (route.params && route.params.refresh) refresh();

  let applications = null;
  if (data){
    applications = data.getUserApplications;
  }

  console.log("application data!", applications);

  const fetchApplications = async () => {
    setBusy(true)
    const user_id = await getUserID();
    console.log("user ID from store!", user_id);
    fetchApplicationsData({ variables: { userId: user_id   } }); 
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
    <ScrollView style={{
      marginHorizontal: 5,
    }}>
      <View>
        <UiTheme></UiTheme>
        <ApplicationBoard applicationList={applications} />
        <FAB
          style={HomeStyles(glbState.state.themeScheme).board}
          icon="plus"
          color={glbState.state.themeScheme.text}
          onPress={() => navigation.navigate('JobApplication')} // possibly add jobs by user
        />
      </View>
    </ScrollView>
  );

}


