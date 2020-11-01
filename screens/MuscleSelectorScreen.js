// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text, Alert, Image, Modal, TouchableOpacity, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, ScrollView } from 'react-native';
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


class MuscleSelectorScreen extends Component {
  
  constructor(props){
		super(props);
		
		this.state = {
			exercises: [],
			isVisible : false,
		};
	}

  // hide show modal
  displayModal(show){
    this.setState({isVisible: show})
  }
  
  componentDidMount(){
	let queryRef = firestore()
					.collection('exercises')
					.get()
					.then(querySnapshot => {
						const data = querySnapshot.docs.map(doc => doc.data());
						//console.log(data);
						this.setState({exercises: data});
					});
  }
  

  render() {
	  const {exercises} = this.state;
		//console.log(exercises[0]);
		const exerciseNames = new Array();
    const exerciseDes = new Array();
    const exerciseMuscle = new Array();
    const exerciseMachine = new Array();

    const muscleExerciseList = new Array();
		exercises.forEach(exercise => {
      exerciseNames.push(exercise.name);
      exerciseDes.push(exercise.description);
      //exerciseMuscle.push(exercise.muscle[2]);
      //exerciseMachine.push(exercise.machine);
    });
    
    function buildArray(muscleID){
      exercises.forEach(exercise => {
        if(exercise.muscle == muscleID){
            muscleExerciseList.push(exercise.name, "\n\n",exercise.description, "\n\n\n");
          
        }
      })
      return muscleExerciseList;
    }
    
    /**
    var res = [];
    map.forEach(function(val, key) {
      res.push({ region: key, value: val });
    });
     */
		
    return (
      <View style = { styles.container }>
        <Modal
            animationType = {"slide"}
            transparent={true}
            visible={this.state.isVisible}
            onRequestClose={() => {
              //Alert.alert('Modal has now been closed.');
              //onRequestClose={() => {this.setModalVisible(false)}}
              {this.setModalVisible(false)
            }}
            }          
            >
            <TouchableOpacity 
            style={styles.container} 
            activeOpacity={1} 
            onPressOut={() => {this.displayModal(false)}}
          >
            
            <TouchableWithoutFeedback>
                
                <View style={styles.modalView}>
                <Text 
                style={styles.modelText}
                
              >
                
                {buildArray('biceps brachii')}
                
              </Text>
                </View>
              
              </TouchableWithoutFeedback>
            </TouchableOpacity>
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
  modelText: {
    fontSize: 14,
    marginBottom: 10,
    padding: 1,
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});

export default MuscleSelectorScreen;
