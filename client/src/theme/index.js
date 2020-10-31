import {StyleSheet} from 'react-native';


export const GlobalTheme = {
  light: {
    primary: '#7f00ff',
    accent: '#ffff01',
    error: '#D2473C',
    success: '#40e6b3',
    text: '#000000',
    grey1: '#edeced',
    grey2: '#c5c9cb',
    grey3: '#555a5e',
    grey4: '#333537',
    background: '#ffffff',
  },
  dark: {
    primary: '#7f00ff',
    accent: '#ffff01',
    error: '#D2473C',
    success: '#40e6b3',
    text: '#ffffff',
    grey1: '#edeced',
    grey2: '#46494c', 
    grey3: '#686e73',
    grey4: '#c5c9cb',
    background: '#000000',
  },
}

export const HomeStyles = StyleSheet.create({
          board: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
          },
        });

export const LoginStyles = StyleSheet.create({
  bigBlue: {
    // color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
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
    margin: 10,
  },
});

export const SignupStyles = StyleSheet.create({
  bigBlue: {
    // color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
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
    margin: 10,
  },
});

export const JobAppDetailsStyles = StyleSheet.create({
  buttons: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  form: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 10,
  },
  input: {
    margin: 10,
  },
});

export const JobApplicationStyles = StyleSheet.create({
  label:{
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