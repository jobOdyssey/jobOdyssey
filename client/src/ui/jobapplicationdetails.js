import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Dropdown} from 'react-native-material-dropdown-v2';
import {Headline, Subheading} from 'react-native-paper';
import { gql, useQuery, useLazyQuery } from '@apollo/client'

import {BusyIndicator, MainButton} from '../components/index';
import {JobAppDetailsStyles} from '../theme';
import {useAppGlobalState} from '../state/global';

const statusEnum = {
  "PLANNED": "Planned",
  "APPLIED": "Applied",
  "INTERVIEW_SCHEDULED": "Interview Scheduled",
  "OFFERED": "Offered",
  "REJECTED": "Rejected",
}

const APPLICATION_UPDATE_QUERY = gql`
 query { getCurrentUser {
  id
  social_id
  username
  email
 }  
}`

const APPLICATION_DETAILS_QUERY = gql`
query GetApplicationData($applicationId: ID!) { 
  getApplicationData(applicationId: $applicationId) {
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

const ApplicationStage = [
    'applied', 
    'awaiting response',  
    'interview scheduled',
    'offered',
    'planned',  
    'rejected',
  ].map(stage => ({value: stage}))

const JobApplicationDetails = ({route, navigation, props}) => {

  console.log('JobApplicationDetails - route :: ', route);
  console.log('JobApplicationDetails - navigation :: ', navigation);
  console.log('JobApplicationDetails - props :: ', props);

  // set global details/parameters
  const glbState = useAppGlobalState();

  // set component fields
  const [busy, setBusy] = useState(() => true);  
  // const [applicationStage, setApplicationStage] = useState(() => '');

  const [fetchApplicationData, { data, refetch, loading, error }] = useLazyQuery(APPLICATION_DETAILS_QUERY);

  console.log("route from detail", route.params);

  const jobApplicationID  = route.params && route.params.applicationId;
  let applicationDetails = null;
  if (data) {
    applicationDetails = data.getApplicationData;
    // setApplicationStage(applicationDetails.status);
  }

  console.log("Data!", data)

  console.log("applicationDetails!", applicationDetails)


  console.log("error detail page", error)

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
    fetchApplicationData({ variables: { applicationId: jobApplicationID   } }); 
    // setApplicationDetails(dataResponse);
    // applicationStage(dataResponse.status); //set stage of application in state due to Dropdown control
    setBusy(false);
  }

  useEffect(() => {
    fetchApplicationDetails(); 
  }, []);

  if (busy) {
    return <BusyIndicator />;
  }

  return <>
    { !applicationDetails ? <></> :<View>
      <View style={JobAppDetailsStyles.form}>
        <Headline>Job Role:</Headline>
        <Subheading>{applicationDetails.position}</Subheading>
        <Headline>Company:</Headline>
        <Subheading>{applicationDetails.company}</Subheading>        
        <Headline>Url:</Headline>
        <Subheading>{applicationDetails.url}</Subheading> 
        <Headline>Recent Activity:</Headline>
        <Subheading>{applicationDetails.recent_activity}</Subheading> 
        <Headline>Notes:</Headline>
        <Subheading>{applicationDetails.notes}</Subheading> 
        
      </View>
      <Dropdown
          value={applicationDetails.status}
          label="Application Stage"
          data={ApplicationStage}
          // onChangeText={(currentStage) => setUpdateApplication(() => ({
          //   ...applicationDetails,
          //   'status': currentStage
          // }))}
      />
      <View style={JobAppDetailsStyles.buttons}>
        <MainButton text="Update Application" icon="update" onPress={updateApplicationDetails} />
      </View>
    </View>
    }
    </>
}

export default JobApplicationDetails;