import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import {Login, HomeScreen, Reg} from './src/screens';
import {decode, encode} from 'base-64';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { 
          <>
            <Stack.Screen name = "HomeScreen" component = {HomeScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={Reg} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

