import React, {useState} from 'react'
import {List} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {TouchableOpacity, ScrollView} from 'react-native'
import {useNavigation} from '@react-navigation/native';

import {useAppGlobalState} from '../state/global'

const statusEnum = {
  "PLANNED": "Planned",
  "APPLIED": "Applied",
  "INTERVIEW_SCHEDULED": "Interview Scheduled",
  "OFFERED": "Offered",
  "REJECTED": "Rejected",
}

const ApplicationBoard = ({applicationList}) => {
  
  const glbState = useAppGlobalState();

  const [expandApplication, setExpandApplication] = useState(() => true);

  // toggle expandApplication boolean key
  const setApplicationExpandedState = () => setExpandApplication(!expandApplication);
  const navigateApplicationDetails = useNavigation();

  const handleApplicationSelected = (applicationId) => {
    console.log('handleApplicationSelected :: ',applicationId);
    navigateApplicationDetails.navigate('JobApplicationDetails', {
      applicationId,
    });
  };

  const renderApplicationToScreen = (application) => {
    console.log("single application", application);
    application = application.item;
    return <TouchableOpacity onPress={() => handleApplicationSelected(application.id)}>
      <List.Item
        key={application.id}
        title={application.position}
        description={`${application.company} - ${statusEnum[application.status]} - ${application.recent_activity}`}
      />
    </TouchableOpacity>
};

  return (
    <List.Section title="Applications">
      <List.Accordion
        title="Ongoing Applications"
        expanded={true}
        onPress={setApplicationExpandedState}
        left={(appIcon) => <List.Icon {...appIcon} icon="thumb-up-outline" />}>
        <FlatList data={applicationList} renderItem={renderApplicationToScreen} />
      </List.Accordion>
    </List.Section>
  )
}

export default ApplicationBoard;