import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import CameraScreen from './screens/CameraScreen';
import CalendarScreen from './screens/CalendarScreen';
import MuscleSelectorScreen from './screens/MuscleSelectorScreen';
import firebase from 'firebase';
import {firebaseConfig} from './config';
import AppStack from './AppStack'
import Icon from '@expo/vector-icons/Ionicons';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default class App extends React.Component {
  render() {
    return (
      <AppNavigator/>
    );
  //  return <AppContainer />;
  }
}



const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Home',
          headerLeft: (
            <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
          )
        };
      }
    },
  },
  {
    //defaultNavigationOptions: {
      //gesturesEnabled: false
    //}
  }
);


const CameraStack = createStackNavigator({
  Camera: {
    screen: CameraScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Camera',
        headerLeft: (
          <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
        )
      };
    }
  }
});
const MuscleSelectorStack = createStackNavigator({
  MuscleSelector: {
    screen: MuscleSelectorScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Muscle Selector',
        headerLeft: (
          <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
        )
      };
    }
  }
});
const CalendarStack = createStackNavigator({
  Settings: {
    screen: CalendarScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Calendar',
        headerLeft: (
          <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
        )
      };
    }
  }
});
const DashboardTabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Camera: CameraStack,
    'Muscle Selector': MuscleSelectorStack,
    Calendar: CalendarStack,
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      };
    }
  }
);
const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
});


const AppSwitchNavigator = createSwitchNavigator({
  Loading: {screen:LoadingScreen},
  Login: {screen:LoginScreen},
  Dashboard: {screen:AppDrawerNavigator},
  SignUp: {screen:SignUpScreen},
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
