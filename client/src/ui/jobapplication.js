import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, Button, Alert, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
// import {InputBox, MainButton} from '../components';

import { GetJobApplication } from '../Helpers/apihelper'

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
    jobapplication &&<SafeAreaView style={jobApplicationStyles.container}>
      <ScrollView
            style={jobApplicationStyles.scrollView}      
        >
    <Text style={jobApplicationStyles.label}>Company</Text>
    <View style={jobApplicationStyles.inputContainer}>
    <Controller
      control={control}      
      rules = { {required: "This is required"} }
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={jobApplicationStyles.input}
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
    {errors.company && <Text style={jobApplicationStyles.error}> { errors.company.message }</Text>} 

    <Text style={jobApplicationStyles.label}>Status</Text>
    <View style={jobApplicationStyles.inputContainer}>
    <Controller
      control={control}      
      rules = { { validate: value => value !== ""} }
      render={({ onChange, onBlur, value }) => (
        <Picker
            ref = {statusInputRef}
            style={jobApplicationStyles.input}
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
    {errors.status && <Text style={jobApplicationStyles.error}> { "This is required" }</Text>}

    <Text style={jobApplicationStyles.label}>Position</Text>
    <View style={jobApplicationStyles.inputContainer}>    
    <Controller
      control={control}      
      rules = { {required: "This is required"} }
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={jobApplicationStyles.input}
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
    {errors.position && <Text style={jobApplicationStyles.error}> { errors.position.message }</Text>}

    <Text style={jobApplicationStyles.label}>Url</Text>
    <View style={jobApplicationStyles.inputContainer}>
    <Controller
      control={control}      
      rules = { {pattern: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i} }
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={jobApplicationStyles.input}
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
    {errors.url && <Text style={jobApplicationStyles.error}> { "Not a Valid URL" }</Text>}
    
    <Text style={jobApplicationStyles.label}>Recent Activity</Text>
    <View style={ jobApplicationStyles.inputDateContainer }> 
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
          <Button onPress={()=> showDatepicker(true) } title="..." />
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
    {errors.recentActivity && <Text style={jobApplicationStyles.error}> { "Not a Valid URL" }</Text>}

    <Text style={jobApplicationStyles.label}>Notes</Text>
    <View style={jobApplicationStyles.inputMultilineContainer}>    
    <Controller
      control={control}      
      rules = { {required: "This is required"} }
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={jobApplicationStyles.inputMultiline}
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
    {errors.notes && <Text style={jobApplicationStyles.error}> { errors.notes.message }</Text>}

    {
      jobapplication.idEdit && <>
      <Text style={jobApplicationStyles.label}>Created</Text>
      <View style={ jobApplicationStyles.inputContainer}>
          <TextInput
            style={jobApplicationStyles.input}            
            value={jobapplication.created && jobapplication.created.toString('YYYY-MM-dd')}              
            editable = {false}      
          /> 
      </View>
      </>
    }

    <View style={jobApplicationStyles.buttonContainer}>
      <View style={jobApplicationStyles.button} >
        {
          jobapplication.idEdit ? <Button title="Delete" onPress={() => onDelete()} /> : <Button title="Cancel" onPress={() => MoveToDashboard()} />
        }        
      </View> 
      <View style={jobApplicationStyles.button} >
        <Button title="Save" onPress={handleSubmit(onSave)} />
      </View>
    </View>
    
  </ScrollView>
  </SafeAreaView>
  );
}


export const jobApplicationStyles = StyleSheet.create({
    label:{
        color:"black",
        margin: 20,
        marginLeft: 0,
    },
    error:{
      color:"red",
    },
    buttons: {
      justifyContent: 'space-around',
      flexDirection: 'row',
    },
    board: {
      justifyContent: 'space-between',
      flexDirection: 'column',
      padding: 10,
    },
    input: {
      margin: 5,
      height: 50,          
    },
    inputDate: {
      margin: 5,
      height: 50,          
    },
    inputMultiline: {
      margin: 5,
      height: 150,  
      textAlignVertical: 'top'        
    },
    inputContainer: {
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderTopWidth : 2,
      borderBottomWidth : 2,
      height: 50
    },
    inputMultilineContainer: {
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderTopWidth : 2,
      borderBottomWidth : 2,
      height: 150
    },
    inputDateContainer: {
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderTopWidth : 2,
      borderBottomWidth : 2,
      height: 50,
      flex:1,
      flexDirection: 'row'
    },
    board: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: 10,
      },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 5,
    },
    container: {
        flex: 1,
        marginTop: 5,
      },
      button: {
        width: '45%',
      },
      buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
  });