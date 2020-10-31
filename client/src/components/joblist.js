import React, {useState} from 'react'
import {List} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native';

import {useAppGlobalState} from '../state/global'

const ApplicationBoard = ({props}) => {

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

  const renderApplicationToScreen = ({application}) => (
    <TouchableOpacity onPress={() => handleApplicationSelected(application.id)}>
      <List.Item
        key={application.id}
        title={application.position}
        description={`${application.company} - ${application.recent_activity}`}
      />
    </TouchableOpacity>
  );

  return (
    <List.Section title="Applications">
      <List.Accordion
        title="Ongoing Applications"
        expanded={true}
        onPress={setApplicationExpandedState}
        left={(appIcon) => <List.Icon {...appIcon} icon="thumb-up-outline" />}>
        <FlatList data={props.applicationList} renderItem={renderApplicationToScreen} />
      </List.Accordion>
    </List.Section>
  )
}

export default ApplicationBoard;