import {firestore} from 'firebase';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';


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

