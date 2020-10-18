import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {firebase} from '../../firebase/config';
//import {Toast} from 'react-native-tiny-toast';
export default function HomeScreen ({navigation}) {
    const onReturnPress = () => {
        navigation.navigate('Login')
    }

    //checking if git working
    //checking in twice
    
    const usersRef = firebase.firestore().collection("users");
   
    
    /*
    const onGetIDPress = () => {
        //ToastAndroid.show("Send it on the way!", ToastAndroid.SHORT);
        Toast.show("Send it on the way!");
        console.log("Hello beautiful people!")
    }*/

  return (
    
    
    <View style={styles.regform}>
        <Text>WhatIsThis App</Text>

        <TouchableOpacity style = {styles.button} onPress = {() => onGetIDPress()}>

                <Text>Get All ID</Text>

        </TouchableOpacity>

        <TouchableOpacity style = {styles.button} onPress = {() => onReturnPress()}>

                <Text>Log Out</Text>

        </TouchableOpacity>

        <Text>List of ID:</Text>
    
    </View>
  );
}

const styles = StyleSheet.create({
  regform: {
    alignSelf: 'stretch',
    paddingBottom: 190, 

  },
  header: {
      fontSize : 24,
      color: '#fff',
      paddingBottom: 10,
      marginBottom: 40,
      borderLeftColor : 'dodgerblue',
      borderTopColor : 'dodgerblue',
      borderRightColor: 'dodgerblue',
      borderBottomColor: 'black',
      borderWidth : 1,

  },
  textinput: {
      alignSelf : 'stretch',
      height: 40,
      marginBottom: 30,
      borderBottomWidth : 1,
      borderBottomColor : '#f8f8f8',

  },

  button : {
    alignSelf : 'stretch',
    alignItems : 'center',
    padding : 20,
    marginTop: 10,
    backgroundColor : '#fff7fa'
  }
});