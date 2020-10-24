import {DefaultTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';

export const AppTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#aed581',
    accent: '#e1ffb1',
  },
};

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
    color: 'blue',
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
    color: 'blue',
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