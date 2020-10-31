import {firestore} from 'firebase';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';


export async function returnExerciseList(muscleID){
		
		const response = await getExerciseArrayByMuscle(muscleID);
		return response;
}


export async function getExerciseArrayFromFirestore() {
	
	const exerciseListArray = new Array();
	
    var exerciseListRef = firestore().collection('exercises');
    try {
        var exerciseListSnapshot = await exerciseListRef.get();
        exerciseListSnapshot.forEach(docSnapshot => {            

			exerciseListArray.push(docSnapshot.data().name);
			
        });
    }
    catch (err) {
        console.log('Error getting documents', err);
    }
	
	return exerciseListArray;
}

//'biceps brachii'
export async function getExerciseArrayByMuscle(muscleID){
	const exerciseListArray = new Array();
	
	var exerciseListRef = firestore().collection('exercises');
	try{
		const exerciseListSnapshot = await exerciseListRef.where('\muscle', 'array-contains', 'biceps brachii').get();
		exerciseListSnapshot.forEach(docSnapshot => {            

			exerciseListArray.push(docSnapshot.data().name);
		});
	}
	catch (err) {
        console.log('Error getting documents', err);
    }
	
	return exerciseListArray;
}

export function testReturn(muscleID){
	
	(async () => {
		const result =await returnExerciseList(muscleID);
		return result;
	})()
	

	
}




