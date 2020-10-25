// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text, Alert } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {firestore} from 'firebase/firestore';

//import {workoutInfoByMachine,workoutInfoByMuscle} from '../helpers';
export default class MuscleSelectorScreen extends Component {
  constructor(props){
    super(props)

    this.state = ({
        muscleID: ""
    })
  }
  muscleID="biceps brachii"

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Muscle Selector</Text>
        <Button style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        title="Biceps"

        //onPress={() => Alert.alert("BICEPS CURL")}
        onPress={() => workoutInfoByMuscle(this.state.muscleID)}
      />
      </View>
    )
  }
}




export function workoutInfoByMachine(machineInput){
	
	firestore()
	.collection('exercises')
	.where('\machine', 'array-contains', machineInput)
	.get()
	.then(querySnapshot => {
		console.log('Output: ', querySnapshot.size);
		
		querySnapshot.forEach(documentSnapshot => {
		console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
										
	});

	
}

export function workoutInfoByMuscle(muscleID){
	
	firestore()
	.collection('exercises')
	.where('\machine', 'array-contains', machineInput)
	.get()
	.then(querySnapshot => {
		console.log('Output: ', querySnapshot.size);
										
	});
}
//biceps brachii