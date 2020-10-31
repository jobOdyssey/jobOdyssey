import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Dropdown} from 'react-native-material-dropdown';
import {Headline} from 'react-native-paper';
import {Subheading} from 'react-native-paper';
import { gql, useQuery, useLazyQuery } from '@apollo/client'

import {BusyIndicator, MainButton} from '../components/index';
import {JobAppDetailsStyles} from '../theme';
import {useAppGlobalState} from '../state/global';

const APPLICATION_UPDATE_QUERY = gql`
 query { getCurrentUser {
  id
  social_id
  username
  email
 }  
}`

const APPLICATION_DETAILS_QUERY = gql`
 query { getCurrentUser {
  id
  social_id
  username
  email
 }  
}`

const ApplicationStage = [
    'applied', 
    'awaiting response',  
    'interview scheduled',
    'offered',
    'planned',  
    'rejected',
  ].map(stage => {value: stage})

const JobApplicationDetails = ({route, navigation, props}) => {

  console.log('JobApplicationDetails - route :: ', route);
  console.log('JobApplicationDetails - navigation :: ', navigation);
  console.log('JobApplicationDetails - props :: ', props);

  // set global details/parameters
  const glbState = useAppGlobalState();

  // set component fields
  const [busy, setBusy] = useState(() => true);
  const [applicationDetails, setApplicationDetails] = useState(() => []);
  const [applicationStage, setApplicationStage] = useState(() => '');

  const updateApplicationDetails = () => {

    // update Stage in applicationDetails
    // send Mutation Request

    setBusy(true);
    setBusy(false);
    // once successful or otherwise
    navigation.navigate('Home');
  }

  const fetchApplicationDetails = async ({applicationId} = route.params) => {
    console.log('Fetch Details of ApplicationID :: ', applicationId);
    setBusy(true);
    setApplicationDetails(dataResponse);
    applicationStage(dataResponse.status); //set stage of application in state due to Dropdown control
    setBusy(false);
  }

  useEffect(() => {
    fetchApplicationDetails();
  }, []);

  if (busy) {
    return <BusyIndicator />;
  }

  return (
    <View>
      <View style={JobAppDetailsStyles.form}>
        <Headline>Job Role:</Headline>
        <Subheading>{applicationDetails.Role}</Subheading>
        <Headline>Company:</Headline>
        <Subheading>{applicationDetails.Company}</Subheading>
        <Headline>Salary:</Headline>
        <Subheading>{applicationDetails.Salary}</Subheading>
        <Headline>Location:</Headline>
        <Subheading>{applicationDetails.Location}</Subheading>

        <Dropdown
          value={applicationStage}
          label="Application Stage"
          data={ApplicationStage}
          onChangeText={(currentStage) => setApplicationStage(currentStage)}
        />
      </View>
      <View style={JobAppDetailsStyles.buttons}>
        <MainButton text="Update Application" icon="update" onPress={updateApplicationDetails} />
      </View>
    </View>
  )
}

export default JobApplicationDetails;