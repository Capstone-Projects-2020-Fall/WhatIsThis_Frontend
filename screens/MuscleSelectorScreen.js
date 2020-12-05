// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text, Alert, Image, ImageBackground, Modal, TouchableOpacity, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {firestore, storage} from 'firebase';
import {testReturn, getExerciseArrayByMuscle, getExerciseArrayFromFirestore, returnExerciseList, returnMuscleExerciseList} from '../helpers';
import ExerciseModal from '../ExerciseModal';
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
			exerciseDiagramURL: [],
			isVisible : false,
      formalName: "blank", 
      exerciseModalList: []
		};
	}
	
	
	

  // hide show modal
  displayModal(show){
    this.setState({isVisible: show})
  }

  displayModalMod(show, chosenMuscle){
    this.setState({isVisible: show})
    this.setState({formalName: chosenMuscle})
    this.createExerciseList(chosenMuscle)
    // console.log(this.num)
    // console.log(this.isVisible)
  }
  
  componentDidMount(){
	  
  let queryRef = firestore()
          
					.collection('exercises')
					.get()
					.then(querySnapshot => {
						const data = querySnapshot.docs.map(doc => doc.data());
						this.setState({exercises: data});
					});			
  }
   
  createExerciseList = (muscleId) => {
    const {exercises, exerciseModalList} = this.state;

    let muscleExerciseList = []

    exercises.forEach(exercise => {
      if(exercise?.muscle?.includes(muscleId)){
        console.log(exercise.imgurl);
        muscleExerciseList.push({name: exercise.name, description: exercise.description, image: exercise.imgurl});
    
      }
    })

    this.setState({
      exerciseModalList: [...muscleExerciseList]
    })

  }
  render() {
    const {exerciseModalList} = this.state;

    /**
    var res = [];
    map.forEach(function(val, key) {
      res.push({ region: key, value: val });
    });
     */
		
    return (
      <View contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}>
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

            <ScrollView>
            <TouchableOpacity 
            style={styles.container} 
            activeOpacity={1} 
            onPressOut={() => {this.displayModal(false)}}
          >
            
            <TouchableWithoutFeedback>
                
              <View style={styles.modalView}>
                {exerciseModalList.map((exercise, key) => {
                    return <ExerciseModal key={key} name={exercise.name} description={exercise.description} image={exercise.image}/>
                })}

                <TouchableOpacity style={styles.modalButton} onPress={() => {
                  this.displayModal(false)
                }}>
                  <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
            </TouchableOpacity>
            </ScrollView>
          </Modal>
            <ScrollView>
          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModalMod(true, "rectus abdominus");
              }}>
              <Text style={styles.buttonText}>Abs</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModalMod(true, "biceps brachii");
              }}>
              <Text style={styles.buttonText}>Biceps</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModalMod(true, "gastrocnemius");
              }}>
              <Text style={styles.buttonText}>Calves</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModalMod(true, "anterior deltoid");
              }}>
              <Text style={styles.buttonText}>Deltoids</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModalMod(true, "gluteus maximus");
              }}>
              <Text style={styles.buttonText}>Glutes</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModalMod(true, "latissimus dorsi");
              }}>
              <Text style={styles.buttonText}>Lats</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModalMod(true, "pectoralis major");
              }}>
              <Text style={styles.buttonText}>Pectorals</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModalMod(true, "quadriceps femoris");
              }}>
              <Text style={styles.buttonText}>Quadriceps</Text>
          </TouchableOpacity>
              </ScrollView>
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
  modalButton:{
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#2AC062',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});

export default MuscleSelectorScreen;
