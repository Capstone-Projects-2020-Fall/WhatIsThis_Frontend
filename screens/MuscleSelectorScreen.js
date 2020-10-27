// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text, Alert } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {firestore} from 'firebase';

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
        onPress={() => workoutInfoByMuscle('biceps brachii')}
      />
      </View>
    )
  }
}




function workoutInfoByMachine(machineID){
	
	firestore()
	.collection('exercises')
	.where('\machine', 'array-contains', machineID)
	.get()
	.then(querySnapshot => {
		console.log('Output: ', querySnapshot.size);
		
		querySnapshot.forEach(documentSnapshot => {
			console.log('Exercise Name: ', documentSnapshot.get('name'));
		});
										
	});

	
}

function workoutInfoByMuscle(muscleID){
	
	const testArray = new Array();
	
	firestore()
	.collection('exercises')
	.where('\muscle', 'array-contains', muscleID)
	.get()
	.then(querySnapshot => {
		console.log('Output: ', querySnapshot.size);
		
		querySnapshot.forEach(documentSnapshot => {
			
			
			
			let copy = JSON.parse(JSON.stringify(documentSnapshot.data(), getCircularReplacer()));
			
			var parsed = JSON.parse(JSON.stringify(copy));
			
			//console.log(parsed.name);
			
			//console.log('Exercise Name: ', documentSnapshot.get('name'));
			testArray.push(parsed.name);
			//console.log(testArray[0]);
		});
		
										
	});
	
	//console.log(testArray[0]);
}

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
    if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
            return;
        }
        seen.add(value);
    }
    return value;
    };
};
//biceps brachii