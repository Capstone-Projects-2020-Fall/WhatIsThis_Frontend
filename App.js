import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import DashboardScreen from './screens/DashboardScreen';
import SignUpScreen from './screens/SignUpScreen';
import firebase from 'firebase';
import {firebaseConfig} from './config';
import AppStack from './AppStack'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default class App extends React.Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}
//DashboardScreen will be HomeScreen
const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen,
  SignUpScreen: SignUpScreen
})

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});