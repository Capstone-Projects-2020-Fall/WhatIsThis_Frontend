// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text, Alert } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {firestore} from 'firebase';
import {testReturn, getExerciseArrayFromFirestore, returnExerciseList} from '../helpers';

//import {workoutInfoByMachine,workoutInfoByMuscle} from '../helpers';
export default class MuscleSelectorScreen extends Component {
  constructor(props){
    super(props)

    this.state = ({
        muscleID: ""
    })
  }
  //muscleID="biceps brachii"

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Muscle Selector</Text>
        <Button style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        title="Biceps"

        //onPress={() => Alert.alert("BICEPS CURL")}
        onPress={() => testReturn()}
      />
      </View>
    )
  }
}



