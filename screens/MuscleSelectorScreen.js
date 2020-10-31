// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text, Alert, Image, Modal, TouchableOpacity, StyleSheet, FlatList, } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {firestore} from 'firebase';
import {testReturn, getExerciseArrayByMuscle, getExerciseArrayFromFirestore, returnExerciseList, returnMuscleExerciseList} from '../helpers';
/*

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
        onPress={() => testReturn('biceps brachii')}
      />
      </View>
    )
  }
}*/

//firestore().collection("exercises").doc()

export async function getExercises(exercisesReceived){

  var exerciseArray = [];

  var snapshot = await firestore()
  .collection('exercies')
  .get()

  snapshot.forEach((doc) =>{
    exerciseArray.push(doc.data());
  });
  console.log(exerciseArray);
  exercisesReceived(exerciseArray);
} 


export default class MuscleSelectorScreen extends Component {


  state = {
    exerciseList: [],
    currentExerciseDoc: null,
  }

  onExercisesReceived = (exerciseList) => {
    console.log(exerciseList);
    this.setState(prevState => ({
      exerciseList: prevState.exerciseList = exerciseList
    }));
  }



  componentDidMount() {
    getExercises(this.onExercisesReceived);
  }
  /*
  // initial state
  state = {
    isVisible: false
  };*/



  render() {
    return (
      <View style = { styles.container }>
        <Modal
            animationType = {"slide"}
            transparent={false}
            visible={this.state.isVisible}
            onRequestClose={() => {
              Alert.alert('Modal has now been closed.');
            }}>

            <Image 
           
              style = { styles.image }/>


              <Text 
                style={styles.text}
                onPress={() => {
                  this.displayModal(!this.state.isVisible);}}>{testReturn('biceps brachii')}</Text>
          </Modal>
            
          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModal(true);
              }}>
              <Text style={styles.buttonText}>Biceps</Text>
          </TouchableOpacity>          
        </View>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  closeButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3974',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: '100%',
    height: 350,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  }
});