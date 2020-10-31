import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, Button, Alert, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import {InputBox, MainButton} from '../components';
import {GetJobApplication} from '../Helpers/apihelper'
import {JobApplicationStyles} from '../theme'


const PossibleStatus = [
    "Planned","Applied","Interviewing"
]

const defaultValues = {
  idEdit : false,
  company: 'company',
  status: '',
  position: 'position',
  url: 'http://googgle.com',
  recentActivity: new Date(),
  notes: null,
}

export default JobApplication = ({route,navigation}) => {
  const { control, handleSubmit, errors } = useForm();
  const companyInputRef = React.useRef();
  const statusInputRef = React.useRef();
  const positionInputRef = React.useRef();
  const urlInputRef = React.useRef();
  const recentActivityInputRef = React.useRef();
  const createdInputRef = React.useRef();
  const notesInputRef = React.useRef();

  const [jobapplication,setJobApplication] = useState(null);
  const [shouldShowDatepicker, setShowDateTimePicker] = useState(false);

  console.log("route", route);
  console.log("shouldShowDatepicker", shouldShowDatepicker);

  const jobApplicationID  = route.params && route.params.jobApplicationID;

  useEffect(() => {
    // connect to the API to bring the     
    if (jobApplicationID) {
      console.log("get existing jobapplication", jobApplicationID)
      GetJobApplication(jobApplicationID)
      .then(data => {
        data.recentActivity = new Date(data.recentActivity);
        data.created = new Date(data.created);
        console.log("jobapplication: ", data);
        console.log("recent activity type", typeof data.recentActivity, data.recentActivity )
        setJobApplication({idEdit : true,...data})
      }) .catch(err => { 
        console.log("error when getting the job application",err);        
      });         
    } else {
      setJobApplication({...defaultValues})
    }
  }, []); 

  console.log("Job application to render: ", jobapplication);

  const showDatepicker = (show) => {
    setShowDateTimePicker(show);
  };

  console.log(errors);

  const MoveToDashboard = async () => {
    navigation.navigate('SocialLogin');
  }
  const onSave = (data) => {
    console.log("this is the form", data);
  }

  const onDelete = () => {
    console.log("Deleted called");
  }

  return (
    jobapplication &&<SafeAreaView style={JobApplicationStyles.container}>
      <ScrollView
            style={JobApplicationStyles.scrollView}      
        >
    <Text style={JobApplicationStyles.label}>Company</Text>
    <View style={JobApplicationStyles.inputContainer}>
    <Controller
      control={control}      
      rules = { {required: "This is required"} }
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={JobApplicationStyles.input}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          ref = {companyInputRef}
          editable = {!jobapplication.idEdit}  
        />
      )}
      name="company"      
      defaultValue= {jobapplication.company}
    />
    </View>
    {errors.company && <Text style={JobApplicationStyles.error}> { errors.company.message }</Text>} 

    <Text style={JobApplicationStyles.label}>Status</Text>
    <View style={JobApplicationStyles.inputContainer}>
    <Controller
      control={control}      
      rules = { { validate: value => value !== ""} }
      render={({ onChange, onBlur, value }) => (
        <Picker
            ref = {statusInputRef}
            style={JobApplicationStyles.input}
            selectedValue={value}    
            onValueChange={(itemValue, itemIndex) =>
                onChange(itemValue)
            }>
        <Picker.Item label="Select a Status" value="" />
        {
            PossibleStatus.map((item) => <Picker.Item key={item} label={ item } value={ item } />)
        }        
      </Picker>
      )}
      name="status"
      defaultValue={jobapplication.status}
    />
    </View>    
    {errors.status && <Text style={JobApplicationStyles.error}> { "This is required" }</Text>}

    <Text style={JobApplicationStyles.label}>Position</Text>
    <View style={JobApplicationStyles.inputContainer}>    
    <Controller
      control={control}      
      rules = { {required: "This is required"} }
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={JobApplicationStyles.input}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          ref = {positionInputRef}
          editable = {!jobapplication.idEdit} 
        />
      )}
      name="position"      
      defaultValue={jobapplication.position}
    />
    </View>
    {errors.position && <Text style={JobApplicationStyles.error}> { errors.position.message }</Text>}

    <Text style={JobApplicationStyles.label}>Url</Text>
    <View style={JobApplicationStyles.inputContainer}>
    <Controller
      control={control}      
      rules = { {pattern: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i} }
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={JobApplicationStyles.input}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          ref = {urlInputRef}
        />
      )}
      name="url"      
      defaultValue={jobapplication.url}
    />
    </View>
    {errors.url && <Text style={JobApplicationStyles.error}> { "Not a Valid URL" }</Text>}
    
    <Text style={JobApplicationStyles.label}>Recent Activity</Text>
    <View style={ JobApplicationStyles.inputDateContainer }> 
    <Controller
      control={control}            
      render={({ onChange, onBlur, value }) => (
      <>        
          <TextInput
            style={{ flex: 1 }}
            onBlur={onBlur}          
            value={value && value.toString('YYYY-MM-dd')}  
            ref= {recentActivityInputRef}  
            editable = {false}      
          />
          <MainButton onPress={()=> showDatepicker(true) } title="..." />
          { shouldShowDatepicker && <DateTimePicker
            testID="dateTimePicker"
            value={value}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {  
              console.log("event from datetimepicker", event,selectedDate);
              if (event.type !== "dismissed") {
                onChange(selectedDate);                
              }
              showDatepicker(false)              
            }}
            />
          }         
      </>
      )}
      name="recentActivity"      
      defaultValue={jobapplication.recentActivity}
    />
    </View>
    {errors.recentActivity && <Text style={JobApplicationStyles.error}> { "Not a Valid URL" }</Text>}

    <Text style={JobApplicationStyles.label}>Notes</Text>
    <View style={JobApplicationStyles.inputMultilineContainer}>    
    <Controller
      control={control}      
      rules = { {required: "This is required"} }
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={JobApplicationStyles.inputMultiline}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          ref = {positionInputRef}
          multiline={true}
        />
      )}
      name="notes"      
      defaultValue={jobapplication.notes}
    />
    </View>
    {errors.notes && <Text style={JobApplicationStyles.error}> { errors.notes.message }</Text>}

    {
      jobapplication.idEdit && <>
      <Text style={JobApplicationStyles.label}>Created</Text>
      <View style={ JobApplicationStyles.inputContainer}>
          <TextInput
            style={JobApplicationStyles.input}            
            value={jobapplication.created && jobapplication.created.toString('YYYY-MM-dd')}              
            editable = {false}      
          /> 
      </View>
      </>
    }

    <View style={JobApplicationStyles.buttonContainer}>
      <View style={JobApplicationStyles.button} >
        {
          jobapplication.idEdit ? <MainButton title="Delete" onPress={() => onDelete()} /> : <MainButton title="Cancel" onPress={() => MoveToDashboard()} />
        }        
      </View> 
      <View style={JobApplicationStyles.button} >
        <MainButton title="Save" onPress={handleSubmit(onSave)} />
      </View>
    </View>
    
  </ScrollView>
  </SafeAreaView>
  );
}