import {firestore} from 'firebase';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';


export async function returnExerciseList(){
		
		const response = await getExerciseArrayFromFirestore();
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

export function testReturn(){
	
	(async () => {
        const result =await returnExerciseList();
        console.log(result)
		return result;
	})()
	

	
}





