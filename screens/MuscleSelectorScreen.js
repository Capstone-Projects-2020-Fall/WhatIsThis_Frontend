// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text, Alert, Image, ImageBackground, Modal, TouchableOpacity, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {firestore, storage} from 'firebase';
import {testReturn, getExerciseArrayByMuscle, getExerciseArrayFromFirestore, returnExerciseList, returnMuscleExerciseList} from '../helpers';


class MuscleSelectorScreen extends Component {
  
  constructor(props){
		super(props);
		
		this.state = {
      exercises: [],
			exerciseDiagramURL: [],
			  isVisible : false,
			  formalName: "blank" 
		};
	}
	
	
	

  // hide show modal
  displayModal(show){
    this.setState({isVisible: show})
  }

  displayModalMod(show, chosenMuscle){
    this.setState({isVisible: show})
    this.setState({formalName: chosenMuscle})
    // console.log(this.num)
    // console.log(this.isVisible)
  }
  
  componentDidMount(){
	  
    
 const imageURLList = new Array();
	  
  let queryRef = firestore()
          
					.collection('exercises')
					.get()
					.then(querySnapshot => {
						const data = querySnapshot.docs.map(doc => doc.data());
						data.forEach(exercise => {
							
							if(exercise.imgpath !== undefined){
								var storageRef = storage().ref(exercise.imgpath);
								storageRef.getDownloadURL().then(url => {
                  imageURLList.push(url);
                  //console.log(url);
                 
								});							
							}
						});
						
						this.setState({exercises: data});
            this.setState({exerciseDiagramURL: imageURLList});
            
					});
	
				
  }
  

  render() {
    const {exercises} = this.state;
    const {exerciseDiagramURL} = this.state;
		//console.log(exercises[0]);
		const exerciseNames = new Array();
    const exerciseDes = new Array();
    const exerciseMuscle = new Array();
    const exerciseMachine = new Array();

    const muscleExerciseList = new Array();
      const imageArray = new Array();
    function buildArray(muscleID){
      exercises.forEach(exercise => {
        if(exercise.muscle.includes(muscleID)){
<<<<<<< HEAD
            muscleExerciseList.push(exercise.name, "\n\n",exercise.description, "\n\n\n");
			
=======
            //muscleExerciseList.push(exercise.name, "\n\n",exercise.description, "\n\n\n");
            muscleExerciseList.push(exercise.name, "\n\n");
>>>>>>> added skeleton code for counting dates
        }
      })
      return muscleExerciseList;
    }
<<<<<<< HEAD

  
    function buildImages(muscleID){
      exercises.forEach(exercise => {
        if(exercise.muscle.includes(muscleID)){
            imageArray.push(exercise.exerciseDiagramURL);
			
        }
      })
      console.log(exerciseDiagramURL);
      return exerciseDiagramURL;
    }
    /**
    var res = [];
    map.forEach(function(val, key) {
      res.push({ region: key, value: val });
    });
     */
=======
    
    function makeListIntoButtons(muscleExerciseList){
      return buttonArray
    }
>>>>>>> added skeleton code for counting dates
		
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
                <Text 
                style={styles.modelText}
                
              >
             
                {buildArray(this.state.formalName)}
                
                
              </Text>
              
              
                </View>
              
              </TouchableWithoutFeedback>

            
              <Image
              
              style = {styles.image}
              source ={buildImages(this.state.formalName)}
              
             
              />


              <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.displayModal(false)
                  }}>
                  <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            </ScrollView>
          </Modal>
            <ScrollView>
          <TouchableOpacity
              style={styles.buttonMod}
              onPress={() => {
                this.displayModalMod(true, "rectus abdominus");
              }}>
              <Text style={styles.buttonTextMod}>
                <Image
                  source={require('./musclegroup-abs.png')}
                  style={{ width: 120, height: 120}}
                />
                {'   '}Abs
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.buttonMod}
              onPress={() => {
                this.displayModalMod(true, "biceps brachii");
              }}>
              <Text style={styles.buttonTextMod}>
                <Image
                  source={require('./musclegroup-biceps.png')}
                  style={{ width: 120, height: 120}}
                />
                {'   '}Biceps
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.buttonMod}
              onPress={() => {
                this.displayModalMod(true, "gastrocnemius");
              }}>
              <Text style={styles.buttonTextMod}>
                <Image
                  source={require('./musclegroup-calves.png')}
                  style={{ width: 120, height: 120}}
                />
                {'   '}Calves
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.buttonMod}
              onPress={() => {
                this.displayModalMod(true, "anterior deltoid");
              }}>
              <Text style={styles.buttonTextMod}>
                <Image
                  source={require('./musclegroup-deltoids.png')}
                  style={{ width: 120, height: 120}}
                />
                {'   '}Deltoids
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.buttonMod}
              onPress={() => {
                this.displayModalMod(true, "gluteus maximus");
              }}>
              <Text style={styles.buttonTextMod}>
                <Image
                  source={require('./musclegroup-glutes.png')}
                  style={{width: 120, height: 120}}
                />
                {'   '}Glutes
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.buttonMod}
              onPress={() => {
                this.displayModalMod(true, "latissimus dorsi");
              }}>
              <Text style={styles.buttonTextMod}>
                <Image
                  source={require('./musclegroup-lats.png')}
                  style={{ width: 120, height: 120}}
                />
                {'   '}Lats
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.buttonMod}
              onPress={() => {
                this.displayModalMod(true, "pectoralis major");
              }}>
              <Text style={styles.buttonTextMod}>
                <Image
                  source={require('./musclegroup-pectorals.png')}
                  style={{ width: 120, height: 120}}
                />
                {'   '}Pectorals
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.buttonMod}
              onPress={() => {
                this.displayModalMod(true, "quadriceps femoris");
              }}>
              <Text style={styles.buttonTextMod}>
                <Image
                  source={require('./musclegroup-quadriceps.jpg')}
                  style={{ width: 120, height: 120}}
                />
                {'   '}Quadriceps
              </Text>
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
  buttonMod: {
    display: 'flex',
    height: 138,
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
  buttonTextMod: {
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
